"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  glow = false,
  hover = true,
  padding = "md",
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <motion.div
      className={`
        relative rounded-2xl border border-white/10 bg-[#0F0F1A]
        ${paddingClasses[padding]}
        ${hover ? "transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]" : ""}
        ${glow ? "shadow-[0_0_30px_rgba(99,102,241,0.1)]" : ""}
        ${className}
      `}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
