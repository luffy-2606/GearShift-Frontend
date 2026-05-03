import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../lib/apiClient';
import { TrendingUp, DollarSign, Car, BarChart3, PieChart } from 'lucide-react';
import PageLoadSkeleton from './PageLoadSkeleton';
import './CostInsights.css';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'vehicles', label: 'By vehicle' },
  { id: 'services', label: 'Service types' },
  { id: 'trends', label: 'Trends' }
];

function formatMonthLabel(ym) {
  if (!ym || typeof ym !== 'string' || ym.length < 7) return ym || '—';
  const [y, m] = ym.split('-').map(Number);
  if (!y || !m) return ym;
  return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

const heroStatCardStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '24px',
  padding: '32px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const heroStatHover = {
  transform: 'translateY(-8px)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
  borderColor: 'rgba(255, 255, 255, 0.25)'
};

const CostInsights = () => {
  const { user } = useAuth();
  const [insights, setInsights] = useState(null);
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const displayName =
    user?.first_name?.trim() ||
    [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim() ||
    'there';

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

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  const trendMaxAmount = useMemo(() => {
    if (!trends?.trends?.length) return 1;
    return Math.max(...trends.trends.map((t) => Number(t.amount) || 0), 1);
  }, [trends]);

  const serviceTypeBars = useMemo(() => {
    if (!insights?.spendingByServiceType) return [];
    const total = Number(insights.totalSpent) || 1;
    return Object.entries(insights.spendingByServiceType)
      .sort(([, a], [, b]) => b.totalSpent - a.totalSpent)
      .map(([name, data]) => ({
        name,
        ...data,
        pct: Math.min(100, ((data.totalSpent || 0) / total) * 100)
      }));
  }, [insights]);

  if (loading) {
    return (
      <div className="cost-insights-page" aria-busy="true" style={{ minHeight: '100vh' }}>
        <PageLoadSkeleton variant="analytics" message="Loading cost insights" ariaLabel="Loading cost insights" />
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="cost-insights-page__error">
        Failed to load cost insights. Try again later.
      </div>
    );
  }

  const expensive = insights.mostExpensiveServices || [];
  const recent = insights.recentServices || [];
  const vehiclesLedger = insights.spendingByVehicle || [];
  const providersSorted = Object.entries(insights.spendingByProvider || {}).sort(([, a], [, b]) => b.totalSpent - a.totalSpent);

  return (
    <div className="cost-insights-page">
      <div className="cost-insights-page__inner">
        <header className="cost-insights-page__hero">
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
              {getGreeting()}, {displayName}
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
              Cost <span style={{ color: 'rgba(255, 255, 255, 0.82)' }}>analysis</span>
            </h1>
            <p
              style={{
                fontSize: '1.0625rem',
                color: 'rgba(255, 255, 255, 0.62)',
                margin: 0,
                maxWidth: 520,
                lineHeight: 1.55
              }}
            >
              Vertical nav on the left keeps sections one tap away; charts and ledger layouts change per tab so this page
              feels purpose-built, not copy-pasted from shops or history.
            </p>
          </div>
          <div
            style={{ ...heroStatCardStyle, alignSelf: 'flex-start', minWidth: 'min(100%, 240px)' }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, heroStatHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, heroStatCardStyle)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <PieChart size={28} style={{ color: '#ffffff' }} strokeWidth={1.75} />
            </div>
            <p
              style={{
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.55)',
                margin: '0 0 8px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600
              }}
            >
              Lifetime spend
            </p>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
              {formatCurrency(insights.totalSpent)}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.48)', margin: '10px 0 0' }}>
              {insights.totalServices || 0} services • {(insights.vehicles || []).length} vehicles
            </p>
          </div>
        </header>

        <div className="cost-insights-page__layout">
          <nav className="cost-insights-page__rail" aria-label="Analysis sections">
            <p className="cost-insights-page__rail-label">Navigate</p>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`cost-insights-page__rail-btn ${activeTab === tab.id ? 'cost-insights-page__rail-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="cost-insights-page__content">
            {activeTab === 'overview' && (
              <>
                <div className="cost-ci-kpi-grid">
                  <div className="cost-ci-kpi">
                    <div className="cost-ci-kpi__label">
                      <DollarSign size={15} strokeWidth={2} /> Total spent
                    </div>
                    <p className="cost-ci-kpi__value">{formatCurrency(insights.totalSpent)}</p>
                    <p className="cost-ci-kpi__hint">Across {insights.totalServices} logged services</p>
                  </div>
                  <div className="cost-ci-kpi">
                    <div className="cost-ci-kpi__label">
                      <TrendingUp size={15} strokeWidth={2} /> Average / service
                    </div>
                    <p className="cost-ci-kpi__value">{formatCurrency(insights.averageCostPerService)}</p>
                    <p className="cost-ci-kpi__hint">Mean ticket size</p>
                  </div>
                  <div className="cost-ci-kpi">
                    <div className="cost-ci-kpi__label">
                      <Car size={15} strokeWidth={2} /> Vehicles
                    </div>
                    <p className="cost-ci-kpi__value">{(insights.vehicles || []).length}</p>
                    <p className="cost-ci-kpi__hint">Included in this analysis</p>
                  </div>
                </div>

                <div className="cost-ci-overview-split">
                  <section className="cost-ci-panel">
                    <h2 className="cost-ci-panel__title">Most expensive jobs</h2>
                    {expensive.length === 0 ? (
                      <p className="cost-ci-muted">No billed services yet.</p>
                    ) : (
                      <div className="cost-ci-row-list">
                        {expensive.map((service) => (
                          <div key={service.id} className="cost-ci-row">
                            <div>
                              <p className="cost-ci-row__title">{service.service_type}</p>
                              <p className="cost-ci-row__meta">
                                {service.vehicle?.year} {service.vehicle?.make} {service.vehicle?.model}
                                <br />
                                {formatDate(service.service_date)}
                              </p>
                            </div>
                            <span className="cost-ci-row__price">{formatCurrency(service.total_cost)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>

                  <section className="cost-ci-panel">
                    <h2 className="cost-ci-panel__title">Recent activity</h2>
                    {recent.length === 0 ? (
                      <p className="cost-ci-muted">No recent services.</p>
                    ) : (
                      <div className="cost-ci-row-list">
                        {recent.map((service) => (
                          <div key={service.id} className="cost-ci-row">
                            <div>
                              <p className="cost-ci-row__title">{service.service_type}</p>
                              <p className="cost-ci-row__meta">
                                {service.vehicle?.year} {service.vehicle?.make} {service.vehicle?.model}
                                <br />
                                {formatDate(service.service_date)}
                              </p>
                            </div>
                            <span className="cost-ci-row__price">{formatCurrency(service.total_cost)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                </div>
              </>
            )}

            {activeTab === 'vehicles' && (
              <section className="cost-ci-panel">
                <h2 className="cost-ci-panel__title">Spend by vehicle</h2>
                <p className="cost-ci-muted" style={{ marginTop: '-8px', marginBottom: '22px' }}>
                  Ledger-style rows — scan totals without opening each card.
                </p>
                {vehiclesLedger.length === 0 ? (
                  <p className="cost-ci-muted">No vehicles or services yet.</p>
                ) : (
                  <div className="cost-ci-ledger">
                    {vehiclesLedger.map(({ vehicle, totalSpent, serviceCount, averageCostPerService }) => (
                      <div key={vehicle.id} className="cost-ci-ledger__row">
                        <div>
                          <p className="cost-ci-ledger__vehicle">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </p>
                          <p className="cost-ci-ledger__plate">{vehicle.license_plate || 'No plate on file'}</p>
                        </div>
                        <div className="cost-ci-ledger__stat">
                          <span className="cost-ci-ledger__stat-lbl">Total</span>
                          <span className="cost-ci-ledger__stat-val">{formatCurrency(totalSpent)}</span>
                        </div>
                        <div className="cost-ci-ledger__stat">
                          <span className="cost-ci-ledger__stat-lbl">Services</span>
                          <span className="cost-ci-ledger__stat-val">{serviceCount}</span>
                        </div>
                        <div className="cost-ci-ledger__stat">
                          <span className="cost-ci-ledger__stat-lbl">Avg</span>
                          <span className="cost-ci-ledger__stat-val">{formatCurrency(averageCostPerService)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === 'services' && (
              <section className="cost-ci-panel">
                <h2 className="cost-ci-panel__title">Mix by service type</h2>
                <p className="cost-ci-muted" style={{ marginTop: '-8px', marginBottom: '22px' }}>
                  Bar width shows share of your total recorded spend.
                </p>
                {serviceTypeBars.length === 0 ? (
                  <p className="cost-ci-muted">No service-type breakdown yet.</p>
                ) : (
                  serviceTypeBars.map(({ name, totalSpent, serviceCount, averageCost, pct }) => (
                    <div key={name} className="cost-ci-bar-row">
                      <div className="cost-ci-bar-row__top">
                        <span className="cost-ci-bar-row__name">{name}</span>
                        <span className="cost-ci-bar-row__nums">
                          {formatCurrency(totalSpent)} • {serviceCount}× • avg {formatCurrency(averageCost)}
                        </span>
                      </div>
                      <div className="cost-ci-bar-row__track">
                        <div className="cost-ci-bar-row__fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))
                )}
              </section>
            )}

            {activeTab === 'trends' && (
              <>
                <section className="cost-ci-panel">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <BarChart3 size={22} style={{ opacity: 0.9 }} />
                    <h2 className="cost-ci-panel__title" style={{ marginBottom: 0 }}>
                      Monthly trends
                    </h2>
                  </div>
                  <p className="cost-ci-muted" style={{ marginBottom: '22px' }}>
                    Relative bar lengths compare spend across months that had activity.
                  </p>
                  {!trends?.trends?.length ? (
                    <p className="cost-ci-muted">No trend data yet — complete a few dated services first.</p>
                  ) : (
                    [...trends.trends]
                      .sort((a, b) => b.month.localeCompare(a.month))
                      .map((trend) => (
                        <div key={trend.month} className="cost-ci-month-row">
                          <span className="cost-ci-month-row__label">{formatMonthLabel(trend.month)}</span>
                          <div className="cost-ci-month-row__track">
                            <div
                              className="cost-ci-month-row__fill"
                              style={{
                                width: `${((Number(trend.amount) || 0) / trendMaxAmount) * 100}%`
                              }}
                            />
                          </div>
                          <span className="cost-ci-month-row__amt">{formatCurrency(trend.amount)}</span>
                        </div>
                      ))
                  )}
                </section>

                <section className="cost-ci-panel" style={{ marginTop: '22px' }}>
                  <h2 className="cost-ci-panel__title">Spending by provider</h2>
                  <p className="cost-ci-muted" style={{ marginTop: '-8px', marginBottom: '22px' }}>
                    Shops and mechanics aggregated from your history.
                  </p>
                  {providersSorted.length === 0 ? (
                    <p className="cost-ci-muted">No provider data yet.</p>
                  ) : (
                    <div className="cost-ci-provider-grid">
                      {providersSorted.map(([providerName, data]) => (
                        <div key={providerName} className="cost-ci-provider-card">
                          <div className="cost-ci-provider-card__head">
                            <h3 className="cost-ci-provider-card__name">{providerName}</h3>
                            <span className="cost-ci-badge">{data.providerType}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                            <span className="cost-ci-muted">Total</span>
                            <strong style={{ color: '#ffffff' }}>{formatCurrency(data.totalSpent)}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '10px' }}>
                            <span className="cost-ci-muted">Services</span>
                            <strong style={{ color: '#ffffff' }}>{data.serviceCount}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostInsights;
