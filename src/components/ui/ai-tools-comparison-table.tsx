"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

interface ComparisonRow {
  tool: string;
  pricePerMonth: string;
  primaryFunction: string;
  targetUser: string;
  keyLimitation: string;
  isHighlighted?: boolean;
}

const comparisonData: ComparisonRow[] = [
  {
    tool: "Vibe DevSquad",
    pricePerMonth: "$99",
    primaryFunction: "Complete AI development team",
    targetUser: "Teams & individuals",
    keyLimitation: "All-in-one solution with team orchestration",
    isHighlighted: true
  },
  {
    tool: "Cursor",
    pricePerMonth: "$20",
    primaryFunction: "AI-powered code editor",
    targetUser: "Individual developers",
    keyLimitation: "Limited to code editing only"
  },
  {
    tool: "Windsurf",
    pricePerMonth: "$15",
    primaryFunction: "AI development assistant",
    targetUser: "Individual developers",
    keyLimitation: "No team orchestration or planning"
  },
  {
    tool: "ChatGPT Plus",
    pricePerMonth: "$20",
    primaryFunction: "General AI assistant",
    targetUser: "General users",
    keyLimitation: "Not development-specific"
  },
  {
    tool: "GitHub Copilot",
    pricePerMonth: "$10",
    primaryFunction: "Code completion",
    targetUser: "Individual developers",
    keyLimitation: "No planning, testing, or workflow"
  },
  {
    tool: "Anthropic Claude Pro",
    pricePerMonth: "$20",
    primaryFunction: "General AI assistant",
    targetUser: "General users",
    keyLimitation: "Not development-focused"
  },
  {
    tool: "Perplexity Pro",
    pricePerMonth: "$20",
    primaryFunction: "Research assistant",
    targetUser: "Knowledge workers",
    keyLimitation: "Limited to research tasks"
  }
];

interface AIToolsComparisonTableProps {
  className?: string;
}

export function AIToolsComparisonTable({ className }: AIToolsComparisonTableProps) {
  return (
    <div className={cn("relative w-full max-w-6xl mx-auto", className)}>
      {/* Table container with glassmorphism - no background */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm bg-white/5">
        {/* Neon border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl" />
        
        {/* Table content */}
        <div className="relative z-10 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-400" />
                    Tool
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                  Price/Month
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                  Primary Function
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                  Target User
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                  Key Limitation
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <motion.tr
                  key={row.tool}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "border-b border-white/5 transition-all duration-300 hover:bg-white/5",
                    row.isHighlighted && "bg-green-500/10 border-green-400/30"
                  )}
                >
                  <td className="px-6 py-4">
                    <div className={cn(
                      "font-semibold",
                      row.isHighlighted ? "text-green-300" : "text-white"
                    )}>
                      {row.tool}
                      {row.isHighlighted && (
                        <span className="ml-2 px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full border border-green-400/30">
                          ⭐ Recommended
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={cn(
                      "font-semibold",
                      row.isHighlighted ? "text-green-300" : "text-white"
                    )}>
                      {row.pricePerMonth}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={cn(
                      "text-sm",
                      row.isHighlighted ? "text-green-200" : "text-gray-300"
                    )}>
                      {row.primaryFunction}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={cn(
                      "text-sm",
                      row.isHighlighted ? "text-green-200" : "text-gray-300"
                    )}>
                      {row.targetUser}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={cn(
                      "text-sm",
                      row.isHighlighted ? "text-green-200" : "text-gray-300"
                    )}>
                      {row.keyLimitation}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Enhanced glow effect for highlighted row */}
        {comparisonData.some(row => row.isHighlighted) && (
          <div className="absolute inset-0 rounded-2xl bg-green-500/5 border border-green-400/20 pointer-events-none" />
        )}
      </div>
    </div>
  );
} 