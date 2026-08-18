"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Check, ChevronRight, ChevronLeft, Zap, Clock, Shield, Star } from "lucide-react";

// ─────────────────────────────────────────────
// Data definitions
// ─────────────────────────────────────────────

const STEP_LABELS = ["Project", "Pages", "Features", "Timeline", "Details", "Summary"];

const PROJECT_TYPES = [
  { id: "landing",     emoji: "🖥",  label: "Landing Page",              sub: "Single page, conversion-focused",              base: 15000 },
  { id: "portfolio",   emoji: "📖",  label: "Portfolio / Brochure",       sub: "Multi-page brand or personal site",             base: 25000 },
  { id: "ecommerce",   emoji: "🛒",  label: "E-Commerce Store",           sub: "Products, cart, payment gateway",               base: 45000 },
  { id: "webapp",      emoji: "⚙️",  label: "Web Application",            sub: "Custom full-stack app with auth",               base: 85000 },
  { id: "restaurant",  emoji: "🍽",  label: "Restaurant / Menu Site",     sub: "Menu, ordering, location info",                 base: 20000 },
  { id: "travel",      emoji: "✈️",  label: "Travel Agency / Tourism",    sub: "Packages, bookings, destinations",              base: 35000 },
] as const;

const PAGES_OPTIONS = [
  { id: "1-3",  label: "1–3 pages",  extra: 0 },
  { id: "4-7",  label: "4–7 pages",  extra: 8000 },
  { id: "8-15", label: "8–15 pages", extra: 18000 },
  { id: "15+",  label: "15+ pages",  extra: 35000 },
] as const;

interface Feature {
  id: string;
  label: string;
  cost: number;
  included: boolean;
}

const FEATURES: Feature[] = [
  { id: "responsive",  label: "Mobile Responsive Design",       cost: 0,     included: true  },
  { id: "basic-seo",   label: "Basic SEO Setup",                cost: 0,     included: true  },
  { id: "contact",     label: "Contact Form",                   cost: 0,     included: true  },
  { id: "ssl",         label: "SSL Certificate",                cost: 0,     included: true  },
  { id: "adv-seo",     label: "Advanced SEO Package",           cost: 12000, included: false },
  { id: "whatsapp",    label: "WhatsApp Integration",           cost: 5000,  included: false },
  { id: "payment",     label: "Payment Gateway",                cost: 15000, included: false },
  { id: "cms",         label: "CMS / Admin Panel",              cost: 20000, included: false },
  { id: "livechat",    label: "Live Chat Widget",               cost: 6000,  included: false },
  { id: "blog",        label: "Blog System",                    cost: 10000, included: false },
  { id: "social",      label: "Social Media Integration",       cost: 8000,  included: false },
  { id: "analytics",   label: "Google Analytics Dashboard",     cost: 7000,  included: false },
  { id: "animations",  label: "Custom Animations",              cost: 12000, included: false },
  { id: "multilang",   label: "Multi-language Support",         cost: 18000, included: false },
  { id: "auth",        label: "User Authentication / Login",    cost: 22000, included: false },
  { id: "email-mkt",   label: "Email Marketing Integration",    cost: 9000,  included: false },
];

const TIMELINE_OPTIONS = [
  { id: "rush",     label: "ASAP / Rush",     sub: "Within 1 week",   modifier: 15000  },
  { id: "2-3w",     label: "2–3 Weeks",        sub: "Standard pace",   modifier: 0      },
  { id: "1month",   label: "1 Month",          sub: "Relaxed delivery",modifier: -3000  },
  { id: "2months",  label: "2+ Months",        sub: "Flexible",        modifier: -6000  },
];

// ─────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────
const fmt = (n: number) =>
  "₹" + Math.abs(n).toLocaleString("en-IN");

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function GetQuote() {
  const [step, setStep] = useState(0);
  const [projectId,  setProjectId]  = useState<string>("");
  const [pagesId,    setPagesId]    = useState<string>("");
  const [features,   setFeatures]   = useState<string[]>(() =>
    FEATURES.filter(f => f.included).map(f => f.id)
  );
  const [timelineId, setTimelineId] = useState<string>("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  // ── Derived totals ──────────────────────────
  const projectType  = PROJECT_TYPES.find(p => p.id === projectId);
  const pagesOption  = PAGES_OPTIONS.find(p => p.id === pagesId);
  const timelineOpt  = TIMELINE_OPTIONS.find(t => t.id === timelineId);
  const featureTotal = FEATURES.filter(f => features.includes(f.id) && f.cost > 0)
                                .reduce((s, f) => s + f.cost, 0);
  const basePrice    = projectType?.base ?? 0;
  const pagesExtra   = pagesOption?.extra ?? 0;
  const timelineMod  = timelineOpt?.modifier ?? 0;
  const totalPrice   = basePrice + pagesExtra + featureTotal + timelineMod;
  const usdPrice     = Math.round(totalPrice / 85);

  // ── Step validation ─────────────────────────
  const canProceed = useCallback(() => {
    if (step === 0) return !!projectId;
    if (step === 1) return !!pagesId;
    if (step === 3) return !!timelineId;
    if (step === 4) {
      const e: Partial<typeof form> = {};
      if (!form.name.trim())  e.name  = "Name is required";
      if (!form.phone.trim()) e.phone = "Phone / WhatsApp is required";
      setErrors(e);
      return Object.keys(e).length === 0;
    }
    return true;
  }, [step, projectId, pagesId, timelineId, form]);

  const next = () => {
    if (canProceed()) setStep(s => Math.min(s + 1, 5));
  };
  const back = () => setStep(s => Math.max(s - 1, 0));

  const toggleFeature = (id: string) => {
    setFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // ── WhatsApp message ────────────────────────
  const sendWhatsApp = () => {
    const selectedFeatureLabels = FEATURES.filter(f => features.includes(f.id)).map(f => f.label);
    const lines = [
      `*Quote Request — TheWebYatra* 🚀`,
      ``,
      `*Project Type:* ${projectType?.label ?? "—"}  (Base: ${fmt(basePrice)})`,
      `*Pages:* ${pagesOption?.label ?? "—"}  (+${fmt(pagesExtra)})`,
      `*Timeline:* ${timelineOpt?.label ?? "—"}  (${timelineMod >= 0 ? "+" : ""}${fmt(timelineMod)})`,
      ``,
      `*Features Selected:*`,
      ...selectedFeatureLabels.map(l => `  • ${l}`),
      ``,
      `*💰 Total Estimate:* ${fmt(totalPrice)} (~ $${usdPrice} USD)`,
      ``,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*Email:* ${form.email || "—"}`,
      form.description ? `\n*Project Details:*\n${form.description}` : "",
    ].join("\n");

    window.open(`https://wa.me/919220612315?text=${encodeURIComponent(lines)}`, "_blank");
  };

  // ── Shared styles ───────────────────────────
  const inp = "w-full px-4 py-3 rounded-xl bg-cream-100 dark:bg-dark-100 border border-cream-400 dark:border-dark-50 text-stone-900 dark:text-cream-100 text-sm placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-warm-400/60 transition-colors";
  const lbl = "block text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5";

  return (
    <section id="quote" className="relative py-16 md:py-24 bg-cream-50 dark:bg-dark-300 overflow-hidden">
      <div className="absolute inset-0 animated-grid opacity-40 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-5">
            <MessageCircle size={13} /> Get a Free Quote
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 dark:text-cream-100 mb-4 leading-tight">
            Build Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-warm-500 via-warm-600 to-warm-800 dark:from-warm-400 dark:via-warm-500 dark:to-warm-600">
              Custom Quote
            </span>
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-base max-w-xl mx-auto">
            Answer 5 quick questions and get an instant price estimate — then send it straight to WhatsApp.
          </p>
        </motion.div>

        {/* ── Step progress bar ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {/* connecting line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-cream-400 dark:bg-dark-50 mx-8 z-0" />
            <div
              className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-warm-400 to-warm-600 z-0 transition-all duration-500"
              style={{ width: `calc(${(step / (STEP_LABELS.length - 1)) * 100}% - 2rem)`, marginLeft: "2rem" }}
            />
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="relative z-10 flex flex-col items-center gap-1.5">
                <button
                  onClick={() => i < step && setStep(i)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                    i < step
                      ? "bg-gradient-to-br from-warm-400 to-warm-600 border-warm-400 text-white cursor-pointer hover:scale-110"
                      : i === step
                      ? "bg-gradient-to-br from-warm-400 to-warm-600 border-warm-500 text-white shadow-[0_0_0_3px_rgba(196,150,106,0.25)]"
                      : "bg-cream-100 dark:bg-dark-200 border-cream-400 dark:border-dark-50 text-stone-400 dark:text-stone-600 cursor-default"
                  }`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </button>
                <span className={`text-[10px] font-semibold hidden sm:block transition-colors ${
                  i <= step ? "text-warm-600 dark:text-warm-400" : "text-stone-400 dark:text-stone-600"
                }`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Live price chip ── */}
        {totalPrice > 0 && (
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-400/10 border border-warm-400/30 text-stone-800 dark:text-cream-100">
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Estimate:</span>
              <span className="font-display font-bold text-lg text-warm-600 dark:text-warm-400">{fmt(totalPrice)}</span>
              <span className="text-xs text-stone-400 dark:text-stone-500">~ ${usdPrice} USD</span>
            </div>
          </motion.div>
        )}

        {/* ── Step card ── */}
        <div className="rounded-3xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 overflow-hidden shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="p-6 md:p-8">

              {/* ── STEP 0 – Project Type ── */}
              {step === 0 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-cream-100 mb-1">What type of project do you need?</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Pick the option that best describes your project.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PROJECT_TYPES.map(pt => (
                      <button key={pt.id} onClick={() => setProjectId(pt.id)}
                        className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200 ${
                          projectId === pt.id
                            ? "border-warm-400/70 bg-warm-400/8 dark:bg-warm-400/6 shadow-[0_2px_12px_rgba(196,150,106,0.15)]"
                            : "border-cream-400 dark:border-dark-50 hover:border-warm-400/40 hover:bg-cream-100 dark:hover:bg-dark-100"
                        }`}>
                        <span className="text-2xl flex-shrink-0 mt-0.5">{pt.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`font-semibold text-sm ${projectId === pt.id ? "text-warm-700 dark:text-warm-400" : "text-stone-900 dark:text-cream-100"}`}>
                              {pt.label}
                            </span>
                            {projectId === pt.id && <Check size={14} className="text-warm-500 flex-shrink-0" />}
                          </div>
                          <span className="text-stone-500 dark:text-stone-400 text-xs">{pt.sub}</span>
                          <div className="text-warm-600 dark:text-warm-400 text-xs font-semibold mt-1">From {fmt(pt.base)}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 1 – Pages ── */}
              {step === 1 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-cream-100 mb-1">How many pages do you need?</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">More pages = more content architecture and dev work.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {PAGES_OPTIONS.map(po => (
                      <button key={po.id} onClick={() => setPagesId(po.id)}
                        className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-200 text-center ${
                          pagesId === po.id
                            ? "border-warm-400/70 bg-warm-400/8 dark:bg-warm-400/6 shadow-[0_2px_12px_rgba(196,150,106,0.15)]"
                            : "border-cream-400 dark:border-dark-50 hover:border-warm-400/40 hover:bg-cream-100 dark:hover:bg-dark-100"
                        }`}>
                        <span className={`font-display font-bold text-lg ${pagesId === po.id ? "text-warm-600 dark:text-warm-400" : "text-stone-900 dark:text-cream-100"}`}>
                          {po.label}
                        </span>
                        <span className={`text-xs font-semibold mt-1 ${po.extra === 0 ? "text-green-600 dark:text-green-400" : "text-warm-600 dark:text-warm-400"}`}>
                          {po.extra === 0 ? "Included" : `+${fmt(po.extra)}`}
                        </span>
                        {pagesId === po.id && <Check size={14} className="text-warm-500 mt-2" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 2 – Features ── */}
              {step === 2 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-cream-100 mb-1">Which features do you need?</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">
                    Free features are pre-selected. Toggle add-ons to customise your quote.
                  </p>
                  {/* Free / Included */}
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-stone-400 dark:text-stone-600 uppercase tracking-widest mb-2">Always Included</p>
                    <div className="grid grid-cols-2 gap-2">
                      {FEATURES.filter(f => f.included).map(f => (
                        <div key={f.id}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-green-200 dark:border-green-800/40 bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-400 text-xs font-medium">
                          <Check size={11} className="flex-shrink-0 text-green-500" />
                          {f.label}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Add-ons */}
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 dark:text-stone-600 uppercase tracking-widest mb-2">Add-On Features</p>
                    <div className="grid grid-cols-2 gap-2">
                      {FEATURES.filter(f => !f.included).map(f => {
                        const on = features.includes(f.id);
                        return (
                          <button key={f.id} onClick={() => toggleFeature(f.id)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                              on
                                ? "border-warm-400/60 bg-warm-400/8 dark:bg-warm-400/6"
                                : "border-cream-400 dark:border-dark-50 hover:border-warm-400/40 hover:bg-cream-100 dark:hover:bg-dark-100"
                            }`}>
                            <span className={`text-xs font-medium leading-tight pr-1 ${on ? "text-warm-700 dark:text-warm-400" : "text-stone-700 dark:text-stone-300"}`}>
                              {f.label}
                            </span>
                            <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                              <span className="text-[10px] font-bold text-warm-600 dark:text-warm-400">+{fmt(f.cost)}</span>
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                on ? "bg-warm-400 border-warm-400" : "border-stone-300 dark:border-stone-600"
                              }`}>
                                {on && <Check size={9} className="text-white" />}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3 – Timeline ── */}
              {step === 3 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-cream-100 mb-1">What&apos;s your timeline?</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Rush projects carry a fee; flexible timelines get a discount.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TIMELINE_OPTIONS.map(tl => (
                      <button key={tl.id} onClick={() => setTimelineId(tl.id)}
                        className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200 ${
                          timelineId === tl.id
                            ? "border-warm-400/70 bg-warm-400/8 dark:bg-warm-400/6 shadow-[0_2px_12px_rgba(196,150,106,0.15)]"
                            : "border-cream-400 dark:border-dark-50 hover:border-warm-400/40 hover:bg-cream-100 dark:hover:bg-dark-100"
                        }`}>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`font-semibold text-sm ${timelineId === tl.id ? "text-warm-700 dark:text-warm-400" : "text-stone-900 dark:text-cream-100"}`}>
                              {tl.label}
                            </span>
                            {timelineId === tl.id && <Check size={14} className="text-warm-500 flex-shrink-0" />}
                          </div>
                          <span className="text-stone-500 dark:text-stone-400 text-xs">{tl.sub}</span>
                          <div className={`text-xs font-bold mt-1 ${
                            tl.modifier > 0 ? "text-red-500 dark:text-red-400"
                            : tl.modifier < 0 ? "text-green-600 dark:text-green-400"
                            : "text-stone-400"
                          }`}>
                            {tl.modifier > 0 ? `+${fmt(tl.modifier)} rush fee`
                             : tl.modifier < 0 ? `${fmt(tl.modifier)} discount`
                             : "No change"}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 4 – Details ── */}
              {step === 4 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-cream-100 mb-1">Your Details</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Almost done — just a few details so I can reach you.</p>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={lbl}>Name *</label>
                        <input
                          type="text" placeholder="Mohd Inayat" value={form.name}
                          onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: undefined })); }}
                          className={`${inp} ${errors.name ? "border-red-400 dark:border-red-500" : ""}`} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className={lbl}>Phone / WhatsApp *</label>
                        <input
                          type="tel" placeholder="+91 98765 43210" value={form.phone}
                          onChange={e => { setForm(p => ({ ...p, phone: e.target.value })); setErrors(p => ({ ...p, phone: undefined })); }}
                          className={`${inp} ${errors.phone ? "border-red-400 dark:border-red-500" : ""}`} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <label className={lbl}>Email <span className="normal-case font-normal text-stone-400">(optional)</span></label>
                      <input
                        type="email" placeholder="you@email.com" value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className={inp} />
                    </div>
                    <div>
                      <label className={lbl}>Project Description <span className="normal-case font-normal text-stone-400">(optional)</span></label>
                      <textarea
                        rows={4} placeholder="Any specific requirements, references, or goals..."
                        value={form.description}
                        onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                        className={`${inp} resize-none`} />
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 5 – Summary ── */}
              {step === 5 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-cream-100 mb-1">Your Quote Summary</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Here&apos;s everything at a glance. Send it to WhatsApp when ready.</p>

                  {/* Summary card */}
                  <div className="rounded-2xl border border-warm-400/30 bg-warm-400/5 dark:bg-warm-400/4 p-5 mb-6 space-y-3">
                    <SummaryRow label="Project Type" value={`${projectType?.emoji} ${projectType?.label}`} note={fmt(basePrice)} />
                    <SummaryRow label="Pages" value={pagesOption?.label ?? "—"} note={pagesExtra === 0 ? "Included" : `+${fmt(pagesExtra)}`} noteGreen={pagesExtra === 0} />
                    <SummaryRow label="Timeline" value={timelineOpt?.label ?? "—"}
                      note={timelineMod > 0 ? `+${fmt(timelineMod)}` : timelineMod < 0 ? `-${fmt(Math.abs(timelineMod))}` : "No change"}
                      noteGreen={timelineMod < 0} noteRed={timelineMod > 0} />

                    {/* Features */}
                    <div>
                      <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold block mb-1.5">Features</span>
                      <div className="flex flex-wrap gap-1.5">
                        {FEATURES.filter(f => features.includes(f.id)).map(f => (
                          <span key={f.id}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              f.cost === 0
                                ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/40"
                                : "bg-warm-400/10 text-warm-700 dark:text-warm-400 border border-warm-400/30"
                            }`}>
                            <Check size={8} />{f.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-warm-400/20 pt-3 mt-1 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mb-0.5">Total Estimate</p>
                        <p className="font-display text-3xl font-extrabold text-stone-900 dark:text-cream-100">{fmt(totalPrice)}</p>
                        <p className="text-stone-400 dark:text-stone-500 text-xs mt-0.5">~ ${usdPrice} USD</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-stone-500 dark:text-stone-400">For: {form.name}</p>
                        <p className="text-xs text-stone-400 dark:text-stone-500">{form.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <button onClick={sendWhatsApp}
                    className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(37,211,102,0.38)] active:scale-95"
                    style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                    <MessageCircle size={18} />
                    Send Quote on WhatsApp
                  </button>
                  <p className="text-stone-400 dark:text-stone-600 text-xs text-center mt-3">
                    Opens WhatsApp with your quote pre-filled · Free · No commitment
                  </p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* ── Navigation buttons ── */}
          <div className={`flex gap-3 px-6 md:px-8 pb-6 md:pb-8 ${step === 0 ? "justify-end" : "justify-between"}`}>
            {step > 0 && (
              <button onClick={back}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-stone-600 dark:text-stone-400 border border-cream-400 dark:border-dark-50 bg-cream-100 dark:bg-dark-100 hover:border-warm-400/50 hover:text-warm-700 dark:hover:text-warm-400 transition-all">
                <ChevronLeft size={15} /> Back
              </button>
            )}
            {step < 5 && (
              <button onClick={next}
                disabled={
                  (step === 0 && !projectId) ||
                  (step === 1 && !pagesId) ||
                  (step === 3 && !timelineId)
                }
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-warm-400 to-warm-700 hover:shadow-[0_4px_18px_rgba(196,150,106,0.40)] hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-200">
                {step === 4 ? "See Summary" : "Next"} <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>

        {/* ── Trust strip ── */}
        <TrustStrip />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function SummaryRow({ label, value, note, noteGreen, noteRed }: {
  label: string; value: string; note: string; noteGreen?: boolean; noteRed?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold w-24 flex-shrink-0">{label}</span>
      <span className="text-sm text-stone-800 dark:text-cream-200 font-medium flex-1">{value}</span>
      <span className={`text-xs font-bold flex-shrink-0 ${
        noteGreen ? "text-green-600 dark:text-green-400"
        : noteRed ? "text-red-500 dark:text-red-400"
        : "text-warm-600 dark:text-warm-400"
      }`}>
        {note}
      </span>
    </div>
  );
}

const perks = [
  { icon: Zap,    title: "Fast Delivery",  desc: "Most projects in 2–4 weeks"  },
  { icon: Clock,  title: "Quick Reply",    desc: "Response within 4 hours"      },
  { icon: Shield, title: "Clean Code",     desc: "Documented & yours to keep"   },
  { icon: Star,   title: "5★ Rated",       desc: "Consistent quality, every time"},
];

function TrustStrip() {
  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
      {perks.map(({ icon: Icon, title, desc }) => (
        <div key={title}
          className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200">
          <div className="w-9 h-9 rounded-xl bg-warm-400/10 border border-warm-400/20 flex items-center justify-center">
            <Icon size={16} className="text-warm-500 dark:text-warm-400" />
          </div>
          <div>
            <div className="text-stone-800 dark:text-cream-200 text-xs font-semibold">{title}</div>
            <div className="text-stone-400 dark:text-stone-500 text-[10px] mt-0.5">{desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
