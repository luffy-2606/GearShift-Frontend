import React, { useState, useEffect, useMemo } from 'react';
import apiClient from '../lib/apiClient';
import {
  Calendar,
  DollarSign,
  Wrench,
  Car,
  MapPin,
  Bell,
  ArrowRight,
  UserCircle,
  Store,
  Users,
  ClipboardList,
  PieChart
} from 'lucide-react';
import { countSystemMessages } from '../lib/systemMessagesStore';
import { useNavigate, Link } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
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
        monthlyBudgetSpent: 0,
        monthlySpentAmount: 0,
        monthlyBudgetAmount: null,
        hasMonthlyBudget: false,
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

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const monthlySpentAmount = (serviceHistory || []).reduce((sum, row) => {
      const d = row.service_date ? new Date(row.service_date) : null;
      if (!d || Number.isNaN(d.getTime())) return sum;
      if (d < startOfMonth || d >= nextMonthStart) return sum;
      return sum + (Number(row.total_cost) || 0);
    }, 0);
    const rawBudget = userData.budget;
    const monthlyBudgetAmount =
      rawBudget != null &&
      rawBudget !== '' &&
      Number.isFinite(Number(rawBudget)) &&
      Number(rawBudget) > 0
        ? Number(rawBudget)
        : null;
    const hasMonthlyBudget = monthlyBudgetAmount != null;
    const monthlyBudgetSpent = hasMonthlyBudget
      ? Math.min(100, Math.round((monthlySpentAmount / monthlyBudgetAmount) * 100))
      : 0;
    const lifetimeSpentAmount =
      Number(costInsights?.totalSpent) ||
      (serviceHistory || []).reduce((sum, row) => sum + (Number(row.total_cost) || 0), 0);

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
        monthlyBudgetSpent,
        monthlySpentAmount,
        lifetimeSpentAmount,
        monthlyBudgetAmount,
        hasMonthlyBudget,
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
      monthlyBudgetSpent,
      monthlySpentAmount,
      lifetimeSpentAmount,
      monthlyBudgetAmount,
      hasMonthlyBudget,
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
      case 'high': return '#ffffff';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getMeterMessage = (value) => {
    if (value >= 80) return 'Excellent';
    if (value >= 50) return 'Good';
    return 'Need Checkup';
  };

  const getMeterColor = (value) => {
    if (value >= 80) return '#10b981';
    if (value >= 50) return '#f59e0b';
    return '#ffffff';
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const cardHoverStyle = {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.25)'
  };

  const shortcutLinks = useMemo(
    () => [
      {
        to: '/profile',
        icon: UserCircle,
        title: 'Profile',
        description: 'Account, budget, and vehicle garage'
      },
      {
        to: '/shops',
        icon: Store,
        title: 'Shops',
        description: 'Browse verified shops and book service'
      },
      {
        to: '/mechanics',
        icon: Users,
        title: 'Mechanics',
        description: 'Independent technicians and specialists'
      },
      {
        to: '/service-history',
        icon: ClipboardList,
        title: 'Service history',
        description: 'Past repairs, dates, and costs'
      },
      {
        to: '/cost-insights',
        icon: PieChart,
        title: 'Cost insights',
        description: 'Trends, totals, and expensive jobs'
      },
      {
        to: '/system-messages',
        icon: Bell,
        title: 'System messages',
        description:
          unreadMessages > 0
            ? `${unreadMessages} unread notification${unreadMessages === 1 ? '' : 's'}`
            : 'Alerts and booking confirmations',
        badge: unreadMessages
      }
    ],
    [unreadMessages]
  );

  if (loading) {
    return (
      <div className="user-dashboard-page">
        <div
          style={{
            padding: '120px 2rem 2rem',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 500 }}>
            Loading dashboard…
          </div>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="user-dashboard-page">
        <div
          style={{
            padding: '120px 2rem 2rem',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 500, textAlign: 'center', maxWidth: 480 }}>
            {error || 'No vehicle data found. Please add a vehicle to view your dashboard.'}
          </div>
        </div>
      </div>
    );
  }

  const servicesRecorded = serviceHistory?.length ?? 0;

  return (
    <div className="user-dashboard-page">
      <div className="user-dashboard-page__inner">
        {/* Hero */}
        <header className="user-dashboard-page__hero">
          <div>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 600,
                margin: '0 0 12px'
              }}
            >
              Your overview
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 12px',
                letterSpacing: '-0.03em',
                lineHeight: 1.1
              }}
            >
              {getGreeting()}, {dashboardData.userName.split(' ')[0] || dashboardData.userName}!
            </h1>
            <p
              style={{
                fontSize: '1.0625rem',
                color: 'rgba(255, 255, 255, 0.62)',
                fontWeight: 400,
                letterSpacing: '0.01em',
                margin: 0,
                maxWidth: 520,
                lineHeight: 1.55
              }}
            >
              Garage health, spending, and shortcuts to every part of GearShift — stay ahead of maintenance in one place.
            </p>
          </div>
          <div className="user-dashboard-page__hero-stats" aria-label="Quick facts">
            <div className="user-dashboard-page__hero-stat">
              <p className="user-dashboard-page__hero-stat-value">{vehicles.length}</p>
              <p className="user-dashboard-page__hero-stat-label">Vehicles</p>
            </div>
            <div className="user-dashboard-page__hero-stat">
              <p className="user-dashboard-page__hero-stat-value">{servicesRecorded}</p>
              <p className="user-dashboard-page__hero-stat-label">Services logged</p>
            </div>
            <div className="user-dashboard-page__hero-stat">
              <p className="user-dashboard-page__hero-stat-value">{shops.length}</p>
              <p className="user-dashboard-page__hero-stat-label">Shops listed</p>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '28px',
          marginBottom: '36px'
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
            color: 'rgba(255, 255, 255, 0.6)',
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
              background: `conic-gradient(${getMeterColor(dashboardData.garageCondition)} ${dashboardData.garageCondition}%, rgba(192, 192, 192, 0.2) 0)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: `0 0 40px ${getMeterColor(dashboardData.garageCondition)}20`
            }}>
              <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
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
                color: 'rgba(255, 255, 255, 0.6)',
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
                {getMeterMessage(dashboardData.garageCondition)}
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
            color: 'rgba(255, 255, 255, 0.6)',
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
              background: dashboardData.hasMonthlyBudget
                ? `conic-gradient(${getMeterColor(100 - dashboardData.monthlyBudgetSpent)} ${dashboardData.monthlyBudgetSpent}%, rgba(192, 192, 192, 0.2) 0)`
                : 'rgba(192, 192, 192, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: dashboardData.hasMonthlyBudget
                ? `0 0 40px ${getMeterColor(100 - dashboardData.monthlyBudgetSpent)}20`
                : '0 4px 20px rgba(128, 128, 128, 0.15)'
            }}>
              <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}>
                <span style={{
                  fontSize: dashboardData.hasMonthlyBudget ? '2rem' : '1.25rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  textAlign: 'center',
                  lineHeight: 1.1
                }}>
                  {dashboardData.hasMonthlyBudget
                    ? `${dashboardData.monthlyBudgetSpent}%`
                    : '—'}
                </span>
              </div>
            </div>
            <div>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '8px',
                letterSpacing: '0.02em'
              }}>
                Spent this month (service history)
              </p>
              <p style={{
                fontSize: '1.5rem',
                color: '#ffffff',
                fontWeight: 600,
                letterSpacing: '-0.01em'
              }}>
                {dashboardData.hasMonthlyBudget
                  ? `$${dashboardData.monthlySpentAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} / $${dashboardData.monthlyBudgetAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
                  : `$${dashboardData.monthlySpentAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`}
              </p>
              <p style={{
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.45)',
                marginTop: 6,
                marginBottom: 0
              }}>
                Lifetime spent: ${dashboardData.lifetimeSpentAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
              </p>
              {!dashboardData.hasMonthlyBudget && (
                <p style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255, 255, 255, 0.45)',
                  marginTop: 6,
                  marginBottom: 0
                }}>
                  Set a monthly budget in Profile to track progress.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>



      {/* Quick Actions */}
      <div 
        style={{ ...cardStyle, marginTop: '28px' }}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, cardHoverStyle);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, cardStyle);
        }}
      >
        <h3 style={{
          fontSize: '1.35rem',
          color: '#ffffff',
          marginBottom: '8px',
          fontWeight: 600,
          letterSpacing: '-0.02em'
        }}>
          Quick actions
        </h3>
        <p style={{
          margin: '0 0 24px',
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.45)',
          lineHeight: 1.5
        }}>
          One-tap tasks — booking sends you to shops to pick services.
        </p>
        <div className="user-dashboard-page__quick-grid">
          {[
            { icon: Calendar, label: 'Book appointment', onClick: () => navigate('/shops') },
            { icon: Bell, label: systemMessagesLabel, onClick: () => navigate('/system-messages') },
            { icon: MapPin, label: 'Find shops', onClick: () => navigate('/shops') },
            { icon: Wrench, label: 'Contact mechanics', onClick: () => navigate('/mechanics') },
            { icon: Car, label: 'My vehicles', onClick: () => navigate('/profile') }
          ].map((action, index) => (
            <button
              type="button"
              key={index}
              className="user-dashboard-page__quick-btn"
              onClick={action.onClick}
            >
              <action.icon size={28} style={{ color: '#ffffff' }} />
              <span style={{
                fontSize: '0.9rem',
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

      {/* My Vehicle Catalogue */}
      <div 
        style={{ ...cardStyle, marginTop: '28px' }}
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
          My Vehicle Catalogue
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px'
        }}>
          {vehicles.length > 0 ? vehicles.map((vehicle) => (
            <div key={vehicle.id} style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{
                fontSize: '1.05rem',
                color: '#ffffff',
                fontWeight: 600,
                marginBottom: '8px'
              }}>
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.55)', marginBottom: '6px' }}>
                Plate: {vehicle.license_plate || 'N/A'}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.55)', marginBottom: 0 }}>
                Mileage: {(vehicle.mileage || 0).toLocaleString()} mi
              </p>
            </div>
          )) : (
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '1rem' }}>
              No vehicles added yet.
            </p>
          )}
        </div>
      </div>

      {/* Maintenance Reminders & Shops Frequently Visited */}
      <div className="user-dashboard-page__two-col" style={{ marginTop: '28px' }}>
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

        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, cardHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, cardStyle);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <MapPin size={24} style={{ color: '#ffffff' }} />
            <h3 style={{
              fontSize: '1.5rem',
              color: '#ffffff',
              fontWeight: 600,
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              Shops Frequently Visited
            </h3>
          </div>
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
                  background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                  color: '#000000',
                  padding: '8px 20px',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
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

      {/* Most Expensive Services */}
      <div 
        style={{ ...cardStyle, marginTop: '28px', marginBottom: '24px' }}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, cardHoverStyle);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, cardStyle);
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <DollarSign size={24} style={{ color: '#ffffff' }} />
          <h3 style={{
            fontSize: '1.5rem',
            color: '#ffffff',
            fontWeight: 600,
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            Most Expensive Services
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {(costInsights?.mostExpensiveServices?.slice(0, 3) || [...serviceHistory].sort((a, b) => (b.total_cost || 0) - (a.total_cost || 0)).slice(0, 3)).map((service) => (
            <div
              key={service.id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <p style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 600, marginBottom: '6px' }}>
                  {service.service_type || service.service_name || 'Service'}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>
                  {service.shop?.name || 'Unknown Shop'}
                </p>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
                ${Number(service.total_cost || 0).toLocaleString()}
              </div>
            </div>
          ))}
          {(costInsights?.mostExpensiveServices || serviceHistory).length === 0 && (
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '1rem' }}>
              No service records yet.
            </p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default UserDashboard;
