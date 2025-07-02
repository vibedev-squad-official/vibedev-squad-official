'use client';

import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building, Check, Crown, Phone, Star, Users, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface PricingTier {
  name: string;
  subtitle: string;
  price: { monthly: number; yearly: number };
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  borderGradient: string;
  features: string[];
  highlight: boolean;
  badge: string | null;
  buttonText: string;
  buttonVariant: 'default' | 'outline';
}

interface PricingCardsProps {
  tiers?: PricingTier[];
  onPlanSelect?: (planName: string, isYearly: boolean) => void;
  yearlyDiscountPercent?: number;
}

const defaultTiers: PricingTier[] = [
  {
    name: "Solo",
    subtitle: "Personal AI coding assistant",
    price: { monthly: 49, yearly: 490 },
    description: "Perfect for individual developers and solo entrepreneurs",
    icon: Zap,
    gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
    borderGradient: "from-cyan-400 via-blue-400 to-indigo-400",
    features: [
      "Personal AI coding assistant",
      "5 projects",
      "Basic support",
      "Standard deployment",
      "Basic analytics",
      "Email support"
    ],
    highlight: false,
    badge: null,
    buttonText: "Start Free Trial",
    buttonVariant: 'outline'
  },
  {
    name: "Teams",
    subtitle: "Collaborative AI development squad",
    price: { monthly: 199, yearly: 1990 },
    description: "Advanced AI capabilities for growing teams and businesses",
    icon: Users,
    gradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
    borderGradient: "from-purple-400 via-pink-400 to-rose-400",
    features: [
      "Collaborative AI development squad",
      "25 projects",
      "Priority support",
      "Advanced CI/CD pipelines",
      "Team analytics",
      "Real-time collaboration",
      "API access",
      "Custom templates"
    ],
    highlight: true,
    badge: "Most Popular",
    buttonText: "Get Started",
    buttonVariant: 'default'
  },
  {
    name: "Enterprise",
    subtitle: "Custom AI model training",
    price: { monthly: 499, yearly: 4990 },
    description: "Enterprise-grade AI solutions with full control and customization",
    icon: Building,
    gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    borderGradient: "from-emerald-400 via-teal-400 to-cyan-400",
    features: [
      "Custom AI model training",
      "Unlimited projects",
      "24/7 dedicated support",
      "Multi-region deployment",
      "Advanced security",
      "Custom integrations",
      "SLA guarantee",
      "White-label options"
    ],
    highlight: false,
    badge: "Enterprise",
    buttonText: "Contact Sales",
    buttonVariant: 'outline'
  },
  {
    name: "Custom",
    subtitle: "Fully customized AI development platform",
    price: { monthly: 0, yearly: 0 },
    description: "Tailored solutions designed specifically for your organization",
    icon: Crown,
    gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    borderGradient: "from-amber-400 via-orange-400 to-red-400",
    features: [
      "Fully customized AI development platform",
      "White-label solutions",
      "Dedicated infrastructure",
      "Enterprise SLA",
      "Custom training programs",
      "Unlimited everything",
      "Dedicated account manager",
      "On-premise deployment"
    ],
    highlight: false,
    badge: "Custom",
    buttonText: "Contact Sales",
    buttonVariant: 'outline'
  }
];

export function PricingCards({
  tiers = defaultTiers,
  onPlanSelect,
  yearlyDiscountPercent = 20
}: PricingCardsProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{left: number, top: number}>>([]);

  useEffect(() => {
    setIsClient(true);
    // Generate particles only on client side
    const newParticles = Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100
    }));
    setParticles(newParticles);
  }, []);

  const handlePlanSelect = (planName: string) => {
    onPlanSelect?.(planName, isYearly);
  };

  const calculateYearlySavings = (monthlyPrice: number, yearlyPrice: number) => {
    return Math.max(0, (monthlyPrice * 12) - yearlyPrice);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardHover = {
    rest: { scale: 1, y: 0, rotateY: 0 },
    hover: { 
      scale: 1.03, 
      y: -8,
      rotateY: 2,
      transition: {
        duration: 0.4
      }
    }
  };

  const glowAnimation = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)",
        "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.2)",
        "0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity
      }
    }
  };

  return (
    <section 
      className="relative py-20 text-foreground overflow-hidden"
      data-testid="pricing-section"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.08]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity
          }}
          style={{
            backgroundSize: '400% 400%'
          }}
        />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity
          }}
        />

        {/* Particle Effects */}
        {isClient && particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i * 0.2), // Use index instead of Math.random()
              repeat: Infinity,
              delay: i * 0.1, // Use index instead of Math.random()
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Billing Toggle */}
        <motion.div 
          className="flex items-center justify-center gap-4 mb-16"
          variants={fadeInUp}
        >
          <span className={`text-lg font-medium transition-colors ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <motion.button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-20 h-10 rounded-full border-2 transition-all ${
              isYearly ? 'bg-gradient-to-r from-primary to-secondary border-primary' : 'bg-muted border-border'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-1 w-7 h-7 bg-background rounded-full shadow-lg"
              animate={{
                x: isYearly ? 40 : 2
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            />
          </motion.button>
          <span className={`text-lg font-medium transition-colors ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Yearly
          </span>
          {isYearly && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-sm text-green-400 font-medium"
            >
              Save {yearlyDiscountPercent}%
            </motion.div>
          )}
        </motion.div>

        {/* Pricing Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={staggerContainer}
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className="relative perspective-1000"
              variants={fadeInUp}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                className={`relative h-full backdrop-blur-xl rounded-2xl border overflow-hidden ${
                  tier.highlight
                    ? 'bg-gradient-to-br from-primary/15 to-primary/5 border-primary/50'
                    : 'bg-gradient-to-br from-background/80 to-background/40 border-border'
                }`}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                animate={tier.highlight ? glowAnimation.animate : {}}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                data-testid="pricing-card"
              >
                {/* Neon Border Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tier.borderGradient} opacity-0 blur-sm`}
                  animate={{
                    opacity: hoveredCard === index ? [0, 0.6, 0] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredCard === index ? Infinity : 0
                  }}
                />

                {/* Badge */}
                {tier.badge && (
                  <motion.div
                    className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${tier.borderGradient} text-white shadow-lg`}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {tier.badge}
                  </motion.div>
                )}

                {/* Gradient Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} rounded-2xl opacity-50`}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity
                  }}
                  style={{
                    backgroundSize: '200% 200%'
                  }}
                />

                <div className="relative z-10 p-6 h-full flex flex-col">
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tier.gradient} border border-border flex items-center justify-center mb-4`}
                    whileHover={{ scale: 1.1, rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <tier.icon className="w-7 h-7 text-foreground" />
                  </motion.div>

                  {/* Plan Info */}
                  <h3 className="text-2xl font-bold text-foreground mb-1">{tier.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{tier.subtitle}</p>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">{tier.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      {tier.name === "Custom" ? (
                        <span className="text-3xl font-bold text-foreground">Contact Sales</span>
                      ) : (
                        <>
                          <span className="text-3xl font-bold text-foreground">
                            ${isYearly ? tier.price.yearly : tier.price.monthly}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            /{isYearly ? 'year' : 'month'}
                          </span>
                        </>
                      )}
                    </div>
                    {isYearly && tier.name !== "Custom" && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-400 text-sm mt-1"
                      >
                        Save ${calculateYearlySavings(tier.price.monthly, tier.price.yearly)} per year
                      </motion.p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-6 flex-grow">
                    {tier.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-3 py-1.5"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handlePlanSelect(tier.name)}
                    variant={tier.buttonVariant}
                    className={`w-full py-3 font-medium transition-all ${
                      tier.highlight
                        ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground border-0'
                        : 'bg-background/80 border border-border text-foreground hover:bg-background hover:border-border/80'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {tier.buttonText}
                      {tier.name === "Custom" || tier.name === "Enterprise" ? (
                        <Phone className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </span>
                  </Button>
                </div>

                {/* Hover Glow Effect */}
                <AnimatePresence>
                  {hoveredCard === index && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(6, 182, 212, 0.02) 100%)`,
                        filter: 'blur(15px)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
        >
          <div className="relative bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl rounded-3xl border border-border p-8 md:p-12 overflow-hidden max-w-4xl mx-auto">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/8 via-secondary/5 to-accent/8 rounded-3xl"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity
              }}
              style={{
                backgroundSize: '300% 300%'
              }}
            />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
                  Ready to Transform Your Development Process?
                </span>
              </h3>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join thousands of teams already using our AI platform to revolutionize their development workflow. 
                Start your journey today with a 14-day free trial.
              </p>
              
              <motion.button
                className="relative group overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground font-medium py-4 px-8 rounded-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Star className="h-5 w-5" />
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 