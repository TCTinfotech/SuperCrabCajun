import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Clock, CreditCard, ChevronDown, ChevronUp, Tag, ShieldCheck, ArrowLeft, AlertCircle, Calendar, Check } from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import { useCart } from '../contexts/CartContext';
import { useMenu } from '../contexts/MenuContext';
import { GOOGLE_APPS_SCRIPT_URL, LOCATIONS } from '../utils/constants';
import { getPickupScheduleInfo } from '../utils/pickupTime';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { menuItems } = useMenu();
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
    setCouponCode
  } = useCart();

  const navigate = useNavigate();
  const storeLocation = LOCATIONS[0];

  // Dynamic Pickup Time Schedule
  const pickupInfo = useMemo(() => getPickupScheduleInfo(), []);
  const [pickupType, setPickupType] = useState('asap'); // 'asap' | 'scheduled'
  const [scheduledTime, setScheduledTime] = useState(() => pickupInfo.slots[0]?.value || 'Today at 12:00 PM');
  const [isEditingPickupTime, setIsEditingPickupTime] = useState(false);

  const resolvedPickupTime = pickupType === 'asap' ? pickupInfo.asapValue : scheduledTime;
  const displayPickupTime = pickupType === 'asap' ? pickupInfo.asapLabel : scheduledTime;

  const [formData, setFormData] = useState({
    countryCode: '+1',
    phone: '',
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    saveInfo: false
  });

  const [paymentMethod, setPaymentMethod] = useState('pickup_cash'); // 'pickup_cash', 'card', 'cashapp', 'afterpay'
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTipClick = (pct) => {
    setCustomTip(null);
    setTipPercentage(pct);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Check if any item in cart is inactive
    const invalidItems = cartItems.filter((cartItem) => {
      const activeMenuItem = menuItems.find((m) => m.id === cartItem.id);
      return !activeMenuItem || activeMenuItem.isAvailable === false;
    });

    if (invalidItems.length > 0) {
      setErrorMsg(
        `⚠️ Cảnh báo: Món "${invalidItems.map((i) => i.name).join(', ')}" hiện đang ngưng phục vụ. Vui lòng xóa món này khỏi giỏ hàng trước khi tiếp tục thanh toán!`
      );
      setIsSubmitting(false);
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const isSquare = paymentMethod === 'square' || paymentMethod === 'card';
      const payload = {
        action: paymentMethod === 'pickup_cash' ? 'create-order' : 'create-square-session',
        gateway: isSquare ? 'square' : 'direct_pickup',
        customer: {
          name: `${formData.firstName} ${formData.lastName}`.trim() || 'Guest',
          phone: `${formData.countryCode} ${formData.phone}`,
          email: formData.email
        },
        pickupTime: resolvedPickupTime,
        specialNotes: `Curbside: ${isCurbside ? 'Yes' : 'No'}${formData.specialNotes ? ' | Note: ' + formData.specialNotes : ''}`,
        items: cartItems.map((item) => ({
          cartItemId: item.cartItemId,
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          seasoning: item.seasoning || '',
          spiceLevel: item.spiceLevel || ''
        })),
        subtotal: cartSubtotal.toFixed(2),
        tax: taxAmount.toFixed(2),
        tip: tipAmount.toFixed(2),
        total: orderTotal.toFixed(2)
      };

      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        if (result.paymentUrl) {
          // Square Online Checkout redirect
          window.location.href = result.paymentUrl;
        } else if (result.sessionUrl) {
          // Stripe redirect fallback
          window.location.href = result.sessionUrl;
        } else {
          // Direct Store Pickup Order confirmed
          navigate(`/thank-you?order_id=${result.orderId}&payment=pickup`);
        }
      } else {
        throw new Error(
          result.error ||
            'Unable to initiate payment session. Please select "Pay at Store / Pickup" to complete your order!'
        );
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMsg(
        err.message || 'There was an issue processing your order. Please try again or select Pay at Store.'
      );
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty-state">
        <SEOHead title="Checkout" description="Complete your Super Crab order." />
        <div className="container empty-checkout-card">
          <h2>Your cart is empty</h2>
          <p>Please add items to your cart before proceeding to checkout.</p>
          <Link to="/menu" className="btn-red-submit">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="square-checkout-page">
      <SEOHead title="Checkout" description="Pay & place order for Super Crab." canonicalUrl="/checkout" />

      <div className="container square-checkout-container">
        
        {/* Back Link */}
        <Link to="/cart" className="square-back-link">
          <ArrowLeft size={16} />
          <span>Back to Cart</span>
        </Link>

        <h1 className="square-page-title">Checkout</h1>

        {errorMsg && (
          <div className="square-error-banner" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
            {errorMsg.toLowerCase().includes('api key') && (
              <div style={{ marginTop: '6px', fontSize: '0.9rem', background: '#ffffff', padding: '8px 12px', borderRadius: '6px', width: '100%', border: '1px solid #fecaca' }}>
                <p style={{ margin: '0 0 6px', color: '#991b1b' }}>
                  💡 <strong>Gợi ý:</strong> Bạn chưa điền Stripe Secret Key thật trong Apps Script. Hãy chuyển sang phương thức <strong>"Pay at Store / Pickup"</strong> để đặt hàng thử nghiệm ngay lập tức!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('pickup_cash');
                    setErrorMsg(null);
                  }}
                  style={{
                    background: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  👉 Chọn "Pay at Store" và tiếp tục
                </button>
              </div>
            )}
          </div>
        )}

        <div className="square-checkout-grid">
          
          {/* LEFT COLUMN: Payment & Customer Info */}
          <div className="square-left-col">
            
            {/* Express Checkout */}
            <div className="express-pay-block">
              <button
                type="button"
                className={`express-btn store-pay-btn ${paymentMethod === 'pickup_cash' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('pickup_cash')}
              >
                <span>🏪</span> <strong>Pay at Store / Pickup</strong>
              </button>
              <button
                type="button"
                className={`express-btn square-pay-btn ${paymentMethod === 'square' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('square')}
              >
                <span className="sq-icon">■</span> <strong>Square Pay</strong>
              </button>
            </div>

            <div className="checkout-divider"><span>OR</span></div>

            <form onSubmit={handlePlaceOrder} className="square-form">
              
              {/* Contact Information */}
              <section className="form-section">
                <h2 className="section-heading">Contact</h2>

                <div className="form-row-2">
                  <div className="input-group">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                    >
                      <option value="+1">+1 (United States)</option>
                      <option value="+1">+1 (Canada)</option>
                      <option value="+84">+84 (Vietnam)</option>
                      <option value="+44">+44 (United Kingdom)</option>
                      <option value="+61">+61 (Australia)</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address for receipt"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row-2">
                  <div className="input-group">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <p className="disclaimer-subtext">
                  By providing your phone number/email, you agree to receive order updates via text or email. <a href="#">Learn more</a>
                </p>
              </section>

              {/* Payment Section */}
              <section className="form-section">
                <div className="payment-heading-row">
                  <h2 className="section-heading">Payment</h2>
                  <span className="security-tag"><ShieldCheck size={14} /> All transactions are secure and encrypted</span>
                </div>

                {/* Option 1: Pay at Store / Pickup (Cash or Card in Person) */}
                <div
                  className={`payment-option-card ${paymentMethod === 'pickup_cash' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('pickup_cash')}
                >
                  <div className="payment-card-radio">
                    <span className={`custom-radio-dot ${paymentMethod === 'pickup_cash' ? 'checked' : ''}`}></span>
                  </div>
                  <div className="payment-card-content">
                    <div className="payment-title-row">
                      <strong className="option-title">🏪 Pay at Store / Pickup</strong>
                      <span className="payment-badge-pill green">
                        Recommended (Free)
                      </span>
                    </div>
                    <p className="payment-desc">
                      Pay with cash or credit/debit card directly at our counter when you pick up your order.
                    </p>
                  </div>
                </div>

                {/* Option 2: Square Online Checkout (Apple Pay, Google Pay, Cards, Afterpay) */}
                <div
                  className={`payment-option-card ${paymentMethod === 'square' || paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('square')}
                >
                  <div className="payment-card-radio">
                    <span className={`custom-radio-dot ${paymentMethod === 'square' || paymentMethod === 'card' ? 'checked' : ''}`}></span>
                  </div>
                  <div className="payment-card-content">
                    <div className="payment-title-row">
                      <strong className="option-title">💳 Square Online Checkout (US)</strong>
                      <div className="payment-icons-group">
                        <span className="square-badge">■ Square</span>
                        <CreditCard size={18} color="#0f172a" />
                      </div>
                    </div>
                    <p className="payment-desc">
                      Pay securely with <strong>Apple Pay</strong>, <strong>Google Pay</strong>, <strong>Credit/Debit Card</strong>, or <strong>Afterpay</strong>.
                    </p>
                  </div>
                </div>
              </section>

              {/* Order Notes & Special Instructions */}
              <section className="form-section">
                <div className="payment-heading-row">
                  <h2 className="section-heading">Order Instructions & Requests</h2>
                  <span className="optional-tag">Optional</span>
                </div>
                <div className="input-group">
                  <textarea
                    name="specialNotes"
                    placeholder="E.g. Extra lemons/napkins, vehicle make & color for curbside pickup, or special kitchen requests..."
                    rows={3}
                    value={formData.specialNotes || ''}
                    onChange={handleChange}
                    className="order-notes-textarea"
                  />
                </div>
              </section>

            </form>
          </div>

          {/* RIGHT COLUMN: Pickup & Summary Sidebar */}
          <div className="square-right-col">
            
            {/* Pickup at */}
            <div className="sidebar-box">
              <div className="pickup-box-header">
                <h3 className="box-title">Pickup at</h3>
                <button
                  type="button"
                  className="btn-edit-pickup-time"
                  onClick={() => setIsEditingPickupTime(!isEditingPickupTime)}
                >
                  {isEditingPickupTime ? 'Done' : 'Change Time'}
                </button>
              </div>

              <div className="pickup-info-content">
                <div className="pickup-line">
                  <MapPin size={16} className="icon-dark" />
                  <div>
                    <strong>{storeLocation.name}</strong>
                    <p>{storeLocation.address}</p>
                  </div>
                </div>

                {/* Selected Pickup Time Display */}
                <div className="pickup-line pickup-time-active-row">
                  <Clock size={16} className="icon-dark" />
                  <div className="pickup-time-active-box">
                    <span className="pickup-time-main-badge">
                      {pickupType === 'asap' ? (
                        <>
                          <span className="asap-flash">⚡</span> {displayPickupTime}
                        </>
                      ) : (
                        <>
                          <Calendar size={14} /> {displayPickupTime}
                        </>
                      )}
                    </span>
                    {pickupInfo.isOpenNow && (
                      <span className="store-status-pill open">● Kitchen Open ({pickupInfo.storeHoursText})</span>
                    )}
                  </div>
                </div>

                {/* Expandable Pickup Time Editor */}
                {isEditingPickupTime && (
                  <div className="pickup-time-editor-card animate-slide-down">
                    <div className="pickup-mode-toggle-pills">
                      <button
                        type="button"
                        className={`pickup-pill-btn ${pickupType === 'asap' ? 'active' : ''}`}
                        onClick={() => setPickupType('asap')}
                      >
                        ⚡ ASAP (~15-25m)
                      </button>
                      <button
                        type="button"
                        className={`pickup-pill-btn ${pickupType === 'scheduled' ? 'active' : ''}`}
                        onClick={() => setPickupType('scheduled')}
                      >
                        📅 Schedule Later
                      </button>
                    </div>

                    {pickupType === 'scheduled' ? (
                      <div className="pickup-schedule-dropdown-group">
                        <label className="schedule-label">Select Pickup Time Today:</label>
                        {pickupInfo.slots.length > 0 ? (
                          <select
                            className="pickup-select-control"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                          >
                            {pickupInfo.slots.map((slot) => (
                              <option key={slot.value} value={slot.value}>
                                {slot.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <p className="no-slots-alert">
                            No remaining time slots for today. Orders will be prepared at next store opening.
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="asap-estimated-banner">
                        <span className="asap-banner-text">
                          🕒 Your order will be placed into the kitchen queue immediately and ready for hot pickup in approximately <strong>15–25 minutes</strong>.
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="curbside-line">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={isCurbside}
                      onChange={(e) => setIsCurbside(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                  <span>Curbside pickup</span>
                </div>

                <div className="pickup-instructions">
                  <strong>Instructions:</strong>
                  <p>Please go to the BAR where cash register at for picking up. Thanks.</p>
                </div>
              </div>
            </div>

            {/* Order Summary Collapsible */}
            <div className="sidebar-box">
              <button
                type="button"
                className="collapsible-header"
                onClick={() => setIsSummaryOpen(!isSummaryOpen)}
              >
                <h3>Order summary ({cartCount} {cartCount === 1 ? 'item' : 'items'})</h3>
                {isSummaryOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {isSummaryOpen && (
                <div className="summary-collapsible-body">
                  {cartItems.map((item) => (
                    <div key={item.cartItemId} className="summary-item">
                      <div className="sum-item-left">
                        <span className="sum-item-name">{item.qty}x {item.name}</span>
                        {item.seasoning && <span className="sum-item-meta">{item.seasoning}</span>}
                        {item.spiceLevel && <span className="sum-item-meta">{item.spiceLevel}</span>}
                      </div>
                      <span className="sum-item-price">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add a tip (Optional) */}
            <div className="sidebar-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 className="box-title" style={{ margin: 0 }}>Add a tip</h3>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Optional</span>
              </div>
              <div className="tip-grid">
                <button
                  type="button"
                  className={`tip-btn ${customTip === null && tipPercentage === 0 ? 'selected' : ''}`}
                  onClick={() => handleTipClick(0)}
                >
                  <span className="pct">No Tip</span>
                  <span className="val">$0.00</span>
                </button>

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
                      <span className="pct">{pct}%</span>
                      <span className="val">${tipVal.toFixed(2)}</span>
                    </button>
                  );
                })}

                <button
                  type="button"
                  className={`tip-btn ${customTip !== null ? 'selected' : ''}`}
                  onClick={() => {
                    const custom = prompt('Enter custom tip amount ($):', '0');
                    if (custom !== null) {
                      const val = parseFloat(custom);
                      if (!isNaN(val) && val >= 0) setCustomTip(val);
                    }
                  }}
                >
                  <span className="pct">Custom</span>
                  {customTip !== null && <span className="val">${customTip.toFixed(2)}</span>}
                </button>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="sidebar-box">
              <div className="coupon-box">
                <Tag size={16} />
                <input
                  type="text"
                  placeholder="Add coupon or gift card"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
            </div>

            {/* Order Totals & Place Order Button */}
            <div className="sidebar-box totals-box">
              <div className="tot-line">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="tot-line">
                <span>Taxes (SALES TAX)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="tot-line">
                <span>Tip ({customTip !== null ? 'Custom' : `${tipPercentage}%`})</span>
                <span>${tipAmount.toFixed(2)}</span>
              </div>

              <div className="tot-line grand-total-line">
                <span>Order total</span>
                <span className="grand-total-val">${orderTotal.toFixed(2)}</span>
              </div>

              <button
                type="button"
                className="btn-red-submit"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : `Place order $${orderTotal.toFixed(2)}`}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
