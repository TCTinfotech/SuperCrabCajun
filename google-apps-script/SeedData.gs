/**
 * MIGRATION / SEED DATA SCRIPT FOR SUPERCRAB
 * Run `migrateAllDataToSheets()` to automatically populate 
 * Categories and Products tabs in your Google Sheet.
 */

var SEED_CATEGORIES = [
  { id: 'appetizers', name: 'Appetizers', subtitle: 'Delicious Beginnings To Share', orderIndex: 1, listImages: '/images/oysters_platter.webp, /images/chicken_wings.webp, /images/gourmet_lobster_tray.webp', status: 'Active' },
  { id: 'fried-baskets', name: 'Fried Basket', subtitle: 'Southern Fried Perfection Served With Cajun Fries', orderIndex: 2, listImages: '/images/fried_shrimp_basket.webp, /images/combo_1.webp, /images/combo_3_new.webp', status: 'Active' },
  { id: 'salad-soups', name: 'Salad & Soups', subtitle: 'Fresh Greens & Warm Creole Soups', orderIndex: 3, listImages: '/images/green_salad.webp, /images/gumbo.webp', status: 'Active' },
  { id: 'combos', name: 'Combos', subtitle: 'No Substitutions. All Combos - Market Price', orderIndex: 4, listImages: '/images/combo_1.webp, /images/combo_2.webp, /images/combo_3_new.webp', status: 'Active' },
  { id: 'sides', name: 'Sides & add-ons', subtitle: 'Perfect Pairings & Side Extras For Your Feast', orderIndex: 5, listImages: '/images/crawfish_pile.webp, /images/shrimp_boil.webp, /images/combo_4.webp', status: 'Active' },
  { id: 'grilled', name: 'Grilled', subtitle: 'Sizzling Grilled Seafood & House Specialties', orderIndex: 6, listImages: '/images/seafood_tray.webp', status: 'Active' },
  { id: 'chicken-wings', name: 'Chicken wings', subtitle: 'Crispy Wings Tossed In Your Favorite Seasoning', orderIndex: 7, listImages: '/images/cajun_wings.webp', status: 'Active' },
  { id: 'sandwiches', name: 'Sandwiches', subtitle: 'Hearty Po Boys & Sandwiches (Served with Cajun Fries)', orderIndex: 8, listImages: '/images/shrimp_po_boy.webp, /images/oyster_po_boy.webp, /images/fish_po_boy.webp', status: 'Active' },
  { id: 'drinks-soda-non-carbonated', name: 'Drinks - Soda/Non-Carbonated', subtitle: 'Refreshing Beverages', orderIndex: 9, listImages: '/images/pepsi.webp, /images/lemonade.webp, /images/apple_juice.webp', status: 'Active' },
  { id: 'kids-menu', name: 'Kids Menu', subtitle: 'Delightful meals for Kids (Served with Fries)', orderIndex: 10, listImages: '/images/chicken_tender.webp', status: 'Active' },
  { id: 'lunch-specials', name: 'Lunch Specials', subtitle: 'Daily Lunch Deals (Mon - Fri 11:00 AM - 3:00 PM)', orderIndex: 11, listImages: '/images/lunch_louisiana_chicken.webp', status: 'Active' }
];

var SEED_PRODUCTS = [
  // Appetizers
  { id: 'onion-rings', category: 'appetizers', name: 'Onion Ring', price: 5.50, description: 'Crispy golden fried onion rings served hot and crunchy.', image: '/images/onion_rings.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'spicy-edamame', category: 'appetizers', name: 'Spicy Edamame', price: 8.15, description: 'Steamed green soybeans tossed in bold spicy garlic Cajun seasoning.', image: '/images/green_salad.webp', spiceLevel: 1, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'french-fries', category: 'appetizers', name: 'French Fries', price: 5.70, description: 'Golden strips of potatoes, deep-fried to a crisp texture.', image: '/images/french_fries.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'cajun-fries', category: 'appetizers', name: 'Cajun Fries', price: 6.55, description: 'Crispy fries tossed in our signature bold Cajun seasoning blend.', image: '/images/cajun_fries.webp', spiceLevel: 1, badge: 'Popular Item', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'lemon-pepper-fries', category: 'appetizers', name: 'Lemon Pepper Fries', price: 6.55, description: 'Crispy fries seasoned with tangy lemon zest and cracked black pepper.', image: '/images/cajun_fries.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'sweet-potato-fries', category: 'appetizers', name: 'Sweet Potato Fries', price: 6.55, description: 'Crispy sweet potato fries offering a naturally sweet and savory bite.', image: '/images/french_fries.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'garlic-fries', category: 'appetizers', name: 'Garlic Fries', price: 7.10, description: 'Crispy fries tossed with minced garlic, fresh parsley, and Parmesan cheese.', image: '/images/garlic_fries.webp', spiceLevel: 0, badge: 'Popular Item', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'baked-oysters', category: 'appetizers', name: 'Baked Oysters (6)', price: 17.95, description: 'East Coast oysters baked with creamy spinach, bacon, and pecorino romano.', image: '/images/baked_oysters.webp', spiceLevel: 0, badge: 'Chef Choice', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'raw-oysters', category: 'appetizers', name: 'Raw Oysters', price: 16.15, description: 'Fresh half-shell raw oysters served cold with zesty cocktail sauce and lemon.', image: '/images/raw_oysters.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },

  // Fried Basket
  { id: 'fried-fish', category: 'fried-baskets', name: 'Fried Fish', price: 16.15, description: 'Golden-crisp fried fish fillets served hot with seasoned Cajun fries.', image: '/images/fried_fish.webp', spiceLevel: 0, badge: 'Popular Item', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'calamari-rings', category: 'fried-baskets', name: 'Calamari Rings', price: 13.75, description: 'Golden-brown breaded calamari rings served with crisp fries.', image: '/images/fried_shrimp_basket.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'chicken-tender', category: 'fried-baskets', name: 'Chicken Tender', price: 13.75, description: 'Breaded and fried tender chicken strips served with crisp fries.', image: '/images/chicken_tender.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'fried-oyster', category: 'fried-baskets', name: 'Fried Oyster', price: 17.35, description: 'Golden-breaded oysters deep-fried to perfection with fries.', image: '/images/fried_oyster.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'fried-shrimp', category: 'fried-baskets', name: 'Fried Shrimp', price: 17.35, description: 'Crispy butterflied shrimp served alongside golden Cajun fries.', image: '/images/fried_shrimp_new.webp', spiceLevel: 0, badge: 'Popular Item', badgeType: 'popular', featured: true, isAvailable: true },

  // Salad & Soups
  { id: 'green-salad', category: 'salad-soups', name: 'Organic House Green Salad', price: 6.30, description: 'Mixed greens, red cabbage, cherry tomatoes, cucumbers & fried onions.', image: '/images/green_salad.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'gumbo', category: 'salad-soups', name: 'Gumbo', price: 8.35, description: 'Hearty Creole stew with seafood, sausage, and vegetables in dark roux.', image: '/images/gumbo.webp', spiceLevel: 1, badge: 'Popular Item', badgeType: 'popular', featured: true, isAvailable: true },

  // Combos
  { id: 'combo-1', category: 'combos', name: 'Combo 1', price: 33.55, description: '1lb Crawfish, 1lb Mussel, 2 Corns, 2 Potatoes, 4 Sausages', image: '/images/combo_1.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'combo-2', category: 'combos', name: 'Combo 2', price: 37.15, description: '1lb Shrimp (head on) OR 3/4lb Shrimp (head off), 1lb Clam, 2 Corns, 2 Potatoes, 4 Sausages', image: '/images/combo_2.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'combo-3', category: 'combos', name: 'Combo 3', price: 56.35, description: 'Choose one: 1lb Snow Crab Legs, 1lb Dungeness Crab, or 1lb King Crab Legs. Includes: 1lb Shrimp (head on) OR 3/4lb Shrimp (head off), 2 Corns, 2 Potatoes, 4 Sausages', image: '/images/combo_3_new.webp', spiceLevel: 0, badge: 'Most Ordered', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'combo-4', category: 'combos', name: 'Combo 4', price: 107.95, description: 'Choose one: 1 Lobster OR 1lb Dungeness Crab. Includes: 1lb Shrimp (head on) OR 3/4lb Shrimp (head off), 1lb Crawfish, 1lb Clams, 2 Corns, 2 Potatoes, 4 Sausages', image: '/images/combo_4_v2.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'combo-5', category: 'combos', name: 'Combo 5', price: 37.15, description: '1lb Shrimp (head on) OR 3/4lb Shrimp (head off), 1lb Crawfish, 2 Corns, 2 Potatoes, 4 Sausages', image: '/images/combo_5.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },

  // Sides & Add-Ons
  { id: 'potatoes', category: 'sides', name: 'Potatoes', price: 3.00, description: '3 tender boiled red potatoes coated in seasoned garlic butter.', image: '/images/boiled_potatoes.webp', spiceLevel: 0, badge: '#1 Most Liked', badgeType: 'most-liked-1', featured: false, isAvailable: true },
  { id: 'corn-on-the-cob', category: 'sides', name: 'Corn On the Cob', price: 1.50, description: 'Sweet corn on the cob soaked in rich seafood boil broth.', image: '/images/corn_on_cob.webp', spiceLevel: 0, badge: '#2 Most Liked', badgeType: 'most-liked-2', featured: false, isAvailable: true },
  { id: 'hard-boiled-egg', category: 'sides', name: 'Hard Boiled Egg', price: 1.25, description: 'Boiled egg infused with rich garlic butter and Cajun seasonings.', image: '/images/hard_boiled_egg.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'steamed-rice', category: 'sides', name: 'Steamed Rice', price: 3.00, description: 'Steamed white rice, perfect for soaking up delicious boil sauces.', image: '/images/steamed_rice.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'seafood-spaghetti', category: 'sides', name: 'Seafood Spaghetti', price: 20.35, description: 'Spaghetti pasta tossed with fresh shrimp, clams & garlic broth.', image: '/images/seafood_spaghetti.webp', spiceLevel: 0, badge: 'Popular Item', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'garlic-noodles', category: 'sides', name: 'Garlic Noodles', price: 8.35, description: 'Savory noodles wok-tossed with sweet garlic butter and herbs.', image: '/images/garlic_noodles.webp', spiceLevel: 0, badge: 'Popular Item', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'louisiana-sausages', category: 'sides', name: 'Louisiana Sausages', price: 3.90, description: '6 slices of savory smoked Louisiana pork sausages.', image: '/images/louisiana_sausages.webp', spiceLevel: 1, badge: 'Popular Item', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'garlic-bread', category: 'sides', name: 'Garlic Bread', price: 4.75, description: '3 thick slices of toasted garlic bread, ideal for dipping in sauce.', image: '/images/garlic_bread.webp', spiceLevel: 0, badge: 'Popular Item', badgeType: 'popular', featured: true, isAvailable: true },

  // Grilled
  { id: 'cajun-fish', category: 'grilled', name: 'Cajun Fish', price: 16.75, description: 'Grilled fish topped with fresh mango salsa, served with rice & salad.', image: '/images/cajun_fish_mango.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'house-grilled-shrimp', category: 'grilled', name: 'House Grilled Shrimp', price: 19.15, description: 'Juicy seasoned grilled shrimp served with steamed rice & fresh salad.', image: '/images/seafood_tray.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },

  // Chicken Wings
  { id: 'cajun-wings', category: 'chicken-wings', name: 'Cajun Wings', price: 10.75, description: 'Crispy chicken wings tossed in spicy authentic Cajun rub.', image: '/images/cajun_wings.webp', spiceLevel: 1, badge: 'Popular Item', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'spicy-korean-wings', category: 'chicken-wings', name: 'Spicy Korean', price: 10.75, description: 'Crispy wings glazed in sweet and fiery Korean chili sauce.', image: '/images/spicy_korean_wings.webp', spiceLevel: 2, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'lemon-pepper-wings', category: 'chicken-wings', name: 'Lemon Pepper Wings', price: 10.75, description: 'Juicy wings tossed in tangy lemon pepper seasoning.', image: '/images/lemon_pepper_wings.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'bbq-wings', category: 'chicken-wings', name: 'BBQ Wings', price: 10.75, description: 'Crispy chicken wings coated in sweet and smoky BBQ glaze.', image: '/images/bbq_wings.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'mango-habanero-wings', category: 'chicken-wings', name: 'Mango Habañero', price: 10.75, description: 'Crispy wings tossed in sweet mango glaze infused with fiery habanero.', image: '/images/mango_habanero_wings.webp', spiceLevel: 1, badge: 'Popular Item', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'hot-wings', category: 'chicken-wings', name: 'Hot Wings', price: 10.75, description: 'Classic spicy buffalo wings tossed in tangy hot sauce.', image: '/images/hot_wings.webp', spiceLevel: 2, badge: '', badgeType: 'popular', featured: false, isAvailable: true },

  // Sandwiches
  { id: 'oyster-po-boy', category: 'sandwiches', name: 'Oyster Po Boy', price: 16.75, description: 'Fried oysters on toasted baguette with lettuce, tomato & remoulade.', image: '/images/oyster_po_boy.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'fish-po-boy', category: 'sandwiches', name: 'Fish Po Boy', price: 16.75, description: 'Crispy fried fish fillet on soft roll with lettuce and fresh tomato.', image: '/images/fish_po_boy.webp', spiceLevel: 0, badge: 'Popular Item', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'shrimp-po-boy', category: 'sandwiches', name: 'Shrimp Po Boy', price: 16.75, description: 'Crispy battered shrimp with shredded lettuce & zesty sauce on soft roll.', image: '/images/shrimp_po_boy.webp', spiceLevel: 0, badge: 'Popular Item', badgeType: 'popular', featured: true, isAvailable: true },

  // Drinks
  { id: 'pepsi', category: 'drinks-soda-non-carbonated', name: 'Pepsi', price: 3.90, description: 'The bold, refreshing, robust cola.', image: '/images/pepsi.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'diet-pepsi', category: 'drinks-soda-non-carbonated', name: 'Diet Pepsi', price: 3.90, description: 'Crisp tasting, refreshing pop of fizzy sweet cola with zero calories.', image: '/images/pepsi.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'mist-twist', category: 'drinks-soda-non-carbonated', name: 'Mist Twist', price: 3.90, description: 'Crisp lemon-lime soda offering a sweet, citrusy pop.', image: '/images/mist_twist.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'orange-soda', category: 'drinks-soda-non-carbonated', name: 'Orange Soda', price: 3.90, description: 'Effervescent orange soda with a sweet, citrus-infused flavor.', image: '/images/orange_soda.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'dr-pepper', category: 'drinks-soda-non-carbonated', name: 'Dr. Pepper', price: 3.90, description: 'Unique blend of 23 flavors in a carbonated soft drink.', image: '/images/dr_pepper.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'fruit-punch', category: 'drinks-soda-non-carbonated', name: 'Fruit Punch', price: 3.90, description: 'Refreshing blend of sweet juicy fruit flavors served chilled.', image: '/images/fruit_punch.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'apple-juice', category: 'drinks-soda-non-carbonated', name: 'Apple Juice', price: 3.90, description: '100% pure apple juice packed with crisp and sweet fruit flavor.', image: '/images/apple_juice.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'orange-juice', category: 'drinks-soda-non-carbonated', name: 'Orange Juice', price: 3.90, description: 'Freshly squeezed 100% natural orange juice served ice cold.', image: '/images/orange_soda.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'lemonade', category: 'drinks-soda-non-carbonated', name: 'Lemonade', price: 3.90, description: 'Classic freshly squeezed lemonade with the perfect sweet-tart balance.', image: '/images/lemonade.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'ice-tea', category: 'drinks-soda-non-carbonated', name: 'Ice Tea', price: 3.90, description: 'Refreshing chilled tea, freshly brewed daily.', image: '/images/ice_tea.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },

  // Kids Menu
  { id: 'kids-shrimp', category: 'kids-menu', name: 'Fried Shrimp', price: 8.95, description: 'Crispy fried shrimp.', image: '/images/fried_shrimp_basket.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'kids-tenders', category: 'kids-menu', name: 'Chicken Tenders', price: 7.95, description: 'Golden chicken tenders.', image: '/images/chicken_tender.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },
  { id: 'kids-fish', category: 'kids-menu', name: 'Fried Fish', price: 8.95, description: 'Tender fried fish strip.', image: '/images/fried_fish.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: false, isAvailable: true },

  // Lunch Specials
  { id: 'lunch-louisiana-chicken', category: 'lunch-specials', name: 'Louisiana Chicken', price: 12.45, description: 'Savory Louisiana seasoned chicken served with steamed white rice and fresh side greens.', image: '/images/lunch_louisiana_chicken.webp', spiceLevel: 0, badge: 'Popular Lunch', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'lunch-cajun-fish', category: 'lunch-specials', name: 'Cajun Fish', price: 13.45, description: 'Flavorful grilled Cajun fish fillet served with steamed white rice and fresh side greens.', image: '/images/lunch_cajun_fish.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'lunch-grilled-beef', category: 'lunch-specials', name: 'Grilled Beef', price: 13.45, description: 'Tender grilled beef slices served with steamed white rice and fresh side greens.', image: '/images/lunch_grilled_beef.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: true, isAvailable: true },
  { id: 'lunch-house-grill-shrimp', category: 'lunch-specials', name: 'House Grill Shrimp', price: 14.45, description: 'Juicy seasoned grilled shrimp served with steamed white rice and fresh side greens.', image: '/images/lunch_house_grill_shrimp.webp', spiceLevel: 0, badge: '', badgeType: 'popular', featured: true, isAvailable: true }
];

/**
 * Migration function to populate Google Sheet with SuperCrab categories & menu items
 */
function migrateAllDataToSheets() {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

  // 1. POPULATE CATEGORIES
  var catSheetName = (CONFIG.SHEETS && CONFIG.SHEETS.CATEGORIES) ? CONFIG.SHEETS.CATEGORIES : 'Categories';
  var catSheet = ss.getSheetByName(catSheetName);
  if (!catSheet) {
    catSheet = ss.insertSheet(catSheetName);
  } else {
    catSheet.clear();
  }

  catSheet.appendRow(['id', 'name', 'subtitle', 'orderIndex', 'listImages', 'status']);
  catSheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');

  SEED_CATEGORIES.forEach(function(cat) {
    catSheet.appendRow([
      cat.id,
      cat.name,
      cat.subtitle,
      cat.orderIndex,
      cat.listImages,
      cat.status
    ]);
  });

  // 2. POPULATE PRODUCTS
  var prodSheetName = (CONFIG.SHEETS && CONFIG.SHEETS.PRODUCTS) ? CONFIG.SHEETS.PRODUCTS : 'Products';
  var prodSheet = ss.getSheetByName(prodSheetName);
  if (!prodSheet) {
    prodSheet = ss.insertSheet(prodSheetName);
  } else {
    prodSheet.clear();
  }

  prodSheet.appendRow(['id', 'category', 'name', 'price', 'description', 'image', 'spiceLevel', 'badge', 'badgeType', 'featured', 'isAvailable']);
  prodSheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');

  SEED_PRODUCTS.forEach(function(item) {
    prodSheet.appendRow([
      item.id,
      item.category,
      item.name,
      item.price,
      item.description,
      item.image,
      item.spiceLevel,
      item.badge,
      item.badgeType,
      item.featured ? 'TRUE' : 'FALSE',
      item.isAvailable ? 'TRUE' : 'FALSE'
    ]);
  });

  Logger.log('Migration Completed: Seeded ' + SEED_CATEGORIES.length + ' categories and ' + SEED_PRODUCTS.length + ' products.');
  return {
    success: true,
    categoriesCount: SEED_CATEGORIES.length,
    productsCount: SEED_PRODUCTS.length
  };
}
