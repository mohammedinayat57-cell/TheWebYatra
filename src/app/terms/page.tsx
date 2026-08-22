import type { Metadata } from "next";
import TermsPageClient from "./TermsPageClient";

export const metadata: Metadata = {
  title: "Terms and Conditions | TheWebYatra",
  description: "Read our terms and conditions to understand the rules and regulations governing the use of TheWebYatra's services.",
  openGraph: {
    title: "Terms and Conditions | TheWebYatra",
    description: "Terms and conditions for using TheWebYatra's services.",
    url: "https://thewebyatra.com/terms",
    siteName: "TheWebYatra",
    locale: "en_US",
    type: "website",
  },
};

export default function TermsPage() {
  return <TermsPageClient />;
}
