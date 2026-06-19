/* Site Constants & Sample Data */

export const BRAND_NAME = 'Super Crab TX';
export const BRAND_TAGLINE = 'Premium Cajun Seafood & Juicy Crab';

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/supercrabtx/',
  facebook: 'https://facebook.com/supercrabtx',
  twitter: 'https://twitter.com/supercrabtx',
  tiktok: 'https://tiktok.com/@supercrabtx'
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
    name: 'Super Crab TX',
    address: '3506 Palmer Hwy, Texas City, TX 77590, USA',
    phone: '',
    email: 'info@supercrabtx.com',
    hours: {
      weekday: '11:00 AM - 9:45 PM',
      weekend: '11:00 AM - 9:45 PM',
      raw: [
        { days: 'Mon - Sun', time: '11:00 AM - 9:45 PM' }
      ]
    },
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.932822452818!2d-94.9431872!3d29.3995831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x863f9da372fffffb%3A0xc665b17b6dc0af4c!2s3506%20Palmer%20Hwy%2C%20Texas%20City%2C%20TX%2077590%2C%20USA!5e0!3m2!1sen!2s!4v1718625500000!5m2!1sen!2s',
    googleMapsLink: 'https://maps.app.goo.gl/3506PalmerHwy',
    posLinks: {},
    image: '/images/restaurant.png'
  }
];

export const BOIL_STEPS = {
  step1: {
    title: 'Pick Your Seafood',
    description: 'Sold by the pound. Placed in a steam bag with corn and potato.',
    options: ['King Crab Legs', 'Snow Crab Legs', 'Lobster Tail', 'Shrimp (Head-on/off)', 'Crawfish', 'Clams', 'Green Mussels']
  },
  step2: {
    title: 'Choose Your Sauce',
    description: 'Coated in our signature flavor recipes made fresh daily.',
    options: [
      { name: 'Cajun Signature', desc: 'Bold, herbal, and Louisiana-spiced' },
      { name: 'Garlic Butter', desc: 'Creamy butter with mountains of minced garlic' },
      { name: 'Lemon Pepper', desc: 'Zesty lemon zest with cracked black pepper' },
      { name: 'Super Crab TX Special', desc: 'The ultimate blend of all three sauces!' }
    ]
  },
  step3: {
    title: 'Select Your Spice Level',
    description: 'From mild flavor-focused to explosive fiery heat.',
    options: [
      { name: 'Mild', spice: 1, desc: 'Zero heat, full flavor' },
      { name: 'Medium', spice: 2, desc: 'A nice warm kick' },
      { name: 'Hot', spice: 3, desc: 'Standard Louisiana boil heat' },
      { name: 'Super Hot', spice: 4, desc: 'Burn baby burn' },
      { name: 'Volcano', spice: 5, desc: 'Caution: Extreme heat! 🌶️🌶️🌶️' }
    ]
  }
};

export const MENU_CATEGORIES = [
  { id: 'seafood-boil', name: 'SEAFOOD BOILS', subtitle: 'Our Signature Catches - By The Half Pound Or Full Pound', listImages: ['/images/seafood_boil_list_1.jpg', '/images/seafood_boil_list_2.jpg', '/images/seafood_boil_list_3.jpg', '/images/seafood_boil_list_4.jpg', '/images/seafood_boil_list_5.jpg', '/images/seafood_boil_list_6.jpg'] },
  { id: 'combos', name: 'Combos', subtitle: 'The Ultimate Seafood Experience', listImages: ['/images/combo_1.jpg', '/images/combo_2.jpg', '/images/combo_3_new.jpg', '/images/combo_list_1.jpg', '/images/combo_list_2.jpg', '/images/combo_list_3.jpg'] },
  { id: 'chicken-wings', name: 'Chicken Wings' },
  { id: 'fried-baskets', name: 'Fried Basket', subtitle: 'Southern Fried Perfection Served With Cajun Fries', listImages: ['/images/fried_shrimp_basket.jpg', '/images/combo_1.jpg', '/images/combo_3_new.jpg'] },
  { id: 'po-boys', name: 'Sandwiches - Po Boy', subtitle: 'Hearty Po Boys & Sandwiches (Served with Cajun Fries)', listImages: ['/images/fried_shrimp_basket.jpg', '/images/combo_3_new.jpg', '/images/chicken_wings.jpg'] },
  { id: 'appetizers', name: 'TEXAS STARTERS', subtitle: 'Delicious Beginnings To Share', listImages: ['/images/oysters_platter.jpg', '/images/chicken_wings.jpg', '/images/gourmet_lobster_tray.jpg'] },
  { id: 'sides', name: 'Sides & Add-Ons', subtitle: 'Perfect Pairings For Your Seafood Feast', listImages: ['/images/crawfish_pile.jpg', '/images/shrimp_boil.jpg', '/images/combo_4.jpg'] },
  { id: 'drinks-soda', name: 'Drinks - Soda', listImages: ['/images/pepsi.png', '/images/mist_twist.png', '/images/orange_soda.png'] },
  { id: 'drinks-non-carbonated', name: 'Drinks - Non-Carbonated', listImages: ['/images/lemonade.png', '/images/apple_juice.png', '/images/ice_tea.png'] },
  { id: 'grilled', name: 'Grilled' }
];

export const MENU_ITEMS = [
  // Get Down & Messy! (Seafood Boil)
  {
    id: 'snow-crab',
    category: 'seafood-boil',
    name: 'Snow Crab',
    description: 'per pound.',
    price: '38.35',
    image: '/images/snow_crab.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'king-crab',
    category: 'seafood-boil',
    name: 'King Crab legs',
    description: 'Tender king crab legs served with lime wedges and a garnish.',
    price: '83.95',
    image: '/images/king_crab.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'dungeness-crab',
    category: 'seafood-boil',
    name: 'Dungeness Crab',
    description: 'Per Pound.',
    price: '39.55',
    image: '/images/crab_legs.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'shrimp-head-off',
    category: 'seafood-boil',
    name: 'Shrimp (Head Off)',
    description: '#1 Most liked item. 3/4 lb.',
    price: '20.35',
    image: '/images/shrimp_boil.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'shrimp-head-on',
    category: 'seafood-boil',
    name: 'Shrimp (Head On)',
    description: 'Per pound. Popular item.',
    price: '20.35',
    image: '/images/shrimp_boil.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'crawfish',
    category: 'seafood-boil',
    name: 'Crawfish',
    description: 'Per pound.',
    price: '13.15',
    image: '/images/crawfish.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'mussels',
    category: 'seafood-boil',
    name: 'Mussels',
    description: 'Per pound.',
    price: '16.75',
    image: '/images/mussels.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'clams',
    category: 'seafood-boil',
    name: 'Clams',
    description: 'Per pound.',
    price: '15.50',
    image: '/images/crawfish_close.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'lobster-tail',
    category: 'seafood-boil',
    name: 'Lobster Tail',
    description: 'Each.',
    price: '22.75',
    image: '/images/gourmet_lobster_tray.jpg',
    spiceLevel: 0,
    featured: false
  },
  
  // Combos
  {
    id: 'combo-1',
    category: 'combos',
    name: 'Combo 1',
    description: '1 lb. crawfish, 1 lb. mussel, 2 corns, 2 potatoes, 4 sausages.',
    price: '33.55',
    image: '/images/combo_1.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'combo-2',
    category: 'combos',
    name: 'Combo 2',
    description: '1 lb. shrimp (head on) or 3/4 shrimp (head off), 1 lb. clam, 2 corns, 2 potatoes, 4 sausages.',
    price: '37.15',
    image: '/images/combo_2.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'combo-3',
    category: 'combos',
    name: 'Combo 3',
    description: 'Snow crab legs, dungeness crab or king crab legs combo. 1 lb. shrimp (head on) or 3/4 shrimp (head off), 2 corns, 2 potatoes, 4 sausages.',
    price: '56.35',
    image: '/images/combo_3_new.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'combo-4',
    category: 'combos',
    name: 'Combo 4',
    description: '1 lobster or 1 dungeness crab, 1 lb. shrimp (head on) or 3/4 lb shrimp (head off), 1lb. crawfish, 1 lb clams, 2 corns, 2 potatoes, 4 sausages.',
    price: '95.95',
    image: '/images/combo_4_v2.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'combo-5',
    category: 'combos',
    name: 'Combo 5',
    description: 'Mixed shrimp options with head on or off, multiple flavor choices including Cajun, Garlic Butter, and more. Spice levels range from mild to fiery hot.',
    price: '37.15',
    image: '/images/combo_5.jpg',
    spiceLevel: 0,
    featured: false
  },

  // Chicken Wings
  {
    id: 'cajun-wings',
    category: 'chicken-wings',
    name: 'Cajun Wings',
    description: 'Spicy. popular item.',
    price: '10.75',
    image: '/images/chicken_wings.jpg',
    spiceLevel: 1,
    featured: true
  },
  {
    id: 'spicy-korean-wings',
    category: 'chicken-wings',
    name: 'Spicy Korean',
    description: 'Spicy.',
    price: '10.75',
    image: '/images/chicken_wings.jpg',
    spiceLevel: 2,
    featured: false
  },
  {
    id: 'lemon-pepper-wings',
    category: 'chicken-wings',
    name: 'Lemon Pepper Wings',
    description: 'Juicy chicken wings tossed in tangy lemon pepper seasoning. Available in 6 or 10 pieces.',
    price: '10.75',
    image: '/images/chicken_wings.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'bbq-wings',
    category: 'chicken-wings',
    name: 'BBQ Wings',
    description: 'BBQ chicken wings available in 6 or 10 pieces.',
    price: '10.75',
    image: '/images/chicken_wings.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'mango-habanero-wings',
    category: 'chicken-wings',
    name: 'Mango Habañero',
    description: 'Spicy.',
    price: '10.75',
    image: '/images/chicken_wings.jpg',
    spiceLevel: 1,
    featured: true
  },
  {
    id: 'hot-wings',
    category: 'chicken-wings',
    name: 'Hot Wings',
    description: 'Spicy.',
    price: '10.75',
    image: '/images/chicken_wings.jpg',
    spiceLevel: 2,
    featured: false
  },

  // Fried Baskets
  {
    id: 'fried-fish',
    category: 'fried-baskets',
    name: 'Fried Fish',
    description: 'popular item.',
    price: '16.15',
    image: '/images/fried_fish.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'calamari-rings',
    category: 'fried-baskets',
    name: 'Calamari Rings',
    description: 'Golden-brown breaded calamari rings served with a side of crisp fries.',
    price: '13.75',
    image: '/images/fried_shrimp_basket.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'chicken-tender',
    category: 'fried-baskets',
    name: 'Chicken Tender',
    description: 'Breaded and fried chicken strips, golden brown and crispy.',
    price: '13.75',
    image: '/images/chicken_tender.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'fried-oyster',
    category: 'fried-baskets',
    name: 'Fried Oyster',
    description: 'Golden-breaded oysters, deep-fried to a crisp and served in a portion suitable for sharing.',
    price: '17.35',
    image: '/images/fried_oyster.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'fried-shrimp',
    category: 'fried-baskets',
    name: 'Fried Shrimp',
    description: 'Golden-breaded shrimp, crispy on the outside with a succulent bite, served alongside a portion of golden fries.',
    price: '17.35',
    image: '/images/fried_shrimp_new.jpg',
    spiceLevel: 0,
    featured: true
  },

  // Grilled
  {
    id: 'cajun-fish',
    category: 'grilled',
    name: 'Cajun Fish',
    description: 'Topped with mango salsa, rice and salad on the side.',
    price: '16.75',
    image: '/images/cajun_fish_mango.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'house-grilled-shrimp',
    category: 'grilled',
    name: 'House Grilled Shrimp',
    description: 'Rice and Salad on the side',
    price: '19.15',
    image: '/images/seafood_tray.jpg',
    spiceLevel: 0,
    featured: false
  },

  // Sandwiches - Po Boy
  {
    id: 'oyster-po-boy',
    category: 'po-boys',
    name: 'Oyster Po Boy',
    description: 'Fried oysters on a toasted baguette, typically includes lettuce, tomato, and a spread of Cajun remoulade.',
    price: '16.75',
    image: '/images/oyster_po_boy.png',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'fish-po-boy',
    category: 'po-boys',
    name: 'Fish Po Boy',
    description: 'Crispy fried fish on a soft roll with lettuce and tomato.',
    price: '16.75',
    image: '/images/fish_po_boy.png',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'shrimp-po-boy',
    category: 'po-boys',
    name: 'Shrimp Po Boy',
    description: 'Crispy battered shrimp, shredded lettuce, and a zesty sauce nestled in a soft, long roll.',
    price: '16.75',
    image: '/images/shrimp_po_boy.jpg',
    spiceLevel: 0,
    featured: true
  },

  // Appetizers, Salads & Soups
  {
    id: 'green-salad',
    category: 'appetizers',
    name: 'Organic House Green Salad',
    description: 'A medley of organic mixed greens, crisp red cabbage, cherry tomatoes, cucumbers, and topped with crunchy fried onions.',
    price: '6.30',
    image: '/images/green_salad.png',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'gumbo',
    category: 'appetizers',
    name: 'Gumbo',
    description: 'A hearty stew with a mix of seafood, sausage, and vegetables, thickened with a dark roux.',
    price: '8.35',
    image: '/images/gumbo.png',
    spiceLevel: 1,
    featured: true
  },
  {
    id: 'french-fries',
    category: 'appetizers',
    name: 'French Fries',
    description: 'Golden strips of potatoes, deep-fried to a crisp texture.',
    price: '5.70',
    image: '/images/french_fries.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'cajun-fries',
    category: 'appetizers',
    name: 'Cajun Fries',
    description: 'Spicy. popular item.',
    price: '6.55',
    image: '/images/cajun_fries.jpg',
    spiceLevel: 1,
    featured: true
  },
  {
    id: 'lemon-pepper-fries',
    category: 'appetizers',
    name: 'Lemon Pepper Fries',
    description: 'Crispy fries seasoned with tangy lemon pepper seasoning.',
    price: '6.55',
    image: '/images/cajun_fries.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'sweet-potato-fries',
    category: 'appetizers',
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries with a deep golden hue, offering a naturally sweet and savory bite.',
    price: '6.55',
    image: '/images/french_fries.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'garlic-fries',
    category: 'appetizers',
    name: 'Garlic Fries',
    description: 'Crispy fries tossed with minced garlic, fresh parsley, and grated Parmesan cheese.',
    price: '7.10',
    image: '/images/garlic_fries.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'baked-oysters',
    category: 'appetizers',
    name: 'Baked Oysters (6)',
    description: 'Baked oysters: East coast oysters with cream spinach, bacon, and pecorino romano.',
    price: '17.95',
    image: '/images/baked_oysters.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'raw-oysters',
    category: 'appetizers',
    name: 'Raw Oysters',
    description: 'The above food item may be served raw or undercooked. Consuming raw or undercooked meats, poultry, seafoods or eggs may increase your risk of food borne illness.',
    price: '16.15',
    image: '/images/raw_oysters.png',
    spiceLevel: 0,
    featured: false
  },

  // Sides & Add-Ons
  {
    id: 'corn-on-the-cob',
    category: 'sides',
    name: 'Corn On the Cob',
    description: 'popular item.',
    price: '1.50',
    image: '/images/corn_on_cob.png',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'hard-boiled-egg',
    category: 'sides',
    name: 'Hard Boiled Egg',
    description: '',
    price: '1.25',
    image: '/images/hard_boiled_egg.png',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'potatoes',
    category: 'sides',
    name: 'Potatoes',
    description: '3 pieces.',
    price: '3.00',
    image: '/images/boiled_potatoes.png',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'steamed-rice',
    category: 'sides',
    name: 'Steamed Rice',
    description: 'Steamed white rice, a simple and versatile side.',
    price: '3.00',
    image: '/images/steamed_rice.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'seafood-spaghetti',
    category: 'sides',
    name: 'Seafood Spaghetti',
    description: 'Spaghetti with shrimp and clam.',
    price: '20.35',
    image: '/images/seafood_spaghetti.png',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'garlic-noodles',
    category: 'sides',
    name: 'Garlic Noodles',
    description: 'popular item.',
    price: '8.35',
    image: '/images/garlic_noodles.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'louisiana-sausages',
    category: 'sides',
    name: 'Louisiana Sausages',
    description: '6 pieces.',
    price: '3.90',
    image: '/images/louisiana_sausages.png',
    spiceLevel: 1,
    featured: true
  },
  {
    id: 'garlic-bread',
    category: 'sides',
    name: 'Garlic Bread',
    description: '3 pieces. Popular item.',
    price: '4.75',
    image: '/images/garlic_bread.jpg',
    spiceLevel: 0,
    featured: true
  },

  // Drinks - Soda
  {
    id: 'pepsi',
    category: 'drinks-soda',
    name: 'Pepsi',
    description: 'The bold, refreshing, robust cola',
    price: '3.90',
    image: '/images/pepsi.png',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'diet-pepsi',
    category: 'drinks-soda',
    name: 'Diet Pepsi',
    description: 'A crisp tasting, refreshing pop of sweet, fizzy bubbles without calories.',
    price: '3.90',
    image: '/images/pepsi.png',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'mist-twist',
    category: 'drinks-soda',
    name: 'Mist Twist',
    description: 'Mist Twist, a lemon-lime flavored soda offering a refreshing and crisp taste with a hint of citrus.',
    price: '3.90',
    image: '/images/mist_twist.png',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'orange-soda',
    category: 'drinks-soda',
    name: 'Orange Soda',
    description: 'Effervescent Orange Soda: A Sweet, Citrus-Infused Beverage',
    price: '3.90',
    image: '/images/orange_soda.png',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'dr-pepper',
    category: 'drinks-soda',
    name: 'Dr. Pepper',
    description: 'Unique blend of 23 flavors, carbonated soft drink.',
    price: '3.90',
    image: '/images/dr_pepper.png',
    spiceLevel: 0,
    featured: false
  },

  // Drinks - Non-Carbonated
  {
    id: 'fruit-punch',
    category: 'drinks-non-carbonated',
    name: 'Fruit Punch',
    description: 'A refreshing blend of juicy fruits, perfectly sweetened for a thirst-quenching treat.',
    price: '3.90',
    image: '/images/fruit_punch.png',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'apple-juice',
    category: 'drinks-non-carbonated',
    name: 'Apple Juice',
    description: 'Freshly squeezed apple nectar, packed with the tart and sweet essence of ripe apples.',
    price: '3.90',
    image: '/images/apple_juice.png',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'orange-juice',
    category: 'drinks-non-carbonated',
    name: 'Orange Juice',
    description: 'Classic citrus refreshment.',
    price: '3.90',
    image: '/images/orange_soda.png',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'lemonade',
    category: 'drinks-non-carbonated',
    name: 'Lemonade',
    description: 'Refreshing citrus beverage.',
    price: '3.90',
    image: '/images/lemonade.png',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'ice-tea',
    category: 'drinks-non-carbonated',
    name: 'Ice Tea',
    description: 'Refreshing chilled tea, perfectly brewed for a revitalizing experience.',
    price: '3.90',
    image: '/images/ice_tea.png',
    spiceLevel: 0,
    featured: false
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Houston, TX',
    stars: 5,
    comment: 'The Super Crab TX Special sauce is absolutely life-changing! We got the King Crab and Shrimp boil medium spice. Best crawfish and crab in Texas, hands down.'
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
