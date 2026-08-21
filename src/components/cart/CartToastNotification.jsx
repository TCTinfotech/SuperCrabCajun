import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import './CartToastNotification.css';

export default function CartToastNotification() {
  const { toastItem, isToastVisible, closeToast } = useCart();

  if (!isToastVisible || !toastItem) return null;

  return (
    <div className="cart-toast-wrapper animate-slide-left">
      <div className="cart-toast-content">
        
        {/* Left Checkmark Icon */}
        <div className="cart-toast-icon">
          <CheckCircle2 size={24} />
        </div>

        {/* Item Thumbnail if available */}
        {toastItem.image && (
          <img src={toastItem.image} alt={toastItem.name} className="cart-toast-img" />
        )}

        {/* Info */}
        <div className="cart-toast-info">
          <div className="toast-header-row">
            <span className="toast-status-title">Added to Cart!</span>
            <span className="toast-qty-tag">x{toastItem.qty}</span>
          </div>

          <h4 className="toast-item-name">{toastItem.name.toUpperCase()}</h4>

          {(toastItem.seasoning || toastItem.spiceLevel) && (
            <div className="toast-item-opts">
              {toastItem.seasoning && <span className="toast-opt-pill">{toastItem.seasoning}</span>}
              {toastItem.spiceLevel && <span className="toast-opt-pill spice">{toastItem.spiceLevel}</span>}
            </div>
          )}
        </div>

        {/* Close */}
        <div className="cart-toast-actions">
          <button type="button" className="btn-toast-close" onClick={closeToast} aria-label="Close notification">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
