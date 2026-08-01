import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import { MENU_CATEGORIES, MENU_ITEMS, BOIL_STEPS, LOCATIONS } from '../utils/constants';
import './MenuPage.css';

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  const itemParam = searchParams.get('item');

  const [openSection, setOpenSection] = useState(catParam || MENU_CATEGORIES[0]?.id || null);

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  useEffect(() => {
    if (catParam) {
      if (catParam === 'drinks' || catParam === 'drinks-soda' || catParam === 'drinks-non-carbonated') {
        setOpenSection('drinks-soda-non-carbonated');
      } else {
        setOpenSection(catParam);
      }
    }
  }, [catParam]);

  useEffect(() => {
    if (itemParam) {
      const timer = setTimeout(() => {
        const element = document.getElementById(itemParam);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [itemParam, openSection]);

  return (
    <div className="menu-page">
      <SEOHead
        title="Our Menu"
        description="Browse the Super Crab menu. Discover our signature Cajun seafood boils, starters, fried baskets, and spice customizations."
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
          <h1 className="banner-title">GET DOWN & MESSY !</h1>
          <div className="banner-title-line" />
          <p className="banner-desc banner-desc--dark">
            Louisiana soul, Texas heat. At Super Crab, every seafood boil is a celebration — snow crab, crawfish, shrimp, and lobster tail, smothered in our signature Cajun sauces and seasoned to perfection.
          </p>
          <p className="banner-desc banner-desc--dark second-desc">
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
              <h4 className="card-step-title">{BOIL_STEPS.step1.title.toUpperCase()}</h4>
              <ul className="card-step-list centered-list">
                {BOIL_STEPS.step1.options.map((opt) => {
                  const name = typeof opt === 'string' ? opt : opt.name;
                  return (
                    <li key={name}>{name.toUpperCase()}</li>
                  );
                })}
              </ul>
            </div>

            {/* Step 2 */}
            <div className="step-navy-card">
              <h3 className="card-step-num">STEP 2</h3>
              <h4 className="card-step-title">{BOIL_STEPS.step2.title.toUpperCase()}</h4>
              <ul className="card-step-list centered-list">
                {BOIL_STEPS.step2.options.map((opt) => (
                  <li key={opt.name}>{opt.name.toUpperCase()}</li>
                ))}
              </ul>
            </div>

            {/* Step 3 */}
            <div className="step-navy-card">
              <h3 className="card-step-num">STEP 3</h3>
              <h4 className="card-step-title">{BOIL_STEPS.step3.title.toUpperCase()}</h4>
              <ul className="card-step-list step3-spice-list">
                {BOIL_STEPS.step3.options.map((opt) => (
                  <li key={opt.name} className="spice-level-row">
                    <span className="spice-name">{opt.name.toUpperCase()}</span>
                    <span className="spice-chilis">
                      {opt.spice > 0 ? '🌶️'.repeat(opt.spice) : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Accordions List */}
      <section className="menu-accordions-section">
        <div className="container">
          <div className="accordions-container">
            {MENU_CATEGORIES.map((category) => {
              const isOpen = openSection === category.id;
              const itemsInCategory = MENU_ITEMS.filter(item => item.category === category.id);
              
              if (itemsInCategory.length === 0) return null;

              return (
                <div key={category.id} className="accordion-item">
                  {/* Header Button */}
                  <button
                    onClick={() => toggleSection(category.id)}
                    className={`accordion-header-btn ${isOpen ? 'open' : ''}`}
                    aria-expanded={isOpen}
                  >
                    <span>{category.name}</span>
                    {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </button>

                  {/* Panel Content */}
                  {isOpen && (
                    <div className="accordion-panel-content animate-slide-up">
                      {category.subtitle && (
                        <p className="panel-subtitle">{category.subtitle}</p>
                      )}
                      
                      <div className="menu-items-grid">
                        {itemsInCategory.map(item => (
                          <div 
                            key={item.id} 
                            id={item.id}
                            className={`menu-item-card ${itemParam === item.id ? 'highlighted-menu-item' : ''}`}
                          >
                            <div className="menu-item-info">
                              <div className="menu-item-header-block">
                                <h4 className="menu-item-name">{item.name}</h4>
                                {item.badge && (
                                  <span className={`menu-item-badge ${item.badgeType || 'popular'}`}>
                                    {item.badgeType?.startsWith('most-liked') ? '👍 ' : '🔥 '}
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              {item.description && <p className="menu-item-desc">{item.description}</p>}
                            </div>
                            {item.image && (
                              <div className="menu-item-img-container">
                                <img src={item.image} alt={item.name} loading="lazy" decoding="async" width="100" height="100" />
                              </div>
                            )}
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
            Start your seafood boil adventure today!
          </p>
          <div className="cta-v2-buttons">
            <a href="https://order.online/store/super-crab-palmer-hwy-2519187?pickup=true" target="_blank" rel="noopener noreferrer" className="cta-v2-btn cta-v2-primary">
              <span>Order Now</span>
            </a>
            <a
              href={LOCATIONS[0].googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-v2-btn cta-v2-outline"
            >
              <MapPin size={18} />
              <span>Visit Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
