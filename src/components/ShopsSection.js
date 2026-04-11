import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight } from 'lucide-react';

const ShopsSection = () => {
  const featuredShops = [
    {
      name: 'AutoCare Pro',
      rating: 4.9,
      reviews: 234,
      location: 'Downtown',
      specialties: ['Oil Change', 'Brakes', 'Engine Repair'],
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    },
    {
      name: 'QuickFix Garage',
      rating: 4.8,
      reviews: 189,
      location: 'West Side',
      specialties: ['Tire Service', 'Alignment', 'Transmission'],
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    },
    {
      name: 'Elite Motors',
      rating: 5.0,
      reviews: 156,
      location: 'North District',
      specialties: ['Performance', 'Diagnostics', 'Custom Work'],
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    }
  ];

  return (
    <section className="landing-section landing-section-dark">
      <div className="section-header">
        <h2 className="section-title">Featured Shops</h2>
        <p className="section-subtitle">
          Top-rated automotive shops in your area, verified by real customers and guaranteed quality service.
        </p>
      </div>

      <div className="features-grid">
        {featuredShops.map((shop, index) => (
          <div key={index} className="feature-card">
            <div style={{ 
              height: '200px', 
              borderRadius: 'var(--radius-sm)', 
              overflow: 'hidden', 
              marginBottom: '1.5rem',
              background: `url(${shop.image}) center/cover`
            }} />
            
            <div style={{ marginBottom: '1rem' }}>
              <h3 className="feature-title" style={{ marginBottom: '0.5rem' }}>{shop.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={16} className="hero-stat-icon" fill="currentColor" />
                  <span style={{ fontWeight: '600', color: 'var(--dark-text)' }}>{shop.rating}</span>
                </div>
                <span style={{ color: 'var(--dark-text-muted)' }}>({shop.reviews} reviews)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--dark-text-secondary)' }}>
                <MapPin size={14} />
                <span>{shop.location}</span>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--dark-text-muted)', marginBottom: '0.5rem' }}>Specialties:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {shop.specialties.map((specialty, idx) => (
                  <span key={idx} style={{
                    background: 'var(--dark-glass)',
                    border: '1px solid var(--dark-border)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.75rem',
                    color: 'var(--dark-text-secondary)'
                  }}>
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <Link 
              to={`/shops?shop=${encodeURIComponent(shop.name)}`}
              className="cta-button-primary"
              style={{ 
                width: '100%', 
                justifyContent: 'center',
                textDecoration: 'none'
              }}
            >
              View Details <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link 
          to="/shops" 
          className="cta-button-secondary"
          style={{ textDecoration: 'none' }}
        >
          View All Shops <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default ShopsSection;
