"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { useEffect, useState } from "react";

const activities = [
  "🟢 **Alex from TechStart** just deployed a new feature using AI agents",
  "🟢 **Maria's team** completed sprint planning in 15 minutes with AI assistance",
  "🟢 **DevCorp** saved $50K this month by switching to AI orchestration",
  "🟢 **StartupXYZ** launched their MVP 300% faster with Vibe DevSquad"
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

export default function ActivityFeed() {
  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatActivity = (activity: string) => {
    const parts = activity.split('**');
    if (parts.length === 3) {
      return (
        <>
          {parts[0]}
          <span className="font-bold text-white">{parts[1]}</span>
          {parts[2]}
        </>
      );
    }
    return activity;
  };

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <AnimatedContainer delay={0.3}>
        <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 overflow-hidden">
          {/* Neon border glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 blur-sm opacity-50"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
              <span className="text-sm font-semibold text-gray-300">Live Activity</span>
            </div>
            
            <motion.div
              key={currentActivity}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-gray-300 text-lg"
            >
              {formatActivity(activities[currentActivity])}
            </motion.div>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
} 