"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
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
  return (
    <section id="work" className="relative py-20 md:py-28 bg-cream-50 dark:bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Our Work" title="Projects That" highlight="Drive Results"
          description="Real projects, real results. From e-commerce to cloud kitchens — work that ships and works." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl overflow-hidden border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/50 hover:shadow-[0_8px_32px_rgba(196,150,106,0.10)] transition-all duration-300">
              <div className={`h-48 bg-gradient-to-br ${gradients[i % gradients.length]} relative overflow-hidden`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-5xl mb-2">{emojis[i % emojis.length]}</div>
                  <div className="text-stone-500 dark:text-stone-500 text-xs tracking-widest uppercase font-medium">{project.category}</div>
                </div>
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                    <span key={tag} className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-cream-400 dark:border-dark-50 text-stone-500 dark:text-stone-500 bg-cream-100 dark:bg-dark-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-12 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
          <Link href="/work"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-warm-800 dark:text-warm-400 text-sm border border-warm-400/40 bg-white dark:bg-dark-200 hover:border-warm-400/70 hover:bg-cream-300 dark:hover:bg-dark-100 transition-all">
            View All Projects <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
