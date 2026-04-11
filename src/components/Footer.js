import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, MapPin, Phone, LucideMail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-content">
        {/* Company Info */}
        <div className="footer-section">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginBottom: '1rem' 
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'var(--dark-accent)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Wrench size={16} style={{ color: 'var(--dark-text)' }} />
            </div>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--dark-text)',
              letterSpacing: '-0.02em'
            }}>
              Gear<span style={{ color: 'var(--dark-accent)' }}>Shift</span>
            </span>
          </div>
          <p style={{ 
            color: 'var(--dark-text-secondary)', 
            lineHeight: '1.6',
            marginBottom: '1rem'
          }}>
            Connecting drivers with trusted automotive professionals through smart technology and transparent service.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ color: 'var(--dark-text-secondary)', cursor: 'pointer', marginRight: '0.5rem' }}>📘</span>
            <span style={{ color: 'var(--dark-text-secondary)', cursor: 'pointer', marginRight: '0.5rem' }}>🐦</span>
            <span style={{ color: 'var(--dark-text-secondary)', cursor: 'pointer' }}>📷</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/shops">Find Shops</Link></li>
            <li><Link to="/mechanics">Find Mechanics</Link></li>
            <li><Link to="/service-history">Service History</Link></li>
            <li><Link to="/cost-insights">Cost Insights</Link></li>
            <li><Link to="/car-app">Car Application</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Services</h3>
          <ul className="footer-links">
            <li><Link to="/services/diagnostics">Vehicle Diagnostics</Link></li>
            <li><Link to="/services/maintenance">Maintenance Scheduling</Link></li>
            <li><Link to="/services/emergency">Emergency Roadside</Link></li>
            <li><Link to="/services/parts">Parts & Accessories</Link></li>
            <li><Link to="/services/upgrades">Performance Upgrades</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="footer-links">
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={16} style={{ color: 'var(--dark-text-secondary)' }} />
              <span>123 Automotive Blvd, Car City, CC 12345</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={16} style={{ color: 'var(--dark-text-secondary)' }} />
              <span>1-800-GEARSHIFT</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LucideMail size={16} style={{ color: 'var(--dark-text-secondary)'}}/>
              <span>support@gearshift.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 GearShift. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '0.5rem' }}>
          <Link to="/privacy" style={{ color: 'var(--dark-text-muted)', textDecoration: 'none' }}>
            Privacy Policy
          </Link>
          <Link to="/terms" style={{ color: 'var(--dark-text-muted)', textDecoration: 'none' }}>
            Terms of Service
          </Link>
          <Link to="/cookies" style={{ color: 'var(--dark-text-muted)', textDecoration: 'none' }}>
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
