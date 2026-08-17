import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Digital Journey",
  description:
    "Ready to build something great? Get in touch with TheWebYatra. Free discovery call, fast response, no commitment required.",
  openGraph: {
    title: "Contact | TheWebYatra",
    description: "Start your digital journey with a free discovery call.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
