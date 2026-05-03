import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LP_hero = () => {
  const [coverAnimated, setCoverAnimated] = useState(false);
  const [textAnimated, setTextAnimated] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    // Text slides down first
    setTextAnimated(true);

    // Cover image expands after text animation starts (0.5s delay)
    const coverTimer = setTimeout(() => {
      setCoverAnimated(true);
    }, 600);

    return () => {
      clearTimeout(coverTimer);
    };
  }, []);

//   const heroCarImg = "https://images.unsplash.com/photo-1762316815514-feaf60191bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlayUyMHNwb3J0cyUyMGNhciUyMHJvYWQlMjBkcml2aW5nfGVufDF8fHx8MTc3MjU0NjA2OXww&ixlib=rb-4.1.0&q=80&w=1080";
     const heroCarImg = "/GearShift/nbgn.jpg";
     const coverCarImg = "/GearShift/car_cover2.png";

  return (
    <section className="hero-section">
      {/* Background image */}
      <div className="hero-background" style={{ zIndex: 1 }}>
        <img
          src={heroCarImg}
          alt="Sports car"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.8
          }}
        />
      </div>

      <div className="car-cover" style={{ zIndex: 20 }}>
        <img
          src={coverCarImg}
          alt="Car overlay"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            animation: coverAnimated ? 'expandContract 0.7s ease-in-out forwards' : 'none'
          }}
        />
      </div>

      {/* Red glow accent */}
      {/* <div className="hero-glow" /> */}

      <div className="hero-content" style={{
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
}}>
  <div style={{
    textAlign: 'center',
    transform: 'translateY(clamp(-20vh, -20vh, -35vh))'
  }}>
    <h1 className="bebas-neue-regular" style={{
      fontSize: 'clamp(8rem, 22vw, 30rem)',
      animation: textAnimated ? 'slideDown 1s ease-out forwards' : 'none'
    }}>
      <span style={{ background: 'linear-gradient(to top, #cccccc, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>e</span>
      <span style={{ color: 'transparent', WebkitTextStroke: '4px white' }}>nha</span>
      <span style={{ background: 'linear-gradient(to top, #cccccc, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>nce</span>
    </h1>
  </div>

  
</div>

      {/* Get Started Button - Bottom Right */}
      <Link
        to="/login"
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          zIndex: 30,
          backgroundColor: buttonHovered ? 'white' : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: buttonHovered ? 'black' : 'white',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          padding: '10px 16px',
          fontWeight: 700,
          fontSize: '12px',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease',
          textDecoration: 'none',
          display: 'inline-block',
          transform: buttonHovered ? 'translateY(-8px)' : 'translateY(0)'
        }}
      >
        Get Started
      </Link>

      {/* <div className="hero-content">
        <div style={{ maxWidth: '32rem' }}>
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span>Now available in your area</span>
          </div>

          <h1 className="hero-title">
            Your Car, <br />
            <span className="accent">Understood.</span>
            <br /> Finally.
          </h1>

          <p className="hero-subtitle">
            GearShift bridges the gap between everyday drivers and automotive expertise — 
            connecting you to trusted local shops, smart upgrade suggestions, and clear diagnostic guidance.
          </p>

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
      </div> */}

      {/* Scroll indicator */}
      {/* <div className="hero-scroll">
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line" />
      </div> */}
    </section>
  );
};

export default LP_hero;
