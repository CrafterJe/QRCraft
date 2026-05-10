import SectionTitle from '../ui/SectionTitle';

const inputClass = 'w-full px-3 py-2 bg-base border border-edge rounded-lg text-pale text-sm outline-none focus:border-primary transition-colors';

export default function QRSettingsSection({ config, update }) {
  return (
    <div className="flex flex-col gap-2">
      <SectionTitle>Configuración del QR</SectionTitle>

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="block text-xs text-dim mb-1">Tamaño (px)</label>
          <input
            type="number"
            value={config.size}
            onChange={e => update('size', parseInt(e.target.value) || 400)}
            min="150" max="1000" step="50"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs text-dim mb-1">Margen</label>
          <input
            type="number"
            value={config.margin}
            onChange={e => update('margin', parseInt(e.target.value) || 0)}
            min="0" max="10"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-dim mb-1">Corrección de error</label>
        <select
          value={config.errorCorrection}
          onChange={e => update('errorCorrection', e.target.value)}
          className={inputClass}
        >
          <option value="M">M — Media</option>
          <option value="Q">Q — Media-alta</option>
          <option value="H">H — Alta (recomendado con logo)</option>
        </select>
      </div>
    </div>
  );
}
