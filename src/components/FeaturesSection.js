import React from 'react';
import { MapPin, Star, Shield, Zap, Wrench, Clock } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <MapPin size={24} />,
      title: 'Local Shop Network',
      description: 'Access thousands of verified automotive shops and mechanics in your area with real-time availability and transparent pricing.'
    },
    {
      icon: <Star size={24} />,
      title: 'Verified Reviews',
      description: 'Read authentic reviews from real customers. Every shop is vetted and rated by our community of drivers.'
    },
    {
      icon: <Shield size={24} />,
      title: 'Quality Guarantee',
      description: 'All partner shops are background-checked and insured. Your satisfaction is guaranteed or we\'ll make it right.'
    },
    {
      icon: <Zap size={24} />,
      title: 'Smart Diagnostics',
      description: 'AI-powered diagnostic tools help you understand what your car needs before you even visit the shop.'
    },
    {
      icon: <Wrench size={24} />,
      title: 'Expert Mechanics',
      description: 'Connect with certified technicians who specialize in your vehicle make and model for the best service.'
    },
    {
      icon: <Clock size={24} />,
      title: 'Instant Booking',
      description: 'Schedule appointments 24/7. Get confirmed bookings and reminders sent directly to your phone.'
    }
  ];

  return (
    <section className="landing-section landing-section-dark">
      <div className="section-header">
        <h2 className="section-title">Why Choose GearShift</h2>
        <p className="section-subtitle">
          We're revolutionizing car maintenance with technology that puts you in control of your vehicle's health.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
