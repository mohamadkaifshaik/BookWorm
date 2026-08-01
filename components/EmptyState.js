export default function EmptyState({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="card-stitch rounded-lg py-16 px-6 flex flex-col items-center text-center gap-3">
      <span className="text-3xl" aria-hidden="true">
        📚
      </span>
      <h3 className="font-display text-xl">{title}</h3>
      <p className="text-sm text-ink-soft max-w-xs">{subtitle}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="focus-ring mt-2 rounded-md bg-teal text-paper text-sm font-medium px-4 py-2 hover:bg-teal-dark transition-colors cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
