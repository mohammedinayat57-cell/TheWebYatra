"use client";
import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  noPadding?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, id, className = "", noPadding = false }) => (
  <section id={id} className={`relative overflow-hidden ${noPadding ? "" : "py-16 md:py-24"} ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge, title, highlight, description, centered = true, className = "",
}) => (
  <motion.div
    className={`${centered ? "text-center" : ""} mb-12 md:mb-16 ${className}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
  >
    {badge && (
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-warm-400 animate-pulse" />
        {badge}
      </div>
    )}
    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-cream-100 mb-4 leading-tight">
      {title}{" "}
      {highlight && <span className="gradient-text">{highlight}</span>}
    </h2>
    {description && (
      <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    )}
  </motion.div>
);

export default Section;
