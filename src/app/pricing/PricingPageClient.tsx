"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, X, Zap, ArrowRight } from "lucide-react";
import { pricingPlans } from "@/lib/data";
import CTABanner from "@/components/sections/CTABanner";

const usdEquiv: Record<string, string> = {
  "₹49,999": "~ $588 usd",
  "₹1,19,999": "~ $1,412 usd",
};

const featureComparison = [
  { feature: "Responsive Design",       starter: true,  growth: true,  enterprise: true },
  { feature: "Custom Domain Setup",     starter: true,  growth: true,  enterprise: true },
  { feature: "SSL Certificate",         starter: true,  growth: true,  enterprise: true },
  { feature: "Basic SEO",               starter: true,  growth: true,  enterprise: true },
  { feature: "Contact Form",            starter: true,  growth: true,  enterprise: true },
  { feature: "CMS Integration",         starter: false, growth: true,  enterprise: true },
  { feature: "Advanced SEO",            starter: false, growth: true,  enterprise: true },
  { feature: "E-Commerce Ready",        starter: false, growth: true,  enterprise: true },
  { feature: "Custom Animations",       starter: false, growth: true,  enterprise: true },
  { feature: "Analytics Dashboard",     starter: false, growth: true,  enterprise: true },
  { feature: "Mobile App",              starter: false, growth: false, enterprise: true },
  { feature: "Custom Integrations",     starter: false, growth: false, enterprise: true },
  { feature: "Dedicated PM",            starter: false, growth: false, enterprise: true },
  { feature: "SLA Guarantee",           starter: false, growth: false, enterprise: true },
  { feature: "Source Code Handover",    starter: true,  growth: true,  enterprise: true },
];

export default function PricingPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-cream-100 dark:bg-dark-400 overflow-hidden">
        <div className="absolute inset-0 animated-grid" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-warm-400 animate-pulse" /> Pricing
          </motion.div>
          <motion.h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-cream-100 mb-6"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </motion.h1>
          <motion.p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            No hidden fees. Prices in INR — affordable, honest, and result-focused.
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 bg-cream-50 dark:bg-dark-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
            {pricingPlans.map((plan, i) => (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className={`relative p-7 rounded-3xl border transition-all duration-300 ${
                  plan.highlighted
                    ? "border-warm-400/60 bg-gradient-to-b from-warm-400/8 to-white dark:to-dark-200 shadow-[0_8px_40px_rgba(196,150,106,0.18)]"
                    : "border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/40"
                }`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white shadow-md bg-gradient-to-r from-warm-400 to-warm-700">
                    <Zap size={11} fill="currentColor" /> Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-cream-200 mb-1">{plan.name}</h3>
                  <p className="text-stone-500 dark:text-stone-500 text-sm mb-5">{plan.description}</p>
                  {/* INR — big */}
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl font-bold text-stone-900 dark:text-cream-100">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-stone-400 dark:text-stone-600 text-sm">/ {plan.period}</span>
                    )}
                  </div>
                  {/* USD — small */}
                  {usdEquiv[plan.price] && (
                    <span className="text-stone-400 dark:text-stone-600 text-xs mt-1 block">{usdEquiv[plan.price]}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
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
                      ? "text-white bg-gradient-to-r from-warm-400 to-warm-700 hover:shadow-[0_6px_20px_rgba(196,150,106,0.35)]"
                      : "text-warm-800 dark:text-warm-400 border border-warm-400/40 bg-cream-100 dark:bg-dark-100 hover:border-warm-400/70 hover:bg-cream-300 dark:hover:bg-dark-50"
                  }`}>
                  {plan.cta} <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature comparison */}
      <section className="py-16 bg-cream-100 dark:bg-dark-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-cream-100 text-center mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Full Feature Comparison
          </motion.h2>
          <motion.div className="rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 overflow-hidden"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {/* Header */}
            <div className="grid grid-cols-4 p-4 border-b border-cream-400 dark:border-dark-50 bg-cream-100 dark:bg-dark-100">
              <div className="text-stone-600 dark:text-stone-400 text-sm font-medium">Feature</div>
              {pricingPlans.map((p) => (
                <div key={p.id} className={`text-center text-sm font-semibold ${p.highlighted ? "gradient-text" : "text-stone-800 dark:text-cream-200"}`}>
                  {p.name}
                </div>
              ))}
            </div>
            {featureComparison.map((row, i) => (
              <div key={row.feature}
                className={`grid grid-cols-4 p-4 border-b border-cream-400 dark:border-dark-50 last:border-0 ${i % 2 === 0 ? "" : "bg-cream-50 dark:bg-dark-100/50"}`}>
                <div className="text-stone-600 dark:text-stone-400 text-sm">{row.feature}</div>
                {[row.starter, row.growth, row.enterprise].map((val, j) => (
                  <div key={j} className="flex justify-center">
                    {val
                      ? <Check size={15} className={j === 1 ? "text-warm-500" : "text-warm-600 dark:text-warm-500"} />
                      : <X size={15} className="text-cream-500 dark:text-dark-50" />
                    }
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
