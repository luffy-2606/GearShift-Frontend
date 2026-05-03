import React, { useState, useEffect } from 'react';
import { useLandingPage } from '../lib/cms';

const LP_hero = () => {
  const [coverAnimated, setCoverAnimated] = useState(false);
  const [textAnimated, setTextAnimated] = useState(false);
  const { data } = useLandingPage();
  const { hero } = data;

  useEffect(() => {
    // Text slides down first
    setTextAnimated(true);

    // Cover image expands after text animation starts (0.5s delay)
    const coverTimer = setTimeout(() => {
      setCoverAnimated(true);
    }, 600);
    return () => clearTimeout(coverTimer);
  }, []);

  return (
    <section className="hero-section">
      {/* Background image */}
      <div className="hero-background" style={{ zIndex: 1 }}>
        <img
          src={hero.heroImageUrl}
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
          src={hero.coverImageUrl}
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
            <span style={{ background: 'linear-gradient(to top, #cccccc, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {hero.heading.charAt(0)}
            </span>
            <span style={{ color: 'transparent', WebkitTextStroke: '4px white' }}>
              {hero.heading.slice(1, 4)}
            </span>
            <span style={{ background: 'linear-gradient(to top, #cccccc, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {hero.heading.slice(4)}
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default LP_hero;
