"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar({ userName }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display italic text-2xl text-teal-dark">
            Bookworm
          </span>
          <span className="hidden sm:inline text-xs text-ink-soft border-l border-line pl-2 ml-1">
            your shelf, kept
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-ink-soft hidden sm:inline">
            Hi, {userName?.split(" ")[0] || "reader"}
          </span>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="focus-ring text-sm font-medium border border-line rounded-md px-3 py-1.5 text-ink-soft hover:text-clay hover:border-clay/50 transition-colors cursor-pointer disabled:opacity-60"
          >
            {loggingOut ? "Signing out…" : "Log out"}
          </button>
        </div>
      </div>
    </header>
  );
}
