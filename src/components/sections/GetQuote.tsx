"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Check, Zap, Clock, Shield, Star } from "lucide-react";

// ── Packages ──────────────────────────────────────────────────────────────
const packages = [
  {
    id: "starter",
    name: "Starter",
    price: "₹49,999",
    usd: "~ $588",
    period: "one-time",
    desc: "Perfect for small businesses launching their digital presence.",
    features: ["5-Page Custom Website","Mobile Responsive","Basic SEO","Contact Form","2 Months Support","Google Analytics","SSL Certificate","Source Code"],
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹1,19,999",
    usd: "~ $1,412",
    period: "one-time",
    desc: "For growing businesses ready to scale with a powerful platform.",
    features: ["Up to 20 Pages","Custom UI/UX Design","Advanced SEO","CMS Integration","E-Commerce Ready","Performance Optimization","4 Months Support","Analytics Dashboard","Social Media Integration","Priority Support"],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    usd: "",
    period: "project",
    desc: "Full-scale solutions for enterprise-level requirements.",
    features: ["Unlimited Pages","Custom Web Application","Full Brand Identity","Advanced E-Commerce","SEO + Content Strategy","Mobile App Development","AI Integration","Dedicated PM","12 Months Support","SLA Guarantee","Custom Integrations"],
    highlighted: false,
  },
];

const timelines = ["ASAP (Rush)","1–2 Weeks","1 Month","2–3 Months","Flexible"];
const services  = ["Web Design","Web Development","E-Commerce Store","SEO & Growth","Mobile App","Full Digital Package","AI Integration","Other"];

// ── Perks ──────────────────────────────────────────────────────────────────
const perks = [
  { icon: Zap,     title: "Fast Delivery",   desc: "Most projects ship in 2–4 weeks" },
  { icon: Clock,   title: "Quick Reply",     desc: "Response within 4 hours" },
  { icon: Shield,  title: "Clean Code",      desc: "Documented & yours to keep" },
  { icon: Star,    title: "5★ Rated",        desc: "Consistent quality, every time" },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function GetQuote() {
  const [selected, setSelected] = useState("growth");
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:"", timeline:"", description:"" });
  const [sent, setSent]   = useState(false);
  const [err,  setErr]    = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const pkg = packages.find(p => p.id === selected)!;

  const openWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!form.name.trim() || !form.phone.trim() || !form.description.trim()) {
      setErr("Please fill Name, Phone and Project Description.");
      return;
    }
    const text =
      `*Quote Request — TheWebYatra* 🚀\n\n` +
      `*Package:* ${pkg.name} (${pkg.price})\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email || "—"}\n` +
      `*Service:* ${form.service || "—"}\n` +
      `*Timeline:* ${form.timeline || "—"}\n\n` +
      `*Project Details:*\n${form.description}`;

    window.open(`https://wa.me/919220612315?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
    setForm({ name:"",phone:"",email:"",service:"",timeline:"",description:"" });
  };

  const inp = "w-full px-4 py-3 rounded-xl bg-cream-100 dark:bg-dark-100 border border-cream-400 dark:border-dark-50 text-stone-900 dark:text-cream-100 text-sm placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-warm-400/60 transition-colors";
  const lbl = "block text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5";

  return (
    <section id="quote" className="relative py-16 md:py-24 bg-cream-50 dark:bg-dark-300 overflow-hidden">
      <div className="absolute inset-0 animated-grid opacity-40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <motion.div className="text-center mb-12"
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-5">
            <MessageCircle size={13} /> Get a Free Quote via WhatsApp
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-cream-100 mb-4 leading-tight">
            Pick a Package &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-warm-500 via-warm-600 to-warm-800 dark:from-warm-400 dark:via-warm-500 dark:to-warm-600">
              Let&apos;s Talk
            </span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base md:text-lg max-w-2xl mx-auto">
            Choose a package, fill your details and hit Send — WhatsApp opens with everything pre-filled. I reply within 4 hours.
          </p>
        </motion.div>

        {/* ── Package selector ── */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.5, delay:0.1 }}>
          {packages.map((p) => (
            <button key={p.id} onClick={() => setSelected(p.id)}
              className={`relative text-left p-5 rounded-2xl border transition-all duration-200 ${
                selected === p.id
                  ? "border-warm-400/70 bg-gradient-to-b from-warm-400/10 to-white dark:to-dark-200 shadow-[0_4px_24px_rgba(196,150,106,0.18)]"
                  : "border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 hover:border-warm-400/40"
              }`}>
              {p.highlighted && selected !== p.id && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-warm-400 to-warm-700 whitespace-nowrap">
                  Most Popular
                </span>
              )}
              {selected === p.id && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-warm-400 to-warm-700 whitespace-nowrap flex items-center gap-1">
                  <Check size={9} /> Selected
                </span>
              )}
              <div className="font-display font-bold text-stone-900 dark:text-cream-100 text-base mb-0.5">{p.name}</div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-extrabold text-stone-900 dark:text-cream-100">{p.price}</span>
                {p.price !== "Custom" && <span className="text-stone-400 text-xs">/{p.period}</span>}
              </div>
              {p.usd && <div className="text-stone-400 dark:text-stone-600 text-[11px] mt-0.5">{p.usd} usd</div>}
              <p className="text-stone-500 dark:text-stone-500 text-xs mt-2 leading-relaxed">{p.desc}</p>
            </button>
          ))}
        </motion.div>

        {/* ── Selected package features ── */}
        <motion.div
          key={selected}
          initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.3 }}
          className="mb-10 p-5 rounded-2xl border border-warm-400/25 bg-white dark:bg-dark-200">
          <p className="text-xs font-semibold text-stone-500 dark:text-stone-500 uppercase tracking-wider mb-3">
            {pkg.name} plan includes:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
            {pkg.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300">
                <Check size={12} className="text-warm-500 dark:text-warm-400 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Main form + sidebar ── */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">

          {/* Form */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5 }}
            className="rounded-3xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 p-6 md:p-8">

            {sent ? (
              <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                className="flex flex-col items-center text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-cream-100 mb-2">WhatsApp Opened!</h3>
                <p className="text-stone-500 dark:text-stone-500 max-w-sm text-sm leading-relaxed">
                  Your quote request was pre-filled in WhatsApp. I&apos;ll reply within 4 hours. Looking forward to working with you! 🚀
                </p>
                <button onClick={() => setSent(false)}
                  className="mt-6 px-6 py-2.5 rounded-full text-sm font-semibold text-warm-700 dark:text-warm-400 border border-warm-400/40 bg-cream-100 dark:bg-dark-100 hover:bg-cream-200 dark:hover:bg-dark-50 transition-all">
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={openWhatsApp} noValidate className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lbl}>Your Name *</label>
                    <input name="name" type="text" required placeholder="Mohd Inayat" value={form.name} onChange={onChange} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>WhatsApp / Phone *</label>
                    <input name="phone" type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={onChange} className={inp} />
                  </div>
                </div>

                <div>
                  <label className={lbl}>Email Address</label>
                  <input name="email" type="email" placeholder="you@email.com (optional)" value={form.email} onChange={onChange} className={inp} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lbl}>Specific Service</label>
                    <select name="service" value={form.service} onChange={onChange} className={`${inp} cursor-pointer`}>
                      <option value="">Any / Same as package</option>
                      {services.map(s => <option key={s} value={s} className="bg-white dark:bg-dark-200">{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>Timeline</label>
                    <select name="timeline" value={form.timeline} onChange={onChange} className={`${inp} cursor-pointer`}>
                      <option value="">When do you need it?</option>
                      {timelines.map(t => <option key={t} value={t} className="bg-white dark:bg-dark-200">{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={lbl}>Project Details *</label>
                  <textarea name="description" required rows={4}
                    placeholder="Describe your project — goals, references, any specific requirements..."
                    value={form.description} onChange={onChange} className={`${inp} resize-none`} />
                </div>

                {err && (
                  <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-700/30 text-red-600 dark:text-red-400 text-sm">
                    {err}
                  </div>
                )}

                {/* Selected package summary */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-warm-400/8 dark:bg-warm-400/6 border border-warm-400/25">
                  <div>
                    <div className="text-xs text-stone-500 dark:text-stone-500">Selected Package</div>
                    <div className="font-semibold text-stone-900 dark:text-cream-100 text-sm">{pkg.name} · {pkg.price}</div>
                  </div>
                  <button type="button" onClick={() => document.getElementById("quote")?.scrollIntoView({ behavior:"smooth" })}
                    className="text-xs text-warm-600 dark:text-warm-400 underline underline-offset-2">Change</button>
                </div>

                <button type="submit"
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(37,211,102,0.38)]"
                  style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                  <MessageCircle size={18} />
                  Send Quote on WhatsApp
                </button>

                <p className="text-stone-400 dark:text-stone-600 text-xs text-center">
                  Opens WhatsApp with your details pre-filled · Free quote · No commitment
                </p>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Direct WhatsApp */}
            <motion.a href="https://wa.me/919220612315" target="_blank" rel="noopener noreferrer"
              initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.5 }}
              className="flex items-center gap-4 p-5 rounded-2xl border-2 border-[#25D366]/40 bg-[#25D366]/5 dark:bg-[#25D366]/6 hover:border-[#25D366]/70 hover:bg-[#25D366]/10 transition-all group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                <MessageCircle size={22} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-stone-900 dark:text-cream-100 group-hover:text-[#128C7E] dark:group-hover:text-[#25D366] transition-colors text-sm">
                  Chat Directly on WhatsApp
                </div>
                <div className="text-stone-500 dark:text-stone-500 text-xs mt-0.5">+91 92206 12315 · Replies in ~2 hrs</div>
              </div>
            </motion.a>

            {/* Why me */}
            <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:0.1 }}
              className="rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 p-5">
              <h3 className="font-display text-sm font-bold text-stone-900 dark:text-cream-100 mb-4">Why Work With Me?</h3>
              <div className="space-y-3.5">
                {perks.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-warm-400/10 border border-warm-400/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-warm-500 dark:text-warm-400" />
                    </div>
                    <div>
                      <div className="text-stone-800 dark:text-cream-200 text-xs font-semibold">{title}</div>
                      <div className="text-stone-500 dark:text-stone-500 text-xs mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent projects */}
            <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:0.2 }}
              className="rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 p-5">
              <h3 className="font-display text-sm font-bold text-stone-900 dark:text-cream-100 mb-3">Recent Live Work</h3>
              <div className="space-y-2">
                {[
                  { name:"Al Mishk",       type:"E-Commerce",   link:"https://almishk.in",                    e:"🕌" },
                  { name:"Panchaiyat Cafe",type:"Cloud Kitchen", link:"https://panchaiyatcafe.in",             e:"🍛" },
                  { name:"Globe Trotter",  type:"Travel Agency", link:"https://globe-trotter-ui.vercel.app",   e:"✈️" },
                ].map(p => (
                  <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-cream-400 dark:border-dark-50 hover:border-warm-400/50 hover:bg-cream-100 dark:hover:bg-dark-100 transition-all group">
                    <span className="text-xl">{p.e}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-stone-800 dark:text-cream-200 text-xs font-semibold group-hover:text-warm-700 dark:group-hover:text-warm-400 transition-colors truncate">{p.name}</div>
                      <div className="text-stone-500 dark:text-stone-500 text-[10px]">{p.type}</div>
                    </div>
                    <span className="text-stone-300 dark:text-stone-700 group-hover:text-warm-500 text-xs transition-colors">→</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
