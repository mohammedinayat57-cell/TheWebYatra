"use client";
import { motion } from "framer-motion";

const trustedCompanies = [
  { name: "Al Mishk",      initial: "A", color: "#10B981" },
  { name: "Panchaiyat",    initial: "P", color: "#F59E0B" },
  { name: "Nassk Hub",     initial: "N", color: "#6366F1" },
  { name: "Globe Trotter", initial: "G", color: "#3B82F6" },
  { name: "DriveYouu",     initial: "D", color: "#EC4899" },
  { name: "B2B Market",    initial: "B", color: "#8B5CF6" },
  { name: "Oasis Infobyte",initial: "O", color: "#EF4444" },
  { name: "CodSoft",       initial: "C", color: "#14B8A6" },
];
const doubled = [...trustedCompanies, ...trustedCompanies];

export default function TrustedBy() {
  return (
    <section className="relative py-10 border-y border-cream-400 dark:border-dark-50 bg-cream-50 dark:bg-dark-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-7 text-center">
        <motion.p
          className="text-stone-500 dark:text-stone-600 text-xs font-semibold tracking-widest uppercase"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Trusted by businesses I&apos;ve worked with
        </motion.p>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {doubled.map((co, i) => (
            <div key={`${co.name}-${i}`}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 min-w-[155px] group hover:border-warm-400/50 hover:shadow-sm transition-all duration-200">
              <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                style={{ backgroundColor: co.color }}>
                {co.initial}
              </div>
              <span className="text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-cream-200 font-medium text-sm transition-colors">
                {co.name}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream-50 dark:from-dark-300 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream-50 dark:from-dark-300 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
