import React from 'react';
import { Link } from 'react-router-dom';
import './Specials.css';

export default function Specials() {
  return (
    <section className="specials section-padding">
      <div className="container">
        <div className="order-types-grid">
          {/* Pick-up Card */}
          <div className="order-type-card pickup-card reveal animate-slide-up">
            <div className="card-bg-overlay" style={{ backgroundImage: `linear-gradient(rgba(18, 30, 61, 0.4), rgba(18, 30, 61, 0.7)), url('/images/takeout_pickup.png')` }} />
            <div className="order-type-content">
              <div className="bag-icon-graphic">🛍️</div>
              <Link to="/order?type=pickup" className="btn-type-select">
                <span>Pick-up</span>
              </Link>
            </div>
          </div>

          {/* Delivery Card */}
          <div className="order-type-card delivery-card reveal reveal-delay-1 animate-slide-up">
            <div className="card-bg-overlay" style={{ backgroundImage: `linear-gradient(rgba(18, 30, 61, 0.4), rgba(18, 30, 61, 0.7)), url('/images/food_delivery.png')` }} />
            <div className="order-type-content">
              <div className="bag-icon-graphic">🚴</div>
              <Link to="/order?type=delivery" className="btn-type-select">
                <span>Delivery</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
