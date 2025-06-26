'use client';

import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ROICalculatorProps {
  className?: string;
}

interface CalculatorState {
  teamSize: number;
  avgSalary: number;
  benefits: number;
}

export function ROICalculator({ className }: ROICalculatorProps) {
  const [values, setValues] = useState<CalculatorState>({
    teamSize: 25,
    avgSalary: 85000,
    benefits: 35,
  });

  // Dynamic pricing based on team size (from the phase document)
  const getVibeDevSquadCost = (teamSize: number) => {
    if (teamSize <= 5) return 99 * 12; // Solo: $1,188
    if (teamSize <= 50) return 299 * 12; // Growing Team: $3,588
    if (teamSize <= 100) return 999 * 12; // Business: $11,988
    return 12000; // Enterprise: $12,000
  };

  const calculateROI = () => {
    const traditionalCost = values.teamSize * values.avgSalary * (1 + values.benefits / 100);
    const vibeDevSquadCost = getVibeDevSquadCost(values.teamSize);
    const savings = traditionalCost - vibeDevSquadCost;
    const roi = savings > 0 ? (savings / traditionalCost) * 100 : 0;
    
    return {
      traditionalCost,
      vibeDevSquadCost,
      savings,
      roi,
    };
  };

  const { traditionalCost, vibeDevSquadCost, savings, roi } = calculateROI();

  const handleSliderChange = (field: keyof CalculatorState) => (newValue: number[]) => {
    setValues(prev => ({ ...prev, [field]: newValue[0] }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
            ROI Calculator
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Calculate your potential savings with Vibe DevSquad
        </motion.p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="relative p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5">
            {/* Neon glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-75" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  Input Parameters
                </span>
              </h3>

              {/* Team Size Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-semibold text-white/90">Team Size</label>
                  <div className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
                    <span className="text-blue-300 font-bold">{values.teamSize} people</span>
                  </div>
                </div>
                <div className="relative">
                  <Slider
                    value={[values.teamSize]}
                    onValueChange={handleSliderChange('teamSize')}
                    min={1}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg blur-sm -z-10" />
                </div>
              </div>

              {/* Average Salary Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-semibold text-white/90">Average Salary</label>
                  <div className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
                    <span className="text-purple-300 font-bold">{formatCurrency(values.avgSalary)}</span>
                  </div>
                </div>
                <div className="relative">
                  <Slider
                    value={[values.avgSalary]}
                    onValueChange={handleSliderChange('avgSalary')}
                    min={60000}
                    max={200000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm -z-10" />
                </div>
              </div>

              {/* Benefits Percentage Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-semibold text-white/90">Benefits & Overhead</label>
                  <div className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/30">
                    <span className="text-cyan-300 font-bold">{values.benefits}%</span>
                  </div>
                </div>
                <div className="relative">
                  <Slider
                    value={[values.benefits]}
                    onValueChange={handleSliderChange('benefits')}
                    min={20}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-lg blur-sm -z-10" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Display */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Traditional Team Cost */}
          <div className="relative p-6 rounded-2xl backdrop-blur-xl border border-red-400/30 bg-red-500/5">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur opacity-75" />
            <div className="relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-red-300 text-lg font-semibold">Traditional Team Cost</span>
                <span className="text-2xl font-bold text-red-400">{formatCurrency(traditionalCost)}</span>
              </div>
              <p className="text-red-300/80 text-sm mt-2">Annual cost with benefits & overhead</p>
            </div>
          </div>

          {/* Vibe DevSquad Cost */}
          <div className="relative p-6 rounded-2xl backdrop-blur-xl border border-green-400/30 bg-green-500/5">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl blur opacity-75" />
            <div className="relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-green-300 text-lg font-semibold">Vibe DevSquad Cost</span>
                <span className="text-2xl font-bold text-green-400">{formatCurrency(vibeDevSquadCost)}</span>
              </div>
              <p className="text-green-300/80 text-sm mt-2">Annual subscription cost</p>
            </div>
          </div>

          {/* Your Annual Savings */}
          <div className="relative p-6 rounded-2xl backdrop-blur-xl border border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur opacity-75" />
            <div className="relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-white text-lg font-semibold">Your Annual Savings</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {formatCurrency(savings)}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mr-2">
                  {roi.toFixed(1)}%
                </span>
                <span className="text-white/80 text-sm">savings rate</span>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg backdrop-blur-xl border border-white/10 bg-white/5 text-center">
              <div className="text-xl font-bold text-blue-300">
                {formatCurrency(savings / 12)}
              </div>
              <div className="text-white/60 text-sm">Monthly Savings</div>
            </div>
            <div className="p-4 rounded-lg backdrop-blur-xl border border-white/10 bg-white/5 text-center">
              <div className="text-xl font-bold text-purple-300">
                {formatCurrency(savings / values.teamSize)}
              </div>
              <div className="text-white/60 text-sm">Per Employee</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Integration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <button className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
          <span className="relative">Start Saving Today</span>
        </button>
        <p className="text-white/60 text-sm mt-4">
          * Results are estimates based on industry averages and may vary depending on specific implementation.
        </p>
      </motion.div>

      {/* Floating Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          style={{
            left: `${10 + (i * 15)}%`,
            top: `${20 + (i * 12)}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
} 