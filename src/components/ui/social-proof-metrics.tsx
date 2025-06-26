"use client";

import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import { Bot, TrendingUp, Users, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";

const fontSize = 32;
const padding = 8;
const height = fontSize + padding;

interface CounterProps {
  start?: number;
  end: number;
  duration?: number;
  className?: string;
}

const AnimatedCounter = ({ start = 0, end, duration = 2000, className }: CounterProps) => {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const increment = Math.ceil((end - start) / (duration / 50));
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev < end) {
          return Math.min(prev + increment, end);
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [start, end, duration]);

  return (
    <div
      style={{ fontSize }}
      className={`flex overflow-hidden leading-none font-bold tabular-nums ${className}`}
    >
      {value >= 100000 && <Digit place={100000} value={value} />}
      {value >= 10000 && <Digit place={10000} value={value} />}
      {value >= 1000 && <Digit place={1000} value={value} />}
      {value >= 100 && <Digit place={100} value={value} />}
      {value >= 10 && <Digit place={10} value={value} />}
      <Digit place={1} value={value} />
    </div>
  );
};

function Digit({ place, value }: { place: number; value: number }) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {[...Array(10)].map((_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const MetricCard = ({ icon, value, label, suffix = "", delay = 0 }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
      <div className="relative bg-background/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-background/50 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl backdrop-blur-sm border border-white/10">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-1">
              <AnimatedCounter end={value} duration={2000} className="text-foreground text-2xl" />
              {suffix && <span className="text-2xl font-bold text-foreground">{suffix}</span>}
            </div>
            <p className="text-muted-foreground text-sm mt-1">{label}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface SocialProofMetricsProps {
  metrics?: Array<{
    icon: React.ReactNode;
    value: number;
    label: string;
    suffix?: string;
  }>;
  title?: string;
  subtitle?: string;
}

const SocialProofMetrics = ({
  metrics = [
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      value: 2500,
      label: "Active Teams",
      suffix: "+"
    },
    {
      icon: <Bot className="w-6 h-6 text-purple-400" />,
      value: 50000,
      label: "AI Agents Deployed",
      suffix: "+"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      value: 99,
      label: "Uptime Guarantee",
      suffix: "%"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      value: 300,
      label: "Performance Boost",
      suffix: "%"
    }
  ],
  title = "Trusted by Industry Leaders",
  subtitle = "Join thousands of teams building the future with AI"
}: SocialProofMetricsProps) => {
  return (
    <section className="relative py-20 px-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              icon={metric.icon}
              value={metric.value}
              label={metric.label}
              suffix={metric.suffix}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default SocialProofMetrics; 