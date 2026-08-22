"use client";
import { motion } from "framer-motion";
import BackButton from "@/components/ui/BackButton";
import { ShieldCheck, Calendar, Lock, Eye, Database, UserCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PrivacyPageClient() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-stone-50 via-warm-50/30 to-stone-100 dark:from-dark-400 dark:via-dark-500 dark:to-dark-600">
      <BackButton />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-warm-400 to-warm-600 shadow-lg mb-6">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: August 22, 2026</span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-dark-500 rounded-2xl shadow-xl p-8 md:p-12 space-y-8"
        >
          {/* Introduction */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Lock className="w-6 h-6 text-warm-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">
                  1. Introduction
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  At TheWebYatra, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Database className="w-6 h-6 text-warm-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
                  2. Information We Collect
                </h2>
                <div className="space-y-4 text-stone-700 dark:text-stone-300 leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-lg text-stone-900 dark:text-white mb-2">
                      2.1 Personal Information
                    </h3>
                    <p className="mb-2">We may collect personal information that you provide directly to us, including:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Name and contact information (email, phone number, address)</li>
                      <li>Company name and business information</li>
                      <li>Payment and billing information</li>
                      <li>Project requirements and specifications</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg text-stone-900 dark:text-white mb-2">
                      2.2 Automatically Collected Information
                    </h3>
                    <p className="mb-2">When you visit our website, we automatically collect certain information:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>IP address and browser type</li>
                      <li>Device information and operating system</li>
                      <li>Pages visited and time spent on our site</li>
                      <li>Referring website addresses</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Eye className="w-6 h-6 text-warm-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
                  3. How We Use Your Information
                </h2>
                <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                  <p>We use the collected information for various purposes:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To provide, maintain, and improve our services</li>
                    <li>To process transactions and send related information</li>
                    <li>To communicate with you about projects, updates, and inquiries</li>
                    <li>To send marketing communications (with your consent)</li>
                    <li>To analyze usage patterns and optimize user experience</li>
                    <li>To detect, prevent, and address technical issues</li>
                    <li>To comply with legal obligations and protect our rights</li>
                    <li>To personalize your experience on our website</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              4. Information Sharing and Disclosure
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf (hosting, analytics, payment processing)</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
              </ul>
              <p className="mt-3">
                We do not sell or rent your personal information to third parties for marketing purposes.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              5. Data Security
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure payment processing through trusted providers</li>
                <li>Regular backups and disaster recovery procedures</li>
              </ul>
              <p className="mt-3">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              6. Cookies and Tracking Technologies
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>We use cookies and similar tracking technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Improve website functionality and user experience</li>
                <li>Deliver relevant content and advertisements</li>
              </ul>
              <p className="mt-3">
                You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-warm-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
                  7. Your Privacy Rights
                </h2>
                <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                  <p>You have the following rights regarding your personal information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Objection:</strong> Object to processing of your personal information</li>
                    <li><strong>Portability:</strong> Request transfer of your information to another service</li>
                    <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
                  </ul>
                  <p className="mt-3">
                    To exercise these rights, please contact us using the information provided below.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              8. Data Retention
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When information is no longer needed, we securely delete or anonymize it.
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              9. Third-Party Links
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              10. Children&apos;s Privacy
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically. Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="pt-6 border-t border-stone-200 dark:border-stone-700">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              12. Contact Us
            </h2>
            <div className="space-y-2 text-stone-700 dark:text-stone-300">
              <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
              <ul className="space-y-1 ml-4">
                <li><strong>Email:</strong> support@thewebyatra.com</li>
                <li><strong>Phone:</strong> +91 89202 91416</li>
                <li><strong>Address:</strong> A-665, Street No. 12, Near Raza Chowk, Zakir Nagar, Delhi - 110025, India</li>
              </ul>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
