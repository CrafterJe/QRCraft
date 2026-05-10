import { useState } from 'react';
import { encodeWifi } from '../../../utils/qrEncoders';
import Toggle from '../../../components/ui/Toggle';

const inputClass =
  'w-full px-3 py-2 bg-base border border-edge rounded-lg text-pale text-sm outline-none focus:border-primary transition-colors';

/** @type {import('../../../types/module').QRModule} */
export default {
  id: 'wifi',
  label: 'Wi-Fi',
  categoryId: 'basics',
  available: true,
  icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
      <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Form({ onChange, onLabelChange, onFileNameChange }) {
    const [fields, setFields] = useState({ ssid: '', password: '', security: 'WPA' });
    const [showLabel, setShowLabel] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const updateField = (key, val) => {
      const next = { ...fields, [key]: val };
      setFields(next);
      onChange(encodeWifi(next));
      if (key === 'ssid') {
        if (showLabel) onLabelChange?.(val);
        const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'wifi';
        onFileNameChange?.('wifi-' + slug);
      }
    };

    const toggleLabel = (val) => {
      setShowLabel(val);
      onLabelChange?.(val ? fields.ssid : '');
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="block text-xs text-dim mb-1">Nombre de la red (SSID)</label>
          <input
            type="text"
            value={fields.ssid}
            onChange={e => updateField('ssid', e.target.value)}
            placeholder="Mi red Wi-Fi"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-xs text-dim mb-1">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={fields.password}
              onChange={e => updateField('password', e.target.value)}
              placeholder="••••••••"
              className={`${inputClass} pr-9`}
              disabled={fields.security === 'nopass'}
            />
            {fields.security !== 'nopass' && (
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-dim hover:text-pale transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-xs text-dim mb-1">Seguridad</label>
          <select
            value={fields.security}
            onChange={e => updateField('security', e.target.value)}
            className={inputClass}
          >
            <option value="WPA">WPA / WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">Sin contraseña</option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-edge">
          <div className="flex items-center gap-1.5">
            <label className="text-sm text-pale">Mostrar nombre de red</label>
            <div className="relative group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dim cursor-default">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 px-3 py-2 bg-surface border border-edge rounded-lg text-xs text-dim opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 leading-relaxed">
                Se incluye en exports <span className="text-pale">PNG</span> y <span className="text-pale">Canva</span>.<br />
                No disponible en <span className="text-pale">SVG</span>.
              </div>
            </div>
          </div>
          <Toggle checked={showLabel} onChange={toggleLabel} />
        </div>
      </div>
    );
  },
};
