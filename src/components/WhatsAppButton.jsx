import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919876543210?text=Hi%20CleanX!%20I%20want%20to%20book%20a%20laundry%20pickup."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 hover:scale-110 transition-transform group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
      <span className="absolute -top-12 right-0 bg-dark-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        Chat with us!
      </span>
    </motion.a>
  );
}
