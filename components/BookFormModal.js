"use client";

import { useEffect, useRef, useState } from "react";
import { STATUSES } from "@/lib/statuses";

const emptyForm = { title: "", author: "", tags: "", status: "want-to-read" };

export default function BookFormModal({
  open,
  initialBook,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    if (open) {
      // Reset the form whenever the modal opens for a new/different book.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(
        initialBook
          ? {
              title: initialBook.title,
              author: initialBook.author,
              tags: (initialBook.tags || []).join(", "),
              status: initialBook.status,
            }
          : emptyForm,
      );
      setError("");
      setTimeout(() => titleRef.current?.focus(), 0);
    }
  }, [open, initialBook]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.author.trim()) {
      setError("A title and author are needed to catalog this book.");
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: form.title,
        author: form.author,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        status: form.status,
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-form-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-xl bg-card border border-line shadow-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 id="book-form-title" className="font-display text-2xl">
            {initialBook ? "Edit Book" : "Add a Book"}
          </h2>
          <button
            onClick={onClose}
            className="focus-ring text-ink-soft hover:text-ink rounded p-1 cursor-pointer"
            aria-label="Close"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              ref={titleRef}
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title of the book"
              className="focus-ring w-full rounded-md border border-line bg-paper px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-1">
              Author
            </label>
            <input
              id="author"
              type="text"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Author of the book"
              className="focus-ring w-full rounded-md border border-line bg-paper px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">
              Tags <span className="text-ink-soft font-normal"></span>
            </label>
            <input
              id="tags"
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder=" you can write as fiction, favorites"
              className="focus-ring w-full rounded-md border border-line bg-paper px-3 py-2 text-sm"
            />
          </div>

          <div>
            <span className="block text-sm font-medium mb-1">Status</span>
            <div className="grid grid-cols-3 gap-2">
              {STATUSES.map((s) => (
                <button
                  type="button"
                  key={s.value}
                  onClick={() => setForm({ ...form, status: s.value })}
                  className={`focus-ring text-xs rounded-md border px-2 py-2 flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                    form.status === s.value
                      ? "border-teal bg-teal/10 text-teal-dark"
                      : "border-line text-ink-soft hover:border-teal/50"
                  }`}
                >
                  <span aria-hidden="true">{s.emoji}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-clay bg-clay/10 border border-clay/30 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3 mt-1">
            <button
              type="submit"
              disabled={saving}
              className="focus-ring flex-1 rounded-md bg-teal text-paper text-sm font-medium py-2.5 hover:bg-teal-dark transition-colors disabled:opacity-60 cursor-pointer"
            >
              {saving
                ? "Saving…"
                : initialBook
                  ? "Save Changes"
                  : "Add to Shelf"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring rounded-md border border-line text-sm font-medium py-2.5 px-4 text-ink-soft hover:text-ink cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
