import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing — Transparent Web Development Packages",
  description:
    "Explore TheWebYatra's transparent pricing plans. From starter websites to full enterprise solutions — find the right package for your digital journey.",
  openGraph: {
    title: "Pricing | TheWebYatra",
    description: "Clear, transparent pricing for every stage of your digital journey.",
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
