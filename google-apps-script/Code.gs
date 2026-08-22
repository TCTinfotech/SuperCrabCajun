/**
 * SUPERCRAB GOOGLE APPS SCRIPT BACKEND (V4)
 * Serverless Backend for:
 * 1. Direct Pay at Store / Pickup Orders (Status: 'Pay at Pickup')
 * 2. Square Online Checkout (Apple Pay, Google Pay, Card, Afterpay) (Status: 'Awaiting Payment' -> 'Paid')
 * 3. Menu Synchronization with Google Sheets (Categories & Products)
 * 4. Image Upload to Google Drive
 * 5. Live Orders Retrieval for Admin Dashboard
 */

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var action = data.action;

    // --- ORDER & PAYMENT ACTIONS ---
    if (action === 'create-order') {
      return handleCreateDirectOrder(data);
    } else if (action === 'create-square-session' || action === 'create-session') {
      return handleCreateSquarePaymentLink(data);
    } else if (action === 'update-order-status') {
      return handleUpdateOrderStatus(data.orderId, data.status);
    }

    // --- PRODUCT CRUD ACTIONS ---
    else if (action === 'add-product') {
      return handleAddProduct(data.product);
    } else if (action === 'update-product') {
      return handleUpdateProduct(data.id, data.product);
    } else if (action === 'delete-product') {
      return handleDeleteProduct(data.id);
    } else if (action === 'toggle-availability') {
      return handleToggleProductAvailability(data.id, data.isAvailable);
    }

    // --- CATEGORY CRUD ACTIONS ---
    else if (action === 'add-category') {
      return handleAddCategory(data.category);
    } else if (action === 'update-category') {
      return handleUpdateCategory(data.id, data.category);
    } else if (action === 'delete-category') {
      return handleDeleteCategory(data.id);
    }

    // --- DRIVE IMAGE UPLOAD ---
    else if (action === 'upload-image') {
      return handleUploadImage(data);
    }

    else {
      return createJsonResponse({ success: false, error: 'Invalid action: ' + action });
    }
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'status';

    if (action === 'get-menu' || action === 'get-all') {
      var categories = getSheetDataAsJson(CONFIG.SHEETS ? CONFIG.SHEETS.CATEGORIES : 'Categories');
      var products = getSheetDataAsJson(CONFIG.SHEETS ? CONFIG.SHEETS.PRODUCTS : 'Products');
      return createJsonResponse({
        success: true,
        categories: categories,
        products: products,
        timestamp: new Date().toISOString()
      });
    } else if (action === 'get-categories') {
      var categories = getSheetDataAsJson(CONFIG.SHEETS ? CONFIG.SHEETS.CATEGORIES : 'Categories');
      return createJsonResponse({ success: true, categories: categories });
    } else if (action === 'get-products') {
      var products = getSheetDataAsJson(CONFIG.SHEETS ? CONFIG.SHEETS.PRODUCTS : 'Products');
      return createJsonResponse({ success: true, products: products });
    } else if (action === 'get-orders') {
      var orders = getSheetDataAsJson(CONFIG.SHEETS ? CONFIG.SHEETS.ORDERS : 'Orders');
      return createJsonResponse({ success: true, orders: orders });
    } else if (action === 'update-order-status') {
      var orderId = (e && e.parameter && e.parameter.orderId) ? e.parameter.orderId : '';
      var status = (e && e.parameter && e.parameter.status) ? e.parameter.status : '';
      return handleUpdateOrderStatus(orderId, status);
    } else if (action === 'seed-data' || action === 'migrate') {
      if (typeof migrateAllDataToSheets === 'function') {
        var result = migrateAllDataToSheets();
        return createJsonResponse(result);
      } else {
        return createJsonResponse({ success: false, error: 'migrateAllDataToSheets function not found.' });
      }
    } else {
      return createJsonResponse({
        status: 'online',
        service: 'SuperCrab Management, Square & Orders API',
        supportedGateways: ['square', 'direct_pickup'],
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

// ==========================================
// 1. DIRECT PAY AT STORE / PICKUP HANDLER
// ==========================================

function handleCreateDirectOrder(payload) {
  var customer = payload.customer || {};
  var items = payload.items || [];
  var pickupTime = payload.pickupTime || 'ASAP';
  var specialNotes = payload.specialNotes || '';

  if (!items || items.length === 0) {
    return createJsonResponse({ success: false, error: 'Cart is empty.' });
  }

  var orderId = 'SC-' + Math.floor(100000 + Math.random() * 900000);

  var itemSummaryString = items.map(function(item) {
    var desc = item.qty + 'x ' + item.name;
    var opts = [];
    if (item.seasoning) opts.push(item.seasoning);
    if (item.spiceLevel) opts.push(item.spiceLevel);
    if (opts.length > 0) desc += ' (' + opts.join(', ') + ')';
    return desc;
  }).join(' | ');

  logOrderToSheet({
    orderId: orderId,
    customerName: customer.name || 'Guest',
    phone: customer.phone || 'N/A',
    email: customer.email || 'N/A',
    itemsSummary: itemSummaryString,
    pickupTime: pickupTime,
    specialNotes: (specialNotes ? specialNotes + ' | ' : '') + 'Pay at Pickup / Store',
    subtotal: '$' + (payload.subtotal || '0.00'),
    tax: '$' + (payload.tax || '0.00'),
    tip: '$' + (payload.tip || '0.00'),
    totalAmount: '$' + (payload.total || '0.00'),
    status: 'Pay at Pickup',
    sessionId: 'DIRECT-PICKUP'
  });

  return createJsonResponse({
    success: true,
    orderId: orderId,
    paymentMethod: 'pickup_store',
    message: 'Order created successfully!'
  });
}

// ==========================================
// 2. SQUARE PAYMENT API HANDLER
// ==========================================

/**
 * Creates a Square Payment Link via Square REST API (Online Checkout)
 * Supports Apple Pay, Google Pay, Card, Afterpay
 */
function handleCreateSquarePaymentLink(payload) {
  var customer = payload.customer || {};
  var items = payload.items || [];
  var pickupTime = payload.pickupTime || 'ASAP';
  var specialNotes = payload.specialNotes || '';

  if (!items || items.length === 0) {
    return createJsonResponse({ success: false, error: 'Cart is empty.' });
  }

  if (!CONFIG.SQUARE_ACCESS_TOKEN || CONFIG.SQUARE_ACCESS_TOKEN.indexOf('YOUR_SQUARE') > -1) {
    return createJsonResponse({
      success: false,
      error: 'Square Access Token is not yet configured. Please set SQUARE_ACCESS_TOKEN in Config.gs or choose "Pay at Store / Pickup"!'
    });
  }

  var orderId = 'SC-' + Math.floor(100000 + Math.random() * 900000);

  // Build Square Line Items
  var squareLineItems = items.map(function(item) {
    var unitPriceCents = Math.round(parseFloat(item.price) * 100);
    var itemNotes = [];
    if (item.seasoning) itemNotes.push('Flavor: ' + item.seasoning);
    if (item.spiceLevel) itemNotes.push('Spice: ' + item.spiceLevel);

    return {
      name: item.name,
      quantity: String(item.qty),
      base_price_money: {
        amount: unitPriceCents,
        currency: 'USD'
      },
      note: itemNotes.join(' | ')
    };
  });

  // Calculate Subtotal & Tax
  var subtotalCents = items.reduce(function(acc, item) {
    return acc + Math.round(parseFloat(item.price) * 100) * item.qty;
  }, 0);
  var taxCents = Math.round(subtotalCents * CONFIG.TAX_RATE);

  var redirectUrl = CONFIG.SUCCESS_URL.replace('{CHECKOUT_SESSION_ID}', orderId);

  var squarePayload = {
    idempotency_key: 'sq_order_' + orderId + '_' + Date.now(),
    order: {
      location_id: CONFIG.SQUARE_LOCATION_ID,
      reference_id: orderId,
      line_items: squareLineItems,
      taxes: taxCents > 0 ? [
        {
          name: 'Texas Sales Tax (8.25%)',
          percentage: '8.25',
          scope: 'ORDER'
        }
      ] : []
    },
    checkout_options: {
      redirect_url: redirectUrl,
      ask_for_shipping_address: false,
      accepted_payment_methods: {
        apple_pay: true,
        google_pay: true,
        afterpay_clearpay: true
      }
    },
    pre_populate_buyer_email: customer.email || ''
  };

  var baseUrl = CONFIG.SQUARE_ENVIRONMENT === 'production'
    ? 'https://connect.squareup.com/v2/online-checkout/payment-links'
    : 'https://connect.squareupsandbox.com/v2/online-checkout/payment-links';

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + CONFIG.SQUARE_ACCESS_TOKEN,
      'Square-Version': '2024-01-18'
    },
    payload: JSON.stringify(squarePayload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(baseUrl, options);
  var responseJson = JSON.parse(response.getContentText());

  if (responseJson.errors && responseJson.errors.length > 0) {
    return createJsonResponse({ success: false, error: responseJson.errors[0].detail || 'Square API error' });
  }

  var paymentLink = responseJson.payment_link;

  // Build items list representation for sheet
  var itemSummaryString = items.map(function(item) {
    var desc = item.qty + 'x ' + item.name;
    var opts = [];
    if (item.seasoning) opts.push(item.seasoning);
    if (item.spiceLevel) opts.push(item.spiceLevel);
    if (opts.length > 0) desc += ' (' + opts.join(', ') + ')';
    return desc;
  }).join(' | ');

  // Log pending order to Google Sheet
  try {
    logOrderToSheet({
      orderId: orderId,
      customerName: customer.name || 'Guest',
      phone: customer.phone || 'N/A',
      email: customer.email || 'N/A',
      itemsSummary: itemSummaryString,
      pickupTime: pickupTime,
      specialNotes: specialNotes,
      subtotal: '$' + (subtotalCents / 100).toFixed(2),
      tax: '$' + (taxCents / 100).toFixed(2),
      tip: '$' + (payload.tip || '0.00'),
      totalAmount: '$' + ((subtotalCents + taxCents) / 100).toFixed(2),
      status: 'Awaiting Payment',
      sessionId: paymentLink.id || 'SQUARE-LINK'
    });
  } catch (sheetErr) {
    Logger.log('Sheet log error: ' + sheetErr.toString());
  }

  return createJsonResponse({
    success: true,
    paymentUrl: paymentLink.url,
    orderId: orderId,
    gateway: 'square'
  });
}

// ==========================================
// 3. GOOGLE SHEET ORDER LOGGER
// ==========================================

function logOrderToSheet(data) {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var orderSheetName = (CONFIG.SHEETS && CONFIG.SHEETS.ORDERS) ? CONFIG.SHEETS.ORDERS : (CONFIG.SHEET_NAME || 'Orders');
  var sheet = ss.getSheetByName(orderSheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(orderSheetName);
    sheet.appendRow([
      'Order ID',
      'Date & Time',
      'Customer Name',
      'Phone Number',
      'Email',
      'Items Ordered',
      'Pickup Time',
      'Special Notes',
      'Subtotal',
      'Tax',
      'Tip',
      'Total Amount',
      'Payment Status',
      'Square Order ID'
    ]);
    sheet.getRange(1, 1, 1, 14).setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
  }

  var formattedDate = Utilities.formatDate(new Date(), 'America/Chicago', 'yyyy-MM-dd HH:mm:ss');

  var cleanPhone = String(data.phone || 'N/A').trim();
  // Prefix with single quote so Google Sheets treats it as plain text and avoids formula parse errors
  if (cleanPhone.indexOf('+') === 0 || cleanPhone.indexOf('=') === 0) {
    cleanPhone = "'" + cleanPhone;
  }

  sheet.appendRow([
    data.orderId,
    formattedDate,
    data.customerName,
    cleanPhone,
    data.email,
    data.itemsSummary,
    data.pickupTime,
    data.specialNotes,
    data.subtotal || '',
    data.tax || '',
    data.tip || '',
    data.totalAmount,
    data.status,
    data.sessionId
  ]);
}

function handleUpdateOrderStatus(orderId, newStatus) {
  if (!orderId || !newStatus) {
    return createJsonResponse({ success: false, error: 'orderId and status are required.' });
  }

  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var orderSheetName = (CONFIG.SHEETS && CONFIG.SHEETS.ORDERS) ? CONFIG.SHEETS.ORDERS : (CONFIG.SHEET_NAME || 'Orders');
  var sheet = ss.getSheetByName(orderSheetName);
  if (!sheet) return createJsonResponse({ success: false, error: 'Orders sheet not found.' });

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(orderId).trim()) {
      var rowNum = i + 1;
      sheet.getRange(rowNum, 13).setValue(newStatus); // Column 13 is Payment Status
      SpreadsheetApp.flush();
      return createJsonResponse({ success: true, message: 'Order status updated to: ' + newStatus });
    }
  }

  return createJsonResponse({ success: false, error: 'Order not found with id: ' + orderId });
}

// ==========================================
// 4. PRODUCT & CATEGORY CRUD HANDLERS
// ==========================================

function handleAddProduct(product) {
  if (!product || !product.name) {
    return createJsonResponse({ success: false, error: 'Product name is required.' });
  }

  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheetName = (CONFIG.SHEETS && CONFIG.SHEETS.PRODUCTS) ? CONFIG.SHEETS.PRODUCTS : 'Products';
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(['id', 'category', 'name', 'price', 'description', 'image', 'spiceLevel', 'badge', 'badgeType', 'featured', 'isAvailable']);
  }

  var newId = product.id || ('prod_' + Date.now());
  sheet.appendRow([
    newId,
    product.category || 'appetizers',
    product.name,
    parseFloat(product.price || 0),
    product.description || '',
    product.image || '',
    Number(product.spiceLevel || 0),
    product.badge || '',
    product.badgeType || 'popular',
    product.featured ? 'TRUE' : 'FALSE',
    product.isAvailable !== false ? 'TRUE' : 'FALSE'
  ]);

  return createJsonResponse({ success: true, id: newId, message: 'Product added successfully.' });
}

function handleUpdateProduct(id, product) {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheetName = (CONFIG.SHEETS && CONFIG.SHEETS.PRODUCTS) ? CONFIG.SHEETS.PRODUCTS : 'Products';
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return createJsonResponse({ success: false, error: 'Products sheet not found.' });

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(id).trim()) {
      var rowNum = i + 1;
      if (product.category !== undefined) sheet.getRange(rowNum, 2).setValue(product.category);
      if (product.name !== undefined) sheet.getRange(rowNum, 3).setValue(product.name);
      if (product.price !== undefined) sheet.getRange(rowNum, 4).setValue(parseFloat(product.price));
      if (product.description !== undefined) sheet.getRange(rowNum, 5).setValue(product.description);
      if (product.image !== undefined) sheet.getRange(rowNum, 6).setValue(product.image);
      if (product.spiceLevel !== undefined) sheet.getRange(rowNum, 7).setValue(Number(product.spiceLevel));
      if (product.badge !== undefined) sheet.getRange(rowNum, 8).setValue(product.badge);
      if (product.badgeType !== undefined) sheet.getRange(rowNum, 9).setValue(product.badgeType);
      if (product.featured !== undefined) sheet.getRange(rowNum, 10).setValue(product.featured ? 'TRUE' : 'FALSE');
      if (product.isAvailable !== undefined) sheet.getRange(rowNum, 11).setValue(product.isAvailable ? 'TRUE' : 'FALSE');

      return createJsonResponse({ success: true, message: 'Product updated successfully.' });
    }
  }

  return createJsonResponse({ success: false, error: 'Product not found with id: ' + id });
}

function handleDeleteProduct(id) {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheetName = (CONFIG.SHEETS && CONFIG.SHEETS.PRODUCTS) ? CONFIG.SHEETS.PRODUCTS : 'Products';
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return createJsonResponse({ success: false, error: 'Products sheet not found.' });

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(id).trim()) {
      sheet.deleteRow(i + 1);
      return createJsonResponse({ success: true, message: 'Product deleted successfully.' });
    }
  }

  return createJsonResponse({ success: false, error: 'Product not found with id: ' + id });
}

function handleToggleProductAvailability(id, isAvailable) {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheetName = (CONFIG.SHEETS && CONFIG.SHEETS.PRODUCTS) ? CONFIG.SHEETS.PRODUCTS : 'Products';
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return createJsonResponse({ success: false, error: 'Products sheet not found.' });

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(id).trim()) {
      sheet.getRange(i + 1, 11).setValue(isAvailable ? 'TRUE' : 'FALSE');
      return createJsonResponse({ success: true, message: 'Availability toggled.' });
    }
  }

  return createJsonResponse({ success: false, error: 'Product not found with id: ' + id });
}

function handleAddCategory(category) {
  if (!category || !category.name) {
    return createJsonResponse({ success: false, error: 'Category name is required.' });
  }

  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheetName = (CONFIG.SHEETS && CONFIG.SHEETS.CATEGORIES) ? CONFIG.SHEETS.CATEGORIES : 'Categories';
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(['id', 'name', 'subtitle', 'orderIndex', 'listImages', 'status']);
  }

  var newId = category.id || category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  sheet.appendRow([
    newId,
    category.name,
    category.subtitle || '',
    category.orderIndex || 99,
    category.listImages || '',
    category.status || 'Active'
  ]);

  return createJsonResponse({ success: true, id: newId, message: 'Category added successfully.' });
}

function handleUpdateCategory(id, category) {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheetName = (CONFIG.SHEETS && CONFIG.SHEETS.CATEGORIES) ? CONFIG.SHEETS.CATEGORIES : 'Categories';
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return createJsonResponse({ success: false, error: 'Categories sheet not found.' });

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(id).trim()) {
      var rowNum = i + 1;
      if (category.name !== undefined) sheet.getRange(rowNum, 2).setValue(category.name);
      if (category.subtitle !== undefined) sheet.getRange(rowNum, 3).setValue(category.subtitle);
      if (category.orderIndex !== undefined) sheet.getRange(rowNum, 4).setValue(category.orderIndex);
      if (category.listImages !== undefined) sheet.getRange(rowNum, 5).setValue(category.listImages);
      if (category.status !== undefined) sheet.getRange(rowNum, 6).setValue(category.status);

      return createJsonResponse({ success: true, message: 'Category updated successfully.' });
    }
  }

  return createJsonResponse({ success: false, error: 'Category not found with id: ' + id });
}

function handleDeleteCategory(id) {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheetName = (CONFIG.SHEETS && CONFIG.SHEETS.CATEGORIES) ? CONFIG.SHEETS.CATEGORIES : 'Categories';
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return createJsonResponse({ success: false, error: 'Categories sheet not found.' });

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(id).trim()) {
      sheet.deleteRow(i + 1);
      return createJsonResponse({ success: true, message: 'Category deleted successfully.' });
    }
  }

  return createJsonResponse({ success: false, error: 'Category not found with id: ' + id });
}

// ==========================================
// 5. GOOGLE DRIVE IMAGE UPLOADER
// ==========================================

function handleUploadImage(data) {
  try {
    var base64Data = data.base64;
    var filename = data.filename || ('menu_item_' + Date.now() + '.jpg');
    var mimeType = data.mimeType || 'image/jpeg';

    if (!base64Data) {
      return createJsonResponse({ success: false, error: 'Base64 image data is missing.' });
    }

    if (base64Data.indexOf('base64,') > -1) {
      base64Data = base64Data.split('base64,')[1];
    }

    var decodedBytes = Utilities.base64Decode(base64Data);
    var blob = Utilities.newBlob(decodedBytes, mimeType, filename);

    var folderName = 'SuperCrab Menu Images';
    var folders = DriveApp.getFoldersByName(folderName);
    var targetFolder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

    var file = targetFolder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    var fileId = file.getId();
    var directUrl = 'https://drive.google.com/uc?export=view&id=' + fileId;

    return createJsonResponse({
      success: true,
      fileId: fileId,
      url: directUrl,
      filename: filename
    });
  } catch (uploadErr) {
    return createJsonResponse({ success: false, error: 'Drive upload error: ' + uploadErr.toString() });
  }
}

// ==========================================
// 6. UTILITY HELPERS
// ==========================================

function getSheetDataAsJson(sheetName) {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var headers = data[0].map(function(h) {
    return String(h).trim();
  });

  var rows = [];
  for (var r = 1; r < data.length; r++) {
    var rowObj = {};
    var hasContent = false;
    
    for (var c = 0; c < headers.length; c++) {
      var key = headers[c];
      if (!key) continue;

      var val = data[r][c];
      if (val !== '' && val !== null && val !== undefined) {
        hasContent = true;
      }
      
      if (String(val).toUpperCase() === 'TRUE' || val === true) val = true;
      else if (String(val).toUpperCase() === 'FALSE' || val === false) val = false;
      
      rowObj[key] = val;
    }

    if (hasContent && (rowObj.id || rowObj.name || rowObj['Order ID'] || rowObj.orderId)) {
      rows.push(rowObj);
    }
  }
  return rows;
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
