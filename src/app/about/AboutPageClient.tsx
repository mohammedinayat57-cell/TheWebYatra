"use client";
import BackButton from "@/components/ui/BackButton";
import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import { XIcon, LinkedInIcon, GitHubIcon } from "@/components/ui/SocialIcons";
import { teamMembers } from "@/lib/data";
import CTABanner from "@/components/sections/CTABanner";
import { SectionHeading } from "@/components/ui/Section";

const values = [
  { icon: Target, title: "Mission-Driven", description: "Every project aligns with our mission: help businesses grow through thoughtful digital strategy and exceptional execution." },
  { icon: Eye, title: "Detail-Obsessed", description: "From pixel-perfect design to clean code — we sweat the small stuff so your product is polished from every angle." },
  { icon: Heart, title: "Partner Mindset", description: "We invest in your success like a true partner. We don't just deliver a website and disappear — we celebrate your wins." },
];

export default function AboutPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-cream-100 dark:bg-dark-400 overflow-hidden">
        <div className="absolute inset-0 animated-grid" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-start mb-4"><BackButton label="Back to Home" /></div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-warm-400 animate-pulse" /> Our Story
          </motion.div>
          <motion.h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-cream-100 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            About <span className="gradient-text">TheWebYatra</span>
          </motion.h1>
          <motion.p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Premium web development agency based in Delhi, India. We build websites, apps and digital experiences that grow businesses.
          </motion.p>
        </div>
      </section>

      {/* Why Yatra */}
      <section className="py-20 bg-cream-50 dark:bg-dark-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-5">
                Why &ldquo;Yatra&rdquo;?
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 dark:text-cream-100 mb-5 leading-tight">
                A Journey, Not Just a Destination
              </h2>
              <div className="space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed text-base">
                <p>In Sanskrit, <em className="text-stone-900 dark:text-cream-200 font-medium">&ldquo;Yatra&rdquo;</em> means journey — a pilgrimage toward something meaningful. Building a digital presence is a continuous, evolving journey.</p>
                <p>From the first wireframe to launch and beyond — we walk every step of that journey with you as your development partner and guide.</p>
                <p>Founded by a team of passionate developers and designers committed to delivering premium digital experiences. Built live products used by real customers: Al Mishk, Panchaiyat Cafe, Globe Trotter, and more.</p>
              </div>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {[
                { value: "6+", label: "Live Projects", icon: "🚀" },
                { value: "50+", label: "Client Projects", icon: "💼" },
                { value: "4+", label: "Tech Stacks", icon: "⚡" },
                { value: "Delhi", label: "India-based", icon: "📍" },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/40 transition-all">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="font-display text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-stone-500 dark:text-stone-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream-100 dark:bg-dark-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Values" title="What Drives" highlight="Our Journey" />
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <motion.div key={val.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-7 rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/40 hover:shadow-sm transition-all group">
                <div className="w-12 h-12 rounded-xl border border-cream-400 dark:border-dark-50 bg-cream-100 dark:bg-dark-100 flex items-center justify-center mb-4 group-hover:border-warm-400/40 transition-all">
                  <val.icon size={22} className="text-warm-500 dark:text-warm-400" />
                </div>
                <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-cream-200 mb-2">{val.title}</h3>
                <p className="text-stone-500 dark:text-stone-500 text-sm leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-cream-50 dark:bg-dark-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="The Team" title="The People Behind" highlight="Your Yatra"
            description="A focused team of developers, designers, and growth specialists." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teamMembers.map((member, i) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/50 hover:shadow-[0_8px_32px_rgba(196,150,106,0.08)] transition-all text-center">
                <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-warm-400 to-warm-700 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                  {member.name[0]}
                </div>
                <h3 className="font-display font-semibold text-stone-900 dark:text-cream-200 text-base mb-0.5">{member.name}</h3>
                <p className="text-warm-600 dark:text-warm-400 text-xs font-medium mb-3">{member.role}</p>
                <p className="text-stone-500 dark:text-stone-500 text-xs leading-relaxed mb-4">{member.bio}</p>
                <div className="flex items-center justify-center gap-2">
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg border border-cream-400 dark:border-dark-50 bg-cream-100 dark:bg-dark-100 flex items-center justify-center text-stone-400 hover:text-warm-700 dark:hover:text-warm-400 hover:border-warm-400/40 transition-all">
                      <XIcon size={12} />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg border border-cream-400 dark:border-dark-50 bg-cream-100 dark:bg-dark-100 flex items-center justify-center text-stone-400 hover:text-warm-700 dark:hover:text-warm-400 hover:border-warm-400/40 transition-all">
                      <LinkedInIcon size={12} />
                    </a>
                  )}
                  {member.socials.github && (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg border border-cream-400 dark:border-dark-50 bg-cream-100 dark:bg-dark-100 flex items-center justify-center text-stone-400 hover:text-warm-700 dark:hover:text-warm-400 hover:border-warm-400/40 transition-all">
                      <GitHubIcon size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
