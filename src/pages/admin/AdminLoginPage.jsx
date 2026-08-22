import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SEOHead from '../../components/layout/SEOHead';
import './AdminLoginPage.css';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_SEC = 60;
const LOCKOUT_STORAGE_KEY = 'supercrab_login_lockout';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Rate Limiting / Lockout State
  const [failedAttempts, setFailedAttempts] = useState(() => {
    try {
      const stored = sessionStorage.getItem(LOCKOUT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.attempts || 0;
      }
    } catch {
      // Ignore storage errors
    }
    return 0;
  });

  const [lockoutRemaining, setLockoutRemaining] = useState(() => {
    try {
      const stored = sessionStorage.getItem(LOCKOUT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.lockedUntil) {
          const diff = Math.ceil((parsed.lockedUntil - Date.now()) / 1000);
          return diff > 0 ? diff : 0;
        }
      }
    } catch {
      // Ignore storage errors
    }
    return 0;
  });

  const { loginAdmin, isAdminAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Destination after successful login
  const from = location.state?.from?.pathname || '/admin';

  // If already logged in, redirect to target or admin dashboard
  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAdminAuthenticated, navigate, from]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemaining <= 0) return;

    const timer = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          try {
            sessionStorage.removeItem(LOCKOUT_STORAGE_KEY);
          } catch {
            // Ignore storage errors
          }
          setFailedAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutRemaining]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;

    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await loginAdmin(username, password);
      setIsLoading(false);

      if (res.success) {
        try {
          sessionStorage.removeItem(LOCKOUT_STORAGE_KEY);
        } catch {
          // Ignore storage errors
        }
        navigate(from, { replace: true });
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);

        if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
          const lockedUntil = Date.now() + LOCKOUT_DURATION_SEC * 1000;
          try {
            sessionStorage.setItem(
              LOCKOUT_STORAGE_KEY,
              JSON.stringify({ attempts: nextAttempts, lockedUntil })
            );
          } catch {
            // Ignore storage errors
          }
          setLockoutRemaining(LOCKOUT_DURATION_SEC);
          setErrorMessage(`Too many failed attempts. Login locked for ${LOCKOUT_DURATION_SEC} seconds.`);
        } else {
          try {
            sessionStorage.setItem(
              LOCKOUT_STORAGE_KEY,
              JSON.stringify({ attempts: nextAttempts, lockedUntil: null })
            );
          } catch {
            // Ignore storage errors
          }
          const remainingTries = MAX_FAILED_ATTEMPTS - nextAttempts;
          setErrorMessage(
            `${res.message || 'Invalid username or password.'} (${remainingTries} attempt${remainingTries > 1 ? 's' : ''} left)`
          );
        }
      }
    } catch {
      setIsLoading(false);
      setErrorMessage('An unexpected error occurred during authentication.');
    }
  };

  const isLocked = lockoutRemaining > 0;

  return (
    <div className="admin-login-page">
      <SEOHead
        title="Admin Portal Login"
        description="Secure Super Crab Management Access Portal"
        canonicalUrl="/admin/login"
      />

      <div className="admin-login-container animate-fade-in">
        {/* Top Header */}
        <div className="admin-login-header">
          <img src="/logo.jpg" alt="Super Crab Logo" className="admin-brand-logo" />
          <h1 className="admin-login-title">SUPER CRAB ADMIN</h1>
          <p className="admin-login-subtitle">Secure Management & POS Portal</p>
        </div>

        {/* Lockout Warning Banner */}
        {isLocked && (
          <div className="admin-lockout-banner animate-shake">
            <AlertTriangle size={18} />
            <span>
              Security Lockout Active: Please wait <strong>{lockoutRemaining}s</strong> before trying again.
            </span>
          </div>
        )}

        {/* Error Banner */}
        {!isLocked && errorMessage && (
          <div className="admin-error-banner animate-shake">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="admin-username">
              <User size={16} /> Username or Access Key
            </label>
            <input
              id="admin-username"
              type="text"
              className="admin-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter administrator username"
              autoComplete="username"
              disabled={isLocked || isLoading}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">
              <Lock size={16} /> Password
            </label>
            <div className="password-input-wrapper">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                disabled={isLocked || isLoading}
                required
              />
              <button
                type="button"
                className="btn-toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full btn-admin-submit btn-glow"
            disabled={isLoading || isLocked || !username.trim() || !password}
          >
            <ShieldCheck size={18} />
            <span>
              {isLoading
                ? 'Verifying Credentials...'
                : isLocked
                ? `Locked (${lockoutRemaining}s)`
                : 'Secure Sign In'}
            </span>
          </button>
        </form>

        <div className="admin-login-footer-note">
          <span>Protected Area • Authorized Super Crab Staff Only</span>
        </div>
      </div>
    </div>
  );
}
