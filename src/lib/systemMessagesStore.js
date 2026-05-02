const STORE_KEY = 'systemMessagesV1';
const LEGACY_KEY = 'pendingConfirmations';

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function normalizeMessage(msg) {
  if (!msg || typeof msg !== 'object') return null;
  const id = String(msg.id || '');
  if (!id) return null;

  const status = msg.status || 'unread'; // unread | archived | completed
  return {
    id,
    type: msg.type || 'appointment_confirmation',
    title: msg.title || 'System message',
    message: msg.message || '',
    appointmentId: msg.appointmentId || msg.appointment_id || msg.appointment?.id || null,
    appointment: msg.appointment || null,
    timestamp: msg.timestamp || new Date().toISOString(),
    status,
    completedAt: msg.completedAt || null
  };
}

function readStoreRaw() {
  return safeParse(localStorage.getItem(STORE_KEY) || '[]', []);
}

function writeStore(list) {
  localStorage.setItem(STORE_KEY, JSON.stringify(list));
}

function migrateLegacyIfNeeded() {
  const legacy = safeParse(localStorage.getItem(LEGACY_KEY) || '[]', []);
  if (!Array.isArray(legacy) || legacy.length === 0) return;

  const current = readStoreRaw();
  const normalizedCurrent = Array.isArray(current) ? current.map(normalizeMessage).filter(Boolean) : [];

  const migrated = legacy
    .map((m) => normalizeMessage({ ...m, status: m.status || 'unread' }))
    .filter(Boolean);

  const byId = new Map(normalizedCurrent.map((m) => [m.id, m]));
  for (const m of migrated) {
    if (!byId.has(m.id)) byId.set(m.id, m);
  }

  writeStore(Array.from(byId.values()).sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp))));
  localStorage.removeItem(LEGACY_KEY);
}

export function getSystemMessages() {
  migrateLegacyIfNeeded();
  const list = readStoreRaw();
  if (!Array.isArray(list)) return [];
  return list.map(normalizeMessage).filter(Boolean);
}

export function setSystemMessages(list) {
  writeStore((list || []).map(normalizeMessage).filter(Boolean));
}

export function upsertSystemMessage(message) {
  const msg = normalizeMessage(message);
  if (!msg) return;
  const list = getSystemMessages();
  const idx = list.findIndex((m) => m.id === msg.id);
  const next = idx === -1 ? [msg, ...list] : [msg, ...list.filter((m) => m.id !== msg.id)];
  setSystemMessages(next);
}

export function updateSystemMessage(id, patch) {
  const list = getSystemMessages();
  const next = list.map((m) => (m.id === id ? normalizeMessage({ ...m, ...patch }) : m)).filter(Boolean);
  setSystemMessages(next);
}

export function deleteSystemMessage(id) {
  const list = getSystemMessages();
  const next = list.filter((m) => m.id !== id);
  setSystemMessages(next);
}

export function countSystemMessages(filter = {}) {
  const list = getSystemMessages();
  return list.filter((m) => {
    if (filter.status && m.status !== filter.status) return false;
    if (filter.type && m.type !== filter.type) return false;
    return true;
  }).length;
}

