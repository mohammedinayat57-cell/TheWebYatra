"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/Section";

const gradients = [
  "from-blue-100 to-indigo-100 dark:from-blue-950/60 dark:to-indigo-950/60",
  "from-rose-100 to-pink-100 dark:from-rose-950/60 dark:to-pink-950/60",
  "from-amber-100 to-orange-100 dark:from-amber-950/60 dark:to-orange-950/60",
  "from-violet-100 to-purple-100 dark:from-violet-950/60 dark:to-purple-950/60",
  "from-yellow-100 to-amber-100 dark:from-yellow-950/60 dark:to-amber-950/60",
  "from-emerald-100 to-teal-100 dark:from-emerald-950/60 dark:to-teal-950/60",
];
const emojis = ["🕌", "🖨️", "🍛", "✈️", "🤝", "🚕"];

export default function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  };

  return (
    <section id="work" className="relative py-20 md:py-28 bg-cream-50 dark:bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <SectionHeading
            badge="Our Work"
            title="Projects That"
            highlight="Drive Results"
            description="Real projects, real results. From e-commerce to cloud kitchens — work that ships and works."
            centered={false}
            className="mb-0"
          />
          <div className="hidden md:flex items-center gap-2 flex-shrink-0 ml-6">
            <button onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 flex items-center justify-center text-stone-500 dark:text-stone-400 hover:border-warm-400/50 hover:text-warm-700 dark:hover:text-warm-400 transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 flex items-center justify-center text-stone-500 dark:text-stone-400 hover:border-warm-400/50 hover:text-warm-700 dark:hover:text-warm-400 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-cream-50 dark:from-dark-300 to-transparent z-10 pointer-events-none" />
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-cream-50 dark:from-dark-300 to-transparent z-10 pointer-events-none" />

          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {projects.map((project, i) => {
              const idx = projects.findIndex((p) => p.id === project.id);
              return (
                <motion.div key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group flex-shrink-0 w-[290px] sm:w-[310px] rounded-2xl overflow-hidden border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/50 hover:shadow-[0_8px_32px_rgba(196,150,106,0.10)] transition-all duration-300">
                  {/* Image area */}
                  <div className={`h-44 bg-gradient-to-br ${gradients[idx % gradients.length]} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-5xl mb-2">{emojis[idx % emojis.length]}</div>
                      <div className="text-stone-500 dark:text-stone-500 text-xs tracking-widest uppercase font-medium">{project.category}</div>
                    </div>
                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/work/${project.id}`}
                        className="px-5 py-2.5 rounded-full text-sm font-semibold text-white border border-white/60 bg-white/20 hover:bg-white/30 transition-all">
                        View Case Study
                      </Link>
                    </div>
                  </div>
                  {/* Content */}
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
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-cream-400 dark:border-dark-50 text-stone-500 dark:text-stone-500 bg-cream-100 dark:bg-dark-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div className="mt-8 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <Link href="/work"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-warm-800 dark:text-warm-400 text-sm border border-warm-400/40 bg-white dark:bg-dark-200 hover:border-warm-400/70 hover:bg-cream-300 dark:hover:bg-dark-100 transition-all">
            View All Projects <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
