import React, { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';
import { Star, Search, Filter, MapPin, Phone, Mail, Wrench, User, Clock, DollarSign } from 'lucide-react';
import './MechanicsList.css';

const MechanicsList = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    latitude: null,
    longitude: null,
    radius: 50,
    service_type: '',
    specialization: ''
  });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFilters(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const fetchMechanics = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      // Only add location params if we have coordinates
      if (filters.latitude && filters.longitude) {
        params.append('latitude', filters.latitude);
        params.append('longitude', filters.longitude);
        params.append('radius', filters.radius);
      }
      
      // Only add filter params if they're not empty
      if (filters.service_type) {
        params.append('service_type', filters.service_type);
      }
      
      if (filters.specialization) {
        params.append('specialization', filters.specialization);
      }

      const response = await apiClient.get(`/api/mechanics?${params}`);
      
      if (response.data.success) {
        setMechanics(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching mechanics:', error);
      // Don't clear mechanics on error, just log it
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMechanics();
    getUserLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchMechanics();
  }, [filters.service_type, filters.specialization, filters.radius]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleServiceFilter = (serviceType) => {
    setFilters(prev => ({
      ...prev,
      service_type: serviceType === prev.service_type ? '' : serviceType
    }));
  };

  const handleSpecializationFilter = (specialization) => {
    setFilters(prev => ({
      ...prev,
      specialization: specialization === prev.specialization ? '' : specialization
    }));
  };

  if (loading) {
    return (
      <div className="mechanics-list-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Finding the best mechanics for you...</p>
        </div>
      </div>
    );
  }

  const filteredMechanics = mechanics.filter(mechanic => 
    `${mechanic.first_name} ${mechanic.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mechanic.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mechanic.bio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mechanics-list-container landing-section landing-section-dark">
      {/* Header Section */}
      <div className="section-header">
        <h2 className="section-title">Find <span style={{ color: 'var(--dark-accent)' }}>Expert Mechanics</span></h2>
        <p className="section-subtitle">
          Connect with skilled automotive professionals. Compare ratings, specializations, and find the perfect mechanic for your vehicle needs.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div style={{
        background: 'var(--dark-surface)',
        border: '1px solid var(--dark-border)',
        borderRadius: 'var(--radius)',
        padding: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'var(--dark-glass)',
            border: '1px solid var(--dark-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem 1rem',
            color: 'var(--dark-text)'
          }}>
            <Search size={20} className="hero-stat-icon" />
            <input
              type="text"
              placeholder="Search by name, specialization, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--dark-text)',
                fontSize: '0.95rem',
                outline: 'none',
                width: '100%'
              }}
            />
          </div>
        </div>

        {/* Service Type Filters */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            color: 'var(--dark-text-muted)',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            <Wrench size={16} />
            Filter by Service:
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            {['Oil Change', 'Brake Repair', 'Engine Diagnostics', 'Transmission', 'Electrical', 'Tire Service'].map(service => (
              <button
                key={service}
                className={`service-filter-btn ${filters.service_type === service ? 'active' : ''}`}
                onClick={() => handleServiceFilter(service)}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Specialization Filters */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            color: 'var(--dark-text-muted)',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            <User size={16} />
            Filter by Specialization:
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            {['Engine Specialist', 'Transmission Expert', 'Electrical Systems', 'Brake Specialist', 'General Mechanic'].map(spec => (
              <button
                key={spec}
                className={`service-filter-btn ${filters.specialization === spec ? 'active' : ''}`}
                onClick={() => handleSpecializationFilter(spec)}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      {filteredMechanics.length > 0 && (
        <div style={{
          color: 'var(--dark-text-muted)',
          fontSize: '0.875rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Found {filteredMechanics.length} {filteredMechanics.length === 1 ? 'mechanic' : 'mechanics'} matching your criteria
        </div>
      )}

      {/* Mechanics Grid */}
      <div className="mechanics-grid-modern">
        {filteredMechanics.map(mechanic => (
          <MechanicCard key={mechanic.id} mechanic={mechanic} />
        ))}
      </div>

      {filteredMechanics.length === 0 && (
        <div className="no-mechanics-state">
          <div style={{
            background: 'var(--dark-surface)',
            border: '1px solid var(--dark-border)',
            borderRadius: 'var(--radius)',
            padding: '4rem 2rem',
            textAlign: 'center',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <div style={{
              fontSize: '3rem',
              color: 'var(--dark-text-muted)',
              marginBottom: '1rem'
            }}>
              🔧
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--dark-text)',
              margin: '0 0 1rem'
            }}>
              No Mechanics Found
            </h3>
            <p style={{
              color: 'var(--dark-text-secondary)',
              margin: '0',
              lineHeight: '1.6'
            }}>
              Try adjusting your search terms or filters to find more options.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const MechanicCard = ({ mechanic }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDistance = (distance) => {
    if (distance === null) return 'Distance unknown';
    return `${distance.toFixed(1)} miles`;
  };

  return (
    <div className="mechanic-card-modern">
      {/* Mechanic Header */}
      <div className="mechanic-card-header">
        <div>
          <h3 className="mechanic-card-title">
            {mechanic.first_name} {mechanic.last_name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Star size={16} className="hero-stat-icon" fill="currentColor" />
              <span style={{ fontWeight: '700', color: 'var(--dark-text)' }}>
                {mechanic.average_rating?.toFixed(1) || 'N/A'}
              </span>
            </div>
            <span style={{ color: 'var(--dark-text-muted)', fontSize: '0.875rem' }}>
              ({mechanic.total_reviews || 0} reviews)
            </span>
          </div>
        </div>
        
        <div style={{
          background: mechanic.is_independent ? 'var(--dark-accent)' : 'var(--dark-glass-border)',
          color: 'var(--dark-text)',
          padding: '0.25rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '600'
        }}>
          {mechanic.is_independent ? 'Independent' : 'Shop'}
        </div>
      </div>

      {/* Shop Information */}
      {mechanic.shop_address && (
        <div className="mechanic-card-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <MapPin size={14} className="hero-stat-icon" />
            <span style={{ fontSize: '0.875rem', color: 'var(--dark-text-secondary)' }}>
              {mechanic.shop_address}
            </span>
          </div>
          
          {mechanic.shop_phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Phone size={14} className="hero-stat-icon" />
              <span style={{ fontSize: '0.875rem', color: 'var(--dark-text-secondary)' }}>
                {mechanic.shop_phone}
              </span>
            </div>
          )}
          
          {mechanic.distance !== null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={14} className="hero-stat-icon" />
              <span style={{ fontSize: '0.875rem', color: 'var(--dark-text-secondary)' }}>
                {formatDistance(mechanic.distance)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Specializations */}
      {mechanic.specialization && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--dark-text-muted)',
            marginBottom: '0.75rem',
            fontWeight: '600'
          }}>
            <Wrench size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Specializations:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {(Array.isArray(mechanic.specialization) ? mechanic.specialization : [mechanic.specialization]).map(spec => (
              <span key={spec} style={{
                background: 'var(--dark-glass)',
                border: '1px solid var(--dark-border)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.375rem 0.875rem',
                fontSize: '0.75rem',
                color: 'var(--dark-text-secondary)',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}>
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience and Rate Info */}
      <div className="mechanic-card-meta">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Clock size={14} className="hero-stat-icon" />
          <span style={{ fontSize: '0.875rem', color: 'var(--dark-text-secondary)' }}>
            {mechanic.years_experience || 'N/A'} years experience
          </span>
        </div>
        
        {mechanic.hourly_rate && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <DollarSign size={14} className="hero-stat-icon" />
            <span style={{ fontSize: '0.875rem', color: 'var(--dark-text-secondary)' }}>
              ${mechanic.hourly_rate}/hour
            </span>
          </div>
        )}
      </div>

      {/* Contact Toggle */}
      <button 
        className="contact-toggle-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        <Mail size={16} style={{ marginRight: '0.5rem' }} />
        {showDetails ? 'Hide' : 'View'} Contact Details
      </button>

      {/* Contact Details */}
      {showDetails && (
        <div className="contact-details-modern">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              background: 'var(--dark-glass)',
              borderRadius: 'var(--radius-sm)'
            }}>
              <Mail size={14} className="hero-stat-icon" />
              <span style={{ fontSize: '0.875rem', color: 'var(--dark-text-secondary)' }}>
                {mechanic.email}
              </span>
            </div>
            
            {mechanic.phone && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'var(--dark-glass)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <Phone size={14} className="hero-stat-icon" />
                <span style={{ fontSize: '0.875rem', color: 'var(--dark-text-secondary)' }}>
                  {mechanic.phone}
                </span>
              </div>
            )}
            
            {mechanic.business_name && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'var(--dark-glass)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <User size={14} className="hero-stat-icon" />
                <span style={{ fontSize: '0.875rem', color: 'var(--dark-text-secondary)' }}>
                  {mechanic.business_name}
                </span>
              </div>
            )}
          </div>
          
          {mechanic.bio && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'var(--dark-glass)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--dark-border)'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--dark-text-secondary)',
                margin: 0,
                lineHeight: '1.6',
                fontStyle: 'italic'
              }}>
                "{mechanic.bio}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MechanicsList;
