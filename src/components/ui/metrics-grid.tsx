"use client"

import { motion } from 'framer-motion';
import { Building, DollarSign, TrendingUp, Users } from 'lucide-react';
import React, { useState } from 'react';

interface MetricData {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'purple' | 'cyan' | 'green';
}

interface MetricCardProps {
  metric: MetricData;
  index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorVariants = {
    blue: {
      border: 'border-blue-500/50',
      glow: 'shadow-blue-500/25',
      hoverGlow: 'hover:shadow-blue-500/40 hover:shadow-2xl',
      icon: 'text-blue-400',
      gradient: 'from-blue-500/10 to-blue-600/5'
    },
    purple: {
      border: 'border-purple-500/50',
      glow: 'shadow-purple-500/25',
      hoverGlow: 'hover:shadow-purple-500/40 hover:shadow-2xl',
      icon: 'text-purple-400',
      gradient: 'from-purple-500/10 to-purple-600/5'
    },
    cyan: {
      border: 'border-cyan-500/50',
      glow: 'shadow-cyan-500/25',
      hoverGlow: 'hover:shadow-cyan-500/40 hover:shadow-2xl',
      icon: 'text-cyan-400',
      gradient: 'from-cyan-500/10 to-cyan-600/5'
    },
    green: {
      border: 'border-green-500/50',
      glow: 'shadow-green-500/25',
      hoverGlow: 'hover:shadow-green-500/40 hover:shadow-2xl',
      icon: 'text-green-400',
      gradient: 'from-green-500/10 to-green-600/5'
    }
  };

  const colors = colorVariants[metric.color];
  const IconComponent = metric.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`
        relative p-6 bg-white/5 backdrop-blur-md border rounded-xl transition-all duration-300 cursor-pointer
        ${colors.border} ${colors.glow} ${colors.hoverGlow}
        hover:bg-white/10 hover:scale-[1.02] hover:-translate-y-1
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div 
        className={`
          absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 bg-gradient-to-br
          ${colors.gradient}
          ${isHovered ? 'opacity-100' : ''}
        `}
      />
      
      {/* Neon border animation */}
      <div 
        className={`
          absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none
          ${isHovered ? `shadow-[0_0_30px_${metric.color === 'blue' ? 'rgba(59,130,246,0.4)' : metric.color === 'purple' ? 'rgba(168,85,247,0.4)' : metric.color === 'cyan' ? 'rgba(6,182,212,0.4)' : 'rgba(34,197,94,0.4)'}]` : ''}
        `}
      />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-white/70 truncate pr-2">
            {metric.title}
          </h3>
          <motion.div 
            className={`transition-all duration-300 ${isHovered ? 'scale-110 rotate-12' : ''}`}
            animate={isHovered ? { scale: 1.1, rotate: 12 } : { scale: 1, rotate: 0 }}
          >
            <IconComponent className={`h-5 w-5 ${colors.icon}`} />
          </motion.div>
        </div>

        {/* Value */}
        <div className="space-y-1">
          <span className="text-2xl font-bold text-white tracking-tight">
            {metric.value}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-white/60 leading-relaxed">
          {metric.description}
        </p>
      </div>

      {/* Pulse animation for hover state */}
      {isHovered && (
        <motion.div 
          className={`absolute inset-0 rounded-xl animate-pulse bg-${metric.color}-500/5`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
};

const OriginStoryMetricsGrid: React.FC = () => {
  const metrics: MetricData[] = [
    {
      id: 'solo',
      title: 'Solo Entrepreneurs',
      value: '1 = 10',
      description: '1 person = 10-person team output',
      icon: Users,
      color: 'blue'
    },
    {
      id: 'small-teams',
      title: 'Small Teams',
      value: '3 = 30',
      description: '3 developers = 30-person team capacity',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      value: '50 = 500',
      description: '50 developers = 500-person team velocity',
      icon: Building,
      color: 'cyan'
    },
    {
      id: 'cost-savings',
      title: 'Cost Savings',
      value: '98.8%',
      description: '98.8% reduction vs traditional hiring',
      icon: DollarSign,
      color: 'green'
    }
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.id}
          metric={metric}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default OriginStoryMetricsGrid; 