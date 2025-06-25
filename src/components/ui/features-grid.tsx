"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    BarChart3,
    Brain,
    MessageSquare,
    Target,
    Users,
    Zap
} from "lucide-react";
import React, { useState } from "react";

interface FeatureTier {
  name: string;
  description: string;
}

interface FeatureData {
  id: string;
  title: string;
  icon: React.ReactNode;
  metric: string;
  metricValue: string;
  tiers: {
    solo: FeatureTier;
    teams: FeatureTier;
    enterprise: FeatureTier;
  };
}

interface FeatureCardProps {
  feature: FeatureData;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

function FeatureCard({ feature, index, hoveredIndex, setHoveredIndex }: FeatureCardProps) {
  return (
    <motion.div
      className="relative group h-full"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative h-full min-h-[400px] bg-black/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 overflow-hidden group-hover:border-cyan-400/50 transition-all duration-500"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          boxShadow: '0 0 30px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Neon border effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)'
          }}
        />
        
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
            style={{
              left: `${20 + (i * 25)}%`,
              top: `${15 + (i * 20)}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <motion.div 
              className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-400/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-cyan-400 group-hover:text-purple-400 transition-colors duration-300">
                {feature.icon}
              </div>
            </motion.div>
            <div className="text-right">
              <div className="text-xs text-purple-400 font-medium uppercase tracking-wider">
                {feature.metric}
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {feature.metricValue}
              </div>
            </div>
          </div>

          {/* Title */}
          <motion.h3 
            className="text-xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            {feature.title}
          </motion.h3>

          {/* Tiers */}
          <div className="space-y-4 flex-1">
            {Object.entries(feature.tiers).map(([tierName, tier], tierIndex) => (
              <motion.div
                key={tierName}
                className="p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-purple-500/20 group-hover:border-cyan-400/30 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + tierIndex * 0.05 }}
                whileHover={{ x: 5, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-2 h-2 rounded-full ${
                    tierName === 'solo' ? 'bg-green-400' :
                    tierName === 'teams' ? 'bg-blue-400' : 'bg-purple-400'
                  }`} />
                  <span className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                    {tier.name}
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {tier.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="mt-6 h-1 bg-gradient-to-r from-purple-500/50 to-cyan-500/50 rounded-full"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Using exact copy from the phase document
  const features: FeatureData[] = [
    {
      id: "intelligent-agents",
      title: "Intelligent Agent Teams",
      icon: <Brain size={24} />,
      metric: "Development Speed",
      metricValue: "300%",
      tiers: {
        solo: {
          name: "Solo",
          description: "Personal AI coding assistant that understands your workflow and helps with development tasks."
        },
        teams: {
          name: "Teams", 
          description: "Collaborative AI development squad that coordinates with your team members seamlessly."
        },
        enterprise: {
          name: "Enterprise",
          description: "Custom AI model training tailored to your organization's specific needs and requirements."
        }
      }
    },
    {
      id: "seamless-communication",
      title: "Seamless Communication",
      icon: <MessageSquare size={24} />,
      metric: "Error Reduction",
      metricValue: "85%",
      tiers: {
        solo: {
          name: "Solo",
          description: "Direct AI-to-developer interface that keeps you informed and productive."
        },
        teams: {
          name: "Teams",
          description: "Real-time collaboration hub that ensures everyone stays synchronized and informed."
        },
        enterprise: {
          name: "Enterprise", 
          description: "Advanced workflow orchestration that manages complex team interactions automatically."
        }
      }
    },
    {
      id: "smart-analytics",
      title: "Smart Analytics",
      icon: <BarChart3 size={24} />,
      metric: "Decision Quality",
      metricValue: "90%",
      tiers: {
        solo: {
          name: "Solo",
          description: "Personal productivity insights that help you optimize your development workflow."
        },
        teams: {
          name: "Teams",
          description: "Team performance metrics that provide actionable insights for continuous improvement."
        },
        enterprise: {
          name: "Enterprise",
          description: "Organization-wide analytics with comprehensive reporting and strategic insights."
        }
      }
    },
    {
      id: "instant-execution",
      title: "Instant Execution", 
      icon: <Zap size={24} />,
      metric: "Time to Market",
      metricValue: "95%",
      tiers: {
        solo: {
          name: "Solo",
          description: "One-click deployment that gets your projects live instantly without complex setup."
        },
        teams: {
          name: "Teams",
          description: "Automated CI/CD pipelines that handle testing, building, and deployment seamlessly."
        },
        enterprise: {
          name: "Enterprise",
          description: "Multi-region deployment with advanced orchestration and zero-downtime updates."
        }
      }
    },
    {
      id: "human-ai-collaboration",
      title: "Human-AI Collaboration",
      icon: <Users size={24} />,
      metric: "Code Quality",
      metricValue: "99%",
      tiers: {
        solo: {
          name: "Solo", 
          description: "AI pair programming that enhances your coding skills and catches errors in real-time."
        },
        teams: {
          name: "Teams",
          description: "Hybrid development workflows that blend human creativity with AI efficiency."
        },
        enterprise: {
          name: "Enterprise",
          description: "Custom AI integration that adapts to your organization's development methodology."
        }
      }
    },
    {
      id: "goal-oriented-planning",
      title: "Goal-Oriented Planning",
      icon: <Target size={24} />,
      metric: "Success Rate",
      metricValue: "100%",
      tiers: {
        solo: {
          name: "Solo",
          description: "Intelligent project roadmaps that break down complex goals into achievable milestones."
        },
        teams: {
          name: "Teams",
          description: "Collaborative sprint planning that aligns team efforts with project objectives."
        },
        enterprise: {
          name: "Enterprise",
          description: "Strategic development alignment that connects technical work to business outcomes."
        }
      }
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 