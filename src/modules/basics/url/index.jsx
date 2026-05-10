/** @type {import('../../../types/module').QRModule} */
export default {
  id: 'url',
  label: 'URL / enlace web',
  categoryId: 'basics',
  available: true,
  icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  Form({ value, onChange, onFileNameChange }) {
    const handleChange = (url) => {
      onChange(url);
      try {
        const { hostname } = new URL(url);
        const name = hostname.replace(/^www\./, '').split('.')[0];
        onFileNameChange?.('qr-' + (name || 'url'));
      } catch {
        onFileNameChange?.('qr-url');
      }
    };

    return (
      <div className="flex flex-col gap-2">
        <label className="block text-xs text-dim mb-1">URL o enlace web</label>
        <input
          type="text"
          value={value}
          onChange={e => handleChange(e.target.value)}
          placeholder="https://..."
          className="w-full px-3 py-2 bg-base border border-edge rounded-lg text-pale text-sm outline-none focus:border-primary transition-colors"
        />
      </div>
    );
  },
};
