const CHECKERS = {
  backgroundImage: `
    linear-gradient(45deg, #111113 25%, transparent 25%),
    linear-gradient(-45deg, #111113 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #111113 75%),
    linear-gradient(-45deg, transparent 75%, #111113 75%)
  `,
  backgroundSize: '16px 16px',
  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0',
};

export default function QRPreview({ qrRef, config, getRadiusPx, className = '' }) {
  const radiusPx = getRadiusPx();
  const label = config.data
    ? (config.data.length > 40 ? config.data.slice(0, 40) + '…' : config.data)
    : 'Vista previa en tiempo real';

  return (
    <div className={`flex-1 min-h-0 overflow-y-auto flex flex-col items-center justify-center gap-5 p-8 bg-pit ${className}`}>
      <div
        className="rounded-2xl p-5 shadow-[0_8px_48px_#00000099] flex items-center justify-center min-w-50 min-h-50"
        style={CHECKERS}
      >
        <div
          ref={qrRef}
          style={{ borderRadius: `${radiusPx}px`, overflow: 'hidden' }}
        />
      </div>
      <span className="text-xs text-dim text-center">
        {config.size} × {config.size} px · {label}
      </span>
    </div>
  );
}
