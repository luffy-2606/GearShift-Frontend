import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentBooking = ({ shop, selectedServices, onClose }) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: vehicle selection, 2: date/time, 3: confirmation

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/vehicles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setVehicles(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicle(vehicleId);
    setStep(2);
  };

  const handleDateTimeSelect = () => {
    if (!scheduledDate || !scheduledTime) {
      alert('Please select both date and time');
      return;
    }
    setStep(3);
  };

  const handleBookAppointment = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      const appointmentData = {
        shop_id: shop.id,
        vehicle_id: selectedVehicle,
        service_name: selectedServices.join(', '),
        service_description: `Services: ${selectedServices.join(', ')}`,
        scheduled_date: `${scheduledDate}T${scheduledTime}:00`,
        customer_notes: notes
      };

      const response = await axios.post('/api/appointments', appointmentData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        alert('Appointment booked successfully!');
        
        // Add system message for later confirmation
        if (window.addAppointmentConfirmation) {
          window.addAppointmentConfirmation(response.data.data);
        }
        
        onClose();
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="appointment-booking">
        <h3>Book Appointment - {shop.name}</h3>
        
        <div className="booking-step">
          <h4>Step 1: Select Vehicle</h4>
          
          {vehicles.length === 0 ? (
            <div className="no-vehicles">
              <p>You don't have any vehicles added yet.</p>
              <button onClick={() => alert('Redirect to add vehicle page')}>
                Add Vehicle
              </button>
            </div>
          ) : (
            <div className="vehicles-list">
              {vehicles.map(vehicle => (
                <div 
                  key={vehicle.id} 
                  className={`vehicle-option ${selectedVehicle === vehicle.id ? 'selected' : ''}`}
                  onClick={() => handleVehicleSelect(vehicle.id)}
                >
                  <h5>{vehicle.year} {vehicle.make} {vehicle.model}</h5>
                  <p>License: {vehicle.license_plate || 'Not specified'}</p>
                  <p>Mileage: {vehicle.mileage.toLocaleString()} miles</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="appointment-booking">
        <h3>Book Appointment - {shop.name}</h3>
        
        <div className="booking-step">
          <h4>Step 2: Select Date & Time</h4>
          
          <div className="datetime-selection">
            <div className="date-selection">
              <label>Select Date:</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="time-selection">
              <label>Select Time:</label>
              <div className="time-slots">
                {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(time => (
                  <button
                    key={time}
                    className={`time-slot ${scheduledTime === time ? 'selected' : ''}`}
                    onClick={() => setScheduledTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="notes-section">
            <label>Additional Notes (optional):</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific concerns or requests..."
              rows={3}
            />
          </div>
        </div>

        <div className="booking-actions">
          <button className="back-btn" onClick={() => setStep(1)}>Back</button>
          <button className="continue-btn" onClick={handleDateTimeSelect}>
            Continue
          </button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle);
    
    return (
      <div className="appointment-booking">
        <h3>Confirm Appointment</h3>
        
        <div className="booking-summary">
          <div className="summary-section">
            <h4>Shop:</h4>
            <p>{shop.name}</p>
            <p>{shop.address}</p>
            <p>{shop.phone}</p>
          </div>

          <div className="summary-section">
            <h4>Vehicle:</h4>
            <p>{selectedVehicleData?.year} {selectedVehicleData?.make} {selectedVehicleData?.model}</p>
            <p>License: {selectedVehicleData?.license_plate || 'Not specified'}</p>
          </div>

          <div className="summary-section">
            <h4>Services:</h4>
            {selectedServices.map(service => (
              <p key={service}>\u2022 {service}</p>
            ))}
          </div>

          <div className="summary-section">
            <h4>Date & Time:</h4>
            <p>{new Date(scheduledDate).toLocaleDateString()} at {scheduledTime}</p>
          </div>

          {notes && (
            <div className="summary-section">
              <h4>Notes:</h4>
              <p>{notes}</p>
            </div>
          )}
        </div>

        <div className="booking-actions">
          <button className="back-btn" onClick={() => setStep(2)}>Back</button>
          <button 
            className="confirm-btn" 
            onClick={handleBookAppointment}
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Confirm Appointment'}
          </button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  }

  return null;
};

export default AppointmentBooking;
