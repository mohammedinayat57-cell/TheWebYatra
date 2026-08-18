"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/lib/data";
import CTABanner from "@/components/sections/CTABanner";
import BackButton from "@/components/ui/BackButton";

export default function ServicesPageClient() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-cream-100 dark:bg-dark-400 overflow-hidden">
        <div className="absolute inset-0 animated-grid" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton label="Back to Home" />
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-warm-400 animate-pulse" /> Our Services
            </motion.div>
            <motion.h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-cream-100 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              Everything You Need to <span className="gradient-text">Win Online</span>
            </motion.h1>
            <motion.p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              From strategy to execution — end-to-end digital solutions to grow your business at every stage.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream-50 dark:bg-dark-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {services.map((service, i) => (
            <motion.div key={service.id} id={service.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative p-8 md:p-10 rounded-3xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/50 hover:shadow-[0_8px_40px_rgba(196,150,106,0.09)] transition-all duration-300">
              <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-8 items-start">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${service.color} shadow-md text-white flex-shrink-0`}>
                  {service.icon}
                </div>
                <div>
                  <h2 className={`font-display text-2xl font-bold mb-2 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                    {service.title}
                  </h2>
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-5 md:max-w-xl">{service.description}</p>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-500">
                        <Check size={13} className="text-warm-500 dark:text-warm-400 flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Link href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-warm-400 to-warm-700 whitespace-nowrap hover:shadow-[0_4px_16px_rgba(196,150,106,0.35)] transition-all">
                    Get Started <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-cream-100 dark:bg-dark-400 border-y border-cream-400 dark:border-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "6+", label: "Live Projects" },
              { value: "3+", label: "Internships" },
              { value: "4+", label: "Tech Stacks" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-stone-500 dark:text-stone-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
