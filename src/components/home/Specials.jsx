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
            <div className="card-bg-overlay" style={{ backgroundImage: `linear-gradient(rgba(18, 30, 61, 0.4), rgba(18, 30, 61, 0.7)), url('/images/takeout_pickup.webp')` }} />
            <div className="order-type-content">
              <div className="bag-icon-graphic">🛍️</div>
              <a href="https://order.online/store/super-crab-palmer-hwy-2519187?utm_id=97757_v0_s00_e0_tv0&fbclid=IwY2xjawSiMLRleHRuA2FlbQIxMABicmlkETF3ZHNwWEcwZmhXeUE0S21hc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHvh1dshdA9SIHiYPlSsqGydpM2CXrBo74wV2RZdQknVODcuVEeSSDevaBNUf_aem__1rPImzAoWoAvodEpsUFyA&pickup=true" target="_blank" rel="noopener noreferrer" className="btn-type-select">
                <span>PICK-UP</span>
              </a>
            </div>
          </div>

          {/* Delivery Card */}
          <div className="order-type-card delivery-card reveal reveal-delay-1 animate-slide-up">
            <div className="card-bg-overlay" style={{ backgroundImage: `linear-gradient(rgba(18, 30, 61, 0.4), rgba(18, 30, 61, 0.7)), url('/images/food_delivery.webp')` }} />
            <div className="order-type-content">
              <div className="bag-icon-graphic">🚴</div>
              <a href="https://order.online/store/super-crab-palmer-hwy-2519187?utm_id=97757_v0_s00_e0_tv0&fbclid=IwY2xjawSiMLRleHRuA2FlbQIxMABicmlkETF3ZHNwWEcwZmhXeUE0S21hc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHvh1dshdA9SIHiYPlSsqGydpM2CXrBo74wV2RZdQknVODcuVEeSSDevaBNUf_aem__1rPImzAoWoAvodEpsUFyA&delivery=true" target="_blank" rel="noopener noreferrer" className="btn-type-select">
                <span>DELIVERY</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
