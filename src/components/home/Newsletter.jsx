import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import './Newsletter.css';

export default function Newsletter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
      setName('');
      setEmail('');
    }
  };

  return (
    <section className="newsletter section-padding">
      {/* Fishing net background pattern */}
      <div className="newsletter-net-bg" />

      <div className="container newsletter-container-box">
        {!submitted ? (
          <div className="newsletter-content">
            <h2 className="newsletter-heading">CATCH THE LATEST NEWS</h2>
            <div className="newsletter-heading-line" />
            <p className="newsletter-subheading">SIGN UP FOR SUPER CRAB UPDATES AND EXCLUSIVE DEALS!</p>

            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="form-fields-wrapper">
                <input
                  type="text"
                  placeholder="Name"
                  className="newsletter-input-box"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-label="Name"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="newsletter-input-box"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email"
                />
              </div>

              <button type="submit" className="btn-newsletter-submit">
                <span>SUBSCRIBE!</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="newsletter-success animate-fade-in text-center">
            <CheckCircle size={54} className="success-icon" />
            <h3 className="success-title">WELCOME TO THE CLUB!</h3>
            <p className="success-desc">
              You are officially subscribed. Check your inbox soon for your exclusive voucher!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-type-select"
              style={{ marginTop: '1.5rem', fontSize: '1.1rem', padding: '0.5rem 2.5rem' }}
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
