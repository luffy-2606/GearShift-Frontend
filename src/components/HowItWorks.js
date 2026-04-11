import React from 'react';
import { Search, Wrench, Calendar } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      icon: <Search size={24} />,
      title: 'Find Local Shops',
      description: 'Search our network of verified automotive shops in your area. Filter by services, ratings, and availability.'
    },
    {
      number: '2',
      icon: <Wrench size={24} />,
      title: 'Book Service',
      description: 'Schedule appointments instantly. Get transparent pricing and real-time availability from trusted mechanics.'
    },
    {
      number: '3',
      icon: <Calendar size={24} />,
      title: 'Track & Maintain',
      description: 'Keep complete service history, receive maintenance reminders, and get insights about your vehicle\'s health.'
    }
  ];

  return (
    <section className="landing-section landing-section-dark">
      <div className="section-header">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Getting your car serviced has never been easier. Three simple steps to connect with trusted automotive professionals.
        </p>
      </div>

      <div className="steps-grid">
        {steps.map((step) => (
          <div key={step.number} className="step-card">
            <div className="step-number">
              {step.icon}
            </div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
