import React, { useState } from 'react';
import { Mail, Calendar, Users, FileText, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import { BRAND_NAME } from '../utils/constants';
import { useScrollReveal } from '../utils/scrollReveal';
import './EventsPage.css';

export default function EventsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useScrollReveal();

  const packages = [
    {
      title: 'Backyard Boil Feast',
      peeps: 'Min 15 Guests',
      price: '$35 / guest',
      features: ['Signature Cajun Crawfish & Shrimp', 'Corn, Potatoes & Sausage', 'Full table butcher paper layout', 'We cook, serve, and clean up!']
    },
    {
      title: 'VIP Crab Banquet',
      peeps: 'Min 10 Guests',
      price: '$55 / guest',
      features: ['King Crab Legs & Cold Water Lobster Tails', 'Garlic Butter & Lemon Pepper sauces', 'Premium side choices (Cajun Fries, Garlic Bread)', 'Includes custom table covers & bibs']
    },
    {
      title: 'Fried Seafood Platter Party',
      peeps: 'Min 20 Guests',
      price: '$25 / guest',
      features: ['Golden Fried Catfish, Shrimp & Calamari', 'Cajun Fries & hushpuppies', 'Assorted dipping sauces (Tartar, Remoulade)', 'Easy catering trays for buffet setups']
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', date: '', guests: '', message: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="events-page">
      <SEOHead 
        title="Catering & Private Events" 
        description="Host your next event with Super Crab TX. We offer crawfish boil catering, VIP crab banquets, corporate setups, and private restaurant rentals."
        canonicalUrl="/events"
      />

      {/* Hero Header */}
      <section className="events-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(10, 14, 23, 0.45), rgba(10, 14, 23, 0.8)), url('/images/restaurant.png')` }}>
        <div className="container banner-text reveal">
          <span className="banner-subtitle">Catering Services</span>
          <h1 className="banner-title text-gradient">EVENTS & CATERING</h1>
          <p className="banner-desc">
            From backyard crawfish boils to corporate lunches and private restaurant rentals, make your next party unforgettable.
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="events-packages-section section-padding">
        <div className="container">
          <h2 className="text-gradient text-center reveal">CATERING PACKAGES</h2>
          <p className="section-description text-center reveal">
            Choose the perfect seafood package for your graduation, birthday, or corporate event.
          </p>

          <div className="packages-grid">
            {packages.map((pkg, idx) => (
              <div 
                key={pkg.title} 
                className={`package-card glass-card reveal reveal-delay-${idx + 1}`}
              >
                <div className="package-header">
                  <h3 className="package-title">{pkg.title}</h3>
                  <span className="package-peeps">{pkg.peeps}</span>
                </div>
                
                <div className="package-price-row">
                  <span className="pkg-price">{pkg.price}</span>
                </div>

                <ul className="package-features">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="feature-item">
                      <span className="bullet">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="events-form-section section-padding">
        <div className="container form-container">
          
          <div className="form-info-side reveal">
            <span className="section-subtitle">Let's Plan</span>
            <h2>BOOK YOUR EVENT</h2>
            <p className="info-desc">
              Have questions about pricing, menu adjustments, or private room availability? Send us your event details and a catering manager will reach out within 24 hours.
            </p>
            
            <div className="form-info-bullets">
              <div className="info-bullet-item">
                <Calendar className="bullet-icon" />
                <div>
                  <h4 className="bullet-title">Custom Schedules</h4>
                  <p className="bullet-text">Available 7 days a week for lunch, dinner, or custom party slots.</p>
                </div>
              </div>
              <div className="info-bullet-item">
                <Users className="bullet-icon" />
                <div>
                  <h4 className="bullet-title">Granular Guest Sizes</h4>
                  <p className="bullet-text">We cater for intimate groups of 10 up to large gatherings of 200+ guests.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="form-box-side reveal reveal-delay-1">
            <div className="inquiry-card glass-card">
              
              {!submitted ? (
                <form className="inquiry-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required 
                        placeholder="(555) 000-0000"
                      />
                    </div>
                    
                    <div className="form-row-nested">
                      <div className="form-group">
                        <label htmlFor="date">Event Date</label>
                        <input 
                          type="date" 
                          id="date" 
                          name="date" 
                          value={formData.date}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="guests">Guests</label>
                        <input 
                          type="number" 
                          id="guests" 
                          name="guests" 
                          value={formData.guests}
                          onChange={handleInputChange}
                          min="10"
                          required 
                          placeholder="20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Event Details</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4" 
                      required 
                      placeholder="Describe your event, preferred menu selection, and special requests..."
                    />
                  </div>

                  <button type="submit" className="btn-primary btn-submit btn-glow">
                    <FileText size={18} />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              ) : (
                <div className="form-success-state animate-fade-in">
                  <CheckCircle2 size={54} className="success-check-icon" />
                  <h3>INQUIRY RECEIVED</h3>
                  <p>
                    Thank you for reaching out! Your catering request has been logged. A catering manager will contact you via email or phone shortly to finalize details.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary btn-sm">
                    Send Another Request
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
