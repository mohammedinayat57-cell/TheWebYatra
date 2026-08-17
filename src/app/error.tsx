"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="min-h-screen bg-cream-100 dark:bg-dark-400 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-5xl mb-6">⚡</div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-cream-100 mb-4">
          Something went wrong
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-sm mx-auto">
          An unexpected error occurred. Our team has been notified.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button onClick={reset}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-warm-400 to-warm-700 transition-all hover:-translate-y-0.5">
            Try Again
          </button>
          <Link href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-warm-800 dark:text-warm-400 border border-warm-400/40 bg-white dark:bg-dark-200 hover:bg-cream-200 dark:hover:bg-dark-100 transition-all">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
