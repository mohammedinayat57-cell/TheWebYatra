"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "@/components/ui/Section";

export default function Services() {
  return (
    <section id="services" className="relative py-20 md:py-28 bg-cream-100 dark:bg-dark-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="What We Do" title="Services Built for" highlight="Your Growth"
          description="From concept to launch and beyond — end-to-end digital solutions tailored to your goals." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div key={service.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/50 hover:shadow-[0_8px_32px_rgba(196,150,106,0.12)] dark:hover:shadow-[0_8px_32px_rgba(196,150,106,0.08)] transition-all duration-300">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 text-xl bg-gradient-to-br ${service.color} shadow-md text-white`}>
                {service.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-cream-200 mb-2 group-hover:text-warm-700 dark:group-hover:text-warm-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">{service.description}</p>
              <ul className="space-y-1.5 mb-4">
                {service.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-500">
                    <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className={`inline-flex items-center gap-1.5 text-sm font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:gap-2.5 transition-all`}>
                Learn More <ArrowRight size={13} className="opacity-70" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-12 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
          <Link href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-warm-800 dark:text-warm-400 text-sm border border-warm-400/40 bg-white dark:bg-dark-200 hover:border-warm-400/70 hover:bg-cream-300 dark:hover:bg-dark-100 transition-all">
            View All Services <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
