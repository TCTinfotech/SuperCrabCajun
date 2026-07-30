import React from 'react';
import SEOHead from '../components/layout/SEOHead';
import HeroSection from '../components/home/HeroSection';
import AboutPreview from '../components/home/AboutPreview';
import HowItWorks from '../components/home/HowItWorks';
import FeaturedMenu from '../components/home/FeaturedMenu';
import Specials from '../components/home/Specials';
import Testimonials from '../components/home/Testimonials';
import LocationsPreview from '../components/home/LocationsPreview';
import InstagramFeed from '../components/home/InstagramFeed';
import { useScrollReveal } from '../utils/scrollReveal';

export default function HomePage() {
  // Initialize standard scroll-reveal animations for sections
  useScrollReveal();

  return (
    <>
      <SEOHead 
        title="Home" 
        description="Welcome to Super Crab. Indulge in premium Louisiana-style Cajun seafood boils, crabs, lobster tail, shrimp, and fresh crawfish. Taste the magic today!"
        canonicalUrl="/"
      />
      
      {/* Sections */}
      <HeroSection />
      <AboutPreview />
      <HowItWorks />
      <FeaturedMenu />
      <Specials />
      <Testimonials />
      <LocationsPreview />
      <InstagramFeed />
    </>
  );
}
