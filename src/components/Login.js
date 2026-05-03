import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSiteSettings, usePageConfig } from '../lib/cms';

const GearIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const { settings } = useSiteSettings();
  const { config } = usePageConfig('login');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate(result.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await googleLogin();
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: 'black',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      padding: '0'
    }}>
      {/* Engine image as background */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${config.backgroundImageUrl})`,
        backgroundSize: '110%',
        backgroundPosition: 'center left',
        opacity: 0.6,
        zIndex: 0
      }} />

      {/* White container on left */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '700px',
        minHeight: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '0',
        padding: '100px',
        marginLeft: '0px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '48px'
          }}>
            <img className="logo-spin"
              src={settings.logoUrl}
              alt={`${settings.siteTitle} Logo`}
              style={{
                width: '100px',
                height: '100px',
                marginRight: '-10px',
                objectFit: 'contain'
              }}
            />
            <span style={{
              fontSize: '3rem',
              color: '#ffffff',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              {settings.siteTitle}
            </span>
          </div>

          {error && (
            <div style={{
              backgroundColor: 'rgba(220, 38, 38, 0.2)',
              border: '1px solid rgba(220, 38, 38, 0.5)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span style={{ color: '#ef4444', fontSize: '1rem' }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.1rem',
                marginBottom: '12px',
                fontFamily: 'Arial, Helvetica, sans-serif',
                letterSpacing: '0.5px'
              }}>
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '1.1rem',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
              />
            </div>

            <div style={{ marginBottom: '40px' }}>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.1rem',
                marginBottom: '12px',
                fontFamily: 'Arial, Helvetica, sans-serif',
                letterSpacing: '0.5px'
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '1.1rem',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '18px',
                backgroundColor: '#ffffff',
                color: '#000000',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.2rem',
                fontWeight: '600',
                fontFamily: 'Arial, Helvetica, sans-serif',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '1px',
                marginBottom: '32px'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#000000';
                  e.target.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.color = '#000000';
                }
              }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '32px 0'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
            <span style={{ padding: '0 16px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '1rem', fontFamily: 'Times New Roman, serif' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading || loading}
            style={{
              width: '100%',
              padding: '16px 18px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '500',
              fontFamily: 'Arial, Helvetica, sans-serif',
              cursor: (googleLoading || loading) ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '32px'
            }}
            onMouseEnter={(e) => {
              if (!googleLoading && !loading) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <GoogleIcon />
            {googleLoading ? 'Redirecting…' : 'Continue with Google'}
          </button>

          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.1rem',
            fontFamily: 'Arial, Helvetica, sans-serif',
            textAlign: 'center'
          }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#ffffff', textDecoration: 'underline', fontWeight: '600' }}>
              Create one
            </Link>
          </p>
        </div>
    </div>
  );
};

export default Login;
