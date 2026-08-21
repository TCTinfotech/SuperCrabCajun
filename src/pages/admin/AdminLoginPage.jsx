import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SEOHead from '../../components/layout/SEOHead';
import './AdminLoginPage.css';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { loginAdmin, isAdminAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to admin dashboard
  React.useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(username, password);
      setIsLoading(false);

      if (res.success) {
        navigate('/admin');
      } else {
        setErrorMessage(res.message);
      }
    }, 400);
  };

  return (
    <div className="admin-login-page">
      <SEOHead title="Admin Login" description="Super Crab Manager Login Portal" canonicalUrl="/admin/login" />

      <div className="admin-login-container animate-fade-in">
        {/* Top Header */}
        <div className="admin-login-header">
          <img src="/logo.jpg" alt="Super Crab Logo" className="admin-brand-logo" />
          <h1 className="admin-login-title">SUPER CRAB ADMIN</h1>
          <p className="admin-login-subtitle">Menu & Price Configuration System</p>
        </div>

        {/* Credentials Info Box */}
        <div className="demo-credentials-box">
          <div className="credentials-icon">
            <KeyRound size={18} />
          </div>
          <div>
            <span className="demo-label">DEFAULT ADMIN CREDENTIALS:</span>
            <div className="demo-fields">
              <span>Username: <strong>admin</strong></span>
              <span>•</span>
              <span>Password: <strong>admin123</strong></span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          {errorMessage && (
            <div className="admin-error-banner animate-shake">
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              <User size={16} /> Username or Email
            </label>
            <input
              type="text"
              className="admin-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={16} /> Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="btn-toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full btn-admin-submit btn-glow"
            disabled={isLoading}
          >
            <ShieldCheck size={18} />
            <span>{isLoading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
