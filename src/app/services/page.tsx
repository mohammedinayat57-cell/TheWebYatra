import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services — Web Design, Development, SEO & More",
  description:
    "Explore TheWebYatra's full range of digital services: web design, development, e-commerce, SEO, branding, and mobile app development.",
  openGraph: {
    title: "Services | TheWebYatra",
    description: "End-to-end digital services for modern businesses.",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
