import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../lib/apiClient';
import { useSearchParams } from 'react-router-dom';
import { updateSystemMessage } from '../lib/systemMessagesStore';
import {
  Calendar,
  Wrench,
  Clock,
  MapPin,
  Phone,
  FileText,
  CheckCircle,
  Search,
  ClipboardList,
  ArrowRight
} from 'lucide-react';
import './ServiceHistory.css';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '24px',
  padding: '32px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const cardHoverStyle = {
  transform: 'translateY(-8px)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
  borderColor: 'rgba(255, 255, 255, 0.25)'
};

function timelineParts(dateString) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) {
    return { month: '—', day: '—', year: '—' };
  }
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }),
    day: d.getDate(),
    year: d.getFullYear()
  };
}

function formatDateLong(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const ServiceHistory = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [serviceHistory, setServiceHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const displayName =
    user?.first_name?.trim() ||
    [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim() ||
    'there';

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (vehicles.length > 0) {
      const confirmAppointmentId = searchParams.get('confirm');
      const confirmMessageId = searchParams.get('msg');
      if (confirmAppointmentId && !sessionStorage.getItem(`confirmed-${confirmAppointmentId}`)) {
        handleAppointmentConfirmation(confirmAppointmentId, confirmMessageId);
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
    console.log('Confirming visit for appointment:', appointmentId);
    setShowAddService(true);
  };

  const handleAppointmentConfirmation = async (appointmentId, messageId) => {
    try {
      const token = localStorage.getItem('token');

      const appointmentResponse = await apiClient.get(`/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (appointmentResponse.data.success) {
        const appointment = appointmentResponse.data.data.find(apt => String(apt.id) === String(appointmentId));

        if (appointment) {
          await apiClient.put(
            `/api/appointments/${appointmentId}/status`,
            { status: 'completed' },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const vehicle = vehicles.find(v => v.id === appointment.vehicle_id);

          if (vehicle) {
            setSelectedVehicle(vehicle.id);

            const serviceData = {
              service_type: appointment.service_name,
              service_description: appointment.service_description || 'Service completed',
              cost: appointment.actual_cost || appointment.estimated_cost || 0,
              labor_cost: Math.floor((appointment.actual_cost || appointment.estimated_cost || 0) * 0.6),
              parts_cost: Math.floor((appointment.actual_cost || appointment.estimated_cost || 0) * 0.4),
              notes: 'Automatically added from appointment completion'
            };

            const serviceResponse = await apiClient.post(
              `/api/appointments/${appointmentId}/service-history`,
              serviceData,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (serviceResponse.data.success) {
              alert('Service has been added to your vehicle history!');
              if (messageId) {
                updateSystemMessage(messageId, { status: 'completed', completedAt: new Date().toISOString() });
              }
              fetchServiceHistory();
            } else {
              alert('Failed to add service history: ' + (serviceResponse.data.message || 'Unknown error'));
            }
          } else {
            alert('Vehicle not found for this appointment.');
          }
        } else {
          alert('Appointment not found.');
        }
      }
    } catch (error) {
      console.error('Error confirming appointment:', error);
      alert('There was an issue confirming your appointment. Please add it manually.');
    }
  };

  const selectedVehicleData = vehicles.find(v => String(v.id) === String(selectedVehicle));

  const filteredHistory = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const sorted = [...serviceHistory].sort(
      (a, b) => new Date(b.service_date).getTime() - new Date(a.service_date).getTime()
    );
    if (!q) return sorted;
    return sorted.filter(
      (s) =>
        (s.service_type || '').toLowerCase().includes(q) ||
        (s.description || '').toLowerCase().includes(q) ||
        (s.shop?.name || '').toLowerCase().includes(q) ||
        `${s.mechanic?.first_name || ''} ${s.mechanic?.last_name || ''}`.toLowerCase().includes(q)
    );
  }, [serviceHistory, searchTerm]);

  const totals = useMemo(() => {
    const total = filteredHistory.reduce((sum, row) => sum + (Number(row.total_cost) || 0), 0);
    return { count: filteredHistory.length, total };
  }, [filteredHistory]);

  const initialHistoryLoading = selectedVehicle && loading;

  return (
    <div className="service-history-page">
      <div className="service-history-page__inner">
        <header className="service-history-page__hero">
          <div>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 600,
                margin: '0 0 12px'
              }}
            >
              {getGreeting()}, {displayName}
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 12px',
                letterSpacing: '-0.03em',
                lineHeight: 1.1
              }}
            >
              Service <span style={{ color: 'rgba(255, 255, 255, 0.82)' }}>history</span>
            </h1>
            <p
              style={{
                fontSize: '1.0625rem',
                color: 'rgba(255, 255, 255, 0.62)',
                fontWeight: 400,
                letterSpacing: '0.01em',
                margin: 0,
                maxWidth: 540,
                lineHeight: 1.55
              }}
            >
              A vertical timeline per vehicle — costs on the rail side, details in wide cards. Filters sit on the right
              so your log stays front and center.
            </p>
          </div>
          <div
            style={{ ...cardStyle, alignSelf: 'flex-start', minWidth: 'min(100%, 240px)' }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <ClipboardList size={28} style={{ color: '#ffffff' }} strokeWidth={1.75} />
            </div>
            <p
              style={{
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.55)',
                margin: '0 0 8px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600
              }}
            >
              Showing (filtered)
            </p>
            <p style={{ fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
              {totals.count}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.55)', margin: '10px 0 0' }}>
              Records •{' '}
              <strong style={{ color: '#ffffff', fontWeight: 700 }}>
                ${totals.total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
              </strong>{' '}
              total
            </p>
          </div>
        </header>

        <div className="service-history-page__layout">
          <section className="service-history-page__main">
            {!selectedVehicle || vehicles.length === 0 ? (
              <div className="service-history-page__empty" style={{ margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0 0 10px', color: '#ffffff' }}>
                  Add a vehicle first
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>
                  Service history is tied to a vehicle in your garage. Add one from your profile to see visits here.
                </p>
              </div>
            ) : initialHistoryLoading ? (
              <div style={{ textAlign: 'center', padding: '48px 24px', color: 'rgba(255,255,255,0.65)' }}>
                <div className="service-history-page__spinner" style={{ margin: '0 auto' }} />
                <p style={{ margin: '16px 0 0', fontSize: '1.05rem', fontWeight: 500 }}>Loading service history…</p>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="service-history-page__empty">
                <div style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.75 }} aria-hidden>
                  📋
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#ffffff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                  No matching records
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: 0, lineHeight: 1.6, fontSize: '1rem' }}>
                  {serviceHistory.length === 0
                    ? 'No service records for this vehicle yet. Completed appointments can appear here automatically.'
                    : 'Try a different search term to widen results.'}
                </p>
              </div>
            ) : (
              <>
                <p className="service-history-page__timeline-intro">
                  Newest first • {filteredHistory.length}{' '}
                  {filteredHistory.length === 1 ? 'entry' : 'entries'}
                  {selectedVehicleData
                    ? ` for ${selectedVehicleData.year} ${selectedVehicleData.make} ${selectedVehicleData.model}`
                    : ''}
                </p>
                <div className="sh-timeline">
                  {filteredHistory.map((service) => (
                    <ServiceTimelineRow key={service.id} service={service} onVisitConfirmation={handleVisitConfirmation} />
                  ))}
                </div>
              </>
            )}
          </section>

          <aside className="service-history-page__sidebar">
            <div
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
            >
              <h2
                style={{
                  fontSize: '1.25rem',
                  color: '#ffffff',
                  margin: '0 0 20px',
                  fontWeight: 600,
                  letterSpacing: '-0.02em'
                }}
              >
                Vehicle & search
              </h2>

              <div className="service-history-page__search-shell">
                <Search size={20} style={{ color: 'rgba(255, 255, 255, 0.45)', flexShrink: 0 }} />
                <input
                  type="text"
                  className="service-history-page__search-input"
                  placeholder="Filter by service, shop, mechanic…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={vehicles.length === 0}
                />
              </div>

              <label htmlFor="vehicle-select-service-history" style={{ display: 'none' }}>
                Vehicle
              </label>
              <select
                id="vehicle-select-service-history"
                className="service-history-page__select"
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
              >
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.license_plate || 'No plate'})
                  </option>
                ))}
              </select>

              {selectedVehicleData && (
                <div className="service-history-page__vehicle-summary">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.3 }}>
                      {selectedVehicleData.year} {selectedVehicleData.make} {selectedVehicleData.model}
                    </h3>
                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        background: 'rgba(255,255,255,0.95)',
                        color: '#111111',
                        padding: '6px 10px',
                        borderRadius: '999px'
                      }}
                    >
                      Active
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 22px', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.52)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} />
                      {(selectedVehicleData.mileage ?? 0).toLocaleString()} mi
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <FileText size={14} />
                      {selectedVehicleData.license_plate || 'No plate'}
                    </span>
                  </div>

                  <div className="service-history-page__sidebar-stats">
                    <div className="service-history-page__sidebar-stat">
                      <p className="service-history-page__sidebar-stat-val">{totals.count}</p>
                      <p className="service-history-page__sidebar-stat-lbl">Shown</p>
                    </div>
                    <div className="service-history-page__sidebar-stat">
                      <p className="service-history-page__sidebar-stat-val">
                        ${Math.round(totals.total).toLocaleString()}
                      </p>
                      <p className="service-history-page__sidebar-stat-lbl">Total</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="service-history-page__hint">
                Confirm completed visits from appointments when prompted — completed bookings can sync into this timeline automatically.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {showAddService && (
        <AddServiceModal vehicleId={selectedVehicle} onClose={() => setShowAddService(false)} onSuccess={fetchServiceHistory} />
      )}
    </div>
  );
};

const ServiceTimelineRow = ({ service, onVisitConfirmation }) => {
  const { month, day, year } = timelineParts(service.service_date);

  return (
    <div className="sh-timeline__item">
      <div className="sh-timeline__rail">
        <div className="sh-timeline__dates">
          <span className="sh-timeline__month">{month}</span>
          <span className="sh-timeline__day">{day}</span>
          <span className="sh-timeline__year">{year}</span>
        </div>
        <div className="sh-timeline__dot" aria-hidden />
      </div>
      <div className="sh-timeline__card-wrap">
        <ServiceHistoryCard service={service} onVisitConfirmation={onVisitConfirmation} />
      </div>
    </div>
  );
};

const ServiceHistoryCard = ({ service, onVisitConfirmation }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="service-card-timeline">
      <div className="service-card-timeline__header">
        <div>
          <h3 className="service-card-timeline__title">{service.service_type}</h3>
          <div className="service-card-timeline__meta-row">
            <span>
              <Calendar size={14} style={{ opacity: 0.65 }} />
              {formatDateLong(service.service_date)}
            </span>
          </div>
        </div>
        <div className="service-card-timeline__cost">
          <div className="service-card-timeline__cost-label">Total</div>
          <div className="service-card-timeline__cost-val">${service.total_cost?.toFixed(2) ?? 'N/A'}</div>
        </div>
      </div>

      {service.description && (
        <div className="service-card-timeline__desc">{service.description}</div>
      )}

      {service.shop && (
        <div className="service-card-timeline__panel">
          <div className="service-card-timeline__panel-head">
            <MapPin size={14} /> Service location
          </div>
          <div className="service-card-timeline__panel-body">
            <strong style={{ color: '#ffffff' }}>{service.shop.name || 'Unknown shop'}</strong>
            {service.shop.address && (
              <div style={{ marginTop: 6, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)' }}>{service.shop.address}</div>
            )}
            {service.shop.phone && (
              <div style={{ marginTop: 6, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Phone size={13} /> {service.shop.phone}
              </div>
            )}
          </div>
        </div>
      )}

      {service.mechanic && (
        <div className="service-card-timeline__panel">
          <div className="service-card-timeline__panel-head">
            <Wrench size={14} /> Technician
          </div>
          <div className="service-card-timeline__panel-body">
            {service.mechanic.first_name} {service.mechanic.last_name}
          </div>
        </div>
      )}

      {(service.mileage_at_service != null ||
        service.duration_minutes != null ||
        service.labor_cost != null ||
        service.parts_cost != null) && (
        <div className="service-card-timeline__panel">
          <div className="service-card-timeline__panel-head">
            <FileText size={14} /> Job details
          </div>
          <div className="service-card-timeline__metrics">
            {service.mileage_at_service != null && (
              <div className="service-card-timeline__metric">
                <div className="service-card-timeline__metric-lbl">Mileage</div>
                <div className="service-card-timeline__metric-val">{Number(service.mileage_at_service).toLocaleString()} mi</div>
              </div>
            )}
            {service.duration_minutes != null && (
              <div className="service-card-timeline__metric">
                <div className="service-card-timeline__metric-lbl">Duration</div>
                <div className="service-card-timeline__metric-val">{service.duration_minutes} min</div>
              </div>
            )}
            {(service.labor_cost != null || service.parts_cost != null) && (
              <div className="service-card-timeline__metric">
                <div className="service-card-timeline__metric-lbl">Labor / parts</div>
                <div className="service-card-timeline__metric-val">
                  ${service.labor_cost ?? '0'} / ${service.parts_cost ?? '0'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <button type="button" className="details-toggle-btn" onClick={() => setShowDetails(!showDetails)}>
        <FileText size={16} />
        {showDetails ? 'Hide' : 'View'} additional details
        <ArrowRight size={14} style={{ transition: 'transform 0.2s ease', transform: showDetails ? 'rotate(90deg)' : 'none' }} />
      </button>

      {showDetails && (
        <div className="additional-details-modern">
          {service.warranty_months && (
            <div className="service-card-timeline__panel">
              <div className="service-card-timeline__panel-head">
                <CheckCircle size={14} /> Warranty
              </div>
              <div className="service-card-timeline__panel-body" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.58)' }}>
                {service.warranty_months} months
                {service.warranty_mileage ? ` • ${Number(service.warranty_mileage).toLocaleString()} mi` : ''}
              </div>
            </div>
          )}

          {service.next_service_due_date && (
            <div className="service-card-timeline__panel">
              <div className="service-card-timeline__panel-head">
                <Calendar size={14} /> Next service due
              </div>
              <div className="service-card-timeline__panel-body" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.58)' }}>
                {formatDateLong(service.next_service_due_date)}
                {service.next_service_due_mileage
                  ? ` • ${Number(service.next_service_due_mileage).toLocaleString()} mi`
                  : ''}
              </div>
            </div>
          )}

          {service.notes && (
            <div className="service-card-timeline__panel">
              <div className="service-card-timeline__panel-head">
                <FileText size={14} /> Notes
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.58)',
                  lineHeight: 1.55,
                  fontStyle: service.notes.includes('Automatically added') ? 'italic' : 'normal'
                }}
              >
                {service.notes}
              </p>
            </div>
          )}
        </div>
      )}

      {service.appointment_id && !service.notes?.includes('Automatically added from appointment completion') && (
        <button type="button" className="confirm-visit-btn-modern" onClick={() => onVisitConfirmation(service.appointment_id)}>
          <CheckCircle size={16} />
          Confirm visit completed
        </button>
      )}
    </article>
  );
};

const AddServiceModal = ({ vehicleId: _vehicleId, onClose, onSuccess }) => {
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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add service to history</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="sh-modal-service-type">Service type</label>
            <input id="sh-modal-service-type" type="text" name="service_type" value={formData.service_type} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="sh-modal-desc">Description</label>
            <textarea id="sh-modal-desc" name="service_description" value={formData.service_description} onChange={handleChange} rows={3} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="sh-modal-cost">Total cost</label>
              <input id="sh-modal-cost" type="number" name="cost" value={formData.cost} onChange={handleChange} step="0.01" min="0" />
            </div>

            <div className="form-group">
              <label htmlFor="sh-modal-labor">Labor cost</label>
              <input id="sh-modal-labor" type="number" name="labor_cost" value={formData.labor_cost} onChange={handleChange} step="0.01" min="0" />
            </div>

            <div className="form-group">
              <label htmlFor="sh-modal-parts">Parts cost</label>
              <input id="sh-modal-parts" type="number" name="parts_cost" value={formData.parts_cost} onChange={handleChange} step="0.01" min="0" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="sh-modal-notes">Notes</label>
            <textarea id="sh-modal-notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="sh-modal-next-date">Next service date</label>
              <input id="sh-modal-next-date" type="date" name="next_service_date" value={formData.next_service_date} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="sh-modal-next-mi">Next service mileage</label>
              <input id="sh-modal-next-mi" type="number" name="next_service_mileage" value={formData.next_service_mileage} onChange={handleChange} min="0" />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Adding…' : 'Add service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceHistory;
