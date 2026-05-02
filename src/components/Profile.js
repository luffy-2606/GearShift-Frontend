import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiClient from '../lib/apiClient';

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

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', budget: '' });
  const [vehicleForm, setVehicleForm] = useState(defaultVehicleForm);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehicleLoading, setVehicleLoading] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || user.first_name || '',
        lastName: user.lastName || user.last_name || '',
        budget:
          user.budget != null && user.budget !== ''
            ? String(user.budget)
            : ''
      });
      fetchVehicles();
    }
  }, [user]);

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
      setMessage('Profile updated successfully.');
      setMessageType('success');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile.');
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
      setMessage('Vehicle added successfully.');
      setMessageType('success');
      fetchVehicles();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add vehicle.');
      setMessageType('error');
    } finally {
      setVehicleLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const fullName = `${user?.first_name || user?.firstName || ''} ${user?.last_name || user?.lastName || ''}`.trim() || 'User';

  return (
    <div className="profile-shell">
      <div className="container profile-page">
        <div className="profile-header">
          <div>
            <h1>Profile</h1>
            <p>Manage your account and vehicles</p>
          </div>
          <div className="header-actions">
            <button className="ui-btn muted" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
            <button className="ui-btn primary" onClick={() => setShowVehicleModal(true)}>
              Add Vehicle
            </button>
          </div>
        </div>

        {message && <div className={`alert alert-${messageType}`}>{message}</div>}

        <div className="stats-row">
          <div className="stat-card"><span>Vehicles</span><strong>{vehicles.length}</strong></div>
          <div className="stat-card"><span>Status</span><strong>{user?.status || 'active'}</strong></div>
          <div className="stat-card"><span>Role</span><strong>{user?.role || 'customer'}</strong></div>
          <div className="stat-card"><span>Member Since</span><strong>{formatDate(user?.created_at)}</strong></div>
        </div>

        <div className="main-grid">
          <section className="panel">
            <div className="identity-row">
              <div className="avatar-circle">{fullName[0]?.toUpperCase() || 'U'}</div>
              <div>
                <h2>{fullName}</h2>
                <p>{user?.email}</p>
              </div>
            </div>
            <form onSubmit={handleProfileUpdate} className="profile-form">
              <div className="two-col">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input value={user?.email || ''} disabled />
              </div>
              <div className="form-group">
                <label htmlFor="budget">Monthly spending budget (USD)</label>
                <input
                  id="budget"
                  name="budget"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 1000"
                  value={formData.budget}
                  onChange={handleInputChange}
                />
                <small style={{ color: 'var(--dark-text-secondary)', fontSize: 12 }}>
                  Optional. Used on your dashboard to compare against this month&apos;s service spending.
                </small>
              </div>
              <button type="submit" className="ui-btn primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </section>

          <section className="panel">
            <div className="vehicle-header">
              <h3>My Vehicles</h3>
              <button className="ui-btn muted small" onClick={() => setShowVehicleModal(true)}>
                Add Vehicle
              </button>
            </div>
            <div className="vehicle-list">
              {vehicles.length === 0 ? (
                <div className="empty-state">
                  <p>No vehicles added yet.</p>
                  <button className="ui-btn primary" onClick={() => setShowVehicleModal(true)}>
                    Add First Vehicle
                  </button>
                </div>
              ) : (
                vehicles.map((vehicle) => (
                  <div className="vehicle-card" key={vehicle.id}>
                    <div>
                      <h4>{vehicle.year} {vehicle.make} {vehicle.model}</h4>
                      <p>{vehicle.license_plate || 'No plate'} • {vehicle.fuel_type} • {vehicle.transmission}</p>
                    </div>
                    <div className="vehicle-info">
                      <strong>{(vehicle.mileage || 0).toLocaleString()} mi</strong>
                      {vehicle.color ? <span>{vehicle.color}</span> : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      {showVehicleModal && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowVehicleModal(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Add vehicle"
        >
          <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-title">
              <h3>Add Vehicle</h3>
              <button className="close-btn" onClick={() => setShowVehicleModal(false)}>x</button>
            </div>
            <form onSubmit={handleAddVehicle} className="profile-form">
              <div className="two-col">
                <div className="form-group">
                  <label htmlFor="make">Make</label>
                  <input id="make" name="make" value={vehicleForm.make} onChange={handleVehicleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="model">Model</label>
                  <input id="model" name="model" value={vehicleForm.model} onChange={handleVehicleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="year">Year</label>
                  <input id="year" type="number" name="year" min="1950" max="2100" value={vehicleForm.year} onChange={handleVehicleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="mileage">Mileage</label>
                  <input id="mileage" type="number" name="mileage" min="0" value={vehicleForm.mileage} onChange={handleVehicleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="license_plate">License Plate</label>
                  <input id="license_plate" name="license_plate" value={vehicleForm.license_plate} onChange={handleVehicleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="vin">VIN</label>
                  <input id="vin" name="vin" value={vehicleForm.vin} onChange={handleVehicleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="fuel_type">Fuel Type</label>
                  <select id="fuel_type" name="fuel_type" value={vehicleForm.fuel_type} onChange={handleVehicleChange}>
                    <option value="gasoline">Gasoline</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Electric</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="transmission">Transmission</label>
                  <select id="transmission" name="transmission" value={vehicleForm.transmission} onChange={handleVehicleChange}>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="color">Color</label>
                <input id="color" name="color" value={vehicleForm.color} onChange={handleVehicleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes" rows="3" value={vehicleForm.notes} onChange={handleVehicleChange} />
              </div>
              <div className="modal-actions">
                <button type="button" className="ui-btn muted" onClick={() => setShowVehicleModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="ui-btn primary" disabled={vehicleLoading}>
                  {vehicleLoading ? 'Adding...' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .profile-shell {
          min-height: 100vh;
          background: var(--dark-bg);
          color: var(--dark-text);
          padding: 22px 0 36px;
        }
        .profile-page {
          max-width: 1180px;
        }
        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .profile-header h1 {
          margin: 0;
          font-size: 30px;
          letter-spacing: -0.02em;
        }
        .profile-header p {
          margin: 4px 0 0;
          color: var(--dark-text-secondary);
        }
        .header-actions {
          display: flex;
          gap: 8px;
        }
        .ui-btn {
          border-radius: 10px;
          padding: 10px 14px;
          border: 1px solid transparent;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
        }
        .ui-btn.primary {
          background: var(--dark-accent);
          color: var(--dark-text);
        }
        .ui-btn.muted {
          background: transparent;
          color: var(--dark-text-secondary);
          border-color: var(--dark-border);
        }
        .ui-btn.small {
          padding: 7px 12px;
          font-size: 13px;
        }
        .alert {
          margin-bottom: 14px;
          border-radius: 10px;
          border: 1px solid;
          padding: 10px 12px;
        }
        .alert-success {
          background: rgba(34, 197, 94, 0.15);
          border-color: rgba(34, 197, 94, 0.4);
          color: #86efac;
        }
        .alert-error {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.4);
          color: #fca5a5;
        }
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 14px;
        }
        .stat-card {
          background: var(--dark-surface);
          border: 1px solid var(--dark-border);
          border-radius: 12px;
          padding: 12px 14px;
          display: grid;
          gap: 5px;
        }
        .stat-card span {
          color: var(--dark-text-secondary);
          font-size: 12px;
        }
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 14px;
        }
        .panel {
          background: var(--dark-surface);
          border: 1px solid var(--dark-border);
          border-radius: 16px;
          padding: 16px;
        }
        .identity-row {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 14px;
        }
        .avatar-circle {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          background: linear-gradient(140deg, #ef4444, #7f1d1d);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
        }
        .identity-row h2 {
          margin: 0;
        }
        .identity-row p {
          margin: 3px 0 0;
          color: var(--dark-text-secondary);
          font-size: 14px;
        }
        .profile-form {
          display: grid;
          gap: 12px;
        }
        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .form-group {
          display: grid;
          gap: 6px;
        }
        .form-group label {
          color: var(--dark-text-secondary);
          font-size: 12px;
          font-weight: 600;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          background: #0b0b0e;
          color: var(--dark-text);
          border: 1px solid var(--dark-border);
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 14px;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #ef4444;
        }
        .vehicle-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .vehicle-header h3 {
          margin: 0;
        }
        .vehicle-list {
          display: grid;
          gap: 10px;
          max-height: 520px;
          overflow: auto;
          padding-right: 4px;
        }
        .vehicle-card {
          border: 1px solid var(--dark-border);
          border-radius: 12px;
          background: #09090b;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .vehicle-card h4 {
          margin: 0 0 4px;
        }
        .vehicle-card p {
          margin: 0;
          color: var(--dark-text-secondary);
          font-size: 14px;
        }
        .vehicle-info {
          text-align: right;
          display: grid;
          gap: 3px;
        }
        .vehicle-info span {
          color: var(--dark-text-secondary);
          font-size: 13px;
        }
        .empty-state {
          border: 1px dashed var(--dark-border);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          display: grid;
          gap: 10px;
        }
        .empty-state p {
          margin: 0;
          color: var(--dark-text-secondary);
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.72);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 18px;
          z-index: 60;
        }
        .modal-card {
          width: 100%;
          max-width: 840px;
          background: #111114;
          border: 1px solid var(--dark-border);
          border-radius: 16px;
          padding: 16px;
        }
        .modal-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .modal-title h3 {
          margin: 0;
        }
        .close-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid var(--dark-border);
          background: transparent;
          color: var(--dark-text-secondary);
          cursor: pointer;
          font-weight: 700;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }
        @media (max-width: 980px) {
          .stats-row,
          .main-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 760px) {
          .profile-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .header-actions {
            width: 100%;
          }
          .header-actions .ui-btn {
            flex: 1;
          }
          .stats-row,
          .main-grid,
          .two-col {
            grid-template-columns: 1fr;
          }
          .vehicle-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .vehicle-info {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
