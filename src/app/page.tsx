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
  title: "TheWebYatra — Full-Stack Developer & Digital Agency",
  description:
    "Mohd Inayat — Full-Stack Developer & Founder of TheWebYatra. MERN Stack, Java, Next.js, E-Commerce. 6+ live projects. Based in Delhi. Get a free quote on WhatsApp.",
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
