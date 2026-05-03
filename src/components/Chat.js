import React, { useState, useRef, useEffect } from 'react';
import apiClient from '../lib/apiClient';
import ChatMarkdown from './ChatMarkdown';
import './Chat.css';

const suggestedQuestions = [
  'Where can I get an oil change?',
  'Which mechanic specializes in brakes?',
  'Who has the best rating nearby?',
  'What services did I get last time?',
];

/** Space below fixed NavBar */
const NAV_OFFSET_PX = 96;
/** Reserve space so last messages clear the fixed composer (global page scroll). */
const INPUT_DOCK_RESERVED_PX = 132;

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm your GearShift Assistant. Ask me anything about your vehicles, service history, or mechanics and shops near you.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await apiClient.post('/api/chat', { message: trimmed });
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      const errMsg =
        err.response?.data?.message || 'Something went wrong. Please try again.';
      setMessages((prev) => [...prev, { role: 'assistant', text: errMsg, isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div
        style={{
          ...styles.page,
          paddingTop: NAV_OFFSET_PX,
          paddingBottom: `calc(${INPUT_DOCK_RESERVED_PX}px + env(safe-area-inset-bottom, 0px))`,
        }}
      >
        <div style={styles.column}>
          <header style={styles.header}>
            <h1 style={styles.title}>GearShift Assistant</h1>
            <p style={styles.subtitle}>
              Mechanics, workshops, your vehicles and service history.
            </p>
          </header>

          <div style={styles.messagesWrap}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...styles.messageRow,
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {msg.role === 'assistant' && <div style={styles.avatar}>G</div>}
                <div
                  style={{
                    ...styles.bubble,
                    ...(msg.role === 'user' ? styles.userBubble : styles.assistantBubble),
                    ...(msg.isError ? styles.errorBubble : {}),
                    ...(msg.role === 'assistant' && !msg.isError ? styles.bubbleMarkdown : {}),
                  }}
                >
                  {msg.role === 'assistant' && !msg.isError ? (
                    <div className="chat-md">
                      <ChatMarkdown>{msg.text}</ChatMarkdown>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ ...styles.messageRow, justifyContent: 'flex-start' }}>
                <div style={styles.avatar}>G</div>
                <div style={{ ...styles.bubble, ...styles.assistantBubble, ...styles.typingBubble }}>
                  <span style={styles.dot} />
                  <span style={{ ...styles.dot, animationDelay: '0.2s' }} />
                  <span style={{ ...styles.dot, animationDelay: '0.4s' }} />
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div style={styles.suggestions}>
                {suggestedQuestions.map((q) => (
                  <button key={q} type="button" style={styles.chip} onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      <div style={styles.inputDockFixed}>
        <div style={styles.inputColumn}>
          <div style={styles.inputBar}>
            <textarea
              style={styles.textarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message GearShift…"
              rows={1}
              disabled={loading}
            />
            <button
              type="button"
              style={{
                ...styles.sendBtn,
                opacity: loading || !input.trim() ? 0.4 : 1,
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              }}
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    boxSizing: 'border-box',
    background: 'var(--dark-bg)',
    color: 'var(--dark-text)',
  },
  column: {
    width: '100%',
    maxWidth: '880px',
    margin: '0 auto',
    paddingLeft: 'max(16px, env(safe-area-inset-left))',
    paddingRight: 'max(16px, env(safe-area-inset-right))',
  },
  header: {
    paddingTop: '12px',
    paddingBottom: '10px',
    borderBottom: '1px solid var(--dark-border)',
  },
  title: {
    margin: 0,
    fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    margin: '6px 0 0',
    color: 'var(--dark-text-secondary)',
    fontSize: '13px',
    lineHeight: 1.4,
  },
  messagesWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    paddingTop: '16px',
    paddingBottom: '8px',
    overflow: 'visible',
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'var(--dark-accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '14px',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: 'min(85%, 560px)',
    padding: '12px 16px',
    borderRadius: '16px',
    fontSize: '15px',
    lineHeight: '1.55',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  bubbleMarkdown: {
    whiteSpace: 'normal',
  },
  userBubble: {
    background: 'var(--dark-accent)',
    color: '#ffffff',
    borderBottomRightRadius: '4px',
  },
  assistantBubble: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid var(--dark-border)',
    color: 'var(--dark-text)',
    borderBottomLeftRadius: '4px',
  },
  errorBubble: {
    background: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.4)',
    color: '#fca5a5',
  },
  typingBubble: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '14px 18px',
  },
  dot: {
    display: 'inline-block',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'var(--dark-text-secondary)',
    animation: 'pulse 1.2s infinite ease-in-out',
  },
  suggestions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    paddingTop: '4px',
  },
  chip: {
    background: 'transparent',
    border: '1px solid var(--dark-border)',
    borderRadius: '20px',
    color: 'var(--dark-text-secondary)',
    padding: '7px 14px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'border-color 0.2s, color 0.2s',
  },
  inputDockFixed: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    paddingTop: '12px',
    borderTop: '1px solid var(--dark-border)',
    background: 'var(--dark-bg)',
    boxSizing: 'border-box',
  },
  inputColumn: {
    width: '100%',
    maxWidth: '880px',
    margin: '0 auto',
    paddingLeft: 'max(16px, env(safe-area-inset-left))',
    paddingRight: 'max(16px, env(safe-area-inset-right))',
    paddingBottom: '12px',
  },
  inputBar: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-end',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid var(--dark-border)',
    borderRadius: '14px',
    padding: '10px 12px',
  },
  textarea: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--dark-text)',
    fontSize: '15px',
    resize: 'none',
    fontFamily: 'inherit',
    lineHeight: '1.5',
    maxHeight: '160px',
    overflow: 'auto',
    minHeight: '24px',
  },
  sendBtn: {
    background: 'var(--dark-accent)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '9px 18px',
    fontWeight: 600,
    fontSize: '14px',
    flexShrink: 0,
    transition: 'opacity 0.2s',
  },
};

export default Chat;
