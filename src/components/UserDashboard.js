import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../lib/apiClient';
import { Calendar, DollarSign, Wrench, Car, User, Clock, TrendingUp, MapPin, Phone, Mail, Settings, ArrowRight, Bell } from 'lucide-react';
import { countSystemMessages } from '../lib/systemMessagesStore';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [serviceHistory, setServiceHistory] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [costInsights, setCostInsights] = useState(null);
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get auth token
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          return;
        }
        
        // Fetch user profile
        try {
          const userResponse = await apiClient.get('/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserData(userResponse.data);
        } catch (userErr) {
          console.error('Error fetching user profile:', userErr);
          // Continue with default user data
          setUserData({ first_name: 'User', last_name: '' });
        }

        // Fetch vehicles
        try {
          const vehiclesResponse = await apiClient.get('/api/vehicles', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setVehicles(vehiclesResponse.data.data || []);
        } catch (vehicleErr) {
          console.error('Error fetching vehicles:', vehicleErr);
          // Continue with empty vehicles array
          setVehicles([]);
        }

        // Fetch mechanics
        try {
          const mechanicsResponse = await apiClient.get('/api/mechanics', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setMechanics(mechanicsResponse.data.data || []);
        } catch (mechanicErr) {
          console.error('Error fetching mechanics:', mechanicErr);
          // Continue with empty mechanics array
          setMechanics([]);
        }

        // Fetch cost insights
        try {
          const costResponse = await apiClient.get('/api/cost-insights', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (costResponse.data.success) {
            setCostInsights(costResponse.data.data);
          }
        } catch (costErr) {
          console.error('Error fetching cost insights:', costErr);
          // Continue without cost insights
        }

        // Fetch shops
        try {
          const shopsResponse = await apiClient.get('/api/shops', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (shopsResponse.data.success) {
            setShops(shopsResponse.data.data || []);
          }
        } catch (shopsErr) {
          console.error('Error fetching shops:', shopsErr);
          // Continue without shops
        }

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const refresh = () => setUnreadMessages(countSystemMessages({ status: 'unread' }));
    refresh();
    const interval = setInterval(refresh, 5000);
    const onStorage = (e) => {
      if (e.key === 'systemMessagesV1' || e.key === 'pendingConfirmations') refresh();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const systemMessagesLabel = useMemo(
    () => `System Messages${unreadMessages > 0 ? ` (${unreadMessages})` : ''}`,
    [unreadMessages]
  );

  // Fetch service history after vehicles are loaded
  useEffect(() => {
    if (vehicles.length > 0) {
      const fetchServiceHistory = async () => {
        try {
          const token = localStorage.getItem('token');
          const historyResponses = await Promise.all(
            vehicles.map((vehicle) =>
              apiClient.get(`/api/vehicles/${vehicle.id}/service-history`, {
                headers: { Authorization: `Bearer ${token}` }
              })
            )
          );
          const allHistory = historyResponses.flatMap((response) => response.data?.data || []);
          setServiceHistory(allHistory);
        } catch (err) {
          console.error('Error fetching service history:', err);
          // Continue with empty service history
          setServiceHistory([]);
        }
      };
      
      fetchServiceHistory();
    }
  }, [vehicles]);

  // Process data for dashboard display
  const getDashboardData = () => {
    // Handle case where no user data or vehicles
    if (!userData) {
      return {
        userName: 'User',
        garageCondition: 85,
        monthlyBudgetSpent: 62,
        vehicle: {
          make: 'N/A',
          model: 'N/A', 
          year: 'N/A',
          mileage: 0,
          vin: 'N/A',
          color: 'N/A',
          licensePlate: 'N/A'
        },
        maintenanceReminders: [],
        shopsVisited: [],
        mechanicsWorkedWith: []
      };
    }

    const vehicle = vehicles.length > 0 ? vehicles[0] : null;
    const userName = `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'User';

    // Process service history to get shops visited and maintenance reminders
    const shopsMap = new Map();
    const maintenanceReminders = [];
    const vehicleMileageById = new Map(
      vehicles.map((v) => [v.id, Number(v.mileage) || 0])
    );

    // If no service history, return live empty reminders and neutral score
    if (!serviceHistory || serviceHistory.length === 0) {
      return {
        userName,
        garageCondition: 100,
        monthlyBudgetSpent: 62,
        vehicle: vehicle ? {
          make: vehicle.make || 'N/A',
          model: vehicle.model || 'N/A',
          year: vehicle.year || 'N/A',
          mileage: vehicle.mileage || 0,
          vin: vehicle.vin || 'N/A',
          color: vehicle.color || 'N/A',
          licensePlate: vehicle.license_plate || 'N/A'
        } : {
          make: 'N/A',
          model: 'N/A',
          year: 'N/A', 
          mileage: 0,
          vin: 'N/A',
          color: 'N/A',
          licensePlate: 'N/A'
        },
        maintenanceReminders: [],
        shopsVisited: [],
        mechanicsWorkedWith: []
      };
    }

    let dueOrOverdueCount = 0;
    const upcomingThresholdMiles = 500;

    serviceHistory.forEach((service) => {
      // Track shops
      if (service.shop) {
        const shopId = service.shop.id;
        if (shopsMap.has(shopId)) {
          const shopData = shopsMap.get(shopId);
          shopsMap.set(shopId, {
            ...shopData,
            visits: shopData.visits + 1,
            lastVisit: service.service_date > shopData.lastVisit ? service.service_date : shopData.lastVisit
          });
        } else {
          shopsMap.set(shopId, {
            id: shopId,
            name: service.shop.name,
            visits: 1,
            lastVisit: service.service_date
          });
        }
      }

      const currentMileage = vehicleMileageById.get(service.vehicle_id) || 0;
      const nextDueMileage = Number(service.next_service_due_mileage);
      if (!Number.isFinite(nextDueMileage) || nextDueMileage <= 0) return;

      const milesRemaining = nextDueMileage - currentMileage;
      if (milesRemaining <= upcomingThresholdMiles) {
        const isDue = currentMileage >= nextDueMileage;
        if (isDue) dueOrOverdueCount += 1;

        maintenanceReminders.push({
          id: service.id,
          service: service.service_type || 'Service',
          dueDate: isDue ? 'Due now' : `Due in ${milesRemaining.toLocaleString()} mi`,
          priority: isDue ? 'high' : milesRemaining <= 250 ? 'medium' : 'low'
        });
      }
    });

    const shopsVisited = Array.from(shopsMap.values()).slice(0, 3);

    // Process mechanics from service history
    const mechanicsMap = new Map();
    serviceHistory.forEach((service) => {
      if (service.mechanic) {
        const mechanicId = service.mechanic.id;
        if (!mechanicsMap.has(mechanicId)) {
          mechanicsMap.set(mechanicId, {
            id: mechanicId,
            name: `${service.mechanic.first_name || ''} ${service.mechanic.last_name || ''}`.trim(),
            specialty: 'Mechanic',
            rating: 4.5
          });
        }
      }
    });

    const mechanicsWorkedWith = Array.from(mechanicsMap.values()).slice(0, 3);

    const garageCondition = Math.max(0, 100 - (dueOrOverdueCount * 5));

    return {
      userName,
      garageCondition,
      monthlyBudgetSpent: 62,
      vehicle: vehicle ? {
        make: vehicle.make || 'N/A',
        model: vehicle.model || 'N/A',
        year: vehicle.year || 'N/A',
        mileage: vehicle.mileage || 0,
        vin: vehicle.vin || 'N/A',
        color: vehicle.color || 'N/A',
        licensePlate: vehicle.license_plate || 'N/A'
      } : {
        make: 'N/A',
        model: 'N/A',
        year: 'N/A', 
        mileage: 0,
        vin: 'N/A',
        color: 'N/A',
        licensePlate: 'N/A'
      },
      maintenanceReminders: maintenanceReminders
        .sort((a, b) => {
          const priorityRank = { high: 0, medium: 1, low: 2 };
          return priorityRank[a.priority] - priorityRank[b.priority];
        })
        .slice(0, 3),
      shopsVisited,
      mechanicsWorkedWith
    };
  };

  const dashboardData = getDashboardData();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
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
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.2)'
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '120px 2rem 2rem 2rem',
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
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div style={{ 
        padding: '120px 2rem 2rem 2rem',
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
          {error || 'No vehicle data found. Please add a vehicle to view your dashboard.'}
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
      {/* Greeting Section */}
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
          {getGreeting()}, {dashboardData.userName}!
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.6)',
          fontWeight: 400,
          letterSpacing: '0.01em'
        }}>
          Welcome back to your dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '32px',
        marginBottom: '60px'
      }}>
        {/* Garage Condition Card */}
        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, cardHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, cardStyle);
          }}
        >
          <h3 style={{
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 600
          }}>
            Garage Condition
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `conic-gradient(#dc2626 ${dashboardData.garageCondition}%, rgba(255, 255, 255, 0.1) 0)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 0 40px rgba(220, 38, 38, 0.3)'
            }}>
              <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                background: 'rgba(10, 10, 10, 0.9)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#ffffff'
                }}>
                  {dashboardData.garageCondition}%
                </span>
              </div>
            </div>
            <div>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.5)',
                marginBottom: '8px',
                letterSpacing: '0.02em'
              }}>
                Overall health
              </p>
              <p style={{
                fontSize: '1.5rem',
                color: '#ffffff',
                fontWeight: 600,
                letterSpacing: '-0.01em'
              }}>
                Excellent
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Budget Card */}
        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, cardHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, cardStyle);
          }}
        >
          <h3 style={{
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 600
          }}>
            Monthly Budget
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `conic-gradient(#dc2626 ${dashboardData.monthlyBudgetSpent}%, rgba(255, 255, 255, 0.1) 0)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 0 40px rgba(220, 38, 38, 0.3)'
            }}>
              <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                background: 'rgba(10, 10, 10, 0.9)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#ffffff'
                }}>
                  {dashboardData.monthlyBudgetSpent}%
                </span>
              </div>
            </div>
            <div>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.5)',
                marginBottom: '8px',
                letterSpacing: '0.02em'
              }}>
                Budget spent
              </p>
              <p style={{
                fontSize: '1.5rem',
                color: '#ffffff',
                fontWeight: 600,
                letterSpacing: '-0.01em'
              }}>
                $620 / $1,000
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Overview Card */}
      <div 
        style={cardStyle}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, cardHoverStyle);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, cardStyle);
        }}
      >
        <h3 style={{
          fontSize: '1.5rem',
          color: '#ffffff',
          marginBottom: '32px',
          fontWeight: 600,
          letterSpacing: '-0.02em'
        }}>
          Vehicle Overview
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          {[
            { label: 'Make', value: dashboardData.vehicle.make },
            { label: 'Model', value: dashboardData.vehicle.model },
            { label: 'Year', value: dashboardData.vehicle.year },
            { label: 'Mileage', value: `${dashboardData.vehicle.mileage.toLocaleString()} mi` },
            { label: 'VIN', value: dashboardData.vehicle.vin },
            { label: 'Color', value: dashboardData.vehicle.color },
            { label: 'License Plate', value: dashboardData.vehicle.licensePlate }
          ].map((item, index) => (
            <div key={index} style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600
              }}>
                {item.label}
              </p>
              <p style={{
                fontSize: '1.125rem',
                color: '#ffffff',
                fontWeight: 500,
                letterSpacing: '-0.01em'
              }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Reminders & Shops Visited */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '32px',
        marginTop: '32px'
      }}>
        {/* Maintenance Reminders */}
        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, cardHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, cardStyle);
          }}
        >
          <h3 style={{
            fontSize: '1.5rem',
            color: '#ffffff',
            marginBottom: '32px',
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            Maintenance Reminders
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {dashboardData.maintenanceReminders.length > 0 ? (
              dashboardData.maintenanceReminders.map((reminder) => (
                <div
                  key={reminder.id}
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
                      {reminder.service}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      letterSpacing: '0.01em'
                    }}>
                      Due: {reminder.dueDate}
                    </p>
                  </div>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: getPriorityColor(reminder.priority),
                    boxShadow: `0 0 20px ${getPriorityColor(reminder.priority)}`
                  }} />
                </div>
              ))
            ) : (
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '1rem' }}>
                No maintenance reminders
              </p>
            )}
          </div>
        </div>

        {/* Shops Visited */}
        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, cardHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, cardStyle);
          }}
        >
          <h3 style={{
            fontSize: '1.5rem',
            color: '#ffffff',
            marginBottom: '32px',
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            Shops Visited
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {dashboardData.shopsVisited.length > 0 ? (
              dashboardData.shopsVisited.map((shop) => (
                <div
                  key={shop.id}
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
                      {shop.name}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      letterSpacing: '0.01em'
                    }}>
                      {shop.visits} visits • Last: {shop.lastVisit}
                    </p>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    color: '#ffffff',
                    padding: '8px 20px',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
                  }}>
                    {shop.visits}
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '1rem' }}>
                No shops visited yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mechanics Worked With */}
      <div 
        style={{ ...cardStyle, marginTop: '32px' }}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, cardHoverStyle);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, cardStyle);
        }}
      >
        <h3 style={{
          fontSize: '1.5rem',
          color: '#ffffff',
          marginBottom: '32px',
          fontWeight: 600,
          letterSpacing: '-0.02em'
        }}>
          Mechanics Worked With
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {dashboardData.mechanicsWorkedWith.length > 0 ? (
            dashboardData.mechanicsWorkedWith.map((mechanic) => (
              <div
                key={mechanic.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '24px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    boxShadow: '0 8px 20px rgba(220, 38, 38, 0.3)'
                  }}>
                    {mechanic.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{
                      fontSize: '1.125rem',
                      color: '#ffffff',
                      fontWeight: 600,
                      marginBottom: '4px',
                      letterSpacing: '-0.01em'
                    }}>
                      {mechanic.name}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      letterSpacing: '0.01em'
                    }}>
                      {mechanic.specialty}
                    </p>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  background: 'rgba(220, 38, 38, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid ' + 'rgba(220, 38, 38, 0.2)'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#dc2626',
                    letterSpacing: '-0.02em'
                  }}>
                    {mechanic.rating}
                  </span>
                  <span style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontWeight: 500
                  }}>
                    / 5.0
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '1rem' }}>
              No mechanics worked with yet
            </p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div 
        style={{ ...cardStyle, marginTop: '32px' }}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, cardHoverStyle);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, cardStyle);
        }}
      >
        <h3 style={{
          fontSize: '1.5rem',
          color: '#ffffff',
          marginBottom: '32px',
          fontWeight: 600,
          letterSpacing: '-0.02em'
        }}>
          Quick Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {[
            { icon: Calendar, label: 'Book Appointment', color: '#dc2626' },
            { icon: Bell, label: systemMessagesLabel, color: '#f59e0b', onClick: () => navigate('/system-messages') },
            { icon: MapPin, label: 'Find Shops', color: '#f59e0b' },
            { icon: Wrench, label: 'Contact Mechanics', color: '#10b981' },
            { icon: Car, label: 'My Vehicles', color: '#3b82f6' }
          ].map((action, index) => (
            <button
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={action.onClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = action.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <action.icon size={32} style={{ color: action.color }} />
              <span style={{
                fontSize: '0.95rem',
                color: '#ffffff',
                fontWeight: 500,
                textAlign: 'center'
              }}>
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Profile Summary */}
      <div 
        style={{ ...cardStyle, marginTop: '32px' }}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, cardHoverStyle);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, cardStyle);
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <User size={24} style={{ color: '#dc2626' }} />
          <h3 style={{
            fontSize: '1.5rem',
            color: '#ffffff',
            fontWeight: 600,
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            Profile Summary
          </h3>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <User size={20} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
            <div>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600
              }}>
                Name
              </p>
              <p style={{
                fontSize: '1rem',
                color: '#ffffff',
                fontWeight: 500,
                margin: 0
              }}>
                {dashboardData.userName}
              </p>
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <Car size={20} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
            <div>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600
              }}>
                Vehicles
              </p>
              <p style={{
                fontSize: '1rem',
                color: '#ffffff',
                fontWeight: 500,
                margin: 0
              }}>
                {vehicles.length} {vehicles.length === 1 ? 'Vehicle' : 'Vehicles'}
              </p>
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <Clock size={20} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
            <div>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600
              }}>
                Services
              </p>
              <p style={{
                fontSize: '1rem',
                color: '#ffffff',
                fontWeight: 500,
                margin: 0
              }}>
                {serviceHistory.length} Total
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service History Preview */}
      {serviceHistory.length > 0 && (
        <div 
          style={{ ...cardStyle, marginTop: '32px' }}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, cardHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, cardStyle);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <Calendar size={24} style={{ color: '#dc2626' }} />
            <h3 style={{
              fontSize: '1.5rem',
              color: '#ffffff',
              fontWeight: 600,
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              Recent Services
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {serviceHistory.slice(0, 3).map((service) => (
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
                    {service.service_type || 'Service'}
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '4px',
                    letterSpacing: '0.01em'
                  }}>
                    {service.shop?.name || 'Unknown Shop'}
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    letterSpacing: '0.01em'
                  }}>
                    {new Date(service.service_date).toLocaleDateString()}
                  </p>
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#dc2626',
                  letterSpacing: '-0.02em'
                }}>
                  ${service.total_cost || 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cost Insights Summary */}
      {costInsights && (
        <div 
          style={{ ...cardStyle, marginTop: '32px' }}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, cardHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, cardStyle);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <DollarSign size={24} style={{ color: '#dc2626' }} />
            <h3 style={{
              fontSize: '1.5rem',
              color: '#ffffff',
              fontWeight: 600,
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              Spending Overview
            </h3>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600
              }}>
                Total Spent
              </p>
              <p style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#dc2626',
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                ${costInsights.totalSpent?.toLocaleString() || 0}
              </p>
            </div>
            <div style={{
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600
              }}>
                Avg Cost
              </p>
              <p style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#f59e0b',
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                ${Math.round(costInsights.averageCostPerService || 0)}
              </p>
            </div>
            <div style={{
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600
              }}>
                Services
              </p>
              <p style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#10b981',
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                {costInsights.totalServices || 0}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Shops */}
      {shops.length > 0 && (
        <div 
          style={{ ...cardStyle, marginTop: '32px' }}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, cardHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, cardStyle);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <MapPin size={24} style={{ color: '#dc2626' }} />
            <h3 style={{
              fontSize: '1.5rem',
              color: '#ffffff',
              fontWeight: 600,
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              Recommended Shops
            </h3>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {shops.slice(0, 3).map((shop) => (
              <div
                key={shop.id}
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
                <p style={{
                  fontSize: '1.125rem',
                  color: '#ffffff',
                  fontWeight: 600,
                  marginBottom: '8px',
                  letterSpacing: '-0.01em'
                }}>
                  {shop.name}
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '12px',
                  letterSpacing: '0.01em'
                }}>
                  {shop.address}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#dc2626'
                  }}>
                    ★ {shop.average_rating || 4.5}
                  </span>
                  <span style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}>
                    Rating
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
