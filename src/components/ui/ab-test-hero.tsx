"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useABTest } from '@/utils/ab-testing.tsx';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle, Code, Database, DollarSign, GitBranch, Settings, Shield } from 'lucide-react';
import React, { useState } from 'react';

interface ABTestHeroProps {
  className?: string;
}

interface Robot {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const RobotAgent: React.FC<{ robot: Robot; index: number }> = ({ robot, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative flex flex-col items-center group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Robot Body */}
      <motion.div
        animate={{ 
          y: [0, -5, 0],
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ 
          y: { repeat: Infinity, duration: 3, delay: index * 0.5 },
          scale: { duration: 0.3 }
        }}
        className="relative"
      >
        {/* Spotlight/Glow */}
        <div 
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-6 rounded-full blur-lg opacity-60"
          style={{ backgroundColor: robot.color }}
        />
        
        {/* Robot Container */}
        <div 
          className={`relative w-16 h-24 rounded-lg border-2 transition-all duration-300 ${
            isHovered ? 'shadow-lg' : ''
          }`}
          style={{ 
            borderColor: robot.color,
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            boxShadow: isHovered ? `0 0 20px ${robot.color}40` : 'none'
          }}
        >
          {/* Robot Head */}
          <div 
            className="absolute top-1 left-1/2 transform -translate-x-1/2 w-10 h-6 rounded-md border"
            style={{ borderColor: robot.color, backgroundColor: 'rgba(30, 41, 59, 0.9)' }}
          >
            {/* Eyes */}
            <div className="flex justify-center items-center h-full space-x-1">
              <div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: robot.color }}
              />
              <div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: robot.color }}
              />
            </div>
          </div>
          
          {/* Robot Body/Chest */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-10 rounded border"
               style={{ borderColor: robot.color, backgroundColor: 'rgba(30, 41, 59, 0.9)' }}>
            <div className="flex justify-center items-center h-full">
              <div style={{ color: robot.color }}>
                {robot.icon}
              </div>
            </div>
          </div>
          
          {/* Robot Arms */}
          <div 
            className="absolute top-10 -left-1.5 w-3 h-6 rounded border"
            style={{ borderColor: robot.color, backgroundColor: 'rgba(30, 41, 59, 0.9)' }}
          />
          <div 
            className="absolute top-10 -right-1.5 w-3 h-6 rounded border"
            style={{ borderColor: robot.color, backgroundColor: 'rgba(30, 41, 59, 0.9)' }}
          />
        </div>
      </motion.div>
      
      {/* Label */}
      <motion.div
        animate={{ 
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="mt-3 text-center"
      >
        <div className="font-bold text-white text-xs [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">{robot.name}</div>
        <div className="text-white/60 text-xs italic [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">{robot.role}</div>
      </motion.div>
    </motion.div>
  );
};

export const ABTestHero: React.FC<ABTestHeroProps> = ({ className }) => {
  const heroTest = useABTest('hero-headline-test');
  const ctaTest = useABTest('cta-button-test');

  // Robot team data
  const robots: Robot[] = [
    {
      id: 'frontend',
      name: 'Frontend AI',
      role: 'UI/UX Designer',
      description: 'Crafting beautiful, responsive user interfaces',
      color: '#00D4FF',
      icon: <Code size={14} />
    },
    {
      id: 'backend',
      name: 'Backend AI',
      role: 'API Developer',
      description: 'Building robust APIs and server architecture',
      color: '#FF6B6B',
      icon: <Database size={14} />
    },
    {
      id: 'qa',
      name: 'QA AI',
      role: 'Quality Assurance',
      description: 'Ensuring code quality and testing excellence',
      color: '#4ECDC4',
      icon: <CheckCircle size={14} />
    },
    {
      id: 'devops',
      name: 'DevOps AI',
      role: 'Infrastructure',
      description: 'Managing deployment and infrastructure',
      color: '#45B7D1',
      icon: <Settings size={14} />
    },
    {
      id: 'planning',
      name: 'Planning AI',
      role: 'Project Manager',
      description: 'Coordinating projects and timelines',
      color: '#96CEB4',
      icon: <GitBranch size={14} />
    },
    {
      id: 'security',
      name: 'Security AI',
      role: 'Security Expert',
      description: 'Protecting your applications and data',
      color: '#FFEAA7',
      icon: <Shield size={14} />
    }
  ];

  // Get headline content based on A/B test variant
  const getHeadlineContent = () => {
    if (!heroTest.variant?.metadata) {
      // Fallback content
      return {
        headline: 'From One Developer to Unlimited Teams',
        subheadline: 'Scale your development with AI-powered automation'
      };
    }

    return {
      headline: heroTest.variant.metadata.headline,
      subheadline: heroTest.variant.metadata.subheadline
    };
  };

  // Get CTA content based on A/B test variant
  const getCTAContent = () => {
    if (!ctaTest.variant?.metadata) {
      // Fallback content
      return {
        primaryCTA: 'Start Free Trial',
        secondaryCTA: 'Learn More'
      };
    }

    return {
      primaryCTA: ctaTest.variant.metadata.primaryCTA,
      secondaryCTA: ctaTest.variant.metadata.secondaryCTA
    };
  };

  const headlineContent = getHeadlineContent();
  const ctaContent = getCTAContent();

  const handlePrimaryCTA = () => {
    heroTest.trackEvent('cta_click_primary', {
      variant: heroTest.variant?.id,
      cta_text: ctaContent.primaryCTA,
      position: 'hero'
    });
    ctaTest.trackEvent('cta_click_primary', {
      variant: ctaTest.variant?.id,
      cta_text: ctaContent.primaryCTA
    });
    
    // Navigation or action here
    console.log('Primary CTA clicked:', ctaContent.primaryCTA);
  };

  const handleSecondaryCTA = () => {
    heroTest.trackEvent('cta_click_secondary', {
      variant: heroTest.variant?.id,
      cta_text: ctaContent.secondaryCTA,
      position: 'hero'
    });
    ctaTest.trackEvent('cta_click_secondary', {
      variant: ctaTest.variant?.id,
      cta_text: ctaContent.secondaryCTA
    });
    
    // Navigation or action here
    console.log('Secondary CTA clicked:', ctaContent.secondaryCTA);
  };

  const handleUrgencyBadgeClick = () => {
    heroTest.trackEvent('urgency_badge_click', {
      variant: heroTest.variant?.id
    });
  };

  return (
    <section 
      className={cn("min-h-screen relative overflow-hidden flex items-center justify-center", className)}
      aria-label="Hero section"
      data-testid="hero-section"
    >
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-12" role="main" id="main-content">
          
          {/* Urgency Badge with Live Count */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Badge 
              variant="outline" 
              className="px-6 py-3 text-sm font-medium bg-red-500/10 backdrop-blur-md border-red-400/30 text-white hover:bg-red-500/20 transition-all duration-300 shadow-lg [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] cursor-pointer"
              role="status"
              aria-live="polite"
              onClick={handleUrgencyBadgeClick}
            >
              <AlertCircle className="w-4 h-4 mr-2 text-red-400" aria-hidden="true" />
              <span className="relative z-10">Join 2,500+ teams who switched this month</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-sm animate-pulse" aria-hidden="true" />
            </Badge>
          </motion.div>

          {/* Dynamic Headlines Based on A/B Test */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              {/* Render different headline styles based on variant */}
              {heroTest.variant?.id === 'variant-a' ? (
                <>
                  <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-pulse [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                    {headlineContent.headline.split(' ').slice(0, 3).join(' ')}
                  </span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                    {headlineContent.headline.split(' ').slice(3).join(' ')}
                  </span>
                </>
              ) : heroTest.variant?.id === 'variant-b' ? (
                <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                  {headlineContent.headline}
                </span>
              ) : (
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                  {headlineContent.headline}
                </span>
              )}
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 max-w-4xl mx-auto leading-relaxed">
              <span className="bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                {headlineContent.subheadline}
              </span>
            </h2>
          </motion.div>

          {/* Value Proposition with Specific Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <p className="text-lg md:text-xl text-white/80 leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
              Get a full development team of AI agents that ship production-ready code 24/7. 
              No hiring, no management, no overhead – just results.
            </p>
            
            {/* Specific Savings Showcase */}
            <div className="flex flex-wrap justify-center gap-6 py-4">
              <motion.div 
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => heroTest.trackEvent('value_prop_click', { prop: 'savings' })}
              >
                <DollarSign className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-bold text-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Save $360,000/year</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => heroTest.trackEvent('value_prop_click', { prop: 'speed' })}
              >
                <CheckCircle className="w-6 h-6 text-cyan-400" />
                <span className="text-cyan-400 font-bold text-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Ship 10x Faster</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => heroTest.trackEvent('value_prop_click', { prop: 'risk' })}
              >
                <Shield className="w-6 h-6 text-purple-400" />
                <span className="text-purple-400 font-bold text-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Zero Risk</span>
              </motion.div>
            </div>

            {/* Risk Reversal */}
            <p className="text-base md:text-lg text-white/60 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
              <span className="text-white font-semibold">No credit card required</span> • 
              <span className="text-white font-semibold"> Cancel anytime</span> • 
              <span className="text-white font-semibold"> 30-day money-back guarantee</span>
            </p>
          </motion.div>

          {/* AI Robot Team Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-white/90 mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                Meet Your AI Development Team
              </h3>
              <p className="text-sm md:text-base text-white/70 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                Six specialized AI agents working together 24/7
              </p>
            </div>
            
            {/* Robot Lineup */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
              {robots.map((robot, index) => (
                <RobotAgent key={robot.id} robot={robot} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Dynamic CTA Buttons Based on A/B Test */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            role="group"
            aria-label="Call to action buttons"
          >
            <Button 
              size="lg" 
              className={cn(
                "px-8 py-6 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600",
                "hover:from-green-600 hover:to-emerald-700 text-white border-0",
                "shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
                "touch-target focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              )}
              onClick={handlePrimaryCTA}
              aria-label={`${ctaContent.primaryCTA} - Start your free trial`}
              data-testid="cta-button"
            >
              <span className="flex items-center gap-2">
                {ctaContent.primaryCTA}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </span>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className={cn(
                "px-8 py-6 text-lg font-semibold bg-white/10 backdrop-blur-md",
                "border-white/20 text-white hover:bg-white/20 hover:border-white/30",
                "transition-all duration-300 touch-target",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              )}
              onClick={handleSecondaryCTA}
              aria-label={`${ctaContent.secondaryCTA} - Learn more about our services`}
            >
              {ctaContent.secondaryCTA}
            </Button>
          </motion.div>

          {/* A/B Test Debug Info (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono max-w-xs"
            >
              <div>Hero Test: {heroTest.variant?.name || 'Loading...'}</div>
              <div>CTA Test: {ctaTest.variant?.name || 'Loading...'}</div>
              <div className="mt-2 text-xs text-gray-400">
                A/B Test Debug (dev only)
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ABTestHero;