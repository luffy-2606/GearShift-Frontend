import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import OAuthCallback from './components/OAuthCallback';
import Profile from './components/Profile';
import './App.css';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-page">
        <div className="loading-text">Loading…</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function Layout({ children }) {
  const { user, logout } = useAuth();   // get logout from context
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              // clears token + user
    navigate("/login");    // redirect to login page
  };

  // Hide header/footer on login/register/auth pages
  const hideLayout =
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/register') ||
    location.pathname.startsWith('/auth');

  return (
    <div className="App">
      {!hideLayout && user && (
        <header className="app-header">
          <h1 className="brand-title">🚗 GearShift</h1>
          <nav className="nav-links">
            <a href="/profile" className="btn-profile">Profile</a>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </header>
      )}

      {children}

      {!hideLayout && user && (
        <footer className="app-footer">
          <p>© 2026 GearShift Project — Afras Shahnawaz</p>
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<OAuthCallback />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
