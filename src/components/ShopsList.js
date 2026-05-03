import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../lib/apiClient';
import AppointmentBooking from './AppointmentBooking';
import { Star, MapPin, Phone, User, Wrench, Search, Filter, ArrowRight, Store, Globe, Bookmark, Check } from 'lucide-react';
import PageLoadSkeleton from './PageLoadSkeleton';
import './ShopsList.css';

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

function workshopWebsiteHref(url) {
  if (!url || !String(url).trim()) return null;
  const u = String(url).trim();
  if (/^https?:\/\//i.test(u)) return u;
  return `https://${u}`;
}

const ShopsList = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const savedHighlightId = searchParams.get('saved');
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    latitude: null,
    longitude: null,
    radius: 50,
    service_type: ''
  });
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    shop: null,
    selectedServices: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [savedShopIds, setSavedShopIds] = useState(() => new Set());
  const [toast, setToast] = useState(null);

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

  const fetchShops = async () => {
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

      const response = await apiClient.get(`/api/shops?${params}`);

      if (response.data.success) {
        setShops(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
    getUserLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchShops();
  }, [filters.service_type, filters.radius]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const { data } = await apiClient.get('/api/bookmarks', { params: { entity_type: 'shop' } });
        if (cancelled) return;
        const ids = new Set(
          (data.data || []).map((b) => b.entity_id).filter(Boolean)
        );
        setSavedShopIds(ids);
      } catch {
        /* ignore — bookmarks optional for listing */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const showToast = (message, variant = 'info') => {
    setToast({ message, variant });
  };

  const markShopSaved = (shopId) => {
    setSavedShopIds((prev) => new Set([...prev, shopId]));
  };

  const filteredShops = useMemo(
    () =>
      shops.filter(
        (shop) =>
          shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.address?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [shops, searchTerm]
  );

  useEffect(() => {
    if (loading || !savedHighlightId) return;
    const t = window.setTimeout(() => {
      document.getElementById(`shop-card-${savedHighlightId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);
    return () => window.clearTimeout(t);
  }, [loading, savedHighlightId, filteredShops]);

  const handleServiceFilter = (serviceType) => {
    setFilters(prev => ({
      ...prev,
      service_type: serviceType === prev.service_type ? '' : serviceType
    }));
  };

  const handleBookAppointment = (shop, selectedServices) => {
    setBookingModal({
      isOpen: true,
      shop,
      selectedServices
    });
  };

  const handleCloseBooking = () => {
    setBookingModal({
      isOpen: false,
      shop: null,
      selectedServices: []
    });
  };

  if (loading) {
    return (
      <div className="shops-page" aria-busy="true">
        <PageLoadSkeleton variant="list" message="Finding the best shops for you" ariaLabel="Loading shops" />
      </div>
    );
  }

  const serviceOptions = ['Oil Change', 'Brake Repair', 'Battery Replacement', 'Tire Service', 'Engine Diagnostic'];

  return (
    <div className="shops-page">
      {toast && (
        <div
          className={`shops-toast shops-toast--${toast.variant}`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
      <div className="shops-page__inner">
        {/* Hero — dashboard-style greeting, left-aligned */}
        <header className="shops-page__hero">
          <div>
            <p style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.55)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600,
              margin: '0 0 12px'
            }}>
              {getGreeting()}, {displayName}
            </p>
            <h1 style={{
              fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 16px',
              letterSpacing: '-0.03em',
              lineHeight: 1.1
            }}>
              Find repair <span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>shops</span>
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.65)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              margin: 0,
              maxWidth: '520px'
            }}>
              Compare services, check ratings, and book with shops you trust — same look and feel as your dashboard.
            </p>
          </div>
          <div
            style={{ ...cardStyle, alignSelf: 'flex-start', minWidth: 'min(100%, 220px)' }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Store size={28} style={{ color: '#ffffff' }} />
            </div>
            <p style={{
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.55)',
              margin: '0 0 8px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600
            }}>
              In directory
            </p>
            <p style={{ fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
              {filteredShops.length}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.45)', margin: '8px 0 0' }}>
              shops match your search & filters
            </p>
          </div>
        </header>

        {/* Sidebar filters + main grid (layout differs from old stacked blocks) */}
        <div className="shops-page__layout">
          <aside className="shops-page__sidebar">
            <div
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
            >
              <h2 style={{
                fontSize: '1.25rem',
                color: '#ffffff',
                margin: '0 0 24px',
                fontWeight: 600,
                letterSpacing: '-0.02em'
              }}>
                Search
              </h2>
              <div className="shops-page__search-shell">
                <Search size={20} style={{ color: 'rgba(255, 255, 255, 0.45)', flexShrink: 0 }} />
                <input
                  type="text"
                  className="shops-page__search-input"
                  placeholder="Name, address, or keywords…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '28px',
                marginBottom: '16px',
                color: 'rgba(255, 255, 255, 0.55)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                <Filter size={16} />
                Service type
              </div>
              <div className="shops-page__filter-chips">
                {serviceOptions.map(service => (
                  <button
                    key={service}
                    type="button"
                    className={`shops-page__chip ${filters.service_type === service ? 'shops-page__chip--active' : ''}`}
                    onClick={() => handleServiceFilter(service)}
                  >
                    {service}
                  </button>
                ))}
              </div>
              <p style={{
                marginTop: '24px',
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.4)',
                lineHeight: 1.5,
                marginBottom: 0
              }}>
                Location-aware results use your browser location when allowed; otherwise all shops are listed.
              </p>
            </div>
          </aside>

          <main className="shops-page__main">
            {filteredShops.length > 0 && (
              <p style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.9rem',
                marginBottom: '24px',
                letterSpacing: '0.02em'
              }}>
                Showing {filteredShops.length} {filteredShops.length === 1 ? 'shop' : 'shops'}
                {filters.service_type ? ` • ${filters.service_type}` : ''}
              </p>
            )}

            <div className="shops-grid-modern">
              {filteredShops.map(shop => (
                <ShopCard
                  key={shop.id}
                  shop={shop}
                  onBookAppointment={handleBookAppointment}
                  highlight={savedHighlightId === shop.id}
                  isSaved={savedShopIds.has(shop.id)}
                  onMarkSaved={markShopSaved}
                  onToast={showToast}
                />
              ))}
            </div>

            {filteredShops.length === 0 && (
              <div
                style={cardStyle}
                className="shops-page__empty"
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.7 }} aria-hidden>🔍</div>
                <h3 style={{
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: '0 0 8px',
                  letterSpacing: '-0.02em'
                }}>
                  No shops found
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  margin: 0,
                  lineHeight: 1.6,
                  fontSize: '1rem'
                }}>
                  Try clearing the service filter or broadening your search terms.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {bookingModal.isOpen && (
        <AppointmentBooking
          shop={bookingModal.shop}
          selectedServices={bookingModal.selectedServices}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );
};

const saveBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.18)',
  color: '#fff',
  borderRadius: '9999px',
  padding: '0.35rem 0.75rem',
  fontSize: '0.75rem',
  fontWeight: 600,
  cursor: 'pointer',
};

const ShopCard = ({ shop, onBookAppointment, highlight, isSaved, onMarkSaved, onToast }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [savingBm, setSavingBm] = useState(false);

  const handleServiceToggle = (service) => {
    setSelectedServices(prev =>
      prev.find(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  const handleBookAppointment = () => {
    if (selectedServices.length === 0) {
      onToast('Please select at least one service.', 'info');
      return;
    }

    onBookAppointment(shop, selectedServices);
  };

  const saveWorkshop = async (e) => {
    e.stopPropagation();
    if (isSaved) {
      onToast('This workshop is already in your saved list.', 'info');
      return;
    }
    try {
      setSavingBm(true);
      await apiClient.post('/api/bookmarks', {
        entity_type: 'shop',
        entity_id: shop.id,
        tags: ['workshop'],
        snapshot: {
          website: shop.website || undefined,
        },
      });
      onMarkSaved(shop.id);
      onToast('Workshop saved. View it anytime under Saved.', 'success');
    } catch (err) {
      if (err.response?.status === 409) {
        onMarkSaved(shop.id);
        onToast('Already in your saved list.', 'info');
      } else {
        onToast(err.response?.data?.message || 'Could not save workshop.', 'error');
      }
    } finally {
      setSavingBm(false);
    }
  };

  const href = workshopWebsiteHref(shop.website);

  return (
    <div
      id={`shop-card-${shop.id}`}
      className={`shop-card-modern${highlight ? ' shop-card-modern--saved-highlight' : ''}`}
    >
      <div className="shop-card-header">
        <div>
          <h3 className="shop-card-title">{shop.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Star size={16} style={{ color: 'rgba(255, 255, 255, 0.85)' }} fill="currentColor" />
              <span style={{ fontWeight: 700, color: '#ffffff' }}>
                {shop.average_rating?.toFixed(1) || 'N/A'}
              </span>
            </div>
            <span style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '0.875rem' }}>
              ({shop.total_reviews || 0} reviews)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={saveWorkshop}
            disabled={savingBm || isSaved}
            title={isSaved ? 'Saved to your list' : 'Save workshop'}
            style={{
              ...saveBtnStyle,
              cursor: isSaved ? 'default' : savingBm ? 'wait' : 'pointer',
              opacity: savingBm ? 0.7 : isSaved ? 0.95 : 1,
              borderColor: isSaved ? 'rgba(74, 222, 128, 0.45)' : saveBtnStyle.border,
              background: isSaved ? 'rgba(34, 197, 94, 0.15)' : saveBtnStyle.background,
              color: isSaved ? 'rgba(187, 247, 208, 0.95)' : saveBtnStyle.color,
            }}
          >
            {isSaved ? <Check size={14} strokeWidth={2.5} /> : <Bookmark size={14} />}
            {savingBm ? '…' : isSaved ? 'Saved' : 'Save'}
          </button>
          {shop.average_rating >= 4.5 && (
            <div className="shop-card-badge">
              Top rated
            </div>
          )}
        </div>
      </div>

      <p className="shop-card-description">
        {shop.description || 'Professional automotive services with experienced technicians.'}
      </p>

      <div className="shop-card-info">
        <div className="shop-card-info-row">
          <MapPin size={14} style={{ color: 'rgba(255, 255, 255, 0.45)', flexShrink: 0 }} />
          <span>{shop.address || 'Location not available'}</span>
        </div>

        {shop.phone && (
          <div className="shop-card-info-row">
            <Phone size={14} style={{ color: 'rgba(255, 255, 255, 0.45)', flexShrink: 0 }} />
            <span>{shop.phone}</span>
          </div>
        )}

        {href && (
          <div className="shop-card-info-row">
            <Globe size={14} style={{ color: 'rgba(255, 255, 255, 0.45)', flexShrink: 0 }} />
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.85)',
                textDecoration: 'underline',
                wordBreak: 'break-all',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {String(shop.website).replace(/^https?:\/\//i, '')}
            </a>
          </div>
        )}

        {shop.owner && (
          <div className="shop-card-info-row">
            <User size={14} style={{ color: 'rgba(255, 255, 255, 0.45)', flexShrink: 0 }} />
            <span>{shop.owner.first_name} {shop.owner.last_name}</span>
          </div>
        )}
      </div>

      <button
        type="button"
        className="services-toggle-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        <Wrench size={16} />
        {showDetails ? 'Hide' : 'View'} available services
        <ArrowRight size={14} className={showDetails ? 'services-toggle-btn__arrow services-toggle-btn__arrow--open' : 'services-toggle-btn__arrow'} />
      </button>

      {showDetails && (
        <div className="services-section-modern">
          <h4 className="services-section-modern__title">
            Available services
          </h4>
          <div className="services-list-modern">
            {(shop.available_services || []).map(service => (
              <label key={service.id} className="service-item-modern">
                <input
                  type="checkbox"
                  checked={!!selectedServices.find(s => s.id === service.id)}
                  onChange={() => handleServiceToggle(service)}
                />
                <div className="service-item-content">
                  <span className="service-name">{service.name}</span>
                  <span className="service-price">
                    ${service.base_price?.toFixed(2) || 'N/A'}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {selectedServices.length > 0 && (
            <button type="button" className="book-appointment-btn" onClick={handleBookAppointment}>
              Book appointment ({selectedServices.length} service{selectedServices.length > 1 ? 's' : ''})
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopsList;
