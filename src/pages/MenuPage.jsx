import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import './MenuPage.css';

export default function MenuPage() {
  const [openSection, setOpenSection] = useState('seafood-boils');

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const menuSections = {
    'seafood-boils': {
      title: 'Seafood Boils',
      subtitle: 'Our Signature Catches - By The Half Pound Or Full Pound',
      columns: [
        ['• BLUE CRAB (SEASONAL)', '• LOBSTER TAIL', '• SNOW CRAB LEGS', '• SHRIMP (NO HEAD)'],
        ['• SHRIMP (HEAD ON)', '• CRAWFISH', '• CLAMS', '• KING CRAB LEGS'],
        ['• GREEN MUSSEL', '• BLACK MUSSEL', '• DUNGENESS CRAB', '• SAUSAGE']
      ],
      images: ['/images/seafood_boil_close.jpg', '/images/crab_legs.jpg', '/images/crawfish_pile.jpg']
    },
    'texas-starters': {
      title: 'Texas Starters',
      subtitle: 'Delicious Beginnings To Share',
      columns: [
        ['• RAW GULF OYSTERS', '• CRISPY FRIED CALAMARI', '• STEAMED CLAMS'],
        ['• CRAB RANGOONS', '• CAJUN CHICKEN WINGS', '• MOZZARELLA STICKS'],
        ['• FRIED GULF OYSTERS', '• HUSH PUPPIES', '• EXTRA CORN & POTATO']
      ],
      images: ['/images/oysters_platter.jpg', '/images/chicken_wings.jpg', '/images/gourmet_lobster_tray.jpg']
    },
    'lone-star-fried': {
      title: 'Lone Star Fried Baskets',
      subtitle: 'Southern Fried Perfection Served With Cajun Fries',
      columns: [
        ['• FRIED SHRIMP BASKET', '• FRIED TILAPIA BASKET'],
        ['• FRIED CATFISH BASKET', '• FRIED OYSTER BASKET'],
        ['• CHICKEN TENDER BASKET', '• FRIED SCALLOP BASKET']
      ],
      images: ['/images/fried_shrimp_basket.jpg', '/images/seafood_tray.jpg', '/images/blue_crabs.jpg']
    },
    'texas-sandwiches': {
      title: 'Texas-Sized Sandwiches',
      subtitle: 'Hearty Po Boys & Sandwiches (Served with Cajun Fries)',
      columns: [
        ['• FRIED CATFISH PO BOY', '• FRIED SHRIMP PO BOY'],
        ['• FRIED OYSTER PO BOY', '• CHICKEN TENDER PO BOY'],
        ['• SOFT SHELL CRAB PO BOY', '• GATOR MEAT PO BOY']
      ],
      images: ['/images/fried_shrimp_basket.jpg', '/images/seafood_boil_close.jpg', '/images/chicken_wings.jpg']
    },
    'southern-sides': {
      title: 'Southern Sides',
      subtitle: 'Perfect Pairings For Your Seafood Feast',
      columns: [
        ['• CAJUN FRIES', '• SWEET POTATO FRIES', '• HUSH PUPPIES'],
        ['• CORN ON THE COB', '• BOILED POTATOES', '• STEAMED RICE'],
        ['• COLESLAW', '• GARLIC BREAD', '• SAUSAGE SLICES']
      ],
      images: ['/images/crawfish_pile.jpg', '/images/shrimp_boil.jpg', '/images/seafood_spread.jpg']
    },
    'dessert': {
      title: 'Dessert',
      subtitle: 'Save Room For Dessert',
      columns: [
        ['• NEW YORK CHEESECAKE', '• CHOCOLATE MOLTEN CAKE'],
        ['• PECAN PIE', '• BEIGNETS'],
        ['• VANILLA BEAN ICE CREAM']
      ],
      images: ['/images/cooked_crab.jpg', '/images/seafood_tray.jpg', '/images/crab_legs.jpg']
    },
    'beverages': {
      title: 'Beverages',
      subtitle: 'Refreshing Drinks To Cool The Heat',
      columns: [
        ['• FOUNTAIN DRINKS', '• SWEET ICED TEA', '• UNSWEETENED ICED TEA'],
        ['• FRESH LEMONADE', '• DOMESTIC BEER', '• IMPORTED BEER'],
        ['• SIGNATURE MARGARITAS', '• BOTTLED WATER']
      ],
      images: ['/images/blue_crabs.jpg', '/images/oysters_platter.jpg', '/images/shrimp_boil.jpg']
    }
  };

  return (
    <div className="menu-page">
      <SEOHead
        title="Our Menu"
        description="Browse the Super Crab TX menu. Discover our signature Cajun seafood boils, starters, fried baskets, and spice customizations."
        canonicalUrl="/menu"
      />

      {/* Menu Banner */}
      <section className="menu-hero-banner">
        {/* Floating outlines graphics */}
        <div className="menu-banner-graphics">
          <span className="decor-crab-line">🦀</span>
          <span className="decor-garlic-line">🧄</span>
          <span className="decor-chili-line">🌶️</span>
        </div>

        <div className="container banner-text animate-slide-up">
          <h1 className="banner-title">OUR MENU</h1>
          <div className="banner-title-line" />
          <p className="banner-desc">
            Louisiana soul, Texas heat. At Super Crab TX, every seafood boil is a celebration — snow crab, crawfish, shrimp, and lobster tail, smothered in our signature Cajun sauces and seasoned to perfection. We pour passion into every bag, blending bold Southern spices with rich garlic butter and zesty lemon pepper.
          </p>
          <p className="banner-desc second-desc">
            Roll up your sleeves, crack open a claw, and let the garlic butter flow. Whether you like it mild or volcano-hot, our kitchen brings the flavor and the fire. This isn't just dinner — this is the boil. 🔥
          </p>
        </div>
      </section>

      {/* 3 Step Customizer Cards (Image 7) */}
      <section className="menu-steps-section">
        <div className="container">
          <div className="steps-cards-grid">
            {/* Step 1 */}
            <div className="step-navy-card">
              <h3 className="card-step-num">STEP 1</h3>
              <h4 className="card-step-title">PICK YOUR CATCH</h4>
              <ul className="card-step-list">
                <li>BLUE CRAB</li>
                <li>LOBSTER TAIL</li>
                <li>SNOW CRAB LEGS</li>
                <li>SHRIMP (HEAD-OFF)</li>
                <li>SHRIMP (HEAD-ON)</li>
                <li>CRAWFISH</li>
                <li>CLAMS</li>
                <li>GREEN MUSSELS</li>
                <li>BLACK MUSSELS</li>
                <li>KING CRAB LEGS</li>
                <li>DUNGENESS</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="step-navy-card">
              <h3 className="card-step-num">STEP 2</h3>
              <h4 className="card-step-title">THROW IN THE SAUCE</h4>
              <ul className="card-step-list">
                <li>CAJUN</li>
                <li>LEMON PEPPER</li>
                <li>GARLIC BUTTER</li>
                <li>JUICY SPECIAL (ALL OF THE ABOVE)</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="step-navy-card">
              <h3 className="card-step-num">STEP 3</h3>
              <h4 className="card-step-title">LET'S GET SPICY</h4>
              <ul className="card-step-list">
                <li>NO SPICE</li>
                <li>MILD</li>
                <li>MEDIUM</li>
                <li>HOT</li>
                <li>EXTRA HOT</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Accordions List (Images 8, 9) */}
      <section className="menu-accordions-section">
        <div className="container">
          <div className="accordions-container">
            {Object.entries(menuSections).map(([id, sec]) => {
              const isOpen = openSection === id;
              return (
                <div key={id} className="accordion-item">
                  {/* Header Button */}
                  <button
                    onClick={() => toggleSection(id)}
                    className={`accordion-header-btn ${isOpen ? 'open' : ''}`}
                    aria-expanded={isOpen}
                  >
                    <span>{sec.title}</span>
                    {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </button>

                  {/* Panel Content */}
                  {isOpen && (
                    <div className="accordion-panel-content animate-slide-up">
                      <p className="panel-subtitle">{sec.subtitle}</p>

                      <div className="panel-columns-grid">
                        {sec.columns.map((col, cIdx) => (
                          <ul key={cIdx} className="panel-list-col">
                            {col.map((item, iIdx) => (
                              <li key={iIdx}>{item}</li>
                            ))}
                          </ul>
                        ))}
                      </div>

                      {/* 3 Rounded images */}
                      <div className="panel-images-row">
                        {sec.images.map((imgUrl, imgIdx) => (
                          <div key={imgIdx} className="panel-image-card">
                            <img src={imgUrl} alt={`${sec.title} dish preview`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA — Full-width dark style */}
      <section className="menu-cta-v2">
        <div className="cta-v2-bg-decor">
          <span className="cta-v2-fire-1">🔥</span>
          <span className="cta-v2-fire-2">🔥</span>
        </div>
        <div className="container cta-v2-inner">
          <h2 className="cta-v2-title">HUNGRY YET?</h2>
          <p className="cta-v2-subtitle">
            Find your nearest Super Crab TX and start your seafood boil adventure today.
          </p>
          <div className="cta-v2-buttons">
            <a href="https://order.online/store/super-crab-palmer-hwy-2519187?utm_id=97757_v0_s00_e0_tv0&fbclid=IwY2xjawSiMLRleHRuA2FlbQIxMABicmlkETF3ZHNwWEcwZmhXeUE0S21hc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHvh1dshdA9SIHiYPlSsqGydpM2CXrBo74wV2RZdQknVODcuVEeSSDevaBNUf_aem__1rPImzAoWoAvodEpsUFyA" target="_blank" rel="noopener noreferrer" className="cta-v2-btn cta-v2-primary">
              <span>Order Now</span>
            </a>
            <Link to="/contact" className="cta-v2-btn cta-v2-outline">
              <MapPin size={18} />
              <span>Visit Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
