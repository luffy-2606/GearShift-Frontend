import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../lib/apiClient';
import { Star, Trash2, ExternalLink, Plus } from 'lucide-react';
import PageLoadSkeleton from './PageLoadSkeleton';

const ENTITY_LABELS = {
  shop: 'Workshop',
  mechanic: 'Mechanic',
  appointment: 'Appointment',
  cost_insight: 'Cost insight',
  quote_snapshot: 'Quote',
  parts_bundle: 'Parts list',
};

function displayTitle(item) {
  if (item.title) return item.title;
  const s = item.snapshot || {};
  return (
    s.name ||
    s.service_type ||
    s.service_name ||
    (s.shop && s.shop.name) ||
    ENTITY_LABELS[item.entity_type] ||
    'Saved item'
  );
}

function openTarget(navigate, item) {
  const s = item.snapshot || {};
  switch (item.entity_type) {
    case 'shop':
      navigate(`/shops?saved=${item.entity_id || s.shopId || ''}`);
      break;
    case 'mechanic':
      navigate(`/mechanics?saved=${item.entity_id || s.mechanicId || ''}`);
      break;
    case 'appointment':
      navigate('/service-history');
      break;
    case 'cost_insight':
      navigate('/cost-insights');
      break;
    case 'quote_snapshot': {
      const shopId = s.shopId;
      if (shopId) {
        navigate(`/shops?saved=${shopId}`);
      } else if (s.source === 'cost_insights_by_service') {
        navigate('/cost-insights');
      } else {
        navigate('/shops');
      }
      break;
    }
    case 'parts_bundle':
      navigate('/saved');
      break;
    default:
      break;
  }
}

const SavedItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [tagFilter, setTagFilter] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [editNotes, setEditNotes] = useState('');
  const [editTags, setEditTags] = useState('');
  const [showAddParts, setShowAddParts] = useState(false);
  const [bundleTitle, setBundleTitle] = useState('');
  const [bundleLines, setBundleLines] = useState('');
  const [savingBundle, setSavingBundle] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setMessage('');
    try {
      const params = new URLSearchParams();
      if (favoritesOnly) params.set('favorites_only', 'true');
      if (tagFilter.trim()) params.set('tag', tagFilter.trim());
      const q = params.toString();
      const { data } = await apiClient.get(`/api/bookmarks${q ? `?${q}` : ''}`);
      setItems(data.data || []);
    } catch (e) {
      setMessage(e.response?.data?.message || 'Could not load saved items.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [favoritesOnly, tagFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleFavorite = async (item) => {
    try {
      await apiClient.patch(`/api/bookmarks/${item.id}`, { is_favorite: !item.is_favorite });
      load();
    } catch (e) {
      setMessage(e.response?.data?.message || 'Update failed');
    }
  };

  const saveEdits = async (id) => {
    try {
      await apiClient.patch(`/api/bookmarks/${id}`, {
        notes: editNotes,
        tags: editTags.split(',').map((t) => t.trim()).filter(Boolean),
      });
      setExpandedId(null);
      load();
    } catch (e) {
      setMessage(e.response?.data?.message || 'Save failed');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Remove this saved item?')) return;
    try {
      await apiClient.delete(`/api/bookmarks/${id}`);
      load();
    } catch (e) {
      setMessage(e.response?.data?.message || 'Delete failed');
    }
  };

  const startEdit = (item) => {
    setExpandedId(item.id);
    setEditNotes(item.notes || '');
    setEditTags((item.tags || []).join(', '));
  };

  const submitPartsBundle = async (e) => {
    e.preventDefault();
    const lines = bundleLines
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    if (!lines.length) {
      setMessage('Add at least one part line.');
      return;
    }
    setSavingBundle(true);
    setMessage('');
    try {
      await apiClient.post('/api/bookmarks', {
        entity_type: 'parts_bundle',
        title: bundleTitle.trim() || 'Parts list',
        snapshot: { parts: lines.map((name) => ({ name })) },
        tags: ['parts'],
      });
      setShowAddParts(false);
      setBundleTitle('');
      setBundleLines('');
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not save parts list');
    } finally {
      setSavingBundle(false);
    }
  };

  return (
    <div style={styles.shell} className="saved-items-shell">
      <div style={styles.inner} className="saved-items-inner">
        <header style={styles.header}>
          <h1 style={styles.title}>
            Saved & favorites
          </h1>
          <p style={styles.subtitle}>
            Favorites sync across devices and stay in this list with tags, notes, and last updated times. Re-open a saved
            quote, jump back to a shop or mechanic, or compare parts bundles you have stored.
          </p>
        </header>

        {message && <div style={styles.alert}>{message}</div>}

        <div style={styles.toolbar} className="saved-items-toolbar">
          <label style={styles.check}>
            <input
              type="checkbox"
              checked={favoritesOnly}
              onChange={(e) => setFavoritesOnly(e.target.checked)}
            />
            Favorites only
          </label>
          <input
            type="search"
            placeholder="Filter by tag…"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            style={styles.search}
            className="saved-items-search"
          />
          <button
            type="button"
            style={styles.btnPrimary}
            onClick={() => setShowAddParts(true)}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 28px rgba(255, 255, 255, 0.2)'
              });
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, styles.btnPrimary);
            }}
          >
            <Plus size={16} style={{ marginRight: 6 }} />
            Add parts list
          </button>
        </div>

        {showAddParts && (
          <form style={styles.addCard} onSubmit={submitPartsBundle}>
            <h3 style={{ margin: '0 0 8px', fontSize: '1rem' }}>New parts bundle</h3>
            <input
              style={styles.input}
              placeholder="Title (optional)"
              value={bundleTitle}
              onChange={(e) => setBundleTitle(e.target.value)}
            />
            <textarea
              style={{ ...styles.input, minHeight: 100, resize: 'vertical' }}
              placeholder="One part per line (e.g. OEM oil filter 5W-30)"
              value={bundleLines}
              onChange={(e) => setBundleLines(e.target.value)}
            />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button type="button" className="ui-btn muted" onClick={() => setShowAddParts(false)}>
                Cancel
              </button>
              <button type="submit" className="ui-btn primary" disabled={savingBundle}>
                {savingBundle ? 'Saving…' : 'Save'}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div aria-busy="true">
            <PageLoadSkeleton variant="list" message="Loading your saved items" ariaLabel="Loading saved items" />
          </div>
        ) : items.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '48px 32px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.75 }} aria-hidden>📋</div>
            <h3 style={{
              fontSize: '1.35rem',
              fontWeight: 600,
              color: '#ffffff',
              margin: '0 0 8px',
              letterSpacing: '-0.02em'
            }}>
              Nothing saved yet
            </h3>
            <p style={{
              color: 'rgba(255, 255, 255, 0.5)',
              margin: 0,
              lineHeight: 1.6,
              fontSize: '1rem'
            }}>
              Save a shop, mechanic, or quote from elsewhere in the app.
            </p>
          </div>
        ) : (
          <ul style={styles.list}>
            {items.map((item) => (
              <li
                key={item.id}
                style={styles.card}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
                    borderColor: 'rgba(255, 255, 255, 0.22)'
                  });
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, styles.card);
                }}
              >
                <div style={styles.cardTop}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={styles.cardTitleRow}>
                      <span style={styles.badge}>{ENTITY_LABELS[item.entity_type]}</span>
                      <button
                        type="button"
                        aria-label={item.is_favorite ? 'Unfavorite' : 'Favorite'}
                        onClick={() => toggleFavorite(item)}
                        style={{
                          ...styles.iconBtn,
                          color: item.is_favorite ? '#fbbf24' : 'var(--dark-text-muted)',
                        }}
                      >
                        <Star size={20} fill={item.is_favorite ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <h2 style={styles.cardTitle}>{displayTitle(item)}</h2>
                    <p style={styles.meta}>
                      Updated{' '}
                      {item.updated_at
                        ? new Date(item.updated_at).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })
                        : '—'}
                    </p>
                    {(item.tags || []).length > 0 && (
                      <div style={styles.tags}>
                        {(item.tags || []).map((t) => (
                          <span key={t} style={styles.tag}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.notes && expandedId !== item.id && (
                      <p style={styles.notesPreview}>{item.notes}</p>
                    )}
                  </div>
                  <div style={styles.cardActions} className="saved-items-card-actions">
                    {['shop', 'mechanic', 'appointment', 'cost_insight', 'quote_snapshot', 'parts_bundle'].includes(
                      item.entity_type
                    ) && (
                      <button
                        type="button"
                        style={styles.btnGhost}
                        onClick={() => openTarget(navigate, item)}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.btnGhostHover)}
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.btnGhost)}
                      >
                        <ExternalLink size={16} />
                        Open
                      </button>
                    )}
                    <button
                      type="button"
                      style={styles.btnGhost}
                      onClick={() => startEdit(item)}
                      onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.btnGhostHover)}
                      onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.btnGhost)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      style={styles.btnGhostDanger}
                      onClick={() => remove(item.id)}
                      onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.btnGhostDangerHover)}
                      onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.btnGhostDanger)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {(item.entity_type === 'quote_snapshot' || item.entity_type === 'parts_bundle') && (
                  <details style={styles.details}>
                    <summary style={{ cursor: 'pointer', color: 'rgba(255, 255, 255, 0.55)' }}>Details</summary>
                    <pre style={styles.pre}>{JSON.stringify(item.snapshot, null, 2)}</pre>
                  </details>
                )}

                {expandedId === item.id && (
                  <div style={styles.editBox}>
                    <label style={styles.label}>Notes</label>
                    <textarea
                      style={styles.textarea}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      rows={3}
                    />
                    <label style={styles.label}>Tags (comma-separated)</label>
                    <input
                      style={styles.input}
                      value={editTags}
                      onChange={(e) => setEditTags(e.target.value)}
                    />
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <button type="button" className="ui-btn primary" onClick={() => saveEdits(item.id)}>
                        Save
                      </button>
                      <button type="button" className="ui-btn muted" onClick={() => setExpandedId(null)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        .ui-btn { border-radius: 14px; padding: 12px 18px; font-weight: 700; font-size: 0.875rem; cursor: pointer; border: 1px solid transparent; transition: all 0.2s ease; }
        .ui-btn.primary { background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%); color: #111111; box-shadow: 0 4px 18px rgba(255, 255, 255, 0.15); }
        .ui-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255, 255, 255, 0.2); }
        .ui-btn.muted { background: rgba(255, 255, 255, 0.05); color: rgba(255, 255, 255, 0.85); border-color: rgba(255, 255, 255, 0.12); }
        .ui-btn.muted:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.22); }
        @media (max-width: 1024px) {
          .saved-items-shell { padding: 100px 40px 60px !important; }
          .saved-items-inner { padding: 0 40px !important; }
        }
        @media (max-width: 768px) {
          .saved-items-shell { padding: 100px 24px 48px !important; }
          .saved-items-inner { padding: 0 24px !important; }
          .saved-items-toolbar { flex-direction: column; align-items: stretch !important; }
          .saved-items-search { maxWidth: 100% !important; }
          .saved-items-card-actions { flex-direction: row !important; }
          .saved-items-card-actions button { flex: 1; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  shell: {
    minHeight: '100vh',
    background: '#000000',
    color: '#ffffff',
    paddingTop: '120px',
    paddingBottom: '80px',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 80px',
  },
  header: { marginBottom: '32px' },
  title: { margin: 0, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.03em' },
  subtitle: { margin: '12px 0 0', color: 'rgba(255, 255, 255, 0.62)', fontSize: '1.0625rem', lineHeight: 1.55, maxWidth: '680px' },
  alert: {
    padding: '14px 18px',
    borderRadius: '14px',
    background: 'rgba(50, 20, 20, 0.96)',
    border: '1px solid rgba(248, 113, 113, 0.45)',
    color: 'rgba(254, 226, 226, 0.95)',
    marginBottom: '20px',
    backdropFilter: 'blur(12px)',
    fontSize: '0.9375rem',
    fontWeight: 600,
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '28px',
  },
  check: { display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.62)', fontWeight: 500 },
  search: {
    flex: '1 1 180px',
    maxWidth: '280px',
    padding: '12px 16px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
    color: '#111111',
    border: 'none',
    borderRadius: '14px',
    padding: '12px 18px',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '0.875rem',
    boxShadow: '0 4px 18px rgba(255, 255, 255, 0.15)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  addCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '24px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '12px',
    padding: '12px 16px',
    borderRadius: '14px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#ffffff',
    fontSize: '0.925rem',
    outline: 'none',
  },
  list: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '20px' },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
  },
  cardTop: { display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between' },
  cardTitleRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  badge: {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'rgba(255, 255, 255, 0.55)',
    fontWeight: 700,
  },
  iconBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: 4, transition: 'transform 0.2s ease' },
  cardTitle: { margin: '8px 0 6px', fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' },
  meta: { margin: 0, fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.45)' },
  tags: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  tag: {
    fontSize: '0.78rem',
    padding: '6px 12px',
    borderRadius: '999px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.14)',
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: 500,
  },
  notesPreview: { margin: '10px 0 0', fontSize: '0.925rem', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.55 },
  cardActions: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'stretch' },
  btnGhost: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#ffffff',
    borderRadius: '14px',
    padding: '12px 16px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 600,
    transition: 'all 0.2s ease',
  },
  btnGhostHover: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.22)',
  },
  btnGhostDanger: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    background: 'rgba(248, 113, 113, 0.08)',
    border: '1px solid rgba(248, 113, 113, 0.35)',
    color: 'rgba(254, 226, 226, 0.95)',
    borderRadius: '14px',
    padding: '12px 16px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 600,
    transition: 'all 0.2s ease',
  },
  btnGhostDangerHover: {
    background: 'rgba(248, 113, 113, 0.15)',
    borderColor: 'rgba(248, 113, 113, 0.5)',
  },
  details: { marginTop: 16 },
  pre: {
    margin: '10px 0 0',
    padding: '14px 16px',
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '12px',
    fontSize: '0.8125rem',
    overflow: 'auto',
    maxHeight: 220,
    color: 'rgba(255, 255, 255, 0.55)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  editBox: { marginTop: 18, paddingTop: 18, borderTop: '1px solid rgba(255, 255, 255, 0.1)' },
  label: { display: 'block', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' },
  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '14px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#ffffff',
    padding: '12px 16px',
    marginBottom: 12,
    fontSize: '0.925rem',
    fontFamily: 'inherit',
    outline: 'none',
    resize: 'vertical',
  },
};

export default SavedItems;
