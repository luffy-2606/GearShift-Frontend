import React, { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';
import AppointmentBooking from './AppointmentBooking';
import { Star, MapPin, Phone, User, Wrench, Search, Filter, ArrowRight } from 'lucide-react';
import './ShopsList.css';

const ShopsList = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    latitude: null,
    longitude: null,
    radius: 50,
    service_type: ''
  });
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    shop: null,
    selectedServices: []
  });
  const [searchTerm, setSearchTerm] = useState('');

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

  const fetchShops = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      // Only add location params if we have coordinates
      if (filters.latitude && filters.longitude) {
        params.append('latitude', filters.latitude);
        params.append('longitude', filters.longitude);
        params.append('radius', filters.radius);
      }
      
      // Only add service filter if it's not empty
      if (filters.service_type) {
        params.append('service_type', filters.service_type);
      }

      const response = await apiClient.get(`/api/shops?${params}`);
      
      if (response.data.success) {
        setShops(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
      // Don't clear shops on error, just log it
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
    getUserLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchShops();
  }, [filters.service_type, filters.radius]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleServiceFilter = (serviceType) => {
    setFilters(prev => ({
      ...prev,
      service_type: serviceType === filters.service_type ? '' : serviceType
    }));
  };

  const handleBookAppointment = (shop, selectedServices) => {
    setBookingModal({
      isOpen: true,
      shop,
      selectedServices
    });
  };

  const handleCloseBooking = () => {
    setBookingModal({
      isOpen: false,
      shop: null,
      selectedServices: []
    });
  };

  if (loading) {
    return (
      <div className="shops-list-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Finding the best shops for you...</p>
        </div>
      </div>
    );
  }

  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shops-list-container landing-section landing-section-dark">
      {/* Header Section */}
      <div className="section-header">
        <h2 className="section-title">Find <span style={{ color: 'var(--dark-accent)' }}>Auto Repair Shops</span></h2>
        <p className="section-subtitle">
          Discover trusted automotive professionals in your area. Compare services, read reviews, and book with confidence.
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
              placeholder="Search by shop name, location, or services..."
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
            <Filter size={16} />
            Filter by Service:
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            {['Oil Change', 'Brake Repair', 'Battery Replacement', 'Tire Service', 'Engine Diagnostic'].map(service => (
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
      </div>

      {/* Results Count */}
      {filteredShops.length > 0 && (
        <div style={{
          color: 'var(--dark-text-muted)',
          fontSize: '0.875rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Found {filteredShops.length} {filteredShops.length === 1 ? 'shop' : 'shops'} matching your criteria
        </div>
      )}

      {/* Shops Grid */}
      <div className="shops-grid-modern">
        {filteredShops.map(shop => (
          <ShopCard key={shop.id} shop={shop} onBookAppointment={handleBookAppointment} />
        ))}
      </div>

      {filteredShops.length === 0 && (
        <div className="no-shops-state">
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
              🔍
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--dark-text)',
              margin: '0 0 1rem'
            }}>
              No Shops Found
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

      {/* Booking Modal */}
      {bookingModal.isOpen && (
        <AppointmentBooking
          shop={bookingModal.shop}
          selectedServices={bookingModal.selectedServices}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );
};

const ShopCard = ({ shop, onBookAppointment }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceToggle = (service) => {
    setSelectedServices(prev => 
      prev.find(s => s.id === service.id) 
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  const handleBookAppointment = () => {
    if (selectedServices.length === 0) {
      alert('Please select at least one service');
      return;
    }
    
    onBookAppointment(shop, selectedServices);
  };

  return (
    <div className="shop-card-modern">
      {/* Shop Header */}
      <div className="shop-card-header">
        <div>
          <h3 className="shop-card-title">{shop.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Star size={16} className="hero-stat-icon" fill="currentColor" />
              <span style={{ fontWeight: '700', color: 'var(--dark-text)' }}>
                {shop.average_rating?.toFixed(1) || 'N/A'}
              </span>
            </div>
            <span style={{ color: 'var(--dark-text-muted)', fontSize: '0.875rem' }}>
              ({shop.total_reviews || 0} reviews)
            </span>
          </div>
        </div>
        
        {shop.average_rating >= 4.5 && (
          <div style={{
            background: 'var(--dark-accent)',
            color: 'var(--dark-text)',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            Top Rated
          </div>
        )}
      </div>
      
      {/* Shop Description */}
      <p className="shop-card-description">
        {shop.description || 'Professional automotive services with experienced technicians.'}
      </p>
      
      {/* Shop Info */}
      <div className="shop-card-info">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <MapPin size={14} className="hero-stat-icon" />
          <span style={{ fontSize: '0.875rem', color: 'var(--dark-text-secondary)' }}>
            {shop.address || 'Location not available'}
          </span>
        </div>
        
        {shop.phone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Phone size={14} className="hero-stat-icon" />
            <span style={{ fontSize: '0.875rem', color: 'var(--dark-text-secondary)' }}>
              {shop.phone}
            </span>
          </div>
        )}
        
        {shop.owner && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={14} className="hero-stat-icon" />
            <span style={{ fontSize: '0.875rem', color: 'var(--dark-text-secondary)' }}>
              {shop.owner.first_name} {shop.owner.last_name}
            </span>
          </div>
        )}
      </div>

      {/* Services Toggle */}
      <button 
        className="services-toggle-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        <Wrench size={16} style={{ marginRight: '0.5rem' }} />
        {showDetails ? 'Hide' : 'View'} Available Services
        <ArrowRight size={14} style={{ 
          marginLeft: '0.5rem',
          transform: showDetails ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }} />
      </button>

      {/* Services Section */}
      {showDetails && (
        <div className="services-section-modern">
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--dark-text)',
            margin: '0 0 1rem'
          }}>
            Available Services:
          </h4>
          <div className="services-list-modern">
            {(shop.available_services || []).map(service => (
              <label key={service.id} className="service-item-modern">
                <input
                  type="checkbox"
                  checked={selectedServices.find(s => s.id === service.id)}
                  onChange={() => handleServiceToggle(service)}
                />
                <div className="service-item-content">
                  <span className="service-name">{service.name}</span>
                  <span className="service-price">
                    ${service.base_price?.toFixed(2) || 'N/A'}
                  </span>
                </div>
              </label>
            ))}
          </div>
          
          {selectedServices.length > 0 && (
            <button className="book-appointment-btn" onClick={handleBookAppointment}>
              Book Appointment ({selectedServices.length} service{selectedServices.length > 1 ? 's' : ''})
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopsList;
