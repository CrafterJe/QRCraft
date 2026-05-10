import { useState, useEffect } from 'react';

export default function ColorPicker({ value, onChange }) {
  const [hex, setHex] = useState(value);

  useEffect(() => { setHex(value); }, [value]);

  const handlePicker = (e) => {
    setHex(e.target.value);
    onChange(e.target.value);
  };

  const handleHex = (e) => {
    const v = e.target.value;
    setHex(v);
    if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v);
  };

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-9 h-9 rounded-lg border-2 border-edge shrink-0 overflow-hidden cursor-pointer">
        <input
          type="color"
          value={value}
          onChange={handlePicker}
          className="absolute cursor-pointer border-0 p-0 bg-transparent"
          style={{ inset: '-4px', width: 'calc(100% + 8px)', height: 'calc(100% + 8px)' }}
        />
      </div>
      <input
        type="text"
        value={hex}
        onChange={handleHex}
        maxLength={7}
        className="flex-1 px-3 py-2 bg-base border border-edge rounded-lg text-pale text-sm outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
