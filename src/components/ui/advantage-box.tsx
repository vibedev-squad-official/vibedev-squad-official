"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

interface AdvantageBoxProps {
  className?: string;
}

export function AdvantageBox({ className }: AdvantageBoxProps) {
  return (
    <div className={cn("relative w-full max-w-4xl mx-auto mt-8", className)}>
      {/* Advantage explanation container with glassmorphism - no background */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl border border-green-400/30 backdrop-blur-sm bg-green-500/5"
      >
        {/* Green neon glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-green-500/10 blur-xl" />
        
        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Header badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/30">
              <Star className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-300">
                Why We're Different
              </span>
            </div>
          </div>

          {/* Main content */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-300 mb-4">
              The Complete AI Development Solution
            </h3>
            <p className="text-gray-200 text-lg leading-relaxed max-w-3xl mx-auto">
              Unlike other tools that focus on individual tasks, Vibe DevSquad provides a complete AI development team that handles planning, coding, testing, deployment, and maintenance - all orchestrated seamlessly for maximum productivity.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mt-1">
                <Check className="w-3 h-3 text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-green-200 mb-1">
                  Complete Team Orchestration
                </h4>
                <p className="text-gray-300 text-sm">
                  Full development lifecycle management, not just code assistance
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mt-1">
                <Check className="w-3 h-3 text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-green-200 mb-1">
                  Scales with Your Needs
                </h4>
                <p className="text-gray-300 text-sm">
                  From solo entrepreneurs to enterprise teams
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mt-1">
                <Check className="w-3 h-3 text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-green-200 mb-1">
                  End-to-End Automation
                </h4>
                <p className="text-gray-300 text-sm">
                  Planning, development, testing, and deployment all automated
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mt-1">
                <Check className="w-3 h-3 text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-green-200 mb-1">
                  99% Cost Reduction
                </h4>
                <p className="text-gray-300 text-sm">
                  Massive savings compared to traditional development teams
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced green glow border */}
        <div className="absolute inset-0 rounded-2xl bg-green-500/10 border-2 border-green-400/20 pointer-events-none" />
      </motion.div>
    </div>
  );
} 