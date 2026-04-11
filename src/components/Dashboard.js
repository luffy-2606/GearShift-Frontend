import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import FeaturesSection from './FeaturesSection';
import ShopsSection from './ShopsSection';
import UpgradesSection from './UpgradesSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';
import Footer from './Footer';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const firstName = user?.firstName ?? user?.first_name;
  const lastName = user?.lastName ?? user?.last_name;

  return (
    <div style={{ background: 'var(--dark-bg)' }}>
      {/* User Navigation Bar */}
      <div className="dashboard-header" style={{ 
        background: 'rgba(10, 10, 10, 0.95)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--dark-border)',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '50'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '0 1.5rem'
        }}>
          {/* GearShift - Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'var(--dark-accent)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'var(--dark-text)', fontSize: '16px', fontWeight: 'bold' }}>GS</span>
            </div>
            <span style={{ 
              color: 'var(--dark-text)', 
              fontSize: '1.2rem', 
              fontWeight: 700, 
              letterSpacing: '-0.02em' 
            }}>
              Gear<span style={{ color: 'var(--dark-accent)' }}>Shift</span>
            </span>
          </div>
          
          {/* Navigation Links - Centered */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Link to="/shops" style={{ 
              color: 'var(--dark-text-secondary)', 
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.2s'
            }} onMouseEnter={(e) => e.target.style.color = 'var(--dark-text)'} onMouseLeave={(e) => e.target.style.color = 'var(--dark-text-secondary)'}>
              Shops
            </Link>
            <Link to="/mechanics" style={{ 
              color: 'var(--dark-text-secondary)', 
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.2s'
            }} onMouseEnter={(e) => e.target.style.color = 'var(--dark-text)'} onMouseLeave={(e) => e.target.style.color = 'var(--dark-text-secondary)'}>
              Mechanics
            </Link>
            <Link to="/service-history" style={{ 
              color: 'var(--dark-text-secondary)', 
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.2s'
            }} onMouseEnter={(e) => e.target.style.color = 'var(--dark-text)'} onMouseLeave={(e) => e.target.style.color = 'var(--dark-text-secondary)'}>
              Service History
            </Link>
            <Link to="/cost-insights" style={{ 
              color: 'var(--dark-text-secondary)', 
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.2s'
            }} onMouseEnter={(e) => e.target.style.color = 'var(--dark-text)'} onMouseLeave={(e) => e.target.style.color = 'var(--dark-text-secondary)'}>
              Cost Insights
            </Link>
          </div>

          {/* User Info - Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'absolute', left: '90%', transform: 'translateX(-50%)' }}>
            <Link to="/profile" className="btn-profile" style={{
              background: 'var(--dark-surface)',
              border: '1px solid var(--dark-border)',
              color: 'var(--dark-text)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              Profile
            </Link>
            <button onClick={logout} className="btn-logout" style={{
              background: 'var(--dark-accent)',
              color: 'var(--dark-text)',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.875rem'
            }}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Landing Page Sections */}
      <div style={{ paddingTop: '80px' }}>
        <HeroSection />
        <HowItWorks />
        <FeaturesSection />
        <ShopsSection />
        <UpgradesSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>

      {/* Admin Panel Link (if admin) */}
      {user?.role === 'admin' && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: '40'
        }}>
          <a 
            href="/admin" 
            className="btn"
            style={{
              background: 'var(--dark-accent)',
              color: 'var(--dark-text)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
            }}
          >
            Admin Panel
          </a>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
