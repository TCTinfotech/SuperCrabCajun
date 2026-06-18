import React from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '../../utils/constants';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top Wavy Wave Divider */}
      <div className="footer-wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="wave-svg">
          <path d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1250,80 1200,60 L1200,120 L0,120 Z" fill="var(--color-bg-navy)" />
        </svg>
      </div>

      <div className="container footer-content-wrapper">
        <div className="footer-columns-grid">

          {/* Column 1: Crave The Boil Brand Segment */}
          <div className="footer-col brand-crave-col">
            {/* Floating food icons decor */}
            <div className="footer-brand-decor">
              <span className="decor-shrimp">🦐</span>
              <span className="decor-lemon">🍋</span>
              <span className="decor-shrimp-2">🦐</span>
            </div>

            <div className="crave-boil-logo">
              <span className="crave-text">CRAVE THE</span>
              <span className="boil-text">BOIL</span>
            </div>

            <div className="footer-socials-red">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="social-red-icon" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03.3-1.5 1.5-1.5H18V2.08A24.5 24.5 0 0 0 15.45 2C12.9 2 11 3.5 11 6.5v3H8v4h3v8h3v-8z" /></svg>
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="social-red-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href={SOCIAL_LINKS.youtube || "https://youtube.com"} target="_blank" rel="noopener noreferrer" className="social-red-icon" aria-label="Youtube">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.021 0 12 0 12s0 3.979.502 5.837a3.001 3.001 0 0 0 2.11 2.107C4.495 20.455 12 20.455 12 20.455s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107C24 15.979 24 12 24 12s0-3.979-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2 & 3: Middle Links list */}
          <div className="footer-col links-col-1">
            <ul className="footer-links-list">
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/locations">Locations</Link></li>
            </ul>
          </div>

          <div className="footer-col links-col-2">
            <ul className="footer-links-list">
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Anchor Graphic */}
          <div className="footer-col anchor-graphic-col">
            <div className="anchor-graphic-wrapper">
              {/* White Anchor SVG vector */}
              <svg viewBox="0 0 100 100" className="anchor-svg" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Ring */}
                <circle cx="50" cy="18" r="7" />
                {/* Vertical shaft */}
                <line x1="50" y1="25" x2="50" y2="75" />
                {/* Crossbar */}
                <line x1="32" y1="38" x2="68" y2="38" />
                {/* Curved arms */}
                <path d="M20,60 C25,85 75,85 80,60" />
                {/* Left/Right points */}
                <path d="M15,62 L20,60 L25,65" />
                <path d="M85,62 L80,60 L75,65" />
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Red Copyright Bar */}
      <div className="footer-copyright-strip">
        <div className="container strip-content text-center">
          <p>&copy; {currentYear} Red Crab Juicy Seafood. All Rights Reserved. <Link to="/privacy">Privacy Policy</Link>. <Link to="/sitemap">Sitemap</Link>.</p>
        </div>
      </div>
    </footer>
  );
}
