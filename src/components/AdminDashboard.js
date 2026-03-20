import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleSuspendUser = async (userId) => {
    try {
      await axios.put(`/api/admin/users/${userId}/suspend`);
      setMessage('User suspended successfully');
      fetchUsers();
    } catch (error) {
      setMessage('Error suspending user');
    }
  };

  const handleReactivateUser = async (userId) => {
    try {
      await axios.put(`/api/admin/users/${userId}/reactivate`);
      setMessage('User reactivated successfully');
      fetchUsers();
    } catch (error) {
      setMessage('Error reactivating user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        setMessage('User deleted successfully');
        fetchUsers();
      } catch (error) {
        setMessage('Error deleting user');
      }
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>Admin: {user?.firstName ?? user?.first_name} {user?.lastName ?? user?.last_name}</span>
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>

      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <div className="admin-table">
        <h2 style={{ padding: '20px', margin: 0 }}>User Management</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userItem) => (
              <tr key={userItem.id ?? userItem._id}>
                <td>{(userItem.id ?? userItem._id)?.slice(-8)}</td>
                <td>{userItem.firstName ?? userItem.first_name} {userItem.lastName ?? userItem.last_name}</td>
                <td>{userItem.email}</td>
                <td>{userItem.role}</td>
                <td>
                  <span className={`status-badge status-${userItem.status}`}>
                    {userItem.status}
                  </span>
                </td>
                <td>{new Date(userItem.createdAt ?? userItem.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    {userItem.status === 'active' ? (
                      <button
                        className="btn-small btn-danger"
                        onClick={() => handleSuspendUser(userItem.id ?? userItem._id)}
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        className="btn-small"
                        style={{ backgroundColor: '#28a745', color: 'white' }}
                        onClick={() => handleReactivateUser(userItem.id ?? userItem._id)}
                      >
                        Reactivate
                      </button>
                    )}
                    <button
                      className="btn-small btn-danger"
                      onClick={() => handleDeleteUser(userItem.id ?? userItem._id)}
                      disabled={(userItem.id ?? userItem._id) === (user?.id ?? user?._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <a href="/dashboard" className="btn btn-secondary">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;
