import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, MapPin, LayoutGrid, List } from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import { MENU_CATEGORIES, MENU_ITEMS, BOIL_STEPS } from '../utils/constants';
import './MenuPage.css';

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  const itemParam = searchParams.get('item');

  const [openSection, setOpenSection] = useState(catParam || MENU_CATEGORIES[0]?.id || null);
  const [viewMode, setViewMode] = useState('list');

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  useEffect(() => {
    if (catParam) {
      setOpenSection(catParam);
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
  }, [itemParam, openSection, viewMode]);

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
            Louisiana soul, Texas heat. At Super Crab TX, every seafood boil is a celebration — snow crab, crawfish, shrimp, and lobster tail, smothered in our signature Cajun sauces and seasoned to perfection.
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
              <ul className="card-step-list">
                {BOIL_STEPS.step1.options.map((opt) => (
                  <li key={opt}>{opt.toUpperCase()}</li>
                ))}
              </ul>
            </div>

            {/* Step 2 */}
            <div className="step-navy-card">
              <h3 className="card-step-num">STEP 2</h3>
              <h4 className="card-step-title">{BOIL_STEPS.step2.title.toUpperCase()}</h4>
              <ul className="card-step-list">
                {BOIL_STEPS.step2.options.map((opt) => (
                  <li key={opt.name}>{opt.name.toUpperCase()}</li>
                ))}
              </ul>
            </div>

            {/* Step 3 */}
            <div className="step-navy-card">
              <h3 className="card-step-num">STEP 3</h3>
              <h4 className="card-step-title">{BOIL_STEPS.step3.title.toUpperCase()}</h4>
              <ul className="card-step-list">
                {BOIL_STEPS.step3.options.map((opt) => (
                  <li key={opt.name}>{opt.name.toUpperCase()}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Accordions List */}
      <section className="menu-accordions-section">
        <div className="container">
          <div className="view-mode-toggle-container">
            <span className="view-mode-label">View Menu As:</span>
            <div className="view-mode-buttons">
              <button 
                className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} /> List
              </button>
              <button 
                className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={18} /> Grid
              </button>
            </div>
          </div>
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
                      
                      {viewMode === 'list' ? (
                        (() => {
                          const chunkSize = Math.ceil(itemsInCategory.length / 3) || 1;
                          const col1 = itemsInCategory.slice(0, chunkSize);
                          const col2 = itemsInCategory.slice(chunkSize, chunkSize * 2);
                          const col3 = itemsInCategory.slice(chunkSize * 2);

                          let displayImages = [];
                          if (category.listImages && category.listImages.length > 0) {
                            displayImages = category.listImages.map((src, i) => ({ id: `cat-img-${i}`, image: src, name: `${category.name} featured` }));
                          } else {
                            displayImages = itemsInCategory.filter(item => item.featured && item.image);
                            if (displayImages.length < 3) {
                              const otherImages = itemsInCategory.filter(item => !item.featured && item.image);
                              displayImages = [...displayImages, ...otherImages].slice(0, 3);
                            } else {
                              displayImages = displayImages.slice(0, 3);
                            }
                          }

                          return (
                            <>
                              <div className="panel-columns-grid">
                                <ul className="panel-list-col">
                                  {col1.map(item => (
                                    <li 
                                      key={item.id} 
                                      id={item.id}
                                      className={itemParam === item.id ? 'highlighted-menu-item' : ''}
                                    >
                                      • {item.name.toUpperCase()}
                                    </li>
                                  ))}
                                </ul>
                                <ul className="panel-list-col">
                                  {col2.map(item => (
                                    <li 
                                      key={item.id} 
                                      id={item.id}
                                      className={itemParam === item.id ? 'highlighted-menu-item' : ''}
                                    >
                                      • {item.name.toUpperCase()}
                                    </li>
                                  ))}
                                </ul>
                                <ul className="panel-list-col">
                                  {col3.map(item => (
                                    <li 
                                      key={item.id} 
                                      id={item.id}
                                      className={itemParam === item.id ? 'highlighted-menu-item' : ''}
                                    >
                                      • {item.name.toUpperCase()}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              {displayImages.length > 0 && (
                                <div className={`panel-images-row cols-${displayImages.length}`}>
                                  {displayImages.map(item => (
                                    <div key={`img-${item.id}`} className="panel-image-card">
                                      <img src={item.image} alt={item.name} />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          );
                        })()
                      ) : (
                        <div className="menu-items-grid">
                          {itemsInCategory.map(item => (
                            <div 
                              key={item.id} 
                              id={item.id}
                              className={`menu-item-card ${itemParam === item.id ? 'highlighted-menu-item' : ''}`}
                            >
                              <div className="menu-item-info">
                                <h4 className="menu-item-name">{item.name}</h4>
                                <p className="menu-item-desc">{item.description}</p>
                                <span className="menu-item-price">${item.price}</span>
                              </div>
                              {item.image && (
                                <div className="menu-item-img-container">
                                  <img src={item.image} alt={item.name} />
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
            <a href="https://order.online/store/super-crab-palmer-hwy-2519187?pickup=true" target="_blank" rel="noopener noreferrer" className="cta-v2-btn cta-v2-primary">
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
