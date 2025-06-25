"use client";

import { motion } from 'framer-motion';
import { Code, Sparkles, Target, Users, Zap } from 'lucide-react';
import React from 'react';
import OriginStoryMetricsGrid from './metrics-grid';
import { StoryContentContainer } from './story-content';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ children, className = "" }) => {
  return (
    <motion.span
      className={`relative inline-block bg-gradient-to-r from-[#0ea5e9] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent ${className}`}
      style={{
        filter: 'drop-shadow(0 0 20px rgba(14, 165, 233, 0.3))',
        backgroundSize: '200% 200%',
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.span>
  );
};

interface SparkleProps {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
}

const Sparkle: React.FC<SparkleProps> = ({ id, x, y, color, delay, scale }) => {
  return (
    <motion.svg
      key={id}
      className="pointer-events-none absolute z-20"
      initial={{ opacity: 0, left: x, top: y }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, scale, 0],
        rotate: [75, 120, 150],
      }}
      transition={{ duration: 0.8, repeat: Infinity, delay }}
      width="21"
      height="21"
      viewBox="0 0 21 21"
    >
      <path
        d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
        fill={color}
      />
    </motion.svg>
  );
};

interface SparklesTextProps {
  text: string;
  className?: string;
  sparklesCount?: number;
  colors?: {
    first: string;
    second: string;
  };
}

const SparklesText: React.FC<SparklesTextProps> = ({
  text,
  className = "",
  sparklesCount = 8,
  colors = { first: "#0ea5e9", second: "#8b5cf6" }
}) => {
  const [sparkles, setSparkles] = React.useState<SparkleProps[]>([]);

  React.useEffect(() => {
    const generateStar = (): SparkleProps => {
      const starX = `${Math.random() * 100}%`;
      const starY = `${Math.random() * 100}%`;
      const color = Math.random() > 0.5 ? colors.first : colors.second;
      const delay = Math.random() * 2;
      const scale = Math.random() * 1 + 0.3;
      const id = `${starX}-${starY}-${Date.now()}`;
      return { id, x: starX, y: starY, color, delay, scale };
    };

    const initializeStars = () => {
      const newSparkles = Array.from({ length: sparklesCount }, generateStar);
      setSparkles(newSparkles);
    };

    initializeStars();
    const interval = setInterval(() => {
      setSparkles(currentSparkles =>
        currentSparkles.map(star => generateStar())
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [colors.first, colors.second, sparklesCount]);

  return (
    <div className={`relative inline-block ${className}`}>
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} {...sparkle} />
      ))}
      <span className="relative z-10">{text}</span>
    </div>
  );
};

const OriginStorySection: React.FC = () => {
  const problemPoints = [
    {
      icon: Code,
      title: "Endless Context Switching",
      description: "Jumping between 15+ tools just to ship one feature"
    },
    {
      icon: Users,
      title: "Communication Overhead",
      description: "More time in meetings than actually building"
    },
    {
      icon: Zap,
      title: "Manual Repetition",
      description: "Doing the same tasks over and over again"
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="relative z-10 py-24 lg:py-32 text-foreground overflow-hidden">

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 lg:mb-20"
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-border backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Target className="h-4 w-4 text-[#0ea5e9]" />
            </motion.div>
            <SparklesText 
              text="🎯 From Solo Struggle to AI Orchestra"
              className="text-sm font-medium"
              sparklesCount={6}
            />
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 tracking-tight leading-tight"
            variants={fadeInUp}
            style={{
              textShadow: '0 0 40px rgba(14, 165, 233, 0.1)'
            }}
          >
            <span className="block mb-2">
              The Problem
            </span>
            <GradientText className="block">
              Every Developer Knows
            </GradientText>
          </motion.h2>
          
          <motion.p 
            className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            You know the feeling. It's 2 AM, you're drowning in tabs, switching between Slack, Jira, GitHub, 
            and 12 other tools just to ship one simple feature. There has to be a better way.
          </motion.p>
        </motion.div>

        {/* Problem Points Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16"
          variants={staggerContainer}
        >
          {problemPoints.map((point, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={fadeInUp}
              whileHover={{ y: -8 }}
            >
              <div className="relative p-8 bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 hover:border-[#0ea5e9]/30 transition-all duration-300">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0ea5e9]/5 to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0ea5e9]/20 to-[#8b5cf6]/20 border border-[#0ea5e9]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <point.icon className="w-8 h-8 text-[#0ea5e9]" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {point.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Content */}
        <motion.div 
          className="mb-16"
          variants={fadeInUp}
        >
          <StoryContentContainer />
        </motion.div>

        {/* Metrics Grid */}
        <motion.div 
          className="mb-16"
          variants={fadeInUp}
        >
          <OriginStoryMetricsGrid />
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#0ea5e9]/10 to-[#8b5cf6]/10 border border-[#0ea5e9]/20 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            style={{
              boxShadow: '0 0 30px rgba(14, 165, 233, 0.1)'
            }}
          >
            <Sparkles className="h-5 w-5 text-[#0ea5e9]" />
            <span className="text-lg font-medium text-foreground">
              Ready to orchestrate your own AI symphony?
            </span>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#0ea5e9]/40 rounded-full"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (i * 6)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default OriginStorySection; 