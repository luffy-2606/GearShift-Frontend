import React, { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';
import { TrendingUp, DollarSign, Car, Wrench, Calendar, BarChart3, Bookmark } from 'lucide-react';

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
      const response = await apiClient.get('/api/cost-insights', {
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
      const response = await apiClient.get('/api/cost-insights/trends', {
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

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const cardHoverStyle = {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.2)'
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '120px 60px 60px 60px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          color: '#ffffff',
          fontSize: '1.5rem',
          fontWeight: 500
        }}>
          Loading cost insights...
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div style={{ 
        padding: '120px 60px 60px 60px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          color: '#ef4444',
          fontSize: '1.5rem',
          fontWeight: 500
        }}>
          Failed to load cost insights
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '120px 60px 60px 60px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '60px' }}>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '16px',
          letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Cost Insights
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.6)',
          fontWeight: 400,
          letterSpacing: '0.01em'
        }}>
          Track your vehicle maintenance spending and trends
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {['overview', 'vehicles', 'services', 'trends'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              background: activeTab === tab 
                ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' 
                : 'rgba(255, 255, 255, 0.05)',
              border: activeTab === tab 
                ? '1px solid #dc2626' 
                : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textTransform: 'capitalize',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Summary Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            marginBottom: '40px'
          }}>
            <div 
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <DollarSign size={20} style={{ color: '#dc2626' }} />
                <h3 style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  margin: 0
                }}>
                  Total Spent
                </h3>
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
                letterSpacing: '-0.02em'
              }}>
                {formatCurrency(insights.totalSpent)}
              </div>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.5)',
                margin: 0
              }}>
                Across {insights.totalServices} services
              </p>
            </div>

            <div 
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <TrendingUp size={20} style={{ color: '#dc2626' }} />
                <h3 style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  margin: 0
                }}>
                  Average Cost
                </h3>
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
                letterSpacing: '-0.02em'
              }}>
                {formatCurrency(insights.averageCostPerService)}
              </div>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.5)',
                margin: 0
              }}>
                Per service average
              </p>
            </div>

            <div 
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Car size={20} style={{ color: '#dc2626' }} />
                <h3 style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  margin: 0
                }}>
                  Total Vehicles
                </h3>
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
                letterSpacing: '-0.02em'
              }}>
                {insights.vehicles.length}
              </div>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.5)',
                margin: 0
              }}>
                Vehicles tracked
              </p>
            </div>
          </div>

          {/* Most Expensive Services */}
          <div 
            style={cardStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <h3 style={{
              fontSize: '1.5rem',
              color: '#ffffff',
              marginBottom: '32px',
              fontWeight: 600,
              letterSpacing: '-0.02em'
            }}>
              Most Expensive Services
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {insights.mostExpensiveServices.map((service) => (
                <div
                  key={service.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div>
                    <p style={{
                      fontSize: '1.125rem',
                      color: '#ffffff',
                      fontWeight: 600,
                      marginBottom: '8px',
                      letterSpacing: '-0.01em'
                    }}>
                      {service.service_type}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      marginBottom: '4px',
                      letterSpacing: '0.01em'
                    }}>
                      {service.vehicle?.year} {service.vehicle?.make} {service.vehicle?.model}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      letterSpacing: '0.01em'
                    }}>
                      {formatDate(service.service_date)}
                    </p>
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#dc2626',
                    letterSpacing: '-0.02em'
                  }}>
                    {formatCurrency(service.total_cost)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Services */}
          <div 
            style={{ ...cardStyle, marginTop: '32px' }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <h3 style={{
              fontSize: '1.5rem',
              color: '#ffffff',
              marginBottom: '32px',
              fontWeight: 600,
              letterSpacing: '-0.02em'
            }}>
              Recent Services
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {insights.recentServices.map((service) => (
                <div
                  key={service.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div>
                    <p style={{
                      fontSize: '1.125rem',
                      color: '#ffffff',
                      fontWeight: 600,
                      marginBottom: '8px',
                      letterSpacing: '-0.01em'
                    }}>
                      {service.service_type}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      marginBottom: '4px',
                      letterSpacing: '0.01em'
                    }}>
                      {service.vehicle?.year} {service.vehicle?.make} {service.vehicle?.model}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      letterSpacing: '0.01em'
                    }}>
                      {formatDate(service.service_date)}
                    </p>
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#dc2626',
                    letterSpacing: '-0.02em'
                  }}>
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px'
        }}>
          {insights.spendingByVehicle.map((vehicleData) => (
            <div
              key={vehicleData.vehicle.id}
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
            >
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  color: '#ffffff',
                  fontWeight: 600,
                  marginBottom: '8px',
                  letterSpacing: '-0.01em'
                }}>
                  {vehicleData.vehicle.year} {vehicleData.vehicle.make} {vehicleData.vehicle.model}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  margin: 0
                }}>
                  {vehicleData.vehicle.license_plate || 'No License Plate'}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
                    Total Spent
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem' }}>
                    {formatCurrency(vehicleData.totalSpent)}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
                    Services
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem' }}>
                    {vehicleData.serviceCount}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0'
                }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
                    Average Cost
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem' }}>
                    {formatCurrency(vehicleData.averageCostPerService)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* By Service Type Tab */}
      {activeTab === 'services' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {Object.entries(insights.spendingByServiceType)
            .sort(([,a], [,b]) => b.totalSpent - a.totalSpent)
            .map(([serviceType, data]) => (
              <div
                key={serviceType}
                style={cardStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <Wrench size={20} style={{ color: '#dc2626' }} />
                  <h3 style={{
                    fontSize: '1.25rem',
                    color: '#ffffff',
                    fontWeight: 600,
                    margin: 0,
                    letterSpacing: '-0.01em'
                  }}>
                    {serviceType}
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
                      Total Spent
                    </span>
                    <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem' }}>
                      {formatCurrency(data.totalSpent)}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
                      Services
                    </span>
                    <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem' }}>
                      {data.serviceCount}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0'
                  }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
                      Average Cost
                    </span>
                    <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem' }}>
                      {formatCurrency(data.averageCost)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await apiClient.post('/api/bookmarks', {
                        entity_type: 'quote_snapshot',
                        title: `Spending: ${serviceType}`,
                        snapshot: {
                          source: 'cost_insights_by_service',
                          serviceType,
                          totalSpent: data.totalSpent,
                          serviceCount: data.serviceCount,
                          averageCost: data.averageCost,
                        },
                        tags: ['cost-insights'],
                      });
                      alert('Saved to your Saved list.');
                    } catch (e) {
                      alert(e.response?.data?.message || 'Could not save.');
                    }
                  }}
                  style={{
                    marginTop: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Bookmark size={16} />
                  Save insight
                </button>
              </div>
            ))}
        </div>
      )}

      {/* Trends Tab */}
      {activeTab === 'trends' && (
        <div>
          <div 
            style={cardStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <BarChart3 size={20} style={{ color: '#dc2626' }} />
              <h3 style={{
                fontSize: '1.5rem',
                color: '#ffffff',
                fontWeight: 600,
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                Monthly Spending Trends
              </h3>
            </div>
            {trends && trends.trends.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {trends.trends.map((trend) => (
                  <div
                    key={trend.month}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <span style={{ color: '#ffffff', fontWeight: 500, fontSize: '0.95rem' }}>
                      {trend.month}
                    </span>
                    <span style={{ color: '#dc2626', fontWeight: 700, fontSize: '1.125rem' }}>
                      {formatCurrency(trend.amount)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '1rem' }}>
                No trend data available
              </p>
            )}
          </div>

          {/* Spending by Provider */}
          <div 
            style={{ ...cardStyle, marginTop: '32px' }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <h3 style={{
              fontSize: '1.5rem',
              color: '#ffffff',
              marginBottom: '32px',
              fontWeight: 600,
              letterSpacing: '-0.02em'
            }}>
              Spending by Provider
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {Object.entries(insights.spendingByProvider)
                .sort(([,a], [,b]) => b.totalSpent - a.totalSpent)
                .map(([providerName, data]) => (
                  <div
                    key={providerName}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '20px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h4 style={{
                        fontSize: '1.125rem',
                        color: '#ffffff',
                        fontWeight: 600,
                        margin: 0,
                        letterSpacing: '-0.01em'
                      }}>
                        {providerName}
                      </h4>
                      <span style={{
                        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                        color: '#ffffff',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        {data.providerType}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
                          Total Spent
                        </span>
                        <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.95rem' }}>
                          {formatCurrency(data.totalSpent)}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
                          Services
                        </span>
                        <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.95rem' }}>
                          {data.serviceCount}
                        </span>
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
