import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Archive, Bell, CheckCircle2, Clock, Inbox, Trash2 } from 'lucide-react';
import { countSystemMessages, deleteSystemMessage, getSystemMessages, updateSystemMessage } from '../lib/systemMessagesStore';
import './SystemMessagesCenter.css';

const TABS = [
  { id: 'unread', label: 'Unread', icon: Inbox },
  { id: 'archived', label: 'Archived', icon: Archive },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 }
];

const SystemMessagesCenter = () => {
  const [tab, setTab] = useState('unread');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

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

  const filtered = useMemo(() => messages.filter((m) => m.status === tab), [messages, tab]);
  const unreadCount = useMemo(() => countSystemMessages({ status: 'unread' }), [messages]);

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
    // We keep the message (archived) so the inbox still contains it until ServiceHistory completes it.
    updateSystemMessage(msg.id, { status: 'archived' });
    refresh();
    if (msg.appointmentId) navigate(`/service-history?confirm=${msg.appointmentId}&msg=${encodeURIComponent(msg.id)}`);
  };

  return (
    <div className="system-center landing-section landing-section-dark">
      <div className="section-header">
        <h2 className="section-title">
          System <span style={{ color: 'var(--dark-accent)' }}>Messages</span>
        </h2>
        <p className="section-subtitle">
          Keep track of appointment follow-ups. Dismissed messages are archived here so you can complete them later.
        </p>
      </div>

      <div className="system-center-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Bell size={18} className="hero-stat-icon" />
            <div style={{ color: 'var(--dark-text-secondary)', fontSize: '0.95rem' }}>
              You have <span style={{ color: 'var(--dark-text)', fontWeight: 800 }}>{unreadCount}</span> unread message
              {unreadCount === 1 ? '' : 's'}.
            </div>
          </div>

          <button className="system-center-btn" onClick={refresh}>
            <Clock size={16} /> Refresh
          </button>
        </div>

        <div className="system-center-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`system-center-tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <t.icon size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="system-center-list">
        {filtered.length === 0 ? (
          <div className="system-center-empty">
            No messages in <strong>{tab}</strong>.
          </div>
        ) : (
          filtered.map((m) => (
            <div key={m.id} className="system-center-item">
              <div className="system-center-item-header">
                <h3 className="system-center-item-title">{m.title}</h3>
                <div className="system-center-item-time">{new Date(m.timestamp).toLocaleString()}</div>
              </div>

              <p className="system-center-item-body">{m.message}</p>

              <div className="system-center-actions">
                {m.type === 'appointment_confirmation' && tab !== 'completed' && (
                  <button className="system-center-btn primary" onClick={() => confirmAndAddToHistory(m)}>
                    <CheckCircle2 size={16} /> Mark done & add to history
                  </button>
                )}

                {tab === 'unread' && (
                  <button className="system-center-btn" onClick={() => markArchived(m.id)}>
                    <Archive size={16} /> Archive
                  </button>
                )}

                {tab === 'archived' && (
                  <button className="system-center-btn" onClick={() => markUnread(m.id)}>
                    <Inbox size={16} /> Move back to unread
                  </button>
                )}

                <button className="system-center-btn" onClick={() => removeMessage(m.id)}>
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SystemMessagesCenter;

