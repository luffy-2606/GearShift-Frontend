import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Star } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="landing-section landing-section-dark">
      <div className="cta-section">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'var(--dark-accent)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Wrench size={32} style={{ color: 'var(--dark-text)' }} />
            </div>
          </div>

          <h2 className="cta-title">
            Ready to Take Control of Your Car's Health?
          </h2>
          
          <p className="cta-description">
            Join thousands of drivers who trust GearShift for transparent pricing, 
            verified mechanics, and smart automotive insights. Get started today - it's free.
          </p>

          <div className="cta-buttons">
            <Link 
              to="/shops" 
              className="cta-button-primary"
              style={{ textDecoration: 'none' }}
            >
              Find Shops Now <ArrowRight size={16} />
            </Link>
            
            <Link 
              to="/profile" 
              className="cta-button-secondary"
              style={{ textDecoration: 'none' }}
            >
              Create Account <Star size={16} />
            </Link>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'var(--dark-glass)',
            border: '1px solid var(--dark-border)',
            borderRadius: 'var(--radius)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '1rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: 'var(--dark-text)',
                  marginBottom: '0.25rem'
                }}>
                  150K+
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--dark-text-secondary)'
                }}>
                  Active Drivers
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: 'var(--dark-text)',
                  marginBottom: '0.25rem'
                }}>
                  4.9★
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--dark-text-secondary)'
                }}>
                  Average Rating
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: 'var(--dark-text)',
                  marginBottom: '0.25rem'
                }}>
                  2.4K
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--dark-text-secondary)'
                }}>
                  Partner Shops
                </div>
              </div>
            </div>
            
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--dark-text-muted)',
              margin: 0
            }}>
              No credit card required • Free to join • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
