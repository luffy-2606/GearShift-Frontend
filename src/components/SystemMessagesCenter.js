import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Archive, Bell, CheckCircle2, Clock, Inbox, Trash2 } from 'lucide-react';
import { deleteSystemMessage, getSystemMessages, updateSystemMessage } from '../lib/systemMessagesStore';
import './SystemMessagesCenter.css';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const TABS = [
  { id: 'unread', label: 'Unread', icon: Inbox },
  { id: 'archived', label: 'Archived', icon: Archive },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 }
];

const SystemMessagesCenter = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState('unread');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const displayName =
    user?.first_name?.trim() ||
    [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim() ||
    'there';

  const refresh = () => setMessages(getSystemMessages());

  useEffect(() => {
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

  const tabCounts = useMemo(
    () => ({
      unread: messages.filter((m) => m.status === 'unread').length,
      archived: messages.filter((m) => m.status === 'archived').length,
      completed: messages.filter((m) => m.status === 'completed').length
    }),
    [messages]
  );

  const filtered = useMemo(
    () =>
      messages
        .filter((m) => m.status === tab)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [messages, tab]
  );

  const markArchived = (id) => {
    updateSystemMessage(id, { status: 'archived' });
    refresh();
  };

  const markUnread = (id) => {
    updateSystemMessage(id, { status: 'unread' });
    refresh();
  };

  const removeMessage = (id) => {
    deleteSystemMessage(id);
    refresh();
  };

  const confirmAndAddToHistory = (msg) => {
    updateSystemMessage(msg.id, { status: 'archived' });
    refresh();
    if (msg.appointmentId) {
      navigate(`/service-history?confirm=${msg.appointmentId}&msg=${encodeURIComponent(msg.id)}`);
    }
  };

  const tabLabel = TABS.find((t) => t.id === tab)?.label || tab;

  return (
    <div className="messages-page">
      <div className="messages-page__inner">
        <header className="messages-page__hero">
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
                fontSize: 'clamp(1.85rem, 3.5vw, 2.85rem)',
                fontWeight: 700,
                margin: '0 0 10px',
                letterSpacing: '-0.03em',
                color: '#ffffff',
                lineHeight: 1.1
              }}
            >
              System <span style={{ color: 'rgba(255, 255, 255, 0.82)' }}>messages</span>
            </h1>
            <p style={{ margin: 0, fontSize: '1.02rem', color: 'rgba(255, 255, 255, 0.58)', maxWidth: 520, lineHeight: 1.55 }}>
              Appointment follow-ups and confirmations live here. Archive to clear your inbox without losing the thread.
            </p>
          </div>

          <div className="messages-page__stat-card">
            <p className="messages-page__stat-label">Unread</p>
            <p className="messages-page__stat-value">{tabCounts.unread}</p>
            <p className="messages-page__stat-hint">Needs attention</p>
          </div>
        </header>

        <div className="messages-page__layout">
          <nav className="messages-page__rail" aria-label="Message folders">
            <p className="messages-page__rail-label">Folders</p>
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`messages-page__rail-btn ${tab === t.id ? 'messages-page__rail-btn--active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <span className="messages-page__rail-btn-left">
                  <t.icon size={18} strokeWidth={1.75} />
                  {t.label}
                </span>
                <span className="messages-page__count-pill">{tabCounts[t.id]}</span>
              </button>
            ))}
          </nav>

          <main className="messages-page__main">
            <div className="messages-page__toolbar">
              <p className="messages-page__toolbar-note">
                <Bell size={18} style={{ opacity: 0.65, flexShrink: 0 }} />
                <span>
                  <strong>{filtered.length}</strong> in <strong>{tabLabel}</strong>
                  {tab === 'unread' && tabCounts.unread > 0 ? ' · action may be required' : ''}
                </span>
              </p>
              <button type="button" className="messages-page__btn" onClick={refresh}>
                <Clock size={16} strokeWidth={1.75} />
                Refresh
              </button>
            </div>

            {filtered.length === 0 ? (
              <div className="messages-page__empty">
                Nothing in <strong>{tabLabel}</strong>. {tab === 'unread' ? 'New booking confirmations will show up here.' : 'Switch folders to see other items.'}
              </div>
            ) : (
              <div className="messages-page__list">
                {filtered.map((m) => (
                  <article
                    key={m.id}
                    className={`messages-page__card ${m.type === 'appointment_confirmation' ? 'messages-page__card--appointment' : ''}`}
                  >
                    <div className="messages-page__card-inner">
                      <div className="messages-page__card-head">
                        <h2 className="messages-page__card-title">{m.title}</h2>
                        <time className="messages-page__card-time" dateTime={m.timestamp}>
                          {new Date(m.timestamp).toLocaleString()}
                        </time>
                      </div>

                      <div className="messages-page__chips">
                        <span className="messages-page__chip">{m.type === 'appointment_confirmation' ? 'Appointment' : 'Notice'}</span>
                        <span className="messages-page__chip">{m.status}</span>
                        {m.completedAt ? (
                          <span className="messages-page__chip">Done {new Date(m.completedAt).toLocaleDateString()}</span>
                        ) : null}
                      </div>

                      <p className="messages-page__card-body">{m.message}</p>

                      <div className="messages-page__actions">
                        {m.type === 'appointment_confirmation' && tab !== 'completed' ? (
                          <button type="button" className="messages-page__btn messages-page__btn--primary" onClick={() => confirmAndAddToHistory(m)}>
                            <CheckCircle2 size={16} strokeWidth={2} />
                            Mark done &amp; add to history
                          </button>
                        ) : null}

                        {tab === 'unread' ? (
                          <button type="button" className="messages-page__btn" onClick={() => markArchived(m.id)}>
                            <Archive size={16} strokeWidth={1.75} />
                            Archive
                          </button>
                        ) : null}

                        {tab === 'archived' ? (
                          <button type="button" className="messages-page__btn" onClick={() => markUnread(m.id)}>
                            <Inbox size={16} strokeWidth={1.75} />
                            Move to unread
                          </button>
                        ) : null}

                        <button type="button" className="messages-page__btn messages-page__btn--danger" onClick={() => removeMessage(m.id)}>
                          <Trash2 size={16} strokeWidth={1.75} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SystemMessagesCenter;
