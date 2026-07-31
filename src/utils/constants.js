/* Site Constants & Sample Data */

export const BRAND_NAME = 'Super Crab';
export const BRAND_TAGLINE = 'Premium Cajun Seafood & Juicy Crab';

export const DOORDASH_ORDER_URL = 'https://order.online/store/super-crab-palmer-hwy-2519187?utm_id=97757_v0_s00_e0_tv0&fbclid=IwY2xjawSiMLRleHRuA2FlbQIxMABicmlkETF3ZHNwWEcwZmhXeUE0S21hc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHvh1dshdA9SIHiYPlSsqGydpM2CXrBo74wV2RZdQknVODcuVEeSSDevaBNUf_aem__1rPImzAoWoAvodEpsUFyA';

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/supercrabtx/',
  facebook: 'https://www.facebook.com/SuperCrab?mibextid=wwXIfr&rdid=pMiIIRKJinwGHLEv&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GXmRGFdXz%2F%3Fmibextid%3DwwXIfr#',
  twitter: 'https://twitter.com/supercrabtx',
  tiktok: 'https://www.tiktok.com/@supercrabtx?_r=1&_d=secCgYIASAHKAESPgo8yWeZ3Z3Qaxi6VpvfywCmD4ZE2u%2FUEQ4X5bU2i3FEKf2w8yH1nOlZ2r4EMNUMmcE23epKY2wU86qk9PLVGgA%3D&_svg=3&checksum=e4cb3aa36fa7ef6faf569f50337535002dadc19ea737f3f2dc0221d15c5b4f9a&item_author_type=2&panel_source_v2=share_panel&reflow_sign_scene=7&rgssign=8.1.uqITtOBCOQw4_TtX14PN_w&sec_uid=MS4wLjABAAAAhnumkyINLKvWvt0eL3C2J0X4VCJB3OvIql-4fp4oZWs8CD8CPT_-GCZZVEgqkX2h&sec_user_id=MS4wLjABAAAAJTsBsuFlFcyKfti-tFH-mseVKmNjQNlgGMYELxBC-1xc0CRXqePvztT8-M-9aSYq&share_app_id=1233&share_author_id=7641770909477553166&share_enter_from=others_homepage&share_link_id=A2A02EED-70BB-4556-9C95-6341406DF9E7&share_region=US&share_scene=1&sharer_language=en&social_share_type=5&source=h5_m&timestamp=1783993110&tt_from=copy&u_code=d04mcljc4k5a63&ug_btm=b6880%2Cb5836&user_id=6557218652314583041&utm_campaign=client_share&utm_medium=ios&utm_source=copy&fbclid=IwY2xjawTMOQRleHRuA2FlbQIxMABicmlkETFQbkhDenY2YzE4ZUNDTzFnc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHu3DV_sL0fD2LEZeduxjnsEnRIxCQjRHxvnu1VFsti-761wrhInjzebULhZf_aem_u74Nv2WOI5q9kwut_qC7kg'
};

export const POS_PLATFORMS = [
  {
    id: 'square',
    name: 'Square POS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Square_App_Logo.png',
    description: 'Order directly through our Square Store for fast pickup.',
    url: 'https://squareupsandbox.com/market/supercrabtx'
  },
  {
    id: 'order_online',
    name: 'Order.online',
    logo: 'https://images.squarespace-cdn.com/content/v1/5be48c1cfc59cc5f6d8c0b02/1544645281488-8N3V7K1H1A8YUNV344I6/order.online.png',
    description: 'Quick local delivery and carryout orders via Order.online.',
    url: 'https://order.online/store/supercrabtx'
  },
  {
    id: 'postmates',
    name: 'Postmates',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Postmates_logo.svg/2560px-Postmates_logo.svg.png',
    description: 'Get your favorite crab boils delivered to your doorstep via Postmates.',
    url: 'https://postmates.com/merchant/supercrabtx-houston'
  },
  {
    id: 'posbank',
    name: 'POSbank Delivery',
    logo: 'https://posbank.com/logo.png', // Fallback placeholder
    description: 'Order table-side pickup or delivery powered by POSbank.',
    url: 'https://posbank.order/supercrabtx'
  }
];

export const LOCATIONS = [
  {
    id: 'palmer-hwy',
    name: 'Super Crab',
    address: '3506 Palmer Hwy, Texas City, TX 77590, USA',
    phone: '(409) 655-5502',
    email: 'info@supercrabtx.com',
    hours: {
      weekday: '11:30 AM - 10:30 PM',
      weekend: '11:30 AM - 11:00 PM',
      raw: [
        { days: 'Monday', time: '11:30 AM - 10:30 PM' },
        { days: 'Tuesday', time: '11:30 AM - 10:30 PM' },
        { days: 'Wednesday', time: '11:30 AM - 10:30 PM' },
        { days: 'Thursday', time: '11:30 AM - 10:30 PM' },
        { days: 'Friday', time: '11:30 AM - 11:00 PM' },
        { days: 'Saturday', time: '11:30 AM - 11:00 PM' },
        { days: 'Sunday', time: '12:00 PM - 9:00 PM' }
      ]
    },
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.932822452818!2d-94.9431872!3d29.3995831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x863f9da372fffffb%3A0xc665b17b6dc0af4c!2s3506%20Palmer%20Hwy%2C%20Texas%20City%2C%20TX%2077590%2C%20USA!5e0!3m2!1sen!2s!4v1718625500000!5m2!1sen!2s',
    googleMapsLink: 'https://maps.app.goo.gl/3506PalmerHwy',
    posLinks: {},
    image: '/images/restaurant_heb.jpg'
  }
];

export const BOIL_STEPS = {
  step1: {
    title: 'Pick Your Seafood',
    description: 'Sold by the pound. Placed in a steam bag with corn and potato.',
    options: [
      'Lobster',
      'Dungeness Crab',
      'King Crab Legs',
      'Snow Crab Legs',
      'Crawfish (Seasonal)',
      'Crawfish (Frozen)',
      'Shrimp (Head on)',
      'Shrimp (Head off)',
      'Mussels',
      'Clams',
      'Lobster Tail'
    ]
  },
  step2: {
    title: 'Choose a Seasoning',
    description: 'Coated in our signature flavor recipes made fresh daily.',
    options: [
      { name: 'Louisiana Flavor', desc: 'Authentic Creole & Louisiana seasonings' },
      { name: 'Original Cajun', desc: 'Bold, herbal, and traditional Cajun recipe' },
      { name: 'Lemon Pepper', desc: 'Zesty lemon zest with cracked black pepper' },
      { name: 'Garlic Butter', desc: 'Creamy butter with mountains of minced garlic' },
      { name: 'House Special Sauce', desc: 'Our signature blend of all favorite flavors!' }
    ]
  },
  step3: {
    title: 'Select Your Spice Level',
    description: 'From non-spicy to fiery extra hot.',
    options: [
      { name: 'Not Spicy', spice: 0, desc: 'Zero heat, pure delicious flavor' },
      { name: 'Little Bit', spice: 1, desc: 'A gentle touch of warmth' },
      { name: 'Mild', spice: 2, desc: 'Mild flavor-focused kick' },
      { name: 'Medium', spice: 3, desc: 'Balanced medium heat' },
      { name: 'Dynamite X', spice: 4, desc: 'Fiery hot heat!' },
      { name: 'On Fire XX', spice: 5, desc: 'Caution: Extreme heat! 🔥🔥' }
    ]
  }
};

export const MENU_CATEGORIES = [
  { id: 'appetizers', name: 'Appetizers', subtitle: 'Delicious Beginnings To Share', listImages: ['/images/oysters_platter.webp', '/images/chicken_wings.webp', '/images/gourmet_lobster_tray.webp'] },
  { id: 'fried-baskets', name: 'Fried Basket', subtitle: 'Southern Fried Perfection Served With Cajun Fries', listImages: ['/images/fried_shrimp_basket.webp', '/images/combo_1.webp', '/images/combo_3_new.webp'] },
  { id: 'salad-soups', name: 'Salad & Soups', subtitle: 'Fresh Greens & Warm Creole Soups', listImages: ['/images/green_salad.webp', '/images/gumbo.webp'] },
  { id: 'combos', name: 'Combos', subtitle: 'No Substitutions. All Combos - Market Price', listImages: ['/images/combo_1.webp', '/images/combo_2.webp', '/images/combo_3_new.webp', '/images/combo_list_1.webp', '/images/combo_list_2.webp', '/images/combo_list_3.webp'] },
  { id: 'sides', name: 'Sides & add-ons', subtitle: 'Perfect Pairings & Side Extras For Your Feast', listImages: ['/images/crawfish_pile.webp', '/images/shrimp_boil.webp', '/images/combo_4.webp'] },
  { id: 'grilled', name: 'Grilled', subtitle: 'Sizzling Grilled Seafood & House Specialties' },
  { id: 'chicken-wings', name: 'Chicken wings', subtitle: 'Crispy Wings Tossed In Your Favorite Seasoning' },
  { id: 'sandwiches', name: 'Sandwiches', subtitle: 'Hearty Po Boys & Sandwiches (Served with Cajun Fries)', listImages: ['/images/shrimp_po_boy.webp', '/images/oyster_po_boy.webp', '/images/fish_po_boy.webp'] },
  { id: 'drinks-soda-non-carbonated', name: 'Drinks - Soda/Non-Carbonated', listImages: ['/images/pepsi.webp', '/images/lemonade.webp', '/images/apple_juice.webp'] },
  { id: 'kids-menu', name: 'Kids Menu', subtitle: 'Delightful meals for Kids (Served with Fries)' },
  { id: 'lunch-specials', name: 'Lunch Specials', subtitle: 'Daily Lunch Deals (Mon - Fri 11:00 AM - 3:00 PM)' }
];

export const MENU_ITEMS = [
  // Appetizers
  {
    id: 'onion-rings',
    category: 'appetizers',
    name: 'Onion Ring',
    description: 'Crispy golden fried onion rings served hot and crunchy.',
    price: '5.50',
    image: '/images/onion_rings.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'spicy-edamame',
    category: 'appetizers',
    name: 'Spicy Edamame',
    description: 'Steamed green soybeans tossed in bold spicy garlic Cajun seasoning.',
    price: '8.15',
    image: '/images/green_salad.webp',
    spiceLevel: 1,
    featured: false
  },
  {
    id: 'french-fries',
    category: 'appetizers',
    name: 'French Fries',
    description: 'Golden strips of potatoes, deep-fried to a crisp texture.',
    price: '5.70',
    image: '/images/french_fries.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'cajun-fries',
    category: 'appetizers',
    name: 'Cajun Fries',
    description: 'Crispy fries tossed in our signature bold Cajun seasoning blend.',
    price: '6.55',
    image: '/images/cajun_fries.webp',
    spiceLevel: 1,
    featured: true,
    badge: 'Popular Item',
    badgeType: 'popular'
  },
  {
    id: 'lemon-pepper-fries',
    category: 'appetizers',
    name: 'Lemon Pepper Fries',
    description: 'Crispy fries seasoned with tangy lemon zest and cracked black pepper.',
    price: '6.55',
    image: '/images/cajun_fries.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'sweet-potato-fries',
    category: 'appetizers',
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries offering a naturally sweet and savory bite.',
    price: '6.55',
    image: '/images/french_fries.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'garlic-fries',
    category: 'appetizers',
    name: 'Garlic Fries',
    description: 'Crispy fries tossed with minced garlic, fresh parsley, and Parmesan cheese.',
    price: '7.10',
    image: '/images/garlic_fries.webp',
    spiceLevel: 0,
    featured: true,
    badge: 'Popular Item',
    badgeType: 'popular'
  },
  {
    id: 'baked-oysters',
    category: 'appetizers',
    name: 'Baked Oysters (6)',
    description: 'East Coast oysters baked with creamy spinach, bacon, and pecorino romano.',
    price: '17.95',
    image: '/images/baked_oysters.webp',
    spiceLevel: 0,
    featured: true,
    badge: 'Chef Choice',
    badgeType: 'popular'
  },
  {
    id: 'raw-oysters',
    category: 'appetizers',
    name: 'Raw Oysters',
    description: 'Fresh half-shell raw oysters served cold with zesty cocktail sauce and lemon.',
    price: '16.15',
    image: '/images/raw_oysters.webp',
    spiceLevel: 0,
    featured: false
  },

  // Fried Basket
  {
    id: 'fried-fish',
    category: 'fried-baskets',
    name: 'Fried Fish',
    description: 'Golden-crisp fried fish fillets served hot with seasoned Cajun fries.',
    price: '16.15',
    image: '/images/fried_fish.webp',
    spiceLevel: 0,
    featured: true,
    badge: 'Popular Item',
    badgeType: 'popular'
  },
  {
    id: 'calamari-rings',
    category: 'fried-baskets',
    name: 'Calamari Rings',
    description: 'Golden-brown breaded calamari rings served with crisp fries.',
    price: '13.75',
    image: '/images/fried_shrimp_basket.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'chicken-tender',
    category: 'fried-baskets',
    name: 'Chicken Tender',
    description: 'Breaded and fried tender chicken strips served with crisp fries.',
    price: '13.75',
    image: '/images/chicken_tender.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'fried-oyster',
    category: 'fried-baskets',
    name: 'Fried Oyster',
    description: 'Golden-breaded oysters deep-fried to perfection with fries.',
    price: '17.35',
    image: '/images/fried_oyster.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'fried-shrimp',
    category: 'fried-baskets',
    name: 'Fried Shrimp',
    description: 'Crispy butterflied shrimp served alongside golden Cajun fries.',
    price: '17.35',
    image: '/images/fried_shrimp_new.webp',
    spiceLevel: 0,
    featured: true,
    badge: 'Popular Item',
    badgeType: 'popular'
  },

  // Salad & Soups
  {
    id: 'green-salad',
    category: 'salad-soups',
    name: 'Organic House Green Salad',
    description: 'Mixed greens, red cabbage, cherry tomatoes, cucumbers & fried onions.',
    price: '6.30',
    image: '/images/green_salad.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'gumbo',
    category: 'salad-soups',
    name: 'Gumbo',
    description: 'Hearty Creole stew with seafood, sausage, and vegetables in dark roux.',
    price: '8.35',
    image: '/images/gumbo.webp',
    spiceLevel: 1,
    featured: true,
    badge: 'Popular Item',
    badgeType: 'popular'
  },

  // Combos
  {
    id: 'combo-1',
    category: 'combos',
    name: 'Combo 1',
    description: '1lb Crawfish, 1lb Mussel, 2 Corns, 2 Potatoes, 4 Sausages',
    price: '33.55',
    image: '/images/combo_1.webp',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'combo-2',
    category: 'combos',
    name: 'Combo 2',
    description: '1lb Shrimp (head on) OR 3/4lb Shrimp (head off), 1lb Clam, 2 Corns, 2 Potatoes, 4 Sausages',
    price: '37.15',
    image: '/images/combo_2.webp',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'combo-3',
    category: 'combos',
    name: 'Combo 3',
    description: 'Choose one: 1lb Snow Crab Legs, 1lb Dungeness Crab, or 1lb King Crab Legs. Includes: 1lb Shrimp (head on) OR 3/4lb Shrimp (head off), 2 Corns, 2 Potatoes, 4 Sausages',
    price: '56.35',
    image: '/images/combo_3_new.webp',
    spiceLevel: 0,
    featured: true,
    badge: 'Most Ordered',
    badgeType: 'popular'
  },
  {
    id: 'combo-4',
    category: 'combos',
    name: 'Combo 4',
    description: 'Choose one: 1 Lobster OR 1lb Dungeness Crab. Includes: 1lb Shrimp (head on) OR 3/4lb Shrimp (head off), 1lb Crawfish, 1lb Clams, 2 Corns, 2 Potatoes, 4 Sausages',
    price: '107.95',
    image: '/images/combo_4_v2.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'combo-5',
    category: 'combos',
    name: 'Combo 5',
    description: '1lb Shrimp (head on) OR 3/4lb Shrimp (head off), 1lb Crawfish, 2 Corns, 2 Potatoes, 4 Sausages',
    price: '37.15',
    image: '/images/combo_5.webp',
    spiceLevel: 0,
    featured: false
  },

  // Sides & Add-Ons
  {
    id: 'potatoes',
    category: 'sides',
    name: 'Potatoes',
    description: '3 tender boiled red potatoes coated in seasoned garlic butter.',
    price: '3.00',
    image: '/images/boiled_potatoes.webp',
    spiceLevel: 0,
    featured: false,
    badge: '#1 Most Liked',
    badgeType: 'most-liked-1'
  },
  {
    id: 'corn-on-the-cob',
    category: 'sides',
    name: 'Corn On the Cob',
    description: 'Sweet corn on the cob soaked in rich seafood boil broth.',
    price: '1.50',
    image: '/images/corn_on_cob.webp',
    spiceLevel: 0,
    featured: false,
    badge: '#2 Most Liked',
    badgeType: 'most-liked-2'
  },
  {
    id: 'hard-boiled-egg',
    category: 'sides',
    name: 'Hard Boiled Egg',
    description: 'Boiled egg infused with rich garlic butter and Cajun seasonings.',
    price: '1.25',
    image: '/images/hard_boiled_egg.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'steamed-rice',
    category: 'sides',
    name: 'Steamed Rice',
    description: 'Steamed white rice, perfect for soaking up delicious boil sauces.',
    price: '3.00',
    image: '/images/steamed_rice.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'seafood-spaghetti',
    category: 'sides',
    name: 'Seafood Spaghetti',
    description: 'Spaghetti pasta tossed with fresh shrimp, clams & garlic broth.',
    price: '20.35',
    image: '/images/seafood_spaghetti.webp',
    spiceLevel: 0,
    featured: true,
    badge: 'Popular Item',
    badgeType: 'popular'
  },
  {
    id: 'garlic-noodles',
    category: 'sides',
    name: 'Garlic Noodles',
    description: 'Savory noodles wok-tossed with sweet garlic butter and herbs.',
    price: '8.35',
    image: '/images/garlic_noodles.webp',
    spiceLevel: 0,
    featured: true,
    badge: 'Popular Item',
    badgeType: 'popular'
  },
  {
    id: 'louisiana-sausages',
    category: 'sides',
    name: 'Louisiana Sausages',
    description: '6 slices of savory smoked Louisiana pork sausages.',
    price: '3.90',
    image: '/images/louisiana_sausages.webp',
    spiceLevel: 1,
    featured: true,
    badge: 'Popular Item',
    badgeType: 'popular'
  },
  {
    id: 'garlic-bread',
    category: 'sides',
    name: 'Garlic Bread',
    description: '3 thick slices of toasted garlic bread, ideal for dipping in sauce.',
    price: '4.75',
    image: '/images/garlic_bread.webp',
    spiceLevel: 0,
    featured: true,
    badge: 'Popular Item',
    badgeType: 'popular'
  },

  // Grilled
  {
    id: 'cajun-fish',
    category: 'grilled',
    name: 'Cajun Fish',
    description: 'Grilled fish topped with fresh mango salsa, served with rice & salad.',
    price: '16.75',
    image: '/images/cajun_fish_mango.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'house-grilled-shrimp',
    category: 'grilled',
    name: 'House Grilled Shrimp',
    description: 'Juicy seasoned grilled shrimp served with steamed rice & fresh salad.',
    price: '19.15',
    image: '/images/seafood_tray.webp',
    spiceLevel: 0,
    featured: false
  },

  // Chicken Wings
  {
    id: 'cajun-wings',
    category: 'chicken-wings',
    name: 'Cajun Wings',
    description: 'Crispy chicken wings tossed in spicy authentic Cajun rub.',
    price: '10.75',
    image: '/images/cajun_wings.webp',
    spiceLevel: 1,
    featured: true,
    badge: 'Popular Item',
    badgeType: 'popular'
  },
  {
    id: 'spicy-korean-wings',
    category: 'chicken-wings',
    name: 'Spicy Korean',
    description: 'Crispy wings glazed in sweet and fiery Korean chili sauce.',
    price: '10.75',
    image: '/images/spicy_korean_wings.webp',
    spiceLevel: 2,
    featured: false
  },
  {
    id: 'lemon-pepper-wings',
    category: 'chicken-wings',
    name: 'Lemon Pepper Wings',
    description: 'Juicy wings tossed in tangy lemon pepper seasoning.',
    price: '10.75',
    image: '/images/lemon_pepper_wings.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'bbq-wings',
    category: 'chicken-wings',
    name: 'BBQ Wings',
    description: 'Crispy chicken wings coated in sweet and smoky BBQ glaze.',
    price: '10.75',
    image: '/images/bbq_wings.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'mango-habanero-wings',
    category: 'chicken-wings',
    name: 'Mango Habañero',
    description: 'Crispy wings tossed in sweet mango glaze infused with fiery habanero.',
    price: '10.75',
    image: '/images/mango_habanero_wings.webp',
    spiceLevel: 1,
    featured: true,
    badge: 'Popular Item',
    badgeType: 'popular'
  },
  {
    id: 'hot-wings',
    category: 'chicken-wings',
    name: 'Hot Wings',
    description: 'Classic spicy buffalo wings tossed in tangy hot sauce.',
    price: '10.75',
    image: '/images/hot_wings.webp',
    spiceLevel: 2,
    featured: false
  },

  // Sandwiches
  {
    id: 'oyster-po-boy',
    category: 'sandwiches',
    name: 'Oyster Po Boy',
    description: 'Fried oysters on toasted baguette with lettuce, tomato & remoulade.',
    price: '16.75',
    image: '/images/oyster_po_boy.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'fish-po-boy',
    category: 'sandwiches',
    name: 'Fish Po Boy',
    description: 'Crispy fried fish fillet on soft roll with lettuce and fresh tomato.',
    price: '16.75',
    image: '/images/fish_po_boy.webp',
    spiceLevel: 0,
    featured: true,
    badge: 'Popular Item',
    badgeType: 'popular'
  },
  {
    id: 'shrimp-po-boy',
    category: 'sandwiches',
    name: 'Shrimp Po Boy',
    description: 'Crispy battered shrimp with shredded lettuce & zesty sauce on soft roll.',
    price: '16.75',
    image: '/images/shrimp_po_boy.webp',
    spiceLevel: 0,
    featured: true,
    badge: 'Popular Item',
    badgeType: 'popular'
  },

  // Drinks - Soda/Non-Carbonated
  {
    id: 'pepsi',
    category: 'drinks-soda-non-carbonated',
    name: 'Pepsi',
    description: 'The bold, refreshing, robust cola.',
    price: '3.90',
    image: '/images/pepsi.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'diet-pepsi',
    category: 'drinks-soda-non-carbonated',
    name: 'Diet Pepsi',
    description: 'Crisp tasting, refreshing pop of fizzy sweet cola with zero calories.',
    price: '3.90',
    image: '/images/pepsi.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'mist-twist',
    category: 'drinks-soda-non-carbonated',
    name: 'Mist Twist',
    description: 'Crisp lemon-lime soda offering a sweet, citrusy pop.',
    price: '3.90',
    image: '/images/mist_twist.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'orange-soda',
    category: 'drinks-soda-non-carbonated',
    name: 'Orange Soda',
    description: 'Effervescent orange soda with a sweet, citrus-infused flavor.',
    price: '3.90',
    image: '/images/orange_soda.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'dr-pepper',
    category: 'drinks-soda-non-carbonated',
    name: 'Dr. Pepper',
    description: 'Unique blend of 23 flavors in a carbonated soft drink.',
    price: '3.90',
    image: '/images/dr_pepper.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'fruit-punch',
    category: 'drinks-soda-non-carbonated',
    name: 'Fruit Punch',
    description: 'Refreshing blend of sweet juicy fruit flavors served chilled.',
    price: '3.90',
    image: '/images/fruit_punch.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'apple-juice',
    category: 'drinks-soda-non-carbonated',
    name: 'Apple Juice',
    description: '100% pure apple juice packed with crisp and sweet fruit flavor.',
    price: '3.90',
    image: '/images/apple_juice.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'orange-juice',
    category: 'drinks-soda-non-carbonated',
    name: 'Orange Juice',
    description: 'Freshly squeezed 100% natural orange juice served ice cold.',
    price: '3.90',
    image: '/images/orange_soda.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'lemonade',
    category: 'drinks-soda-non-carbonated',
    name: 'Lemonade',
    description: 'Classic freshly squeezed lemonade with the perfect sweet-tart balance.',
    price: '3.90',
    image: '/images/lemonade.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'ice-tea',
    category: 'drinks-soda-non-carbonated',
    name: 'Ice Tea',
    description: 'Refreshing chilled tea, freshly brewed daily.',
    price: '3.90',
    image: '/images/ice_tea.webp',
    spiceLevel: 0,
    featured: false
  },

  // Kids Menu
  {
    id: 'kids-shrimp',
    category: 'kids-menu',
    name: 'Fried Shrimp',
    description: 'Crispy fried shrimp.',
    price: '8.95',
    image: '/images/fried_shrimp_basket.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'kids-tenders',
    category: 'kids-menu',
    name: 'Chicken Tenders',
    description: 'Golden chicken tenders.',
    price: '7.95',
    image: '/images/chicken_tender.webp',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'kids-fish',
    category: 'kids-menu',
    name: 'Fried Fish',
    description: 'Tender fried fish strip.',
    price: '8.95',
    image: '/images/fried_fish.webp',
    spiceLevel: 0,
    featured: false
  },

  // Lunch Specials (Available weekdays until 3pm)
  {
    id: 'lunch-louisiana-chicken',
    category: 'lunch-specials',
    name: 'Louisiana Chicken',
    description: 'Savory Louisiana seasoned chicken served with steamed white rice and fresh side greens.',
    price: '12.45',
    image: '/images/lunch_louisiana_chicken.webp',
    spiceLevel: 0,
    featured: true,
    badge: 'Popular Lunch',
    badgeType: 'popular'
  },
  {
    id: 'lunch-cajun-fish',
    category: 'lunch-specials',
    name: 'Cajun Fish',
    description: 'Flavorful grilled Cajun fish fillet served with steamed white rice and fresh side greens.',
    price: '13.45',
    image: '/images/lunch_cajun_fish.webp',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'lunch-grilled-beef',
    category: 'lunch-specials',
    name: 'Grilled Beef',
    description: 'Tender grilled beef slices served with steamed white rice and fresh side greens.',
    price: '13.45',
    image: '/images/lunch_grilled_beef.webp',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'lunch-house-grill-shrimp',
    category: 'lunch-specials',
    name: 'House Grill Shrimp',
    description: 'Juicy seasoned grilled shrimp served with steamed white rice and fresh side greens.',
    price: '14.45',
    image: '/images/lunch_house_grill_shrimp.webp',
    spiceLevel: 0,
    featured: true
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Houston, TX',
    stars: 5,
    comment: 'The Super Crab Special sauce is absolutely life-changing! We got the King Crab and Shrimp boil medium spice. Best crawfish and crab in Texas, hands down.'
  },
  {
    id: 2,
    name: 'Michael T.',
    location: 'Austin, TX',
    stars: 5,
    comment: 'Friendly staff, amazing vibe, and the seafood is incredibly fresh. The fried oysters were crispy and light, and the snow crab legs were massive!'
  },
  {
    id: 3,
    name: 'Elena R.',
    location: 'Dallas, TX',
    stars: 5,
    comment: 'I love how easy it is to order online. The packaging kept our boil piping hot until we got home. Highly recommend the garlic butter flavor at Hot level!'
  }
];
