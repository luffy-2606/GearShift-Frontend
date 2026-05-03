import React, { useEffect, useMemo, useState } from 'react';
import apiClient from '../lib/apiClient';
import { Calendar, Car, CheckCircle2, Clock, MapPin, Phone, X } from 'lucide-react';
import './AppointmentBooking.css';

const AppointmentBooking = ({ shop, selectedServices, onClose }) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [savingQuote, setSavingQuote] = useState(false);
  const [step, setStep] = useState(1); // 1: vehicle, 2: date/time, 3: confirm
  const [vehiclesLoading, setVehiclesLoading] = useState(true);
  const [vehiclesError, setVehiclesError] = useState('');

  // Calculate total cost from selected services base prices
  const totalCost = useMemo(
    () => selectedServices.reduce((sum, service) => sum + (service.base_price || 0), 0),
    [selectedServices]
  );

  const timeSlots = useMemo(() => ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], []);
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const fetchVehicles = async () => {
    try {
      setVehiclesLoading(true);
      setVehiclesError('');
      const response = await apiClient.get('/api/vehicles');
      if (response.data?.success) setVehicles(response.data.data || []);
      else setVehicles([]);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setVehiclesError('Could not load your vehicles. Please try again.');
      setVehicles([]);
    } finally {
      setVehiclesLoading(false);
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

  const handleSaveQuoteOnly = async () => {
    if (!selectedVehicle || !scheduledDate || !scheduledTime) {
      alert('Complete vehicle, date, and time before saving this quote.');
      return;
    }
    const v = vehicles.find((x) => x.id === selectedVehicle);
    try {
      setSavingQuote(true);
      await apiClient.post('/api/bookmarks', {
        entity_type: 'quote_snapshot',
        title: `Quote: ${shop?.name || 'Shop'}`,
        snapshot: {
          shopId: shop?.id,
          shopName: shop?.name,
          shopAddress: shop?.address,
          vehicleId: selectedVehicle,
          vehicleLabel: v ? `${v.year} ${v.make} ${v.model}` : null,
          scheduledDate,
          scheduledTime,
          services: (selectedServices || []).map((s) => ({
            id: s.id,
            name: s.name,
            base_price: s.base_price,
          })),
          estimatedTotal: totalCost,
          notes: notes || null,
        },
        tags: ['quote'],
      });
      alert('Quote saved. Open Saved in the menu anytime.');
    } catch (error) {
      console.error('Save quote error:', error);
      alert(error.response?.data?.message || 'Could not save quote.');
    } finally {
      setSavingQuote(false);
    }
  };

  const handleBookAppointment = async () => {
    try {
      setLoading(true);

      const appointmentData = {
        shop_id: shop.id,
        vehicle_id: selectedVehicle,
        service_id: selectedServices[0]?.id || null,
        service_name: selectedServices.map(s => s.name).join(', '),
        service_description: `Services: ${selectedServices.map(s => s.name).join(', ')}`,
        scheduled_date: `${scheduledDate}T${scheduledTime}:00`,
        customer_notes: notes,
        estimated_cost: totalCost
      };

      const response = await apiClient.post('/api/appointments', appointmentData);

      if (response.data.success) {
        const appt = response.data.data;
        alert('Appointment booked successfully!');
        if (appt?.id) {
          try {
            await apiClient.post('/api/bookmarks', {
              entity_type: 'appointment',
              entity_id: appt.id,
              tags: ['appointment'],
            });
          } catch (bmErr) {
            if (bmErr.response?.status !== 409) {
              console.warn('Could not add appointment to saved list', bmErr);
            }
          }
        }
        if (window.addAppointmentConfirmation) {
          window.addAppointmentConfirmation(appt);
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

  const selectedVehicleData = useMemo(
    () => vehicles.find(v => v.id === selectedVehicle),
    [vehicles, selectedVehicle]
  );

  const canContinueFromVehicle = Boolean(selectedVehicle);
  const canContinueFromDateTime = Boolean(scheduledDate && scheduledTime);

  const stepChipClass = (idx) => {
    if (step === idx) return 'appointment-step-chip active';
    if (step > idx) return 'appointment-step-chip done';
    return 'appointment-step-chip';
  };

  return (
    <div
      className="appointment-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Book appointment"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="appointment-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="appointment-modal-header">
          <div className="appointment-modal-title">
            <h3>Book appointment</h3>
            <p>
              {shop?.name ? `at ${shop.name}` : 'Choose your vehicle and a convenient time.'}
            </p>
          </div>
          <button className="appointment-close-btn" onClick={onClose} aria-label="Close booking">
            <X size={18} />
          </button>
        </div>

        <div className="appointment-modal-body">
          <div className="appointment-stepper" aria-label="Booking steps">
            <span className={stepChipClass(1)}>
              <Car size={16} /> Vehicle
            </span>
            <span className={stepChipClass(2)}>
              <Calendar size={16} /> Date & time
            </span>
            <span className={stepChipClass(3)}>
              <CheckCircle2 size={16} /> Confirm
            </span>
          </div>

          <div className="appointment-grid">
            <div className="appointment-panel">
              {step === 1 && (
                <>
                  <h4>Select a vehicle</h4>
                  {vehiclesLoading ? (
                    <p className="appointment-muted">Loading your vehicles…</p>
                  ) : vehiclesError ? (
                    <>
                      <p className="appointment-muted">{vehiclesError}</p>
                      <div className="appointment-actions" style={{ borderTop: 'none', paddingTop: 0 }}>
                        <button className="appointment-btn" onClick={fetchVehicles}>Retry</button>
                      </div>
                    </>
                  ) : vehicles.length === 0 ? (
                    <>
                      <p className="appointment-muted">
                        You don’t have any vehicles yet. Add one to book an appointment.
                      </p>
                      <div className="appointment-actions" style={{ borderTop: 'none', paddingTop: 0 }}>
                        <button
                          className="appointment-btn primary"
                          onClick={() => alert('Please add a vehicle from your profile/dashboard.')}
                        >
                          Add vehicle
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="vehicle-grid" role="radiogroup" aria-label="Vehicles">
                      {vehicles.map((vehicle) => {
                        const isSelected = selectedVehicle === vehicle.id;
                        return (
                          <button
                            type="button"
                            key={vehicle.id}
                            className={`vehicle-card ${isSelected ? 'selected' : ''}`}
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => handleVehicleSelect(vehicle.id)}
                          >
                            <div className="vehicle-card-title">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </div>
                            <div className="vehicle-card-meta">
                              <span>Plate: {vehicle.license_plate || '—'}</span>
                              <span>Mileage: {(vehicle.mileage || 0).toLocaleString()} mi</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {step === 2 && (
                <>
                  <h4>Pick a date & time</h4>
                  <p className="appointment-muted">
                    Choose a date first, then pick an available slot.
                  </p>

                  <div className="appointment-field">
                    <label htmlFor="appt-date">Date</label>
                    <input
                      id="appt-date"
                      className="appointment-input"
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => {
                        setScheduledDate(e.target.value);
                        setScheduledTime('');
                      }}
                      min={today}
                    />
                  </div>

                  <div className="appointment-field">
                    <label>Time</label>
                    <div className="time-slots" aria-label="Time slots">
                      {timeSlots.map((t) => (
                        <button
                          type="button"
                          key={t}
                          className={`time-slot ${scheduledTime === t ? 'selected' : ''}`}
                          onClick={() => setScheduledTime(t)}
                          disabled={!scheduledDate}
                          aria-pressed={scheduledTime === t}
                        >
                          <Clock size={14} /> {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="appointment-field">
                    <label htmlFor="appt-notes">Notes (optional)</label>
                    <textarea
                      id="appt-notes"
                      className="appointment-textarea"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific concerns or requests…"
                      rows={4}
                    />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h4>Review & confirm</h4>
                  <p className="appointment-muted">
                    Double-check the details. You can go back to make changes.
                  </p>

                  <div className="appointment-summary" aria-label="Appointment summary">
                    <div className="summary-row">
                      <span className="summary-label">Shop</span>
                      <span className="summary-value">{shop?.name || '—'}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Vehicle</span>
                      <span className="summary-value">
                        {selectedVehicleData
                          ? `${selectedVehicleData.year} ${selectedVehicleData.make} ${selectedVehicleData.model}`
                          : '—'}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">When</span>
                      <span className="summary-value">
                        {scheduledDate ? new Date(scheduledDate).toLocaleDateString() : '—'}{' '}
                        {scheduledTime ? `• ${scheduledTime}` : ''}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Services</span>
                      <span className="summary-value">
                        {selectedServices?.length ? selectedServices.map(s => s.name).join(', ') : '—'}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Total</span>
                      <span className="summary-value">${totalCost.toFixed(2)}</span>
                    </div>
                    {notes ? (
                      <div className="summary-row">
                        <span className="summary-label">Notes</span>
                        <span className="summary-value">{notes}</span>
                      </div>
                    ) : null}
                  </div>
                </>
              )}
            </div>

            <div className="appointment-panel">
              <h4>Shop details</h4>
              <p className="appointment-muted" style={{ marginBottom: 10 }}>
                Helpful info before you confirm.
              </p>

              <div className="appointment-summary">
                <div className="summary-row">
                  <span className="summary-label">Name</span>
                  <span className="summary-value">{shop?.name || '—'}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Address</span>
                  <span className="summary-value">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={14} /> {shop?.address || '—'}
                    </span>
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Phone</span>
                  <span className="summary-value">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Phone size={14} /> {shop?.phone || '—'}
                    </span>
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Selected</span>
                  <span className="summary-value">
                    {selectedServices?.length || 0} service{(selectedServices?.length || 0) === 1 ? '' : 's'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="appointment-actions">
            {step > 1 ? (
              <button className="appointment-btn" onClick={() => setStep(step - 1)}>
                Back
              </button>
            ) : (
              <button className="appointment-btn danger" onClick={onClose}>
                Cancel
              </button>
            )}

            {step === 1 && (
              <button
                className="appointment-btn primary"
                onClick={() => setStep(2)}
                disabled={!canContinueFromVehicle}
              >
                Continue
              </button>
            )}

            {step === 2 && (
              <button
                className="appointment-btn primary"
                onClick={handleDateTimeSelect}
                disabled={!canContinueFromDateTime}
              >
                Review
              </button>
            )}

            {step === 3 && (
              <>
                <button
                  type="button"
                  className="appointment-btn"
                  onClick={handleSaveQuoteOnly}
                  disabled={savingQuote || loading}
                >
                  {savingQuote ? 'Saving…' : 'Save quote only'}
                </button>
                <button className="appointment-btn primary" onClick={handleBookAppointment} disabled={loading}>
                  {loading ? 'Booking…' : 'Confirm appointment'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
