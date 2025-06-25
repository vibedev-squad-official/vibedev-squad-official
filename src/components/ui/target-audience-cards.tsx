"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, Rocket, Target, User, Users } from 'lucide-react'
import React, { useState } from 'react'

interface TargetAudienceCardProps {
  title: string
  subtitle: string
  description: string
  features: string[]
  icon: React.ReactNode
  accentColor: string
  ctaText: string
  popular?: boolean
}

const TargetAudienceCard: React.FC<TargetAudienceCardProps> = ({
  title,
  subtitle,
  description,
  features,
  icon,
  accentColor,
  ctaText,
  popular = false
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Glassmorphism Card */}
      <Card className="relative h-full p-8 bg-background/40 backdrop-blur-xl border border-border/50 overflow-hidden">
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${accentColor}20 50%, transparent 70%)`,
          }}
          animate={isHovered ? { x: ['-100%', '100%'] } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Popular Badge */}
        {popular && (
          <motion.div
            className="absolute -top-3 -right-3"
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: -12 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Badge 
              className="px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: accentColor, color: 'white' }}
            >
              Most Popular
            </Badge>
          </motion.div>
        )}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <motion.div
              className="mb-4 p-3 rounded-xl w-fit"
              style={{ backgroundColor: `${accentColor}20` }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div style={{ color: accentColor }} className="w-8 h-8">
                {icon}
              </div>
            </motion.div>
            
            <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
            <p className="text-lg font-medium" style={{ color: accentColor }}>
              {subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {description}
          </p>

          {/* Features */}
          <div className="flex-1 mb-8">
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
              Key Benefits
            </h4>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span className="text-muted-foreground text-sm leading-relaxed">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <Button
            className="w-full group/btn relative overflow-hidden"
            style={{ backgroundColor: accentColor }}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-white">
              {ctaText}
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </Button>
        </div>

        {/* Background Gradient */}
        <div 
          className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 70%)`
          }}
        />
      </Card>
    </motion.div>
  )
}

const TargetAudienceCards: React.FC = () => {
  const audienceData: TargetAudienceCardProps[] = [
    {
      title: "Solo Entrepreneurs",
      subtitle: "Launch & Scale Fast",
      description: "Perfect for individual founders and freelancers who need powerful AI solutions without the complexity. Get started quickly with our streamlined tools designed for rapid deployment.",
      features: [
        "Quick setup in under 30 minutes",
        "Pre-built AI templates and workflows",
        "Cost-effective pricing for startups",
        "24/7 community support",
        "No technical expertise required"
      ],
      icon: <User className="w-full h-full" />,
      accentColor: "#3B82F6",
      ctaText: "Start Building Today"
    },
    {
      title: "Growing Teams",
      subtitle: "Collaborate & Innovate",
      description: "Ideal for small to medium teams ready to integrate AI into their workflow. Scale your operations with collaborative tools and advanced customization options.",
      features: [
        "Team collaboration features",
        "Advanced customization options",
        "Priority support and training",
        "Integration with popular tools",
        "Performance analytics dashboard"
      ],
      icon: <Users className="w-full h-full" />,
      accentColor: "#10B981",
      ctaText: "Explore Team Features",
      popular: true
    },
    {
      title: "Enterprise",
      subtitle: "Transform at Scale",
      description: "Comprehensive AI solutions for large organizations. Get enterprise-grade security, dedicated support, and custom integrations tailored to your specific business needs.",
      features: [
        "Custom AI model development",
        "Enterprise-grade security & compliance",
        "Dedicated account management",
        "White-label solutions available",
        "SLA guarantees and 24/7 support"
      ],
      icon: <Building2 className="w-full h-full" />,
      accentColor: "#8B5CF6",
      ctaText: "Contact Sales Team"
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Choose Your Path
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            AI Solutions for Every
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {" "}Business Stage
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From solo entrepreneurs to enterprise organizations, we have the perfect AI development 
            solution tailored to your unique needs and growth stage.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audienceData.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
            >
              <TargetAudienceCard {...audience} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-muted-foreground mb-6">
            Not sure which solution fits your needs?
          </p>
          <Button variant="outline" className="group">
            <Rocket className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
            Schedule a Free Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default TargetAudienceCards 