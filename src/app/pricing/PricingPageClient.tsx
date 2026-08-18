"use client";
import BackButton from "@/components/ui/BackButton";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function PricingPageClient() {
  return (
    <section className="min-h-screen bg-cream-100 dark:bg-dark-400 flex items-center justify-center px-4 pt-24">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center">
        <div className="flex justify-start mb-4"><BackButton label="Back to Home" /></div>
        <div className="text-6xl mb-6">💬</div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-stone-900 dark:text-cream-100 mb-4">
          Pricing is on the <span className="gradient-text">Homepage</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg mb-8 leading-relaxed">
          I&apos;ve moved all packages and pricing into the Get a Quote section — pick a plan and send your request directly via WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#quote"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-base transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(37,211,102,0.35)]"
            style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
            <MessageCircle size={16} /> Get a Quote
          </Link>
          <Link href="/"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-warm-800 dark:text-warm-400 border border-warm-400/40 bg-white dark:bg-dark-200 hover:bg-cream-200 dark:hover:bg-dark-100 transition-all">
            <ArrowRight size={16} /> Back to Home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
