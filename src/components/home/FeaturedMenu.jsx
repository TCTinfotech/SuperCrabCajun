import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useMenu } from '../../contexts/MenuContext';
import './FeaturedMenu.css';

export default function FeaturedMenu() {
  const { openOrderModal } = useCart();
  const { categories: menuCategories } = useMenu();

  const categories = menuCategories.map((c) => ({
    id: c.id,
    name: c.name,
    image: c.listImages && c.listImages.length > 0 ? c.listImages[0] : '/images/seafood_boil_close.webp'
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
