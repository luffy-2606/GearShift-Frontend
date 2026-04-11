import React from 'react';
import { Zap, Shield, Settings, Gauge, Battery, Wrench } from 'lucide-react';

const UpgradesSection = () => {
  const upgrades = [
    {
      icon: <Zap size={24} />,
      title: 'Performance Chips',
      description: 'Unlock your engine\'s full potential with ECU tuning and performance optimization.',
      category: 'Engine',
      popularity: 'High'
    },
    {
      icon: <Shield size={24} />,
      title: 'Brake Upgrades',
      description: 'Enhanced stopping power with performance brake pads, rotors, and calipers.',
      category: 'Safety',
      popularity: 'Medium'
    },
    {
      icon: <Settings size={24} />,
      title: 'Suspension Kits',
      description: 'Improve handling and comfort with coilover systems and performance shocks.',
      category: 'Handling',
      popularity: 'High'
    },
    {
      icon: <Gauge size={24} />,
      title: 'Exhaust Systems',
      description: 'Better airflow and sound with cat-back and performance exhaust upgrades.',
      category: 'Engine',
      popularity: 'High'
    },
    {
      icon: <Battery size={24} />,
      title: 'Cold Air Intakes',
      description: 'Increase horsepower and efficiency with improved air filtration systems.',
      category: 'Engine',
      popularity: 'Medium'
    },
    {
      icon: <Wrench size={24} />,
      title: 'Wheel Packages',
      description: 'Complete wheel and tire packages for improved style and performance.',
      category: 'Appearance',
      popularity: 'High'
    }
  ];

  const getPopularityColor = (popularity) => {
    switch(popularity) {
      case 'High': return '#dc2626';
      case 'Medium': return '#991b1b';
      case 'Low': return '#7f1d1d';
      default: return '#7f1d1d';
    }
  };

  return (
    <section className="landing-section landing-section-dark">
      <div className="section-header">
        <h2 className="section-title">Popular Upgrades</h2>
        <p className="section-subtitle">
          Discover the most popular vehicle upgrades and performance enhancements recommended by our community.
        </p>
      </div>

      <div className="features-grid">
        {upgrades.map((upgrade, index) => (
          <div key={index} className="feature-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div className="feature-icon" style={{ background: 'var(--dark-accent)' }}>
                {upgrade.icon}
              </div>
              <span style={{
                background: `${getPopularityColor(upgrade.popularity)}20`,
                color: getPopularityColor(upgrade.popularity),
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {upgrade.popularity}
              </span>
            </div>
            
            <h3 className="feature-title">{upgrade.title}</h3>
            <p className="feature-description">
              {upgrade.description}
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1rem'
            }}>
              <span style={{
                fontSize: '0.875rem',
                color: 'var(--dark-text-secondary)',
                fontWeight: '500'
              }}>
                {upgrade.category}
              </span>
              <button 
                className="btn-small"
                style={{ background: 'var(--dark-accent)' }}
                onClick={() => alert(`Learn more about ${upgrade.title}`)}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpgradesSection;
