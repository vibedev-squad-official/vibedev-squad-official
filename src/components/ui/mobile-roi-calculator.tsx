"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { 
  Calculator,
  Users,
  DollarSign,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  Minus,
  Plus,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MobileROICalculatorProps {
  className?: string;
  onCalculate?: (results: any) => void;
}

interface TeamSizePreset {
  size: number;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const teamPresets: TeamSizePreset[] = [
  { size: 5, label: 'Startup', icon: <Users className="h-5 w-5" />, color: 'from-blue-500 to-cyan-500' },
  { size: 10, label: 'Small', icon: <Users className="h-5 w-5" />, color: 'from-purple-500 to-pink-500' },
  { size: 25, label: 'Medium', icon: <Users className="h-5 w-5" />, color: 'from-green-500 to-emerald-500' },
  { size: 50, label: 'Large', icon: <Users className="h-5 w-5" />, color: 'from-orange-500 to-red-500' }
];

const AnimatedNumber: React.FC<{ value: number; format?: string }> = ({ value, format = 'currency' }) => {
  const { number } = useSpring({
    number: value,
    config: { tension: 120, friction: 40 }
  });

  return (
    <animated.span>
      {number.to(n => {
        if (format === 'currency') {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(n);
        }
        return Math.round(n).toLocaleString();
      })}
    </animated.span>
  );
};

export function MobileROICalculator({ className, onCalculate }: MobileROICalculatorProps) {
  const [teamSize, setTeamSize] = useState(10);
  const [avgSalary, setAvgSalary] = useState(120000);
  const [isExpanded, setIsExpanded] = useState(false);

  // Haptic feedback
  const triggerHaptic = (intensity: number = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(intensity);
    }
  };

  // Touch-friendly increment/decrement
  const adjustTeamSize = (delta: number) => {
    triggerHaptic();
    setTeamSize(prev => Math.max(1, Math.min(100, prev + delta)));
  };

  const adjustSalary = (delta: number) => {
    triggerHaptic();
    setAvgSalary(prev => Math.max(50000, Math.min(250000, prev + delta)));
  };

  // Dynamic pricing
  const getVibeDevSquadCost = (size: number) => {
    if (size <= 5) return 99 * 12;
    if (size <= 50) return 299 * 12;
    if (size <= 100) return 999 * 12;
    return 12000;
  };

  // Calculate results
  const traditionalCost = teamSize * avgSalary * 1.35; // Including benefits
  const vibeDevSquadCost = getVibeDevSquadCost(teamSize);
  const savings = traditionalCost - vibeDevSquadCost;
  const roi = (savings / traditionalCost) * 100;

  const handleCalculate = () => {
    triggerHaptic(20);
    if (onCalculate) {
      onCalculate({
        teamSize,
        avgSalary,
        traditionalCost,
        vibeDevSquadCost,
        savings,
        roi
      });
    }
  };

  return (
    <div className={cn("w-full max-w-lg mx-auto", className)}>
      {/* Collapsed View - Always Visible */}
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 backdrop-blur-xl border border-white/10"
        whileTap={{ scale: 0.98 }}
      >
        {/* Results Summary - Always Visible */}
        <div 
          className="p-6 cursor-pointer"
          onClick={() => {
            triggerHaptic();
            setIsExpanded(!isExpanded);
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
              <Calculator className="h-6 w-6 text-cyan-400" />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Quick ROI Calculator
              </span>
            </h3>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </motion.div>
          </div>

          {/* Key Result Display */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Annual Savings</span>
              <span className="text-2xl font-bold text-green-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                <AnimatedNumber value={savings} />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">ROI</span>
              <span className="text-xl font-bold text-purple-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                <AnimatedNumber value={roi} format="percent" />%
              </span>
            </div>
          </div>
        </div>

        {/* Expanded Controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-6 border-t border-white/10 pt-6">
                {/* Team Size Selector */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                    Team Size
                  </label>
                  
                  {/* Preset Buttons */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {teamPresets.map((preset) => (
                      <motion.button
                        key={preset.size}
                        onClick={() => {
                          triggerHaptic();
                          setTeamSize(preset.size);
                        }}
                        className={cn(
                          "relative p-3 rounded-xl transition-all touch-target",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
                          teamSize === preset.size
                            ? "bg-white/20 border border-white/30"
                            : "bg-white/5 border border-white/10 hover:bg-white/10"
                        )}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={cn(
                          "text-2xl font-bold mb-1",
                          teamSize === preset.size && `bg-gradient-to-r ${preset.color} bg-clip-text text-transparent`
                        )}>
                          {preset.size}
                        </div>
                        <div className="text-xs text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                          {preset.label}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Custom Size Controls */}
                  <div className="flex items-center justify-between bg-white/5 rounded-xl p-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => adjustTeamSize(-1)}
                      className="h-11 w-11 touch-target"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                        {teamSize}
                      </div>
                      <div className="text-xs text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">people</div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => adjustTeamSize(1)}
                      className="h-11 w-11 touch-target"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Average Salary Controls */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                    Average Salary
                  </label>
                  
                  <div className="flex items-center justify-between bg-white/5 rounded-xl p-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => adjustSalary(-10000)}
                      className="h-11 w-11 touch-target"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                        <AnimatedNumber value={avgSalary} />
                      </div>
                      <div className="text-xs text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">per year</div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => adjustSalary(10000)}
                      className="h-11 w-11 touch-target"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Traditional Team Cost</span>
                    <span className="text-lg font-semibold text-red-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                      <AnimatedNumber value={traditionalCost} />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Vibe DevSquad Cost</span>
                    <span className="text-lg font-semibold text-cyan-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                      <AnimatedNumber value={vibeDevSquadCost} />
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={handleCalculate}
                  size="lg"
                  className={cn(
                    "w-full h-14 text-lg font-semibold",
                    "bg-gradient-to-r from-green-500 to-emerald-600",
                    "hover:from-green-600 hover:to-emerald-700",
                    "touch-target",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                  )}
                >
                  <span className="flex items-center gap-2">
                    Get Detailed Savings Report
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Visual Indicator for Expandable State */}
      {!isExpanded && (
        <div className="text-center mt-2">
          <span className="text-xs text-gray-500 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
            Tap to customize calculation
          </span>
        </div>
      )}
    </div>
  );
}