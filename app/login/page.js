"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="font-display italic text-3xl text-teal-dark"
          >
            Bookworm 🪱
          </Link>
          <p className="text-sm text-ink-soft mt-2">
            Welcome back to your shelf.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card rounded-xl p-6 flex flex-col gap-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="focus-ring w-full rounded-md border border-line bg-paper px-3 py-2 text-sm"
              placeholder="keep your email-ID here"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="focus-ring w-full rounded-md border border-line bg-paper px-3 py-2 text-sm"
              placeholder="keep your password here"
            />
          </div>

          {error && (
            <p className="text-sm text-clay bg-clay/10 border border-clay/30 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="focus-ring rounded-md bg-teal text-paper text-sm font-medium py-2.5 hover:bg-teal-dark transition-colors disabled:opacity-60 cursor-pointer mt-1"
          >
            {loading ? "Signing in…" : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-ink-soft mt-6">
          New here?{" "}
          <Link
            href="/signup"
            className="text-teal-dark font-medium hover:underline"
          >
            Wanna create an account?
          </Link>
        </p>
      </div>
    </main>
  );
}
