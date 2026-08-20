"use client";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const whatsappNumber = "918920291416"; // WhatsApp business number
  const defaultMessage = "Hi! I'm interested in your services.";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <motion.a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
      
      {/* Main button */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300">
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={2} />
      </div>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
        Chat with us
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-stone-900 dark:border-l-white" />
      </span>
    </motion.a>
  );
}
