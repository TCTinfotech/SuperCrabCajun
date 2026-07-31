import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShoppingBag, ChevronRight, ExternalLink, MapPin } from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import { LOCATIONS, POS_PLATFORMS, BRAND_NAME } from '../utils/constants';
import { useScrollReveal } from '../utils/scrollReveal';
import './OrderPage.css';

export default function OrderPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const locationParam = searchParams.get('location');

  // Set default location to Houston if not specified or invalid
  const initialLocation = LOCATIONS.find(l => l.id === locationParam) ? locationParam : LOCATIONS[0].id;
  const [selectedLocId, setSelectedLocId] = useState(initialLocation);

  useScrollReveal();

  // Redirect to DoorDash
  useEffect(() => {
    window.location.replace("https://order.online/store/super-crab-palmer-hwy-2519187?utm_id=97757_v0_s00_e0_tv0&fbclid=IwY2xjawSiMLRleHRuA2FlbQIxMABicmlkETF3ZHNwWEcwZmhXeUE0S21hc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHvh1dshdA9SIHiYPlSsqGydpM2CXrBo74wV2RZdQknVODcuVEeSSDevaBNUf_aem__1rPImzAoWoAvodEpsUFyA");
  }, []);

  const handleLocationChange = (locId) => {
    setSelectedLocId(locId);
    setSearchParams({ location: locId });
  };

  const selectedLocation = LOCATIONS.find((l) => l.id === selectedLocId);

  // Return specific links for the selected location or defaults
  const getPOSLink = (platformId) => {
    if (selectedLocation && selectedLocation.posLinks[platformId]) {
      return selectedLocation.posLinks[platformId];
    }
    // Fallback to first available POS link
    const platform = POS_PLATFORMS.find(p => p.id === platformId);
    return platform ? platform.url : '#';
  };

  return (
    <div className="order-page">
      <SEOHead 
        title="Order Online" 
        description="Order Super Crab online. Select your nearest Texas branch (Houston, Austin, Dallas) and order fresh Cajun boils via Square, Postmates or Order.online."
        canonicalUrl="/order"
      />

      {/* Hero Header */}
      <section className="order-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(10, 14, 23, 0.45), rgba(10, 14, 23, 0.8)), url('/images/seafood_spread.webp')` }}>
        <div className="container banner-text reveal">
          <span className="banner-subtitle">Order Now</span>
          <h1 className="banner-title text-gradient">ONLINE ORDERING</h1>
          <p className="banner-desc banner-desc--light">
            Skip the line! Select your nearest branch location and order through our trusted POS platforms for pickup or local delivery.
          </p>
        </div>
      </section>

      {/* Location Selector Area */}
      <section className="order-content-section section-padding">
        <div className="container select-and-order-container">
          
          {/* Step 1: Select Location */}
          <div className="selection-step-card glass-card reveal">
            <div className="step-badge-num">1</div>
            <h2>SELECT YOUR LOCATION</h2>
            <p className="step-intro">Choose a branch to see available ordering platforms and menus for that area.</p>

            <div className="location-buttons-grid">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  className={`loc-select-btn ${selectedLocId === loc.id ? 'active' : ''}`}
                  onClick={() => handleLocationChange(loc.id)}
                >
                  <MapPin size={18} className="loc-marker" />
                  <div className="loc-btn-texts">
                    <span className="loc-btn-name">{loc.name}</span>
                    <span className="loc-btn-addr">{loc.address}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Choose Platform */}
          <div className="platform-step-section reveal reveal-delay-1">
            <div className="step-header">
              <div className="step-badge-num">2</div>
              <div>
                <h2>CHOOSE YOUR ORDERING PLATFORM</h2>
                {selectedLocation && (
                  <p className="selected-loc-confirm">
                    Showing online order platforms for <strong>{selectedLocation.name}</strong>.
                  </p>
                )}
              </div>
            </div>

            <div className="platforms-grid">
              {POS_PLATFORMS.map((platform) => {
                const targetUrl = getPOSLink(platform.id);

                return (
                  <article key={platform.id} className="platform-card glass-card">
                    <div className="platform-logo-wrapper">
                      {/* Check if logo has placeholder issues */}
                      {platform.logo.includes('posbank.com') ? (
                        <div className="placeholder-logo-box">POSbank</div>
                      ) : (
                        <img 
                          src={platform.logo} 
                          alt={`${platform.name} Logo`} 
                          className="platform-logo-img"
                        />
                      )}
                    </div>

                    <div className="platform-card-body">
                      <h3 className="platform-name">{platform.name}</h3>
                      <p className="platform-desc">{platform.description}</p>
                      
                      <a 
                        href={targetUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary w-full btn-platform-link btn-glow"
                      >
                        <span>Order on {platform.name}</span>
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
