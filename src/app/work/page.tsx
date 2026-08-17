import type { Metadata } from "next";
import WorkPageClient from "./WorkPageClient";

export const metadata: Metadata = {
  title: "Our Work — Portfolio & Case Studies",
  description:
    "Explore TheWebYatra's portfolio of web design, development, e-commerce, and branding projects. Real results for real businesses.",
  openGraph: {
    title: "Our Work | TheWebYatra",
    description: "Projects that drive results — see our portfolio.",
  },
};

export default function WorkPage() {
  return <WorkPageClient />;
}
