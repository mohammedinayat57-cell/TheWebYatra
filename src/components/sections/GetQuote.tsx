"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Check, ChevronRight, ChevronLeft, Zap, Clock, Shield, Star, FileDown } from "lucide-react";

// ─── Step labels ───────────────────────────────────────────────────────────────
const STEP_LABELS = ["Project", "Pages", "Features", "Timeline", "Details", "Summary"];

// ─── Step 1 data ───────────────────────────────────────────────────────────────
const PROJECT_TYPES = [
  { id: "landing",    emoji: "🖥",  label: "Landing Page",      sub: "Single-page site for campaigns, services or lead generation",                         base: 10000 },
  { id: "business",   emoji: "🏢",  label: "Business Website",  sub: "Gyms, salons, clinics, agencies, shops, real estate — any local or service business", base: 18000 },
  { id: "ecommerce",  emoji: "🛒",  label: "E-Commerce Store",  sub: "Products, cart, checkout and online payments",                                        base: 30000 },
  { id: "restaurant", emoji: "🍽",  label: "Restaurant / Food", sub: "Menu, ordering, location and contact info",                                           base: 18000 },
  { id: "travel",     emoji: "✈️",  label: "Travel / Tourism",  sub: "Packages, destinations and enquiry / booking features",                               base: 25000 },
  { id: "other",      emoji: "💡",  label: "Other / Custom",    sub: "Not sure which fits? Describe it and we'll recommend the right solution",             base: 15000 },
] as const;

// ─── Step 2 data ───────────────────────────────────────────────────────────────
const PAGES_OPTIONS = [
  { id: "1-3",  label: "1–3 pages",  extra: 0     },
  { id: "4-7",  label: "4–7 pages",  extra: 3000  },
  { id: "8-15", label: "8–15 pages", extra: 7000  },
  { id: "15+",  label: "15+ pages",  extra: 12000 },
] as const;

// ─── Step 3 data ───────────────────────────────────────────────────────────────
interface Feature { id: string; label: string; cost: number; _included: boolean; }

const FEATURES: Feature[] = [
  // Always _included — ₹0
  { id: "responsive",  label: "Mobile Responsive Design",       cost: 0,    _included: true  },
  { id: "basic-seo",   label: "Basic SEO Setup",                cost: 0,    _included: true  },
  { id: "contact",     label: "Contact Form",                   cost: 0,    _included: true  },
  { id: "ssl",         label: "SSL / HTTPS",                    cost: 0,    _included: true  },
  { id: "social-link", label: "Social Media Links",             cost: 0,    _included: true  },
  { id: "maps",        label: "Google Maps / Location",         cost: 0,    _included: true  },
  { id: "perf",        label: "Basic Performance Optimization", cost: 0,    _included: true  },
  { id: "social-int",  label: "Social Media Integration",       cost: 0,    _included: true  },
  // Optional add-ons
  { id: "whatsapp",    label: "WhatsApp Integration",           cost: 0,    _included: true  },
  { id: "payment",     label: "Payment Gateway",                cost: 5000, _included: false },
  { id: "admin",       label: "Admin Panel",                    cost: 8000, _included: false },
  { id: "blog",        label: "Blog / News Section",            cost: 3000, _included: false },
  { id: "adv-seo",     label: "Advanced SEO",                   cost: 5000, _included: false },
  { id: "livechat",    label: "Live Chat / Chat Widget",        cost: 2000, _included: false },
  { id: "auth",        label: "User Login / Authentication",    cost: 7000, _included: false },
  { id: "multilang",   label: "Multi-language Support",         cost: 5000, _included: false },
];

// ─── Step 4 data ───────────────────────────────────────────────────────────────
const TIMELINE_OPTIONS = [
  { id: "rush",    label: "ASAP / Rush", sub: "Within 1 week",     modifier:  7000 },
  { id: "2-3w",    label: "2–3 Weeks",   sub: "Standard pace",     modifier:  0    },
  { id: "2months", label: "2+ Months",   sub: "Flexible delivery", modifier: -2000 },
];

const fmt = (n: number) => "₹" + Math.abs(n).toLocaleString("en-IN");

// ─── Component ─────────────────────────────────────────────────────────────────
export default function GetQuote() {
  const [step,       setStep]       = useState(0);
  const [projectId,  setProjectId]  = useState("");
  const [pagesId,    setPagesId]    = useState("");
  const [features,   setFeatures]   = useState<string[]>(
    () => FEATURES.filter(f => f._included).map(f => f.id)
  );
  const [timelineId, setTimelineId] = useState("");
  const [form,       setForm]       = useState({ name: "", phone: "", email: "", description: "" });
  const [fieldErr,   setFieldErr]   = useState<{ name?: string; phone?: string }>({});

  // ── Derived ────────────────────────────────────────────────────────────────
  const projectType  = PROJECT_TYPES.find(p => p.id === projectId);
  const pagesOption  = PAGES_OPTIONS.find(p => p.id === pagesId);
  const timelineOpt  = TIMELINE_OPTIONS.find(t => t.id === timelineId);
  const featureTotal = FEATURES.filter(f => features.includes(f.id) && f.cost > 0).reduce((s, f) => s + f.cost, 0);
  const basePrice    = projectType?.base ?? 0;
  const pagesExtra   = pagesOption?.extra ?? 0;
  const timelineMod  = timelineOpt?.modifier ?? 0;
  const totalPrice   = basePrice + pagesExtra + featureTotal + timelineMod;
  const usdPrice     = Math.round(totalPrice / 85);

  // ── Step validation ────────────────────────────────────────────────────────
  const canNext = useCallback(() => {
    if (step === 0) return !!projectId;
    if (step === 1) return !!pagesId;
    if (step === 3) return !!timelineId;
    if (step === 4) {
      const e: { name?: string; phone?: string } = {};
      if (!form.name.trim())  e.name  = "Name is required";
      if (!form.phone.trim()) e.phone = "Phone / WhatsApp is required";
      setFieldErr(e);
      return Object.keys(e).length === 0;
    }
    return true;
  }, [step, projectId, pagesId, timelineId, form]);

  const next         = () => { if (canNext()) setStep(s => Math.min(s + 1, 5)); };
  const back         = () => setStep(s => Math.max(s - 1, 0));
  const toggleFeature = (id: string) =>
    setFeatures(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id]);

  // ── Download PDF (professional SRS-style document) ───────────────────────
  const downloadPDF = async () => {
    const selectedFeatures = FEATURES.filter(f => features.includes(f.id));
    const included = selectedFeatures.filter(f => f.cost === 0).map(f => f.label);
    const addons   = selectedFeatures.filter(f => f.cost > 0);
    const date = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
    const qno  = `TWY-${Date.now().toString().slice(-6)}`;

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const W   = doc.internal.pageSize.getWidth();   // 210mm
      const M   = 15;  // left margin
      const RM  = W - M; // right margin position

      // ─────────────────────────────────────────────────────────────
      // HEADER
      // ─────────────────────────────────────────────────────────────
      doc.setFillColor(28, 22, 12);
      doc.rect(0, 0, W, 32, "F");
      doc.setFillColor(196, 150, 106);
      doc.rect(0, 29, W, 2, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18); doc.setFont("helvetica", "bold");
      doc.text("TheWebYatra", M, 13);
      doc.setFontSize(7.5); doc.setFont("helvetica", "normal");
      doc.setTextColor(196, 150, 106);
      doc.text("WE CODE. YOU GROW.", M, 19);
      doc.setTextColor(180, 160, 130);
      doc.text(`thewebyatra.com  |  support@thewebyatra.com  |  +91 89202 91416`, M, 25);

      // Right side: Quote No + Date
      doc.setFont("helvetica", "bold"); doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text(`Quote No: ${qno}`, RM, 13, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${date}`, RM, 19, { align: "right" });

      let y = 42;

      // ─────────────────────────────────────────────────────────────
      // DOCUMENT TITLE
      // ─────────────────────────────────────────────────────────────
      doc.setFontSize(14); doc.setFont("helvetica", "bold"); doc.setTextColor(28, 22, 12);
      doc.text("SOFTWARE REQUIREMENTS & QUOTATION DOCUMENT", M, y); y += 3;
      doc.setLineWidth(0.6); doc.setDrawColor(196, 150, 106);
      doc.line(M, y, RM, y); y += 8;

      // ─────────────────────────────────────────────────────────────
      // CLIENT DETAILS BOX
      // ─────────────────────────────────────────────────────────────
      doc.setFillColor(252, 248, 242);
      doc.setLineWidth(0.25); doc.setDrawColor(220, 200, 170);
      doc.roundedRect(M, y, W - M * 2, 24, 2, 2, "FD");
      doc.setFontSize(8); doc.setFont("helvetica", "bold"); doc.setTextColor(139, 94, 60);
      doc.text("PREPARED FOR", M + 4, y + 7);
      doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(40, 25, 10);
      doc.text(form.name || "—", M + 4, y + 14);
      doc.setFontSize(8); doc.setTextColor(80, 60, 40);
      doc.text(`Phone: ${form.phone}${form.email ? "   |   Email: " + form.email : ""}`, M + 4, y + 20);
      y += 30;

      // ─────────────────────────────────────────────────────────────
      // SECTION 1 — PROJECT SCOPE
      // ─────────────────────────────────────────────────────────────
      const sectionTitle = (title: string) => {
        doc.setFontSize(10); doc.setFont("helvetica", "bold"); doc.setTextColor(139, 94, 60);
        doc.text(title, M, y); y += 1.5;
        doc.setLineWidth(0.25); doc.setDrawColor(220, 200, 170);
        doc.line(M, y, RM, y); y += 5;
      };

      sectionTitle("1. PROJECT SCOPE");

      // Table header
      const col1 = M, col2 = M + 52, col3 = M + 110, col4 = RM;
      doc.setFontSize(8); doc.setFont("helvetica", "bold"); doc.setTextColor(100, 70, 30);
      doc.setFillColor(245, 238, 225);
      doc.rect(M, y - 2, W - M * 2, 8, "F");
      doc.text("ITEM", col1 + 2, y + 4);
      doc.text("SPECIFICATION", col2, y + 4);
      doc.text("REMARKS", col3, y + 4);
      doc.text("AMOUNT", col4, y + 4, { align: "right" });
      y += 9;
      doc.setLineWidth(0.2); doc.line(M, y - 1, RM, y - 1);

      const tableRow = (item: string, spec: string, remark: string, amount: string, shade = false) => {
        if (shade) { doc.setFillColor(250, 246, 240); doc.rect(M, y - 2, W - M * 2, 8, "F"); }
        doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(40, 28, 12);
        doc.text(item, col1 + 2, y + 4);
        doc.text(spec, col2, y + 4);
        doc.text(remark, col3, y + 4);
        doc.setFont("helvetica", "bold"); doc.setTextColor(139, 94, 60);
        doc.text(amount, col4, y + 4, { align: "right" });
        doc.setLineWidth(0.1); doc.setDrawColor(230, 215, 195);
        doc.line(M, y + 6, RM, y + 6);
        y += 8;
      };

      tableRow("Project Type",  projectType?.label ?? "—",    "Base Development",  fmt(basePrice));
      tableRow("Pages / Screens", pagesOption?.label ?? "—",   "UI Screens",         pagesExtra > 0 ? `+${fmt(pagesExtra)}` : "Included", true);
      tableRow("Timeline",       timelineOpt?.label ?? "—",    "Delivery Schedule",
        timelineMod > 0 ? `+${fmt(timelineMod)} rush` : timelineMod < 0 ? `-${fmt(Math.abs(timelineMod))}` : "Standard");

      if (featureTotal > 0) {
        tableRow("Add-on Features", `${addons.length} feature(s)`, "Extra Modules", `+${fmt(featureTotal)}`, true);
      }

      y += 2;

      // Total row
      doc.setFillColor(28, 22, 12);
      doc.rect(M, y, W - M * 2, 11, "F");
      doc.setFontSize(10); doc.setFont("helvetica", "bold"); doc.setTextColor(255, 255, 255);
      doc.text("TOTAL DEVELOPMENT ESTIMATE", col1 + 4, y + 7.5);
      doc.setFontSize(12); doc.setTextColor(196, 150, 106);
      doc.text(fmt(totalPrice), col4, y + 7.5, { align: "right" });
      y += 13;

      doc.setFontSize(7.5); doc.setFont("helvetica", "italic"); doc.setTextColor(120, 90, 50);
      doc.text(`(Approx. USD ${usdPrice} at current exchange rate)`, col4, y, { align: "right" });
      y += 8;

      // ─────────────────────────────────────────────────────────────
      // IMPORTANT NOTE
      // ─────────────────────────────────────────────────────────────
      doc.setFillColor(255, 248, 230);
      doc.setLineWidth(0.3); doc.setDrawColor(220, 170, 80);
      doc.roundedRect(M, y, W - M * 2, 18, 2, 2, "FD");
      doc.setFontSize(8.5); doc.setFont("helvetica", "bold"); doc.setTextColor(160, 100, 20);
      doc.text("⚠  IMPORTANT NOTICE", M + 4, y + 7);
      doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(80, 55, 15);
      doc.text("This quote covers DEVELOPMENT CHARGES ONLY. Domain registration, hosting/server charges,", M + 4, y + 13);
      doc.text("third-party API fees, and database hosting costs are NOT included and billed separately.", M + 4, y + 18);
      y += 24;

      // ─────────────────────────────────────────────────────────────
      // SECTION 2 — INCLUDED FEATURES
      // ─────────────────────────────────────────────────────────────
      sectionTitle("2. FEATURES INCLUDED IN SCOPE");

      if (included.length) {
        doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(34, 120, 60);
        doc.text("Standard Features (Included Free)", M + 2, y); y += 5;
        doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(30, 80, 40);
        const half = Math.ceil(included.length / 2);
        included.forEach((l, i) => {
          const cx = i < half ? M + 2 : M + (W - M * 2) / 2 + 5;
          const cy = y + (i < half ? i : i - half) * 6;
          doc.text(`✓  ${l}`, cx, cy);
        });
        y += Math.ceil(included.length / 2) * 6 + 5;
      }

      if (addons.length) {
        doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(139, 94, 60);
        doc.text("Additional Features (Add-ons)", M + 2, y); y += 5;
        addons.forEach((f, i) => {
          const cx = i % 2 === 0 ? M + 2 : M + (W - M * 2) / 2 + 5;
          if (i % 2 === 0 && i > 0) y += 6;
          doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(80, 50, 20);
          doc.text(`+  ${f.label}`, cx, y);
          doc.setFont("helvetica", "bold"); doc.setTextColor(139, 94, 60);
          if (i % 2 === 0) doc.text(`+${fmt(f.cost)}`, col4, y, { align: "right" });
        });
        y += 10;
      }

      // Free maintenance note
      doc.setFillColor(240, 252, 245);
      doc.setLineWidth(0.25); doc.setDrawColor(100, 200, 130);
      doc.roundedRect(M, y, W - M * 2, 10, 2, 2, "FD");
      doc.setFontSize(8.5); doc.setFont("helvetica", "bold"); doc.setTextColor(20, 130, 60);
      doc.text("✓  1 Month FREE Post-Launch Maintenance & Bug Fixes Included", M + 4, y + 6.5);
      y += 16;

      // ─────────────────────────────────────────────────────────────
      // SECTION 3 — PROJECT NOTES
      // ─────────────────────────────────────────────────────────────
      if (form.description) {
        sectionTitle("3. CLIENT REQUIREMENTS / NOTES");
        doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(50, 35, 15);
        const noteLines = doc.splitTextToSize(form.description, W - M * 2 - 4);
        doc.text(noteLines, M + 2, y);
        y += noteLines.length * 6 + 8;
      }

      // ─────────────────────────────────────────────────────────────
      // SECTION 4 — TERMS & CONDITIONS
      // ─────────────────────────────────────────────────────────────
      const termNum = form.description ? "4" : "3";
      sectionTitle(`${termNum}. TERMS & CONDITIONS`);

      const terms = [
        ["Validity",       "This quotation is valid for 30 days from the date of issue."],
        ["Advance Payment","50% of the total amount is required before project commencement."],
        ["Balance Payment","Remaining 50% is due upon project completion before final delivery."],
        ["Timeline",       "Delivery timeline starts after advance payment and signed requirement confirmation."],
        ["Scope Changes",  "Any additional features or changes outside this scope will be quoted separately."],
        ["Exclusions",     "Domain, hosting, server, database, and third-party API costs are NOT included."],
        ["Maintenance",    "1 month free post-launch bug fixes. Extended maintenance available on request."],
        ["Ownership",      "Full source code and assets transferred to client upon complete payment."],
      ];

      doc.setFontSize(8.5);
      terms.forEach(([title, detail], i) => {
        if (i % 2 === 0) { doc.setFillColor(250, 246, 240); doc.rect(M, y - 2, W - M * 2, 7.5, "F"); }
        doc.setFont("helvetica", "bold"); doc.setTextColor(100, 70, 30);
        doc.text(`${i + 1}. ${title}:`, M + 2, y + 3.5);
        doc.setFont("helvetica", "normal"); doc.setTextColor(50, 35, 15);
        doc.text(detail, M + 38, y + 3.5);
        doc.setLineWidth(0.1); doc.setDrawColor(230, 215, 195);
        doc.line(M, y + 5.5, RM, y + 5.5);
        y += 8;
      });
      y += 6;

      // ─────────────────────────────────────────────────────────────
      // FOOTER
      // ─────────────────────────────────────────────────────────────
      doc.setLineWidth(0.5); doc.setDrawColor(196, 150, 106);
      doc.line(M, y, RM, y); y += 6;
      doc.setFontSize(8.5); doc.setFont("helvetica", "bold"); doc.setTextColor(139, 94, 60);
      doc.text("Thank you for choosing TheWebYatra. We look forward to building something great together!", M, y);
      y += 6;
      doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(140, 110, 70);
      doc.text(`${qno}  |  support@thewebyatra.com  |  +91 89202 91416  |  thewebyatra.com`, M, y);

      doc.save(`TheWebYatra_Quotation_${form.name.replace(/\s+/g, "_") || "Client"}_${qno}.pdf`);
    } catch (err) {
      console.error("PDF error:", err);
      alert("PDF generation failed. Please try again.");
    }
  };

  // ── Send full quote on WhatsApp (all details in message) ──────────────────
  const sendOnWhatsApp = () => {
    const selectedFeatures = FEATURES.filter(f => features.includes(f.id));
    const allFeaturesList = selectedFeatures.map(f =>
      `  • ${f.label}${f.cost > 0 ? ` (+${fmt(f.cost)})` : " ✓ FREE"}`
    ).join("\n");

    const msg = [
      `*📄 Project Quote — TheWebYatra*`,
      `────────────────────────────`,
      ``,
      `*👤 Client Details*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      ``,
      `*🛠 Project Details*`,
      `Type: ${projectType?.label ?? "—"}  (${fmt(basePrice)})`,
      `Pages: ${pagesOption?.label ?? "—"}${pagesExtra > 0 ? `  (+${fmt(pagesExtra)})` : "  (Included)"}`,
      `Timeline: ${timelineOpt?.label ?? "—"}${timelineMod !== 0 ? `  (${timelineMod > 0 ? "+" : ""}${fmt(timelineMod)})` : ""}`,
      ``,
      `*✅ Features Included*`,
      allFeaturesList,
      ``,
      `*💰 Pricing Breakdown*`,
      `Base Price: ${fmt(basePrice)}`,
      pagesExtra > 0 ? `Pages Add-on: +${fmt(pagesExtra)}` : "",
      featureTotal > 0 ? `Add-on Features: +${fmt(featureTotal)}` : "",
      timelineMod !== 0 ? `Timeline Adjustment: ${timelineMod > 0 ? "+" : ""}${fmt(timelineMod)}` : "",
      `────────────────────────────`,
      `*TOTAL ESTIMATE: ${fmt(totalPrice)}*`,
      `*(~ $${usdPrice} USD)*`,
      ``,
      form.description ? `*📝 Notes:*\n${form.description}\n` : "",
      `*Terms:* 50% advance to start · Valid 30 days`,
      ``,
      `_TheWebYatra — We Code. You Grow._`,
      `support@thewebyatra.com | +91 89202 91416`,
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/918920291416?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // ── Styles ─────────────────────────────────────────────────────────────────
  const inp = "w-full px-4 py-3 rounded-xl bg-cream-100 dark:bg-dark-100 border border-cream-400 dark:border-dark-50 text-stone-900 dark:text-cream-100 text-sm placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-warm-400/60 transition-colors";
  const lbl = "block text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5";

  return (
    <section id="quote" className="relative py-16 md:py-24 bg-cream-50 dark:bg-dark-300 overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 animated-grid opacity-40 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-400/30 bg-warm-400/10 text-warm-700 dark:text-warm-400 text-sm font-medium mb-5">
            <MessageCircle size={13} /> Free Custom Quote
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 dark:text-cream-100 mb-4 leading-tight">
            Build Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-warm-500 via-warm-600 to-warm-800 dark:from-warm-400 dark:via-warm-500 dark:to-warm-600">
              Custom Quote
            </span>
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-base max-w-xl mx-auto">
            5 quick steps → instant PDF quote → sent to WhatsApp. No emails, no waiting.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-4 left-8 right-8 h-0.5 bg-cream-400 dark:bg-dark-50 z-0" />
            <div
              className="absolute top-4 left-8 h-0.5 bg-gradient-to-r from-warm-400 to-warm-600 z-0 transition-all duration-500"
              style={{ width: `calc(${(step / (STEP_LABELS.length - 1)) * 100}% - 4rem)` }}
            />
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="relative z-10 flex flex-col items-center gap-1.5">
                <button
                  onClick={() => i < step && setStep(i)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2 ${
                    i < step
                      ? "bg-gradient-to-br from-warm-400 to-warm-600 border-warm-400 text-white cursor-pointer"
                      : i === step
                      ? "bg-gradient-to-br from-warm-400 to-warm-600 border-warm-500 text-white shadow-[0_0_0_3px_rgba(196,150,106,0.25)]"
                      : "bg-cream-100 dark:bg-dark-200 border-cream-400 dark:border-dark-50 text-stone-400 cursor-default"
                  }`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </button>
                <span className={`text-[10px] font-semibold hidden sm:block ${i <= step ? "text-warm-600 dark:text-warm-400" : "text-stone-400 dark:text-stone-600"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live price chip */}
        {totalPrice > 0 && (
          <motion.div className="flex justify-center mb-5"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-400/10 border border-warm-400/30">
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Estimate:</span>
              <span className="font-display font-bold text-xl text-warm-600 dark:text-warm-400">{fmt(totalPrice)}</span>
              <span className="text-xs text-stone-400 dark:text-stone-500">~ ${usdPrice} USD</span>
            </div>
          </motion.div>
        )}

        {/* Step card */}
        <div className="rounded-3xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200 overflow-hidden shadow-sm" style={{ minHeight: "420px" }}>
          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }}
              className="p-6 md:p-8">

              {/* ── Step 0 — Project type ───────────────────────────────────── */}
              {step === 0 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-cream-100 mb-1">What type of project do you need?</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Pick the option that best describes your project.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PROJECT_TYPES.map(pt => (
                      <button key={pt.id} onClick={() => setProjectId(pt.id)}
                        className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
                          projectId === pt.id
                            ? "border-warm-400/70 bg-warm-400/8 dark:bg-warm-400/6 shadow-sm"
                            : "border-cream-400 dark:border-dark-50 hover:border-warm-400/40 hover:bg-cream-100 dark:hover:bg-dark-100"
                        }`}>
                        <span className="text-2xl flex-shrink-0 mt-0.5">{pt.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`font-semibold text-sm ${projectId === pt.id ? "text-warm-700 dark:text-warm-400" : "text-stone-900 dark:text-cream-100"}`}>{pt.label}</span>
                            {projectId === pt.id && <Check size={13} className="text-warm-500 flex-shrink-0" />}
                          </div>
                          <span className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">{pt.sub}</span>
                          <div className="text-warm-600 dark:text-warm-400 text-xs font-bold mt-1">From {fmt(pt.base)}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Step 1 — Pages ──────────────────────────────────────────── */}
              {step === 1 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-cream-100 mb-1">How many pages do you need?</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-2">Estimate the number of unique pages on your site.</p>
                  {(projectId === "ecommerce") && (
                    <div className="mb-4 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 text-amber-700 dark:text-amber-400 text-xs">
                      💡 For E-Commerce, pricing is primarily based on features. Page count is a rough guide.
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {PAGES_OPTIONS.map(po => (
                      <button key={po.id} onClick={() => setPagesId(po.id)}
                        className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all text-center ${
                          pagesId === po.id
                            ? "border-warm-400/70 bg-warm-400/8 dark:bg-warm-400/6 shadow-sm"
                            : "border-cream-400 dark:border-dark-50 hover:border-warm-400/40 hover:bg-cream-100 dark:hover:bg-dark-100"
                        }`}>
                        <span className={`font-display font-bold text-lg ${pagesId === po.id ? "text-warm-600 dark:text-warm-400" : "text-stone-900 dark:text-cream-100"}`}>{po.label}</span>
                        <span className={`text-xs font-semibold mt-1 ${po.extra === 0 ? "text-green-600 dark:text-green-400" : "text-warm-600 dark:text-warm-400"}`}>
                          {po.extra === 0 ? "_included" : `+${fmt(po.extra)}`}
                        </span>
                        {pagesId === po.id && <Check size={13} className="text-warm-500 mt-1.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Step 2 — Features ───────────────────────────────────────── */}
              {step === 2 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-cream-100 mb-1">Which features do you need?</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-5">Free features are always _included. Toggle add-ons to customise your price.</p>
                  {/* Free */}
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-stone-400 dark:text-stone-600 uppercase tracking-widest mb-2">Always _included (Free)</p>
                    <div className="grid grid-cols-2 gap-2">
                      {FEATURES.filter(f => f._included).map(f => (
                        <div key={f.id} className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-green-200 dark:border-green-800/40 bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-400 text-xs font-medium">
                          <Check size={10} className="flex-shrink-0 text-green-500" />{f.label}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Add-ons */}
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 dark:text-stone-600 uppercase tracking-widest mb-2">Optional Add-Ons</p>
                    <div className="grid grid-cols-2 gap-2">
                      {FEATURES.filter(f => !f._included).map(f => {
                        const on = features.includes(f.id);
                        return (
                          <button key={f.id} onClick={() => toggleFeature(f.id)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all ${
                              on ? "border-warm-400/60 bg-warm-400/8 dark:bg-warm-400/6"
                                 : "border-cream-400 dark:border-dark-50 hover:border-warm-400/40 hover:bg-cream-100 dark:hover:bg-dark-100"
                            }`}>
                            <span className={`text-xs font-medium leading-tight pr-1 ${on ? "text-warm-700 dark:text-warm-400" : "text-stone-700 dark:text-stone-300"}`}>{f.label}</span>
                            <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                              <span className="text-[10px] font-bold text-warm-600 dark:text-warm-400">+{fmt(f.cost)}</span>
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${on ? "bg-warm-400 border-warm-400" : "border-stone-300 dark:border-stone-600"}`}>
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

              {/* ── Step 3 — Timeline ───────────────────────────────────────── */}
              {step === 3 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-cream-100 mb-1">What&apos;s your timeline?</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Rush projects carry a fee. Flexible timelines get a discount.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {TIMELINE_OPTIONS.map(tl => (
                      <button key={tl.id} onClick={() => setTimelineId(tl.id)}
                        className={`flex items-start p-4 rounded-2xl border text-left transition-all ${
                          timelineId === tl.id
                            ? "border-warm-400/70 bg-warm-400/8 dark:bg-warm-400/6 shadow-sm"
                            : "border-cream-400 dark:border-dark-50 hover:border-warm-400/40 hover:bg-cream-100 dark:hover:bg-dark-100"
                        }`}>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`font-semibold text-sm ${timelineId === tl.id ? "text-warm-700 dark:text-warm-400" : "text-stone-900 dark:text-cream-100"}`}>{tl.label}</span>
                            {timelineId === tl.id && <Check size={13} className="text-warm-500 flex-shrink-0" />}
                          </div>
                          <span className="text-stone-500 dark:text-stone-400 text-xs">{tl.sub}</span>
                          <div className={`text-xs font-bold mt-1 ${tl.modifier > 0 ? "text-red-500 dark:text-red-400" : tl.modifier < 0 ? "text-green-600 dark:text-green-400" : "text-stone-400"}`}>
                            {tl.modifier > 0 ? `+${fmt(tl.modifier)} rush fee`
                              : tl.modifier < 0 ? `-${fmt(Math.abs(tl.modifier))} discount`
                              : "No change"}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Step 4 — Details ────────────────────────────────────────── */}
              {step === 4 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-cream-100 mb-1">Your Contact Details</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Almost done — so we can reach you with the quote.</p>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={lbl}>Name *</label>
                        <input type="text" placeholder="Your Name" value={form.name}
                          onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setFieldErr(p => ({ ...p, name: undefined })); }}
                          className={`${inp} ${fieldErr.name ? "border-red-400" : ""}`} />
                        {fieldErr.name && <p className="text-red-500 text-xs mt-1">{fieldErr.name}</p>}
                      </div>
                      <div>
                        <label className={lbl}>WhatsApp / Phone *</label>
                        <input type="tel" placeholder="Your WhatsApp number" value={form.phone}
                          onChange={e => { setForm(p => ({ ...p, phone: e.target.value })); setFieldErr(p => ({ ...p, phone: undefined })); }}
                          className={`${inp} ${fieldErr.phone ? "border-red-400" : ""}`} />
                        {fieldErr.phone && <p className="text-red-500 text-xs mt-1">{fieldErr.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <label className={lbl}>Email <span className="normal-case font-normal text-stone-400">(optional)</span></label>
                      <input type="email" placeholder="you@email.com" value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inp} />
                    </div>
                    <div>
                      <label className={lbl}>Project Notes <span className="normal-case font-normal text-stone-400">(optional)</span></label>
                      <textarea rows={3} placeholder="Any specific requirements, references, or goals..."
                        value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                        className={`${inp} resize-none`} />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 5 — Summary ────────────────────────────────────────── */}
              {step === 5 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-cream-100 mb-1">Your Quote Summary</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Review everything below, then get your PDF quote on WhatsApp.</p>

                  {/* Breakdown card */}
                  <div className="rounded-2xl border border-warm-400/30 bg-warm-400/5 dark:bg-warm-400/4 p-5 mb-5 space-y-3">
                    <SumRow label="Base Price"  value={`${projectType?.emoji} ${projectType?.label ?? "—"}`} note={fmt(basePrice)} />
                    {pagesExtra > 0 && <SumRow label="Pages"       value={pagesOption?.label ?? "—"}          note={`+${fmt(pagesExtra)}`} />}
                    {featureTotal > 0 && <SumRow label="Add-ons"   value={`${FEATURES.filter(f => features.includes(f.id) && f.cost > 0).length} feature(s)`} note={`+${fmt(featureTotal)}`} />}
                    {timelineMod !== 0 && (
                      <SumRow label="Timeline"  value={timelineOpt?.label ?? "—"}
                        note={timelineMod > 0 ? `+${fmt(timelineMod)} rush` : `-${fmt(Math.abs(timelineMod))} disc.`}
                        green={timelineMod < 0} red={timelineMod > 0} />
                    )}

                    {/* Feature pills */}
                    <div>
                      <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold block mb-2">_included Features</span>
                      <div className="flex flex-wrap gap-1.5">
                        {FEATURES.filter(f => features.includes(f.id)).map(f => (
                          <span key={f.id} className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                            f.cost === 0
                              ? "bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/40"
                              : "bg-warm-400/10 text-warm-700 dark:text-warm-400 border-warm-400/30"
                          }`}>
                            <Check size={7} />{f.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="border-t border-warm-400/20 pt-3 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mb-0.5">Estimated Project Cost</p>
                        <p className="font-display text-3xl font-extrabold text-stone-900 dark:text-cream-100">{fmt(totalPrice)}</p>
                        <p className="text-stone-400 dark:text-stone-500 text-xs mt-0.5">~ ${usdPrice} USD</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-stone-500 dark:text-stone-400">{form.name}</p>
                        <p className="text-xs text-stone-400 dark:text-stone-500">{form.phone}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-stone-400 dark:text-stone-600 text-xs text-center mb-4 italic">
                    Final price may vary depending on exact requirements.
                  </p>

                  {/* Two separate action buttons */}
                  <button onClick={downloadPDF}
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full font-bold text-white text-base transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,150,106,0.35)] mb-3"
                    style={{ background: "linear-gradient(135deg, #8B5E3C, #C4966A)" }}>
                    <FileDown size={17} />
                    Download PDF Quotation
                  </button>

                  <button onClick={sendOnWhatsApp}
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full font-bold text-white text-base transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,211,102,0.38)] mb-3"
                    style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                    <MessageCircle size={17} />
                    Send Full Quote on WhatsApp
                  </button>

                  <p className="text-stone-400 dark:text-stone-600 text-xs text-center">
                    PDF downloads to your device · WhatsApp message includes all details
                  </p>

                  {/* Secondary — talk directly */}
                  <a href="https://wa.me/918920291416" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-warm-700 dark:text-warm-400 text-sm border border-warm-400/40 bg-cream-100 dark:bg-dark-100 hover:bg-cream-200 dark:hover:bg-dark-50 transition-all">
                    <MessageCircle size={15} /> Talk on WhatsApp
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className={`flex gap-3 px-6 md:px-8 pb-6 md:pb-8 ${step === 0 ? "justify-end" : "justify-between"}`}>
            {step > 0 && (
              <button onClick={back}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-stone-600 dark:text-stone-400 border border-cream-400 dark:border-dark-50 bg-cream-100 dark:bg-dark-100 hover:border-warm-400/50 hover:text-warm-700 dark:hover:text-warm-400 transition-all">
                <ChevronLeft size={15} /> Back
              </button>
            )}
            {step < 5 && (
              <button onClick={next}
                disabled={(step === 0 && !projectId) || (step === 1 && !pagesId) || (step === 3 && !timelineId)}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-warm-400 to-warm-700 hover:shadow-[0_4px_18px_rgba(196,150,106,0.40)] hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all">
                {step === 4 ? "See Summary" : "Next"} <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {([
            { icon: Zap,    title: "Fast Delivery",  desc: "Most projects in 2–4 weeks"   },
            { icon: Clock,  title: "Quick Reply",    desc: "Response within 1 hour"       },
            { icon: Shield, title: "Clean Code",     desc: "Documented & yours to keep"    },
            { icon: Star,   title: "5★ Rated",       desc: "Consistent quality, every time"},
          ] as const).map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl border border-cream-400 dark:border-dark-50 bg-white dark:bg-dark-200">
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
      </div>
    </section>
  );
}

// ─── Helper sub-component ──────────────────────────────────────────────────────
function SumRow({ label, value, note, green, red }: {
  label: string; value: string; note: string; green?: boolean; red?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold w-24 flex-shrink-0">{label}</span>
      <span className="text-sm text-stone-800 dark:text-cream-200 font-medium flex-1">{value}</span>
      <span className={`text-xs font-bold flex-shrink-0 ${green ? "text-green-600 dark:text-green-400" : red ? "text-red-500 dark:text-red-400" : "text-warm-600 dark:text-warm-400"}`}>
        {note}
      </span>
    </div>
  );
}
