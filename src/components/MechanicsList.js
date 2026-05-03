import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../lib/apiClient';
import {
  Star,
  Search,
  MapPin,
  Phone,
  Mail,
  Wrench,
  User,
  Clock,
  DollarSign,
  ArrowRight,
  Hammer
} from 'lucide-react';
import PageLoadSkeleton from './PageLoadSkeleton';
import './MechanicsList.css';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
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

const SERVICE_FILTERS = ['Oil Change', 'Brake Repair', 'Engine Diagnostics', 'Transmission', 'Electrical', 'Tire Service'];
const SPEC_FILTERS = ['Engine Specialist', 'Transmission Expert', 'Electrical Systems', 'Brake Specialist', 'General Mechanic'];

const MechanicsList = () => {
  const { user } = useAuth();
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    latitude: null,
    longitude: null,
    radius: 50,
    service_type: '',
    specialization: ''
  });

  const displayName =
    user?.first_name?.trim() ||
    [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim() ||
    'there';

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFilters(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const fetchMechanics = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.latitude && filters.longitude) {
        params.append('latitude', filters.latitude);
        params.append('longitude', filters.longitude);
        params.append('radius', filters.radius);
      }

      if (filters.service_type) {
        params.append('service_type', filters.service_type);
      }

      if (filters.specialization) {
        params.append('specialization', filters.specialization);
      }

      const response = await apiClient.get(`/api/mechanics?${params}`);

      if (response.data.success) {
        setMechanics(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching mechanics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMechanics();
    getUserLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchMechanics();
  }, [filters.service_type, filters.specialization, filters.radius]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleServiceFilter = (serviceType) => {
    setFilters(prev => ({
      ...prev,
      service_type: serviceType === prev.service_type ? '' : serviceType
    }));
  };

  const handleSpecializationFilter = (specialization) => {
    setFilters(prev => ({
      ...prev,
      specialization: specialization === prev.specialization ? '' : specialization
    }));
  };

  if (loading) {
    return (
      <div className="mechanics-page" aria-busy="true">
        <PageLoadSkeleton variant="list" message="Finding the best mechanics for you" ariaLabel="Loading mechanics" />
      </div>
    );
  }

  const filteredMechanics = mechanics.filter(mechanic =>
    `${mechanic.first_name} ${mechanic.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mechanic.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mechanic.bio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mechanics-page">
      <div className="mechanics-page__inner">
        <header className="mechanics-page__hero">
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
              Find expert <span style={{ color: 'rgba(255, 255, 255, 0.82)' }}>mechanics</span>
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
              Compare ratings, specializations, and experience — portrait cards keep each tech easy to scan at a glance.
            </p>
          </div>
          <div
            style={{ ...cardStyle, alignSelf: 'flex-start', minWidth: 'min(100%, 220px)' }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Hammer size={28} style={{ color: '#ffffff' }} strokeWidth={1.75} />
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
              Matches
            </p>
            <p style={{ fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
              {filteredMechanics.length}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.45)', margin: '8px 0 0' }}>
              mechanics match filters & search
            </p>
          </div>
        </header>

        <div className="mechanics-page__layout">
          <aside className="mechanics-page__sidebar">
            <div
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
            >
              <h2
                style={{
                  fontSize: '1.25rem',
                  color: '#ffffff',
                  margin: '0 0 24px',
                  fontWeight: 600,
                  letterSpacing: '-0.02em'
                }}
              >
                Search & filters
              </h2>
              <div className="mechanics-page__search-shell">
                <Search size={20} style={{ color: 'rgba(255, 255, 255, 0.45)', flexShrink: 0 }} />
                <input
                  type="text"
                  className="mechanics-page__search-input"
                  placeholder="Name, specialization, bio…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="mechanics-page__filter-block">
                <div className="mechanics-page__filter-label">
                  <Wrench size={16} />
                  Service type
                </div>
                <div className="mechanics-page__filter-chips">
                  {SERVICE_FILTERS.map(service => (
                    <button
                      key={service}
                      type="button"
                      className={`mechanics-page__chip ${filters.service_type === service ? 'mechanics-page__chip--active' : ''}`}
                      onClick={() => handleServiceFilter(service)}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mechanics-page__filter-block">
                <div className="mechanics-page__filter-label">
                  <User size={16} />
                  Specialization
                </div>
                <div className="mechanics-page__filter-chips">
                  {SPEC_FILTERS.map(spec => (
                    <button
                      key={spec}
                      type="button"
                      className={`mechanics-page__chip ${filters.specialization === spec ? 'mechanics-page__chip--active' : ''}`}
                      onClick={() => handleSpecializationFilter(spec)}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mechanics-page__hint">
                Location-aware results use your browser when allowed; otherwise every mechanic in the directory is shown.
              </p>
            </div>
          </aside>

          <main className="mechanics-page__main">
            {filteredMechanics.length > 0 && (
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '0.9rem',
                  marginBottom: '24px',
                  letterSpacing: '0.02em'
                }}
              >
                Showing {filteredMechanics.length}{' '}
                {filteredMechanics.length === 1 ? 'mechanic' : 'mechanics'}
                {filters.service_type ? ` • ${filters.service_type}` : ''}
                {filters.specialization ? ` • ${filters.specialization}` : ''}
              </p>
            )}

            <div className="mechanics-grid-modern">
              {filteredMechanics.map(mechanic => (
                <MechanicCard key={mechanic.id} mechanic={mechanic} />
              ))}
            </div>

            {filteredMechanics.length === 0 && (
              <div className="mechanics-page__empty">
                <div style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.75 }} aria-hidden>
                  🔧
                </div>
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    margin: '0 0 8px',
                    letterSpacing: '-0.02em'
                  }}
                >
                  No mechanics found
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: 0, lineHeight: 1.6, fontSize: '1rem' }}>
                  Try clearing filters or broadening your search.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

function initials(mechanic) {
  const a = (mechanic.first_name || '').trim()[0] || '';
  const b = (mechanic.last_name || '').trim()[0] || '';
  return `${a}${b}`.toUpperCase() || '?';
}

const MechanicCard = ({ mechanic }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDistance = (distance) => {
    if (distance === null || distance === undefined) return null;
    return `${distance.toFixed(1)} mi away`;
  };

  const specs = Array.isArray(mechanic.specialization)
    ? mechanic.specialization
    : mechanic.specialization
      ? [mechanic.specialization]
      : [];

  const distanceLabel = formatDistance(mechanic.distance);

  return (
    <article className="mechanic-card-modern">
      <div className="mechanic-card-modern__top">
        <div className="mechanic-card-modern__avatar" aria-hidden>
          {initials(mechanic)}
        </div>
        <h3 className="mechanic-card-modern__title">
          {mechanic.first_name} {mechanic.last_name}
        </h3>
        <div className="mechanic-card-modern__badge-row">
          <span
            className={`mechanic-card-modern__badge ${mechanic.is_independent ? 'mechanic-card-modern__badge--accent' : 'mechanic-card-modern__badge--muted'}`}
          >
            {mechanic.is_independent ? 'Independent' : 'Shop'}
          </span>
        </div>
        <div className="mechanic-card-modern__rating">
          <Star size={15} style={{ color: 'rgba(255,255,255,0.85)' }} fill="currentColor" />
          <strong>{mechanic.average_rating?.toFixed(1) || '—'}</strong>
          <span>({mechanic.total_reviews || 0} reviews)</span>
        </div>
      </div>

      <div className="mechanic-card-modern__divider" />

      <div className="mechanic-card-modern__body">
        <div>
          <p className="mechanic-card-modern__section-label">Location & reach</p>
          <div className="mechanic-card-modern__rows">
            {mechanic.shop_address ? (
              <div className="mechanic-card-modern__row">
                <MapPin size={14} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0, marginTop: 2 }} />
                <span>{mechanic.shop_address}</span>
              </div>
            ) : (
              <div className="mechanic-card-modern__row">
                <MapPin size={14} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontStyle: !distanceLabel ? 'italic' : undefined }}>
                  {distanceLabel || 'Address not listed'}
                </span>
              </div>
            )}
            {mechanic.shop_phone && (
              <div className="mechanic-card-modern__row">
                <Phone size={14} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0, marginTop: 2 }} />
                <span>{mechanic.shop_phone}</span>
              </div>
            )}
            {distanceLabel && mechanic.shop_address && (
              <div className="mechanic-card-modern__row">
                <MapPin size={14} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0, marginTop: 2 }} />
                <span>{distanceLabel}</span>
              </div>
            )}
          </div>
        </div>

        {specs.length > 0 && (
          <div>
            <p className="mechanic-card-modern__section-label">Specializations</p>
            <div className="mechanic-card-modern__tags">
              {specs.map(spec => (
                <span key={spec} className="mechanic-card-modern__tag">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="mechanic-card-modern__section-label">Experience & rate</p>
          <div className="mechanic-card-modern__meta">
            <div className="mechanic-card-modern__row">
              <Clock size={14} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0, marginTop: 2 }} />
              <span>{mechanic.years_experience != null ? `${mechanic.years_experience} years experience` : 'Experience not listed'}</span>
            </div>
            {mechanic.hourly_rate != null && (
              <div className="mechanic-card-modern__row">
                <DollarSign size={14} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0, marginTop: 2 }} />
                <span>${mechanic.hourly_rate}/hour</span>
              </div>
            )}
          </div>
        </div>

        <div className="mechanic-card-modern__grow" />

        <div className="mechanic-card-modern__footer">
          <button type="button" className="contact-toggle-btn" onClick={() => setShowDetails(!showDetails)}>
            <Mail size={16} />
            {showDetails ? 'Hide' : 'View'} contact details
            <ArrowRight
              size={14}
              style={{
                transition: 'transform 0.2s ease',
                transform: showDetails ? 'rotate(90deg)' : 'none'
              }}
            />
          </button>

          {showDetails && (
            <div className="contact-details-modern">
              {mechanic.email && (
                <div className="contact-details-modern__item">
                  <Mail size={14} style={{ color: 'rgba(255,255,255,0.45)', flexShrink: 0 }} />
                  <span>{mechanic.email}</span>
                </div>
              )}
              {mechanic.phone && (
                <div className="contact-details-modern__item">
                  <Phone size={14} style={{ color: 'rgba(255,255,255,0.45)', flexShrink: 0 }} />
                  <span>{mechanic.phone}</span>
                </div>
              )}
              {mechanic.business_name && (
                <div className="contact-details-modern__item">
                  <User size={14} style={{ color: 'rgba(255,255,255,0.45)', flexShrink: 0 }} />
                  <span>{mechanic.business_name}</span>
                </div>
              )}
              {mechanic.bio && (
                <p className="contact-details-modern__bio">&ldquo;{mechanic.bio}&rdquo;</p>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default MechanicsList;
