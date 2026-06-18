import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowUpRight, Compass, ShoppingBag } from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import { LOCATIONS, BRAND_NAME } from '../utils/constants';
import { useScrollReveal } from '../utils/scrollReveal';
import './LocationsPage.css';

export default function LocationsPage() {
  useScrollReveal();

  // Helper to determine if a location is currently open
  const getOpenStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();
    const min = now.getMinutes();
    const currentTime = hour + min / 60;

    let isOpen = false;
    let closingTime = '';

    if (day === 5 || day === 6) { // Fri - Sat
      isOpen = currentTime >= 11.5 && currentTime < 23;
      closingTime = '11:00 PM';
    } else if (day === 0) { // Sun
      isOpen = currentTime >= 11.5 && currentTime < 22;
      closingTime = '10:00 PM';
    } else { // Mon - Thu
      isOpen = currentTime >= 12 && currentTime < 22;
      closingTime = '10:00 PM';
    }

    return {
      isOpen,
      text: isOpen ? `Open Now • Closes at ${closingTime}` : 'Closed • Opens at 12:00 PM',
      class: isOpen ? 'status-open' : 'status-closed'
    };
  };

  const status = getOpenStatus();

  return (
    <div className="locations-page">
      <SEOHead 
        title="Locations & Hours" 
        description="Visit SuperCrab TX in Houston (The Heights), Austin (Downtown), or Dallas (Uptown). Find addresses, contact phone numbers, hours, and direction details."
        canonicalUrl="/locations"
      />

      {/* Hero Header */}
      <section className="locations-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(10, 14, 23, 0.45), rgba(10, 14, 23, 0.8)), url('/images/restaurant.png')` }}>
        <div className="container banner-text reveal">
          <span className="banner-subtitle">Texas Pride</span>
          <h1 className="banner-title text-gradient">OUR LOCATIONS</h1>
          <p className="banner-desc">
            Find address directions, operating schedules, phone lines, and order links for all three Texas locations.
          </p>
        </div>
      </section>

      {/* Main List */}
      <section className="locations-list-section section-padding">
        <div className="container locations-list-container">
          
          {LOCATIONS.map((loc, idx) => (
            <article 
              key={loc.id} 
              className={`location-card glass-card reveal ${idx % 2 === 1 ? 'reverse' : ''}`}
            >
              
              {/* Left/Right Grid Info */}
              <div className="location-card-info">
                <div className="location-card-header">
                  <span className={`status-badge ${status.class}`}>{status.text}</span>
                  <h2 className="location-name">{loc.name}</h2>
                </div>

                <div className="location-details">
                  <div className="detail-row">
                    <MapPin size={20} className="detail-icon" />
                    <div>
                      <h3 className="detail-label">Address</h3>
                      <p className="detail-value">{loc.address}</p>
                    </div>
                  </div>

                  <div className="detail-row">
                    <Phone size={20} className="detail-icon" />
                    <div>
                      <h3 className="detail-label">Phone</h3>
                      <p className="detail-value">{loc.phone}</p>
                    </div>
                  </div>

                  <div className="detail-row">
                    <Clock size={20} className="detail-icon" />
                    <div>
                      <h3 className="detail-label">Hours</h3>
                      <div className="detail-value hours-schedule">
                        {loc.hours.raw.map((hr, index) => (
                          <div key={index} className="schedule-line">
                            <span className="schedule-days">{hr.days}</span>
                            <span className="schedule-time">{hr.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="location-actions">
                  <Link to={`/order?location=${loc.id}`} className="btn-primary btn-glow">
                    <ShoppingBag size={18} />
                    <span>Order Online</span>
                  </Link>
                  
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-secondary"
                  >
                    <Compass size={18} />
                    <span>Get Directions</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Right/Left Grid Map Embed */}
              <div className="location-card-map">
                <iframe 
                  src={loc.googleMapsEmbed} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${loc.name} Map Location`}
                  className="google-map-iframe"
                />
              </div>

            </article>
          ))}

        </div>
      </section>
    </div>
  );
}
