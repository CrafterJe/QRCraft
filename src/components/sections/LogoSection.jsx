import { useRef } from 'react';
import SectionTitle from '../ui/SectionTitle';
import Toggle from '../ui/Toggle';

const inputClass = 'w-full px-3 py-2 bg-base border border-edge rounded-lg text-pale text-sm outline-none focus:border-primary transition-colors';

export default function LogoSection({ config, update }) {
  const fileRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      update('logoUrl', ev.target.result);
      update('logoFileName', file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <SectionTitle>Logo central</SectionTitle>

      <div
        onClick={() => fileRef.current?.click()}
        onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
        onDragOver={e => e.preventDefault()}
        className="border-2 border-dashed border-edge rounded-[10px] p-3.5 text-center cursor-pointer hover:border-primary transition-colors bg-base"
      >
        <input
          ref={fileRef}
          type="file"
          accept=".svg,.png,.jpg,.jpeg,.webp"
          onChange={e => handleFile(e.target.files[0])}
          className="hidden"
        />
        {config.logoUrl && (
          <img src={config.logoUrl} alt="Logo" className="w-11 h-11 object-contain mx-auto mb-1" />
        )}
        <span className="text-xs text-dim">
          {config.logoFileName || 'Haz clic o arrastra tu logo aquí'}
        </span>
      </div>

      {config.logoUrl && (
        <>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs text-dim mb-1">Tamaño logo (%)</label>
              <input
                type="number"
                value={config.logoSize}
                onChange={e => update('logoSize', parseInt(e.target.value) || 22)}
                min="5" max="40"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-dim mb-1">Margen logo</label>
              <input
                type="number"
                value={config.logoMargin}
                onChange={e => update('logoMargin', parseInt(e.target.value) || 0)}
                min="0" max="20"
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-pale">Fondo blanco detrás del logo</label>
            <Toggle checked={config.hideLogoBg} onChange={v => update('hideLogoBg', v)} />
          </div>
        </>
      )}
    </div>
  );
}
