"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";

const serviceOptions = ["Web Design","Web Development","E-Commerce","SEO Optimization","Branding","App Development","Full Digital Package","Other"];
const budgetOptions = ["< ₹25,000","₹25,000 – ₹50,000","₹50,000 – ₹1,20,000","₹1,20,000 – ₹2,50,000","₹2,50,000+","Not sure yet"];

const contactInfo = [
  { icon: MessageCircle, label: "WhatsApp",    value: "+91 8920291416",             href: "https://wa.me/918920291416" },
  { icon: Mail,          label: "Email",       value: "mohammedinayat12@gmail.com",  href: "mailto:mohammedinayat12@gmail.com" },
  { icon: Phone,         label: "Call",        value: "+91 8920291416",             href: "tel:+918920291416" },
  { icon: MapPin,        label: "Based In",    value: "Delhi, India · Remote Worldwide", href: null },
  { icon: Clock,         label: "Response",    value: "Within 2–4 hours",           href: null },
];

export default function ContactPageClient() {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:"", budget:"", message:"" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const openWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      alert("Please fill in Name, Phone and Message.");
      return;
    }
    const text =
      `*New Inquiry — TheWebYatra*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email || "—"}\n` +
      `*Service:* ${form.service || "—"}\n` +
      `*Budget:* ${form.budget || "—"}\n\n` +
      `*Message:*\n${form.message}`;

    window.open(`https://wa.me/918920291416?text=${encodeURIComponent(text)}`, "_blank");
  };

  const inp = "w-full px-4 py-3 rounded-xl bg-cream-100 dark:bg-dark-100 border border-cream-400 dark:border-dark-50 text-stone-900 dark:text-cream-100 text-sm placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-warm-400/70 transition-colors";
  const lbl = "block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-cream-100 dark:bg-dark-400 overflow-hidden">
        <div className="absolute inset-0 animated-grid" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-6">
            <MessageCircle size={13} /> Chat on WhatsApp
          </motion.div>
          <motion.h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-cream-100 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Begin Your <span className="gradient-text">Digital Yatra</span>
          </motion.h1>
          <motion.p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl max-w-xl mx-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Fill the form and hit send — it opens WhatsApp directly so you can chat with our team instantly.
          </motion.p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 bg-cream-50 dark:bg-dark-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="rounded-3xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center">
                  <MessageCircle size={18} className="text-[#25D366]" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-stone-900 dark:text-cream-100">Send via WhatsApp</h2>
                  <p className="text-stone-500 dark:text-stone-500 text-xs">Opens WhatsApp with your message pre-filled</p>
                </div>
              </div>

              <div className="h-px bg-cream-400 dark:bg-dark-50 my-6" />

              <form onSubmit={openWhatsApp} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={lbl}>Your Name *</label>
                    <input id="name" name="name" type="text" required placeholder="Your Name" value={form.name} onChange={onChange} className={inp} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={lbl}>Phone / WhatsApp *</label>
                    <input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={onChange} className={inp} />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={lbl}>Email Address</label>
                  <input id="email" name="email" type="email" placeholder="you@email.com (optional)" value={form.email} onChange={onChange} className={inp} />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="service" className={lbl}>Service Needed</label>
                    <select id="service" name="service" value={form.service} onChange={onChange} className={`${inp} cursor-pointer`}>
                      <option value="">Select a service…</option>
                      {serviceOptions.map((s) => <option key={s} value={s} className="bg-white dark:bg-dark-200">{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className={lbl}>Budget Range</label>
                    <select id="budget" name="budget" value={form.budget} onChange={onChange} className={`${inp} cursor-pointer`}>
                      <option value="">Select a range…</option>
                      {budgetOptions.map((b) => <option key={b} value={b} className="bg-white dark:bg-dark-200">{b}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={lbl}>Project Details *</label>
                  <textarea id="message" name="message" required rows={4}
                    placeholder="Tell me about your project — what you need, timeline, any references..."
                    value={form.message} onChange={onChange} className={`${inp} resize-none`} />
                </div>

                <button type="submit"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(37,211,102,0.35)]"
                  style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                  <MessageCircle size={18} />
                  Send on WhatsApp
                </button>

                <p className="text-stone-400 dark:text-stone-600 text-xs text-center">
                  Clicking will open WhatsApp with your message pre-filled. No app download needed — works on web too.
                </p>
              </form>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Quick WhatsApp button */}
              <motion.a href="https://wa.me/918920291416" target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                className="flex items-center gap-4 p-5 rounded-2xl border-2 border-[#25D366]/40 bg-[#25D366]/5 dark:bg-[#25D366]/8 hover:border-[#25D366]/70 hover:bg-[#25D366]/10 transition-all group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                  style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                  <MessageCircle size={22} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-stone-900 dark:text-cream-100 group-hover:text-[#128C7E] dark:group-hover:text-[#25D366] transition-colors">
                    Chat on WhatsApp
                  </div>
                  <div className="text-stone-500 dark:text-stone-500 text-sm">+91 8920291416 · Usually replies in 2h</div>
                </div>
              </motion.a>

              {/* Contact info */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 p-6">
                <h3 className="font-display text-base font-bold text-stone-900 dark:text-cream-100 mb-5">Other Ways to Reach</h3>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-warm-400/8 dark:bg-warm-400/10 border border-warm-400/20 flex items-center justify-center flex-shrink-0">
                        <Icon size={15} className="text-warm-500 dark:text-warm-400" />
                      </div>
                      <div>
                        <div className="text-stone-400 dark:text-stone-600 text-xs mb-0.5">{label}</div>
                        {href ? (
                          <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-stone-800 dark:text-cream-200 text-sm hover:text-warm-600 dark:hover:text-warm-400 transition-colors">
                            {value}
                          </a>
                        ) : (
                          <span className="text-stone-800 dark:text-cream-200 text-sm">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Map */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-dark-100 dark:to-dark-50 relative flex items-center justify-center">
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
                <div className="p-3 text-center">
                  <a href="https://maps.google.com/?q=New+Delhi" target="_blank" rel="noopener noreferrer"
                    className="text-warm-600 dark:text-warm-400 text-xs underline underline-offset-2 hover:text-warm-800 dark:hover:text-warm-300">
                    View on Google Maps
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
