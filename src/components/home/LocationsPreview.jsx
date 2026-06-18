import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { LOCATIONS, BRAND_NAME } from '../../utils/constants';
import './LocationsPreview.css';

export default function LocationsPreview() {
  return (
    <section className="locations-preview section-padding">
      <div className="container">
        
        {/* Header */}
        <div className="locations-preview-header reveal">
          <div className="header-text">
            <h2 className="section-title">
              <span className="subtitle">Our Locations</span>
              <span className="text-gradient d-block">FIND A SUPERCRAB NEAR YOU</span>
            </h2>
            <p className="section-description">
              Craving juicy seafood? Visit one of our three vibrant locations in Texas or order directly online for pickup.
            </p>
          </div>
          
          <Link to="/locations" className="btn-secondary locations-header-btn">
            <span>View All Details</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid of Locations */}
        <div className="locations-preview-grid">
          {LOCATIONS.map((loc, idx) => (
            <article 
              key={loc.id} 
              className={`location-preview-card glass-card reveal reveal-delay-${idx + 1}`}
            >
              {/* Card Image */}
              <div className="loc-card-image-wrapper">
                <img 
                  src={loc.id === 'houston-heights' ? '/images/cajun-crab.png' : '/images/restaurant.png'} 
                  alt={loc.name}
                  className="loc-card-img"
                  loading="lazy"
                />
                <div className="loc-card-overlay" />
                <h3 className="loc-card-title">{loc.name}</h3>
              </div>

              {/* Card Info */}
              <div className="loc-card-body">
                <div className="loc-info-row">
                  <MapPin size={18} className="loc-info-icon" />
                  <span className="loc-info-text">{loc.address}</span>
                </div>
                
                <div className="loc-info-row">
                  <Phone size={18} className="loc-info-icon" />
                  <span className="loc-info-text">{loc.phone}</span>
                </div>

                <div className="loc-info-row">
                  <Clock size={18} className="loc-info-icon" />
                  <div className="loc-info-text">
                    <span className="d-block text-white">Mon - Thu: {loc.hours.weekday}</span>
                    <span className="d-block text-white">Fri - Sun: {loc.hours.weekend}</span>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="loc-card-actions">
                  <Link to={`/order?location=${loc.id}`} className="btn-primary btn-sm btn-glow w-full">
                    <span>Order From This Location</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
