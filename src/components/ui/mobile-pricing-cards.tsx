"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  Crown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PricingTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "solo",
    name: "Solo",
    price: 99,
    description: "Perfect for individual developers and small projects",
    features: [
      "1 AI Development Team",
      "Up to 5 active projects",
      "Basic integrations",
      "Email support",
      "99.9% uptime SLA"
    ],
    icon: <Sparkles className="h-6 w-6" />,
    color: "from-cyan-500 to-blue-500",
    cta: "Start Free Trial"
  },
  {
    id: "team",
    name: "Growing Team",
    price: 299,
    description: "Ideal for startups and growing teams",
    features: [
      "Unlimited AI Teams",
      "Up to 50 active projects",
      "Advanced integrations",
      "Priority support",
      "Custom workflows",
      "Team collaboration"
    ],
    icon: <Zap className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    popular: true,
    cta: "Start Growing"
  },
  {
    id: "business",
    name: "Business",
    price: 999,
    description: "For established businesses with complex needs",
    features: [
      "Everything in Team",
      "Unlimited projects",
      "Enterprise integrations",
      "24/7 phone support",
      "Custom AI training",
      "Dedicated success manager"
    ],
    icon: <Shield className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    cta: "Contact Sales"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 0,
    description: "Custom solutions for large organizations",
    features: [
      "Everything in Business",
      "On-premise deployment",
      "Custom SLAs",
      "White-label options",
      "Compliance certifications",
      "Custom AI models"
    ],
    icon: <Crown className="h-6 w-6" />,
    color: "from-orange-500 to-red-500",
    cta: "Get Quote"
  }
];

export function MobilePricingCards({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with popular plan
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  // Haptic feedback
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  // Handle swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < pricingTiers.length - 1) {
      triggerHaptic();
      setCurrentIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      triggerHaptic();
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      triggerHaptic();
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < pricingTiers.length - 1) {
      triggerHaptic();
      setCurrentIndex(prev => prev + 1);
    }
  };

  const currentTier = pricingTiers[currentIndex];

  return (
    <div className={cn("w-full max-w-lg mx-auto", className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
            Choose Your Plan
          </span>
        </h2>
        <p className="text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
          Swipe to explore pricing options
        </p>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="h-11 w-11 touch-target"
          aria-label="Previous plan"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Plan Indicators */}
        <div className="flex gap-2">
          {pricingTiers.map((tier, index) => (
            <button
              key={tier.id}
              onClick={() => {
                triggerHaptic();
                setCurrentIndex(index);
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-300 touch-target-wrapper",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
                currentIndex === index
                  ? "w-8 bg-gradient-to-r from-cyan-500 to-purple-500"
                  : "w-2 bg-white/20 hover:bg-white/30"
              )}
              aria-label={`Go to ${tier.name} plan`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          disabled={currentIndex === pricingTiers.length - 1}
          className="h-11 w-11 touch-target"
          aria-label="Next plan"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Swipeable Card Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTier.id}
            initial={{ opacity: 0, x: touchStart && touchEnd && touchStart > touchEnd ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: touchStart && touchEnd && touchStart > touchEnd ? -100 : 100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative"
          >
            {/* Pricing Card */}
            <div className={cn(
              "relative overflow-hidden rounded-2xl",
              "bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50",
              "backdrop-blur-xl border border-white/10",
              "p-6"
            )}>
              {/* Background Gradient */}
              <div className={cn(
                "absolute inset-0 opacity-10",
                `bg-gradient-to-br ${currentTier.color}`
              )} />

              {/* Popular Badge */}
              {currentTier.popular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                    Most Popular
                  </Badge>
                </div>
              )}

              {/* Plan Header */}
              <div className="relative z-10 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    "p-3 rounded-xl",
                    `bg-gradient-to-br ${currentTier.color} opacity-20`
                  )}>
                    <div className={cn(
                      "bg-gradient-to-br",
                      currentTier.color,
                      "bg-clip-text text-transparent"
                    )}>
                      {currentTier.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                      {currentTier.name}
                    </h3>
                    <p className="text-sm text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                      {currentTier.description}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  {currentTier.price > 0 ? (
                    <>
                      <span className="text-4xl font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                        ${currentTier.price}
                      </span>
                      <span className="text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">/month</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                      Custom Pricing
                    </span>
                  )}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-6">
                {currentTier.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center",
                      `bg-gradient-to-br ${currentTier.color} opacity-20`
                    )}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className={cn(
                  "w-full h-14 text-lg font-semibold",
                  `bg-gradient-to-r ${currentTier.color}`,
                  "hover:opacity-90 transition-opacity",
                  "touch-target",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                )}
                onClick={() => triggerHaptic(20)}
              >
                <span className="flex items-center gap-2">
                  {currentTier.cta}
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Button>

              {/* Trust Indicators */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                  No credit card required • 30-day money back guarantee
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Comparison Link */}
      <div className="text-center mt-6">
        <Button
          variant="link"
          className="text-cyan-400 hover:text-cyan-300 touch-target"
          onClick={() => triggerHaptic()}
        >
          View detailed feature comparison
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}