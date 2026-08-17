"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import type { ContactFormData } from "@/types";

const serviceOptions = ["Web Design","Web Development","E-Commerce","SEO Optimization","Branding","App Development","Full Digital Package","Other"];
const budgetOptions = ["< ₹10,000","₹10,000 – ₹30,000","₹30,000 – ₹75,000","₹75,000 – ₹1,50,000","₹1,50,000+","Not sure yet"];

const contactInfo = [
  { icon: Mail,  label: "Email",           value: "mohammedinayat12@gmail.com", href: "mailto:mohammedinayat12@gmail.com" },
  { icon: Phone, label: "Call / WhatsApp", value: "+91 99999 99999",            href: "tel:+919999999999" },
  { icon: MapPin,label: "Based In",        value: "Delhi, India · Remote Worldwide", href: null },
  { icon: Clock, label: "Response Time",   value: "Within 24 hours",           href: null },
];

const init: ContactFormData = { name:"", email:"", phone:"", company:"", service:"", budget:"", message:"" };

export default function ContactPageClient() {
  const [form, setForm] = useState<ContactFormData>(init);
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [msgs, setMsgs] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading"); setMsgs([]);
    try {
      const res = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { setStatus("success"); setMsgs([data.message]); setForm(init); }
      else { setStatus("error"); setMsgs(data.errors || ["Something went wrong."]); }
    } catch { setStatus("error"); setMsgs(["Network error. Please try again."]); }
  };

  const inp = "w-full px-4 py-3 rounded-xl bg-cream-100 dark:bg-dark-100 border border-cream-400 dark:border-dark-50 text-stone-900 dark:text-cream-100 text-sm placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-warm-400/60 dark:focus:border-warm-400/50 transition-colors";
  const lbl = "block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-cream-100 dark:bg-dark-400 overflow-hidden">
        <div className="absolute inset-0 animated-grid" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-warm-400 animate-pulse" /> Let&apos;s Talk
          </motion.div>
          <motion.h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-cream-100 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Begin Your <span className="gradient-text">Digital Yatra</span>
          </motion.h1>
          <motion.p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl max-w-xl mx-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Free discovery call with Mohd Inayat. Tell us about your project and we&apos;ll map the perfect path forward.
          </motion.p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 bg-cream-50 dark:bg-dark-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="rounded-3xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 p-8 md:p-10">
              <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-cream-100 mb-2">Send Us a Message</h2>
              <p className="text-stone-500 dark:text-stone-500 text-sm mb-8">We&apos;ll get back within 24 hours.</p>

              {status === "success" ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/40 flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-stone-900 dark:text-cream-100 mb-2">Message Sent!</h3>
                  <p className="text-stone-500 dark:text-stone-500 text-sm max-w-sm">{msgs[0]}</p>
                  <button onClick={() => setStatus("idle")}
                    className="mt-6 px-6 py-2.5 rounded-full text-sm font-semibold text-warm-700 dark:text-warm-400 border border-warm-400/40 bg-cream-100 dark:bg-dark-100 hover:bg-cream-200 dark:hover:bg-dark-50 transition-all">
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label htmlFor="name" className={lbl}>Full Name *</label>
                      <input id="name" name="name" type="text" required placeholder="Mohd Inayat" value={form.name} onChange={onChange} className={inp} /></div>
                    <div><label htmlFor="email" className={lbl}>Email *</label>
                      <input id="email" name="email" type="email" required placeholder="you@email.com" value={form.email} onChange={onChange} className={inp} /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label htmlFor="phone" className={lbl}>Phone *</label>
                      <input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={onChange} className={inp} /></div>
                    <div><label htmlFor="company" className={lbl}>Company / Brand</label>
                      <input id="company" name="company" type="text" placeholder="Acme Inc. (optional)" value={form.company} onChange={onChange} className={inp} /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label htmlFor="service" className={lbl}>Service Needed *</label>
                      <select id="service" name="service" required value={form.service} onChange={onChange} className={`${inp} cursor-pointer`}>
                        <option value="" disabled>Select a service…</option>
                        {serviceOptions.map((s) => <option key={s} value={s} className="bg-white dark:bg-dark-200">{s}</option>)}
                      </select></div>
                    <div><label htmlFor="budget" className={lbl}>Budget Range *</label>
                      <select id="budget" name="budget" required value={form.budget} onChange={onChange} className={`${inp} cursor-pointer`}>
                        <option value="" disabled>Select a range…</option>
                        {budgetOptions.map((b) => <option key={b} value={b} className="bg-white dark:bg-dark-200">{b}</option>)}
                      </select></div>
                  </div>
                  <div><label htmlFor="message" className={lbl}>Project Details *</label>
                    <textarea id="message" name="message" required rows={5} placeholder="Tell us about your project — goals, timeline, requirements..."
                      value={form.message} onChange={onChange} className={`${inp} resize-none`} /></div>

                  {status === "error" && msgs.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-700/30">
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                      <ul className="text-red-600 dark:text-red-400 text-sm space-y-1">
                        {msgs.map((m) => <li key={m}>{m}</li>)}
                      </ul>
                    </motion.div>
                  )}

                  <button type="submit" disabled={status === "loading"}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-semibold text-white text-base bg-gradient-to-r from-warm-400 to-warm-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(196,150,106,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                    {status === "loading"
                      ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Sending…</>
                      : <><Send size={15} />Send Message</>
                    }
                  </button>
                  <p className="text-stone-400 dark:text-stone-600 text-xs text-center">We never share your data. Privacy-first.</p>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-5">
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 p-7">
                <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-cream-100 mb-5">Get in Touch</h3>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg border border-warm-400/20 bg-warm-400/8 dark:bg-warm-400/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={15} className="text-warm-500 dark:text-warm-400" />
                      </div>
                      <div>
                        <div className="text-stone-400 dark:text-stone-600 text-xs mb-0.5">{label}</div>
                        {href ? (
                          <a href={href} className="text-stone-800 dark:text-cream-200 text-sm hover:text-warm-600 dark:hover:text-warm-400 transition-colors">{value}</a>
                        ) : (
                          <span className="text-stone-800 dark:text-cream-200 text-sm">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Map placeholder */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 overflow-hidden">
                <div className="h-44 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-dark-100 dark:to-dark-50 relative flex items-center justify-center">
                  <div className="absolute inset-0 animated-grid opacity-40" />
                  <div className="relative text-center">
                    <div className="text-4xl mb-2">📍</div>
                    <div className="text-stone-800 dark:text-cream-200 font-medium text-sm">New Delhi, India</div>
                    <div className="text-stone-500 dark:text-stone-500 text-xs mt-1">Remote · Worldwide</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-warm-500 opacity-50 animate-ping absolute" />
                  </div>
                </div>
                <div className="p-4 text-center">
                  <a href="https://maps.google.com/?q=New+Delhi" target="_blank" rel="noopener noreferrer"
                    className="text-warm-600 dark:text-warm-400 hover:text-warm-800 dark:hover:text-warm-300 text-xs underline underline-offset-2">
                    View on Google Maps
                  </a>
                </div>
              </motion.div>

              {/* Quick FAQ */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
                className="rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 p-6">
                <h3 className="font-display text-base font-semibold text-stone-900 dark:text-cream-100 mb-4">Quick Answers</h3>
                <div className="space-y-3">
                  {[
                    { q: "How fast do you respond?", a: "Within 24 hours on weekdays." },
                    { q: "Do you work with startups?", a: "Yes — especially early-stage founders." },
                    { q: "Can I see a proposal first?", a: "Absolutely, free of charge." },
                  ].map(({ q, a }) => (
                    <div key={q} className="border-b border-cream-400 dark:border-dark-50 pb-3 last:border-0 last:pb-0">
                      <div className="text-stone-800 dark:text-cream-200 text-xs font-medium mb-0.5">{q}</div>
                      <div className="text-stone-500 dark:text-stone-500 text-xs">{a}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
