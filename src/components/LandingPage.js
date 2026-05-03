import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import LP_hero from './LP_hero';
import LP_Context from './LP_Context';
import LP_Video from './LP_Video';
import LP_Review from './LP_Review';
import LP_Features from './LP_Features';
import { useSiteSettings, usePageConfig } from '../lib/cms';

const LandingPage = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [logoVisible, setLogoVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { settings } = useSiteSettings();
  usePageConfig('home');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setLogoVisible(false);
      } else {
        setLogoVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div>
      {/* Custom cursor circle */}
      <div style={{
        position: 'fixed',
        top: mousePosition.y - 10,
        left: mousePosition.x - 10,
        width: '20px',
        height: '20px',
        backgroundColor: 'white',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'top 0.3s ease-out, left 0.3s ease-out',
        mixBlendMode: 'difference'
      }} />

      {/* Blur overlay when menu is open */}
      {menuOpen && (
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
        {/* Left - Ascend with hover menu */}
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
            {settings.siteTitle}

            {/* Hover menu - appears below */}
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
                {settings.navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    style={{
                      display: 'block',
                      color: hoveredLink === null || hoveredLink === link.href ? 'white' : 'rgba(255, 255, 255, 0.4)',
                      textDecoration: 'none',
                      padding: '12px 0',
                      fontSize: '3rem',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman, serif',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s ease, filter 0.2s ease',
                      filter: hoveredLink === link.href ? 'brightness(1.3)' : 'brightness(1)'
                    }}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center - Logo */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            className="logo-spin"
            src={settings.logoUrl}
            alt={`${settings.siteTitle} Logo`}
            style={{ height: '50px', width: 'auto', opacity: logoVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
          />
        </div>

        {/* Right - 3 lines */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          cursor: 'pointer'
        }}>
          <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></div>
          <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></div>
          <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></div>
        </div>
      </nav>

      {/* Landing Page Content - Add your sections here */}
      <div>
        <LP_hero />
        <LP_Context />
        <LP_Video />
        <LP_Features />
        <LP_Review />
      </div>

      {user?.role === 'admin' && (
        <div>
          <a href="/admin">Admin Panel</a>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
