"use client";

import { motion } from 'framer-motion';
import {
    AlertTriangle,
    Brain,
    CheckCircle,
    Code,
    Database,
    Settings,
    Shield,
    Users,
    Workflow,
    Zap
} from 'lucide-react';
import React from 'react';

interface ComparisonCardProps {
  type: 'problem' | 'solution';
  title: string;
  subtitle: string;
  items: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

function ComparisonCard({ type, title, subtitle, items }: ComparisonCardProps) {
  const isProblem = type === 'problem';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02,
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={`
        relative group h-full min-h-[700px] p-8 rounded-3xl backdrop-blur-xl border-2 
        transition-all duration-500 overflow-hidden
        ${isProblem 
          ? 'bg-red-950/20 border-red-500/30 hover:border-red-400/50 hover:bg-red-950/30' 
          : 'bg-green-950/20 border-green-500/30 hover:border-green-400/50 hover:bg-green-950/30'
        }
      `}
      style={{
        boxShadow: isProblem 
          ? '0 0 50px rgba(239, 68, 68, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 0 50px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Animated Background Glow */}
      <motion.div
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
          ${isProblem ? 'bg-red-500/5' : 'bg-green-500/5'}
        `}
        animate={{
          background: isProblem 
            ? ['rgba(239, 68, 68, 0.05)', 'rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.05)']
            : ['rgba(34, 197, 94, 0.05)', 'rgba(34, 197, 94, 0.1)', 'rgba(34, 197, 94, 0.05)']
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Neon Border Effect */}
      <motion.div
        className={`
          absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
          ${isProblem ? 'shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'shadow-[0_0_30px_rgba(34,197,94,0.3)]'}
        `}
        animate={{
          boxShadow: isProblem
            ? [
                '0 0 30px rgba(239, 68, 68, 0.3)',
                '0 0 50px rgba(239, 68, 68, 0.5)',
                '0 0 30px rgba(239, 68, 68, 0.3)'
              ]
            : [
                '0 0 30px rgba(34, 197, 94, 0.3)',
                '0 0 50px rgba(34, 197, 94, 0.5)',
                '0 0 30px rgba(34, 197, 94, 0.3)'
              ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`
            absolute w-1 h-1 rounded-full
            ${isProblem ? 'bg-red-400/40' : 'bg-green-400/40'}
          `}
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${30 + (i * 10)}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Header */}
      <motion.div 
        className="relative z-10 mb-8"
        initial={{ opacity: 0, x: isProblem ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.div
          className={`
            inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 border backdrop-blur-sm
            ${isProblem 
              ? 'bg-red-500/10 border-red-500/30 text-red-300' 
              : 'bg-green-500/10 border-green-500/30 text-green-300'
            }
          `}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            {isProblem ? (
              <AlertTriangle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
          </motion.div>
          <span className="text-sm font-medium">
            {isProblem ? '⚠️ Current State' : '✨ Future State'}
          </span>
          <div className={`w-2 h-2 rounded-full animate-pulse ${isProblem ? 'bg-red-400' : 'bg-green-400'}`} />
        </motion.div>

        <motion.h3 
          className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight"
          initial={{ opacity: 0, x: isProblem ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className={`text-lg ${isProblem ? 'text-red-200/80' : 'text-green-200/80'}`}
          initial={{ opacity: 0, x: isProblem ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Items List */}
      <motion.div 
        className="relative z-10 space-y-6"
        initial={{ opacity: 0, x: isProblem ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: isProblem ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 * index }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.02, 
              x: isProblem ? -5 : 5,
              transition: { duration: 0.2 }
            }}
            className={`
              group/item p-4 rounded-xl backdrop-blur-sm border transition-all duration-300
              ${isProblem 
                ? 'bg-red-950/30 border-red-500/20 hover:border-red-400/40 hover:bg-red-950/40' 
                : 'bg-green-950/30 border-green-500/20 hover:border-green-400/40 hover:bg-green-950/40'
              }
            `}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className={`
                  flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border
                  ${isProblem 
                    ? 'bg-red-500/20 border-red-500/30 text-red-300' 
                    : 'bg-green-500/20 border-green-500/30 text-green-300'
                  }
                `}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 180,
                  transition: { duration: 0.6 }
                }}
              >
                {item.icon}
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-white mb-2 group-hover/item:translate-x-1 transition-transform duration-200">
                  {item.title}
                </h4>
                <p className={`text-sm leading-relaxed ${isProblem ? 'text-red-200/70' : 'text-green-200/70'}`}>
                  {item.description}
                </p>
              </div>
            </div>

            {/* Item hover effect */}
            <motion.div
              className={`
                absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300
                ${isProblem ? 'bg-red-500/5' : 'bg-green-500/5'}
              `}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Accent */}
      <motion.div
        className={`
          absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl
          ${isProblem ? 'bg-gradient-to-r from-red-500/50 to-red-600/50' : 'bg-gradient-to-r from-green-500/50 to-green-600/50'}
        `}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export default function ProblemSolutionCards() {
  // Using exact copy from the phase document
  const problemItems = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Scattered tools and workflows",
      description: "Development teams struggle with disconnected tools that don't communicate, creating inefficiencies and bottlenecks across the development pipeline."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Communication breakdowns", 
      description: "Critical information gets lost between team members, leading to duplicated work, missed requirements, and project delays."
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Inconsistent code quality",
      description: "Without unified standards and automated quality checks, code quality varies significantly across team members and projects."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Manual repetitive tasks",
      description: "Developers waste hours on routine deployment, testing, and configuration tasks that should be automated but aren't."
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Expensive team overhead",
      description: "Traditional development teams require significant investment in salaries, benefits, management, and infrastructure costs."
    }
  ];

  const solutionItems = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Integrated AI development platform",
      description: "Unified platform where all development tools, workflows, and team members collaborate seamlessly through intelligent AI orchestration."
    },
    {
      icon: <Workflow className="h-6 w-6" />,
      title: "Seamless agent communication",
      description: "AI agents that understand context and communicate effectively, ensuring perfect information flow and coordinated development efforts."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Automated quality assurance",
      description: "Built-in quality gates, automated testing, and code review processes that ensure consistent, high-quality output across all projects."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Intelligent task automation",
      description: "Smart automation that handles deployment, testing, monitoring, and maintenance tasks, freeing teams to focus on innovation."
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "99% cost reduction",
      description: "Replace expensive development teams with AI agents that deliver the same quality and output at a fraction of the traditional cost."
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ComparisonCard
            type="problem"
            title="Development Fragmentation"
            subtitle="Scattered tools and workflows, Communication breakdowns, Inconsistent code quality, Manual repetitive tasks, Expensive team overhead"
            items={problemItems}
          />
          
          <ComparisonCard
            type="solution"
            title="Unified AI Orchestration"
            subtitle="Integrated AI development platform, Seamless agent communication, Automated quality assurance, Intelligent task automation, 99% cost reduction"
            items={solutionItems}
          />
        </div>
      </div>
    </section>
  );
} 