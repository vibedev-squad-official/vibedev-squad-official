"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import React from "react"

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const isPrimary = variant === 'primary'
    
    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative group overflow-hidden rounded-xl px-8 py-4 font-semibold text-lg",
          "transition-all duration-300 ease-out",
          "backdrop-blur-md border",
          isPrimary
            ? [
                "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20",
                "border-cyan-400/50 text-cyan-100",
                "shadow-[0_0_20px_rgba(6,182,212,0.3)]",
                "hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]",
                "hover:border-cyan-300",
              ]
            : [
                "bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20",
                "border-purple-400/50 text-purple-100",
                "shadow-[0_0_20px_rgba(168,85,247,0.3)]",
                "hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]",
                "hover:border-purple-300",
              ],
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={props.onClick}
        disabled={props.disabled}
        type={props.type}
      >
        {/* Animated background gradient */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            isPrimary
              ? "bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30"
              : "bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-red-500/30"
          )}
        />
        
        {/* Pulse animation overlay */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-xl",
            isPrimary
              ? "bg-gradient-to-r from-cyan-400/20 to-blue-400/20"
              : "bg-gradient-to-r from-purple-400/20 to-pink-400/20"
          )}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
        
        {/* Shimmer effect */}
        <div
          className={cn(
            "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000",
            "bg-gradient-to-r from-transparent via-white/20 to-transparent",
            "skew-x-12"
          )}
        />
        
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {variant === 'secondary' && <Play className="w-5 h-5" />}
          {children}
        </span>
      </motion.button>
    )
  }
)

NeonButton.displayName = "NeonButton"

interface HeroCTAButtonsProps {
  className?: string
}

function HeroCTAButtons({ className }: HeroCTAButtonsProps = {}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className={cn("flex flex-col sm:flex-row gap-6 justify-center items-center", className)}
    >
      <NeonButton variant="primary">
        Start Your AI Squad
      </NeonButton>
      
      <NeonButton variant="secondary">
        Watch the Origin Story
      </NeonButton>
    </motion.div>
  )
}

export { HeroCTAButtons, NeonButton }
