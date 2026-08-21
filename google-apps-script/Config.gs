/**
 * CONFIGURATION FILE FOR SUPERCRAB
 * Supports:
 * 1. Google Sheets Database (Orders, Categories, Products)
 * 2. Square Online Checkout API (Apple Pay, Google Pay, Credit/Debit Cards, Afterpay)
 * 3. Direct Pay at Store / Pickup
 */
var CONFIG = {
  // 1. Google Sheet ID where orders, categories & products are stored
  SPREADSHEET_ID: '1dmj0Fdjumb84IxTTiG7wTJ9ie8PWin3XNJNAiCQl4eA',

  // 2. Names of the tabs in Google Sheet
  SHEETS: {
    ORDERS: 'Orders',
    CATEGORIES: 'Categories',
    PRODUCTS: 'Products'
  },
  SHEET_NAME: 'Orders', // Fallback compatibility

  // 3. SQUARE PAYMENT CONFIGURATION (US Preferred)
  // Get Access Token & Location ID from https://developer.squareup.com
  SQUARE_ACCESS_TOKEN: 'EAAA_YOUR_SQUARE_ACCESS_TOKEN_HERE',
  SQUARE_LOCATION_ID: 'YOUR_SQUARE_LOCATION_ID_HERE',
  SQUARE_ENVIRONMENT: 'sandbox', // 'sandbox' for testing, 'production' for live payments

  // 4. Return URLs after payment completes or cancels
  SUCCESS_URL: 'https://supercrabtx.com/thank-you?order_id={CHECKOUT_SESSION_ID}&payment=square',
  CANCEL_URL: 'https://supercrabtx.com/checkout',

  // 5. Tax rate (8.25% in Texas)
  TAX_RATE: 0.0825
};
