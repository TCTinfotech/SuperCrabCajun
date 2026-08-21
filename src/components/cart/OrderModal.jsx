import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Truck, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { DOORDASH_ORDER_URL, LOCATIONS } from '../../utils/constants';
import './OrderModal.css';

export default function OrderModal() {
  const { isOrderModalOpen, closeOrderModal } = useCart();
  const navigate = useNavigate();
  const storeLocation = LOCATIONS[0];

  if (!isOrderModalOpen) return null;

  const handlePickup = () => {
    closeOrderModal();
    navigate('/menu');
  };

  const handleDelivery = () => {
    closeOrderModal();
    window.open(DOORDASH_ORDER_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="order-modal-overlay" onClick={closeOrderModal}>
      <div className="order-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Header Banner with Logo & Close button */}
        <div className="order-modal-header">
          <div className="modal-header-brand">
            <img src="/logo.jpg" alt="Super Crab Logo" className="modal-brand-logo" />
            <div>
              <h3 className="modal-header-title">HOW WOULD YOU LIKE TO ORDER?</h3>
              <p className="modal-header-subtitle">Choose your preferred order option below</p>
            </div>
          </div>

          <button 
            type="button" 
            className="modal-header-close-btn" 
            onClick={closeOrderModal}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2-Option Choice Body */}
        <div className="order-modal-choices-body">
          
          {/* OPTION 1: PICKUP */}
          <div className="order-choice-card pickup-choice" onClick={handlePickup}>
            <div className="choice-icon-wrapper pickup-icon-bg">
              <ShoppingBag size={28} />
            </div>

            <div className="choice-info-content">
              <div className="choice-badge-row">
                <span className="choice-title">PICKUP ORDER</span>
                <span className="choice-tag tag-store">In-Store Pickup</span>
              </div>
              <p className="choice-desc">Pay online & pick up hot at our store with 0 wait time.</p>
              
              <div className="choice-location-row">
                <MapPin size={15} />
                <span>{storeLocation.address}</span>
              </div>
            </div>

            <div className="choice-action-arrow">
              <button type="button" className="btn-choice-select btn-pickup-select">
                <span>Order Pickup</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* OPTION 2: DELIVERY */}
          <div className="order-choice-card delivery-choice" onClick={handleDelivery}>
            <div className="choice-icon-wrapper delivery-icon-bg">
              <Truck size={28} />
            </div>

            <div className="choice-info-content">
              <div className="choice-badge-row">
                <span className="choice-title">DELIVERY ORDER</span>
                <span className="choice-tag tag-doordash">DoorDash</span>
              </div>
              <p className="choice-desc">Delivered fresh and hot straight to your door via DoorDash.</p>
              
              <div className="choice-location-row">
                <ExternalLink size={15} />
                <span>Redirects to DoorDash</span>
              </div>
            </div>

            <div className="choice-action-arrow">
              <button type="button" className="btn-choice-select btn-delivery-select">
                <span>Order Delivery</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
