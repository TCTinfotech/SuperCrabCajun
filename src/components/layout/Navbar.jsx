import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { BRAND_NAME } from '../../utils/constants';
import { useCart } from '../../contexts/CartContext';
import CartIcon from '../cart/CartIcon';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openOrderModal } = useCart();

  // Handle transparent to dark glass transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleOrderClick = (e) => {
    e.preventDefault();
    closeMenu();
    openOrderModal('pickup');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo-container" onClick={closeMenu}>
          <img src="/logo.jpg" alt={`${BRAND_NAME} Logo`} className="navbar-logo" />
          <span className="navbar-brand-name">{BRAND_NAME}</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-desktop-nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Button */}
        <div className="navbar-actions">
          <CartIcon />

          <button
            type="button"
            className="btn-primary navbar-order-btn btn-glow"
            onClick={handleOrderClick}
          >
            <ShoppingBag size={18} />
            <span>Order Now</span>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="navbar-mobile-toggle"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`navbar-mobile-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <nav className="navbar-mobile-nav">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `navbar-mobile-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            className="btn-primary navbar-mobile-order-btn"
            onClick={handleOrderClick}
          >
            <ShoppingBag size={20} />
            <span>Order Online</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
