"use client";

import { useMemo, useState } from "react";
import { STATUSES } from "@/lib/statuses";
import StatCard from "./StatCard";
import BookCard from "./BookCard";
import BookFormModal from "./BookFormModal";
import ConfirmDialog from "./ConfirmDialog";
import EmptyState from "./EmptyState";

export default function DashboardClient({ initialBooks }) {
  const [books, setBooks] = useState(initialBooks);
  const [statusFilter, setStatusFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const allTags = useMemo(() => {
    const set = new Set();
    books.forEach((b) => b.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (tagFilter !== "all" && !b.tags?.includes(tagFilter)) return false;
      return true;
    });
  }, [books, statusFilter, tagFilter]);

  const stats = useMemo(
    () => ({
      total: books.length,
      reading: books.filter((b) => b.status === "reading").length,
      completed: books.filter((b) => b.status === "completed").length,
    }),
    [books],
  );

  function openAddModal() {
    setEditingBook(null);
    setModalOpen(true);
  }

  function openEditModal(book) {
    setEditingBook(book);
    setModalOpen(true);
  }

  async function handleFormSubmit(payload) {
    if (editingBook) {
      const res = await fetch(`/api/books/${editingBook._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBooks((prev) =>
        prev.map((b) => (b._id === data.book._id ? data.book : b)),
      );
    } else {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBooks((prev) => [data.book, ...prev]);
    }
    setModalOpen(false);
  }

  async function handleStatusChange(book, status) {
    const previous = books;
    setBooks((prev) =>
      prev.map((b) => (b._id === book._id ? { ...b, status } : b)),
    );
    const res = await fetch(`/api/books/${book._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) setBooks(previous);
  }

  async function handleDeleteConfirmed() {
    const book = deleteTarget;
    setDeleteTarget(null);
    const previous = books;
    setBooks((prev) => prev.filter((b) => b._id !== book._id));
    const res = await fetch(`/api/books/${book._id}`, { method: "DELETE" });
    if (!res.ok) setBooks(previous);
  }

  const hasAnyBooks = books.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-8">
      {/* Stats */}
      <section
        aria-label="Reading summary"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <StatCard
          label="Books in your shelf"
          value={stats.total}
          emoji="📚"
          accent="var(--color-teal)"
        />
        <StatCard
          label="Currently reading"
          value={stats.reading}
          emoji="📘"
          accent="var(--color-brass)"
        />
        <StatCard
          label="Completed"
          value={stats.completed}
          emoji="✅"
          accent="var(--color-sage)"
        />
      </section>

      {/* Filters + add */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <FilterPill
            active={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
          >
            All
          </FilterPill>
          {STATUSES.map((s) => (
            <FilterPill
              key={s.value}
              active={statusFilter === s.value}
              onClick={() => setStatusFilter(s.value)}
            >
              <span aria-hidden="true">{s.emoji}</span> {s.label}
            </FilterPill>
          ))}

          {allTags.length > 0 && (
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="focus-ring text-xs border border-line rounded-full px-3 py-1.5 bg-card text-ink-soft cursor-pointer ml-1"
              aria-label="Filter by tag"
            >
              <option value="all">All tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  #{tag}
                </option>
              ))}
            </select>
          )}
        </div>

        <button
          onClick={openAddModal}
          className="focus-ring rounded-md bg-teal text-paper text-sm font-medium px-4 py-2 hover:bg-teal-dark transition-colors cursor-pointer whitespace-nowrap"
        >
          + Add a Book
        </button>
      </section>

      {/* Book grid */}
      {filteredBooks.length > 0 ? (
        <section
          aria-label="Your books"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredBooks.map((book, i) => (
            <BookCard
              key={book._id}
              book={book}
              index={i}
              onEdit={openEditModal}
              onDelete={setDeleteTarget}
              onStatusChange={handleStatusChange}
            />
          ))}
        </section>
      ) : hasAnyBooks ? (
        <EmptyState
          title="No books match these filters"
          subtitle="Try a different status or tag, or clear your filters to see your whole shelf."
          actionLabel="Clear filters"
          onAction={() => {
            setStatusFilter("all");
            setTagFilter("all");
          }}
        />
      ) : (
        <EmptyState
          title="Your shelf is empty"
          subtitle="Add the first book you're reading, have read, or hope to read someday."
          actionLabel="Add your first book"
          onAction={openAddModal}
        />
      )}

      <BookFormModal
        open={modalOpen}
        initialBook={editingBook}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Remove this book?"
        description={
          deleteTarget
            ? `“${deleteTarget.title}” will be removed from your shelf. This can't be undone.`
            : ""
        }
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

function FilterPill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`focus-ring text-xs font-medium rounded-full px-3 py-1.5 border transition-colors cursor-pointer ${
        active
          ? "bg-teal text-paper border-teal"
          : "bg-card text-ink-soft border-line hover:border-teal/50"
      }`}
    >
      {children}
    </button>
  );
}
