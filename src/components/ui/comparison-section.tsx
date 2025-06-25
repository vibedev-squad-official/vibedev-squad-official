"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { AdvantageBox } from "./advantage-box";
import { AIToolsComparisonTable } from "./ai-tools-comparison-table";
import { ComparisonDropdown } from "./comparison-dropdown";
import { TabNavigation, TabType } from "./tab-navigation";

interface ComparisonSectionProps {
  className?: string;
}

export function ComparisonSection({ className }: ComparisonSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("ai-tools");

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <section className={cn("relative py-20 px-4 overflow-hidden", className)}>
      <div className="relative z-10 max-w-7xl mx-auto">
        <ComparisonDropdown
          isExpanded={isExpanded}
          onToggle={handleToggle}
        >
          {/* Tab Navigation */}
          <TabNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
            className="mb-8"
          />

          {/* Tab Content */}
          <div className="relative">
            {activeTab === "ai-tools" && (
              <div className="space-y-8">
                <AIToolsComparisonTable />
                <AdvantageBox />
              </div>
            )}

            {activeTab === "dev-costs" && (
              <div className="p-8 rounded-2xl backdrop-blur-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Dev Team Costs</h3>
                <p className="text-gray-300">
                  Cost breakdown table content will be implemented in Subtask 4.4
                </p>
              </div>
            )}

            {activeTab === "roi-calculator" && (
              <div className="p-8 rounded-2xl backdrop-blur-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">ROI Calculator</h3>
                <p className="text-gray-300">
                  ROI calculator content will be implemented in Subtask 4.5
                </p>
              </div>
            )}
          </div>
        </ComparisonDropdown>
      </div>
    </section>
  );
} 