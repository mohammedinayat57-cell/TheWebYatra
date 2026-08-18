"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "@/components/ui/Section";

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  };

  return (
    <section id="services" className="relative py-20 md:py-28 bg-cream-100 dark:bg-dark-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <SectionHeading
            badge="What We Do"
            title="Services Built for"
            highlight="Your Growth"
            description="End-to-end digital solutions tailored to your business goals."
            centered={false}
            className="mb-0"
          />
          {/* Arrow controls — visible on md+ */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0 ml-6">
            <button onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 flex items-center justify-center text-stone-500 dark:text-stone-400 hover:border-warm-400/50 hover:text-warm-700 dark:hover:text-warm-400 transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 flex items-center justify-center text-stone-500 dark:text-stone-400 hover:border-warm-400/50 hover:text-warm-700 dark:hover:text-warm-400 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div className="relative">
          {/* Left fade */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-cream-100 dark:from-dark-400 to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-cream-100 dark:from-dark-400 to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative flex-shrink-0 w-[290px] sm:w-[310px] p-6 rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/50 hover:shadow-[0_8px_32px_rgba(196,150,106,0.12)] dark:hover:shadow-[0_8px_32px_rgba(196,150,106,0.08)] transition-all duration-300"
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

                <div className={`inline-flex items-center gap-1.5 text-sm font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:gap-2.5 transition-all`}>
                  Learn More <ArrowRight size={13} className="opacity-70" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View all — centered below */}
        <motion.div className="mt-8 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <Link href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-warm-800 dark:text-warm-400 text-sm border border-warm-400/40 bg-white dark:bg-dark-200 hover:border-warm-400/70 hover:bg-cream-300 dark:hover:bg-dark-100 transition-all">
            View All Services <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
