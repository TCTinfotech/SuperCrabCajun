import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import './CartHoverDropdown.css';

export default function CartHoverDropdown({ isHovered, setIsHovered, onMouseEnter, onMouseLeave }) {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    updateQty,
    removeFromCart,
    closeCart
  } = useCart();

  const navigate = useNavigate();

  if (!isHovered || cartCount === 0) return null;

  const handleContinueToCart = () => {
    setIsHovered(false);
    closeCart();
    navigate('/cart');
  };

  return (
    <div
      className="cart-hover-dropdown"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="cart-hover-card">
        {/* Title */}
        <h3 className="cart-hover-title">Your cart ({cartCount})</h3>

        {/* Items List */}
        <div className="cart-hover-items-list">
          {cartItems.map((item) => (
            <div key={item.cartItemId} className="cart-hover-item-row">
              <div className="hover-item-left">
                {item.image && (
                  <img src={item.image} alt={item.name} className="hover-item-img" />
                )}
              </div>

              <div className="hover-item-middle">
                <div className="hover-item-name-row">
                  <span className="hover-item-name">{item.name.toUpperCase()}</span>
                  <span className="hover-item-price">${(item.price * item.qty).toFixed(2)}</span>
                </div>

                {/* Option Breakdown */}
                {item.seasoning && (
                  <div className="hover-opt-block">
                    <span className="hover-opt-label">SAUCE</span>
                    <span className="hover-opt-val">{item.seasoning.toUpperCase()}</span>
                  </div>
                )}

                {item.spiceLevel && (
                  <div className="hover-opt-block">
                    <span className="hover-opt-label">SPICY LEVEL</span>
                    <span className="hover-opt-val">{item.spiceLevel.toUpperCase()}</span>
                  </div>
                )}

                {/* Quantity Controls */}
                <div className="hover-qty-row">
                  <div className="hover-qty-box">
                    <button
                      type="button"
                      className="hover-qty-btn"
                      onClick={() => updateQty(item.cartItemId, item.qty - 1)}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="hover-qty-num">{item.qty}</span>
                    <button
                      type="button"
                      className="hover-qty-btn"
                      onClick={() => updateQty(item.cartItemId, item.qty + 1)}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="hover-remove-btn"
                    onClick={() => removeFromCart(item.cartItemId)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Action Button */}
        <button
          type="button"
          className="btn-continue-to-cart"
          onClick={handleContinueToCart}
        >
          Continue to cart ${cartSubtotal.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
