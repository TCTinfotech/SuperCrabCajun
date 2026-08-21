import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';
import { LOCATIONS } from '../../utils/constants';
import { useCart } from '../../contexts/CartContext';
import './LocationsPreview.css';

export default function LocationsPreview() {
  const { openOrderModal } = useCart();
  const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysMap[new Date().getDay()];

  return (
    <section className="locations-preview section-padding">
      <div className="container">
        
        {/* Header */}
        <div className="locations-preview-header reveal">
          <div className="header-text">
            <h2 className="section-title">
              <span className="subtitle d-block">Our Location</span>
              <span className="text-gradient d-block">FIND SUPER CRAB NEAR YOU</span>
            </h2>
            <p className="section-description">
              Craving juicy seafood? Visit our vibrant location in Texas City or order directly online for pickup.
            </p>
          </div>
          
          <Link to="/contact" className="btn-secondary locations-header-btn">
            <span>View All Details</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid of Locations */}
        <div className="locations-preview-grid">
          
          <article className="location-preview-card glass-card reveal">
            {/* Card Image */}
            <div className="loc-card-image-wrapper">
              <img 
                src={LOCATIONS[0].image} 
                alt={LOCATIONS[0].name}
                className="loc-card-img"
                loading="lazy"
              />
              <div className="loc-card-overlay" />
              <h3 className="loc-card-title">{LOCATIONS[0].name}</h3>
            </div>

            {/* Card Info */}
            <div className="loc-card-body">
              <div className="loc-info-row">
                <MapPin size={18} className="loc-info-icon" />
                <span className="loc-info-text">{LOCATIONS[0].address}</span>
              </div>
              
              {LOCATIONS[0].phone && (
                <div className="loc-info-row">
                  <Phone size={18} className="loc-info-icon" />
                  <span className="loc-info-text">{LOCATIONS[0].phone}</span>
                </div>
              )}

              <div className="loc-info-row hours-row">
                <Clock size={18} className="loc-info-icon" />
                <div className="loc-schedule-list">
                  {LOCATIONS[0].hours.raw.map((hr, idx) => {
                    const isToday = hr.days === todayName;
                    return (
                      <div key={idx} className={`schedule-line-item ${isToday ? 'is-today' : ''}`}>
                        <span className="schedule-days-label">
                          {hr.days}
                          {isToday && <span className="today-badge">TODAY</span>}
                        </span>
                        <span className="schedule-time-val">{hr.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card CTA */}
              <div className="loc-card-actions">
                <button 
                  type="button" 
                  className="btn-primary btn-sm btn-glow w-full"
                  onClick={() => openOrderModal('pickup')}
                >
                  <span>Order Now</span>
                </button>
              </div>
            </div>
          </article>

          {/* Right Side Visual Collage */}
          <div className="locations-preview-collage reveal reveal-delay-1">
            <img src="/images/location_1.webp" alt="Super Crab Atmosphere" className="collage-img img-1" loading="lazy" />
            <img src="/images/location_2.webp" alt="Super Crab Interior" className="collage-img img-2" loading="lazy" />
            <img src="/images/location_4.webp" alt="Super Crab Drinks" className="collage-img img-4" loading="lazy" />
            <img src="/images/seafood_feast_group.webp" alt="Super Crab Seafood Feast" className="collage-img img-3" loading="lazy" />
          </div>

        </div>

      </div>
    </section>
  );
}
