import SectionTitle from '../ui/SectionTitle';
import Toggle from '../ui/Toggle';
import ColorPicker from '../ui/ColorPicker';

const inputClass = 'w-full px-3 py-2 bg-base border border-edge rounded-lg text-pale text-sm outline-none focus:border-primary transition-colors';

export default function LabelSection({ config, update }) {
  return (
    <div className="flex flex-col gap-3">
      <SectionTitle>Etiqueta</SectionTitle>

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="block text-xs text-dim mb-1">Tamaño (px)</label>
          <input
            type="number"
            value={config.labelSize}
            onChange={e => update('labelSize', Math.max(8, Math.min(72, parseInt(e.target.value) || 18)))}
            min="8" max="72"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs text-dim mb-1">Color</label>
          <ColorPicker value={config.labelColor} onChange={v => update('labelColor', v)} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-pale">Negrita</label>
          <Toggle checked={config.labelBold} onChange={v => update('labelBold', v)} />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm text-pale">Cursiva</label>
          <Toggle checked={config.labelItalic} onChange={v => update('labelItalic', v)} />
        </div>
      </div>
    </div>
  );
}
