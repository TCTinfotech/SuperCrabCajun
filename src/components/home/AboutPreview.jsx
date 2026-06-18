import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPreview.css';

export default function AboutPreview() {
  return (
    <section className="about-preview section-padding">
      {/* Dashed trail background outline */}
      <div className="dashed-trail-svg">
        <svg viewBox="0 0 500 400" width="100%" height="100%" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round">
          <path d="M 50 350 C 40 200, 150 150, 250 100 C 350 50, 480 120, 400 250 C 350 350, 180 320, 220 200" />
        </svg>
        <span className="trail-cross-1">✕</span>
        <span className="trail-cross-2">＋</span>
      </div>

      {/* Floating vegetables and claws */}
      <div className="decor-graphics">
        <span className="decor-claw-left">🦀</span>
        <span className="decor-onion-right">🧅</span>
        <span className="decor-chili-right">🌶️</span>
      </div>

      <div className="container about-preview-container">
        {/* Left Side: Rotated Photo */}
        <div className="about-preview-image-side reveal">
          <div className="rotated-image-wrapper">
            <img
              src="/images/restaurant.png"
              alt="How We Started"
              className="preview-img"
            />
          </div>
        </div>

        {/* Right Side: Text Story */}
        <div className="about-preview-text-side reveal reveal-delay-1">
          <h2 className="section-title">
            <span className="text-light-title">HOW WE STARTED</span>
          </h2>

          <p className="preview-story text-white">
            SuperCrab first opened after our founders fell in love with <Link to="/menu?cat=seafood-boil" className="text-highlight-red">seafood boil</Link>. Our founders realized that they had an opportunity to improve upon the flavor they loved.
          </p>
          <p className="preview-story text-white">
            After a year of experimenting with spices and seasonings from all over the world, they finally found the perfect combination that would give SuperCrab its signature flavor...
          </p>

          <div className="preview-links">
            <Link to="/about" className="btn-learn-more">
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
