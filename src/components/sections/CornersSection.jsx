import SectionTitle from '../ui/SectionTitle';

const inputClass = 'w-full px-3 py-2 bg-base border border-edge rounded-lg text-pale text-sm outline-none focus:border-primary transition-colors';

export default function CornersSection({ config, update }) {
  return (
    <div className="flex flex-col gap-2">
      <SectionTitle>Estilo de esquinas (ojos)</SectionTitle>
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="block text-xs text-dim mb-1">Marco exterior</label>
          <select
            value={config.cornerSquareStyle}
            onChange={e => update('cornerSquareStyle', e.target.value)}
            className={inputClass}
          >
            <option value="square">Cuadrado</option>
            <option value="extra-rounded">Extra redondeado</option>
            <option value="dot">Punto</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-dim mb-1">Punto interior</label>
          <select
            value={config.cornerDotStyle}
            onChange={e => update('cornerDotStyle', e.target.value)}
            className={inputClass}
          >
            <option value="square">Cuadrado</option>
            <option value="dot">Círculo</option>
          </select>
        </div>
      </div>
    </div>
  );
}
