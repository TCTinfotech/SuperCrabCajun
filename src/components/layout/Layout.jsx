import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';
import OrderModal from '../cart/OrderModal';
import CartToastNotification from '../cart/CartToastNotification';

export default function Layout() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAdminRoute && <Navbar />}
      <main style={{ flex: 1, marginTop: isAdminRoute ? 0 : 'var(--header-height)' }}>
        <Outlet />
      </main>
      {!isAdminRoute && <Footer />}
      <CartDrawer />
      <OrderModal />
      <CartToastNotification />
    </div>
  );
}
