"use client";
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import Link from "next/link";

const HeroScene = lazy(() => import("@/components/3d/HeroScene"));

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream-100 dark:bg-dark-400">
      <div className="absolute inset-0 animated-grid" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-warm-400/8 dark:bg-warm-400/5 rounded-full blur-[140px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-warm-400/6 dark:bg-warm-600/5 rounded-full blur-[120px] pointer-events-none animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">

          {/* Content */}
          <div className="order-2 lg:order-1">
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-6">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" className="text-amber-500" />)}
              </span>
              Available for projects · Delhi, India
            </motion.div>

            <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-stone-900 dark:text-cream-100 leading-[1.1] tracking-tight mb-6">
              Your Digital{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-warm-500 via-warm-600 to-warm-800 dark:from-warm-400 dark:via-warm-500 dark:to-warm-600">
                Journey
              </span>
              <br />Starts Here
            </motion.h1>

            <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
              className="text-stone-600 dark:text-stone-400 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              We craft premium web experiences, brands, and digital products. Full-Stack · MERN · Java · AI Integration — every yatra begins with a single step.
            </motion.p>

            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-wrap gap-4 mb-10">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-base bg-gradient-to-r from-warm-400 to-warm-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(196,150,106,0.40)]">
                Start Your Yatra <ArrowRight size={16} />
              </Link>
              <Link href="/work"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-warm-800 dark:text-warm-400 text-base border border-warm-400/40 bg-white/70 dark:bg-dark-200/70 backdrop-blur-sm transition-all duration-300 hover:border-warm-400/70 hover:bg-cream-300 dark:hover:bg-dark-100">
                <Play size={14} fill="currentColor" /> View Our Work
              </Link>
            </motion.div>

            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-wrap gap-8">
              {[
                { value: "6+", label: "Live Projects" },
                { value: "3+", label: "Internships" },
                { value: "5★", label: "Client Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-stone-500 dark:text-stone-500 text-sm mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D Scene */}
          <motion.div className="order-1 lg:order-2 h-[400px] sm:h-[500px] lg:h-[600px] relative"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}>
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-warm-400/30 border-t-warm-400 animate-spin" />
              </div>
            }>
              <HeroScene />
            </Suspense>

            {/* Floating card — project launched */}
            <motion.div
              className="absolute top-8 -left-4 sm:left-8 bg-white/90 dark:bg-dark-200/90 backdrop-blur-md border border-cream-400 dark:border-dark-50 rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg z-10"
              animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-warm-400 to-warm-700 flex items-center justify-center text-lg">🚀</div>
              <div>
                <div className="text-stone-900 dark:text-cream-200 text-xs font-semibold">Project Launched</div>
                <div className="text-stone-500 dark:text-stone-500 text-[10px]">Al Mishk · almishk.in</div>
              </div>
            </motion.div>

            {/* Floating card — conversion */}
            <motion.div
              className="absolute bottom-16 -right-2 sm:right-8 bg-white/90 dark:bg-dark-200/90 backdrop-blur-md border border-cream-400 dark:border-dark-50 rounded-xl px-4 py-3 z-10 shadow-lg"
              animate={{ y: [0, 8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
              <div className="text-stone-500 dark:text-stone-500 text-[10px] mb-1">Live Projects</div>
              <div className="font-display text-stone-900 dark:text-cream-200 text-xl font-bold">6+</div>
              <div className="text-emerald-600 dark:text-emerald-400 text-[10px]">↑ Growing</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
          <span className="text-stone-400 dark:text-stone-600 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div className="w-px h-10 bg-gradient-to-b from-warm-400 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.div>
      </div>
    </section>
  );
}
