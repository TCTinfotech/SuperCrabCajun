import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'supercrab_admin_session';

export function AuthProvider({ children }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved).isAuthenticated === true : false;
    } catch (e) {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved).user : null;
    } catch (e) {
      return null;
    }
  });

  const loginAdmin = (username, password) => {
    // Default admin credentials: admin / admin123
    if (
      (username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'admin@supercrab.com') &&
      password === 'admin123'
    ) {
      const user = { username: 'admin', name: 'Super Crab Manager', role: 'administrator' };
      setIsAdminAuthenticated(true);
      setAdminUser(user);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ isAuthenticated: true, user }));
      return { success: true };
    } else {
      return { success: false, message: 'Invalid Admin Username or Password. (Default: admin / admin123)' };
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminAuthenticated,
        adminUser,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
