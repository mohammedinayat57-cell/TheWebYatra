"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/lib/data";
import { SectionHeading } from "@/components/ui/Section";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineW = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  const lineH = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="relative py-20 md:py-28 bg-cream-100 dark:bg-dark-400 overflow-hidden">
      <div className="absolute inset-0 animated-grid opacity-60" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Our Journey Together" title="How We Build Your" highlight="Digital Experience"
          description="A proven 5-step process — every project delivered on time, on brief, and beyond expectations." />

        {/* Desktop */}
        <div className="hidden lg:block mt-16">
          <div className="relative">
            <div className="absolute top-10 left-[10%] right-[10%] h-px bg-cream-400 dark:bg-dark-50">
              <motion.div className="h-full bg-gradient-to-r from-warm-400 to-warm-700" style={{ width: lineW }} />
            </div>
            <div className="grid grid-cols-5 gap-4">
              {processSteps.map((step, i) => (
                <motion.div key={step.id}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center group">
                  <div className="relative mb-6 z-10">
                    <div className="w-20 h-20 rounded-full border-2 border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 flex items-center justify-center text-3xl group-hover:border-warm-400/60 group-hover:shadow-[0_0_20px_rgba(196,150,106,0.18)] transition-all duration-300">
                      {step.icon}
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-warm-400 to-warm-700 flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-stone-900 dark:text-cream-200 text-base mb-2 group-hover:text-warm-700 dark:group-hover:text-warm-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-stone-500 dark:text-stone-500 text-xs leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden mt-8">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-cream-400 dark:bg-dark-50">
              <motion.div className="w-full bg-gradient-to-b from-warm-400 to-warm-700" style={{ height: lineH }} />
            </div>
            <div className="space-y-8">
              {processSteps.map((step, i) => (
                <motion.div key={step.id}
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex gap-6 pl-4">
                  <div className="relative z-10 flex-shrink-0 w-9 h-9 rounded-full border-2 border-warm-400/50 bg-white dark:bg-dark-200 flex items-center justify-center text-lg">
                    {step.icon}
                  </div>
                  <div className="pb-2">
                    <div className="text-warm-600 dark:text-warm-400 text-xs font-semibold mb-1">Step {step.step}</div>
                    <h3 className="font-display font-semibold text-stone-900 dark:text-cream-200 text-base mb-1">{step.title}</h3>
                    <p className="text-stone-500 dark:text-stone-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
