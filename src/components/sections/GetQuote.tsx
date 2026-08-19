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
interface Feature { id: string; label: string; cost: number; included: boolean; }

const FEATURES: Feature[] = [
  // Always _included — ₹0
  { id: "responsive",  label: "Mobile Responsive Design",       cost: 0,    included: true  },
  { id: "basic-seo",   label: "Basic SEO Setup",                cost: 0,    included: true  },
  { id: "contact",     label: "Contact Form",                   cost: 0,    included: true  },
  { id: "ssl",         label: "SSL / HTTPS",                    cost: 0,    included: true  },
  { id: "social-link", label: "Social Media Links",             cost: 0,    included: true  },
  { id: "maps",        label: "Google Maps / Location",         cost: 0,    included: true  },
  { id: "perf",        label: "Basic Performance Optimization", cost: 0,    included: true  },
  { id: "social-int",  label: "Social Media Integration",       cost: 0,    included: true  },
  // Optional add-ons
  { id: "whatsapp",    label: "WhatsApp Integration",           cost: 0,    included: true  },
  { id: "payment",     label: "Payment Gateway",                cost: 5000, included: false },
  { id: "admin",       label: "Admin Panel",                    cost: 8000, included: false },
  { id: "blog",        label: "Blog / News Section",            cost: 3000, included: false },
  { id: "adv-seo",     label: "Advanced SEO",                   cost: 5000, included: false },
  { id: "livechat",    label: "Live Chat / Chat Widget",        cost: 5000, included: false },
  { id: "auth",        label: "User Login / Authentication",    cost: 7000, included: false },
  { id: "multilang",   label: "Multi-language Support",         cost: 2000, included: false },
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
    () => FEATURES.filter(f => f.included).map(f => f.id)
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

  const next = () => {
    if (canNext()) {
      setStep(s => Math.min(s + 1, 5));
      setTimeout(() => {
        const el = document.getElementById("quote");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };
  const back = () => {
    setStep(s => Math.max(s - 1, 0));
    setTimeout(() => {
      const el = document.getElementById("quote");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };
  const toggleFeature = (id: string) =>
    setFeatures(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id]);

  // ── Download PDF (professional SRS-style document) ───────────────────────
  const downloadPDF = async () => {
    const selectedFeatures = FEATURES.filter(f => features.includes(f.id));
    const freeFeatures = selectedFeatures.filter(f => f.cost === 0).map(f => f.label);
    const paidFeatures = selectedFeatures.filter(f => f.cost > 0);
    const date = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
    const qno  = "TWY-" + Date.now().toString().slice(-6);

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const PW = 210; const PH = 297;
      const ML = 15; const MR = 15;
      const CW = PW - ML - MR; // content width = 180mm
      const PR = PW - MR;      // right edge

      let y = 0;
      let page = 1;

      // ── helpers ────────────────────────────────────────────────────────
      const newPage = () => {
        doc.addPage();
        page++;
        y = 15;
        // page number footer
        doc.setFontSize(7); doc.setFont("helvetica","normal"); doc.setTextColor(160,130,90);
        doc.text(`TheWebYatra  |  ${qno}  |  Page ${page}`, PW/2, PH - 8, { align: "center" });
      };

      const checkY = (needed: number) => {
        if (y + needed > PH - 20) newPage();
      };

      const secTitle = (n: string, title: string) => {
        checkY(14);
        doc.setFontSize(10); doc.setFont("helvetica","bold"); doc.setTextColor(139,94,60);
        doc.text(n + ".  " + title, ML, y); y += 2;
        doc.setLineWidth(0.3); doc.setDrawColor(196,150,106);
        doc.line(ML, y, PR, y); y += 6;
      };

      // ── PAGE 1 HEADER ──────────────────────────────────────────────────
      doc.setFillColor(28,22,12);
      doc.rect(0,0,PW,30,"F");
      doc.setFillColor(196,150,106);
      doc.rect(0,28,PW,1.5,"F");

      doc.setTextColor(255,255,255);
      doc.setFontSize(17); doc.setFont("helvetica","bold");
      doc.text("TheWebYatra", ML, 12);
      doc.setFontSize(7); doc.setFont("helvetica","normal"); doc.setTextColor(196,150,106);
      doc.text("WE CODE. YOU GROW.", ML, 18);
      doc.setTextColor(170,150,120);
      doc.text("thewebyatra.com  |  support@thewebyatra.com  |  +91 89202 91416", ML, 24);

      doc.setFont("helvetica","bold"); doc.setTextColor(255,255,255); doc.setFontSize(8);
      doc.text("Quote No: " + qno, PR, 12, { align:"right" });
      doc.setFont("helvetica","normal"); doc.setTextColor(196,150,106);
      doc.text("Date: " + date, PR, 18, { align:"right" });

      // Page 1 footer
      doc.setFontSize(7); doc.setFont("helvetica","normal"); doc.setTextColor(160,130,90);
      doc.text("TheWebYatra  |  " + qno + "  |  Page 1", PW/2, PH-8, { align:"center" });

      y = 38;

      // ── DOCUMENT TITLE ─────────────────────────────────────────────────
      doc.setFontSize(13); doc.setFont("helvetica","bold"); doc.setTextColor(28,22,12);
      doc.text("SOFTWARE REQUIREMENTS & QUOTATION DOCUMENT", ML, y); y+=3;
      doc.setLineWidth(0.5); doc.setDrawColor(196,150,106);
      doc.line(ML, y, PR, y); y+=8;

      // ── COVER INFO BOX ─────────────────────────────────────────────────
      doc.setFillColor(252,248,242);
      doc.setLineWidth(0.2); doc.setDrawColor(220,200,170);
      doc.roundedRect(ML, y, CW, 28, 2, 2, "FD");
      doc.setFontSize(7.5); doc.setFont("helvetica","bold"); doc.setTextColor(139,94,60);
      doc.text("PREPARED FOR", ML+4, y+7);
      doc.setFont("helvetica","bold"); doc.setFontSize(11); doc.setTextColor(28,22,12);
      doc.text(form.name || "—", ML+4, y+15);
      doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.setTextColor(80,60,40);
      const clientInfo = "Phone: " + (form.phone || "—") + (form.email ? "   |   Email: " + form.email : "");
      doc.text(clientInfo, ML+4, y+22);
      y+=34;

      // ── SECTION 1 — PROJECT SCOPE ──────────────────────────────────────
      secTitle("1","PROJECT SCOPE & PRICING");

      // Table header row
      const c1=ML, c2=ML+42, c3=ML+100, c4=PR;
      doc.setFillColor(235,220,200);
      doc.rect(ML, y-2, CW, 8, "F");
      doc.setFontSize(8); doc.setFont("helvetica","bold"); doc.setTextColor(80,50,15);
      doc.text("ITEM", c1+2, y+4);
      doc.text("SPECIFICATION", c2, y+4);
      doc.text("REMARKS", c3, y+4);
      doc.text("AMOUNT", c4, y+4, {align:"right"});
      y+=9;
      doc.setLineWidth(0.2); doc.setDrawColor(210,190,160);
      doc.line(ML, y-1, PR, y-1);

      const rows = [
        ["Project Type", (projectType ? projectType.label : "—"), "Base Development", "+" + fmt(basePrice)],
        ["Pages / Screens", (pagesOption ? pagesOption.label : "—"), "UI Screens", pagesExtra > 0 ? "+" + fmt(pagesExtra) : "Included"],
        ["Delivery Timeline", (timelineOpt ? timelineOpt.label : "—"), "Schedule", timelineMod > 0 ? "+" + fmt(timelineMod) + " rush" : timelineMod < 0 ? fmt(timelineMod) + " disc." : "Standard"],
      ];
      if (paidFeatures.length > 0) {
        rows.push(["Add-on Features", paidFeatures.length + " module(s)", "Extra Scope", "+" + fmt(featureTotal)]);
      }

      rows.forEach(function(row, i) {
        checkY(9);
        if (i % 2 === 1) { doc.setFillColor(250,245,238); doc.rect(ML, y-2, CW, 8, "F"); }
        doc.setFont("helvetica","normal"); doc.setFontSize(8.5); doc.setTextColor(40,28,12);
        doc.text(row[0], c1+2, y+4);
        doc.text(row[1], c2, y+4);
        doc.text(row[2], c3, y+4);
        doc.setFont("helvetica","bold"); doc.setTextColor(139,94,60);
        doc.text(row[3], c4, y+4, {align:"right"});
        doc.setLineWidth(0.1); doc.setDrawColor(225,210,185);
        doc.line(ML, y+6, PR, y+6);
        y+=9;
      });

      y+=4; checkY(14);

      // Total box
      doc.setFillColor(28,22,12);
      doc.rect(ML, y, CW, 13, "F");
      doc.setFontSize(9.5); doc.setFont("helvetica","bold"); doc.setTextColor(255,255,255);
      doc.text("TOTAL DEVELOPMENT ESTIMATE", ML+5, y+8.5);
      doc.setFontSize(11); doc.setTextColor(196,150,106);
      // Use right-aligned text inside the box properly
      const totalText = fmt(totalPrice);
      doc.text(totalText, PR-4, y+8.5, {align:"right"});
      y+=15;
      doc.setFontSize(7.5); doc.setFont("helvetica","italic"); doc.setTextColor(120,90,50);
      doc.text("(Approx. USD " + usdPrice + " at current exchange rate)", PR, y, {align:"right"});
      y+=10;

      // ── IMPORTANT NOTICE ───────────────────────────────────────────────
      checkY(22);
      doc.setFillColor(255,250,230);
      doc.setLineWidth(0.3); doc.setDrawColor(210,170,60);
      doc.roundedRect(ML, y, CW, 18, 2, 2, "FD");
      doc.setFontSize(8); doc.setFont("helvetica","bold"); doc.setTextColor(150,100,10);
      doc.text("IMPORTANT NOTICE", ML+4, y+7);
      doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.setTextColor(80,58,10);
      doc.text("This quotation covers DEVELOPMENT CHARGES ONLY.", ML+4, y+13);
      doc.text("Domain, hosting, server, database & third-party API costs are NOT included and billed separately.", ML+4, y+18.5);
      y+=24;

      // ── SECTION 2 — FEATURES ───────────────────────────────────────────
      checkY(16);
      secTitle("2","FEATURES INCLUDED IN SCOPE");

      if (freeFeatures.length > 0) {
        checkY(10);
        doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.setTextColor(20,130,60);
        doc.text("Standard Features  —  Always Included (No Extra Charge)", ML+2, y); y+=6;
        doc.setFont("helvetica","normal"); doc.setFontSize(8.5); doc.setTextColor(30,90,45);
        const half = Math.ceil(freeFeatures.length / 2);
        freeFeatures.forEach(function(l, i) {
          checkY(7);
          const cx = i < half ? ML+4 : ML + CW/2 + 4;
          const row2 = i < half ? i : i - half;
          if (i === half) { /* new column, y stays */ }
          if (i < half) { doc.text("✓  " + l, cx, y + row2*6); }
          else { doc.text("✓  " + l, cx, y + row2*6); }
        });
        y += Math.ceil(freeFeatures.length / 2) * 6 + 6;
      }

      if (paidFeatures.length > 0) {
        checkY(10);
        doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.setTextColor(139,94,60);
        doc.text("Additional Features  —  Selected Add-ons", ML+2, y); y+=6;
        paidFeatures.forEach(function(feat, i) {
          checkY(9);
          if (i % 2 === 1) { doc.setFillColor(250,245,238); doc.rect(ML, y-2, CW, 8, "F"); }
          doc.setFont("helvetica","normal"); doc.setFontSize(8.5); doc.setTextColor(60,38,15);
          doc.text("  +  " + feat.label, ML+2, y+4);
          doc.setFont("helvetica","bold"); doc.setTextColor(139,94,60);
          doc.text("+" + fmt(feat.cost), PR, y+4, {align:"right"});
          doc.setLineWidth(0.1); doc.setDrawColor(225,210,185);
          doc.line(ML, y+6, PR, y+6);
          y+=9;
        });
        y+=4;
      }

      // Free maintenance badge
      checkY(14);
      doc.setFillColor(238,252,242);
      doc.setLineWidth(0.3); doc.setDrawColor(80,190,110);
      doc.roundedRect(ML, y, CW, 11, 2, 2, "FD");
      doc.setFontSize(9); doc.setFont("helvetica","bold"); doc.setTextColor(15,130,55);
      doc.text("✓   1 Month FREE Post-Launch Maintenance & Bug Fixes Included", ML+5, y+7.5);
      y+=17;

      // ── SECTION 3 — CLIENT NOTES ───────────────────────────────────────
      if (form.description) {
        checkY(16);
        secTitle("3","CLIENT REQUIREMENTS & NOTES");
        doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(50,35,15);
        const noteLines = doc.splitTextToSize(form.description, CW-4);
        noteLines.forEach(function(line: string) {
          checkY(7);
          doc.text(line, ML+2, y); y+=6;
        });
        y+=6;
      }

      // ── SECTION 4 — TERMS & CONDITIONS ────────────────────────────────
      const tNum = form.description ? "4" : "3";
      checkY(16);
      secTitle(tNum, "TERMS & CONDITIONS");

      const terms = [
        ["1.  Validity",          "This quotation is valid for 30 days from the date of issue."],
        ["2.  Advance Payment",   "50% of the total amount is required before project commencement."],
        ["3.  Balance Payment",   "Remaining 50% is due upon project completion before final delivery."],
        ["4.  Timeline",          "Delivery timeline starts after advance payment and signed requirement confirmation."],
        ["5.  Scope Changes",     "Any additional features outside this scope will be quoted separately."],
        ["6.  Exclusions",        "Domain, hosting, server, database & third-party API costs are NOT included."],
        ["7.  Maintenance",       "1 month free post-launch bug fixes included. Extended plans available on request."],
      ];

      terms.forEach(function(t, i) {
        checkY(9);
        if (i % 2 === 1) { doc.setFillColor(250,245,238); doc.rect(ML, y-2, CW, 8, "F"); }
        doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.setTextColor(100,68,25);
        doc.text(t[0], ML+2, y+4);
        doc.setFont("helvetica","normal"); doc.setTextColor(50,35,15);
        doc.text(t[1], ML+52, y+4);
        doc.setLineWidth(0.1); doc.setDrawColor(220,205,180);
        doc.line(ML, y+6, PR, y+6);
        y+=9;
      });
      y+=8;

      // ── SIGNATURE SECTION ──────────────────────────────────────────────
      checkY(35);
      doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(139,94,60);
      doc.text("ACCEPTANCE & SIGNATURE", ML, y); y+=2;
      doc.setLineWidth(0.3); doc.setDrawColor(196,150,106);
      doc.line(ML, y, PR, y); y+=10;

      doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.setTextColor(60,45,25);
      doc.text("By proceeding with the advance payment, the client agrees to the scope,", ML, y);
      y+=6;
      doc.text("pricing, and terms outlined in this document.", ML, y); y+=12;

      const half2 = CW/2 - 10;
      doc.setLineWidth(0.4); doc.setDrawColor(100,70,30);
      doc.line(ML, y, ML+half2, y);
      doc.line(ML+half2+20, y, PR, y);
      y+=5;
      doc.setFontSize(7.5); doc.setTextColor(100,75,40);
      doc.text("Client Signature & Date", ML, y);
      doc.text("TheWebYatra Authorised Signatory", ML+half2+20, y);
      y+=14;

      // ── FINAL FOOTER ───────────────────────────────────────────────────
      checkY(18);
      doc.setLineWidth(0.5); doc.setDrawColor(196,150,106);
      doc.line(ML, y, PR, y); y+=6;
      doc.setFontSize(8.5); doc.setFont("helvetica","bold"); doc.setTextColor(139,94,60);
      doc.text("Thank you for choosing TheWebYatra. We look forward to building something great together!", ML, y);
      y+=6;
      doc.setFont("helvetica","normal"); doc.setFontSize(7.5); doc.setTextColor(140,110,70);
      doc.text(qno + "  |  support@thewebyatra.com  |  +91 89202 91416  |  thewebyatra.com", ML, y);

      doc.save("TheWebYatra_Quotation_" + (form.name.replace(/\s+/g,"_") || "Client") + "_" + qno + ".pdf");
    } catch (err) {
      console.error("PDF error:", err);
      alert("PDF generation failed. Please try again.");
    }
  };
  // ── Send full quote on WhatsApp (all details in message) ──────────────────
  const sendOnWhatsApp = () => {
    const selectedFeatures = FEATURES.filter(f => features.includes(f.id));
    const allFeaturesList = selectedFeatures.map(f =>
      `  • ${f.label}${f.cost > 0 ? `  →  +${fmt(f.cost)}` : "  →  FREE ✓"}`
    ).join("\n");
    const date = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
    const qno  = `TWY-${Date.now().toString().slice(-6)}`;

    const msg = [
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🏢  *TheWebYatra — Project Quote*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `📋  *QUOTE DETAILS*`,
      `Quote No:   ${qno}`,
      `Date:          ${date}`,
      ``,
      `👤  *CLIENT*`,
      `Name:       ${form.name}`,
      `Phone:      ${form.phone}`,
      form.email ? `Email:        ${form.email}` : ``,
      ``,
      `🛠  *PROJECT SCOPE*`,
      `Type:          ${projectType?.label ?? "—"}`,
      `Pages:        ${pagesOption?.label ?? "—"}`,
      `Timeline:    ${timelineOpt?.label ?? "—"}`,
      ``,
      `✅  *FEATURES INCLUDED*`,
      allFeaturesList,
      ``,
      `💰  *PRICING BREAKDOWN*`,
      `Base Price:              ${fmt(basePrice)}`,
      pagesExtra > 0      ? `Pages Add-on:         +${fmt(pagesExtra)}` : ``,
      featureTotal > 0    ? `Add-on Features:     +${fmt(featureTotal)}` : ``,
      timelineMod > 0     ? `Rush Fee:                +${fmt(timelineMod)}` : ``,
      timelineMod < 0     ? `Flexible Discount:   -${fmt(Math.abs(timelineMod))}` : ``,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `💵  *TOTAL ESTIMATE:  ${fmt(totalPrice)}*`,
      `         *(approx. $${usdPrice} USD)*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      form.description ? `📝  *PROJECT NOTES*\n${form.description}\n` : ``,
      `⚠️  *NOTE:*  Domain, hosting, server & database charges are NOT included.`,
      `✅  1 Month FREE post-launch maintenance included.`,
      `📄  Terms: 50% advance | Valid 30 days`,
      ``,
      `_TheWebYatra — We Code. You Grow._`,
      `📧  support@thewebyatra.com`,
      `📞  +91 89202 91416`,
    ].filter(l => l !== undefined && l !== ``).join("\n");

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
                      {FEATURES.filter(f => f.included).map(f => (
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
                      {FEATURES.filter(f => !f.included).map(f => {
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
