import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, MapPin, ShoppingCart, Plus } from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import { BOIL_STEPS, BOIL_CATEGORIES } from '../utils/constants';
import { useCart } from '../contexts/CartContext';
import { useMenu } from '../contexts/MenuContext';
import BoilCustomizer from '../components/cart/BoilCustomizer';
import './MenuPage.css';

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  const itemParam = searchParams.get('item');

  const { addToCart, openOrderModal } = useCart();
  const { categories: MENU_CATEGORIES, menuItems: MENU_ITEMS } = useMenu();

  const [openSection, setOpenSection] = useState(catParam || MENU_CATEGORIES[0]?.id || null);
  const [customizingItem, setCustomizingItem] = useState(null);

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const handleAddItemClick = (item) => {
    if (BOIL_CATEGORIES.includes(item.category)) {
      setCustomizingItem(item);
    } else {
      addToCart(item);
    }
  };

  const handleCustomizerConfirm = (item, options) => {
    addToCart(item, options);
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
          <p className="banner-desc">
            Louisiana soul, Texas heat. At Super Crab, every seafood boil is a celebration — snow crab, crawfish, shrimp, and lobster tail, smothered in our signature Cajun sauces and seasoned to perfection.
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
              const itemsInCategory = MENU_ITEMS.filter(item => item.category === category.id && item.isAvailable !== false);

              return (
                <div key={category.id} className="accordion-item">
                  {/* Header Button */}
                  <button
                    onClick={() => toggleSection(category.id)}
                    className={`accordion-header-btn ${isOpen ? 'open' : ''}`}
                    aria-expanded={isOpen}
                  >
                    <span>{category.name} ({itemsInCategory.length})</span>
                    {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </button>

                  {/* Panel Content */}
                  {isOpen && (
                    <div className="accordion-panel-content animate-slide-up">
                      {category.subtitle && (
                        <p className="panel-subtitle">{category.subtitle}</p>
                      )}
                      
                      {itemsInCategory.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}>
                          <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                            No items listed in this category yet. Add items in Admin Portal!
                          </p>
                        </div>
                      ) : (
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
                                
                                <div className="menu-item-action-row">
                                  <span className="menu-item-price-tag">${parseFloat(item.price).toFixed(2)}</span>
                                  <button
                                    type="button"
                                    className="btn-add-to-cart"
                                    onClick={() => handleAddItemClick(item)}
                                  >
                                    <ShoppingCart size={15} />
                                    <span>{BOIL_CATEGORIES.includes(item.category) ? 'Customize' : 'Add to Cart'}</span>
                                  </button>
                                </div>
                              </div>
                              {item.image && (
                                <div className="menu-item-img-container">
                                  <img src={item.image} alt={item.name} loading="lazy" decoding="async" width="100" height="100" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Boil Customizer Modal */}
      <BoilCustomizer
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
        onConfirm={handleCustomizerConfirm}
      />


      {/* Bottom CTA — Full-width dark style */}
      <section className="menu-cta-v2">
        <div className="cta-v2-bg-decor">
          <span className="cta-v2-fire-1">🔥</span>
          <span className="cta-v2-fire-2">🔥</span>
        </div>
        <div className="container cta-v2-inner">
          <h2 className="cta-v2-title">HUNGRY YET?</h2>
          <p className="cta-v2-subtitle">
            Find your nearest Super Crab and start your seafood boil adventure today.
          </p>
          <div className="cta-v2-buttons">
            <button
              type="button"
              className="cta-v2-btn cta-v2-primary"
              onClick={() => openOrderModal('pickup')}
            >
              <span>Order Now</span>
            </button>
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
