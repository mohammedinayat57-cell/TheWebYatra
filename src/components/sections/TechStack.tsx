"use client";
import { motion } from "framer-motion";

const skills = [
  // Languages & Frameworks
  { name: "React.js",       icon: "⚛",  color: "text-blue-500"    },
  { name: "Next.js",        icon: "▲",  color: "text-stone-800 dark:text-stone-200" },
  { name: "Node.js",        icon: "⬢",  color: "text-green-600"   },
  { name: "Java",           icon: "☕",  color: "text-orange-600"  },
  { name: "TypeScript",     icon: "TS", color: "text-blue-600"    },
  { name: "JavaScript",     icon: "JS", color: "text-yellow-500"  },
  { name: "Python",         icon: "🐍",  color: "text-green-500"   },
  // Databases
  { name: "MongoDB",        icon: "🍃",  color: "text-green-600"   },
  { name: "MySQL",          icon: "🗄",  color: "text-blue-500"    },
  { name: "PostgreSQL",     icon: "🐘",  color: "text-indigo-500"  },
  { name: "Supabase",       icon: "⚡",  color: "text-emerald-500" },
  // Styling & UI
  { name: "Tailwind CSS",   icon: "🎨",  color: "text-cyan-500"    },
  { name: "HTML5 / CSS3",   icon: "🌐",  color: "text-orange-500"  },
  // Tools & Platforms
  { name: "Git & GitHub",   icon: "🔀",  color: "text-stone-700 dark:text-stone-300" },
  { name: "Vercel",         icon: "▲",  color: "text-stone-800 dark:text-stone-200" },
  { name: "Shopify",        icon: "🛍",  color: "text-green-600"   },
  { name: "Figma",          icon: "✏️",  color: "text-pink-500"    },
  { name: "REST APIs",      icon: "🔗",  color: "text-warm-600 dark:text-warm-400" },
  { name: "Express.js",     icon: "⚡",  color: "text-stone-600"   },
  { name: "React Native",   icon: "📱",  color: "text-blue-400"    },
];

export default function TechStack() {
  return (
    <section className="relative py-16 md:py-20 bg-cream-50 dark:bg-dark-300 border-y border-cream-400 dark:border-dark-50" id="tech">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-3">
            Our Tech Stack
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-cream-100">
            Technologies We <span className="gradient-text">Master</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((tech, i) => (
            <motion.div key={tech.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              whileHover={{ y: -3, scale: 1.04 }}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/50 hover:bg-cream-300 dark:hover:bg-dark-100 transition-all duration-200 cursor-default">
              <span className={`text-sm font-bold ${tech.color}`}>{tech.icon}</span>
              <span className="text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-cream-200 text-sm font-medium transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
