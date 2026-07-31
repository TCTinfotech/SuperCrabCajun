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
    let openingTime = '11:30 AM';

    if (day === 5 || day === 6) { // Fri - Sat: 11:30 AM - 11:00 PM
      isOpen = currentTime >= 11.5 && currentTime < 23;
      closingTime = '11:00 PM';
      openingTime = (day === 6 && currentTime >= 23) ? '12:00 PM' : '11:30 AM';
    } else if (day === 0) { // Sun: 12:00 PM - 9:00 PM
      isOpen = currentTime >= 12 && currentTime < 21;
      closingTime = '9:00 PM';
      openingTime = currentTime < 12 ? '12:00 PM' : '11:30 AM';
    } else { // Mon - Thu: 11:30 AM - 10:30 PM
      isOpen = currentTime >= 11.5 && currentTime < 22.5;
      closingTime = '10:30 PM';
      openingTime = '11:30 AM';
    }

    return {
      isOpen,
      text: isOpen ? `Open Now • Closes at ${closingTime}` : `Closed • Opens at ${openingTime}`,
      class: isOpen ? 'status-open' : 'status-closed'
    };
  };

  const status = getOpenStatus();

  const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysMap[new Date().getDay()];

  return (
    <div className="locations-page">
      <SEOHead 
        title="Location & Hours" 
        description="Visit SuperCrab in Texas City. Find address, operating hours, and direction details."
        canonicalUrl="/locations"
      />

      {/* Hero Header */}
      <section className="locations-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(10, 14, 23, 0.45), rgba(10, 14, 23, 0.8)), url('/images/restaurant.webp')` }}>
        <div className="container banner-text reveal">
          <span className="banner-subtitle">Texas Pride</span>
          <h1 className="banner-title text-gradient">OUR LOCATION</h1>
          <p className="banner-desc banner-desc--light">
            Find address directions, operating schedule, and order links for our Texas City location.
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

                  {loc.phone && (
                    <div className="detail-row">
                      <Phone size={20} className="detail-icon" />
                      <div>
                        <h3 className="detail-label">Phone</h3>
                        <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} className="detail-value phone-link">{loc.phone}</a>
                      </div>
                    </div>
                  )}

                  <div className="detail-row">
                    <Clock size={20} className="detail-icon" />
                    <div>
                      <h3 className="detail-label">Hours</h3>
                      <div className="detail-value hours-schedule">
                        {loc.hours.raw.map((hr, index) => {
                          const isToday = hr.days === todayName;
                          return (
                            <div key={index} className={`schedule-line ${isToday ? 'is-today' : ''}`}>
                              <span className="schedule-days">
                                {hr.days}
                                {isToday && <span className="today-badge">TODAY</span>}
                              </span>
                              <span className="schedule-time">{hr.time}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="location-actions">
                  <a href={loc.posLinks.order_online || "https://order.online/store/super-crab-palmer-hwy-2519187?utm_id=97757_v0_s00_e0_tv0&fbclid=IwY2xjawSiMLRleHRuA2FlbQIxMABicmlkETF3ZHNwWEcwZmhXeUE0S21hc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHvh1dshdA9SIHiYPlSsqGydpM2CXrBo74wV2RZdQknVODcuVEeSSDevaBNUf_aem__1rPImzAoWoAvodEpsUFyA"} target="_blank" rel="noopener noreferrer" className="btn-primary btn-glow">
                    <ShoppingBag size={18} />
                    <span>Order Online</span>
                  </a>
                  
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
