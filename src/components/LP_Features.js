import React, { useState, useEffect, useRef } from 'react';
import { useLandingPage } from '../lib/cms';

const LP_Features = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { data } = useLandingPage();
  const { features } = data;

  useEffect(() => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Build two scrolling columns from the services array
  const col1Services = features.services.filter((_, i) => i % 2 === 0);
  const col2Services = features.services.filter((_, i) => i % 2 !== 0);

  // Duplicate for infinite scroll effect
  const col1Loop = [...col1Services, ...col1Services];
  const col2Loop = [...col2Services, ...col2Services];

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        background: '#dadada',
        padding: '10px 40px',
        minHeight: '600px'
      }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        {/* Content */}
        <div style={{
          flex: 1,
          position: 'relative',
          zIndex: 1
        }}>
          {/* Main Heading */}
          <h2 style={{
            fontSize: 'clamp(3.5rem, 9vw, 7rem)',
            color: '#1a1a1a',
            textAlign: 'left',
            marginBottom: '16px',
            fontFamily: 'Times New Roman, serif',
            fontWeight: 'bold',
            letterSpacing: '1px',
            lineHeight: '1.05',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}>
            {features.heading}<br />
            <span style={{
              background: 'linear-gradient(135deg, #000000 0%, #4a4a4a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {features.headingAccent}
            </span>
          </h2>

          {/* Subheading */}
          <p style={{
            fontSize: '1.15rem',
            color: '#202020',
            textAlign: 'left',
            marginBottom: '60px',
            fontFamily: 'Times New Roman, serif',
            maxWidth: '650px',
            lineHeight: '1.6',
            letterSpacing: '0.3px'
          }}>
            {features.subheading}
          </p>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 280px)',
            gap: '24px',
            marginBottom: '60px'
          }}>
            {features.stats.map((stat, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: hoveredCard === index ? '#000000' : 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '36px 28px',
                  border: hoveredCard === index ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: hoveredCard === index ? '0 8px 30px rgba(0, 0, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
                  textAlign: 'left',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)'
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: hoveredCard === index ? 'white' : '#1a1a1a',
                  marginBottom: '12px',
                  fontFamily: 'Times New Roman, serif',
                  lineHeight: '1',
                  transition: 'color 0.4s ease'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: hoveredCard === index ? 'white' : '#666666',
                  fontFamily: 'Times New Roman, serif',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontWeight: '500',
                  transition: 'all 0.4s ease'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling image columns */}
        <div style={{ display: 'flex', gap: '20px', marginLeft: '40px', height: '800px' }}>
          {/* Column 1 — scrolls upward */}
          <div style={{ width: '280px', overflow: 'hidden', position: 'relative' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              animation: 'scrollUp 20s linear infinite'
            }}>
              {col1Loop.map((service, index) => (
                <div
                  key={`col1-${index}`}
                  onMouseEnter={() => setHoveredImage(`c1-${index}`)}
                  onMouseLeave={() => setHoveredImage(null)}
                  style={{
                    width: '280px',
                    height: '24rem',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    position: 'relative',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Dark overlay with service name on hover */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: hoveredImage === `c1-${index}` ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <span style={{
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      fontFamily: 'Times New Roman, serif',
                      textAlign: 'center',
                      padding: '10px'
                    }}>
                      {service.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 — scrolls downward */}
          <div style={{ width: '280px', overflow: 'hidden', position: 'relative' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              animation: 'scrollDown 20s linear infinite'
            }}>
              {col2Loop.map((service, index) => (
                <div
                  key={`col2-${index}`}
                  onMouseEnter={() => setHoveredImage(`c2-${index}`)}
                  onMouseLeave={() => setHoveredImage(null)}
                  style={{
                    width: '280px',
                    height: '24rem',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    position: 'relative',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Dark overlay with service name on hover */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: hoveredImage === `c2-${index}` ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <span style={{
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      fontFamily: 'Times New Roman, serif',
                      textAlign: 'center',
                      padding: '10px'
                    }}>
                      {service.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scrollUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes scrollDown {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LP_Features;