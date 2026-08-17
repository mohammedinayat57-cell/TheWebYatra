export default function Loading() {
  return (
    <div className="min-h-screen bg-cream-100 dark:bg-dark-400 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-warm-400/20 border-t-warm-400 animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-warm-600/20 border-t-warm-600 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
        </div>
        <span className="text-stone-500 dark:text-stone-600 text-sm font-medium tracking-widest uppercase">Loading…</span>
      </div>
    </div>
  );
}
