import { Heart, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../../utils/constants';
import './InstagramFeed.css';

export default function InstagramFeed() {
  // Mock posts data
  const feedPosts = [
    { id: 1, img: '/images/crawfish_pile.jpg', likes: '1.2k', comments: '84' },
    { id: 2, img: '/images/oysters_platter.jpg', likes: '948', comments: '53' },
    { id: 3, img: '/images/chicken_wings.jpg', likes: '1.5k', comments: '120' },
    { id: 4, img: '/images/cooked_crab.jpg', likes: '870', comments: '41' },
    { id: 5, img: '/images/shrimp_boil.jpg', likes: '1.1k', comments: '78' },
    { id: 6, img: '/images/crab_legs.jpg', likes: '2.1k', comments: '194' }
  ];

  return (
    <section className="instagram-feed section-padding">
      <div className="container">
        
        {/* Header */}
        <div className="instagram-header reveal">
          <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="insta-icon"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          <h2 className="section-title">
            <span className="subtitle">Social Feed</span>
            <span className="text-gradient d-block">FOLLOW US ON INSTAGRAM</span>
          </h2>
          <a 
            href={SOCIAL_LINKS.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="insta-handle-btn btn-glow"
          >
            @supercrabtx
          </a>
        </div>

        {/* Feed Grid */}
        <div className="insta-grid">
          {feedPosts.map((post, idx) => (
            <a 
              key={post.id} 
              href={SOCIAL_LINKS.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`insta-card reveal reveal-delay-${idx % 3 + 1}`}
            >
              <img 
                src={post.img} 
                alt="SuperCrab TX Instagram post" 
                className="insta-img"
                loading="lazy"
              />
              <div className="insta-overlay">
                <div className="insta-overlay-stats">
                  <div className="stat-item">
                    <Heart size={20} fill="#ffffff" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="stat-item">
                    <MessageCircle size={20} fill="#ffffff" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
