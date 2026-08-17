"use client";
import { motion } from "framer-motion";
import { techStack } from "@/lib/data";

export default function TechStack() {
  return (
    <section className="relative py-14 bg-cream-50 dark:bg-dark-300 border-y border-cream-400 dark:border-dark-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p className="text-center text-stone-500 dark:text-stone-600 text-xs font-semibold tracking-widest uppercase mb-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Technologies We Master
        </motion.p>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech, i) => (
            <motion.div key={tech.name}
              initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -3, scale: 1.04 }}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/50 hover:bg-cream-300 dark:hover:bg-dark-100 transition-all duration-200 cursor-default">
              <span className="text-base font-bold gradient-text">{tech.icon}</span>
              <span className="text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-cream-200 text-sm font-medium transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
