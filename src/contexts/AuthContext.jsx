import { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword } from '../utils/crypto';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'supercrab_admin_session_v2';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours session validity

// Configurable Admin Credentials (SHA-256 Hashed with Salt)
const ADMIN_USERNAME = (import.meta.env.VITE_ADMIN_USERNAME || 'supercrab_admin_master').trim().toLowerCase();
const ADMIN_PASSWORD_HASH = (import.meta.env.VITE_ADMIN_PASSWORD_HASH || '1edc5e02708f0e17913bb7cef1b08ea037a8589bd23a2c20a3219a1f858a347a').trim();
const ADMIN_SALT = import.meta.env.VITE_ADMIN_SALT || 'supercrab_salt_2026_tx_cajun';

export function AuthProvider({ children }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!saved) return false;
      const parsed = JSON.parse(saved);
      // Check session validity & expiration
      if (parsed && parsed.isAuthenticated === true && parsed.loggedInAt) {
        const isExpired = Date.now() - parsed.loggedInAt > SESSION_TTL_MS;
        if (!isExpired) {
          return true;
        }
      }
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return false;
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (parsed && parsed.isAuthenticated && parsed.loggedInAt && Date.now() - parsed.loggedInAt <= SESSION_TTL_MS) {
        return parsed.user || null;
      }
      return null;
    } catch {
      return null;
    }
  });

  // Auto-expire session timer
  useEffect(() => {
    if (!isAdminAuthenticated) return;

    const interval = setInterval(() => {
      try {
        const saved = localStorage.getItem(AUTH_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.loggedInAt && Date.now() - parsed.loggedInAt > SESSION_TTL_MS) {
            logoutAdmin();
          }
        }
      } catch {
        // Ignore storage read errors
      }
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, [isAdminAuthenticated]);

  const loginAdmin = async (username, password) => {
    if (!username || !password) {
      return { success: false, message: 'Please enter both username and password' };
    }

    try {
      const normalizedUser = username.trim().toLowerCase();
      const inputHash = await hashPassword(password, ADMIN_SALT);

      const isValidUser = normalizedUser === ADMIN_USERNAME || normalizedUser === `${ADMIN_USERNAME}@supercrabtx.com`;
      const isValidPassword = inputHash === ADMIN_PASSWORD_HASH;

      if (isValidUser && isValidPassword) {
        const user = {
          username: ADMIN_USERNAME,
          name: 'Super Crab Master Admin',
          role: 'administrator'
        };
        const sessionData = {
          isAuthenticated: true,
          user,
          loggedInAt: Date.now()
        };

        setIsAdminAuthenticated(true);
        setAdminUser(user);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
        return { success: true };
      }

      return { success: false, message: 'Invalid username or password' };
    } catch (err) {
      console.error('Authentication error:', err);
      return { success: false, message: 'An authentication error occurred. Please try again.' };
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem('supercrab_admin_session'); // remove old legacy key if present
    } catch {
      // Ignore storage remove errors
    }
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
