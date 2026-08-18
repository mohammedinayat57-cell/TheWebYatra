"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Zap, Clock, Shield, Star } from "lucide-react";

const services = ["Web Design","Web Development","E-Commerce Store","SEO & Growth","Mobile App","Full Digital Package","AI Integration","Other"];
const budgets = ["₹25,000 – ₹50,000","₹50,000 – ₹1,20,000","₹1,20,000 – ₹2,50,000","₹2,50,000+","Let's Discuss"];
const timelines = ["ASAP (Rush)","1–2 Weeks","1 Month","2–3 Months","Flexible"];

const perks = [
  { icon: Zap,    title: "Fast Delivery",    desc: "Most projects ship in 2–4 weeks" },
  { icon: Clock,  title: "Quick Response",   desc: "Reply within 4 hours on weekdays" },
  { icon: Shield, title: "Clean Code",       desc: "Maintainable, documented, yours" },
  { icon: Star,   title: "5★ Rated",         desc: "Consistent quality, every time" },
];

export default function GetQuote() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", timeline: "", description: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [msg, setMsg] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company: "", message: `[QUOTE REQUEST]\nService: ${form.service}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\n${form.description}` }),
      });
      const data = await res.json();
      if (data.success) { setStatus("success"); setMsg("Quote request sent! I'll get back within 4 hours."); setForm({ name:"",email:"",phone:"",service:"",budget:"",timeline:"",description:"" }); }
      else { setStatus("error"); setMsg(data.errors?.[0] || "Something went wrong."); }
    } catch { setStatus("error"); setMsg("Network error. Please try again."); }
  };

  const inp = "w-full px-4 py-3 rounded-xl bg-cream-100 dark:bg-dark-100 border border-cream-400 dark:border-dark-50 text-stone-900 dark:text-cream-100 text-sm placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-warm-400/70 dark:focus:border-warm-400/60 transition-colors";
  const lbl = "block text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5";

  return (
    <section id="quote" className="relative py-20 md:py-28 bg-cream-50 dark:bg-dark-300 overflow-hidden">
      <div className="absolute inset-0 animated-grid opacity-40" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warm-400/5 dark:bg-warm-400/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-5">
            <Zap size={13} /> Get a Free Quote
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-cream-100 mb-4 leading-tight">
            Tell Me About Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-warm-500 via-warm-600 to-warm-800 dark:from-warm-400 dark:via-warm-500 dark:to-warm-600">
              Project
            </span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
            Fill out the form below and I&apos;ll send you a detailed quote within 24 hours — completely free, no commitment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          {/* ── Form ── */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-3xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 p-8 md:p-10 shadow-sm dark:shadow-none">

            {status === "success" ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-16">
                <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/30 flex items-center justify-center mb-5 shadow-md">
                  <CheckCircle size={36} className="text-emerald-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-cream-100 mb-2">Quote Request Sent! 🎉</h3>
                <p className="text-stone-500 dark:text-stone-500 max-w-sm leading-relaxed">{msg}</p>
                <button onClick={() => setStatus("idle")}
                  className="mt-8 px-6 py-2.5 rounded-full text-sm font-semibold text-warm-700 dark:text-warm-400 border border-warm-400/40 bg-cream-100 dark:bg-dark-100 hover:bg-cream-200 dark:hover:bg-dark-50 transition-all">
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="q-name" className={lbl}>Your Name *</label>
                    <input id="q-name" name="name" type="text" required placeholder="Mohd Inayat" value={form.name} onChange={onChange} className={inp} />
                  </div>
                  <div>
                    <label htmlFor="q-email" className={lbl}>Email Address *</label>
                    <input id="q-email" name="email" type="email" required placeholder="you@email.com" value={form.email} onChange={onChange} className={inp} />
                  </div>
                </div>

                <div>
                  <label htmlFor="q-phone" className={lbl}>Phone / WhatsApp *</label>
                  <input id="q-phone" name="phone" type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={onChange} className={inp} />
                </div>

                <div>
                  <label htmlFor="q-service" className={lbl}>Service Required *</label>
                  <select id="q-service" name="service" required value={form.service} onChange={onChange} className={`${inp} cursor-pointer`}>
                    <option value="" disabled>Choose a service…</option>
                    {services.map((s) => <option key={s} value={s} className="bg-white dark:bg-dark-200">{s}</option>)}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="q-budget" className={lbl}>Your Budget *</label>
                    <select id="q-budget" name="budget" required value={form.budget} onChange={onChange} className={`${inp} cursor-pointer`}>
                      <option value="" disabled>Select budget range…</option>
                      {budgets.map((b) => <option key={b} value={b} className="bg-white dark:bg-dark-200">{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="q-timeline" className={lbl}>Timeline *</label>
                    <select id="q-timeline" name="timeline" required value={form.timeline} onChange={onChange} className={`${inp} cursor-pointer`}>
                      <option value="" disabled>When do you need it?</option>
                      {timelines.map((t) => <option key={t} value={t} className="bg-white dark:bg-dark-200">{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="q-desc" className={lbl}>Project Description *</label>
                  <textarea id="q-desc" name="description" required rows={4}
                    placeholder="Describe your project — what you need, your goals, any reference sites you like..."
                    value={form.description} onChange={onChange} className={`${inp} resize-none`} />
                </div>

                {status === "error" && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2.5 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-700/30">
                    <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-600 dark:text-red-400 text-sm">{msg}</p>
                  </motion.div>
                )}

                <button type="submit" disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-bold text-white text-base bg-gradient-to-r from-warm-400 to-warm-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(196,150,106,0.38)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  {status === "loading"
                    ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Sending…</>
                    : <><Send size={16} /> Request Free Quote</>
                  }
                </button>

                <p className="text-stone-400 dark:text-stone-600 text-xs text-center">
                  No commitment. Free quote within 24 hours.
                </p>
              </form>
            )}
          </motion.div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            {/* Why work with me */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 p-6">
              <h3 className="font-display text-base font-bold text-stone-900 dark:text-cream-100 mb-5">Why Work With Me?</h3>
              <div className="space-y-4">
                {perks.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-warm-400/10 dark:bg-warm-400/8 border border-warm-400/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-warm-500 dark:text-warm-400" />
                    </div>
                    <div>
                      <div className="text-stone-800 dark:text-cream-200 text-sm font-semibold">{title}</div>
                      <div className="text-stone-500 dark:text-stone-500 text-xs mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent project */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 p-6">
              <h3 className="font-display text-base font-bold text-stone-900 dark:text-cream-100 mb-4">Recent Work</h3>
              <div className="space-y-3">
                {[
                  { name: "Al Mishk", type: "E-Commerce", link: "https://almishk.in", emoji: "🕌" },
                  { name: "Panchaiyat Cafe", type: "Cloud Kitchen", link: "https://panchaiyatcafe.in", emoji: "🍛" },
                  { name: "Globe Trotter", type: "Travel Agency", link: "https://globe-trotter-ui.vercel.app", emoji: "✈️" },
                ].map((p) => (
                  <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-cream-400 dark:border-dark-50 hover:border-warm-400/50 hover:bg-cream-100 dark:hover:bg-dark-100 transition-all group">
                    <span className="text-2xl">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-stone-800 dark:text-cream-200 text-sm font-semibold group-hover:text-warm-700 dark:group-hover:text-warm-400 transition-colors truncate">{p.name}</div>
                      <div className="text-stone-500 dark:text-stone-500 text-[11px]">{p.type}</div>
                    </div>
                    <span className="text-stone-300 dark:text-stone-700 text-xs group-hover:text-warm-500 transition-colors">→</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Contact direct */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl border border-warm-400/30 bg-gradient-to-br from-warm-400/8 to-white dark:to-dark-200 p-6">
              <p className="text-stone-600 dark:text-stone-400 text-sm mb-3">Prefer to chat directly?</p>
              <a href="mailto:mohammedinayat12@gmail.com"
                className="block w-full text-center py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-warm-400 to-warm-700 hover:shadow-[0_4px_16px_rgba(196,150,106,0.30)] transition-all">
                mohammedinayat12@gmail.com
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
