import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Decorative Wave Background */}
      <div className="hero-waves-bg" />

      {/* Floating Graphics Column (Left Side Decor) */}
      <div className="floating-graphics-container">
        <div className="float-shrimp-1">🦐</div>
        <div className="float-shrimp-2">🦐</div>
        <div className="float-claw">🦀</div>
        <div className="float-dash-1" />
        <div className="float-dash-2" />
      </div>

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Text & CTA */}
          <div className="hero-content animate-slide-up">
            <h1 className="hero-title">
              <span className="hero-word-build">BUILD</span>
              <span className="hero-word-your-own">YOUR OWN</span>
              <span className="hero-word-boil-wrapper">
                <span className="hero-word-boil">BOIL!</span>
                <span className="hero-lemon-slice">🍋</span>
              </span>
            </h1>

            <div className="hero-buttons">
              <Link to="/order" className="btn-primary btn-lg btn-glow hero-cta-btn">
                <span>ORDER NOW</span>
              </Link>
            </div>

            {/* Slider Dots */}
            <div className="hero-dots">
              <span className="dot active" />
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>

          {/* Right Column: Red Slant + Overlapping Plates */}
          <div className="hero-visual animate-fade-in">
            {/* Red Slanted Background Block */}
            <div className="visual-red-slant" />

            {/* Overlapping Platters */}
            <div className="plates-container">
              <div className="plate-top">
                <img src="/images/seafood_spread.jpg" alt="Seafood Platter Top" />
              </div>
              <div className="plate-bottom">
                <img src="/images/seafood_boil_close.jpg" alt="Seafood Platter Bottom" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
