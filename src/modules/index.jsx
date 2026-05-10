// @refresh reset
import urlModule from './basics/url';
import wifiModule from './basics/wifi';

/** @type {import('../types/module').QRCategory[]} */
export const CATEGORIES = [
  { id: 'basics',   label: 'Básicos' },
  { id: 'contact',  label: 'Contacto y comunicación' },
  { id: 'social',   label: 'Redes sociales' },
  { id: 'location', label: 'Ubicación' },
  { id: 'events',   label: 'Eventos y agenda' },
  { id: 'apps',     label: 'Apps' },
  { id: 'files',    label: 'Archivos' },
];

// Thin SVG icon helper for single-path icons
const Si = ({ d, fill = 'none' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

/** @param {Omit<import('../types/module').QRModule,'available'|'Form'>} meta */
const locked = (meta) => ({ ...meta, available: false, Form: null });

/** @type {import('../types/module').QRModule[]} */
export const MODULES = [

  // ── Básicos ────────────────────────────────────────────────────────────────
  urlModule,

  locked({
    id: 'text', label: 'Texto plano', categoryId: 'basics',
    icon: <Si d="M4 6h16M4 12h16M4 18h10" />,
  }),
  wifiModule,

  // ── Contacto y comunicación ────────────────────────────────────────────────
  locked({
    id: 'vcard', label: 'vCard', categoryId: 'contact',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <circle cx="9" cy="12" r="2.5"/>
        <path d="M13 10h5M13 14h3"/>
      </svg>
    ),
  }),
  locked({
    id: 'email', label: 'Email', categoryId: 'contact',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  }),
  locked({
    id: 'sms', label: 'SMS', categoryId: 'contact',
    icon: <Si d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  }),
  locked({
    id: 'phone', label: 'Llamada', categoryId: 'contact',
    icon: <Si d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.62 5c-.04-.53.19-1.04.56-1.41l2.12-2.12c.55-.55 1.44-.6 2.05-.12l2.5 2a1.5 1.5 0 0 1 .45 1.87l-1 1.7a14 14 0 0 0 6.08 6.08l1.7-1a1.5 1.5 0 0 1 1.87.45l2 2.5c.48.61.43 1.5-.12 2.05z" />,
  }),
  locked({
    id: 'whatsapp', label: 'WhatsApp', categoryId: 'contact',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2a10 10 0 0 0-8.593 15.09L2 22l5.083-1.374A10 10 0 1 0 12 2"/>
      </svg>
    ),
  }),

  // ── Redes sociales ─────────────────────────────────────────────────────────
  locked({
    id: 'instagram', label: 'Instagram', categoryId: 'social',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  }),
  locked({
    id: 'facebook', label: 'Facebook', categoryId: 'social',
    icon: <Si d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor" />,
  }),
  locked({
    id: 'tiktok', label: 'TikTok', categoryId: 'social',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.77-.33 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.18 8.18 0 0 0 4.81 1.54V6.82a4.84 4.84 0 0 1-1.04-.13z"/>
      </svg>
    ),
  }),
  locked({
    id: 'twitter', label: 'X / Twitter', categoryId: 'social',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  }),
  locked({
    id: 'youtube', label: 'YouTube', categoryId: 'social',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.97A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
      </svg>
    ),
  }),
  locked({
    id: 'linkedin', label: 'LinkedIn', categoryId: 'social',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  }),

  // ── Ubicación ──────────────────────────────────────────────────────────────
  locked({
    id: 'maps', label: 'Google Maps', categoryId: 'location',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  }),

  // ── Eventos ────────────────────────────────────────────────────────────────
  locked({
    id: 'ical', label: 'Evento (iCal)', categoryId: 'events',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
  }),

  // ── Apps ───────────────────────────────────────────────────────────────────
  locked({
    id: 'store', label: 'App Store / Play Store', categoryId: 'apps',
    icon: <Si d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M7 10l5 5 5-5M12 15V3" />,
  }),

  // ── Archivos ───────────────────────────────────────────────────────────────
  locked({
    id: 'file', label: 'PDF / Imagen (URL)', categoryId: 'files',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6M9 13h6M9 17h4"/>
      </svg>
    ),
  }),
];
