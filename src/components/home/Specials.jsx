import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DOORDASH_ORDER_URL } from '../../utils/constants';
import './Specials.css';

export default function Specials() {
  const navigate = useNavigate();

  const handlePickup = () => {
    navigate('/menu');
  };

  const handleDelivery = () => {
    window.open(DOORDASH_ORDER_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="specials section-padding">
      <div className="container">
        <div className="order-types-grid">
          {/* Pick-up Card -> Navigates straight to menu */}
          <div 
            className="order-type-card pickup-card reveal animate-slide-up"
            onClick={handlePickup}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-bg-overlay" style={{ backgroundImage: `linear-gradient(rgba(18, 30, 61, 0.4), rgba(18, 30, 61, 0.7)), url('/images/takeout_pickup.webp')` }} />
            <div className="order-type-content">
              <div className="bag-icon-graphic">🛍️</div>
              <button 
                type="button" 
                className="btn-type-select"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePickup();
                }}
              >
                <span>PICK-UP</span>
              </button>
            </div>
          </div>

          {/* Delivery Card -> Opens DoorDash directly */}
          <div 
            className="order-type-card delivery-card reveal reveal-delay-1 animate-slide-up"
            onClick={handleDelivery}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-bg-overlay" style={{ backgroundImage: `linear-gradient(rgba(18, 30, 61, 0.4), rgba(18, 30, 61, 0.7)), url('/images/food_delivery.webp')` }} />
            <div className="order-type-content">
              <div className="bag-icon-graphic">🚴</div>
              <button 
                type="button" 
                className="btn-type-select"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelivery();
                }}
              >
                <span>DELIVERY</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
