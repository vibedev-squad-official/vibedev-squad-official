"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type TabType = "ai-tools" | "dev-costs" | "roi-calculator";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  className?: string;
}

const tabs = [
  {
    id: "ai-tools" as TabType,
    label: "AI Tools Comparison",
    description: "Compare features vs other tools"
  },
  {
    id: "dev-costs" as TabType,
    label: "Dev Team Costs",
    description: "Traditional team vs AI costs"
  },
  {
    id: "roi-calculator" as TabType,
    label: "ROI Calculator",
    description: "Calculate your savings"
  }
];

export function TabNavigation({ activeTab, onTabChange, className }: TabNavigationProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Tab buttons container */}
      <div className="relative flex flex-col sm:flex-row gap-2 p-2 rounded-2xl backdrop-blur-xl border border-white/10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative flex-1 px-6 py-4 rounded-xl transition-all duration-300",
                "text-left overflow-hidden group",
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Active tab background */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl border border-white/20"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}

              {/* Hover effect for inactive tabs */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}

              {/* Neon glow for active tab */}
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 opacity-50 blur-sm" />
              )}

              {/* Tab content */}
              <div className="relative z-10">
                <div className={cn(
                  "font-semibold text-sm sm:text-base mb-1 transition-colors duration-300",
                  isActive 
                    ? "bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                    : "text-gray-300"
                )}>
                  {tab.label}
                </div>
                <div className={cn(
                  "text-xs transition-colors duration-300 hidden sm:block",
                  isActive ? "text-gray-300" : "text-gray-500"
                )}>
                  {tab.description}
                </div>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute bottom-1 left-1/2 w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                  layoutId="activeIndicator"
                  style={{ x: "-50%" }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
} 