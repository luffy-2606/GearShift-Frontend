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
          <div className="profile-section">
            <form onSubmit={handleProfileUpdate} className="profile-form">
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
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Updating...' : 'Save Changes'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleEditToggle} disabled={loading}>
                  Cancel
                </button>
              </div>
            </form>
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
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user?.firstName?.[0]?.toUpperCase() || user?.first_name?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
          
          <div className="profile-info">
            <h2>{user?.first_name || user?.firstName} {user?.last_name || user?.lastName}</h2>
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{user?.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Role:</span>
                <span className="detail-value role-badge">{user?.role}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Member Since:</span>
                <span className="detail-value">{user?.created_at ? formatDate(user.created_at) : 'Unknown'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status-badge ${user?.status}`}>
                  {user?.status}
                </span>
              </div>
            </div>
            
            <div className="button-group">
              <button className="btn btn-secondary back-btn" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </button>
              <button className="btn btn-primary edit-btn" onClick={handleEditToggle}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-header {
          margin-bottom: 30px;
          text-align: center;
          color: var(--white);
        }

        .profile-header h1 {
          color: var(--white);
          font-size: 28px;
          font-weight: 700;
        }

        .profile-content {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .profile-card {
          background: linear-gradient(135deg, #1e293b, #0f172a);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 40px;
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 25px;
        }

        .profile-avatar {
          flex-shrink: 0;
        }

        .avatar-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .profile-info {
          flex: 1;
          width: 100%;
        }

        .profile-info h2 {
          margin: 0 0 20px 0;
          color: var(--brand-light);
          font-size: 24px;
          font-weight: 700;
          text-align: center;
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 25px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .detail-label {
          font-weight: 600;
          color: var(--gray-400);
          font-size: 14px;
        }

        .detail-value {
          color: var(--gray-100);
          font-size: 14px;
          font-weight: 500;
        }

        .role-badge {
          background: var(--blue);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge.active {
          background: rgba(22, 163, 74, 0.2);
          color: #4ade80;
          border: 1px solid rgba(74, 222, 128, 0.3);
        }

        .status-badge.suspended {
          background: rgba(239, 68, 68, 0.2);
          color: #f87171;
          border: 1px solid rgba(248, 113, 113, 0.3);
        }

        .edit-btn {
          width: auto;
          padding: 12px 24px;
        }

        .button-group {
          display: flex;
          gap: 12px;
          justify-content: center;
          width: 100%;
        }

        .back-btn {
          background: var(--gray-700);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          border: none;
          width: auto;
        }

        .back-btn:hover {
          background: var(--gray-900);
        }

        /* ── Edit mode ── */
        .profile-section {
          background: linear-gradient(135deg, #1e293b, #0f172a);
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          width: 100%;
          max-width: 500px;
        }

        .profile-section h2 {
          margin-bottom: 20px;
          color: var(--brand-light);
          text-align: center;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 5px;
          font-weight: 600;
          color: var(--gray-100);
          font-size: 13px;
        }

        .form-group input {
          padding: 12px;
          border: 1.5px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.06);
          color: var(--gray-100);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-group input::placeholder {
          color: var(--gray-400);
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--brand);
          box-shadow: 0 0 0 3px rgba(232, 93, 4, 0.15);
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .form-actions .btn {
          flex: 1;
        }

        .alert {
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          font-size: 14px;
        }

        .alert-success {
          background-color: rgba(22, 163, 74, 0.15);
          color: #4ade80;
          border: 1px solid rgba(74, 222, 128, 0.3);
        }

        .alert-error {
          background-color: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border: 1px solid rgba(248, 113, 113, 0.3);
        }

        @media (max-width: 768px) {
          .profile-card {
            padding: 30px 20px;
            gap: 20px;
          }

          .detail-item {
            flex-direction: column;
            gap: 4px;
            align-items: flex-start;
          }

          .button-group {
            flex-direction: column;
            gap: 10px;
          }

          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;