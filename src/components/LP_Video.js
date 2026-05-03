import { useState, useEffect, useRef } from 'react';
import { useLandingPage } from '../lib/cms';

const LP_Video = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { data } = useLandingPage();
  const { video } = data;

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

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden'
      }}>
      {/* Video Background */}
      <video
        src={video.videoUrl}
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          minHeight: '600px'
        }}
      />

      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1
      }} />

      {/* Scrolling Text Strip */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '10px 0',

        zIndex: 3
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'scrollText 20s linear infinite',
          fontSize: '2rem',
          fontFamily: 'Times New Roman, serif',
          fontWeight: 'bold',
          letterSpacing: '2px',
          width: '200%',
          color: 'black'
        }}>
          TRUSTED PROFESSIONALS • TRANSPARENT PRICING • REAL-TIME AVAILABILITY • VERIFIED REVIEWS • SEAMLESS BOOKING • EXPERT SERVICE • TRUSTED PROFESSIONALS • TRANSPARENT PRICING • REAL-TIME AVAILABILITY • VERIFIED REVIEWS • SEAMLESS BOOKING • EXPERT SERVICE
        </div>
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '80px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        marginTop: '0px'
      }}>
        {/* Main Heading */}
        <h2 style={{
          fontSize: '10rem',
          color: 'white',
          textAlign: 'center',
          marginBottom: '50px',
          fontFamily: 'Times New Roman, serif',
          fontWeight: 'bold',
          letterSpacing: '1px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}>
          {video.sectionTitle}
        </h2>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gridAutoRows: '1fr',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {video.cards.map((card, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: hoveredCard === index ? 'white' : 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '30px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '250px',
                height: '100%',
                transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)'
              }}
            >
              <h3 style={{
                fontSize: '1.8rem',
                color: hoveredCard === index ? 'black' : 'white',
                marginBottom: '15px',
                fontFamily: 'Times New Roman, serif',
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                transition: 'color 0.3s ease'
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: hoveredCard === index ? 'black' : 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.6',
                transition: 'color 0.3s ease'
              }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LP_Video;