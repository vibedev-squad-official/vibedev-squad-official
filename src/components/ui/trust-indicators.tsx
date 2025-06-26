"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

const trustIndicators = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime",
  "SOC 2 compliant"
];

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

export default function TrustIndicators() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trustIndicators.map((indicator, index) => (
          <AnimatedContainer key={index} delay={0.6 + index * 0.1}>
            <motion.div 
              className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4 text-center group transition-all duration-300"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)"
              }}
            >
              {/* Neon border glow */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-300">
                  {indicator}
                </span>
              </div>
            </motion.div>
          </AnimatedContainer>
        ))}
      </div>
    </div>
  );
} 