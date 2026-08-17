import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "404 — Page Not Found" };

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-100 dark:bg-dark-400 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display text-[120px] md:text-[180px] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-warm-500 via-warm-600 to-warm-800 dark:from-warm-400 dark:via-warm-500 dark:to-warm-600 mb-4">
          404
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-cream-100 mb-4">
          This route doesn&apos;t exist yet
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-sm mx-auto">
          Looks like this page took a detour. Let&apos;s get you back on the yatra.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-warm-400 to-warm-700 transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(196,150,106,0.35)]">
            Go Home
          </Link>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-warm-800 dark:text-warm-400 border border-warm-400/40 bg-white dark:bg-dark-200 hover:border-warm-400/70 hover:bg-cream-300 dark:hover:bg-dark-100 transition-all">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
