"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function FinalCTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
      {/* Primary CTA Button */}
      <AnimatedContainer delay={0.4}>
        <motion.button 
          className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 rounded-xl font-semibold text-white text-lg transition-all duration-300 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Enhanced neon glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          
          {/* Button content */}
          <div className="relative z-10 flex items-center gap-2">
            Start Your AI Squad Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </motion.button>
      </AnimatedContainer>

      {/* Secondary CTA Button */}
      <AnimatedContainer delay={0.5}>
        <motion.button 
          className="group relative px-8 py-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl font-semibold text-white text-lg transition-all duration-300 overflow-hidden"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Button content */}
          <div className="relative z-10 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Book Enterprise Demo
          </div>
        </motion.button>
      </AnimatedContainer>
    </div>
  );
} 