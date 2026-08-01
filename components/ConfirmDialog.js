"use client";

export default function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="w-full max-w-sm rounded-xl bg-card border border-line shadow-xl p-6">
        <h2 id="confirm-title" className="font-display text-xl mb-2">
          {title}
        </h2>
        <p className="text-sm text-ink-soft mb-5">{description}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={onConfirm}
            className="focus-ring flex-1 rounded-md bg-clay text-paper text-sm font-medium py-2.5 hover:opacity-90 transition-opacity cursor-pointer"
          >
            Remove Book
          </button>
          <button
            onClick={onCancel}
            className="focus-ring rounded-md border border-line text-sm font-medium py-2.5 px-4 text-ink-soft hover:text-ink cursor-pointer"
          >
            Keep It
          </button>
        </div>
      </div>
    </div>
  );
}
