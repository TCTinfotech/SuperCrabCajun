import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import { BRAND_NAME, LOCATIONS } from '../utils/constants';
import { useScrollReveal } from '../utils/scrollReveal';
import './ContactPage.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysMap[new Date().getDay()];

  useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-page">
      <SEOHead 
        title="Contact Us" 
        description="Get in touch with Super Crab. Send inquiries about catering services, private dinners, or general feedback. We are here to help!"
        canonicalUrl="/contact"
      />

      {/* Hero Header */}
      <section className="contact-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(10, 14, 23, 0.45), rgba(10, 14, 23, 0.8)), url('/images/restaurant.webp')` }}>
        <div className="container banner-text reveal">
          <span className="banner-subtitle">Get In Touch</span>
          <h1 className="banner-title text-gradient">CONTACT US</h1>
          <p className="banner-desc">
            We value your feedback and questions. Reach out to individual branches or send us a message below.
          </p>
        </div>
      </section>

      {/* Main Layout grid */}
      <section className="contact-main-section section-padding">
        <div className="container contact-grid">
          
          {/* Info Side */}
          <div className="contact-info-side reveal">
            <h2>DIRECT CONTACT</h2>
            <p className="info-desc">
              Have a question about a specific order, lost item, or reservations? Reach out directly to your local Super Crab:
            </p>

            <div className="branches-info-list">
              {LOCATIONS.map((loc) => (
                <div key={loc.id} className="branch-info-block glass-card">
                  <h3 className="branch-name">{loc.name}</h3>
                  <div className="branch-info-rows">
                    <span className="info-row"><MapPin size={16} className="contact-icon" /> {loc.address}</span>
                    {loc.phone && (
                      <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} className="info-row contact-link">
                        <Phone size={16} className="contact-icon" /> {loc.phone}
                      </a>
                    )}
                    <span className="info-row"><Mail size={16} className="contact-icon" /> {loc.email}</span>
                    <div className="info-row">
                      <Clock size={16} className="contact-icon" />
                      <div className="branch-hours-list">
                        {loc.hours.raw.map((hr, idx) => {
                          const isToday = hr.days === todayName;
                          return (
                            <div key={idx} className={`branch-hours-item ${isToday ? 'is-today' : ''}`}>
                              <span className="hours-days">
                                {hr.days}
                                {isToday && <span className="today-badge">TODAY</span>}
                              </span>
                              <span className="hours-time">{hr.time}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-side reveal reveal-delay-1">
            <div className="contact-form-card glass-card">
              <h3>Send A Message</h3>
              <p className="form-sub">For general corporate feedback, press, or menu inquiries.</p>

              {!submitted ? (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                      placeholder="Full name"
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

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      required 
                      placeholder="Reason for contact"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5" 
                      required 
                      placeholder="Write your message details..."
                    />
                  </div>

                  <button type="submit" className="btn-primary btn-submit btn-glow">
                    <Send size={18} />
                    <span>Send Message</span>
                  </button>
                </form>
              ) : (
                <div className="form-success-state animate-fade-in">
                  <CheckCircle2 size={54} className="success-check-icon" />
                  <h3>MESSAGE SENT</h3>
                  <p>
                    Thank you! Your message has been sent successfully. Our support desk will look into it and reply within 2 working days.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary btn-sm">
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Map Embed Section */}
      <section className="contact-map-section reveal">
        <div className="contact-map-wrapper">
          <iframe 
            src={LOCATIONS[0].googleMapsEmbed} 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Super Crab Primary Location Map"
            className="contact-map-iframe"
          />
        </div>
      </section>
    </div>
  );
}
