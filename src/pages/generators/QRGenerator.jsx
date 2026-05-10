import { useState } from 'react';
import { useQRConfig } from '../../hooks/useQRConfig';
import { MODULES } from '../../modules/index.jsx';
import TypeNavbar from '../../components/TypeNavbar';
import ControlPanel from '../../components/ControlPanel';
import QRPreview from '../../components/QRPreview';

function QRIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="4" height="4" rx=".5"/>
      <rect x="20" y="14" width="1" height="1"/>
      <rect x="14" y="20" width="1" height="1"/>
      <rect x="18" y="18" width="3" height="3" rx=".5"/>
    </svg>
  );
}

function MobileTab({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 ${
        active
          ? 'text-soft border-primary'
          : 'text-dim border-transparent hover:text-pale'
      }`}
    >
      {label}
    </button>
  );
}

export default function QRGenerator() {
  const { config, update, reinit, qrRef, qrInstance, buildOptions, getRadiusPx } = useQRConfig();

  const [activeModuleId, setActiveModuleId] = useState(() => {
    const hash = window.location.hash.slice(1);
    return MODULES.find(m => m.id === hash && m.available) ? hash : 'url';
  });

  const [mobileTab, setMobileTab] = useState('config');

  const handleModuleChange = (moduleId) => {
    // Wipe the canvas immediately so the old QR doesn't linger while the new
    // buildOptions fires through the useEffect cycle.
    if (qrRef.current) qrRef.current.innerHTML = '';
    qrInstance.current = null;

    setActiveModuleId(moduleId);
    update('data', '');
    update('label', '');
    window.location.hash = moduleId;
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col text-pale">

      {/* Header */}
      <header className="shrink-0 bg-surface border-b border-edge px-5 sm:px-7 py-3.5 flex items-center gap-3">
        <QRIcon />
        <div>
          <h1 className="text-[1rem] sm:text-lg text-primary tracking-[0.5px] font-semibold leading-tight">
            Generador QR con Logo
          </h1>
          <span className="hidden sm:block text-xs text-dim">
            Diseño personalizado · Vista previa en tiempo real · Exporta PNG o SVG
          </span>
        </div>
      </header>

      {/* Type navbar */}
      <TypeNavbar activeModuleId={activeModuleId} onModuleChange={handleModuleChange} />

      {/* Mobile tab switcher */}
      <div className="flex lg:hidden shrink-0 bg-surface border-b border-edge">
        <MobileTab label="Configurar"   active={mobileTab === 'config'}  onClick={() => setMobileTab('config')} />
        <MobileTab label="Vista previa" active={mobileTab === 'preview'} onClick={() => setMobileTab('preview')} />
      </div>

      {/* Main content */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        <ControlPanel
          config={config}
          update={update}
          qrInstance={qrInstance}
          buildOptions={buildOptions}
          getRadiusPx={getRadiusPx}
          reinit={reinit}
          activeModuleId={activeModuleId}
          className={mobileTab !== 'config' ? 'hidden lg:flex' : ''}
        />
        <QRPreview
          qrRef={qrRef}
          config={config}
          getRadiusPx={getRadiusPx}
          className={mobileTab !== 'preview' ? 'hidden lg:flex' : ''}
        />
      </div>

    </div>
  );
}
