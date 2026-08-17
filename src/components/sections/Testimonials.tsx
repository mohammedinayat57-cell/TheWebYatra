"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/ui/Section";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const t = setInterval(() => { setDirection(1); setCurrent((p) => (p + 1) % testimonials.length); }, 5500);
    return () => clearInterval(t);
  }, []);

  const prev = () => { setDirection(-1); setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setDirection(1); setCurrent((p) => (p + 1) % testimonials.length); };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -60 }),
  };

  const t = testimonials[current];

  return (
    <section className="relative py-20 md:py-28 bg-cream-100 dark:bg-dark-400">
      <div className="absolute inset-0 animated-grid opacity-50" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Testimonials" title="What Our Clients" highlight="Say About Us"
          description="Don't take our word for it. Here's what people say about their journey with TheWebYatra." />

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={current} custom={direction} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative p-8 md:p-10 rounded-3xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 shadow-sm dark:shadow-none">
              <div className="absolute top-8 right-8 text-warm-400/20 dark:text-warm-400/10">
                <Quote size={48} />
              </div>
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" className="text-amber-500" />
                ))}
              </div>
              <blockquote className="text-stone-700 dark:text-stone-300 text-lg md:text-xl leading-relaxed mb-8 font-light">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-warm-400 to-warm-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-stone-900 dark:text-cream-200">{t.name}</div>
                  <div className="text-stone-500 dark:text-stone-500 text-sm">{t.role} @ {t.company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-gradient-to-r from-warm-400 to-warm-700" : "w-1.5 bg-cream-400 dark:bg-dark-50 hover:bg-warm-400/40"
                  }`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 flex items-center justify-center text-stone-500 dark:text-stone-500 hover:text-warm-700 dark:hover:text-warm-400 hover:border-warm-400/50 transition-all">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} className="w-10 h-10 rounded-full border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 flex items-center justify-center text-stone-500 dark:text-stone-500 hover:text-warm-700 dark:hover:text-warm-400 hover:border-warm-400/50 transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
