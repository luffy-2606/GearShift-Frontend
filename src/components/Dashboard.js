import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const firstName = user?.firstName ?? user?.first_name;
  const lastName = user?.lastName ?? user?.last_name;

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Welcome to GearShift</h1>
        <div className="user-info">
          <span>Welcome, {firstName} {lastName}</span>
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2>Vehicle Diagnostics & Service Marketplace</h2>
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          GearShift connects car owners with trusted mechanics and provides comprehensive 
          diagnostic tools to help you understand your vehicle's needs.
        </p>
        
        <div style={{ marginTop: '30px' }}>
          <h3>Features Coming Soon:</h3>
          <ul style={{ color: '#666', lineHeight: '1.8' }}>
            <li>Vehicle diagnostic tools and error code interpretation</li>
            <li>Find and book trusted local mechanics</li>
            <li>Compare prices for spare parts from multiple vendors</li>
            <li>Service history tracking and maintenance reminders</li>
            <li>Real-time parts availability and pricing</li>
          </ul>
        </div>

        {user?.role === 'admin' && (
          <div style={{ marginTop: '30px' }}>
            <a href="/admin" className="btn">
              Go to Admin Panel
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
