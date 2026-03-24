import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || user.first_name || '',
        lastName: user.lastName || user.last_name || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Profile updated successfully!');
        setMessageType('success');
        updateUser(data.user);
        setIsEditing(false);
      } else {
        setMessage(data.message || 'Failed to update profile');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setMessage('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <div className="container">
        <div className="profile-header">
          <h1>Edit Profile</h1>
        </div>

        {message && (
          <div className={`alert alert-${messageType}`}>
            {message}
          </div>
        )}

        <div className="profile-content">
          <div className="edit-card">
            <div className="edit-info">
              <h2>Edit Your Information</h2>
              <form onSubmit={handleProfileUpdate} className="edit-form">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleEditToggle} disabled={loading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>

      {message && (
        <div className={`alert alert-${messageType}`}>
          {message}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header-section">
            <div className="avatar-circle">
              {user?.firstName?.[0]?.toUpperCase() || user?.first_name?.[0]?.toUpperCase() || 'U'}
            </div>
            <h2 className="profile-name">{user?.first_name || user?.firstName} {user?.last_name || user?.lastName}</h2>
            <p className="profile-email">{user?.email}</p>
          </div>
          
          <div className="profile-body">
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Role</span>
                <span className="detail-value role-badge">{user?.role}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">{user?.created_at ? formatDate(user.created_at) : 'Unknown'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className={`detail-value status-badge ${user?.status}`}>
                  {user?.status}
                </span>
              </div>
            </div>
            
            <div className="button-group">
              <button className="btn back-btn" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </button>
              <button className="btn edit-btn" onClick={handleEditToggle}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background: var(--gray-50);
          min-height: 100vh;
        }

        .profile-header {
          background: var(--white);
          padding: 18px 24px;
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .profile-header h1 {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
          color: var(--gray-900);
        }

        .profile-content {
          display: flex;
          justify-content: center;
        }

        .profile-card {
          background: var(--white);
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          padding: 0;
          width: 100%;
          max-width: 500px;
          overflow: hidden;
        }

        .profile-header-section {
          background: linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%);
          padding: 32px;
          text-align: center;
          position: relative;
        }

        .avatar-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brand);
          font-size: 32px;
          font-weight: 700;
          margin: 0 auto 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .profile-name {
          color: var(--white);
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 4px;
          letter-spacing: -0.5px;
        }

        .profile-email {
          color: rgba(255, 255, 255, 0.85);
          font-size: 0.9rem;
          margin: 0;
          font-weight: 500;
        }

        .profile-body {
          padding: 32px;
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 28px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: var(--gray-50);
          border-radius: var(--radius-sm);
          border: 1px solid var(--gray-100);
          transition: all 0.15s ease;
        }

        .detail-item:hover {
          background: var(--gray-100);
          border-color: var(--gray-200);
        }

        .detail-label {
          font-weight: 600;
          color: var(--gray-600);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-value {
          color: var(--gray-900);
          font-size: 14px;
          font-weight: 600;
        }

        .role-badge {
          background: var(--blue);
          color: var(--white);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .status-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .status-badge.active {
          background: #dcfce7;
          color: #166534;
        }

        .status-badge.suspended {
          background: #fee2e2;
          color: #991b1b;
        }

        .button-group {
          display: flex;
          gap: 12px;
        }

        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: var(--radius-xs);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          text-decoration: none;
          line-height: 1;
        }

        .btn:active {
          transform: translateY(1px);
        }

        .btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none;
        }

        .back-btn {
          background: var(--gray-700);
          color: var(--white);
        }

        .back-btn:hover:not(:disabled) {
          background: var(--gray-900);
        }

        .edit-btn {
          background: var(--brand);
          color: var(--white);
          box-shadow: 0 2px 6px rgba(232, 93, 4, 0.30);
        }

        .edit-btn:hover:not(:disabled) {
          background: var(--brand-dark);
          box-shadow: 0 4px 10px rgba(232, 93, 4, 0.35);
        }

        .edit-card {
          background: var(--white);
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          padding: 32px;
          width: 100%;
          max-width: 500px;
        }

        .edit-card h2 {
          color: var(--gray-900);
          font-size: 20px;
          font-weight: 700;
          text-align: center;
          margin: 0 0 24px;
          letter-spacing: -0.4px;
        }

        .edit-info {
          width: 100%;
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--gray-700);
          margin-bottom: 6px;
          letter-spacing: 0.01em;
        }

        .form-group input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid var(--gray-200);
          border-radius: var(--radius-xs);
          font-size: 15px;
          color: var(--gray-900);
          background: var(--white);
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }

        .form-group input:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px rgba(232, 93, 4, 0.12);
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .form-actions .btn {
          flex: 1;
        }

        .btn-secondary {
          background: var(--gray-700);
          color: var(--white);
        }

        .btn-secondary:hover:not(:disabled) {
          background: var(--gray-900);
        }

        .btn-primary {
          background: var(--brand);
          color: var(--white);
          box-shadow: 0 2px 6px rgba(232, 93, 4, 0.30);
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--brand-dark);
          box-shadow: 0 4px 10px rgba(232, 93, 4, 0.35);
        }

        .alert {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: var(--radius-xs);
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 18px;
        }

        .alert-success {
          background: var(--green-bg);
          color: #15803d;
          border: 1px solid #bbf7d0;
        }

        .alert-error {
          background: var(--red-bg);
          color: #b91c1c;
          border: 1px solid #fecaca;
        }

        @media (max-width: 768px) {
          .container {
            padding: 16px;
          }

          .profile-header {
            padding: 16px 20px;
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }

          .profile-header h1 {
            font-size: 20px;
          }

          .profile-card,
          .edit-card {
            max-width: 100%;
          }

          .profile-header-section {
            padding: 24px;
          }

          .profile-body {
            padding: 24px;
          }

          .detail-item {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
            text-align: left;
          }

          .button-group,
          .form-actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
