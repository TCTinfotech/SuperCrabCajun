import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { MenuProvider } from './contexts/MenuContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/layout/Layout';

// Page Imports
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import LocationsPage from './pages/LocationsPage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import OrderPage from './pages/OrderPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';
import CartPage from './pages/CartPage';

// Admin Page Imports
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <MenuProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                {/* Main layout routing */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="menu" element={<MenuPage />} />
                  <Route path="locations" element={<LocationsPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="events" element={<EventsPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="order" element={<OrderPage />} />
                  <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="thank-you" element={<ThankYouPage />} />
                  <Route path="admin/login" element={<AdminLoginPage />} />
                  <Route path="admin" element={<AdminDashboardPage />} />
                  {/* Fallback routing */}
                  <Route path="*" element={<HomePage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </MenuProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
