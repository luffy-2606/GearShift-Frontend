import React, { useState, useEffect } from 'react';
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
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <div style={{ background: 'var(--dark-bg)', overflowX: 'hidden', width: '100%' }}>
      {/* Blur overlay when menu is open */}
      {(menuOpen || rightMenuOpen) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(5px)',
          zIndex: 999,
          opacity: 1,
          animation: 'fadeInOverlay 0.3s ease forwards'
        }} />
      )}

      {/* Navigation Bar from Landing Page */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'transparent',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Left - GearShift with hover menu for navigation */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              cursor: 'pointer',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              padding: '10px 0'
            }}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            GearShift

            {/* Hover menu - appears below with navigation links */}
            {menuOpen && (
              <div
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'transparent',
                  padding: '15px',
                  minWidth: '180px',
                  marginTop: '5px',
                  animation: 'fadeIn 0.3s ease-out',
                  transition: 'all 0.3s ease'
                }}
              >
                <Link to="/shops" style={{
                  display: 'block',
                  color: hoveredLink === null || hoveredLink === 'shops' ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  textDecoration: 'none',
                  padding: '12px 0',
                  fontSize: '3rem',
                  fontWeight: '500',
                  fontFamily: 'Times New Roman, serif',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease, filter 0.2s ease',
                  filter: hoveredLink === 'shops' ? 'brightness(1.3)' : 'brightness(1)'
                }} onMouseEnter={() => setHoveredLink('shops')} onMouseLeave={() => setHoveredLink(null)}>Shops</Link>
                <Link to="/mechanics" style={{
                  display: 'block',
                  color: hoveredLink === null || hoveredLink === 'mechanics' ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  textDecoration: 'none',
                  padding: '12px 0',
                  fontSize: '3rem',
                  fontWeight: '500',
                  fontFamily: 'Times New Roman, serif',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease, filter 0.2s ease',
                  filter: hoveredLink === 'mechanics' ? 'brightness(1.3)' : 'brightness(1)'
                }} onMouseEnter={() => setHoveredLink('mechanics')} onMouseLeave={() => setHoveredLink(null)}>Mechanics</Link>
                <Link to="/service-history" style={{
                  display: 'block',
                  color: hoveredLink === null || hoveredLink === 'service-history' ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  textDecoration: 'none',
                  padding: '12px 0',
                  fontSize: '3rem',
                  fontWeight: '500',
                  fontFamily: 'Times New Roman, serif',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease, filter 0.2s ease',
                  filter: hoveredLink === 'service-history' ? 'brightness(1.3)' : 'brightness(1)'
                }} onMouseEnter={() => setHoveredLink('service-history')} onMouseLeave={() => setHoveredLink(null)}>Service History</Link>
                <Link to="/cost-insights" style={{
                  display: 'block',
                  color: hoveredLink === null || hoveredLink === 'cost-insights' ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  textDecoration: 'none',
                  padding: '12px 0',
                  fontSize: '3rem',
                  fontWeight: '500',
                  fontFamily: 'Times New Roman, serif',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease, filter 0.2s ease',
                  filter: hoveredLink === 'cost-insights' ? 'brightness(1.3)' : 'brightness(1)'
                }} onMouseEnter={() => setHoveredLink('cost-insights')} onMouseLeave={() => setHoveredLink(null)}>Cost Analysis</Link>
              </div>
            )}
          </div>
        </div>

        {/* Center - Logo */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img className="logo-spin" src="/GearShift/logo.png" alt="Logo" style={{ height: '50px', width: 'auto' }} />
        </div>

        {/* Right - 3 lines with hover menu for Profile/Logout */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              cursor: 'pointer'
            }}
            onMouseEnter={() => setRightMenuOpen(true)}
            onMouseLeave={() => setRightMenuOpen(false)}
          >
            <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></div>
            <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></div>
            <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></div>

            {/* Hover menu - appears below with Profile/Logout */}
            {rightMenuOpen && user && (
              <div
                onMouseEnter={() => setRightMenuOpen(true)}
                onMouseLeave={() => setRightMenuOpen(false)}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: 'transparent',
                  padding: '15px',
                  minWidth: '180px',
                  marginTop: '5px',
                  animation: 'fadeIn 0.3s ease-out',
                  transition: 'all 0.3s ease'
                }}
              >
                <Link to="/profile" style={{
                  display: 'block',
                  color: hoveredLink === null || hoveredLink === 'profile' ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  textDecoration: 'none',
                  padding: '12px 0',
                  fontSize: '3rem',
                  fontWeight: '500',
                  fontFamily: 'Times New Roman, serif',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease, filter 0.2s ease',
                  filter: hoveredLink === 'profile' ? 'brightness(1.3)' : 'brightness(1)'
                }} onMouseEnter={() => setHoveredLink('profile')} onMouseLeave={() => setHoveredLink(null)}>Profile</Link>
                <button onClick={logout} style={{
                  display: 'block',
                  color: hoveredLink === null || hoveredLink === 'logout' ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  textDecoration: 'none',
                  padding: '12px 0',
                  fontSize: '3rem',
                  fontWeight: '500',
                  fontFamily: 'Times New Roman, serif',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease, filter 0.2s ease',
                  filter: hoveredLink === 'logout' ? 'brightness(1.3)' : 'brightness(1)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }} onMouseEnter={() => setHoveredLink('logout')} onMouseLeave={() => setHoveredLink(null)}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Landing Page Sections */}
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
        maxWidth: '100vw'}}>
        {/* <HeroSection />
        <HowItWorks />
        <FeaturesSection />
        <ShopsSection />
        <UpgradesSection />
        <TestimonialsSection />
        <CTASection /> */}
        {/* <Footer /> */}
        
        {/* Cover Rectangle behind UserDashboard */}
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
        
        {/* User Dashboard */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {user && <UserDashboard />}
        </div>
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
