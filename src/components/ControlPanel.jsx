import { MODULES } from '../modules/index.jsx';
import ComingSoon from './ui/ComingSoon';
import QRSettingsSection from './sections/QRSettingsSection';
import ShapeSection from './sections/ShapeSection';
import DotsSection from './sections/DotsSection';
import CornersSection from './sections/CornersSection';
import ColorsSection from './sections/ColorsSection';
import LogoSection from './sections/LogoSection';
import ExportSection from './sections/ExportSection';

export default function ControlPanel({
  config, update,
  qrInstance, buildOptions, getRadiusPx,
  activeModuleId,
  className = '',
}) {
  const activeModule = MODULES.find(m => m.id === activeModuleId) ?? MODULES[0];
  const ActiveForm = activeModule.Form;

  return (
    <div className={`panel-scroll bg-surface border-r border-edge overflow-y-auto flex flex-col gap-4.5 p-5 flex-1 min-h-0 lg:flex-none lg:w-105 ${className}`}>
      {ActiveForm
        ? <ActiveForm value={config.data} onChange={v => update('data', v)} />
        : <ComingSoon label={activeModule.label} />
      }
      <QRSettingsSection config={config} update={update} />
      <ShapeSection config={config} update={update} />
      <DotsSection config={config} update={update} />
      <CornersSection config={config} update={update} />
      <ColorsSection config={config} update={update} />
      <LogoSection config={config} update={update} />
      <ExportSection
        config={config}
        update={update}
        qrInstance={qrInstance}
        buildOptions={buildOptions}
        getRadiusPx={getRadiusPx}
      />
    </div>
  );
}
