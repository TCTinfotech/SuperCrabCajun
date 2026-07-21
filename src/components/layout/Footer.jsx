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
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="social-red-icon" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Middle Links list */}
          <div className="footer-col links-col">
            <ul className="footer-links-list">
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Animated Crab & Shrimp */}
          <div className="footer-col seafood-graphic-col">
            <div className="seafood-scene">
              {/* Crab */}
              <div className="scene-crab">
                <svg viewBox="0 0 120 100" className="crab-svg" fill="none">
                  {/* Body */}
                  <ellipse cx="60" cy="55" rx="28" ry="22" fill="#df382b" opacity="0.9" />
                  <ellipse cx="60" cy="55" rx="22" ry="17" fill="#e8564a" />
                  {/* Eyes */}
                  <circle cx="50" cy="38" r="5" fill="#df382b" />
                  <circle cx="70" cy="38" r="5" fill="#df382b" />
                  <circle cx="50" cy="36" r="3" fill="#ffffff" />
                  <circle cx="70" cy="36" r="3" fill="#ffffff" />
                  <circle cx="51" cy="35.5" r="1.5" fill="#1a1a2e" />
                  <circle cx="71" cy="35.5" r="1.5" fill="#1a1a2e" />
                  {/* Claws */}
                  <path d="M32,50 Q18,42 12,48 Q8,52 14,56 Q20,60 32,55" fill="#df382b" stroke="#c42f24" strokeWidth="1" />
                  <path d="M14,48 Q10,44 8,48" stroke="#c42f24" strokeWidth="2" strokeLinecap="round" />
                  <path d="M88,50 Q102,42 108,48 Q112,52 106,56 Q100,60 88,55" fill="#df382b" stroke="#c42f24" strokeWidth="1" />
                  <path d="M106,48 Q110,44 112,48" stroke="#c42f24" strokeWidth="2" strokeLinecap="round" />
                  {/* Legs */}
                  <line x1="38" y1="65" x2="25" y2="78" stroke="#df382b" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="42" y1="68" x2="30" y2="82" stroke="#df382b" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="46" y1="70" x2="36" y2="85" stroke="#df382b" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="82" y1="65" x2="95" y2="78" stroke="#df382b" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="78" y1="68" x2="90" y2="82" stroke="#df382b" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="74" y1="70" x2="84" y2="85" stroke="#df382b" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Smile */}
                  <path d="M52,58 Q60,64 68,58" stroke="#c42f24" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>

              {/* Bubbles */}
              <span className="scene-bubble bubble-1"></span>
              <span className="scene-bubble bubble-2"></span>
              <span className="scene-bubble bubble-3"></span>
              <span className="scene-bubble bubble-4"></span>

              {/* Small shrimp */}
              <div className="scene-shrimp">🦐</div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Red Copyright Bar */}
      <div className="footer-copyright-strip">
        <div className="container strip-content text-center">
          <p>&copy; {currentYear} Super Crab TX. All Rights Reserved. <Link to="/sitemap">Sitemap</Link>.</p>
        </div>
      </div>
    </footer>
  );
}
