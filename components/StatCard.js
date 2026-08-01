export default function StatCard({ label, value, emoji, accent }) {
  return (
    <div className="card rounded-lg px-5 py-4 flex items-center gap-4">
      <div
        className="shrink-0 h-11 w-11 rounded-full flex items-center justify-center text-lg border-2"
        style={{ borderColor: accent, color: accent }}
        aria-hidden="true"
      >
        {emoji}
      </div>
      <div>
        <p className="font-display text-3xl leading-none">{value}</p>
        <p className="text-sm text-ink-soft mt-1">{label}</p>
      </div>
    </div>
  );
}
