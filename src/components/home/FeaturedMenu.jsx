import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedMenu.css';

export default function FeaturedMenu() {
  const categories = [
    { id: 'seafood-boil', name: 'Seafood Boils', image: '/images/seafood_boil_close.webp' },
    { id: 'appetizers', name: 'Appetizers', image: '/images/oysters_platter.webp' },
    { id: 'fried-baskets', name: 'Something Fried', image: '/images/fried_shrimp_basket.webp' },
    { id: 'po-boys', name: 'Po Boys', image: '/images/seafood_tray.webp' },
    { id: 'sides', name: 'Sides', image: '/images/crawfish_close.webp' },
    { id: 'dessert', name: 'Dessert', image: '/images/cooked_crab.webp' }
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
                />
              </div>

              <div className="card-body">
                <h3 className="card-title text-center">{cat.name}</h3>
                <div className="card-footer-row justify-center">
                  <Link to={`/menu?cat=${cat.id}`} className="btn-card-order-outline">
                    <span>Order Now</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
