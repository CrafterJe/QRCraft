import SectionTitle from '../ui/SectionTitle';
import Toggle from '../ui/Toggle';
import ColorPicker from '../ui/ColorPicker';

const selectClass = 'w-full px-3 py-2 bg-base border border-edge rounded-lg text-pale text-sm outline-none focus:border-primary transition-colors';

export default function ColorsSection({ config, update }) {
  return (
    <div className="flex flex-col gap-3">
      <SectionTitle>Colores</SectionTitle>

      <div className="flex items-center justify-between">
        <label className="text-sm text-pale">Usar degradado en puntos</label>
        <Toggle checked={config.useGradient} onChange={v => update('useGradient', v)} />
      </div>

      {!config.useGradient ? (
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs text-dim mb-1">Color puntos</label>
            <ColorPicker value={config.dotColor} onChange={v => update('dotColor', v)} />
          </div>
          <div>
            <label className="block text-xs text-dim mb-1">Fondo</label>
            <ColorPicker value={config.bgColor} onChange={v => update('bgColor', v)} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs text-dim mb-1">Color 1</label>
              <ColorPicker value={config.gradColor1} onChange={v => update('gradColor1', v)} />
            </div>
            <div>
              <label className="block text-xs text-dim mb-1">Color 2</label>
              <ColorPicker value={config.gradColor2} onChange={v => update('gradColor2', v)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs text-dim mb-1">Tipo degradado</label>
              <select
                value={config.gradType}
                onChange={e => update('gradType', e.target.value)}
                className={selectClass}
              >
                <option value="linear">Lineal</option>
                <option value="radial">Radial</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-dim mb-1">Fondo</label>
              <ColorPicker value={config.bgColorGrad} onChange={v => update('bgColorGrad', v)} />
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs text-dim mb-1">Color esquinas</label>
        <ColorPicker value={config.eyeColor} onChange={v => update('eyeColor', v)} />
      </div>
    </div>
  );
}
