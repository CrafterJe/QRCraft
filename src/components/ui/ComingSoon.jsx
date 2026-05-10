export default function ComingSoon({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-3 rounded-xl border border-dashed border-edge">
      <div className="w-11 h-11 rounded-full bg-tint/40 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>
      </div>
      <div className="text-center px-4">
        <p className="text-sm text-pale font-medium">Próximamente</p>
        <p className="text-xs text-dim mt-1 leading-relaxed">
          El módulo <span className="text-soft font-medium">{label}</span> estará disponible en una próxima versión.
        </p>
      </div>
    </div>
  );
}
