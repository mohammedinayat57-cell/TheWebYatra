import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import GetQuote from "@/components/sections/GetQuote";
import TrustedBy from "@/components/sections/TrustedBy";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "TheWebYatra - Best Web Development Company in Delhi | MERN Stack, Next.js & CRM Solutions",
  description:
    "TheWebYatra - Leading web development agency in Delhi offering MERN Stack, Next.js, React, CRM Solutions & Mobile App Development. MSME Registered (UDYAM-DL-03-0086479). 5.0★ Rating. Free consultation!",
  keywords: [
    "TheWebYatra",
    "web development Delhi",
    "best web development company Delhi",
    "MERN stack developer",
    "Next.js agency India",
    "CRM solutions",
    "mobile app development",
    "React development",
    "full stack developer",
    "web design agency Delhi",
  ],
  openGraph: {
    title: "TheWebYatra - Best Web Development Company in Delhi",
    description: "Transform your business with TheWebYatra. MERN Stack, Next.js, CRM Solutions. MSME Registered. 5.0★ Rating.",
    url: "https://thewebyatra.com",
    images: [
      {
        url: "https://thewebyatra.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TheWebYatra - Web Development Agency",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <GetQuote />
      <TrustedBy />
      <Services />
      <Portfolio />
      <Process />
      <TechStack />
      <Testimonials />
      <CTABanner />
    </>
  );
}
