import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../contexts/CartContext';
import './HeroSection.css';

const SLIDES = [
  {
    titleWord1: "BUILD",
    titleWord2: "YOUR OWN",
    titleWord3: "BOIL!",
    titleEmoji: "🍋",
    buttonText: "ORDER NOW",
    plateTopImg: "/images/seafood_spread.webp",
    plateBottomImg: "/images/seafood_boil_close.webp",
    floatingBadges: [
      { text: "🦐", className: "float-shrimp-1" },
      { text: "🦐", className: "float-shrimp-2" },
      { text: "🦀", className: "float-claw" }
    ]
  },
  {
    titleWord1: "FRESH",
    titleWord2: "CAJUN",
    titleWord3: "CRAWFISH!",
    titleEmoji: "🔥",
    buttonText: "ORDER NOW",
    plateTopImg: "/images/crawfish_close.webp",
    plateBottomImg: "/images/crawfish_pile.webp",
    floatingBadges: [
      { text: "🌶️", className: "float-shrimp-1" },
      { text: "🔥", className: "float-shrimp-2" },
      { text: "🦞", className: "float-claw" }
    ]
  },
  {
    titleWord1: "GOURMET",
    titleWord2: "LOBSTER",
    titleWord3: "FEAST!",
    titleEmoji: "🦞",
    buttonText: "ORDER NOW",
    plateTopImg: "/images/gourmet_lobster_tray.webp",
    plateBottomImg: "/images/crab_legs.webp",
    floatingBadges: [
      { text: "🦀", className: "float-shrimp-1" },
      { text: "🍋", className: "float-shrimp-2" },
      { text: "🦐", className: "float-claw" }
    ]
  },
  {
    titleWord1: "OYSTERS",
    titleWord2: "ON THE",
    titleWord3: "HALF SHELL!",
    titleEmoji: "✨",
    buttonText: "ORDER NOW",
    plateTopImg: "/images/oysters_platter.webp",
    plateBottomImg: "/images/blue_crabs.webp",
    floatingBadges: [
      { text: "🦪", className: "float-shrimp-1" },
      { text: "🍋", className: "float-shrimp-2" },
      { text: "🌊", className: "float-claw" }
    ]
  }
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef(null);
  const { openOrderModal } = useCart();

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000); // Shift slide every 6 seconds
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    startAutoPlay(); // Reset autoPlay timer on manual interaction
  };

  const currentSlide = SLIDES[activeIndex];

  return (
    <section className="hero-section">
      {/* Decorative Wave Background */}
      <div className="hero-waves-bg" />

      {/* Floating Graphics Column (Left Side Decor) */}
      <div key={`floating-${activeIndex}`} className="floating-graphics-container">
        {currentSlide.floatingBadges.map((badge, idx) => (
          <div key={idx} className={`${badge.className} animate-fade-in`}>
            {badge.text}
          </div>
        ))}
        <div className="float-dash-1" />
        <div className="float-dash-2" />
      </div>

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Text & CTA */}
          <div key={`content-${activeIndex}`} className="hero-content animate-slide-up">
            <h1 className="hero-title">
              <span className="hero-word-build">{currentSlide.titleWord1}</span>
              <span className="hero-word-your-own">{currentSlide.titleWord2}</span>
              <span className="hero-word-boil-wrapper">
                <span className="hero-word-boil">{currentSlide.titleWord3}</span>
                <span className="hero-lemon-slice">{currentSlide.titleEmoji}</span>
              </span>
            </h1>

            <div className="hero-buttons">
              <button 
                type="button" 
                className="btn-primary btn-lg btn-glow hero-cta-btn"
                onClick={() => openOrderModal('pickup')}
              >
                <span>{currentSlide.buttonText}</span>
              </button>
            </div>

            {/* Slider Dots */}
            <div className="hero-dots">
              {SLIDES.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Red Slant + Overlapping Plates */}
          <div className="hero-visual">
            {/* Red Slanted Background Block */}
            <div className="visual-red-slant" />

            {/* Overlapping Platters */}
            <div key={`visual-${activeIndex}`} className="plates-container">
              <div className="plate-top-wrapper">
                <div className="plate-top plate-top-animate">
                  <img src={currentSlide.plateTopImg} alt={`Seafood Platter Top ${activeIndex}`} fetchPriority="high" />
                </div>
              </div>
              <div className="plate-bottom-wrapper">
                <div className="plate-bottom plate-bottom-animate">
                  <img src={currentSlide.plateBottomImg} alt={`Seafood Platter Bottom ${activeIndex}`} fetchPriority="high" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
