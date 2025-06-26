"use client";

import { motion, useReducedMotion } from "framer-motion";
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

export default function FinalCTAHeader() {
  return (
    <div className="text-center mb-16">
      <AnimatedContainer delay={0.1}>
        <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-6 relative">
          Start Building with AI Today
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent blur-sm opacity-50 -z-10">
            Start Building with AI Today
          </div>
        </h2>
      </AnimatedContainer>
      
      <AnimatedContainer delay={0.2}>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                      Join 2,500+ teams who&apos;ve discovered the power of AI orchestration
        </p>
      </AnimatedContainer>
    </div>
  );
} 