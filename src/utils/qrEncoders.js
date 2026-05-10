/** @param {string} s */
const esc = (s) => encodeURIComponent(s ?? '');

// ── Básicos ─────────────────────────────────────────────────────────────────

/** @param {{ ssid: string, password: string, security: 'WPA'|'WEP'|'nopass' }} p */
export const encodeWifi = ({ ssid, password, security }) =>
  `WIFI:S:${ssid};T:${security};P:${password};;`;

// ── Contacto ─────────────────────────────────────────────────────────────────

/**
 * @param {{ firstName: string, lastName: string, phone?: string,
 *           email?: string, org?: string, title?: string, url?: string }} p
 */
export const encodeVCard = ({ firstName, lastName, phone, email, org, title, url }) => {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName ?? ''};${firstName ?? ''}`,
    `FN:${[firstName, lastName].filter(Boolean).join(' ')}`,
    phone  ? `TEL:${phone}`   : null,
    email  ? `EMAIL:${email}` : null,
    org    ? `ORG:${org}`     : null,
    title  ? `TITLE:${title}` : null,
    url    ? `URL:${url}`     : null,
    'END:VCARD',
  ];
  return lines.filter(Boolean).join('\n');
};

/** @param {{ to: string, subject?: string, body?: string }} p */
export const encodeEmail = ({ to, subject, body }) => {
  const params = [
    subject ? `subject=${esc(subject)}` : null,
    body    ? `body=${esc(body)}`        : null,
  ].filter(Boolean).join('&');
  return `mailto:${to}${params ? `?${params}` : ''}`;
};

/** @param {{ number: string, message?: string }} p */
export const encodeSMS = ({ number, message }) =>
  `sms:${number}${message ? `?body=${esc(message)}` : ''}`;

/** @param {string} number */
export const encodePhone = (number) => `tel:${number}`;

/** @param {{ number: string, message?: string }} p */
export const encodeWhatsApp = ({ number, message }) => {
  const clean = number.replace(/\D/g, '');
  return `https://wa.me/${clean}${message ? `?text=${esc(message)}` : ''}`;
};

// ── Redes sociales ──────────────────────────────────────────────────────────

/** @param {'instagram'|'facebook'|'tiktok'|'twitter'|'youtube'|'linkedin'} platform */
export const encodeSocialProfile = (platform, handle) => {
  const bases = {
    instagram: 'https://instagram.com/',
    facebook:  'https://facebook.com/',
    tiktok:    'https://tiktok.com/@',
    twitter:   'https://x.com/',
    youtube:   'https://youtube.com/@',
    linkedin:  'https://linkedin.com/in/',
  };
  return `${bases[platform]}${handle}`;
};

// ── Ubicación ────────────────────────────────────────────────────────────────

/** @param {string} query - Address or "lat,lng" */
export const encodeMaps = (query) =>
  `https://maps.google.com/?q=${esc(query)}`;

// ── Eventos ──────────────────────────────────────────────────────────────────

/**
 * @param {{ title: string, start: string, end: string,
 *           location?: string, description?: string }} p
 * start/end: 'YYYYMMDDTHHmmss' or 'YYYYMMDD'
 */
export const encodeICal = ({ title, start, end, location, description }) => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    location    ? `LOCATION:${location}`       : null,
    description ? `DESCRIPTION:${description}` : null,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.filter(Boolean).join('\n');
};

// ── Apps ─────────────────────────────────────────────────────────────────────

/** @param {{ ios?: string, android?: string }} p */
export const encodeAppStore = ({ ios, android }) => ios ?? android ?? '';
