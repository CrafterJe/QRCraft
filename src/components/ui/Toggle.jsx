export default function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 shrink-0 ${
        checked ? 'bg-primary' : 'bg-edge'
      }`}
    >
      <span
        className={`absolute top-0.75 left-0.75 w-4 h-4 bg-pale rounded-full transition-transform duration-200 ${
          checked ? 'translate-x-4.5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
