import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Clock, Plus, Minus, Trash2, Tag, Edit2 } from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import { useCart } from '../contexts/CartContext';
import { LOCATIONS } from '../utils/constants';
import { getPickupScheduleInfo } from '../utils/pickupTime';
import './CartPage.css';

export default function CartPage() {
  const pickupInfo = useMemo(() => getPickupScheduleInfo(), []);
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    taxAmount,
    tipAmount,
    orderTotal,
    tipPercentage,
    setTipPercentage,
    customTip,
    setCustomTip,
    isCurbside,
    setIsCurbside,
    couponCode,
    setCouponCode,
    updateQty,
    removeFromCart
  } = useCart();

  const navigate = useNavigate();
  const storeLocation = LOCATIONS[0];
  const [showCustomTipInput, setShowCustomTipInput] = useState(false);
  const [tempCustomTip, setTempCustomTip] = useState('');

  const handleTipClick = (pct) => {
    setShowCustomTipInput(false);
    setCustomTip(null);
    setTipPercentage(pct);
  };

  const handleCustomTipSubmit = (e) => {
    e.preventDefault();
    const parsed = parseFloat(tempCustomTip);
    if (!isNaN(parsed) && parsed >= 0) {
      setCustomTip(parsed);
    }
  };

  const handleContinueToPayment = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-empty">
        <SEOHead title="Your Cart" description="Review your order at Super Crab." />
        <div className="container empty-cart-box">
          <span className="empty-emoji">🦀</span>
          <h1 className="empty-title">Your cart is empty</h1>
          <p>Explore our delicious Cajun seafood menu and start your order!</p>
          <Link to="/menu" className="btn-red-outline">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <SEOHead title="Your Cart" description="Review your items & select pickup preferences." canonicalUrl="/cart" />

      <div className="container cart-page-container">
        {/* Page Title */}
        <div className="cart-page-header">
          <h1 className="cart-page-title">Your cart</h1>
          <span className="cart-page-subtitle">Your order ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
        </div>

        {/* Main 2-Column Grid */}
        <div className="cart-page-grid">
          
          {/* LEFT COLUMN: Item List */}
          <div className="cart-left-col">
            <div className="cart-items-card">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="cart-page-item-row">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="item-thumb" />
                  )}

                  <div className="item-details">
                    <div className="item-header-line">
                      <h3 className="item-title">{item.name.toUpperCase()}</h3>
                      <span className="item-price">${(item.price * item.qty).toFixed(2)}</span>
                    </div>

                    <div className="item-unit-price-line">${item.price.toFixed(2)}</div>

                    {/* Breakdown of options */}
                    {item.seasoning && (
                      <div className="item-attr-row">
                        <span className="attr-label">SAUCE</span>
                        <span className="attr-val">{item.seasoning.toUpperCase()}</span>
                      </div>
                    )}

                    {item.spiceLevel && (
                      <div className="item-attr-row">
                        <span className="attr-label">SPICY LEVEL</span>
                        <span className="attr-val">{item.spiceLevel.toUpperCase()}</span>
                      </div>
                    )}

                    {/* Quantity Controls */}
                    <div className="item-controls-row">
                      <div className="qty-control-box">
                        <button
                          type="button"
                          className="qty-btn-square"
                          onClick={() => updateQty(item.cartItemId, item.qty - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-val-text">{item.qty}</span>
                        <button
                          type="button"
                          className="qty-btn-square"
                          onClick={() => updateQty(item.cartItemId, item.qty + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="item-trash-btn"
                        onClick={() => removeFromCart(item.cartItemId)}
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add More Items Button */}
            <Link to="/menu" className="btn-add-more-items">
              Add more items
            </Link>
          </div>

          {/* RIGHT COLUMN: Pickup & Price Summary */}
          <div className="cart-right-col">
            
            {/* How to get it */}
            <div className="sidebar-block">
              <div className="block-header-row">
                <span className="block-title">How to get it</span>
                <Link to="/locations" className="edit-link">Edit</Link>
              </div>

              <div className="pickup-details">
                <div className="pickup-info-line">
                  <MapPin size={16} className="sidebar-icon" />
                  <span><strong>Pickup:</strong> {storeLocation.address}</span>
                </div>

                <div className="pickup-info-line">
                  <Clock size={16} className="sidebar-icon" />
                  <span>
                    <strong>Pickup:</strong> {pickupInfo.isOpenNow ? `⚡ Ready in ~15-25 mins (${pickupInfo.asapValue})` : pickupInfo.asapLabel}
                  </span>
                </div>

                {/* Curbside Toggle */}
                <div className="curbside-row">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={isCurbside}
                      onChange={(e) => setIsCurbside(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                  <span className="curbside-label">Curbside pickup</span>
                </div>
              </div>
            </div>

            {/* Add a Tip */}
            <div className="sidebar-block">
              <span className="block-title red-title">Add a tip</span>
              <div className="tip-buttons-grid">
                {[10, 15, 20].map((pct) => {
                  const tipVal = cartSubtotal * (pct / 100);
                  const isSelected = customTip === null && tipPercentage === pct;
                  return (
                    <button
                      key={pct}
                      type="button"
                      className={`tip-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleTipClick(pct)}
                    >
                      <span className="tip-pct">{pct}%</span>
                      <span className="tip-val">${tipVal.toFixed(2)}</span>
                    </button>
                  );
                })}

                <button
                  type="button"
                  className={`tip-btn ${showCustomTipInput || customTip !== null ? 'selected' : ''}`}
                  onClick={() => setShowCustomTipInput(true)}
                >
                  <span className="tip-pct">Other</span>
                  {customTip !== null && <span className="tip-val">${customTip.toFixed(2)}</span>}
                </button>
              </div>

              {showCustomTipInput && (
                <form onSubmit={handleCustomTipSubmit} className="custom-tip-form">
                  <input
                    type="number"
                    step="0.50"
                    placeholder="Enter tip amount ($)"
                    value={tempCustomTip}
                    onChange={(e) => setTempCustomTip(e.target.value)}
                  />
                  <button type="submit">Apply</button>
                </form>
              )}
            </div>

            {/* Coupon / Gift Card Input */}
            <div className="sidebar-block">
              <div className="coupon-input-wrapper">
                <Tag size={16} className="tag-icon" />
                <input
                  type="text"
                  placeholder="Add coupon or gift card"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="sidebar-block summary-totals">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>

              <div className="summary-line">
                <span>Estimated taxes (SALES TAX)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>

              <div className="summary-line">
                <span>Tip ({customTip !== null ? 'Custom' : `${tipPercentage}%`})</span>
                <span>${tipAmount.toFixed(2)}</span>
              </div>

              <div className="summary-line total-line">
                <span>Estimated order total</span>
                <span className="total-num">${orderTotal.toFixed(2)}</span>
              </div>

              <p className="disclaimer-text">
                Additional taxes and fees will be calculated at checkout
              </p>

              <button
                type="button"
                className="btn-continue-payment"
                onClick={handleContinueToPayment}
              >
                Continue to payment
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
