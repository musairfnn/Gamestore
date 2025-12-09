
"use client";
import { motion, AnimatePresence } from "framer-motion";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 text-white rounded-2xl p-8 w-[90%] max-w-lg shadow-lg relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            ✖
          </button>

          <h2 className="text-2xl font-bold mb-3">About Gim Mart</h2>
          <p className="text-gray-300 leading-relaxed">
            This application was created to make it easier for users to purchase and
            manage their game collections digitally. The system is designed to keep the user experience
            fast, modern, and interactive.
          </p>

          <div className="mt-4 text-sm text-gray-400">
            © 2025 Gim Store. All Rights Reserved.
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}