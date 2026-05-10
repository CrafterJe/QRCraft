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
  const dataLabel = config.data
    ? (config.data.length > 40 ? config.data.slice(0, 40) + '…' : config.data)
    : 'Vista previa en tiempo real';

  const labelBg = config.useGradient ? config.bgColorGrad : config.bgColor;

  // With label: no rounded-2xl on the card so the QR's own borderRadius is the
  // only rounding — matching exactly what appendLabel produces in the export.
  // Without label: rounded-2xl card with checkerboard padding (preview only).
  return (
    <div className={`flex-1 min-h-0 overflow-y-auto flex flex-col items-center justify-center gap-5 p-8 bg-pit ${className}`}>
      <div
        className={`shadow-[0_8px_48px_#00000099] overflow-hidden flex flex-col items-center min-w-50 min-h-50 ${config.label ? '' : 'rounded-2xl justify-center'}`}
        style={config.label
          ? { backgroundColor: labelBg, borderRadius: `${radiusPx}px` }
          : { ...CHECKERS, padding: '1.25rem' }
        }
      >
        <div
          ref={qrRef}
          style={!config.label && radiusPx > 0 ? { clipPath: `inset(0 round ${radiusPx}px)` } : undefined}
        />
        {config.label && (
          <div
            className="w-full flex items-center justify-center px-5 py-3"
            style={{ backgroundColor: labelBg }}
          >
            <p
              className="text-center"
              style={{
                fontSize: config.labelSize,
                fontWeight: config.labelBold ? 'bold' : 'normal',
                fontStyle: config.labelItalic ? 'italic' : 'normal',
                color: config.labelColor,
              }}
            >
              {config.label}
            </p>
          </div>
        )}
      </div>
      <span className="text-xs text-dim text-center">
        {config.size} × {config.size} px · {dataLabel}
      </span>
    </div>
  );
}
