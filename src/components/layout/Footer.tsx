"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { LinkedInIcon, InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";

const company = [
  { href: "/about",   label: "About Us" },
  { href: "/work",    label: "Our Work" },
  { href: "/#quote",  label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

const services = [
  { href: "/#services", label: "Web Development" },
  { href: "/#services", label: "CRM Solutions" },
  { href: "/#services", label: "App Development" },
];

const legal = [
  { href: "/privacy",     label: "Privacy Policy" },
  { href: "/terms",       label: "Terms of Service" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

const socials = [
  { icon: LinkedInIcon,  href: "https://www.linkedin.com/in/thewebyatra/",  label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://www.instagram.com/thewebyatra/?hl=en", label: "Instagram" },
  { icon: FacebookIcon,  href: "https://www.facebook.com/profile.php?id=61593257650341", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="relative bg-warm-900 dark:bg-dark-500 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[160px] bg-warm-400/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main grid ── */}
        <div className="pt-10 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand — always full width on xs, half on sm */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <Image src="/logo.ico" alt="TheWebYatra" width={36} height={36} className="rounded-lg object-cover flex-shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-base text-white tracking-tight leading-none">TheWebYatra</span>
                <span className="text-[9px] font-semibold tracking-widest text-warm-400 uppercase">We Code. You Grow.</span>
              </div>
            </Link>

            {/* Contact info */}
            <div className="space-y-1.5 mb-4">
              <a href="mailto:support@thewebyatra.com"
                className="flex items-center gap-2 text-stone-400 hover:text-warm-400 text-xs transition-colors">
                <Mail size={12} className="text-warm-400 flex-shrink-0" />support@thewebyatra.com
              </a>
              <a href="tel:+918920291416"
                className="flex items-center gap-2 text-stone-400 hover:text-warm-400 text-xs transition-colors">
                <Phone size={12} className="text-warm-400 flex-shrink-0" />+91 89202 91416
              </a>
              <a 
                href="https://share.google/5RnnQtgqKIuvVWJN4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-stone-400 hover:text-warm-400 text-xs transition-colors"
              >
                <MapPin size={12} className="text-warm-400 flex-shrink-0 mt-0.5" />
                <span>A-665, Street No. 12, Near Raza Chowk,<br />Zakir Nagar, Delhi - 110025, India</span>
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-stone-400 hover:text-white hover:border-warm-400/50 transition-all">
                  <Icon size={13} />
                </a>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
              {/* MSME */}
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5 border border-white/10">
                <div className="bg-white rounded overflow-hidden flex-shrink-0">
                  <Image 
                    src="/MSME.png" 
                    alt="MSME Udyam" 
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">MSME Registered</p>
                  <p className="text-stone-400 text-[10px] leading-relaxed">UDYAM-DL-03-0086479</p>
                </div>
              </div>

              {/* ISO */}
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5 border border-white/10">
                <div className="bg-white rounded overflow-hidden flex-shrink-0">
                  <Image 
                    src="/ISO.webp" 
                    alt="ISO Certified" 
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">ISO Certified</p>
                  <p className="text-stone-400 text-[10px] leading-relaxed">Quality Assured</p>
                </div>
              </div>

              {/* Google QR Code */}
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5 border border-white/10">
                <div className="bg-white rounded overflow-hidden flex-shrink-0">
                  <Image 
                    src="/google-qr.jpeg" 
                    alt="Google Business QR Code" 
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Find Us on Google</p>
                  <p className="text-stone-400 text-[10px] leading-relaxed">Scan to Review</p>
                </div>
              </div>
            </div>
          </div>

          {/* Company + Services — side by side on mobile using nested grid */}
          <div className="sm:col-span-2 lg:col-span-2 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
              <ul className="space-y-2">
                {company.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-stone-400 hover:text-warm-400 text-sm transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Services</h4>
              <ul className="space-y-2">
                {services.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-stone-400 hover:text-warm-400 text-sm transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Short tagline / CTA on desktop */}
          <div className="hidden lg:flex flex-col justify-between">
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Start a Project</h4>
              <p className="text-stone-400 text-sm leading-relaxed mb-4">
                Ready to grow your business online? Let&apos;s build something great together.
              </p>
              <Link href="/#quote"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-warm-400 to-warm-700 hover:shadow-[0_4px_16px_rgba(196,150,106,0.35)] transition-all">
                Get a Quote →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-4 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-stone-500 text-xs text-center sm:text-left">
            © 2026 TheWebYatra. All rights reserved.
          </p>
          <div className="flex items-center flex-wrap justify-center gap-4">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-stone-500 hover:text-stone-300 text-xs transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
