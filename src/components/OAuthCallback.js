import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import supabase from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { refreshUser } = useAuth();

  useEffect(() => {
    let cancelled = false;

    const finishOAuth = async () => {
      try {
        // Wait briefly for Supabase to parse the URL hash and set a session
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !data.session) {
          if (!cancelled) 
            setError('No session found. Please try signing in again.');
          return;
        }

        const accessToken = data.session.access_token;

        // Exchange Supabase access token for backend JWT
        const response = await axios.post('/api/auth/supabase/exchange', {
          access_token: accessToken,
        });

        const { token } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Sign out of the Supabase session — backend JWT handles everything from here
        await supabase.auth.signOut();

        // Ensure AuthContext gets the latest user profile so ProtectedRoute doesn't redirect
        await refreshUser();

        if (!cancelled) navigate('/dashboard', { replace: true });
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
            err.message ||
            'Authentication failed. Please try again.'
          );
        }
      }
    };

    finishOAuth();
    return () => { cancelled = true; };
  }, [navigate, refreshUser]);

  if (error) {
    return (
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--red)', marginBottom: 16 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="auth-title">Sign-in failed</h1>
          <div className="alert alert-error" style={{ textAlign: 'left' }}>
            {error}
          </div>
          <Link to="/login" className="btn btn-primary" style={{ display: 'flex', marginTop: 8 }}>
            Back to Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 20, color: 'var(--brand)' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ animation: 'spin 1s linear infinite' }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
        <h1 className="auth-title">Completing sign-in…</h1>
        <p className="auth-subtitle">Please wait while we set up your account.</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
