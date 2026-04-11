import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'BMW Owner',
      rating: 5,
      content: 'GearShift made finding a reliable mechanic so easy. The shop recommendations were spot-on, and the pricing was transparent. No more guesswork!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100'
    },
    {
      name: 'Mike Chen',
      role: 'Honda Civic',
      rating: 5,
      content: 'As someone who knows nothing about cars, this platform is a lifesaver. The diagnostic tools helped me understand what my car needed before I even went to the shop.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Ford F-150',
      rating: 5,
      content: 'The booking system is incredible. I scheduled a service at 10 PM and got confirmation by morning. The mechanic was professional and the price was exactly as quoted.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={16} 
        className="hero-stat-icon" 
        fill={i < rating ? 'currentColor' : 'none'}
        style={{ color: i < rating ? '#fbbf24' : 'var(--dark-text-muted)' }}
      />
    ));
  };

  return (
    <section className="landing-section landing-section-dark">
      <div className="section-header">
        <h2 className="section-title">What Drivers Say</h2>
        <p className="section-subtitle">
          Real stories from real customers who trust GearShift for their automotive needs.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="feature-card" style={{ textAlign: 'center' }}>
            <Quote 
              size={32} 
              style={{ 
                color: 'var(--dark-accent)', 
                opacity: 0.3, 
                marginBottom: '1.5rem' 
              }} 
            />
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="feature-description" style={{ 
                fontStyle: 'italic',
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                "{testimonial.content}"
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: `url(${testimonial.avatar}) center/cover`,
                border: '2px solid var(--dark-accent)'
              }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ 
                  fontWeight: '700', 
                  color: 'var(--dark-text)',
                  marginBottom: '0.25rem'
                }}>
                  {testimonial.name}
                </div>
                <div style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--dark-text-secondary)' 
                }}>
                  {testimonial.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
