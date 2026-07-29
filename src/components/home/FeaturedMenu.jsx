import React from 'react';
import { DOORDASH_ORDER_URL } from '../../utils/constants';
import './FeaturedMenu.css';

export default function FeaturedMenu() {
  const categories = [
    { id: 'seafood-boil', name: 'Seafood Boils', image: '/images/seafood_boil_close.webp' },
    { id: 'appetizers', name: 'Appetizers', image: '/images/oysters_platter.webp' },
    { id: 'fried-baskets', name: 'Fried Basket', image: '/images/fried_shrimp_basket.webp' },
    { id: 'salad-soups', name: 'Salad & Soups', image: '/images/green_salad.webp' },
    { id: 'combos', name: 'Combos', image: '/images/combo_1.webp' },
    { id: 'sides', name: 'Sides & Add-ons', image: '/images/crawfish_close.webp' },
    { id: 'drinks-soda', name: 'Drinks', image: '/images/lemonade.webp' }
  ];

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
                  <a 
                    href={DOORDASH_ORDER_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-card-order-outline"
                  >
                    <span>Order Now</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
