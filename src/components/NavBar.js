import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <>
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

      {/* Navigation Bar */}
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
        {/* Left: hover zone wraps label + dropdown so pointer can reach links */}
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <div
            style={{
              cursor: 'pointer',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              padding: '10px 0'
            }}
          >
            GearShift
          </div>

          {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'transparent',
                  padding: '12px 15px 15px',
                  minWidth: '180px',
                  animation: 'fadeIn 0.3s ease-out',
                  transition: 'all 0.3s ease'
                }}
              >
                <Link to="/dashboard" style={{
                  display: 'block',
                  color: hoveredLink === null || hoveredLink === 'dashboard' ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  textDecoration: 'none',
                  padding: '12px 0',
                  fontSize: '3rem',
                  fontWeight: '500',
                  fontFamily: 'Times New Roman, serif',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease, filter 0.2s ease',
                  filter: hoveredLink === 'dashboard' ? 'brightness(1.3)' : 'brightness(1)'
                }} onMouseEnter={() => setHoveredLink('dashboard')} onMouseLeave={() => setHoveredLink(null)}>Dashboard</Link>
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

        {/* Center - Logo */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img className="logo-spin" src="/GearShift/logo.png" alt="Logo" style={{ height: '40px', width: 'auto' }} />
        </div>

        {/* Right: same hover wrapper pattern */}
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setRightMenuOpen(true)}
          onMouseLeave={() => setRightMenuOpen(false)}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              cursor: 'pointer'
            }}
          >
            <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></div>
            <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></div>
            <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></div>
          </div>

          {rightMenuOpen && user && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: 'transparent',
                  padding: '12px 15px 15px',
                  minWidth: '180px',
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
      </nav>
    </>
  );
};

export default NavBar;
