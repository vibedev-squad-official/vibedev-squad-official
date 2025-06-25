"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BarChart3, ChevronDown } from "lucide-react";
import React from "react";

interface ComparisonDropdownProps {
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function ComparisonDropdown({ 
  isExpanded, 
  onToggle, 
  children, 
  className 
}: ComparisonDropdownProps) {
  return (
    <div className={cn("relative w-full max-w-6xl mx-auto", className)}>
      {/* Trigger button */}
      <motion.button
        onClick={onToggle}
        className={cn(
          "relative w-full p-8 rounded-2xl border border-white/20",
          "backdrop-blur-xl shadow-2xl",
          "hover:border-blue-400/40 transition-all duration-300",
          "group overflow-hidden"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Pulse animation overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Neon glow border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

        <div className="relative flex items-center justify-center gap-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
            <BarChart3 className="w-8 h-8 text-blue-400" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              See How We Compare
            </h3>
            <p className="text-lg text-green-400 font-semibold">
              (Save up to 99.9% vs traditional teams)
            </p>
          </div>
          
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="p-3 rounded-lg bg-white/5 border border-white/10"
          >
            <ChevronDown className="w-6 h-6 text-gray-300" />
          </motion.div>
        </div>
      </motion.button>

      {/* Expandable content */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="overflow-hidden"
      >
        <div className="pt-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
} 