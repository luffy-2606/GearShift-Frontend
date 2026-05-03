import React, { useState, useRef, useEffect } from 'react';
import apiClient from '../lib/apiClient';
import ChatMarkdown from './ChatMarkdown';
import PageLoadSkeleton from './PageLoadSkeleton';
import './Chat.css';

const suggestedQuestions = [
  'Where can I get an oil change?',
  'Which mechanic specializes in brakes?',
  'Who has the best rating nearby?',
  'What services did I get last time?',
];

/** Space below fixed NavBar */
const NAV_OFFSET_PX = 120;
/** Reserve space so last messages clear the fixed composer (global page scroll). */
const INPUT_DOCK_RESERVED_PX = 120;

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm your GearShift Assistant. Ask me anything about your vehicles, service history, or mechanics and shops near you.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

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
      {initialLoading ? (
        <div
          className="chat-page"
          style={{
            paddingTop: NAV_OFFSET_PX,
            paddingBottom: `calc(${INPUT_DOCK_RESERVED_PX}px + env(safe-area-inset-bottom, 0px))`,
          }}
          aria-busy="true"
        >
          <PageLoadSkeleton variant="list" message="Loading GearShift Assistant" ariaLabel="Loading chat" />
        </div>
      ) : (
        <>
          <div
            className="chat-page"
            style={{
              paddingTop: NAV_OFFSET_PX,
              paddingBottom: `calc(${INPUT_DOCK_RESERVED_PX}px + env(safe-area-inset-bottom, 0px))`,
            }}
          >
            <div className="chat-page__column">
              <header className="chat-page__header">
                <h1 className="chat-page__title">GearShift Assistant</h1>
                <p className="chat-page__subtitle">
                  Mechanics, workshops, your vehicles and service history.
                </p>
              </header>

              <div className="chat-page__messages-wrap" style={{ paddingBottom: '100px' }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`chat-page__message-row ${
                      msg.role === 'user' ? 'chat-page__message-row--user' : 'chat-page__message-row--assistant'
                    }`}
                  >
                    {msg.role === 'assistant' && <div className="chat-page__avatar">G</div>}
                    <div
                      className={`chat-page__bubble ${
                        msg.role === 'user' ? 'chat-page__bubble--user' : 'chat-page__bubble--assistant'
                      } ${
                        msg.isError ? 'chat-page__bubble--error' : ''
                      } ${
                        msg.role === 'assistant' && !msg.isError ? 'chat-page__bubble--markdown' : ''
                      }`}
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
                  <div className="chat-page__message-row chat-page__message-row--assistant">
                    <div className="chat-page__avatar">G</div>
                    <div className="chat-page__bubble chat-page__bubble--assistant chat-page__typing-bubble">
                      <span className="chat-page__typing-dot" />
                      <span className="chat-page__typing-dot" style={{ animationDelay: '0.2s' }} />
                      <span className="chat-page__typing-dot" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                )}

                {messages.length === 1 && !loading && (
                  <div className="chat-page__suggestions">
                    {suggestedQuestions.map((q) => (
                      <button key={q} type="button" className="chat-page__suggestion-chip" onClick={() => sendMessage(q)}>
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            </div>
          </div>

          <div className="chat-page__input-dock">
            <div className="chat-page__input-column">
              <div className="chat-page__input-bar">
                <textarea
                  className="chat-page__textarea"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message GearShift…"
                  rows={1}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="chat-page__send-btn"
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};


export default Chat;
