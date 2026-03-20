import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import supabase from '../lib/supabaseClient';
import apiClient from '../lib/apiClient';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

async function exchangeSupabaseToken(supabaseAccessToken) {
  const response = await apiClient.post('/api/auth/supabase/exchange', {
    access_token: supabaseAccessToken,
  });
  return response.data; // { token, user }
}

function applyBackendToken(token) {
  localStorage.setItem('token', token);
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function clearBackendToken() {
  localStorage.removeItem('token');
  delete apiClient.defaults.headers.common['Authorization'];
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      clearBackendToken();
      setUser(null);
      return;
    }

    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.get('/api/users/profile');
    setUser(response.data);
  }, []);

  // On mount: check for existing backend JWT and verify it
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      refreshUser()
        .catch(() => clearBackendToken())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [refreshUser]);

  // Register: use Supabase signUp (sends verification email).
  // Does NOT auto-login; user must verify email first.
  const register = async ({ email, password, firstName, lastName }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        return { success: false, message: error.message };
      }

      // Supabase may auto-confirm in some project settings; if so, sign out immediately
      // so the user still has to go through login.
      if (data.session) {
        await supabase.auth.signOut();
      }

      return { success: true, message: 'Check your email to verify your account.' };
    } catch (err) {
      return { success: false, message: err.message || 'Registration failed' };
    }
  };

  // Login: authenticate via Supabase, then exchange for backend JWT
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        if (error.message.toLowerCase().includes('email not confirmed')) {
          return {
            success: false,
            message: 'Please verify your email before signing in. Check your inbox for the confirmation link.',
          };
        }
        return { success: false, message: error.message };
      }

      // Exchange Supabase access token for backend JWT
      const { token, user: userData } = await exchangeSupabaseToken(data.session.access_token);

      applyBackendToken(token);
      setUser(userData);

      // Sign out of Supabase session — we only need the backend JWT going forward
      await supabase.auth.signOut();

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message || 'Login failed',
      };
    }
  };

  // Google OAuth: redirect to Google via Supabase
  const googleLogin = async () => {
    const frontendUrl = process.env.REACT_APP_FRONTEND_URL || window.location.origin;
    const redirectTo = `${frontendUrl}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) {
      console.error('Google OAuth error:', error.message);
    }
  };

  const logout = () => {
    clearBackendToken();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    googleLogin,
    refreshUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
