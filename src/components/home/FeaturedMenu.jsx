import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useMenu } from '../../contexts/MenuContext';
import './FeaturedMenu.css';

export default function FeaturedMenu() {
  const { openOrderModal } = useCart();
  const { categories: menuCategories } = useMenu();

  const getCategoryImage = (c) => {
    if (Array.isArray(c.listImages) && c.listImages.length > 0 && typeof c.listImages[0] === 'string' && c.listImages[0].trim()) {
      return c.listImages[0].trim();
    }
    if (typeof c.listImages === 'string' && c.listImages.trim()) {
      const parts = c.listImages.split(',').map((s) => s.trim()).filter(Boolean);
      if (parts.length > 0) return parts[0];
    }
    if (c.image && typeof c.image === 'string' && c.image.trim()) {
      return c.image.trim();
    }
    return '/images/seafood_boil_close.webp';
  };

  const categories = menuCategories.map((c) => ({
    id: c.id,
    name: c.name,
    image: getCategoryImage(c)
  }));

  return (
    <section className="featured-menu section-padding">
      <div className="container">
        {/* Grid List */}
        <div className="featured-grid">
          {categories.map((cat, idx) => (
            <article
              key={cat.id}
              className={`featured-card reveal reveal-delay-${idx % 3 + 1}`}
            >
              <div className="card-image-circle-container">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="card-circle-image"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/seafood_boil_close.webp';
                  }}
                />
              </div>

              <div className="card-body">
                <h3 className="card-title text-center">{cat.name}</h3>
                <div className="card-footer-row justify-center">
                  <button 
                    type="button"
                    className="btn-card-order-outline"
                    onClick={() => openOrderModal('pickup')}
                  >
                    <span>Order Now</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
