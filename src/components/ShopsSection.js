import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight, Wrench } from 'lucide-react';

const ShopsSection = () => {
  const featuredShops = [
    {
      name: 'AutoCare Pro',
      rating: 4.9,
      reviews: 234,
      location: 'Downtown',
      specialties: ['Oil Change', 'Brakes', 'Engine Repair'],
      description: 'Professional automotive care with certified technicians and state-of-the-art equipment.',
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    },
    {
      name: 'QuickFix Garage',
      rating: 4.8,
      reviews: 189,
      location: 'West Side',
      specialties: ['Tire Service', 'Alignment', 'Transmission'],
      description: 'Fast and reliable service for all your automotive needs. Specializing in quick turnarounds.',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    },
    {
      name: 'Elite Motors',
      rating: 5.0,
      reviews: 156,
      location: 'North District',
      specialties: ['Performance', 'Diagnostics', 'Custom Work'],
      description: 'Premium automotive services for high-performance vehicles and custom modifications.',
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    }
  ];

  return (
    <section className="landing-section landing-section-dark">
      <div className="section-header">
        <h2 className="section-title">Featured <span style={{ color: 'var(--dark-accent)' }}>Shops</span></h2>
        <p className="section-subtitle">
          Top-rated automotive shops in your area, verified by real customers and guaranteed quality service.
        </p>
      </div>

      <div className="features-grid">
        {featuredShops.map((shop, index) => (
          <div key={index} className="feature-card" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Shop Image */}
            <div style={{ 
              height: '200px', 
              borderRadius: 'var(--radius-sm)', 
              overflow: 'hidden', 
              marginBottom: '1.5rem',
              background: `url(${shop.image}) center/cover`,
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
                zIndex: 1
              }} />
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'var(--dark-accent)',
                color: 'var(--dark-text)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                zIndex: 2
              }}>
                Featured
              </div>
            </div>
            
            {/* Shop Content */}
            <div style={{ marginBottom: '1rem' }}>
              <h3 className="feature-title" style={{ marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
                {shop.name}
              </h3>
              
              <p className="feature-description" style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
                {shop.description}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={16} className="hero-stat-icon" fill="currentColor" />
                  <span style={{ fontWeight: '700', color: 'var(--dark-text)' }}>{shop.rating}</span>
                </div>
                <span style={{ color: 'var(--dark-text-muted)', fontSize: '0.875rem' }}>({shop.reviews} reviews)</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--dark-text-secondary)', marginBottom: '1rem' }}>
                <MapPin size={14} />
                <span style={{ fontSize: '0.875rem' }}>{shop.location}</span>
              </div>
            </div>

            {/* Specialties */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--dark-text-muted)', marginBottom: '0.75rem', fontWeight: '600' }}>
                <Wrench size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Specialties:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {shop.specialties.map((specialty, idx) => (
                  <span key={idx} style={{
                    background: 'var(--dark-glass)',
                    border: '1px solid var(--dark-border)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '0.375rem 0.875rem',
                    fontSize: '0.75rem',
                    color: 'var(--dark-text-secondary)',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}>
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Link 
              to={`/shops?shop=${encodeURIComponent(shop.name)}`}
              className="cta-button-primary"
              style={{ 
                width: '100%', 
                justifyContent: 'center',
                textDecoration: 'none',
                padding: '0.875rem 1.5rem',
                fontSize: '0.95rem'
              }}
            >
              View Details <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>

      {/* View All Shops CTA */}
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <div style={{
          background: 'var(--dark-surface)',
          border: '1px solid var(--dark-border)',
          borderRadius: 'var(--radius)',
          padding: '3rem 2rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: 'var(--dark-text)',
            margin: '0 0 1rem'
          }}>
            Need More Options?
          </h3>
          <p style={{
            fontSize: '1rem',
            color: 'var(--dark-text-secondary)',
            margin: '0 0 2rem',
            lineHeight: '1.6'
          }}>
            Browse our complete directory of trusted automotive shops and find the perfect match for your vehicle needs.
          </p>
          <Link 
            to="/shops" 
            className="cta-button-secondary"
            style={{ 
              textDecoration: 'none',
              padding: '0.875rem 2rem',
              fontSize: '1rem'
            }}
          >
            View All Shops <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopsSection;
