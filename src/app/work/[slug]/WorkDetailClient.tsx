"use client";
import BackButton from "@/components/ui/BackButton";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Tag, MessageCircle } from "lucide-react";
import type { Project } from "@/types";
import { projects } from "@/lib/data";

const gradients = [
  "from-blue-100 to-indigo-100 dark:from-blue-950/70 dark:to-indigo-950/70",
  "from-rose-100 to-pink-100 dark:from-rose-950/70 dark:to-pink-950/70",
  "from-amber-100 to-orange-100 dark:from-amber-950/70 dark:to-orange-950/70",
  "from-violet-100 to-purple-100 dark:from-violet-950/70 dark:to-purple-950/70",
  "from-yellow-100 to-amber-100 dark:from-yellow-950/70 dark:to-amber-950/70",
  "from-emerald-100 to-teal-100 dark:from-emerald-950/70 dark:to-teal-950/70",
];
const emojis = ["🕌", "🖨️", "🍛", "✈️", "🤝", "🚕"];

const caseStudyDetails: Record<string, { challenge: string; solution: string; results: string[] }> = {
  almishk: {
    challenge: "Al Mishk needed a complete e-commerce platform for premium attars and perfumes — with a rich catalogue, combo deals, custom discovery sets, and seamless WhatsApp ordering integration.",
    solution: "Built a full MERN stack e-commerce platform with product catalogue, cart, wishlist, order tracking, combo deals, WhatsApp ordering API, and prepaid discount system. Live at almishk.in.",
    results: ["Live at almishk.in", "Full cart + wishlist system", "WhatsApp order integration", "Custom discovery sets"],
  },
  nasskhub: {
    challenge: "Nassk Hub needed an e-commerce platform for custom printing & branded merchandise — business cards, banners, gift items, and packaging with product customization.",
    solution: "Built a React + Node.js e-commerce platform with product customization flow, category browsing, cart, and order management. Deployed on Vercel.",
    results: ["Live at nasskhub.vercel.app", "Product customization engine", "Full cart & order system", "Multiple product categories"],
  },
  panchaiyat: {
    challenge: "Panchaiyat Cafe needed a bold website for their Delhi-based cloud kitchen — showcasing momos, burgers, pizza, and shakes with Zomato integration.",
    solution: "Built a full-stack site with tabbed menu system, add-to-cart, Zomato order integration, Instagram feed section, and a striking late-night brand identity. Live at panchaiyatcafe.in.",
    results: ["Live at panchaiyatcafe.in", "Tabbed menu system", "Zomato order integration", "Bold brand identity"],
  },
  globetrotter: {
    challenge: "Globe Trotter needed a travel agency site showcasing international tours — Bali, Switzerland, Greece, Dubai, Japan — with WhatsApp booking and customer testimonials.",
    solution: "Designed and built a React + Vite site with destination cards, package pricing, WhatsApp booking integration, and a testimonials carousel. Fully responsive.",
    results: ["Live at globe-trotter-ui.vercel.app", "7+ destination packages", "WhatsApp booking flow", "Customer testimonials section"],
  },
  b2bmarketplace: {
    challenge: "A B2B marketplace connecting global buyers and sellers needed a verified listing platform with subscription gating and secure authentication.",
    solution: "Built with React, Node.js, MongoDB. Features business verification flow (Register → Verify → Trade), subscription-gated listings, category browsing, and JWT auth.",
    results: ["Live at marketplace-d5rm.vercel.app", "Business verification flow", "Subscription-gated listings", "Secure JWT auth"],
  },
  driveyouu: {
    challenge: "DriveYouu needed an on-demand cab booking web app with ride scheduling, driver-passenger matching, and location-based services.",
    solution: "Built with React, Node.js, Maps API. Includes ride scheduling, real-time driver-passenger matching, and location-based pickup/drop — deployed on Vercel.",
    results: ["Live at driveyouu.vercel.app", "Real-time ride matching", "Maps API integration", "Ride scheduling system"],
  },
};

interface Props { project: Project }

export default function WorkDetailClient({ project }: Props) {
  const idx = projects.findIndex((p) => p.id === project.id);
  const details = caseStudyDetails[project.id];
  const nextProject = projects[(idx + 1) % projects.length];

  return (
    <>
      {/* Hero */}
      <section className={`relative pt-32 pb-0 bg-gradient-to-br ${gradients[idx % gradients.length]} overflow-hidden`}>
        <div className="absolute inset-0 animated-grid opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <BackButton label="Back to Work" />
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border border-cream-400 dark:border-dark-50 bg-white/80 dark:bg-dark-200/80 text-stone-600 dark:text-stone-400">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-cream-100 mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              {project.description}
            </p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-warm-600 dark:text-warm-400 text-sm font-medium hover:text-warm-800 dark:hover:text-warm-300 transition-colors underline underline-offset-2">
                View Live Site → {project.link}
              </a>
            )}
          </motion.div>

          {/* Hero visual */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="relative h-56 md:h-72 rounded-t-2xl border border-cream-400 dark:border-dark-50 overflow-hidden mt-8 flex items-center justify-center bg-white/60 dark:bg-dark-200/80">
            <div className="text-7xl">{emojis[idx % emojis.length]}</div>
          </motion.div>
        </div>
      </section>

      {/* Case study body */}
      <section className="py-16 bg-cream-50 dark:bg-dark-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Main */}
            <div className="space-y-10">
              {details && (
                <>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-200 dark:border-red-800/40 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-xs font-semibold mb-4 uppercase tracking-wider">
                      The Challenge
                    </div>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{details.challenge}</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-4 uppercase tracking-wider">
                      Our Solution
                    </div>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{details.solution}</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4 uppercase tracking-wider">
                      Results
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {details.results.map((r) => (
                        <div key={r}
                          className="flex items-start gap-3 p-4 rounded-xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          </div>
                          <span className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">{r}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 p-6">
                <h3 className="font-display text-base font-semibold text-stone-900 dark:text-cream-100 mb-4">Project Info</h3>
                <div className="space-y-3">
                  {[
                    { label: "Category", value: project.category },
                    { label: "Tech Stack", value: project.tags.join(", ") },
                    { label: "Status", value: "Live" },
                  ].map(({ label, value }) => (
                    <div key={label} className="border-b border-cream-400 dark:border-dark-50 pb-3 last:border-0 last:pb-0">
                      <div className="text-stone-400 dark:text-stone-600 text-xs mb-0.5">{label}</div>
                      <div className="text-stone-800 dark:text-cream-200 text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/#quote"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-white text-sm transition-all hover:shadow-[0_4px_20px_rgba(37,211,102,0.30)]"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                <MessageCircle size={14} /> Get a Quote <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Next project */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-cream-400 dark:border-dark-50">
            <p className="text-stone-400 dark:text-stone-600 text-sm mb-4">Next Project</p>
            <Link href={`/work/${nextProject.id}`}
              className="group flex items-center justify-between p-6 rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/50 transition-all">
              <div>
                <h3 className="font-display text-xl font-semibold text-stone-900 dark:text-cream-100 group-hover:text-warm-700 dark:group-hover:text-warm-400 transition-colors">
                  {nextProject.title}
                </h3>
                <p className="text-stone-500 dark:text-stone-500 text-sm mt-1">{nextProject.category}</p>
              </div>
              <ArrowRight size={20} className="text-stone-400 dark:text-stone-600 group-hover:text-warm-500 dark:group-hover:text-warm-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
