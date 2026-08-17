"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative py-20 md:py-28 bg-cream-100 dark:bg-dark-400 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center border border-warm-400/25 dark:border-warm-400/15 bg-gradient-to-br from-cream-300 dark:from-dark-100 via-white dark:via-dark-200 to-cream-200 dark:to-dark-100 shadow-[0_8px_48px_rgba(196,150,106,0.10)] dark:shadow-[0_8px_48px_rgba(196,150,106,0.06)]">
          {/* blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-warm-400/10 dark:bg-warm-400/6 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-warm-400/8 dark:bg-warm-400/4 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 animated-grid opacity-30" />

          <div className="relative z-10">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-[0_4px_20px_rgba(196,150,106,0.35)] bg-gradient-to-br from-warm-400 to-warm-700">
              <Rocket size={28} className="text-white" />
            </motion.div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-cream-100 mb-4 leading-tight">
              Ready to Begin Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-warm-500 via-warm-600 to-warm-800 dark:from-warm-400 dark:via-warm-500 dark:to-warm-600">
                Digital Yatra?
              </span>
            </h2>

            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Free discovery call with Mohd Inayat. Tell us your vision and we&apos;ll map the perfect journey — no commitment required.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-base bg-gradient-to-r from-warm-400 to-warm-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(196,150,106,0.40)]">
                Start Your Yatra <ArrowRight size={16} />
              </Link>
              <Link href="/work"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-warm-800 dark:text-warm-400 text-base border border-warm-400/40 bg-white/70 dark:bg-dark-200/70 hover:border-warm-400/70 hover:bg-white dark:hover:bg-dark-200 transition-all">
                See Our Work
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-stone-500 dark:text-stone-600">
              {["✓ Free discovery call", "✓ No long-term contracts", "✓ Money-back guarantee", "✓ Fast delivery"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
