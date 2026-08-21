import React, { useState } from 'react';
import { X, Check, Flame, Plus, Minus } from 'lucide-react';
import { BOIL_STEPS } from '../../utils/constants';
import './BoilCustomizer.css';

export default function BoilCustomizer({ item, isOpen, onClose, onConfirm }) {
  const [selectedSeasoning, setSelectedSeasoning] = useState(
    BOIL_STEPS.step2.options[0]?.name || 'Original Cajun'
  );

  const [selectedSpice, setSelectedSpice] = useState(
    BOIL_STEPS.step3.options[2]?.name || 'Mild' // Default Mild
  );

  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !item) return null;

  const handleAddToCart = () => {
    onConfirm(item, {
      seasoning: selectedSeasoning,
      spiceLevel: selectedSpice,
      qty: quantity
    });
    onClose();
  };

  const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
  const totalPrice = itemPrice * quantity;

  return (
    <div className="customizer-overlay" onClick={onClose}>
      <div className="customizer-modal glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="customizer-header">
          <div>
            <span className="customizer-subtitle">CUSTOMIZE YOUR BOIL</span>
            <h2 className="customizer-title">{item.name}</h2>
          </div>
          <button type="button" className="customizer-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="customizer-body">
          {/* Item Preview */}
          <div className="customizer-item-preview">
            {item.image && <img src={item.image} alt={item.name} className="preview-img" />}
            <div>
              <p className="preview-desc">{item.description}</p>
              <div className="preview-price">${itemPrice.toFixed(2)}</div>
            </div>
          </div>

          {/* Step 1: Seasoning Selection */}
          <div className="customizer-section">
            <h3 className="section-title">
              <span className="step-num">1</span> CHOOSE YOUR SEASONING
            </h3>
            <div className="options-grid">
              {BOIL_STEPS.step2.options.map((opt) => {
                const isSelected = selectedSeasoning === opt.name;
                return (
                  <button
                    key={opt.name}
                    type="button"
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedSeasoning(opt.name)}
                  >
                    <div className="option-card-header">
                      <span className="option-name">{opt.name}</span>
                      {isSelected && <Check size={16} className="check-icon" />}
                    </div>
                    <span className="option-desc">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Spice Level Selection */}
          <div className="customizer-section">
            <h3 className="section-title">
              <span className="step-num">2</span> SELECT YOUR SPICE LEVEL
            </h3>
            <div className="options-grid spice-grid">
              {BOIL_STEPS.step3.options.map((opt) => {
                const isSelected = selectedSpice === opt.name;
                return (
                  <button
                    key={opt.name}
                    type="button"
                    className={`option-card spice-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedSpice(opt.name)}
                  >
                    <div className="option-card-header">
                      <span className="option-name">{opt.name}</span>
                      {isSelected && <Check size={16} className="check-icon" />}
                    </div>
                    <div className="spice-chilis-indicator">
                      {opt.spice > 0 ? (
                        Array.from({ length: opt.spice }).map((_, i) => (
                          <Flame key={i} size={14} className="flame-icon" />
                        ))
                      ) : (
                        <span className="no-spice">No Heat</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="customizer-section qty-section">
            <h3 className="section-title">QUANTITY</h3>
            <div className="customizer-qty-controls">
              <button
                type="button"
                className="qty-adjust-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={18} />
              </button>
              <span className="qty-display">{quantity}</span>
              <button
                type="button"
                className="qty-adjust-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="customizer-footer">
          <div className="footer-total">
            <span>Total:</span>
            <span className="footer-total-price">${totalPrice.toFixed(2)}</span>
          </div>
          <button type="button" className="btn-primary btn-add-customized btn-glow" onClick={handleAddToCart}>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
