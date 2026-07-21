import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Mutha Rod',
      stars: 5,
      image: '/images/avatar_sarah.webp',
      comment: 'My go to place for seafood boils! Husband and I finally found our place after SEVERAL trips around Houston. We always get our boils with their House Special Sauce in Mild. We usually spend $100 for 3 people. I think it’s totally worth it. Staff are very nice and accommodating!',
      link: 'https://maps.app.goo.gl/gwWpZj6Yz4uH5AcY9'
    },
    {
      id: 2,
      name: 'Elisha Ybarra',
      stars: 5,
      image: '/images/avatar_david.webp',
      comment: 'Amazing service! Amazing food, the sauce was so good and our food was delivered by robot! Loved the vibe even with the WIFI being out they still invited us in with open arms with other ways to pay and that’s top tier to me! Will definitely be back 10/10',
      link: 'https://maps.app.goo.gl/JhE1fE8d3rfNm2S89'
    },
    {
      id: 3,
      name: 'Trino Sowell',
      stars: 5,
      image: '/images/avatar_william.webp',
      comment: 'This seafood was great. The flavor was everything you will be looking for. I got a seafood boil. I choose house sauce and 1 notch from the hottest. When I say it was delicious 😋 I mean it. I spoke with the owner of the restaurant as well to give him his flowers. They even have the robot 🤖 bring your food out which is really cool. This is now my number one seafood spot.',
      link: 'https://maps.app.goo.gl/pNVTx4jRgnAKmykB8'
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
                <a 
                  href={r.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="testimonial-card-content-link"
                >
                  <div className="testimonial-avatar">
                    <img src={r.image} alt={r.name} />
                  </div>
                  <p className="testimonial-text">{r.comment}</p>

                  {/* Rating stars */}
                  <div className="star-rating justify-center">
                    {[...Array(r.stars)].map((_, i) => (
                      <Star key={i} size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                    ))}
                  </div>

                  <h4 className="author-name text-center">{r.name}</h4>
                </a>
              </div>
            ))}
          </div>

          <span className="quote-mark-right">”</span>
        </div>

      </div>
    </section>
  );
}
