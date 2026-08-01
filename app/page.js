import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/session";

export default async function LandingPage() {
  const userId = await getUserId();
  if (userId) redirect("/dashboard");

  return (
    <main className="flex-1 flex flex-col">
      <header className="max-w-5xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <span className="font-display italic text-2xl text-teal-dark">
          Bookworm 🪱
        </span>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="focus-ring text-sm font-medium text-ink-soft hover:text-ink px-3 py-1.5"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="focus-ring text-sm font-medium bg-teal text-paper rounded-md px-4 py-1.5 hover:bg-teal-dark transition-colors"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-20 text-center flex flex-col items-center">
        <span className="text-xs tracking-[0.2em] uppercase text-brass font-medium mb-5">
          A quiet place for your books
        </span>
        <h1 className="font-display text-5xl sm:text-6xl leading-[1.1] mb-6">
          Every book you have read,
          <br />
          <span className="italic">and every one you will.</span>
        </h1>
        <p className="text-ink-soft text-lg max-w-lg mb-10">
          Bookworm is a small, personal library for tracking what you are
          reading, what you have finished, and whats waiting to be read.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/signup"
            className="focus-ring rounded-md bg-teal text-paper text-sm font-medium px-6 py-3 hover:bg-teal-dark transition-colors"
          >
            Wanna be a reader?
          </Link>
          <Link
            href="/login"
            className="focus-ring rounded-md border border-line text-sm font-medium px-6 py-3 text-ink-soft hover:text-ink transition-colors"
          >
            Already a reader?
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
        <FeatureCard
          emoji="📖"
          title="Catalog freely"
          text="Add books with a title, author, and your own tags, organize your shelf your way."
        />
        <FeatureCard
          emoji="📘"
          title="Track your pace"
          text="Move books between want to read, reading, and completed as you go."
        />
        <FeatureCard
          emoji="✅"
          title="See it clearly"
          text="A calm dashboard shows your totals at a glance no clutter, just clarity."
        />
      </section>
    </main>
  );
}

function FeatureCard({ emoji, title, text }) {
  return (
    <div className="card rounded-lg p-6 text-left">
      <span className="text-2xl" aria-hidden="true">
        {emoji}
      </span>
      <h3 className="font-display text-lg mt-3 mb-1">{title}</h3>
      <p className="text-sm text-ink-soft">{text}</p>
    </div>
  );
}
