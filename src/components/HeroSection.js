import React, { useState } from 'react';
import { MapPin, ArrowRight, Star, Shield, Zap } from 'lucide-react';

const HeroSection = () => {
  const [searchLocation, setSearchLocation] = useState('');

  const heroCarImg = "https://images.unsplash.com/photo-1762316815514-feaf60191bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlayUyMHNwb3J0cyUyMGNhciUyMHJvYWQlMjBkcml2aW5nfGVufDF8fHx8MTc3MjU0NjA2OXww&ixlib=rb-4.1.0&q=80&w=1080";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      // Navigate to shops page with search query
      window.location.href = `/shops?location=${encodeURIComponent(searchLocation)}`;
    }
  };

  return (
    <section className="hero-section">
      {/* Background image */}
      <div className="hero-background">
        <img
          src={heroCarImg}
          alt="Sports car"
        />
        <div className="hero-overlay" />
        <div className="hero-gradient-bottom" />
      </div>

      {/* Red glow accent */}
      <div className="hero-glow" />

      <div className="hero-content">
        <div style={{ maxWidth: '32rem' }}>
          {/* Badge */}
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span>Now available in your area</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title">
            Your Car, <br />
            <span className="accent">Understood.</span>
            <br /> Finally.
          </h1>

          {/* Subtext */}
          <p className="hero-subtitle">
            GearShift bridges the gap between everyday drivers and automotive expertise — 
            connecting you to trusted local shops, smart upgrade suggestions, and clear diagnostic guidance.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hero-search">
            <div className="hero-search-input">
              <MapPin className="hero-search-icon" size={16} />
              <input
                type="text"
                placeholder="Enter your city or ZIP code..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <button type="submit" className="hero-search-button">
              Find Shops <ArrowRight size={16} />
            </button>
          </form>

          {/* Stats */}
          <div className="hero-stats">
            {[
              { icon: <MapPin size={16} />, value: "2,400+", label: "Local Shops" },
              { icon: <Star size={16} />, value: "4.9★", label: "Avg. Rating" },
              { icon: <Shield size={16} />, value: "98%", label: "Verified" },
              { icon: <Zap size={16} />, value: "150k+", label: "Drivers" },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat">
                <div className="hero-stat-icon">{stat.icon}</div>
                <div>
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
};

export default HeroSection;
