import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us — The Team Behind TheWebYatra",
  description:
    "Meet the team behind TheWebYatra. We're a passionate group of designers, developers, and strategists on a mission to craft extraordinary digital experiences.",
  openGraph: {
    title: "About | TheWebYatra",
    description: "The story, mission, and team behind TheWebYatra.",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
