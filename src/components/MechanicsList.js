import React, { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';
import './MechanicsList.css';

const MechanicsList = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
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
    return <div className="loading">Loading mechanics...</div>;
  }

  return (
    <div className="mechanics-list">
      <h2>Find Mechanics</h2>
      
      {/* Service Type Filter */}
      <div className="service-filters">
        <h3>Filter by Service:</h3>
        {['Oil Change', 'Brake Repair', 'Engine Diagnostics', 'Transmission', 'Electrical', 'Tire Service'].map(service => (
          <button 
            key={service}
            className={`filter-btn ${filters.service_type === service ? 'active' : ''}`}
            onClick={() => handleServiceFilter(service)}
          >
            {service}
          </button>
        ))}
      </div>

      {/* Specialization Filter */}
      <div className="specialization-filters">
        <h3>Filter by Specialization:</h3>
        {['Engine Specialist', 'Transmission Expert', 'Electrical Systems', 'Brake Specialist', 'General Mechanic'].map(spec => (
          <button 
            key={spec}
            className={`filter-btn ${filters.specialization === spec ? 'active' : ''}`}
            onClick={() => handleSpecializationFilter(spec)}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Mechanics Grid */}
      <div className="mechanics-grid">
        {mechanics.map(mechanic => (
          <MechanicCard key={mechanic.id} mechanic={mechanic} />
        ))}
      </div>

      {mechanics.length === 0 && (
        <div className="no-mechanics">
          <p>No mechanics found matching your criteria.</p>
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
    <div className="mechanic-card">
      <div className="mechanic-header">
        <div className="mechanic-info">
          <h3>{mechanic.first_name} {mechanic.last_name}</h3>
          <div className="rating">
            {'\u2b50'} {mechanic.average_rating?.toFixed(1) || 'N/A'} ({mechanic.total_reviews || 0} reviews)
          </div>
        </div>
        <div className="mechanic-type">
          {mechanic.is_independent ? (
            <span className="independent-badge">Independent Mechanic</span>
          ) : (
            <span className="shop-badge">Shop Mechanic</span>
          )}
        </div>
      </div>

      {/* Shop Information */}
      {mechanic.shop_address && (
        <div className="shop-info">
          <h4>Shop Address: {mechanic.shop_address}</h4>
          {mechanic.shop_phone && <p>Phone: {mechanic.shop_phone}</p>}
          {mechanic.distance !== null && (
            <p className="distance">{formatDistance(mechanic.distance)}</p>
          )}
        </div>
      )}

      {/* Specializations */}
      {mechanic.specialization && (
        <div className="specializations">
          <h4>Specializations:</h4>
          <div className="specialization-tags">
            {(Array.isArray(mechanic.specialization) ? mechanic.specialization : [mechanic.specialization]).map(spec => (
              <span key={spec} className="tag">{spec}</span>
            ))}
          </div>
        </div>
      )}

      {/* Experience and Bio */}
      <div className="mechanic-bio">
        <p><strong>Experience:</strong> {mechanic.years_experience || 'N/A'} years</p>
        {mechanic.bio && (
          <p><strong>Bio:</strong> {mechanic.bio}</p>
        )}
        {mechanic.hourly_rate && (
          <p><strong>Hourly Rate:</strong> ${mechanic.hourly_rate}/hour</p>
        )}
      </div>

      {/* Contact Information */}
      <div className="contact-info">
        <p><strong>Email:</strong> {mechanic.email}</p>
        {mechanic.phone && <p><strong>Phone:</strong> {mechanic.phone}</p>}
      </div>

      {/* Business Information */}
      {mechanic.business_name && (
        <div className="business-info">
          <p><strong>Business:</strong> {mechanic.business_name}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mechanic-actions">
        <button 
          className="details-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>

      {/* Detailed Reviews */}
      {showDetails && (
        <div className="detailed-reviews">
          <h4>Ratings Breakdown:</h4>
          <div className="rating-breakdown">
            <div className="rating-item">
              <span>Service Quality:</span>
              <span>{(mechanic.avg_service_rating || 0).toFixed(1)} \u2b50</span>
            </div>
            <div className="rating-item">
              <span>Communication:</span>
              <span>{(mechanic.avg_communication_rating || 0).toFixed(1)} \u2b50</span>
            </div>
            <div className="rating-item">
              <span>Professionalism:</span>
              <span>{(mechanic.avg_professionalism_rating || 0).toFixed(1)} \u2b50</span>
            </div>
            <div className="rating-item">
              <span>Price:</span>
              <span>{(mechanic.avg_price_rating || 0).toFixed(1)} \u2b50</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MechanicsList;
