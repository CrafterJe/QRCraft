import SectionTitle from '../ui/SectionTitle';

const DOT_STYLES = [
  {
    value: 'square',
    label: 'Cuadrado',
    icon: (
      <svg viewBox="0 0 36 36" className="w-9 h-9 fill-current">
        <rect x="4" y="4" width="8" height="8"/><rect x="14" y="4" width="8" height="8"/>
        <rect x="24" y="4" width="8" height="8"/><rect x="4" y="14" width="8" height="8"/>
        <rect x="24" y="14" width="8" height="8"/><rect x="4" y="24" width="8" height="8"/>
        <rect x="14" y="24" width="8" height="8"/><rect x="24" y="24" width="8" height="8"/>
      </svg>
    ),
  },
  {
    value: 'dots',
    label: 'Círculos',
    icon: (
      <svg viewBox="0 0 36 36" className="w-9 h-9 fill-current">
        <circle cx="8" cy="8" r="4"/><circle cx="18" cy="8" r="4"/><circle cx="28" cy="8" r="4"/>
        <circle cx="8" cy="18" r="4"/><circle cx="28" cy="18" r="4"/>
        <circle cx="8" cy="28" r="4"/><circle cx="18" cy="28" r="4"/><circle cx="28" cy="28" r="4"/>
      </svg>
    ),
  },
  {
    value: 'rounded',
    label: 'Redondeado',
    icon: (
      <svg viewBox="0 0 36 36" className="w-9 h-9 fill-current">
        <rect x="4" y="4" width="8" height="8" rx="2.5"/><rect x="14" y="4" width="8" height="8" rx="2.5"/>
        <rect x="24" y="4" width="8" height="8" rx="2.5"/><rect x="4" y="14" width="8" height="8" rx="2.5"/>
        <rect x="24" y="14" width="8" height="8" rx="2.5"/><rect x="4" y="24" width="8" height="8" rx="2.5"/>
        <rect x="14" y="24" width="8" height="8" rx="2.5"/><rect x="24" y="24" width="8" height="8" rx="2.5"/>
      </svg>
    ),
  },
  {
    value: 'extra-rounded',
    label: 'Oval',
    icon: (
      <svg viewBox="0 0 36 36" className="w-9 h-9 fill-current">
        <rect x="4" y="4" width="8" height="8" rx="4"/><rect x="14" y="4" width="8" height="8" rx="4"/>
        <rect x="24" y="4" width="8" height="8" rx="4"/><rect x="4" y="14" width="8" height="8" rx="4"/>
        <rect x="24" y="14" width="8" height="8" rx="4"/><rect x="4" y="24" width="8" height="8" rx="4"/>
        <rect x="14" y="24" width="8" height="8" rx="4"/><rect x="24" y="24" width="8" height="8" rx="4"/>
      </svg>
    ),
  },
  {
    value: 'classy',
    label: 'Clásico',
    icon: (
      <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12 L4 4 L12 4"/><path d="M24 4 L32 4 L32 12"/>
        <path d="M32 24 L32 32 L24 32"/><path d="M12 32 L4 32 L4 24"/>
        <rect x="13" y="13" width="10" height="10" rx="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    value: 'classy-rounded',
    label: 'Clás. Redondo',
    icon: (
      <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M4 12 Q4 4 12 4"/><path d="M24 4 Q32 4 32 12"/>
        <path d="M32 24 Q32 32 24 32"/><path d="M12 32 Q4 32 4 24"/>
        <rect x="13" y="13" width="10" height="10" rx="3" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

export default function DotsSection({ config, update }) {
  return (
    <div className="flex flex-col gap-2">
      <SectionTitle>Estilo de puntos</SectionTitle>
      <div className="grid grid-cols-3 gap-1.5">
        {DOT_STYLES.map(({ value, label, icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => update('dotStyle', value)}
            className={`flex flex-col items-center gap-1.5 px-1.5 py-2.5 rounded-[10px] border-2 cursor-pointer transition-all duration-150 ${
              config.dotStyle === value
                ? 'border-primary bg-tint text-faint'
                : 'border-edge bg-base text-dim hover:border-primary hover:text-pale'
            }`}
          >
            {icon}
            <span className="text-[10px]">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
