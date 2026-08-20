"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "@/components/ui/Section";

export default function Services() {
  const whatsappNumber = "918920291416";
  const whatsappURL = (service: string) => 
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I'm interested in ${service}.`)}`;

  return (
    <section id="services" className="relative py-20 md:py-28 bg-cream-100 dark:bg-dark-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="What We Do"
          title="Services Built for"
          highlight="Your Growth"
          description="End-to-end digital solutions tailored to your business goals."
          centered={true}
        />

        {/* Grid layout for 3 services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-12">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/50 hover:shadow-[0_8px_32px_rgba(196,150,106,0.12)] dark:hover:shadow-[0_8px_32px_rgba(196,150,106,0.08)] transition-all duration-300"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 text-xl bg-gradient-to-br ${service.color} shadow-md text-white flex-shrink-0`}>
                {service.icon}
              </div>

              <h3 className="font-display text-base font-semibold text-stone-900 dark:text-cream-200 mb-2 group-hover:text-warm-700 dark:group-hover:text-warm-400 transition-colors">
                {service.title}
              </h3>

              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              <ul className="space-y-1.5 mb-5">
                {service.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-500">
                    <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color} flex-shrink-0`} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={whatsappURL(service.title)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-sm font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:gap-2.5 transition-all`}
              >
                Contact <ArrowRight size={13} className="opacity-70" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
