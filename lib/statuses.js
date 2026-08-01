export const STATUSES = [
  {
    value: "want-to-read",
    label: "Want to Read",
    emoji: "📖",
    color: "var(--color-blue-dusty)",
  },
  {
    value: "reading",
    label: "Reading",
    emoji: "📘",
    color: "var(--color-brass)",
  },
  {
    value: "completed",
    label: "Completed",
    emoji: "✅",
    color: "var(--color-teal)",
  },
];

export function statusMeta(value) {
  return STATUSES.find((s) => s.value === value) || STATUSES[0];
}
