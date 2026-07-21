import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';
import { LOCATIONS } from '../../utils/constants';
import './LocationsPreview.css';

export default function LocationsPreview() {

  return (
    <section className="locations-preview section-padding">
      <div className="container">
        
        {/* Header */}
        <div className="locations-preview-header reveal">
          <div className="header-text">
            <h2 className="section-title">
              <span className="subtitle">Our Location</span>
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

              <div className="loc-info-row">
                <Clock size={18} className="loc-info-icon" />
                <div className="loc-info-text">
                  <span className="d-block text-white">Mon - Sun: {LOCATIONS[0].hours.weekday}</span>
                </div>
              </div>

              {/* Card CTA */}
              <div className="loc-card-actions">
                <a href={LOCATIONS[0].posLinks.order_online || "https://order.online/store/super-crab-palmer-hwy-2519187"} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm btn-glow w-full">
                  <span>Order Now</span>
                </a>
              </div>
            </div>
          </article>

          {/* Right Side Visual Collage */}
          <div className="locations-preview-collage reveal reveal-delay-1">
            <img src="/images/loc/1.webp" alt="Super Crab Atmosphere" className="collage-img img-1" loading="lazy" />
            <img src="/images/loc/2.webp" alt="Super Crab Interior" className="collage-img img-2" loading="lazy" />
            <img src="/images/loc/4.webp" alt="Super Crab Drinks" className="collage-img img-4" loading="lazy" />
            <img src="/images/seafood_feast_group.jpg" alt="Super Crab Seafood Feast" className="collage-img img-3" loading="lazy" />
          </div>

        </div>

      </div>
    </section>
  );
}
