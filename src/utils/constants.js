/* Site Constants & Sample Data */

export const BRAND_NAME = 'SuperCrab TX';
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
    id: 'houston-heights',
    name: 'Houston (The Heights)',
    address: '1220 N Shepherd Dr, Houston, TX 77008',
    phone: '(713) 555-0192',
    email: 'heights@supercrabtx.com',
    hours: {
      weekday: '12:00 PM - 10:00 PM',
      weekend: '11:30 AM - 11:00 PM',
      raw: [
        { days: 'Mon - Thu', time: '12:00 PM - 10:00 PM' },
        { days: 'Fri - Sat', time: '11:30 AM - 11:00 PM' },
        { days: 'Sun', time: '11:30 AM - 10:00 PM' }
      ]
    },
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3462.6841793740875!2d-95.41162602377309!3d29.799580475046274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c74147ba01ef%3A0xe964f4340d2109e6!2s1220%20N%20Shepherd%20Dr%2C%20Houston%2C%20TX%2077008!5e0!3m2!1sen!2s!4v1718625500000!5m2!1sen!2s',
    googleMapsLink: 'https://maps.app.goo.gl/houston-heights-demo',
    posLinks: {
      square: 'https://squareupsandbox.com/market/supercrabtx-heights',
      order_online: 'https://order.online/store/supercrabtx-heights',
      postmates: 'https://postmates.com/merchant/supercrabtx-heights'
    },
    image: '/images/location-houston.jpg'
  },
  {
    id: 'austin-downtown',
    name: 'Austin (Downtown)',
    address: '601 Congress Ave., Austin, TX 78701',
    phone: '(512) 555-0143',
    email: 'austin@supercrabtx.com',
    hours: {
      weekday: '12:00 PM - 10:00 PM',
      weekend: '11:30 AM - 11:00 PM',
      raw: [
        { days: 'Mon - Thu', time: '12:00 PM - 10:00 PM' },
        { days: 'Fri - Sat', time: '11:30 AM - 11:00 PM' },
        { days: 'Sun', time: '11:30 AM - 10:00 PM' }
      ]
    },
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.98637780076!2d-97.74567222375549!3d30.267383674812392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b508ad9e19d7%3A0xe72688b1ccf21345!2s601%20Congress%20Ave.%2C%20Austin%2C%20TX%2078701!5e0!3m2!1sen!2s!4v1718625600000!5m2!1sen!2s',
    googleMapsLink: 'https://maps.app.goo.gl/austin-downtown-demo',
    posLinks: {
      square: 'https://squareupsandbox.com/market/supercrabtx-austin',
      order_online: 'https://order.online/store/supercrabtx-austin',
      postmates: 'https://postmates.com/merchant/supercrabtx-austin'
    },
    image: '/images/location-austin.jpg'
  },
  {
    id: 'dallas-uptown',
    name: 'Dallas (Uptown)',
    address: '2600 McKinney Ave, Dallas, TX 75204',
    phone: '(214) 555-0177',
    email: 'dallas@supercrabtx.com',
    hours: {
      weekday: '12:00 PM - 10:00 PM',
      weekend: '11:30 AM - 11:00 PM',
      raw: [
        { days: 'Mon - Thu', time: '12:00 PM - 10:00 PM' },
        { days: 'Fri - Sat', time: '11:30 AM - 11:00 PM' },
        { days: 'Sun', time: '11:30 AM - 10:00 PM' }
      ]
    },
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.2974492398453!2d-96.80424562365449!3d32.797746773663044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9921473fa73f%3A0xe54191fe78a9c362!2s2600%20McKinney%20Ave%2C%20Dallas%2C%20TX%2075204!5e0!3m2!1sen!2s!4v1718625700000!5m2!1sen!2s',
    googleMapsLink: 'https://maps.app.goo.gl/dallas-uptown-demo',
    posLinks: {
      square: 'https://squareupsandbox.com/market/supercrabtx-dallas',
      order_online: 'https://order.online/store/supercrabtx-dallas',
      postmates: 'https://postmates.com/merchant/supercrabtx-dallas'
    },
    image: '/images/location-dallas.jpg'
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
      { name: 'SuperCrab Special', desc: 'The ultimate blend of all three sauces!' }
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
  { id: 'seafood-boil', name: 'Seafood Boil' },
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'fried-baskets', name: 'Fried Baskets' },
  { id: 'sides', name: 'Sides' },
  { id: 'drinks', name: 'Drinks & Cocktails' }
];

export const MENU_ITEMS = [
  // Seafood Boil
  {
    id: 'king-crab',
    category: 'seafood-boil',
    name: 'King Crab Legs',
    description: 'Juicy, sweet, jumbo-sized crab legs pulled straight from icy waters. Sold by the pound.',
    price: 'Market Price',
    image: '/images/crab_legs.jpg',
    spiceLevel: 0, // Customer chooses
    featured: true
  },
  {
    id: 'snow-crab',
    category: 'seafood-boil',
    name: 'Snow Crab Legs',
    description: 'Sweet, tender, and delicate crab legs cooked to perfection in your choice of sauce.',
    price: '34.99 / lb',
    image: '/images/seafood_boil_close.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'lobster-tail',
    category: 'seafood-boil',
    name: 'Cold Water Lobster Tail',
    description: 'Meaty lobster tails boiled to tender perfection and tossed in rich garlic butter.',
    price: '28.99 / tail',
    image: '/images/gourmet_lobster_tray.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'shrimp-boil',
    category: 'seafood-boil',
    name: 'Jumbo Shrimp',
    description: 'Succulent jumbo shrimp, head-on or head-off, drenched in your favorite sauce.',
    price: '21.99 / lb',
    image: '/images/shrimp_boil.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'crawfish',
    category: 'seafood-boil',
    name: 'Fresh Live Crawfish',
    description: 'Fresh seasonal crawfish boiled in traditional cajun seasonings. Juicy and flavorful.',
    price: '16.99 / lb',
    image: '/images/crawfish_pile.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'clams-boil',
    category: 'seafood-boil',
    name: 'Littleneck Clams',
    description: 'Tender littleneck clams, steaming hot and tossed in garlic butter sauce.',
    price: '17.99 / lb',
    image: '/images/crawfish_close.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'mussels-boil',
    category: 'seafood-boil',
    name: 'Green Mussels',
    description: 'Plump green-lipped mussels, perfectly steamed to lock in coastal flavors.',
    price: '18.99 / lb',
    image: '/images/blue_crabs.jpg',
    spiceLevel: 0,
    featured: false
  },
  
  // Appetizers
  {
    id: 'fried-calamari',
    category: 'appetizers',
    name: 'Crispy Fried Calamari',
    description: 'Lightly battered calamari rings fried to golden perfection, served with sweet chili sauce.',
    price: '12.99',
    image: '/images/seafood_tray.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'crab-rangoon',
    category: 'appetizers',
    name: 'SuperCrab Rangoons (6pcs)',
    description: 'Crispy wontons stuffed with cream cheese, crab meat, and green onions.',
    price: '8.99',
    image: '/images/cooked_crab.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'chicken-wings',
    category: 'appetizers',
    name: 'Cajun Rub Chicken Wings (8pcs)',
    description: 'Jumbo wings tossed in our custom dry cajun rub, served with celery and ranch.',
    price: '11.99',
    image: '/images/chicken_wings.jpg',
    spiceLevel: 1,
    featured: false
  },
  {
    id: 'fried-oysters-app',
    category: 'appetizers',
    name: 'Fresh Gulf Oysters (12pcs)',
    description: 'Fresh Gulf oysters served raw on the half shell with crackers, hot sauce, and fresh lemon wedges.',
    price: '18.99',
    image: '/images/oysters_platter.jpg',
    spiceLevel: 0,
    featured: false
  },
  
  // Fried Baskets
  {
    id: 'catfish-basket',
    category: 'fried-baskets',
    name: 'Fried Catfish Basket',
    description: 'Hand-battered catfish fillets fried crispy, served with cajun fries and tartar sauce.',
    price: '16.99',
    image: '/images/seafood_tray.jpg',
    spiceLevel: 0,
    featured: true
  },
  {
    id: 'shrimp-basket',
    category: 'fried-baskets',
    name: 'Fried Shrimp Basket',
    description: 'Golden fried butterflied jumbo shrimp, served with fries and cocktail sauce.',
    price: '15.99',
    image: '/images/fried_shrimp_basket.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'chicken-tender-basket',
    category: 'fried-baskets',
    name: 'Chicken Tender Basket',
    description: 'Crispy southern-style chicken tenders served with honey mustard and fries.',
    price: '12.99',
    image: '/images/chicken_wings.jpg',
    spiceLevel: 0,
    featured: false
  },
 
  // Sides
  {
    id: 'cajun-fries',
    category: 'sides',
    name: 'Cajun Seasoned Fries',
    description: 'Crispy cut fries dusted in our signature spicy cajun seasoning mix.',
    price: '5.99',
    image: '/images/seafood_tray.jpg',
    spiceLevel: 1,
    featured: false
  },
  {
    id: 'sweet-potato-fries',
    category: 'sides',
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries served with a side of hot maple syrup.',
    price: '6.99',
    image: '/images/seafood_tray.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'garlic-bread',
    category: 'sides',
    name: 'Toasted Garlic Bread (3pcs)',
    description: 'French baguette slices grilled with loaded garlic herb butter.',
    price: '4.99',
    image: '/images/seafood_spread.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'corn-cob',
    category: 'sides',
    name: 'Extra Corn on the Cob',
    description: 'Sweet yellow corn boiled fresh, perfect for soaking up boil sauces.',
    price: '1.50',
    image: '/images/crawfish_close.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'extra-potato',
    category: 'sides',
    name: 'Extra Boiled Potatoes (3pcs)',
    description: 'Red potatoes steamed soft, a boil staple.',
    price: '2.50',
    image: '/images/seafood_spread.jpg',
    spiceLevel: 0,
    featured: false
  },
  
  // Drinks
  {
    id: 'lemonade',
    category: 'drinks',
    name: 'Fresh Squeezed Lemonade',
    description: 'Tangy, sweet lemonade squeezed fresh in-house daily.',
    price: '4.50',
    image: '/images/seafood_spread.jpg',
    spiceLevel: 0,
    featured: false
  },
  {
    id: 'crawfish-bloody-mary',
    category: 'drinks',
    name: 'SuperCrab Bloody Mary',
    description: 'House recipe spicy bloody mary mix, vodka, garnished with a boiled shrimp and lemon.',
    price: '12.00',
    image: '/images/seafood_spread.jpg',
    spiceLevel: 1,
    featured: true
  },
  {
    id: 'draft-beer',
    category: 'drinks',
    name: 'Local Texas Craft Draft Beer',
    description: 'Ask your server for our rotating selection of local Houston IPAs and lagers.',
    price: '7.00',
    image: '/images/seafood_spread.jpg',
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
    comment: 'The SuperCrab Special sauce is absolutely life-changing! We got the King Crab and Shrimp boil medium spice. Best crawfish and crab in Texas, hands down.'
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
