"use client";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { XIcon, LinkedInIcon, InstagramIcon, GitHubIcon, YouTubeIcon } from "@/components/ui/SocialIcons";

const footerLinks = {
  company: [
    { href: "/about",    label: "About Us" },
    { href: "/work",     label: "Our Work" },
    { href: "/#quote",   label: "Get a Quote" },
    { href: "/contact",  label: "Contact" },
  ],
  services: [
    { href: "/services#web-design", label: "Web Design" },
    { href: "/services#web-development", label: "Development" },
    { href: "/services#ecommerce", label: "E-Commerce" },
    { href: "/services#seo", label: "SEO" },
    { href: "/services#branding", label: "Branding" },
    { href: "/services#app-dev", label: "App Development" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/sitemap.xml", label: "Sitemap" },
  ],
};

const socials = [
  { icon: XIcon, href: "https://twitter.com/inayatshaykh", label: "Twitter / X" },
  { icon: LinkedInIcon, href: "https://www.linkedin.com/in/inayatshaykh/", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://instagram.com/thewebyatra", label: "Instagram" },
  { icon: GitHubIcon, href: "https://github.com/inayatshaykh", label: "GitHub" },
  { icon: YouTubeIcon, href: "https://youtube.com/@thewebyatra", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-warm-900 dark:bg-dark-500 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-warm-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5 group w-fit">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-warm-400 to-warm-700 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">W</div>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                The<span className="text-warm-400">Web</span>Yatra
              </span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-xs">
              TheWebYatra is a premium web development agency. We build websites, apps and digital experiences that drive growth for businesses worldwide.
            </p>
            <div className="space-y-2.5 mb-6">
              <a href="mailto:mohammedinayat12@gmail.com" className="flex items-center gap-2 text-stone-400 hover:text-warm-400 text-sm transition-colors">
                <Mail size={14} className="text-warm-400" />mohammedinayat12@gmail.com
              </a>
              <a href="tel:+919999999999" className="flex items-center gap-2 text-stone-400 hover:text-warm-400 text-sm transition-colors">
                <Phone size={14} className="text-warm-400" />+91 99999 99999
              </a>
              <div className="flex items-center gap-2 text-stone-400 text-sm">
                <MapPin size={14} className="text-warm-400 flex-shrink-0" />Delhi, India · Remote Worldwide
              </div>
            </div>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-stone-400 hover:text-white hover:border-warm-400/50 hover:bg-warm-400/10 transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-stone-400 hover:text-warm-400 text-sm transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-stone-400 hover:text-warm-400 text-sm transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Newsletter</h4>
            <p className="text-stone-400 text-sm mb-4">Get digital tips from the Yatra team.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input type="email" placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-stone-600 focus:outline-none focus:border-warm-400/50 transition-colors" />
              <button type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-warm-400 to-warm-700 hover:shadow-[0_4px_16px_rgba(196,150,106,0.35)] transition-all">
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="py-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-sm">© 2025 TheWebYatra. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {footerLinks.legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-stone-500 hover:text-stone-300 text-xs transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
