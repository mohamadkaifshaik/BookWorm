import { statusMeta } from "@/lib/statuses";

export default function StatusBadge({ status, size = "md" }) {
  const meta = statusMeta(status);
  const sizing =
    size === "sm"
      ? "text-[11px] px-2 py-0.5 gap-1"
      : "text-xs px-2.5 py-1 gap-1.5";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${sizing}`}
      style={{
        borderColor: meta.color,
        color: meta.color,
        backgroundColor:
          "color-mix(in srgb, " + meta.color + " 10%, transparent)",
      }}
    >
      <span aria-hidden="true">{meta.emoji}</span>
      {meta.label}
    </span>
  );
}
