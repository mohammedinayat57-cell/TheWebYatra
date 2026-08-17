import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "TheWebYatra — Your Digital Journey Starts Here",
  description:
    "TheWebYatra is a premium web development agency. We build high-performance websites, e-commerce stores, apps and digital experiences that drive real business growth.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      <Portfolio />
      <Process />
      <TechStack />
      <Testimonials />
      <Pricing />
      <CTABanner />
    </>
  );
}
