import SectionTitle from '../ui/SectionTitle';

export default function ShapeSection({ config, update }) {
  return (
    <div className="flex flex-col gap-2">
      <SectionTitle>Forma general del QR</SectionTitle>

      <div className="flex items-center justify-between mb-1">
        <label className="text-xs text-dim">Esquinas redondeadas</label>
        <span className="text-sm text-soft font-bold">{config.borderRadius}%</span>
      </div>
      <input
        type="range"
        min="0" max="15" step="1"
        value={config.borderRadius}
        onChange={e => update('borderRadius', parseInt(e.target.value))}
        className="w-full h-1.5 rounded-full cursor-pointer accent-primary"
      />
      <p className="text-[11px] text-dim/60">0% = puntas · 15% = muy redondeado</p>
    </div>
  );
}
