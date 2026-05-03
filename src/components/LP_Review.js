import { useState, useEffect, useRef } from 'react';
import { useLandingPage } from '../lib/cms';

const LP_Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { data } = useLandingPage();
  const { reviews } = data;

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

  useEffect(() => {
    if (!isPaused && reviews.items.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.items.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isPaused, reviews.items.length]);

  // Reset index if items change
  useEffect(() => {
    setCurrentIndex(0);
  }, [reviews.items.length]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.items.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.items.length) % reviews.items.length);
  };

  const current = reviews.items[currentIndex];

  return (
    <div
      ref={sectionRef}
      style={{
        width: '100%',
        background: '#000000',
        padding: '80px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>

      <h2 style={{
        fontSize: 'clamp(3.5rem, 8vw, 6rem)',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: '50px',
        fontFamily: 'Times New Roman, serif',
        fontWeight: 'bold',
        letterSpacing: '1px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease'
      }}>
        {reviews.heading}
      </h2>

      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '60px',
          maxWidth: '1200px',
          width: '100%'
        }}
      >
        {/* Previous Button */}
        <button
          onClick={prevReview}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid #ffffff',
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: '2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            fontFamily: 'Times New Roman, serif'
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = '#ffffff'; e.target.style.color = '#000000'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#ffffff'; }}
        >
          &lt;
        </button>

        {/* Review Card */}
        <div style={{
          flex: 1,
          maxWidth: '800px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '50px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative quote mark */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '30px',
            fontSize: '6rem',
            color: 'rgba(255, 255, 255, 0.1)',
            fontFamily: 'Times New Roman, serif',
            lineHeight: '1',
            pointerEvents: 'none'
          }}>
            "
          </div>

          <div style={{ fontSize: '2rem', color: '#FFD700', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
            {'★'.repeat(current.rating)}
          </div>

          {/* Review Text */}
          <p style={{
            fontSize: '1.5rem',
            color: '#ffffff',
            lineHeight: '1.8',
            marginBottom: '40px',
            fontFamily: 'Times New Roman, serif',
            fontStyle: 'italic',
            position: 'relative',
            zIndex: 1
          }}>
            "{current.text}"
          </p>

          {/* Reviewer Info */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Avatar */}
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              fontFamily: 'Times New Roman, serif',
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}>
              {current.avatar}
            </div>

            {/* Name and Location */}
            <div style={{ textAlign: 'left' }}>
              <h3 style={{
                fontSize: '1.4rem',
                color: '#ffffff',
                marginBottom: '4px',
                fontFamily: 'Times New Roman, serif',
                fontWeight: 'bold'
              }}>
                {current.name}
              </h3>
              <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Times New Roman, serif' }}>
                {current.location} • {current.service}
              </div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextReview}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid #ffffff',
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: '2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            fontFamily: 'Times New Roman, serif'
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = '#ffffff'; e.target.style.color = '#000000'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#ffffff'; }}
        >
          &gt;
        </button>
      </div>

      {/* Dots Indicator */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '40px' }}>
        {reviews.items.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: index === currentIndex ? '32px' : '12px',
              height: '12px',
              borderRadius: '6px',
              backgroundColor: index === currentIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

    </div>
  );
};

export default LP_Review;
