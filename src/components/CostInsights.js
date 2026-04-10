import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CostInsights.css';

const CostInsights = () => {
  const [insights, setInsights] = useState(null);
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchCostInsights();
    fetchSpendingTrends();
  }, []);

  const fetchCostInsights = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/cost-insights', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setInsights(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching cost insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSpendingTrends = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/cost-insights/trends', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setTrends(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching spending trends:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading cost insights...</div>;
  }

  if (!insights) {
    return <div className="error">Failed to load cost insights</div>;
  }

  return (
    <div className="cost-insights">
      <h2>Cost Insights</h2>
      
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'vehicles' ? 'active' : ''}`}
          onClick={() => setActiveTab('vehicles')}
        >
          By Vehicle
        </button>
        <button 
          className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          By Service Type
        </button>
        <button 
          className={`tab-btn ${activeTab === 'trends' ? 'active' : ''}`}
          onClick={() => setActiveTab('trends')}
        >
          Trends
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="overview-tab">
          <div className="summary-cards">
            <div className="summary-card">
              <h3>Total Spent</h3>
              <div className="amount">{formatCurrency(insights.totalSpent)}</div>
              <p>Across {insights.totalServices} services</p>
            </div>
            <div className="summary-card">
              <h3>Average Cost per Service</h3>
              <div className="amount">{formatCurrency(insights.averageCostPerService)}</div>
              <p>Per service average</p>
            </div>
            <div className="summary-card">
              <h3>Total Vehicles</h3>
              <div className="amount">{insights.vehicles.length}</div>
              <p>Vehicles tracked</p>
            </div>
          </div>

          {/* Most Expensive Services */}
          <div className="section">
            <h3>Most Expensive Services</h3>
            <div className="service-list">
              {insights.mostExpensiveServices.map((service, index) => (
                <div key={service.id} className="service-item">
                  <div className="service-info">
                    <h4>{service.service_type}</h4>
                    <p>{service.vehicle?.year} {service.vehicle?.make} {service.vehicle?.model}</p>
                    <p>{formatDate(service.service_date)}</p>
                  </div>
                  <div className="service-cost">
                    {formatCurrency(service.total_cost)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Services */}
          <div className="section">
            <h3>Recent Services</h3>
            <div className="service-list">
              {insights.recentServices.map((service) => (
                <div key={service.id} className="service-item">
                  <div className="service-info">
                    <h4>{service.service_type}</h4>
                    <p>{service.vehicle?.year} {service.vehicle?.make} {service.vehicle?.model}</p>
                    <p>{formatDate(service.service_date)}</p>
                  </div>
                  <div className="service-cost">
                    {formatCurrency(service.total_cost)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* By Vehicle Tab */}
      {activeTab === 'vehicles' && (
        <div className="vehicles-tab">
          <div className="vehicle-list">
            {insights.spendingByVehicle.map((vehicleData) => (
              <div key={vehicleData.vehicle.id} className="vehicle-card">
                <div className="vehicle-header">
                  <h3>{vehicleData.vehicle.year} {vehicleData.vehicle.make} {vehicleData.vehicle.model}</h3>
                  <p>{vehicleData.vehicle.license_plate || 'No License Plate'}</p>
                </div>
                <div className="vehicle-stats">
                  <div className="stat">
                    <span className="label">Total Spent:</span>
                    <span className="value">{formatCurrency(vehicleData.totalSpent)}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Services:</span>
                    <span className="value">{vehicleData.serviceCount}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Average Cost:</span>
                    <span className="value">{formatCurrency(vehicleData.averageCostPerService)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* By Service Type Tab */}
      {activeTab === 'services' && (
        <div className="services-tab">
          <div className="service-type-list">
            {Object.entries(insights.spendingByServiceType)
              .sort(([,a], [,b]) => b.totalSpent - a.totalSpent)
              .map(([serviceType, data]) => (
                <div key={serviceType} className="service-type-card">
                  <div className="service-type-header">
                    <h3>{serviceType}</h3>
                  </div>
                  <div className="service-type-stats">
                    <div className="stat">
                      <span className="label">Total Spent:</span>
                      <span className="value">{formatCurrency(data.totalSpent)}</span>
                    </div>
                    <div className="stat">
                      <span className="label">Services:</span>
                      <span className="value">{data.serviceCount}</span>
                    </div>
                    <div className="stat">
                      <span className="label">Average Cost:</span>
                      <span className="value">{formatCurrency(data.averageCost)}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Trends Tab */}
      {activeTab === 'trends' && (
        <div className="trends-tab">
          <div className="trends-section">
            <h3>Monthly Spending Trends</h3>
            {trends && trends.trends.length > 0 ? (
              <div className="trends-chart">
                {trends.trends.map((trend) => (
                  <div key={trend.month} className="trend-bar">
                    <div className="trend-label">{trend.month}</div>
                    <div className="trend-amount">{formatCurrency(trend.amount)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No trend data available</p>
            )}
          </div>

          {/* Spending by Provider */}
          <div className="provider-section">
            <h3>Spending by Provider</h3>
            <div className="provider-list">
              {Object.entries(insights.spendingByProvider)
                .sort(([,a], [,b]) => b.totalSpent - a.totalSpent)
                .map(([providerName, data]) => (
                  <div key={providerName} className="provider-card">
                    <div className="provider-header">
                      <h4>{providerName}</h4>
                      <span className="provider-type">{data.providerType}</span>
                    </div>
                    <div className="provider-stats">
                      <div className="stat">
                        <span className="label">Total Spent:</span>
                        <span className="value">{formatCurrency(data.totalSpent)}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Services:</span>
                        <span className="value">{data.serviceCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostInsights;
