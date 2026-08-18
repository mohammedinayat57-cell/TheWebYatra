"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap, ArrowRight } from "lucide-react";
import { pricingPlans } from "@/lib/data";
import { SectionHeading } from "@/components/ui/Section";

const usdEquiv: Record<string, string> = {
  "₹49,999": "~ $588 usd",
  "₹1,19,999": "~ $1,412 usd",
};

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 md:py-28 bg-cream-50 dark:bg-dark-300 overflow-hidden">
      <div className="absolute inset-0 animated-grid opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-warm-400/4 dark:bg-warm-400/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Pricing" title="Transparent Pricing," highlight="No Surprises"
          description="Clear, straightforward pricing in INR. Every yatra starts with the right package." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {pricingPlans.map((plan, i) => (
            <motion.div key={plan.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative p-7 rounded-3xl border transition-all duration-300 ${
                plan.highlighted
                  ? "border-warm-400/60 bg-gradient-to-b from-warm-400/8 to-white dark:to-dark-200 shadow-[0_8px_40px_rgba(196,150,106,0.18)] dark:shadow-[0_8px_40px_rgba(196,150,106,0.10)]"
                  : "border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/40 hover:shadow-[0_8px_30px_rgba(196,150,106,0.08)]"
              }`}>
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white shadow-md bg-gradient-to-r from-warm-400 to-warm-700">
                  <Zap size={11} fill="currentColor" /> Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-cream-200 mb-1">{plan.name}</h3>
                <p className="text-stone-500 dark:text-stone-500 text-sm mb-5">{plan.description}</p>
                {/* INR price — big */}
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold text-stone-900 dark:text-cream-100">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-stone-400 dark:text-stone-600 text-sm">/ {plan.period}</span>
                  )}
                </div>
                {/* USD equivalent — small below */}
                {usdEquiv[plan.price] && (
                  <span className="text-stone-400 dark:text-stone-600 text-xs mt-1 block font-normal">
                    {usdEquiv[plan.price]}
                  </span>
                )}
              </div>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check size={14} className={`flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-warm-500" : "text-warm-600 dark:text-warm-500"}`} />
                    <span className="text-stone-600 dark:text-stone-400">{f}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact"
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? "text-white bg-gradient-to-r from-warm-400 to-warm-700 hover:shadow-[0_6px_20px_rgba(196,150,106,0.40)]"
                    : "text-warm-800 dark:text-warm-400 border border-warm-400/40 bg-cream-100 dark:bg-dark-100 hover:border-warm-400/70 hover:bg-cream-300 dark:hover:bg-dark-50"
                }`}>
                {plan.cta} <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p className="text-center text-stone-500 dark:text-stone-600 text-sm mt-8"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
          All prices in INR incl. taxes. Custom solutions available.{" "}
          <Link href="/contact" className="text-warm-600 dark:text-warm-400 hover:text-warm-800 dark:hover:text-warm-300 underline underline-offset-2">
            Get a custom quote
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
