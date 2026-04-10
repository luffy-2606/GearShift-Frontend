import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SystemMessages.css';

const SystemMessages = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for pending appointment confirmations
    const checkPendingConfirmations = () => {
      const pending = JSON.parse(localStorage.getItem('pendingConfirmations') || '[]');
      setMessages(pending);
    };

    checkPendingConfirmations();
    
    // Check every 30 seconds for new messages
    const interval = setInterval(checkPendingConfirmations, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleConfirm = (messageId, appointmentId) => {
    // Remove from pending messages
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem('pendingConfirmations', JSON.stringify(updatedMessages));
    
    // Navigate to service history or show confirmation form
    navigate(`/service-history?confirm=${appointmentId}`);
  };

  const handleDismiss = (messageId) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem('pendingConfirmations', JSON.stringify(updatedMessages));
  };

  const addConfirmationMessage = (appointment) => {
    const newMessage = {
      id: `confirm-${appointment.id}-${Date.now()}`,
      type: 'appointment_confirmation',
      title: 'Appointment Completed?',
      message: `Did you complete your appointment at ${appointment.shop?.name || 'the shop'} for ${appointment.service_name}?`,
      appointmentId: appointment.id,
      appointment: appointment,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('pendingConfirmations', JSON.stringify(updatedMessages));
  };

  // Make this function globally accessible
  window.addAppointmentConfirmation = addConfirmationMessage;

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="system-messages">
      {messages.map(message => (
        <div key={message.id} className={`system-message ${message.type}`}>
          <div className="message-header">
            <h4>{message.title}</h4>
            <button 
              className="dismiss-btn"
              onClick={() => handleDismiss(message.id)}
            >
              ×
            </button>
          </div>
          
          <div className="message-content">
            <p>{message.message}</p>
            
            {message.type === 'appointment_confirmation' && (
              <div className="message-actions">
                <button 
                  className="confirm-btn"
                  onClick={() => handleConfirm(message.id, message.appointmentId)}
                >
                  Yes, Add to Service History
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => handleDismiss(message.id)}
                >
                  No, Dismiss
                </button>
              </div>
            )}
          </div>
          
          <div className="message-time">
            {new Date(message.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SystemMessages;
