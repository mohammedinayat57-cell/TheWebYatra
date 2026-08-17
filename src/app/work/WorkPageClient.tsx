"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import CTABanner from "@/components/sections/CTABanner";

const categories = ["All", "Web Design", "Web Development", "E-Commerce", "App Development", "Branding"];
const gradients = [
  "from-blue-100 to-indigo-100 dark:from-blue-950/60 dark:to-indigo-950/60",
  "from-rose-100 to-pink-100 dark:from-rose-950/60 dark:to-pink-950/60",
  "from-amber-100 to-orange-100 dark:from-amber-950/60 dark:to-orange-950/60",
  "from-violet-100 to-purple-100 dark:from-violet-950/60 dark:to-purple-950/60",
  "from-yellow-100 to-amber-100 dark:from-yellow-950/60 dark:to-amber-950/60",
  "from-emerald-100 to-teal-100 dark:from-emerald-950/60 dark:to-teal-950/60",
];
const emojis = ["🕌", "🖨️", "🍛", "✈️", "🤝", "🚕"];

export default function WorkPageClient() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section className="relative pt-32 pb-16 bg-cream-100 dark:bg-dark-400 overflow-hidden">
        <div className="absolute inset-0 animated-grid" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-warm-400 animate-pulse" /> Our Portfolio
          </motion.div>
          <motion.h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-cream-100 mb-6"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Work That Speaks <span className="gradient-text">For Itself</span>
          </motion.h1>
          <motion.p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Real live projects — e-commerce, cloud kitchens, travel, marketplaces and more.
          </motion.p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="py-5 bg-white dark:bg-dark-200 border-b border-cream-400 dark:border-dark-50 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === cat
                    ? "text-white bg-gradient-to-r from-warm-400 to-warm-700 shadow-sm"
                    : "text-stone-600 dark:text-stone-400 border border-cream-400 dark:border-dark-50 bg-cream-50 dark:bg-dark-100 hover:border-warm-400/50 hover:bg-cream-200 dark:hover:bg-dark-50"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project grid */}
      <section className="py-16 bg-cream-50 dark:bg-dark-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div key={filter} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {filtered.map((project, i) => {
                const idx = projects.findIndex((p) => p.id === project.id);
                return (
                  <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="group rounded-2xl overflow-hidden border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/50 hover:shadow-[0_8px_32px_rgba(196,150,106,0.10)] transition-all duration-300">
                    <div className={`h-48 bg-gradient-to-br ${gradients[idx % gradients.length]} relative overflow-hidden`}>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-5xl mb-2">{emojis[idx % emojis.length]}</div>
                        <div className="text-stone-500 dark:text-stone-500 text-xs tracking-widest uppercase">{project.category}</div>
                      </div>
                      <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Link href={`/work/${project.id}`}
                          className="px-5 py-2.5 rounded-full text-sm font-semibold text-white border border-white/60 bg-white/20 hover:bg-white/30 transition-all">
                          View Case Study
                        </Link>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-display font-semibold text-stone-900 dark:text-cream-200 text-base group-hover:text-warm-700 dark:group-hover:text-warm-400 transition-colors">
                          {project.title}
                        </h3>
                        <Link href={`/work/${project.id}`} className="text-stone-300 dark:text-stone-600 hover:text-warm-600 dark:hover:text-warm-400 transition-colors mt-0.5">
                          <ExternalLink size={14} />
                        </Link>
                      </div>
                      <p className="text-stone-600 dark:text-stone-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-cream-400 dark:border-dark-50 text-stone-500 dark:text-stone-500 bg-cream-100 dark:bg-dark-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="text-center py-20 text-stone-400 dark:text-stone-600">No projects in this category yet.</p>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
