import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Sarah B.',
      stars: 5,
      comment: 'Had an amazing time at Red Crab! The seafood boil was flavorful, fresh, and perfectly seasoned. The staff was friendly, the atmosphere lively, and portions generous. A must-visit for seafood lovers!'
    },
    {
      id: 2,
      name: 'David S.',
      stars: 5,
      comment: 'Exceptional seafood experience at Red Crab Juicy Seafood! The flavors were outstanding, and the freshness of the seafood was top-notch. The staff was welcoming, and the lively atmosphere added to the enjoyment. Definitely a go-to spot for a delightful seafood treat!'
    },
    {
      id: 3,
      name: 'William M.',
      stars: 5,
      comment: 'Just had an incredible seafood feast at Red Crab! The flavors were on point, the staff was friendly, and the atmosphere was vibrant. Generous portions and a perfect spot for a seafood night out.'
    }
  ];

  return (
    <section className="testimonials section-padding">
      {/* Background Watermark Lobster & Net */}
      <div className="testimonials-watermark-bg">
        <span className="watermark-lobster">🦞</span>
      </div>

      <div className="container testimonials-wrapper-box">
        {/* Header */}
        <div className="testimonials-header reveal">
          <h2 className="section-title text-center">
            <span className="text-navy-title">READ WHAT OUR CUSTOMERS SAY</span>
          </h2>
          <div className="testimonials-heading-line" />
        </div>

        {/* Testimonials Grid Wrapper with decorative quote symbols */}
        <div className="testimonials-grid-container reveal">
          <span className="quote-mark-left">“</span>

          <div className="testimonials-grid">
            {reviews.map((r) => (
              <div key={r.id} className="testimonial-card">
                <p className="testimonial-text">{r.comment}</p>

                {/* Rating stars */}
                <div className="star-rating justify-center">
                  {[...Array(r.stars)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                  ))}
                </div>

                <h4 className="author-name text-center">{r.name}</h4>
              </div>
            ))}
          </div>

          <span className="quote-mark-right">”</span>
        </div>

      </div>
    </section>
  );
}
