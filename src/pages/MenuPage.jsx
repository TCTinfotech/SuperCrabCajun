import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
      subtitle: 'Order By The Half Pound Or Full Pound! (Minimum One Pound)',
      columns: [
        ['• BLUE CRAB (SEASONAL)', '• LOBSTER TAIL', '• SNOW CRAB LEGS', '• SHRIMP (NO HEAD)'],
        ['• SHRIMP (HEAD ON)', '• CRAWFISH', '• CLAMS', '• KING CRAB LEGS'],
        ['• GREEN MUSSEL', '• BLACK MUSSEL', '• DUNGENESS CRAB', '• SAUSAGE']
      ],
      images: ['/images/seafood_spread.jpg', '/images/seafood_boil_close.jpg', '/images/cooked_crab.jpg']
    },
    'appetizers': {
      title: 'Appetizers',
      subtitle: 'Delicious Starters To Share',
      columns: [
        ['• RAW GULF OYSTERS', '• CRISPY FRIED CALAMARI', '• STEAMED CLAMS'],
        ['• CRAB RANGOONS', '• CAJUN CHICKEN WINGS', '• MOZZARELLA STICKS'],
        ['• FRIED GULF OYSTERS', '• HUSH PUPPIES', '• EXTRA CORN & POTATO']
      ],
      images: ['/images/oysters_platter.jpg', '/images/chicken_wings.jpg', '/images/seafood_tray.jpg']
    },
    'something-fried': {
      title: 'Something Fried',
      subtitle: 'Crispy Deliciousness Served With Cajun Fries',
      columns: [
        ['• FRIED SHRIMP BASKET', '• FRIED TILAPIA BASKET'],
        ['• FRIED CATFISH BASKET', '• FRIED OYSTER BASKET'],
        ['• CHICKEN TENDER BASKET', '• FRIED SCALLOP BASKET']
      ],
      images: ['/images/fried_shrimp_basket.jpg', '/images/seafood_tray.jpg', '/images/chicken_wings.jpg']
    }
  };

  return (
    <div className="menu-page">
      <SEOHead
        title="Our Menu"
        description="Browse the Red Crab Seafood menu. Discover our signature Cajun seafood boils, starters, fried baskets, and spice customizations."
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
            At Red Crab, we bring the bold, mouthwatering flavors forged in the heat of the South straight to your table. Our signature spices and seasonings create a seafood boil experience that's unforgettable.
          </p>
          <p className="banner-desc second-desc">
            Our founders, passionate seafood boil enthusiasts, set out to craft the best flavor for the dish they loved. After experimenting with spices and seasonings from around the globe, they perfected the unique blend that defines Red Crab. Proudly bringing the heat with our signature sauce, we promise you will "Crave the Boil!"
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

      {/* Bottom CTA Banner (Image 10) */}
      <section className="menu-cta-banner-section">
        <div className="container">
          <div className="menu-cta-banner">
            {/* Decor shrimps overlay */}
            <div className="cta-shrimp-decor">
              <span className="cta-shrimp-1">🦐</span>
              <span className="cta-shrimp-2">🦐</span>
              <span className="cta-shrimp-3">🦐</span>
            </div>

            <div className="cta-banner-content">
              <h2 className="cta-banner-title">READY TO DIG IN?</h2>
              <p className="cta-banner-subtitle">FIND A RED CRAB NEAR YOU</p>
              <Link to="/locations" className="btn-cta-locations">
                <span>VIEW LOCATIONS</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
