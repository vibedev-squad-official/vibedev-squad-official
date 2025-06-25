"use client";

import { cn } from "@/lib/utils";

interface CostBreakdownTableProps {
  className?: string;
}

export function CostBreakdownTable({ className }: CostBreakdownTableProps) {
  return (
    <div className={cn("relative w-full max-w-7xl mx-auto", className)}>
      <h2 className="text-4xl font-bold text-white mb-8">
        Traditional Development Team vs AI Orchestration
      </h2>
      <p className="text-xl text-gray-300 mb-8">
        Compare the real costs of building a development team
      </p>
      <div className="bg-white/5 rounded-lg p-8">
        <p className="text-white">Cost breakdown table content will be added here.</p>
      </div>
    </div>
  );
} 