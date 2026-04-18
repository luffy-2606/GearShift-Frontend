import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import OAuthCallback from './components/OAuthCallback';
import Profile from './components/Profile';
import ShopsList from './components/ShopsList';
import ServiceHistory from './components/ServiceHistory';
import MechanicsList from './components/MechanicsList';
import CostInsights from './components/CostInsights';
import SystemMessages from './components/SystemMessages';
import LandingPage from './components/LandingPage';
import './App.css';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-page">
        <div style={{ color: 'white', fontSize: 16 }}>Loading…</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <SystemMessages />
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
              path="/shops"
              element={
                <ProtectedRoute>
                  <ShopsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mechanics"
              element={
                <ProtectedRoute>
                  <MechanicsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/service-history"
              element={
                <ProtectedRoute>
                  <ServiceHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cost-insights"
              element={
                <ProtectedRoute>
                  <CostInsights />
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
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
