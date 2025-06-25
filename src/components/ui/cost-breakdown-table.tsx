"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bot, Check, DollarSign, TrendingUp, Users } from "lucide-react";

interface CostBreakdownTableProps {
  className?: string;
}

interface RoleData {
  role: string;
  traditionalSalary: number;
  benefitsOverhead: number;
  totalAnnualCost: number;
  vibeDevSquad: string;
}

const roleData: RoleData[] = [
  {
    role: "Senior Frontend Developer",
    traditionalSalary: 120000,
    benefitsOverhead: 36000,
    totalAnnualCost: 156000,
    vibeDevSquad: "✓ Included"
  },
  {
    role: "Senior Backend Developer",
    traditionalSalary: 130000,
    benefitsOverhead: 39000,
    totalAnnualCost: 169000,
    vibeDevSquad: "✓ Included"
  },
  {
    role: "DevOps Engineer",
    traditionalSalary: 140000,
    benefitsOverhead: 42000,
    totalAnnualCost: 182000,
    vibeDevSquad: "✓ Included"
  },
  {
    role: "QA Engineer",
    traditionalSalary: 90000,
    benefitsOverhead: 27000,
    totalAnnualCost: 117000,
    vibeDevSquad: "✓ Included"
  },
  {
    role: "Project Manager",
    traditionalSalary: 100000,
    benefitsOverhead: 30000,
    totalAnnualCost: 130000,
    vibeDevSquad: "✓ Included"
  }
];

const totalTraditionalSalary = 580000;
const totalBenefitsOverhead = 174000;
const totalAnnualCost = 754000;
const vibeDevSquadCost = 1188;

export function CostBreakdownTable({ className }: CostBreakdownTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={cn("relative w-full max-w-7xl mx-auto", className)}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Traditional Development Team vs AI Orchestration
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Compare the real costs of building a development team
        </p>
      </motion.div>

      {/* Cost Breakdown Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-sm bg-white/5"
      >
        {/* Neon glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-50 blur-xl" />
        
        <div className="relative z-10 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-6 font-semibold text-white">Role</th>
                <th className="text-center p-6 font-semibold text-red-400">
                  <div className="flex items-center justify-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Traditional Salary
                  </div>
                </th>
                <th className="text-center p-6 font-semibold text-orange-400">
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Benefits & Overhead
                  </div>
                </th>
                <th className="text-center p-6 font-semibold text-red-500">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4" />
                    Total Annual Cost
                  </div>
                </th>
                <th className="text-center p-6 font-semibold text-green-400">
                  <div className="flex items-center justify-center gap-2">
                    <Bot className="h-4 w-4" />
                    Vibe DevSquad AI
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {roleData.map((role, index) => (
                <motion.tr
                  key={role.role}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors duration-300"
                >
                  <td className="p-6">
                    <div className="font-semibold text-white">{role.role}</div>
                  </td>
                  <td className="p-6 text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-lg font-bold text-red-400"
                    >
                      {formatCurrency(role.traditionalSalary)}
                    </motion.div>
                  </td>
                  <td className="p-6 text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="text-lg font-bold text-orange-400"
                    >
                      {formatCurrency(role.benefitsOverhead)}
                    </motion.div>
                  </td>
                  <td className="p-6 text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="text-lg font-bold text-red-500"
                    >
                      {formatCurrency(role.totalAnnualCost)}
                    </motion.div>
                  </td>
                  <td className="p-6 text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                      className="flex items-center justify-center gap-2 text-green-400 font-semibold"
                    >
                      <Check className="h-4 w-4" />
                      {role.vibeDevSquad}
                    </motion.div>
                  </td>
                </motion.tr>
              ))}
              
              {/* Total Row */}
              <motion.tr
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="border-t-2 border-white/30 bg-white/5"
              >
                <td className="p-6">
                  <div className="text-xl font-bold text-white">TOTAL TEAM COST</div>
                </td>
                <td className="p-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-xl font-bold text-red-400"
                  >
                    {formatCurrency(totalTraditionalSalary)}
                  </motion.div>
                </td>
                <td className="p-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7 }}
                    className="text-xl font-bold text-orange-400"
                  >
                    {formatCurrency(totalBenefitsOverhead)}
                  </motion.div>
                </td>
                <td className="p-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.9 }}
                    className="text-2xl font-bold text-red-500 relative"
                  >
                    <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-lg" />
                    <div className="relative">{formatCurrency(totalAnnualCost)}/year</div>
                  </motion.div>
                </td>
                <td className="p-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.1 }}
                    className="text-2xl font-bold text-green-400 relative"
                  >
                    <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-lg animate-pulse" />
                    <div className="relative">{formatCurrency(vibeDevSquadCost)}/year</div>
                  </motion.div>
                </td>
              </motion.tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
} 