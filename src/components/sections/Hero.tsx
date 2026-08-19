"use client";
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Code2, Star, Briefcase } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
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
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-amber-300/8 dark:bg-amber-600/4 rounded-full blur-[120px] pointer-events-none animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[82vh]">

          {/* Left */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for New Projects
            </motion.div>

            {/* Heading */}
            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
              <p className="text-stone-500 dark:text-stone-500 text-base font-medium mb-2 tracking-wide">
                TheWebYatra — Your Digital Journey Starts Here
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-stone-900 dark:text-cream-100 leading-[1.1] tracking-tight mb-2">
                Premium Web Development
              </h1>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-warm-500 via-warm-600 to-warm-800 dark:from-warm-400 dark:via-warm-500 dark:to-warm-600">
                  For Your Business
                </span>
              </h2>
            </motion.div>

            {/* Sub */}
            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}
              className="mb-8 max-w-lg">
              <p className="text-stone-800 dark:text-cream-200 text-base font-semibold mb-1">
                Innovative Solutions. Scalable Results. Digital Growth.
              </p>
              <p className="text-stone-600 dark:text-stone-400 text-base leading-relaxed">
                We build fast, secure and user-centric digital experiences that help your business lead the market.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-wrap gap-4 mb-10">
              <Link href="/#quote"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-base bg-gradient-to-r from-warm-400 to-warm-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(196,150,106,0.45)]">
                <Briefcase size={16} /> Get a Quote
              </Link>
              <Link href="/work"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-warm-800 dark:text-warm-400 text-base border border-warm-400/40 bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm hover:border-warm-400/70 hover:bg-cream-300 dark:hover:bg-dark-100 transition-all duration-300">
                <Code2 size={15} /> View Our Work
              </Link>
            </motion.div>

            {/* Socials + stats */}
            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <a href="https://github.com/inayatshaykh" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 flex items-center justify-center text-stone-500 dark:text-stone-500 hover:text-warm-700 dark:hover:text-warm-400 hover:border-warm-400/50 transition-all">
                  <GitHubIcon size={16} />
                </a>
                <a href="https://instagram.com/thewebyatra" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 flex items-center justify-center text-stone-500 dark:text-stone-500 hover:text-warm-700 dark:hover:text-warm-400 hover:border-warm-400/50 transition-all">
                  <LinkedInIcon size={16} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: 3D */}
          <motion.div className="order-1 lg:order-2 h-[400px] sm:h-[480px] lg:h-[580px] relative"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}>
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-2 border-warm-400/30 border-t-warm-400 animate-spin" />
              </div>
            }>
              <HeroScene />
            </Suspense>

            {/* Floating: "WE CODE. YOU GROW." tagline */}
            <motion.div
              className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/85 dark:bg-dark-200/85 backdrop-blur-md border border-warm-400/30 rounded-full px-5 py-2 z-10 shadow-lg whitespace-nowrap"
              animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <span className="font-display font-bold text-sm tracking-[0.15em] uppercase gradient-text">
                We Code. You Grow.
              </span>
            </motion.div>

            {/* Floating: rating only */}
            <motion.div
              className="absolute bottom-16 right-2 sm:right-6 bg-white/90 dark:bg-dark-200/90 backdrop-blur-md border border-cream-400 dark:border-dark-50 rounded-xl px-4 py-3 z-10 shadow-lg"
              animate={{ y: [0, 8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" className="text-amber-500" />)}
              </div>
              <div className="font-display text-stone-900 dark:text-cream-200 text-lg font-bold">5.0</div>
              <div className="text-stone-500 dark:text-stone-500 text-[10px]">Client Rating</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}>
          <span className="text-stone-400 dark:text-stone-600 text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div className="w-px h-8 bg-gradient-to-b from-warm-400 to-transparent"
            animate={{ scaleY: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.div>
      </div>
    </section>
  );
}
