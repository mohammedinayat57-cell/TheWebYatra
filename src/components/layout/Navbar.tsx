"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/",         label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/work",     label: "Work" },
  { href: "/#tech",    label: "Technologies" },
  { href: "/about",    label: "About Us" },
  { href: "/#quote",   label: "Pricing" },
  { href: "/contact",  label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream-100/90 dark:bg-dark-300/90 backdrop-blur-xl border-b border-cream-400 dark:border-dark-50 shadow-sm"
            : "bg-transparent"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo.ico"
              alt="TheWebYatra Logo"
              width={40}
              height={40}
              className="rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-lg tracking-tight text-stone-900 dark:text-cream-100 leading-none">
                TheWebYatra
              </span>
              <span className="text-[9px] font-semibold tracking-[0.12em] text-warm-600 dark:text-warm-400 uppercase">
                We Code. You Grow.
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      active
                        ? "text-warm-700 dark:text-warm-400"
                        : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-cream-200 hover:bg-cream-200 dark:hover:bg-dark-100"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg bg-cream-300 dark:bg-dark-100"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/#quote"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-warm-400 to-warm-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(196,150,106,0.4)]"
            >
              Get a Quote
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-cream-200 dark:hover:bg-dark-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-stone-900/30 dark:bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute top-16 left-4 right-4 rounded-2xl p-6 shadow-2xl bg-cream-50 dark:bg-dark-200 border border-cream-400 dark:border-dark-50"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ul className="flex flex-col gap-1 mb-6">
                {navLinks.map((link, i) => (
                  <motion.li key={link.href}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        pathname === link.href
                          ? "text-warm-700 dark:text-warm-400 bg-cream-300 dark:bg-dark-100"
                          : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-cream-200 hover:bg-cream-200 dark:hover:bg-dark-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/#quote"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-warm-400 to-warm-700"
              >
                Get a Quote
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
