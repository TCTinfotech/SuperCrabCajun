import React from 'react';
import { Star, ThumbsUp, Share2, ExternalLink, MoreVertical } from 'lucide-react';
import './Testimonials.css';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Mutha Rod',
      initial: 'M',
      bgColor: '#e91e63',
      localGuide: true,
      reviewsCount: '12 reviews',
      timeAgo: '2 months ago',
      stars: 5,
      comment: 'My go to place for seafood boils! Husband and I finally found our place after SEVERAL trips around Houston. We always get our boils with their House Special Sauce in Mild. We usually spend $100 for 3 people. I think it’s totally worth it. Staff are very nice and accommodating!',
      dineType: 'Dine-in',
      priceRange: '$90–100',
      foodRating: 5,
      serviceRating: 5,
      atmosphereRating: 4,
      photos: [
        '/images/seafood_boil_close.webp',
        '/images/crab_legs.webp'
      ],
      likes: 14,
      link: 'https://maps.app.goo.gl/gwWpZj6Yz4uH5AcY9'
    },
    {
      id: 2,
      name: 'Elisha Ybarra',
      initial: 'E',
      bgColor: '#009688',
      localGuide: true,
      reviewsCount: '8 reviews',
      timeAgo: '3 months ago',
      stars: 5,
      comment: 'Amazing service! Amazing food, the sauce was so good and our food was delivered by robot! Loved the vibe even with the WIFI being out they still invited us in with open arms with other ways to pay and that’s top tier to me! Will definitely be back 10/10',
      dineType: 'Dine-in',
      priceRange: '$30–50',
      foodRating: 5,
      serviceRating: 5,
      atmosphereRating: 5,
      photos: [
        '/images/shrimp_boil.webp',
        '/images/crawfish_pile.webp'
      ],
      likes: 9,
      link: 'https://maps.app.goo.gl/JhE1fE8d3rfNm2S89'
    },
    {
      id: 3,
      name: 'Trino Sowell',
      initial: 'T',
      bgColor: '#ff9800',
      localGuide: true,
      reviewsCount: '24 reviews',
      timeAgo: '1 month ago',
      stars: 5,
      comment: 'This seafood was great. The flavor was everything you will be looking for. I got a seafood boil. I choose house sauce and 1 notch from the hottest. When I say it was delicious 😋 I mean it. I spoke with the owner of the restaurant as well to give him his flowers. They even have the robot 🤖 bring your food out which is really cool. This is now my number one seafood spot.',
      dineType: 'Dine-in',
      priceRange: '$50–70',
      foodRating: 5,
      serviceRating: 5,
      atmosphereRating: 5,
      photos: [
        '/images/lobster_crab_seafood_feast_new_1.webp',
        '/images/oysters_platter.webp'
      ],
      likes: 18,
      link: 'https://maps.app.goo.gl/pNVTx4jRgnAKmykB8'
    }
  ];

  return (
    <section className="testimonials section-padding">
      <div className="container">
        
        {/* Google Reviews Widget Header */}
        <div className="google-reviews-header reveal">
          <div className="google-badge-pill">
            <svg viewBox="0 0 24 24" width="22" height="22" className="google-g-logo">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span className="badge-text">VERIFIED GOOGLE MAPS REVIEWS</span>
          </div>

          <h2 className="section-title text-center">
            <span className="text-gradient d-block">WHAT OUR GUESTS ARE SAYING</span>
          </h2>

          <div className="google-rating-summary">
            <span className="rating-score">4.9</span>
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#f4b400" color="#f4b400" />
              ))}
            </div>
            <span className="reviews-count">Based on 200+ Verified Google Reviews</span>
          </div>
        </div>

        {/* Google Review Cards Grid */}
        <div className="google-reviews-grid">
          {reviews.map((r, idx) => (
            <article key={r.id} className={`google-review-card reveal reveal-delay-${idx + 1}`}>
              
              {/* Card Header: User Avatar & Name */}
              <div className="g-card-header">
                <div className="g-avatar-wrapper">
                  <div className="g-avatar-circle" style={{ backgroundColor: r.bgColor }}>
                    {r.initial}
                  </div>
                  {r.localGuide && (
                    <div className="g-local-guide-star" title="Local Guide">
                      <Star size={9} fill="#ffffff" color="#ffffff" />
                    </div>
                  )}
                </div>

                <div className="g-user-info">
                  <h3 className="g-user-name">{r.name}</h3>
                  <p className="g-user-sub">
                    {r.localGuide && <span className="guide-label">Local Guide • </span>}
                    {r.timeAgo}
                  </p>
                </div>

                <div className="g-menu-dots">
                  <MoreVertical size={18} />
                </div>
              </div>

              {/* Card Rating Stars */}
              <div className="g-card-stars">
                {[...Array(r.stars)].map((_, i) => (
                  <Star key={i} size={16} fill="#f4b400" color="#f4b400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="g-review-text">"{r.comment}"</p>

              {/* Service & Dining Details */}
              <div className="g-details-box">
                <div className="g-detail-row">
                  <span className="detail-tag">{r.dineType}</span>
                  <span className="detail-bullet">•</span>
                  <span className="detail-tag">Price: {r.priceRange}</span>
                </div>
                <div className="g-ratings-pills">
                  <span>Food: <strong>{r.foodRating}/5</strong></span>
                  <span>Service: <strong>{r.serviceRating}/5</strong></span>
                  <span>Atmosphere: <strong>{r.atmosphereRating}/5</strong></span>
                </div>
              </div>

              {/* Customer Uploaded Photos */}
              {r.photos && r.photos.length > 0 && (
                <div className="g-photos-grid">
                  {r.photos.map((photo, pIdx) => (
                    <div key={pIdx} className="g-photo-item">
                      <img src={photo} alt={`${r.name}'s customer photo`} loading="lazy" />
                    </div>
                  ))}
                </div>
              )}

              {/* Card Footer Actions */}
              <div className="g-card-footer">
                <div className="g-actions-left">
                  <span className="g-like-btn">
                    <ThumbsUp size={14} />
                    <span>Helpful ({r.likes})</span>
                  </span>
                  <span className="g-share-btn">
                    <Share2 size={14} />
                    <span>Share</span>
                  </span>
                </div>

                <a 
                  href={r.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="g-link-external"
                  title="View original review on Google Maps"
                >
                  <span>Google Maps</span>
                  <ExternalLink size={13} />
                </a>
              </div>

            </article>
          ))}
        </div>

        {/* Bottom CTA to view all reviews on Google */}
        <div className="google-reviews-cta text-center reveal">
          <a 
            href="https://maps.app.goo.gl/UXPcgSUC53jjE1kH7" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-google-maps btn-glow"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" className="google-g-logo">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>See All 200+ Reviews On Google Maps</span>
          </a>
        </div>

      </div>
    </section>
  );
}
