"use client";

import { STATUSES, statusMeta } from "@/lib/statuses";
import StatusBadge from "./StatusBadge";

export default function BookCard({
  book,
  index,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const catalogNo = String(index + 1).padStart(3, "0");

  return (
    <article className="card-stitch rounded-lg p-5 flex flex-col gap-3 relative">
      <div className="flex items-start justify-between gap-3">
        <span className="font-display text-xs tracking-widest text-ink-soft/70">
          NO. {catalogNo}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(book)}
            className="focus-ring text-ink-soft hover:text-teal rounded p-1 transition-colors cursor-pointer"
            aria-label={`Edit ${book.title}`}
            title="Edit"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(book)}
            className="focus-ring text-ink-soft hover:text-clay rounded p-1 transition-colors cursor-pointer"
            aria-label={`Delete ${book.title}`}
            title="Delete"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl leading-snug">{book.title}</h3>
        <p className="text-sm text-ink-soft mt-0.5">by {book.author}</p>
      </div>

      {book.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-full bg-sage/15 text-teal-dark border border-sage/40"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-2 flex items-center justify-between gap-2 border-t border-line/70">
        <StatusBadge status={book.status} size="sm" />
        <label className="sr-only" htmlFor={`status-${book._id}`}>
          Change status for {book.title}
        </label>
        <select
          id={`status-${book._id}`}
          value={book.status}
          onChange={(e) => onStatusChange(book, e.target.value)}
          className="focus-ring text-xs bg-transparent border border-line rounded-md px-2 py-1 text-ink-soft cursor-pointer hover:border-teal transition-colors"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              Move to {s.label}
            </option>
          ))}
        </select>
      </div>
    </article>
  );
}
