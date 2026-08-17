import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

const siteUrl = "https://thewebyatra.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TheWebYatra — Your Digital Journey Starts Here",
    template: "%s | TheWebYatra",
  },
  description:
    "TheWebYatra is a premium web development agency by Mohd Inayat — Full-Stack, MERN & Java Developer based in Delhi. We build high-performance websites, e-commerce stores, and AI-integrated products.",
  keywords: ["web development agency", "MERN stack developer", "full stack developer Delhi", "TheWebYatra", "Mohd Inayat", "Next.js development", "e-commerce development India"],
  authors: [{ name: "Mohd Inayat", url: siteUrl }],
  creator: "Mohd Inayat",
  publisher: "TheWebYatra",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", locale: "en_IN", url: siteUrl, siteName: "TheWebYatra",
    title: "TheWebYatra — Your Digital Journey Starts Here",
    description: "Premium web development by Mohd Inayat. MERN Stack · Next.js · Java · AI Integration.",
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "TheWebYatra" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheWebYatra — Your Digital Journey Starts Here",
    description: "Premium web development by Mohd Inayat. Your digital journey starts here.",
    site: "@thewebyatra", creator: "@inayatshaykh",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* ── Anti-flash script: runs BEFORE first paint ─────────────────────── */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){
            try {
              var stored = localStorage.getItem('theme');
              var prefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
              if (stored === 'dark' || (!stored && prefersDark)) {
                document.documentElement.classList.add('dark');
                document.documentElement.style.backgroundColor = '#0F0D0A';
              } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.style.backgroundColor = '#F8F5F0';
              }
            } catch(e) {}
          })()`,
        }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-cream-100 dark:bg-dark-400 text-stone-900 dark:text-cream-100 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="theme">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
