# TheWebYatra — Your Digital Journey Starts Here

A production-ready web development agency website built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber.

🌐 **Domain:** [thewebyatra.com](https://thewebyatra.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| 3D Hero | React Three Fiber + Drei |
| Email | Nodemailer (SMTP) |
| Deployment | Vercel |

---

## Features

- ✅ 6 fully-built pages: Home, Services, Work, About, Pricing, Contact
- ✅ Interactive 3D hero (distorted sphere + orbit rings, mouse-reactive)
- ✅ Framer Motion scroll-reveal animations throughout
- ✅ Working contact form with server-side validation and email via SMTP
- ✅ Filterable project portfolio with case study pages
- ✅ Animated process timeline with scroll-linked progress
- ✅ Auto-playing testimonials carousel
- ✅ Pricing table with full feature comparison
- ✅ SEO: meta tags, Open Graph, sitemap.xml, robots.txt
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ Mobile-first fully responsive layout
- ✅ Dark mode by default
- ✅ 404, 500 error pages + loading skeleton

---

## Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts   ← Contact form API (email)
│   ├── about/
│   ├── contact/
│   ├── pricing/
│   ├── services/
│   ├── work/
│   │   └── [slug]/            ← Dynamic case study pages
│   ├── layout.tsx             ← Root layout (Navbar + Footer)
│   ├── page.tsx               ← Homepage
│   ├── sitemap.ts             ← Auto-generated sitemap
│   └── robots.ts              ← robots.txt
├── components/
│   ├── 3d/HeroScene.tsx       ← React Three Fiber 3D scene
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── TrustedBy.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Process.tsx
│   │   ├── TechStack.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   └── CTABanner.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Section.tsx
│       └── SocialIcons.tsx
├── lib/data.ts                ← All site content (services, projects, etc.)
└── types/index.ts             ← TypeScript types
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/yourorg/thewebyatra.git
cd thewebyatra
npm install
```

### 2. Set up environment variables

Copy the example file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your SMTP credentials:

```env
# Gmail (use an App Password — not your account password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=you@gmail.com
SMTP_PASS=your_16_char_app_password
CONTACT_EMAIL=hello@thewebyatra.com
```

**Alternatively, use Resend (recommended for production):**

```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=resend
SMTP_PASS=re_your_api_key
CONTACT_EMAIL=hello@thewebyatra.com
```

> Without env vars set, in development the form still works — it uses Ethereal (a test mail trap) and logs a preview URL to the console.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Option B — Vercel Dashboard

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Framework: **Next.js** (auto-detected)
4. Add environment variables in Vercel dashboard (Settings → Environment Variables):
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `CONTACT_EMAIL`
5. Click **Deploy**

### Custom Domain

In Vercel project → Settings → Domains → add `thewebyatra.com` and `www.thewebyatra.com`. Point your DNS records as instructed.

---

## Customisation Guide

### Update site content
All content (services, projects, team, testimonials, pricing) lives in `src/lib/data.ts`. Edit that file to update copy without touching components.

### Add a new project
In `src/lib/data.ts`, add an entry to the `projects` array. The case study details are in `src/app/work/[slug]/WorkDetailClient.tsx` in the `caseStudyDetails` object.

### Change brand colors
Edit `tailwind.config.ts` → `theme.extend.colors.brand`. The gradient accent is `#3B82F6 → #8B5CF6` (blue-purple) — change these across the config.

### Update SEO metadata
- Global defaults: `src/app/layout.tsx` → `metadata` export
- Per-page: each page's `metadata` export or `generateMetadata` function

---

## Scripts

```bash
npm run dev      # Start dev server on :3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

---

## License

MIT © 2025 TheWebYatra
