import React from 'react';
import { HelpCircle, Star, Sparkles, Trophy } from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import { BRAND_NAME } from '../utils/constants';
import { useScrollReveal } from '../utils/scrollReveal';
import './AboutPage.css';

export default function AboutPage() {
  useScrollReveal();

  const values = [
    {
      icon: <Star size={24} />,
      title: 'Premium Quality',
      desc: 'We source the freshest crabs, lobster tails, and shrimp, steamed to lock in seafood sweetness.'
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Secret Recipes',
      desc: 'Our spice recipes are proprietary custom blends simmered in pure butter every morning.'
    },
    {
      icon: <Trophy size={24} />,
      title: 'Texas Pride',
      desc: 'Owned and operated right here in Houston — Southern hospitality runs through everything we do.'
    }
  ];

  return (
    <div className="about-page">
      <SEOHead 
        title="About Our Restaurant" 
        description="Learn the story behind Super Crab. Discover our commitment to Cajun flavor traditions, fresh catch ingredients, and friendly Texas hospitality."
        canonicalUrl="/about"
      />

      {/* Hero Header */}
      <section className="about-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(10, 14, 23, 0.45), rgba(10, 14, 23, 0.8)), url('/images/restaurant.webp')` }}>
        <div className="container banner-text reveal">
          <span className="banner-subtitle">The Crab house</span>
          <h1 className="banner-title text-gradient">OUR STORY</h1>
          <p className="banner-desc">
            We are dedicated to bringing the authentic, messy, and joyful experience of backyard boils straight to Texas tables.
          </p>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="about-story-section section-padding">
        <div className="container story-grid">
          
          <div className="story-text-side reveal">
            <span className="section-subtitle">Since 2021</span>
            <h2>HOW IT ALL STARTED</h2>
            <p>
              It all began with a simple idea: that dining should be an adventure, a hands-on experience that brings people together. There is something unique about gathering around a table, putting on bibs, rolling up sleeves, and digging into a piping-hot steam bag of crawfish and crab.
            </p>
            <p>
              <strong>{BRAND_NAME}</strong> was founded in Texas by a group of seafood lovers who wanted to fuse traditional Louisiana Cajun spices with bold, modern flavors. We experimented with hundreds of recipes in our test kitchens before finalizing our signature **Super Crab Special sauce**—the perfect blend of garlic butter, lemon pepper, and classic Cajun heat.
            </p>
            <p>
              Today, at our location in Texas City, our mission remains unchanged: to serve the highest quality seafood boils with friendly southern hospitality in a fun, lively atmosphere.
            </p>
          </div>

          <div className="story-visual-side reveal reveal-delay-1">
            <div className="story-image-card">
              <img 
                src="/images/seafood_spread.webp" 
                alt="Super Crab seafood boil feast"
                className="about-story-img"
              />
              <div className="story-image-overlay glass-card">
                <span className="years-number">5+</span>
                <span className="years-text">Years of Boiling Excellence</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values-section section-padding">
        <div className="container">
          <h2 className="text-gradient text-center reveal">OUR CORE VALUES</h2>
          <p className="section-description text-center reveal">
            What drives our kitchens and service staff every single day.
          </p>

          <div className="values-grid">
            {values.map((v, idx) => (
              <div 
                key={v.title} 
                className={`value-card glass-card reveal reveal-delay-${idx + 1}`}
              >
                <div className="value-icon">{v.icon}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="about-gallery-section section-padding">
        <div className="container">
          <h2 className="text-gradient text-center reveal">RESTAURANT GALLERY</h2>
          <p className="section-description text-center reveal">
            Sneak peek into our kitchens, dining tables, and lively atmosphere.
          </p>

          <div className="gallery-grid reveal">
            <div className="gallery-item item-wide">
              <img src="/images/seafood_spread.webp" alt="Super Crab Spread" />
            </div>
            <div className="gallery-item">
              <img src="/images/crawfish_pile.webp" alt="Cajun crawfish boil pile" />
            </div>
            <div className="gallery-item">
              <img src="/images/oysters_platter.webp" alt="Fresh raw oysters on the half shell" />
            </div>
            <div className="gallery-item item-tall">
              <img src="/images/seafood_boil_close.webp" alt="Close-up Cajun seafood boil" />
            </div>
            <div className="gallery-item">
              <img src="/images/chicken_wings.webp" alt="Crispy Cajun wings in a basket" />
            </div>
            <div className="gallery-item">
              <img src="/images/crab_legs.webp" alt="Garlic butter crab legs close-up" />
            </div>
            <div className="gallery-item">
              <img src="/images/seafood_boil_platter_new_1.webp" alt="Cajun seafood boil platter" />
            </div>
            <div className="gallery-item item-wide">
              <img src="/images/lobster_crab_seafood_feast_new_1.webp" alt="Lobster and crab seafood feast" />
            </div>
            <div className="gallery-item">
              <img src="/images/baked_oysters.webp" alt="Delicious baked oysters" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
