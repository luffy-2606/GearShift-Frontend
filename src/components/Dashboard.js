import React from 'react';
import { useAuth } from '../context/AuthContext';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import FeaturesSection from './FeaturesSection';
import ShopsSection from './ShopsSection';
import UpgradesSection from './UpgradesSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';
import Footer from './Footer';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ background: 'var(--dark-bg)', overflowX: 'hidden', width: '100%' }}>
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <ShopsSection />
      <UpgradesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <div style={{
        position: 'relative',
        paddingLeft: '3rem',
        paddingRight: '3rem',
        backgroundColor: 'white',
        paddingTop: '16rem',
        paddingBottom: '2rem',
        backgroundImage: 'url(/GearShift/engine.png)',
        backgroundSize: '100%',
        backgroundPosition: 'center -140px',
        backgroundRepeat: 'no-repeat',
        overflowX: 'hidden',
        maxWidth: '100vw'
      }}>
        <div style={{
          position: 'absolute',
          top: '560px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: 'calc(100% - 560px)',
          background: '#1b1b1b',
          zIndex: 1
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {user && <UserDashboard />}
        </div>
      </div>

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
