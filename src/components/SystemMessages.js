// CSS kept in repo; popup UI intentionally disabled.
import './SystemMessages.css';
import { upsertSystemMessage } from '../lib/systemMessagesStore';

const SystemMessages = () => {
  const addConfirmationMessage = (appointment) => {
    const newMessage = {
      id: `confirm-${appointment.id}-${Date.now()}`,
      type: 'appointment_confirmation',
      title: 'Waiting for your confirmation',
      message: `Appointment booked at ${appointment.shop?.name || 'the shop'} for ${appointment.service_name}. When the repair is done, open System Messages to confirm and add it to your service history.`,
      appointmentId: appointment.id,
      appointment: appointment,
      timestamp: new Date().toISOString(),
      status: 'archived'
    };

    upsertSystemMessage(newMessage);
    // silent: no popup/toast
  };

  // Make this function globally accessible
  window.addAppointmentConfirmation = addConfirmationMessage;

  // Intentionally no popup UI: messages live in the inbox page.
  return null;
};

export default SystemMessages;
