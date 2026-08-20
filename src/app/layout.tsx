import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

const siteUrl = "https://thewebyatra.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TheWebYatra - Premium Web Development Agency in Delhi | MERN Stack, Next.js, CRM Solutions",
    template: "%s | TheWebYatra",
  },
  description:
    "TheWebYatra is India's leading web development agency specializing in MERN Stack, Next.js, React, CRM Solutions, Mobile App Development. MSME Registered (UDYAM-DL-03-0086479). Based in Delhi. Get a free quote today!",
  keywords: [
    "TheWebYatra",
    "The Web Yatra",
    "web development agency Delhi",
    "web development company India",
    "MERN stack developer Delhi",
    "Next.js development agency",
    "React development company",
    "CRM solutions India",
    "mobile app development Delhi",
    "full stack developer Delhi",
    "e-commerce development India",
    "web design agency Delhi",
    "custom web application development",
    "MSME registered web agency",
    "TheWebYatra Delhi",
    "best web development company Delhi",
    "affordable web development India",
    "professional website design Delhi",
    "business website development",
    "startup web development",
  ],
  authors: [{ name: "TheWebYatra", url: siteUrl }],
  creator: "TheWebYatra",
  publisher: "TheWebYatra",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "TheWebYatra",
    title: "TheWebYatra - Premium Web Development Agency | MERN Stack, Next.js, CRM Solutions",
    description: "Transform your business with TheWebYatra - Delhi's leading web development agency. MERN Stack, Next.js, CRM Solutions, Mobile Apps. MSME Registered. Free Quote!",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "TheWebYatra - Premium Web Development Agency",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheWebYatra - Premium Web Development Agency",
    description: "Delhi's leading web development agency. MERN Stack, Next.js, CRM Solutions, Mobile Apps. MSME Registered.",
    site: "@thewebyatra",
    creator: "@thewebyatra",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "google-site-verification-code", // Add your Google verification code
  },
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
        
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TheWebYatra",
              alternateName: "The Web Yatra",
              url: "https://thewebyatra.com",
              logo: "https://thewebyatra.com/logo.jpeg",
              description: "Premium web development agency specializing in MERN Stack, Next.js, CRM Solutions, and Mobile App Development",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Delhi",
                addressCountry: "IN"
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-8920291416",
                contactType: "Customer Service",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"]
              },
              sameAs: [
                "https://www.linkedin.com/in/thewebyatra/",
                "https://www.instagram.com/thewebyatra/",
                "https://www.facebook.com/profile.php?id=61593257650341"
              ],
              knowsAbout: [
                "Web Development",
                "MERN Stack",
                "Next.js",
                "React",
                "CRM Solutions",
                "Mobile App Development",
                "E-Commerce Development"
              ],
              founder: {
                "@type": "Person",
                name: "Mohd Inayat",
                jobTitle: "Founder & Full-Stack Developer",
                url: "https://www.linkedin.com/in/inayatshaykh/"
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "50"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "TheWebYatra",
              image: "https://thewebyatra.com/logo.jpeg",
              "@id": "https://thewebyatra.com",
              url: "https://thewebyatra.com",
              telephone: "+91-8920291416",
              priceRange: "₹₹",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Delhi",
                addressLocality: "Delhi",
                addressCountry: "IN"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 28.7041,
                longitude: 77.1025
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "18:00"
              },
              sameAs: [
                "https://www.linkedin.com/in/thewebyatra/",
                "https://www.instagram.com/thewebyatra/"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-cream-100 dark:bg-dark-400 text-stone-900 dark:text-cream-100 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="theme">
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
