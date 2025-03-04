"use client";

import { Stethoscope } from "lucide-react";
import { useGeminiAssistant } from "./gemini-assistant-provider";
import { motion, AnimatePresence } from "framer-motion";

export function GeminiAssistantButton() {
  const { openAssistant, isOpen } = useGeminiAssistant();

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.05, 1],
            opacity: 1
          }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute -inset-2 rounded-full bg-primary/20 z-[-1]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.3, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <button 
            onClick={openAssistant} 
            className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
            aria-label="Open AI Health Assistant"
          >
            <Stethoscope className="h-6 w-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}