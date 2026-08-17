"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  external?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  external = false,
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 rounded-full font-semibold
    transition-all duration-300 cursor-pointer select-none
    ${sizeClasses[size]}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

  const variantClasses = {
    primary: `
      text-white
      bg-gradient-to-r from-blue-500 to-purple-600
      shadow-[0_0_20px_rgba(99,102,241,0.3)]
      hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]
      hover:-translate-y-0.5
    `,
    secondary: `
      text-white border border-white/20 bg-white/5 backdrop-blur-sm
      hover:border-purple-400/50 hover:bg-white/10
    `,
    ghost: `
      text-slate-300 hover:text-white hover:bg-white/5
    `,
  };

  const classes = `${baseClasses} ${variantClasses[variant]}`;

  const MotionTag = motion.button;

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className="inline-block"
      >
        <Link
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <MotionTag
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </MotionTag>
  );
};

export default Button;
