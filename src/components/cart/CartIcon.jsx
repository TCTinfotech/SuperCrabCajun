import React, { useState, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import CartHoverDropdown from './CartHoverDropdown';
import './CartIcon.css';

export default function CartIcon() {
  const { cartCount, toggleCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimerRef = useRef(null);

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 250); // 250ms grace period prevents flicker when moving to button
  };

  return (
    <div
      className="cart-icon-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        type="button"
        className="cart-icon-button" 
        onClick={toggleCart}
        aria-label={`Shopping Cart with ${cartCount} items`}
      >
        <ShoppingBag size={20} />
        {cartCount > 0 && (
          <span className="cart-badge animate-scale-up">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </button>

      <CartHoverDropdown
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
