"use client"

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, Loader2, Wifi, WifiOff } from 'lucide-react'

type AgentStatus = 'active' | 'processing' | 'connected' | 'error' | 'idle'

interface AgentStatusIndicatorProps {
  status: AgentStatus
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showLabel?: boolean
  label?: string
}

const statusConfig = {
  active: {
    color: 'bg-green-500',
    glowColor: 'shadow-green-500/50',
    icon: null,
    label: 'Active',
    animation: 'pulse'
  },
  processing: {
    color: 'bg-blue-500',
    glowColor: 'shadow-blue-500/50',
    icon: Loader2,
    label: 'Processing',
    animation: 'spin'
  },
  connected: {
    color: 'bg-cyan-400',
    glowColor: 'shadow-cyan-400/50',
    icon: Wifi,
    label: 'Connected',
    animation: 'flow'
  },
  error: {
    color: 'bg-red-500',
    glowColor: 'shadow-red-500/50',
    icon: AlertTriangle,
    label: 'Error',
    animation: 'flash'
  },
  idle: {
    color: 'bg-gray-400',
    glowColor: 'shadow-gray-400/20',
    icon: WifiOff,
    label: 'Idle',
    animation: 'none'
  }
}

const sizeConfig = {
  sm: {
    container: 'w-3 h-3',
    icon: 'w-2 h-2',
    text: 'text-xs',
    glow: 'shadow-sm'
  },
  md: {
    container: 'w-4 h-4',
    icon: 'w-2.5 h-2.5',
    text: 'text-sm',
    glow: 'shadow-md'
  },
  lg: {
    container: 'w-6 h-6',
    icon: 'w-3 h-3',
    text: 'text-base',
    glow: 'shadow-lg'
  }
}

export function AgentStatusIndicator({
  status,
  size = 'sm',
  className,
  showLabel = false,
  label
}: AgentStatusIndicatorProps) {
  const config = statusConfig[status]
  const sizeStyles = sizeConfig[size]
  const displayLabel = label || config.label

  const getAnimationProps = () => {
    switch (config.animation) {
      case 'pulse':
        return {
          animate: {
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          },
          transition: {
            duration: 2,
            repeat: Infinity
          }
        }
      case 'spin':
        return {
          animate: {
            rotate: 360
          },
          transition: {
            duration: 1,
            repeat: Infinity
          }
        }
      case 'flow':
        return {
          animate: {
            scale: [1, 1.1, 1]
          },
          transition: {
            duration: 1.5,
            repeat: Infinity
          }
        }
      case 'flash':
        return {
          animate: {
            opacity: [1, 0.3, 1]
          },
          transition: {
            duration: 0.8,
            repeat: Infinity
          }
        }
      default:
        return {}
    }
  }

  const IconComponent = config.icon

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <motion.div
        className={cn(
          "relative rounded-full flex items-center justify-center",
          sizeStyles.container,
          config.color,
          sizeStyles.glow,
          config.glowColor
        )}
        {...getAnimationProps()}
      >
        {/* Neon glow effect */}
        <div 
          className={cn(
            "absolute inset-0 rounded-full blur-sm opacity-60",
            config.color
          )}
        />
        
        {/* Icon or dot */}
        <div className="relative z-10 flex items-center justify-center">
          {IconComponent ? (
            <IconComponent 
              className={cn(
                sizeStyles.icon,
                "text-white",
                config.animation === 'spin' && "animate-spin"
              )}
            />
          ) : (
            <div className={cn(
              "rounded-full bg-white/90",
              size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5'
            )} />
          )}
        </div>

        {/* Flowing trail effect for connected status */}
        {status === 'connected' && (
          <motion.div
            className="absolute inset-0 rounded-full border border-cyan-300/30"
            animate={{
              scale: [1, 1.8, 2.2],
              opacity: [0.8, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        )}
      </motion.div>

      {/* Label */}
      <AnimatePresence>
        {showLabel && (
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            className={cn(
              "font-medium text-foreground",
              sizeStyles.text
            )}
          >
            {displayLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AgentStatusIndicator 