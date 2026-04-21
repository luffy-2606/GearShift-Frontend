import React, { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';
import AppointmentBooking from './AppointmentBooking';
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
    return <div className="loading">Loading shops...</div>;
  }

  return (
    <div className="shops-list">
      <h2>Find Auto Repair Shops</h2>
      
      {/* Service Type Filter */}
      <div className="service-filters">
        <h3>Filter by Service:</h3>
        {['Oil Change', 'Brake Repair', 'Battery Replacement', 'Tire Service', 'Engine Diagnostic'].map(service => (
          <button
            key={service}
            className={`filter-btn ${filters.service_type === service ? 'active' : ''}`}
            onClick={() => handleServiceFilter(service)}
          >
            {service}
          </button>
        ))}
      </div>

      {/* Shops Grid */}
      <div className="shops-grid">
        {shops.map(shop => (
          <ShopCard key={shop.id} shop={shop} onBookAppointment={handleBookAppointment} />
        ))}
      </div>

      {shops.length === 0 && (
        <div className="no-shops">
          <p>No shops found matching your criteria.</p>
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
    <div className="shop-card">
      <div className="shop-header">
        <h3>{shop.name}</h3>
        <div className="rating">
          {'\u2b50'} {shop.average_rating.toFixed(1)} ({shop.total_reviews} reviews)
        </div>
      </div>
      
      <p className="shop-description">{shop.description}</p>
      
      <div className="shop-info">
        <p><strong>Address:</strong> {shop.address}</p>
        <p><strong>Phone:</strong> {shop.phone}</p>
        {shop.owner && (
          <p><strong>Owner:</strong> {shop.owner.first_name} {shop.owner.last_name}</p>
        )}
      </div>

      <button 
        className="show-services-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide' : 'View'} Services
      </button>

      {showDetails && (
        <div className="services-section">
          <h4>Available Services:</h4>
          <div className="services-list">
            {(shop.available_services || []).map(service => (
              <label key={service.id} className="service-item">
                <input
                  type="checkbox"
                  checked={selectedServices.find(s => s.id === service.id)}
                  onChange={() => handleServiceToggle(service)}
                />
                {service.name} - ${service.base_price?.toFixed(2) || 'N/A'}
              </label>
            ))}
          </div>
          
          {selectedServices.length > 0 && (
            <button className="book-btn" onClick={handleBookAppointment}>
              Book Appointment ({selectedServices.length} services)
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopsList;
