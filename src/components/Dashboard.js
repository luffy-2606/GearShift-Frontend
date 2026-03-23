import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.firstName ?? user?.first_name;
  const lastName = user?.lastName ?? user?.last_name;

  return (
    <div className="container">
      {/* Modern header box */}
      <div className="dashboard-header modern-header">
        <h1>Welcome to GearShift</h1>
        <div className="user-info">
          <span>Welcome, {firstName} {lastName}</span>
        </div>
      </div>

      {/* Modern themed card */}
      <div className="dashboard-card">
        <h2>Vehicle Diagnostics & Service Marketplace</h2>
        <p>
          GearShift connects car owners with trusted mechanics and provides comprehensive 
          diagnostic tools to help you understand your vehicle's needs.
        </p>
        
        <div className="features-section">
          <h3>Features Coming Soon:</h3>
          <ul>
            <li>Vehicle diagnostic tools and error code interpretation</li>
            <li>Find and book trusted local mechanics</li>
            <li>Compare prices for spare parts from multiple vendors</li>
            <li>Service history tracking and maintenance reminders</li>
            <li>Real-time parts availability and pricing</li>
          </ul>
        </div>

        {user?.role === 'admin' && (
          <div className="admin-link">
            <a href="/admin" className="btn btn-primary">
              Go to Admin Panel
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
