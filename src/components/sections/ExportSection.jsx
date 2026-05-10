import SectionTitle from '../ui/SectionTitle';
import { downloadPNG, downloadSVG, downloadForCanva } from '../../utils/qrExport';

export default function ExportSection({ config, update, qrInstance, buildOptions, getRadiusPx }) {
  const name = config.fileName || 'qr-tecnofix';

  return (
    <div className="flex flex-col gap-2">
      <SectionTitle>Exportar</SectionTitle>

      <div>
        <label className="block text-xs text-dim mb-1">Nombre de archivo</label>
        <input
          type="text"
          value={config.fileName}
          onChange={e => update('fileName', e.target.value)}
          placeholder="nombre-archivo"
          className="w-full px-3 py-2 bg-base border border-edge rounded-lg text-pale text-sm outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-1">
        <button
          type="button"
          onClick={() => downloadPNG(qrInstance.current, name, getRadiusPx(), buildOptions)}
          className="py-3 rounded-[10px] text-sm font-bold text-white bg-green-700 hover:opacity-90 active:scale-[.98] transition-all"
        >
          Descargar PNG
        </button>
        <button
          type="button"
          onClick={() => downloadSVG(qrInstance.current, name)}
          className="py-3 rounded-[10px] text-sm font-bold text-white bg-primary hover:opacity-90 active:scale-[.98] transition-all"
        >
          Descargar SVG
        </button>
      </div>

      <button
        type="button"
        onClick={() => downloadForCanva(name, config.borderRadius, buildOptions)}
        className="py-3 mt-1 rounded-[10px] text-sm font-bold bg-tint/60 text-faint border border-primary/40 hover:border-primary hover:bg-tint transition-all active:scale-[.98]"
      >
        Exportar para Canva (PNG 1200px)
      </button>
      <p className="text-[11px] text-dim/60 text-center">Canva no acepta SVG con logos — usa este botón</p>
    </div>
  );
}
