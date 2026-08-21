import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  MapPin,
  Phone,
  Clock,
  ShoppingBag,
  Navigation,
  Copy,
  Check,
  ChefHat,
  PackageCheck,
  Sparkles,
  Receipt
} from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import { useCart } from '../contexts/CartContext';
import { LOCATIONS } from '../utils/constants';
import './ThankYouPage.css';

export default function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');
  const paymentMode = searchParams.get('payment');
  const { clearCart } = useCart();

  const [isCopied, setIsCopied] = useState(false);
  const storeLocation = LOCATIONS[0];

  const displayOrderId = orderId || (sessionId ? sessionId.substring(0, 16) : 'SC-' + Math.floor(100000 + Math.random() * 900000));

  useEffect(() => {
    // Clear cart on successful order
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCopyId = () => {
    navigator.clipboard.writeText(displayOrderId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="thank-you-page">
      <SEOHead
        title="Order Confirmed! | Super Crab"
        description="Thank you for ordering with Super Crab Juicy Seafood & Bar."
        canonicalUrl="/thank-you"
      />

      <div className="thank-you-hero-bg">
        <div className="container thank-you-container">
          
          <div className="thank-you-main-card animate-fade-in">
            
            {/* Header Success Animation */}
            <div className="success-header-section">
              <div className="success-icon-bubble">
                <CheckCircle2 size={54} className="success-svg" />
                <span className="success-glow-ring"></span>
              </div>

              <span className="success-pill-badge">
                <Sparkles size={14} />
                {paymentMode === 'pickup' ? 'ORDER PLACED SUCCESSFULLY' : 'PAYMENT SUCCESSFUL'}
              </span>

              <h1 className="thank-you-heading">THANK YOU FOR YOUR ORDER!</h1>
              
              <p className="thank-you-subheading">
                {paymentMode === 'pickup'
                  ? 'Your order has been sent directly to our kitchen. You can pay with cash or card at our counter upon pickup.'
                  : "Your payment was confirmed and our chefs are firing up the boilers now. Get ready for juicy flavors! 🔥"}
              </p>
            </div>

            {/* Order Reference Box */}
            <div className="order-id-highlight-box">
              <div className="order-id-info">
                <span className="order-id-label">ORDER REFERENCE NUMBER</span>
                <strong className="order-id-number">{displayOrderId}</strong>
              </div>
              <button
                type="button"
                className="btn-copy-order-id"
                onClick={handleCopyId}
                title="Copy Order ID"
              >
                {isCopied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Order Tracker Progress Stepper */}
            <div className="order-stepper-box">
              <div className="stepper-step completed">
                <div className="step-circle"><Check size={16} /></div>
                <div className="step-label">
                  <strong>Order Received</strong>
                  <span>Confirmed</span>
                </div>
              </div>

              <div className="stepper-line active"></div>

              <div className="stepper-step active">
                <div className="step-circle"><ChefHat size={16} /></div>
                <div className="step-label">
                  <strong>Kitchen Preparing</strong>
                  <span>In the Boiler</span>
                </div>
              </div>

              <div className="stepper-line"></div>

              <div className="stepper-step">
                <div className="step-circle"><PackageCheck size={16} /></div>
                <div className="step-label">
                  <strong>Ready for Pickup</strong>
                  <span>Counter / Curbside</span>
                </div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="thank-you-actions-row">
              <Link to="/menu" className="btn-order-more">
                <ShoppingBag size={18} />
                <span>Back to Menu / Order More</span>
              </Link>
              
              <a
                href={storeLocation.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-directions"
              >
                <Navigation size={18} />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
