import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../lib/apiClient';
import { Star, Trash2, ExternalLink, Plus, Bookmark } from 'lucide-react';
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
    <div style={styles.shell}>
      <div style={styles.inner}>
        <header style={styles.header}>
          <h1 style={styles.title}>
            <Bookmark size={28} style={{ verticalAlign: 'middle', marginRight: 8 }} />
            Saved & favorites
          </h1>
          <p style={styles.subtitle}>
            Favorites sync across devices and stay in this list with tags, notes, and last updated times. Re-open a saved
            quote, jump back to a shop or mechanic, or compare parts bundles you have stored.
          </p>
        </header>

        {message && <div style={styles.alert}>{message}</div>}

        <div style={styles.toolbar}>
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
          />
          <button type="button" style={styles.btnPrimary} onClick={() => setShowAddParts(true)}>
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
          <p style={{ color: 'var(--dark-text-secondary)' }}>Nothing saved yet. Save a shop, mechanic, or quote from elsewhere in the app.</p>
        ) : (
          <ul style={styles.list}>
            {items.map((item) => (
              <li key={item.id} style={styles.card}>
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
                  <div style={styles.cardActions}>
                    {['shop', 'mechanic', 'appointment', 'cost_insight', 'quote_snapshot', 'parts_bundle'].includes(
                      item.entity_type
                    ) && (
                      <button
                        type="button"
                        style={styles.btnGhost}
                        onClick={() => openTarget(navigate, item)}
                      >
                        <ExternalLink size={16} />
                        Open
                      </button>
                    )}
                    <button type="button" style={styles.btnGhost} onClick={() => startEdit(item)}>
                      Edit
                    </button>
                    <button type="button" style={styles.btnGhostDanger} onClick={() => remove(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {(item.entity_type === 'quote_snapshot' || item.entity_type === 'parts_bundle') && (
                  <details style={styles.details}>
                    <summary style={{ cursor: 'pointer', color: 'var(--dark-text-secondary)' }}>Details</summary>
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
        .ui-btn { border-radius: 10px; padding: 8px 14px; font-weight: 600; font-size: 14px; cursor: pointer; border: 1px solid transparent; }
        .ui-btn.primary { background: var(--dark-accent); color: #fff; }
        .ui-btn.muted { background: transparent; color: var(--dark-text-secondary); border-color: var(--dark-border); }
      `}</style>
    </div>
  );
};

const styles = {
  shell: {
    minHeight: '100vh',
    background: 'var(--dark-bg)',
    color: 'var(--dark-text)',
    paddingTop: '104px',
    paddingBottom: '48px',
  },
  inner: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px',
  },
  header: { marginBottom: '20px' },
  title: { margin: 0, fontSize: '26px', fontWeight: 700 },
  subtitle: { margin: '8px 0 0', color: 'var(--dark-text-secondary)', fontSize: '14px', lineHeight: 1.5 },
  alert: {
    padding: '10px 12px',
    borderRadius: '10px',
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.35)',
    color: '#fca5a5',
    marginBottom: '16px',
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  check: { display: 'flex', alignItems: 'center', gap: 8, fontSize: '14px', color: 'var(--dark-text-secondary)' },
  search: {
    flex: '1 1 160px',
    maxWidth: '240px',
    padding: '8px 12px',
    borderRadius: '10px',
    border: '1px solid var(--dark-border)',
    background: 'rgba(255,255,255,0.05)',
    color: 'var(--dark-text)',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'var(--dark-accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '8px 14px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '14px',
  },
  addCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--dark-border)',
    borderRadius: '14px',
    padding: '16px',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '10px',
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid var(--dark-border)',
    background: 'rgba(0,0,0,0.25)',
    color: 'var(--dark-text)',
    fontSize: '14px',
  },
  list: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' },
  card: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--dark-border)',
    borderRadius: '14px',
    padding: '16px',
  },
  cardTop: { display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'space-between' },
  cardTitleRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  badge: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'var(--dark-text-muted)',
    fontWeight: 600,
  },
  iconBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: 4 },
  cardTitle: { margin: '6px 0 4px', fontSize: '18px', fontWeight: 600 },
  meta: { margin: 0, fontSize: '12px', color: 'var(--dark-text-muted)' },
  tags: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  tag: {
    fontSize: '12px',
    padding: '2px 8px',
    borderRadius: '999px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid var(--dark-border)',
    color: 'var(--dark-text-secondary)',
  },
  notesPreview: { margin: '8px 0 0', fontSize: '14px', color: 'var(--dark-text-secondary)', lineHeight: 1.45 },
  cardActions: { display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'stretch' },
  btnGhost: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    background: 'transparent',
    border: '1px solid var(--dark-border)',
    color: 'var(--dark-text)',
    borderRadius: '10px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  btnGhostDanger: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    background: 'transparent',
    border: '1px solid rgba(239,68,68,0.4)',
    color: '#fca5a5',
    borderRadius: '10px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  details: { marginTop: 12 },
  pre: {
    margin: '8px 0 0',
    padding: 12,
    background: 'rgba(0,0,0,0.35)',
    borderRadius: 8,
    fontSize: '12px',
    overflow: 'auto',
    maxHeight: 200,
    color: 'var(--dark-text-secondary)',
  },
  editBox: { marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--dark-border)' },
  label: { display: 'block', fontSize: '12px', color: 'var(--dark-text-muted)', marginBottom: 4 },
  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '10px',
    border: '1px solid var(--dark-border)',
    background: 'rgba(0,0,0,0.25)',
    color: 'var(--dark-text)',
    padding: '10px 12px',
    marginBottom: 10,
    fontSize: '14px',
    fontFamily: 'inherit',
  },
};

export default SavedItems;
