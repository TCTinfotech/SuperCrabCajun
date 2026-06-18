import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';

// Page Imports
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import LocationsPage from './pages/LocationsPage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import OrderPage from './pages/OrderPage';

export default function App() {
  return (
    <HelmetProvider>
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
            {/* Fallback routing */}
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
