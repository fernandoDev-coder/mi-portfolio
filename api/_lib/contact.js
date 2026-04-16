const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FORM_FILL_MS = 4000;
const requestStore = new Map();

export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];

  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }

  return req.socket?.remoteAddress || 'unknown';
}

export function isRateLimited(ip) {
  const now = Date.now();
  const hits = requestStore.get(ip) || [];
  const validHits = hits.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (validHits.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestStore.set(ip, validHits);
    return true;
  }

  validHits.push(now);
  requestStore.set(ip, validHits);
  return false;
}

export function validatePayload(body) {
  const errors = [];
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const company = typeof body.company === 'string' ? body.company.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const website = typeof body.website === 'string' ? body.website.trim() : '';
  const startedAt = Number(body.startedAt);

  if (!name) errors.push('El nombre es obligatorio.');
  if (!email) {
    errors.push('El email es obligatorio.');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('El email no tiene un formato valido.');
  }

  if (!subject) errors.push('El asunto es obligatorio.');
  if (!message) {
    errors.push('El mensaje es obligatorio.');
  } else if (message.length < 30) {
    errors.push('El mensaje debe tener al menos 30 caracteres.');
  }

  if (company.length > 100) errors.push('La empresa es demasiado larga.');
  if (name.length > 80) errors.push('El nombre es demasiado largo.');
  if (subject.length > 120) errors.push('El asunto es demasiado largo.');
  if (message.length > 5000) errors.push('El mensaje es demasiado largo.');
  if (website) errors.push('Solicitud rechazada.');
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FORM_FILL_MS) {
    errors.push('El envio ha sido bloqueado por proteccion anti-spam.');
  }

  return { errors, sanitized: { name, email, company, subject, message } };
}
