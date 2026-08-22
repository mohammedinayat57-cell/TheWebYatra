import type { Metadata } from "next";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy | TheWebYatra",
  description: "Learn how TheWebYatra collects, uses, and protects your personal information. Read our comprehensive privacy policy.",
  openGraph: {
    title: "Privacy Policy | TheWebYatra",
    description: "Privacy policy and data protection practices at TheWebYatra.",
    url: "https://thewebyatra.com/privacy",
    siteName: "TheWebYatra",
    locale: "en_US",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
