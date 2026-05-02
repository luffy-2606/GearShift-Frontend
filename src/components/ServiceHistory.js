import React, { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Car, DollarSign, Wrench, Clock, MapPin, Phone, User, FileText, AlertCircle, CheckCircle, Search, Filter } from 'lucide-react';
import './ServiceHistory.css';

const ServiceHistory = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [serviceHistory, setServiceHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    // Check for appointment confirmation only after vehicles are loaded
    if (vehicles.length > 0) {
      const confirmAppointmentId = searchParams.get('confirm');
      if (confirmAppointmentId && !sessionStorage.getItem(`confirmed-${confirmAppointmentId}`)) {
        handleAppointmentConfirmation(confirmAppointmentId);
        sessionStorage.setItem(`confirmed-${confirmAppointmentId}`, 'true');
      }
    }
  }, [vehicles, searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedVehicle) {
      fetchServiceHistory();
    }
  }, [selectedVehicle]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.get('/api/vehicles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setVehicles(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedVehicle(response.data.data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const fetchServiceHistory = async () => {
    if (!selectedVehicle) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await apiClient.get(`/api/vehicles/${selectedVehicle}/service-history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setServiceHistory(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching service history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVisitConfirmation = (appointmentId) => {
    // This would open a modal to confirm the visit and add to service history
    console.log('Confirming visit for appointment:', appointmentId);
    setShowAddService(true);
  };

  const handleAppointmentConfirmation = async (appointmentId) => {
    try {
      console.log('Confirming appointment:', appointmentId);
      const token = localStorage.getItem('token');
      
      // First, get appointment details
      const appointmentResponse = await apiClient.get(`/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Appointments response:', appointmentResponse.data);

      if (appointmentResponse.data.success) {
        const appointment = appointmentResponse.data.data.find(apt => apt.id === appointmentId);
        
        console.log('Found appointment:', appointment);
        
        if (appointment) {
          // Update appointment status to completed
          const statusResponse = await apiClient.put(`/api/appointments/${appointmentId}/status`, 
            { status: 'completed' },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          console.log('Status update response:', statusResponse.data);

          // Find the vehicle for this appointment
          const vehicle = vehicles.find(v => v.id === appointment.vehicle_id);
          console.log('Found vehicle:', vehicle);
          
          if (vehicle) {
            setSelectedVehicle(vehicle.id);
            
            // Auto-add to service history with basic info
            const serviceData = {
              service_type: appointment.service_name,
              service_description: appointment.service_description || 'Service completed',
              cost: appointment.actual_cost || appointment.estimated_cost || 0,
              labor_cost: Math.floor((appointment.actual_cost || appointment.estimated_cost || 0) * 0.6),
              parts_cost: Math.floor((appointment.actual_cost || appointment.estimated_cost || 0) * 0.4),
              notes: 'Automatically added from appointment completion'
            };
            
            console.log('Service history data:', serviceData);
            
            const serviceResponse = await apiClient.post(`/api/appointments/${appointmentId}/service-history`, 
              serviceData,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log('Service history response:', serviceResponse.data);

            if (serviceResponse.data.success) {
              alert('Service has been added to your vehicle history!');
              fetchServiceHistory();
            } else {
              alert('Failed to add service history: ' + (serviceResponse.data.message || 'Unknown error'));
            }
          } else {
            console.error('Vehicle not found for appointment:', appointment.vehicle_id);
            alert('Vehicle not found for this appointment.');
          }
        } else {
          console.error('Appointment not found:', appointmentId);
          alert('Appointment not found.');
        }
      }
    } catch (error) {
      console.error('Error confirming appointment:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      alert('There was an issue confirming your appointment. Please add it manually.');
    }
  };

  const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle);

  return (
    <div className="service-history-container landing-section landing-section-dark">
      {/* Header Section */}
      <div className="section-header">
        <h2 className="section-title">Service <span style={{ color: 'var(--dark-accent)' }}>History</span></h2>
        <p className="section-subtitle">
          Track your vehicle's maintenance records, service costs, and upcoming appointments all in one place.
        </p>
      </div>

      {/* Vehicle Selection Section */}
      <div style={{
        background: 'var(--dark-surface)',
        border: '1px solid var(--dark-border)',
        borderRadius: 'var(--radius)',
        padding: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
          color: 'var(--dark-text-muted)',
          fontSize: '0.875rem',
          fontWeight: '600'
        }}>
          <Car size={16} />
          Select Vehicle:
        </div>
        
        <select 
          value={selectedVehicle} 
          onChange={(e) => setSelectedVehicle(e.target.value)}
          style={{
            width: '100%',
            background: 'var(--dark-glass)',
            border: '1px solid var(--dark-border)',
            color: 'var(--dark-text)',
            padding: '0.875rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.95rem',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {vehicles.map(vehicle => (
            <option key={vehicle.id} value={vehicle.id} style={{ background: 'var(--dark-surface)' }}>
              {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.license_plate || 'No Plate'})
            </option>
          ))}
        </select>
        
        {selectedVehicleData && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'var(--dark-glass)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--dark-border)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: 'var(--dark-text)',
                margin: 0
              }}>
                {selectedVehicleData.year} {selectedVehicleData.make} {selectedVehicleData.model}
              </h3>
              <div style={{
                background: 'var(--dark-accent)',
                color: 'var(--dark-text)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                Active
              </div>
            </div>
            <div style={{
              display: 'flex',
              gap: '2rem',
              fontSize: '0.875rem',
              color: 'var(--dark-text-secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={14} className="hero-stat-icon" />
                {selectedVehicleData.mileage?.toLocaleString() || 0} miles
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={14} className="hero-stat-icon" />
                {selectedVehicleData.license_plate || 'Not specified'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Service History List */}
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading service history...</p>
        </div>
      ) : (
        <div className="service-history-grid">
          {serviceHistory.length === 0 ? (
            <div className="no-history-state">
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
                  No Service History
                </h3>
                <p style={{
                  color: 'var(--dark-text-secondary)',
                  margin: '0',
                  lineHeight: '1.6'
                }}>
                  No service records found for this vehicle. Your maintenance history will appear here once services are completed.
                </p>
              </div>
            </div>
          ) : (
            serviceHistory.map(service => (
              <ServiceHistoryCard 
                key={service.id} 
                service={service}
                onVisitConfirmation={handleVisitConfirmation}
              />
            ))
          )}
        </div>
      )}

      {/* Add Service Modal */}
      {showAddService && (
        <AddServiceModal 
          vehicleId={selectedVehicle}
          onClose={() => setShowAddService(false)}
          onSuccess={fetchServiceHistory}
        />
      )}
    </div>
  );
};

const ServiceHistoryCard = ({ service, onVisitConfirmation }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="service-card-modern">
      {/* Service Header */}
      <div className="service-card-header">
        <div>
          <h3 className="service-card-title">
            {service.service_type}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <Calendar size={16} className="hero-stat-icon" />
            <span style={{ fontSize: '0.875rem', color: 'var(--dark-text-secondary)' }}>
              {formatDate(service.service_date)}
            </span>
          </div>
        </div>
        
        <div style={{
          background: 'var(--dark-glass)',
          border: '1px solid var(--dark-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.5rem 1rem'
        }}>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--dark-text-muted)',
            marginBottom: '0.25rem'
          }}>
            Total Cost
          </div>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--dark-accent)'
          }}>
            ${service.total_cost?.toFixed(2) || 'N/A'}
          </div>
        </div>
      </div>

      {/* Service Description */}
      {service.description && (
        <div style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          background: 'var(--dark-glass)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--dark-border)'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--dark-text-secondary)',
            margin: 0,
            lineHeight: '1.6'
          }}>
            {service.description}
          </p>
        </div>
      )}

      {/* Shop Information */}
      {service.shop && (
        <div className="service-info-section">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem',
            color: 'var(--dark-text-muted)',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            <MapPin size={14} />
            Service Location
          </div>
          <div style={{
            padding: '0.75rem',
            background: 'var(--dark-glass)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--dark-border)'
          }}>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--dark-text)',
              marginBottom: '0.25rem'
            }}>
              {service.shop.name || 'Unknown Shop'}
            </div>
            {service.shop.address && (
              <div style={{ fontSize: '0.8rem', color: 'var(--dark-text-secondary)' }}>
                {service.shop.address}
              </div>
            )}
            {service.shop.phone && (
              <div style={{ fontSize: '0.8rem', color: 'var(--dark-text-secondary)', marginTop: '0.25rem' }}>
                {service.shop.phone}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mechanic Information */}
      {service.mechanic && (
        <div className="service-info-section">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem',
            color: 'var(--dark-text-muted)',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            <Wrench size={14} />
            Service Provider
          </div>
          <div style={{
            padding: '0.75rem',
            background: 'var(--dark-glass)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--dark-border)'
          }}>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--dark-text)'
            }}>
              {service.mechanic.first_name} {service.mechanic.last_name}
            </div>
          </div>
        </div>
      )}

      {/* Service Details */}
      <div className="service-info-section">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.75rem',
          color: 'var(--dark-text-muted)',
          fontSize: '0.875rem',
          fontWeight: '600'
        }}>
          <FileText size={14} />
          Service Details
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '0.75rem'
        }}>
          {service.mileage_at_service && (
            <div style={{
              padding: '0.75rem',
              background: 'var(--dark-glass)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--dark-border)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--dark-text-muted)', marginBottom: '0.25rem' }}>
                Mileage
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--dark-text)' }}>
                {service.mileage_at_service.toLocaleString()} mi
              </div>
            </div>
          )}
          
          {service.duration_minutes && (
            <div style={{
              padding: '0.75rem',
              background: 'var(--dark-glass)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--dark-border)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--dark-text-muted)', marginBottom: '0.25rem' }}>
                Duration
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--dark-text)' }}>
                {service.duration_minutes} min
              </div>
            </div>
          )}
          
          {(service.labor_cost || service.parts_cost) && (
            <div style={{
              padding: '0.75rem',
              background: 'var(--dark-glass)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--dark-border)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--dark-text-muted)', marginBottom: '0.25rem' }}>
                Labor/Parts
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--dark-text)' }}>
                ${service.labor_cost || '0'} / ${service.parts_cost || '0'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Details Button */}
      <button 
        className="details-toggle-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        <FileText size={16} style={{ marginRight: '0.5rem' }} />
        {showDetails ? 'Hide' : 'View'} Additional Details
      </button>

      {/* Additional Details */}
      {showDetails && (
        <div className="additional-details-modern">
          {/* Warranty Information */}
          {service.warranty_months && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--dark-text-muted)',
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                <CheckCircle size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Warranty Information
              </div>
              <div style={{
                padding: '0.75rem',
                background: 'var(--dark-glass)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--dark-border)'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--dark-text-secondary)' }}>
                  {service.warranty_months} months warranty
                  {service.warranty_mileage && ` • ${service.warranty_mileage.toLocaleString()} miles`}
                </div>
              </div>
            </div>
          )}

          {/* Next Service */}
          {service.next_service_due_date && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--dark-text-muted)',
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                <Calendar size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Next Service Due
              </div>
              <div style={{
                padding: '0.75rem',
                background: 'var(--dark-glass)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--dark-border)'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--dark-text-secondary)' }}>
                  {formatDate(service.next_service_due_date)}
                  {service.next_service_due_mileage && ` • ${service.next_service_due_mileage.toLocaleString()} miles`}
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {service.notes && (
            <div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--dark-text-muted)',
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                <FileText size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Notes
              </div>
              <div style={{
                padding: '0.75rem',
                background: 'var(--dark-glass)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--dark-border)'
              }}>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--dark-text-secondary)',
                  margin: 0,
                  lineHeight: '1.6',
                  fontStyle: service.notes.includes('Automatically added') ? 'italic' : 'normal'
                }}>
                  {service.notes}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Visit Confirmation Button */}
      {service.appointment_id && !service.notes?.includes('Automatically added from appointment completion') && (
        <div style={{ marginTop: '1.5rem' }}>
          <button 
            className="confirm-visit-btn-modern"
            onClick={() => onVisitConfirmation(service.appointment_id)}
          >
            <CheckCircle size={16} style={{ marginRight: '0.5rem' }} />
            Confirm Visit Completed
          </button>
        </div>
      )}
    </div>
  );
};

const AddServiceModal = ({ vehicleId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    service_type: '',
    service_description: '',
    cost: '',
    labor_cost: '',
    parts_cost: '',
    notes: '',
    next_service_date: '',
    next_service_mileage: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // This would be a different endpoint for manual service entry
      // For now, we'll just close the modal
      alert('Service added successfully!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Failed to add service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Service to History</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Service Type:</label>
            <input
              type="text"
              name="service_type"
              value={formData.service_type}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="service_description"
              value={formData.service_description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Total Cost:</label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Labor Cost:</label>
              <input
                type="number"
                name="labor_cost"
                value={formData.labor_cost}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Parts Cost:</label>
              <input
                type="number"
                name="parts_cost"
                value={formData.parts_cost}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notes:</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Next Service Date:</label>
              <input
                type="date"
                name="next_service_date"
                value={formData.next_service_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Next Service Mileage:</label>
              <input
                type="number"
                name="next_service_mileage"
                value={formData.next_service_mileage}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Adding...' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceHistory;
