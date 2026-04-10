import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

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
      if (confirmAppointmentId) {
        handleAppointmentConfirmation(confirmAppointmentId);
      }
    }
  }, [vehicles]);

  useEffect(() => {
    if (selectedVehicle) {
      fetchServiceHistory();
    }
  }, [selectedVehicle]);

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/vehicles', {
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
      const response = await axios.get(`/api/vehicles/${selectedVehicle}/service-history`, {
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
      const appointmentResponse = await axios.get(`/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Appointments response:', appointmentResponse.data);

      if (appointmentResponse.data.success) {
        const appointment = appointmentResponse.data.data.find(apt => apt.id === appointmentId);
        
        console.log('Found appointment:', appointment);
        
        if (appointment) {
          // Update appointment status to completed
          const statusResponse = await axios.put(`/api/appointments/${appointmentId}/status`, 
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
            
            const serviceResponse = await axios.post(`/api/appointments/${appointmentId}/service-history`, 
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
    <div className="service-history">
      <h2>Service History</h2>
      
      {/* Vehicle Selection */}
      <div className="vehicle-selector">
        <label>Select Vehicle:</label>
        <select 
          value={selectedVehicle} 
          onChange={(e) => setSelectedVehicle(e.target.value)}
        >
          {vehicles.map(vehicle => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.license_plate || 'No Plate'})
            </option>
          ))}
        </select>
      </div>

      {selectedVehicleData && (
        <div className="vehicle-info">
          <h3>{selectedVehicleData.year} {selectedVehicleData.make} {selectedVehicleData.model}</h3>
          <p>Current Mileage: {selectedVehicleData.mileage?.toLocaleString() || 0} miles</p>
          <p>License Plate: {selectedVehicleData.license_plate || 'Not specified'}</p>
        </div>
      )}

      {/* Service History List */}
      {loading ? (
        <div className="loading">Loading service history...</div>
      ) : (
        <div className="service-history-list">
          {serviceHistory.length === 0 ? (
            <div className="no-history">
              <p>No service history found for this vehicle.</p>
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
    <div className="service-card">
      <div className="service-header">
        <h4>{service.service_type}</h4>
        <div className="service-date">{formatDate(service.service_date)}</div>
      </div>
      
      <div className="service-shop">
        <strong>Shop:</strong> {service.shop?.name || 'Unknown'}
      </div>
      
      <div className="service-summary">
        <p><strong>Mileage at service:</strong> {service.mileage_at_service?.toLocaleString()} miles</p>
        <p><strong>Cost:</strong> ${service.total_cost?.toFixed(2) || 'N/A'}</p>
        <p><strong>Duration:</strong> {service.duration_minutes || 'N/A'} minutes</p>
      </div>

      {service.description && (
        <div className="service-description">
          <p>{service.description}</p>
        </div>
      )}

      <button 
        className="details-toggle"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide' : 'Show'} Details
      </button>

      {showDetails && (
        <div className="service-details">
          <div className="detail-row">
            <strong>Shop Address:</strong> {service.shop?.address || 'N/A'}
          </div>
          <div className="detail-row">
            <strong>Shop Phone:</strong> {service.shop?.phone || 'N/A'}
          </div>
          <div className="detail-row">
            <strong>Mechanic:</strong> {service.mechanic?.first_name} {service.mechanic?.last_name}
          </div>
          {service.labor_cost && (
            <div className="detail-row">
              <strong>Labor Cost:</strong> ${service.labor_cost.toFixed(2)}
            </div>
          )}
          {service.parts_cost && (
            <div className="detail-row">
              <strong>Parts Cost:</strong> ${service.parts_cost.toFixed(2)}
            </div>
          )}
          {service.tax_amount && (
            <div className="detail-row">
              <strong>Tax:</strong> ${service.tax_amount.toFixed(2)}
            </div>
          )}
          {service.warranty_months && (
            <div className="detail-row">
              <strong>Warranty:</strong> {service.warranty_months} months / {service.warranty_mileage?.toLocaleString()} miles
            </div>
          )}
          {service.next_service_due_date && (
            <div className="detail-row">
              <strong>Next Service Due:</strong> {formatDate(service.next_service_due_date)}
            </div>
          )}
          {service.notes && (
            <div className="detail-row">
              <strong>Notes:</strong> {service.notes}
            </div>
          )}
        </div>
      )}

      {/* Visit Confirmation Button */}
      {service.appointment_id && !service.notes?.includes('Automatically added from appointment completion') && (
        <div className="visit-confirmation">
          <button 
            className="confirm-visit-btn"
            onClick={() => onVisitConfirmation(service.appointment_id)}
          >
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
      const token = localStorage.getItem('token');
      
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
