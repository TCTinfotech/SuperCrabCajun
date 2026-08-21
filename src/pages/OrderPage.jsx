import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ExternalLink, MapPin } from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import { LOCATIONS, DOORDASH_ORDER_URL } from '../utils/constants';
import { useCart } from '../contexts/CartContext';
import './OrderPage.css';

export default function OrderPage() {
  const { openOrderModal } = useCart();
  const navigate = useNavigate();

  const handlePickup = () => {
    navigate('/menu');
  };

  const handleDelivery = () => {
    window.open(DOORDASH_ORDER_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="order-page">
      <SEOHead 
        title="Order Online" 
        description="Order Super Crab online for Pickup or Delivery via DoorDash."
        canonicalUrl="/order"
      />

      {/* Hero Header */}
      <section className="order-hero-banner" style={{ backgroundImage: `linear-gradient(rgba(10, 14, 23, 0.45), rgba(10, 14, 23, 0.8)), url('/images/seafood_spread.webp')` }}>
        <div className="container banner-text reveal">
          <span className="banner-subtitle">Order Options</span>
          <h1 className="banner-title text-gradient">ONLINE ORDERING</h1>
          <p className="banner-desc">
            Choose how you would like to order: Pick up in-store with zero wait time, or get fresh delivery via DoorDash.
          </p>
        </div>
      </section>

      {/* 2-Flow Order Options Section */}
      <section className="order-content-section section-padding">
        <div className="container select-and-order-container">
          
          <div className="platforms-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', width: '100%' }}>
            
            {/* Option 1: Pickup */}
            <article className="platform-card glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="platform-logo-wrapper" style={{ fontSize: '3rem' }}>
                🛍️
              </div>
              <h2 className="platform-name" style={{ fontSize: '1.5rem', fontWeight: '800' }}>PICKUP ORDER</h2>
              <p className="platform-desc">
                Order directly on our site & pick up hot at our Texas City store.
              </p>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                📍 {LOCATIONS[0].address}
              </p>
              <button 
                type="button" 
                className="btn-primary w-full btn-glow" 
                onClick={handlePickup}
                style={{ marginTop: 'auto', padding: '0.85rem' }}
              >
                <ShoppingBag size={18} />
                <span>Order Pickup Now</span>
              </button>
            </article>

            {/* Option 2: Delivery */}
            <article className="platform-card glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="platform-logo-wrapper" style={{ fontSize: '3rem' }}>
                🚴
              </div>
              <h2 className="platform-name" style={{ fontSize: '1.5rem', fontWeight: '800' }}>DELIVERY ORDER</h2>
              <p className="platform-desc">
                Order delivery straight to your door via DoorDash.
              </p>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                🚀 Delivered fresh & hot by DoorDash
              </p>
              <button 
                type="button" 
                className="btn-primary w-full btn-glow" 
                onClick={handleDelivery}
                style={{ marginTop: 'auto', padding: '0.85rem', background: 'linear-gradient(135deg, #ff3008 0%, #d92200 100%)' }}
              >
                <ExternalLink size={18} />
                <span>Order Delivery on DoorDash</span>
              </button>
            </article>

          </div>

        </div>
      </section>
    </div>
  );
}
