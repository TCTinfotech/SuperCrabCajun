import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ExternalLink } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { DOORDASH_ORDER_URL, TAX_RATE } from '../../utils/constants';
import './CartDrawer.css';

export default function CartDrawer() {
  const {
    cartItems,
    cartSubtotal,
    isCartOpen,
    closeCart,
    updateQty,
    removeFromCart,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const estimatedTax = cartSubtotal * TAX_RATE;
  const estimatedTotal = cartSubtotal + estimatedTax;

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <div className="cart-drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <ShoppingBag size={22} className="cart-title-icon" />
            <h2>YOUR ORDER</h2>
            <span className="cart-count-pill">{cartItems.length} items</span>
          </div>
          <button type="button" className="cart-close-btn" onClick={closeCart} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        {/* Pickup vs Delivery banner */}
        <div className="cart-mode-banner">
          <div className="mode-badge pickup">📍 Pickup Order</div>
          <p className="mode-desc">Pay online & pick up hot at store. For delivery, use DoorDash below.</p>
        </div>

        {/* Drawer Body - Items List */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <span className="empty-emoji">🦀</span>
              <h3>Your cart is empty</h3>
              <p>Explore our delicious Cajun seafood menu and add your favorite boils!</p>
              <button type="button" className="btn-primary btn-empty-browse" onClick={closeCart}>
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="cart-item-card">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  )}
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    
                    {/* Customizer badges if any */}
                    {(item.seasoning || item.spiceLevel) && (
                      <div className="cart-item-options">
                        {item.seasoning && <span className="option-badge seasoning">🧄 {item.seasoning}</span>}
                        {item.spiceLevel && <span className="option-badge spice">🌶️ {item.spiceLevel}</span>}
                      </div>
                    )}

                    <div className="cart-item-price-row">
                      <span className="cart-item-price">${(item.price * item.qty).toFixed(2)}</span>
                      <span className="cart-item-unit-price">(${item.price.toFixed(2)} ea)</span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="cart-qty-controls">
                      <button
                        type="button"
                        className="qty-btn minus"
                        onClick={() => updateQty(item.cartItemId, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-val">{item.qty}</span>
                      <button
                        type="button"
                        className="qty-btn plus"
                        onClick={() => updateQty(item.cartItemId, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeFromCart(item.cartItemId)}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer - Totals & Actions */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-block">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Est. Tax (8.25%)</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span className="total-amount">${estimatedTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-action-buttons">
              <button
                type="button"
                className="btn-primary w-full btn-checkout btn-glow"
                onClick={handleCheckoutClick}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <button type="button" className="btn-clear-cart" onClick={clearCart}>
              Clear All Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
