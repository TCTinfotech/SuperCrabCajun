import { Heart, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../../utils/constants';
import './InstagramFeed.css';

export default function InstagramFeed() {
  // Mock posts data
  const feedPosts = [
    { id: 1, img: '/images/crawfish_pile.webp', likes: '1.2k', comments: '84', link: SOCIAL_LINKS.instagram },
    { id: 2, img: '/images/oysters_platter.webp', likes: '948', comments: '53', link: SOCIAL_LINKS.facebook },
    { id: 3, img: '/images/chicken_wings.webp', likes: '1.5k', comments: '120', link: SOCIAL_LINKS.tiktok },
    { id: 4, img: '/images/cooked_crab.webp', likes: '870', comments: '41', link: SOCIAL_LINKS.instagram },
    { id: 5, img: '/images/shrimp_boil.webp', likes: '1.1k', comments: '78', link: SOCIAL_LINKS.facebook },
    { id: 6, img: '/images/crab_legs.webp', likes: '2.1k', comments: '194', link: SOCIAL_LINKS.tiktok }
  ];

  return (
    <section className="instagram-feed section-padding">
      <div className="container">
        
        {/* Header */}
        <div className="instagram-header reveal">
          <h2 className="section-title">
            <span className="subtitle">Social Feed</span>
            <span className="text-gradient d-block">FOLLOW US ON SOCIAL MEDIA</span>
          </h2>

          <div className="social-handles-row">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="social-handle-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="social-mini-icon"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03.3-1.5 1.5-1.5H18V2.08A24.5 24.5 0 0 0 15.45 2C12.9 2 11 3.5 11 6.5v3H8v4h3v8h3v-8z" /></svg>
              <span>Super Crab</span>
            </a>
            <span className="social-separator">•</span>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="social-handle-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="social-mini-icon"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <span>@supercrabtx</span>
            </a>
            <span className="social-separator">•</span>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="social-handle-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="social-mini-icon"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/></svg>
              <span>@supercrabtx</span>
            </a>
          </div>
        </div>

        {/* Feed Grid */}
        <div className="insta-grid">
          {feedPosts.map((post, idx) => (
            <a 
              key={post.id} 
              href={post.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`insta-card reveal reveal-delay-${idx % 3 + 1}`}
            >
              <img 
                src={post.img} 
                alt="Super Crab TX Instagram post" 
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
