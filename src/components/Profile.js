import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiClient from '../lib/apiClient';
import { Mail, Calendar, DollarSign, Car, Pencil, Trash2 } from 'lucide-react';
import './Profile.css';

const defaultVehicleForm = {
  make: '',
  model: '',
  year: '',
  vin: '',
  license_plate: '',
  color: '',
  mileage: '',
  fuel_type: 'gasoline',
  transmission: 'automatic',
  notes: ''
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

function formatBudgetDisplay(raw) {
  if (raw == null || raw === '') return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(n);
}

function initials(first, last) {
  const a = ((first || '').trim()[0] || '').toUpperCase();
  const b = ((last || '').trim()[0] || '').toUpperCase();
  const s = `${a}${b}`;
  return s || 'U';
}

function truncateVin(vin) {
  if (!vin) return null;
  const v = String(vin).trim();
  if (v.length <= 14) return v;
  return `${v.slice(0, 14)}…`;
}

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', budget: '' });
  const [vehicleForm, setVehicleForm] = useState(defaultVehicleForm);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehicleLoading, setVehicleLoading] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [deletingVehicleId, setDeletingVehicleId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const syncFormFromUser = useCallback(() => {
    if (!user) return;
    setFormData({
      firstName: user.firstName || user.first_name || '',
      lastName: user.lastName || user.last_name || '',
      budget: user.budget != null && user.budget !== '' ? String(user.budget) : ''
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      syncFormFromUser();
      fetchVehicles();
    }
  }, [user, syncFormFromUser]);

  const fetchVehicles = async () => {
    try {
      const response = await apiClient.get('/api/vehicles');
      setVehicles(response.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
      setVehicles([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleForm((prev) => ({ ...prev, [name]: value }));
  };

  const enterEditMode = () => {
    setMessage('');
    syncFormFromUser();
    setEditMode(true);
  };

  const cancelEdit = () => {
    syncFormFromUser();
    setEditMode(false);
    setShowVehicleModal(false);
    setMessage('');
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await apiClient.put('/api/users/profile', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        budget: formData.budget === '' ? null : Number(formData.budget)
      });
      updateUser(response.data.user);
      setMessage('Profile saved.');
      setMessageType('success');
      setEditMode(false);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not save profile.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setVehicleLoading(true);
    setMessage('');
    try {
      await apiClient.post('/api/vehicles', {
        ...vehicleForm,
        year: Number(vehicleForm.year),
        mileage: vehicleForm.mileage ? Number(vehicleForm.mileage) : 0
      });
      setVehicleForm(defaultVehicleForm);
      setShowVehicleModal(false);
      setMessage('Vehicle added.');
      setMessageType('success');
      fetchVehicles();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not add vehicle.');
      setMessageType('error');
    } finally {
      setVehicleLoading(false);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (!window.confirm('Remove this vehicle from your garage?')) return;
    setDeletingVehicleId(vehicleId);
    setMessage('');
    try {
      await apiClient.delete(`/api/vehicles/${vehicleId}`);
      setMessage('Vehicle removed.');
      setMessageType('success');
      fetchVehicles();
    } catch (error) {
      const msg = error.response?.data?.message || 'Could not remove vehicle.';
      setMessage(msg);
      setMessageType('error');
    } finally {
      setDeletingVehicleId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const fn = user?.first_name || user?.firstName || '';
  const ln = user?.last_name || user?.lastName || '';
  const fullName = `${fn} ${ln}`.trim() || 'Member';
  const budgetLabel = formatBudgetDisplay(user?.budget);

  const displayName =
    user?.first_name?.trim() ||
    [user?.first_name || user?.firstName, user?.last_name || user?.lastName].filter(Boolean).join(' ').trim() ||
    'there';

  return (
    <div className="profile-screen">
      <div className="profile-screen__inner">
        <header className="profile-screen__hero">
          <div>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 600,
                margin: '0 0 10px'
              }}
            >
              {getGreeting()}, {displayName}
            </p>
            <h1
              style={{
                fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                margin: '0 0 8px',
                letterSpacing: '-0.03em',
                color: '#ffffff'
              }}
            >
              Profile
            </h1>
            <p style={{ margin: 0, fontSize: '1rem', color: 'rgba(255, 255, 255, 0.55)', maxWidth: 520, lineHeight: 1.55 }}>
              {editMode
                ? 'Update your name and monthly budget, and manage vehicles below.'
                : 'Your account snapshot — edit when you need to change details or garage.'}
            </p>
          </div>
          <div className="profile-screen__actions">
            <button type="button" className="profile-screen__btn profile-screen__btn--ghost" onClick={() => navigate('/dashboard')}>
              Dashboard
            </button>
            {!editMode ? (
              <button type="button" className="profile-screen__btn profile-screen__btn--primary" onClick={enterEditMode}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Pencil size={16} strokeWidth={2} /> Edit profile
                </span>
              </button>
            ) : (
              <button type="button" className="profile-screen__btn profile-screen__btn--ghost" onClick={cancelEdit}>
                Cancel editing
              </button>
            )}
          </div>
        </header>

        {message ? (
          <div className={`profile-screen__alert profile-screen__alert--${messageType === 'success' ? 'success' : 'error'}`}>
            {message}
          </div>
        ) : null}

        <section className="profile-screen__stats">
          <div className="profile-screen__stat">
            <p className="profile-screen__stat-label">Garage</p>
            <p className="profile-screen__stat-value">{vehicles.length}</p>
            <p className="profile-screen__stat-hint">Vehicles on file</p>
          </div>
          <div className="profile-screen__stat">
            <p className="profile-screen__stat-label">Monthly budget</p>
            <p className="profile-screen__stat-value">{budgetLabel || '—'}</p>
            <p className="profile-screen__stat-hint">{budgetLabel ? 'Tracked on dashboard' : 'Not set yet'}</p>
          </div>
          <div className="profile-screen__stat">
            <p className="profile-screen__stat-label">Member since</p>
            <p className="profile-screen__stat-value" style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              {formatDate(user?.created_at)}
            </p>
            <p className="profile-screen__stat-hint">Account opened</p>
          </div>
          <div className="profile-screen__stat">
            <p className="profile-screen__stat-label">Status</p>
            <p className="profile-screen__stat-value" style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              {user?.status || 'active'}
            </p>
            <p className="profile-screen__stat-hint">{user?.role === 'admin' ? 'Administrator' : 'Customer'}</p>
          </div>
        </section>

        <div className="profile-screen__grid">
          <section className="profile-screen__panel">
            <div className="profile-screen__panel-head">
              <div>
                <h2 className="profile-screen__panel-title">Account</h2>
                <p className="profile-screen__panel-sub">
                  {editMode ? 'Changes apply after you save.' : 'Read-only overview of how GearShift knows you.'}
                </p>
              </div>
              {!editMode ? <span className="profile-screen__badge">View</span> : <span className="profile-screen__badge">Editing</span>}
            </div>

            <div className="profile-screen__identity">
              <div className="profile-screen__avatar" aria-hidden>
                {initials(fn, ln)}
              </div>
              <div>
                <p className="profile-screen__identity-name">{fullName}</p>
                <p className="profile-screen__identity-email">
                  <Mail size={16} style={{ opacity: 0.55 }} />
                  {user?.email || '—'}
                </p>
              </div>
            </div>

            {!editMode ? (
              <dl className="profile-screen__dl">
                <div className="profile-screen__dl-row">
                  <dt className="profile-screen__dl-dt">Full name</dt>
                  <dd className="profile-screen__dl-dd">{fullName}</dd>
                </div>
                <div className="profile-screen__dl-row">
                  <dt className="profile-screen__dl-dt">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Calendar size={13} style={{ opacity: 0.55 }} /> Member since
                    </span>
                  </dt>
                  <dd className="profile-screen__dl-dd">{formatDate(user?.created_at)}</dd>
                </div>
                <div className="profile-screen__dl-row">
                  <dt className="profile-screen__dl-dt">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <DollarSign size={13} style={{ opacity: 0.55 }} /> Monthly budget
                    </span>
                  </dt>
                  <dd className="profile-screen__dl-dd">
                    {budgetLabel || 'Not set — used on your dashboard when added.'}
                  </dd>
                </div>
              </dl>
            ) : (
              <form className="profile-screen__form" onSubmit={handleProfileUpdate}>
                <div className="profile-screen__two">
                  <div className="profile-screen__field">
                    <label htmlFor="firstName">First name</label>
                    <input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                  </div>
                  <div className="profile-screen__field">
                    <label htmlFor="lastName">Last name</label>
                    <input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="profile-screen__field">
                  <label htmlFor="email-ro">Email</label>
                  <input id="email-ro" value={user?.email || ''} disabled />
                  <p className="profile-screen__field-hint">Email sign-in cannot be changed here.</p>
                </div>
                <div className="profile-screen__field">
                  <label htmlFor="budget">Monthly spending budget (USD)</label>
                  <input
                    id="budget"
                    name="budget"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 800"
                    value={formData.budget}
                    onChange={handleInputChange}
                  />
                  <p className="profile-screen__field-hint">
                    Optional. Compared with this month&apos;s service spending on your dashboard.
                  </p>
                </div>
                <button type="submit" className="profile-screen__btn profile-screen__btn--primary" disabled={loading}>
                  {loading ? 'Saving…' : 'Save profile'}
                </button>
              </form>
            )}
          </section>

          <section className="profile-screen__panel">
            <div className="profile-screen__panel-head">
              <div>
                <h2 className="profile-screen__panel-title">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <Car size={22} strokeWidth={1.75} /> Vehicles
                  </span>
                </h2>
                <p className="profile-screen__panel-sub">
                  {editMode ? 'Add or remove vehicles from your garage.' : 'Specs and mileage at a glance.'}
                </p>
              </div>
              {editMode ? (
                <button type="button" className="profile-screen__btn profile-screen__btn--primary" onClick={() => setShowVehicleModal(true)}>
                  Add vehicle
                </button>
              ) : null}
            </div>

            {vehicles.length === 0 ? (
              <div className="profile-screen__empty">
                {editMode ? (
                  <>
                    No vehicles yet. Use <strong>Add vehicle</strong> above to register your first car.
                  </>
                ) : (
                  <>No vehicles on file. Choose <strong>Edit profile</strong> to add your garage.</>
                )}
              </div>
            ) : (
              <div className="profile-screen__vehicle-list">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="profile-screen__vehicle-card">
                    <div>
                      <p className="profile-screen__vehicle-title">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </p>
                      <p className="profile-screen__vehicle-meta">
                        <strong>{vehicle.license_plate || 'No plate'}</strong>
                        {' · '}
                        {vehicle.fuel_type}
                        {' · '}
                        {vehicle.transmission}
                        {truncateVin(vehicle.vin) ? (
                          <>
                            <br />
                            VIN {truncateVin(vehicle.vin)}
                          </>
                        ) : null}
                        {vehicle.color ? (
                          <>
                            <br />
                            Color {vehicle.color}
                          </>
                        ) : null}
                      </p>
                    </div>
                    <div className="profile-screen__vehicle-side">
                      <div className="profile-screen__vehicle-mileage">{(vehicle.mileage || 0).toLocaleString()} mi</div>
                      {editMode ? (
                        <button
                          type="button"
                          className="profile-screen__btn profile-screen__btn--danger"
                          style={{ marginTop: 12, padding: '8px 12px', fontSize: '0.78rem' }}
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          disabled={deletingVehicleId === vehicle.id}
                        >
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <Trash2 size={14} />
                            {deletingVehicleId === vehicle.id ? 'Removing…' : 'Remove'}
                          </span>
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {showVehicleModal ? (
        <div
          className="profile-screen__modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowVehicleModal(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-vehicle-title"
        >
          <div className="profile-screen__modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="profile-screen__modal-head">
              <h3 id="add-vehicle-title">Add vehicle</h3>
              <button type="button" className="profile-screen__modal-close" onClick={() => setShowVehicleModal(false)} aria-label="Close">
                ×
              </button>
            </div>
            <form className="profile-screen__form" onSubmit={handleAddVehicle}>
              <div className="profile-screen__two">
                <div className="profile-screen__field">
                  <label htmlFor="make">Make</label>
                  <input id="make" name="make" value={vehicleForm.make} onChange={handleVehicleChange} required />
                </div>
                <div className="profile-screen__field">
                  <label htmlFor="model">Model</label>
                  <input id="model" name="model" value={vehicleForm.model} onChange={handleVehicleChange} required />
                </div>
                <div className="profile-screen__field">
                  <label htmlFor="year">Year</label>
                  <input id="year" type="number" name="year" min="1950" max="2100" value={vehicleForm.year} onChange={handleVehicleChange} required />
                </div>
                <div className="profile-screen__field">
                  <label htmlFor="mileage">Mileage</label>
                  <input id="mileage" type="number" name="mileage" min="0" value={vehicleForm.mileage} onChange={handleVehicleChange} />
                </div>
                <div className="profile-screen__field">
                  <label htmlFor="license_plate">License plate</label>
                  <input id="license_plate" name="license_plate" value={vehicleForm.license_plate} onChange={handleVehicleChange} />
                </div>
                <div className="profile-screen__field">
                  <label htmlFor="vin">VIN</label>
                  <input id="vin" name="vin" value={vehicleForm.vin} onChange={handleVehicleChange} />
                </div>
                <div className="profile-screen__field">
                  <label htmlFor="fuel_type">Fuel type</label>
                  <select id="fuel_type" name="fuel_type" value={vehicleForm.fuel_type} onChange={handleVehicleChange}>
                    <option value="gasoline">Gasoline</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Electric</option>
                  </select>
                </div>
                <div className="profile-screen__field">
                  <label htmlFor="transmission">Transmission</label>
                  <select id="transmission" name="transmission" value={vehicleForm.transmission} onChange={handleVehicleChange}>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
              </div>
              <div className="profile-screen__field">
                <label htmlFor="color">Color</label>
                <input id="color" name="color" value={vehicleForm.color} onChange={handleVehicleChange} />
              </div>
              <div className="profile-screen__field">
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes" rows={3} value={vehicleForm.notes} onChange={handleVehicleChange} />
              </div>
              <div className="profile-screen__modal-actions">
                <button type="button" className="profile-screen__btn profile-screen__btn--ghost" onClick={() => setShowVehicleModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="profile-screen__btn profile-screen__btn--primary" disabled={vehicleLoading}>
                  {vehicleLoading ? 'Adding…' : 'Add vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
