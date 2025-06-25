"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bot, DollarSign, TrendingUp, Users } from "lucide-react";

interface CostComparisonCardsProps {
  className?: string;
}

const traditionalTeamCost = 754000;
const vibeDevSquadCost = 1188;
const savings = 752812;

export function CostComparisonCards({ className }: CostComparisonCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={cn("relative w-full max-w-6xl mx-auto mt-16", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Traditional Team Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          {/* Card with glassmorphism - no background */}
          <div className="relative overflow-hidden rounded-2xl border border-red-500/30 backdrop-blur-sm bg-red-500/5 p-8 h-full">
            {/* Neon border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 text-center space-y-6">
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-red-500/20 border border-red-500/30">
                  <Users className="h-8 w-8 text-red-400" />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-2">Traditional Team</h3>
                <p className="text-sm text-gray-400">Full development team with salaries, benefits & overhead</p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-lg" />
                <div className="relative text-4xl font-bold text-red-400">
                  {formatCurrency(traditionalTeamCost)}
                </div>
                <div className="text-sm text-gray-400 mt-2">per year</div>
              </motion.div>

              <div className="text-left space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span>5 Full-time developers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span>Benefits & overhead costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span>Management & coordination</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vibe DevSquad Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative group"
        >
          {/* Card with glassmorphism - no background */}
          <div className="relative overflow-hidden rounded-2xl border border-green-500/30 backdrop-blur-sm bg-green-500/5 p-8 h-full">
            {/* Neon border effect with pulse */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 to-green-600/20 opacity-50 animate-pulse" />
            
            <div className="relative z-10 text-center space-y-6">
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-green-500/20 border border-green-500/30">
                  <Bot className="h-8 w-8 text-green-400" />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Vibe DevSquad</h3>
                <p className="text-sm text-gray-400">AI-powered development team with unlimited capacity</p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-lg animate-pulse" />
                <div className="relative text-4xl font-bold text-green-400">
                  {formatCurrency(vibeDevSquadCost)}
                </div>
                <div className="text-sm text-gray-400 mt-2">per year</div>
              </motion.div>

              <div className="text-left space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>Unlimited AI agents</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>No overhead costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>24/7 availability</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Savings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative group"
        >
          {/* Card with glassmorphism - no background */}
          <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 backdrop-blur-sm bg-gradient-to-br from-purple-500/5 to-blue-500/5 p-8 h-full">
            {/* Enhanced pulse animation */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 opacity-50 animate-pulse" />
            
            <div className="relative z-10 text-center space-y-6">
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  Your Savings
                </h3>
                <p className="text-sm text-gray-400">Annual cost reduction with AI orchestration</p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur-lg animate-pulse" />
                <div className="relative space-y-2">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
                    <DollarSign className="h-8 w-8 text-purple-400" />
                    {formatCurrency(savings)}
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    99.8% savings
                  </div>
                </div>
                <div className="text-sm text-gray-400 mt-2">per year</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20"
              >
                <p className="text-sm text-purple-300 font-medium">
                  🎉 Enough to fund 10+ new projects!
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
} 