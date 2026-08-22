"use client";
import { motion } from "framer-motion";
import BackButton from "@/components/ui/BackButton";
import { FileText, Calendar, Shield } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TermsPageClient() {
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
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4">
            Terms and Conditions
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
              <Shield className="w-6 h-6 text-warm-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">
                  1. Introduction
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  Welcome to TheWebYatra. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms. If you disagree with any part of these terms, please do not use our services.
                </p>
              </div>
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              2. Services
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>
                TheWebYatra provides web development, CRM solutions, app development, and related digital services. We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All services are subject to availability and acceptance</li>
                <li>Project timelines are estimates and may vary based on scope changes</li>
                <li>Client cooperation is required for timely project completion</li>
                <li>Additional features beyond agreed scope may incur extra charges</li>
              </ul>
            </div>
          </section>

          {/* User Obligations */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              3. User Obligations
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>By using our services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information when requested</li>
                <li>Maintain the confidentiality of any account credentials</li>
                <li>Not use our services for any illegal or unauthorized purpose</li>
                <li>Not interfere with or disrupt our services or servers</li>
                <li>Respect intellectual property rights of TheWebYatra and third parties</li>
                <li>Provide timely feedback and approvals during project development</li>
              </ul>
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              4. Payment Terms
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All prices are in Indian Rupees (INR) unless otherwise specified</li>
                <li>Payment schedules will be outlined in individual project agreements</li>
                <li>A deposit may be required before project commencement</li>
                <li>Late payments may result in project suspension and additional charges</li>
                <li>Refunds are subject to our refund policy outlined in project agreements</li>
                <li>All payments are subject to applicable taxes</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              5. Intellectual Property
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>
                Upon full payment, clients receive ownership of the final delivered work product. However:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>TheWebYatra retains ownership of any pre-existing intellectual property</li>
                <li>We reserve the right to showcase completed projects in our portfolio</li>
                <li>Source code and development methodologies remain our intellectual property</li>
                <li>Third-party components may be subject to their respective licenses</li>
                <li>Clients may not resell or redistribute our work without permission</li>
              </ul>
            </div>
          </section>

          {/* Warranties and Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              6. Warranties and Disclaimers
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>
                Our services are provided "as is" without warranties of any kind, either express or implied. We do not warrant that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Our services will be uninterrupted or error-free</li>
                <li>Results obtained will meet your specific requirements</li>
                <li>All errors or defects will be corrected immediately</li>
                <li>Third-party services integrated will remain compatible indefinitely</li>
              </ul>
              <p className="mt-3">
                We provide maintenance and support as outlined in individual service agreements.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              7. Limitation of Liability
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>
                To the maximum extent permitted by law, TheWebYatra shall not be liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages exceeding the amount paid for the specific service</li>
                <li>Issues arising from third-party services or integrations</li>
                <li>Client-provided content or data</li>
              </ul>
            </div>
          </section>

          {/* Confidentiality */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              8. Confidentiality
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>
                Both parties agree to keep confidential any proprietary information shared during the course of service delivery. This includes but is not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Business strategies and plans</li>
                <li>Technical specifications and source code</li>
                <li>Customer data and analytics</li>
                <li>Pricing and financial information</li>
              </ul>
              <p className="mt-3">
                Confidentiality obligations survive the termination of service agreements.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              9. Termination
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>
                Either party may terminate services under the following conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Written notice as specified in the service agreement</li>
                <li>Material breach of these terms by the other party</li>
                <li>Mutual agreement to discontinue services</li>
              </ul>
              <p className="mt-3">
                Upon termination, clients are responsible for payment of all services rendered up to the termination date.
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              10. Modifications to Terms
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>
                TheWebYatra reserves the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              11. Governing Law
            </h2>
            <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>
                These terms are governed by the laws of India. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts in Delhi, India.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="pt-6 border-t border-stone-200 dark:border-stone-700">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              12. Contact Information
            </h2>
            <div className="space-y-2 text-stone-700 dark:text-stone-300">
              <p>If you have any questions about these Terms and Conditions, please contact us:</p>
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
