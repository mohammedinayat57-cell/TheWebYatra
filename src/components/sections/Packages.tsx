"use client";
import { motion } from "framer-motion";
import { Check, Zap, ArrowRight } from "lucide-react";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const packages = [
  {
    id: "business",
    name: "Business Website",
    priceINR: "₹18,000",
    priceUSD: "~ $212 USD",
    period: "onwards",
    desc: "Gyms, salons, clinics, agencies, shops, coaching — any service or local business.",
    features: [
      "Home, About, Services, Contact",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "WhatsApp / Contact Button",
      "Google Maps Integration",
      "Social Media Links",
      "SSL Certificate",
      "Source Code Handover",
    ],
    highlighted: false,
    cta: "Get a Quote",
  },
  {
    id: "ecommerce",
    name: "E-Commerce Store",
    priceINR: "₹30,000",
    priceUSD: "~ $353 USD",
    period: "onwards",
    desc: "Sell products online with cart, checkout and payment gateway integration.",
    features: [
      "Product Listing & Detail Pages",
      "Categories & Filters",
      "Cart & Checkout",
      "Payment Gateway Included",
      "Basic Order Management",
      "Mobile Responsive",
      "Basic SEO",
      "WhatsApp Contact Option",
      "Source Code Handover",
    ],
    highlighted: true,
    cta: "Get a Quote",
  },
  {
    id: "enterprise",
    name: "Custom Web Application",
    priceINR: "₹50,000",
    priceUSD: "~ $588 USD",
    period: "onwards",
    desc: "Dashboards, user logins, booking systems and custom business tools.",
    features: [
      "Custom Dashboard / Portal",
      "User Authentication & Roles",
      "Admin Panel",
      "Custom Workflows",
      "API Integrations",
      "Database Design",
      "Mobile Responsive",
      "12 Months Support Available",
      "Full Source Code",
    ],
    highlighted: false,
    cta: "Let's Talk",
  },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function Packages() {
  const scrollToQuote = () => {
    const el = document.getElementById("quote");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="packages" className="relative py-20 md:py-28 bg-cream-50 dark:bg-dark-300 overflow-hidden">
      <div className="absolute inset-0 animated-grid opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-warm-400/4 dark:bg-warm-400/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-5">
            <Zap size={13} /> Transparent Pricing
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-cream-100 mb-4 leading-tight">
            Common Packages,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-warm-500 via-warm-600 to-warm-800 dark:from-warm-400 dark:via-warm-500 dark:to-warm-600">
              Honest Prices
            </span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base md:text-lg max-w-2xl mx-auto">
            Affordable, transparent pricing for Indian businesses. All prices in INR — starting from, not fixed.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {packages.map((pkg, i) => (
            <motion.div key={pkg.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative flex flex-col p-7 rounded-3xl border transition-all duration-300 ${
                pkg.highlighted
                  ? "border-warm-400/60 bg-gradient-to-b from-warm-400/8 to-white dark:to-dark-200 shadow-[0_8px_40px_rgba(196,150,106,0.18)] dark:shadow-[0_8px_40px_rgba(196,150,106,0.10)]"
                  : "border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/40 hover:shadow-[0_8px_30px_rgba(196,150,106,0.08)]"
              }`}>

              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white shadow-md bg-gradient-to-r from-warm-400 to-warm-700">
                  <Zap size={11} fill="currentColor" /> Most Popular
                </div>
              )}

              {/* Name + desc */}
              <div className="mb-6">
                <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-cream-200 mb-1">{pkg.name}</h3>
                <p className="text-stone-500 dark:text-stone-500 text-sm mb-5">{pkg.desc}</p>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold text-stone-900 dark:text-cream-100">{pkg.priceINR}</span>
                  {pkg.priceINR !== "Custom" && (
                    <span className="text-stone-400 dark:text-stone-600 text-sm">/ {pkg.period}</span>
                  )}
                </div>
                {pkg.priceUSD && (
                  <span className="text-stone-400 dark:text-stone-600 text-xs mt-1 block">{pkg.priceUSD}</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check size={14} className={`flex-shrink-0 mt-0.5 ${pkg.highlighted ? "text-warm-500" : "text-warm-600 dark:text-warm-500"}`} />
                    <span className="text-stone-600 dark:text-stone-400">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToQuote}
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                  pkg.highlighted
                    ? "text-white bg-gradient-to-r from-warm-400 to-warm-700 hover:shadow-[0_6px_20px_rgba(196,150,106,0.40)]"
                    : "text-warm-800 dark:text-warm-400 border border-warm-400/40 bg-cream-100 dark:bg-dark-100 hover:border-warm-400/70 hover:bg-cream-300 dark:hover:bg-dark-50"
                }`}>
                {pkg.id === "enterprise" ? "Let's Talk" : "Get a Quote"} <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p className="text-center text-stone-500 dark:text-stone-600 text-sm mt-8"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
          All prices in INR. Need something in between?{" "}
          <button onClick={scrollToQuote}
            className="text-warm-600 dark:text-warm-400 hover:text-warm-800 dark:hover:text-warm-300 underline underline-offset-2">
            Use the custom quote builder →
          </button>
        </motion.p>
      </div>
    </section>
  );
}
