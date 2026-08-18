"use client";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { XIcon, LinkedInIcon, InstagramIcon, GitHubIcon, YouTubeIcon } from "@/components/ui/SocialIcons";

const footerLinks = {
  company: [
    { href: "/about",   label: "About Us" },
    { href: "/work",    label: "Our Work" },
    { href: "/#quote",  label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services#web-design",       label: "Web Design" },
    { href: "/services#web-development",  label: "Development" },
    { href: "/services#ecommerce",        label: "E-Commerce" },
    { href: "/services#seo",             label: "SEO" },
    { href: "/services#branding",        label: "Branding" },
    { href: "/services#app-dev",         label: "App Development" },
  ],
  legal: [
    { href: "/privacy",    label: "Privacy Policy" },
    { href: "/terms",      label: "Terms of Service" },
    { href: "/sitemap.xml",label: "Sitemap" },
  ],
};

const socials = [
  { icon: XIcon,        href: "https://twitter.com/thewebyatra",              label: "Twitter / X" },
  { icon: LinkedInIcon, href: "https://www.linkedin.com/in/inayatshaykh/",   label: "LinkedIn" },
  { icon: InstagramIcon,href: "https://instagram.com/thewebyatra",           label: "Instagram" },
  { icon: GitHubIcon,   href: "https://github.com/inayatshaykh",             label: "GitHub" },
  { icon: YouTubeIcon,  href: "https://youtube.com/@thewebyatra",            label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-warm-900 dark:bg-dark-500 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-warm-400/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top section — stacked on mobile, grid on md+ ── */}
        <div className="pt-12 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand — full width on mobile */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <img src="/logo.ico" alt="TheWebYatra Logo" className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-lg text-white tracking-tight leading-none">TheWebYatra</span>
                <span className="text-[9px] font-semibold tracking-widest text-warm-400 uppercase">We Code. You Grow.</span>
              </div>
            </Link>

            <p className="text-stone-400 text-sm leading-relaxed mb-5 max-w-xs">
              TheWebYatra is a premium web development agency. We build websites, apps and digital experiences that drive growth for businesses worldwide.
            </p>

            {/* Contact — compact on mobile */}
            <div className="space-y-2 mb-5">
              <a href="mailto:support@thewebyatra.com"
                className="flex items-center gap-2 text-stone-400 hover:text-warm-400 text-sm transition-colors">
                <Mail size={13} className="text-warm-400 flex-shrink-0" />
                support@thewebyatra.com
              </a>
              <a href="tel:+918920291416"
                className="flex items-center gap-2 text-stone-400 hover:text-warm-400 text-sm transition-colors">
                <Phone size={13} className="text-warm-400 flex-shrink-0" />
                +91 89202 91416
              </a>
              <div className="flex items-center gap-2 text-stone-400 text-sm">
                <MapPin size={13} className="text-warm-400 flex-shrink-0" />
                Delhi, India · Remote Worldwide
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-stone-400 hover:text-white hover:border-warm-400/50 hover:bg-warm-400/10 transition-all duration-200">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-stone-400 hover:text-warm-400 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-stone-400 hover:text-warm-400 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Newsletter</h4>
            <p className="text-stone-400 text-sm mb-3">Get digital tips from our team.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input type="email" placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-stone-600 focus:outline-none focus:border-warm-400/50 transition-colors" />
              <button type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-warm-400 to-warm-700 hover:shadow-[0_4px_16px_rgba(196,150,106,0.35)] transition-all">
                Subscribe <ArrowRight size={13} />
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-5 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-stone-500 text-xs text-center sm:text-left">
            © 2026 TheWebYatra. All rights reserved.
          </p>
          <div className="flex items-center flex-wrap justify-center gap-4">
            {footerLinks.legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-stone-500 hover:text-stone-300 text-xs transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
