import { useState } from 'react';
import { MODULES, CATEGORIES } from '../modules/index.jsx';

export default function TypeNavbar({ activeModuleId, onModuleChange }) {
  const activeModule = MODULES.find(m => m.id === activeModuleId);
  const [openCatId, setOpenCatId] = useState(activeModule?.categoryId ?? 'basics');

  const toggle = (catId) =>
    setOpenCatId(prev => (prev === catId ? null : catId));

  return (
    <nav className="shrink-0 bg-surface">

      {/* ── Category tabs ── */}
      <div className="flex items-stretch overflow-x-auto navbar-scroll border-b border-edge">
        {CATEGORIES.map(cat => {
          const isOpen = openCatId === cat.id;
          const hasActive = activeModule?.categoryId === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggle(cat.id)}
              className={[
                'flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2',
                isOpen
                  ? 'text-soft border-primary bg-base/60'
                  : hasActive
                  ? 'text-soft/50 border-primary/25'
                  : 'text-dim border-transparent hover:text-pale hover:bg-white/5',
              ].join(' ')}
            >
              {cat.label}
              <svg
                width="10" height="10" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          );
        })}
      </div>

      {/* ── Module chips ── */}
      {openCatId && (
        <div className="flex flex-wrap gap-1.5 px-4 py-2.5 border-b border-edge bg-base/40">
          {MODULES.filter(m => m.categoryId === openCatId).map(mod => {
            const isActive = mod.id === activeModuleId;
            const isLocked = !mod.available;

            return (
              <button
                key={mod.id}
                type="button"
                disabled={isLocked}
                onClick={() => !isLocked && onModuleChange(mod.id)}
                title={isLocked ? `${mod.label} — Próximamente` : mod.label}
                className={[
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all duration-150 whitespace-nowrap',
                  isActive
                    ? 'border-primary bg-tint text-faint'
                    : isLocked
                    ? 'border-edge/40 bg-transparent text-pale/20 cursor-not-allowed'
                    : 'border-edge bg-base text-dim hover:border-primary hover:text-pale cursor-pointer',
                ].join(' ')}
              >
                <span className={isLocked ? 'opacity-20' : isActive ? 'text-soft' : ''}>
                  {mod.icon}
                </span>
                {mod.label}
                {isLocked && (
                  <span className="text-[9px] bg-primary/10 text-primary/40 border border-primary/20 rounded px-1">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

    </nav>
  );
}
