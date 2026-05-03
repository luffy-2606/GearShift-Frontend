import React, { useState, useEffect, useRef } from 'react';

const LP_Context = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        background: 'black',
        padding: '120px 20px'
      }}
    >
      {/* Scroll Indicator Widget */}
      <div
        style={{
          position: 'absolute',
          top: '35px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          border: '2px solid white',
          borderRadius: '30px',
          padding: '10px 24px',
          color: 'white',
          fontSize: '16px',
          fontWeight: 600,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontFamily: 'Times New Roman, serif',
          cursor: 'default'
        }}
      >
        Scroll
      </div>

      {/* Image container */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '500px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '20px'
      }}>
        {/* Engine image as background of container */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/GearShift/dashboard.png)',
          backgroundSize: '100%',
          backgroundPosition: 'center',
          opacity: 0.6
        }} />

        {/* Blur gradient overlay on left */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(26, 26, 26, 0.98) 0%, rgba(26, 26, 26, 0.8) 25%, rgba(26, 26, 26, 0.1) 50%, rgba(26, 26, 26, 0.05) 75%, rgba(26, 26, 26, 0) 100%)',
          zIndex: 1
        }} />

        {/* Content on left */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '500px',
          paddingLeft: '80px',
          paddingRight: '40px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: '#ffffff',
            textAlign: 'left',
            marginBottom: '24px',
            fontFamily: 'Times New Roman, serif',
            fontWeight: 'bold',
            letterSpacing: '1px',
            lineHeight: '1.1'
          }}>
            The Problem<br />
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              We Solve
            </span>
          </h2>

          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.85)',
            textAlign: 'left',
            marginBottom: '20px',
            fontFamily: 'Times New Roman, serif',
            lineHeight: '1.7',
            letterSpacing: '0.3px'
          }}>
            Finding reliable car service shouldn't be a gamble. Yet millions of drivers struggle with opaque pricing, unverified mechanics, and booking systems that don't work.
          </p>

          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.85)',
            textAlign: 'left',
            marginBottom: '30px',
            fontFamily: 'Times New Roman, serif',
            lineHeight: '1.7',
            letterSpacing: '0.3px'
          }}>
            We built GearShift to change that. Transparent pricing, verified professionals, and real-time availability—all in one place.
          </p>

          <button
            onClick={() => setShowCard(!showCard)}
            style={{
              backgroundColor: '#ffffff',
              color: '#000000',
              border: 'none',
              padding: '14px 32px',
              fontSize: '1rem',
              fontWeight: '600',
              fontFamily: 'Times New Roman, serif',
              borderRadius: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '40px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#000000';
              e.target.style.color = '#ffffff';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#000000';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Why Us?
          </button>
        </div>

        {/* Translucent comparison card on right */}
        <div style={{
          position: 'absolute',
          right: '80px',
          top: '50%',
          transform: showCard ? 'translateY(-50%)' : 'translateY(-50%) translateX(50px)',
          opacity: showCard ? 1 : 0,
          width: '60%',
          height: '90%',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '20px 16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          zIndex: 3,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: showCard ? 'auto' : 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <button
            onClick={() => setShowCard(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'transparent',
              color: '#ffffff',
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
              padding: '5px',
              opacity: 0.7
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.7'}
          >
            ×
          </button>

          <h3 style={{
            fontSize: '2.8rem',
            color: '#ffffff',
            fontFamily: 'Times New Roman, serif',
            fontWeight: 'bold',
            margin: '0 0 35px 0',
            letterSpacing: '1px',
            padding: '0 40px'
          }}>
            Why GearShift?
          </h3>

          <p style={{
            margin: '0 0 25px 0',
            color: '#ffffff',
            fontFamily: 'Times New Roman, serif',
            fontSize: '1.4rem',
            lineHeight: '1.9',
            letterSpacing: '0.3px',
            padding: '0 80px'
          }}>
            Finding reliable car service can be challenging, with concerns about pricing transparency and mechanic qualifications. GearShift addresses these challenges by providing upfront cost visibility, verified professional profiles, and real-time scheduling availability.
          </p>

          <p style={{
            margin: 0,
            color: '#ffffff',
            fontFamily: 'Times New Roman, serif',
            fontSize: '1.4rem',
            lineHeight: '1.9',
            letterSpacing: '0.3px',
            padding: '0 80px'
          }}>
            Our comprehensive service tracking system maintains your complete maintenance history, enabling informed decisions about your vehicle's care. We deliver a streamlined, transparent, and dependable automotive service experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LP_Context;
