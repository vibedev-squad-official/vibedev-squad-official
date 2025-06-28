import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const glassmorphismCardVariants = cva(
  [
    "relative overflow-hidden transition-all duration-300 ease-out",
    "backdrop-blur-[25px] backdrop-saturate-[180%]",
    "border border-white/20 dark:border-white/10",
    "text-shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2",
    "motion-reduce:transition-none motion-reduce:transform-none",
    "@media (prefers-contrast: high) { opacity: 0.98 !important; }"
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-br from-blue-500/20 via-blue-400/15 to-blue-600/25",
          "dark:from-blue-400/15 dark:via-blue-300/10 dark:to-blue-500/20",
          "border-blue-300/30 dark:border-blue-400/20",
          "shadow-[0_8px_32px_rgba(59,130,246,0.15)] dark:shadow-[0_8px_32px_rgba(59,130,246,0.1)]"
        ],
        secondary: [
          "bg-gradient-to-br from-purple-500/20 via-purple-400/15 to-purple-600/25",
          "dark:from-purple-400/15 dark:via-purple-300/10 dark:to-purple-500/20",
          "border-purple-300/30 dark:border-purple-400/20",
          "shadow-[0_8px_32px_rgba(147,51,234,0.15)] dark:shadow-[0_8px_32px_rgba(147,51,234,0.1)]"
        ],
        accent: [
          "bg-gradient-to-br from-cyan-500/20 via-green-400/15 to-emerald-500/25",
          "dark:from-cyan-400/15 dark:via-green-300/10 dark:to-emerald-400/20",
          "border-cyan-300/30 dark:border-emerald-400/20",
          "shadow-[0_8px_32px_rgba(6,182,212,0.15)] dark:shadow-[0_8px_32px_rgba(6,182,212,0.1)]"
        ]
      },
      blurLevel: {
        minimal: "backdrop-blur-[15px]",
        standard: "backdrop-blur-[25px]",
        enhanced: "backdrop-blur-[40px]"
      },
      opacity: {
        light: "bg-opacity-95 dark:bg-opacity-95",
        standard: "bg-opacity-85 dark:bg-opacity-85",
        enhanced: "bg-opacity-80 dark:bg-opacity-80"
      },
      radius: {
        sm: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-2xl",
        xl: "rounded-3xl"
      },
      spacing: {
        xs: "p-1",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
        "2xl": "p-12"
      },
      interactive: {
        true: "cursor-pointer hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]",
        false: ""
      },
      glow: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      {
        variant: "primary",
        glow: true,
        className: "hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
      },
      {
        variant: "secondary",
        glow: true,
        className: "hover:shadow-[0_0_40px_rgba(147,51,234,0.3)] dark:hover:shadow-[0_0_40px_rgba(147,51,234,0.2)]"
      },
      {
        variant: "accent",
        glow: true,
        className: "hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] dark:hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]"
      }
    ],
    defaultVariants: {
      variant: "primary",
      blurLevel: "standard",
      opacity: "standard",
      radius: "md",
      spacing: "md",
      interactive: false,
      glow: false
    }
  }
)

export interface GlassmorphismCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassmorphismCardVariants> {
  children: React.ReactNode
  animated?: boolean
}

const GlassmorphismCard = React.forwardRef<HTMLDivElement, GlassmorphismCardProps>(
  ({ 
    className, 
    variant, 
    blurLevel, 
    opacity, 
    radius, 
    spacing, 
    interactive, 
    glow, 
    animated = false,
    children, 
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
      <div
        ref={ref}
        className={cn(
          glassmorphismCardVariants({ 
            variant, 
            blurLevel, 
            opacity, 
            radius, 
            spacing, 
            interactive, 
            glow, 
            className 
          }),
          animated && "animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: variant === "primary" 
            ? `linear-gradient(135deg, 
                rgba(255, 255, 255, ${opacity === "light" ? "0.95" : opacity === "enhanced" ? "0.8" : "0.85"}) 0%, 
                rgba(59, 130, 246, 0.1) 50%, 
                rgba(255, 255, 255, ${opacity === "light" ? "0.9" : opacity === "enhanced" ? "0.75" : "0.8"}) 100%)`
            : variant === "secondary"
            ? `linear-gradient(135deg, 
                rgba(255, 255, 255, ${opacity === "light" ? "0.95" : opacity === "enhanced" ? "0.8" : "0.85"}) 0%, 
                rgba(147, 51, 234, 0.1) 50%, 
                rgba(255, 255, 255, ${opacity === "light" ? "0.9" : opacity === "enhanced" ? "0.75" : "0.8"}) 100%)`
            : `linear-gradient(135deg, 
                rgba(255, 255, 255, ${opacity === "light" ? "0.95" : opacity === "enhanced" ? "0.8" : "0.85"}) 0%, 
                rgba(6, 182, 212, 0.1) 50%, 
                rgba(255, 255, 255, ${opacity === "light" ? "0.9" : opacity === "enhanced" ? "0.75" : "0.8"}) 100%)`,
          ...(typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches && {
            background: variant === "primary" 
              ? `linear-gradient(135deg, 
                  rgba(10, 10, 10, ${opacity === "light" ? "0.95" : opacity === "enhanced" ? "0.8" : "0.85"}) 0%, 
                  rgba(59, 130, 246, 0.08) 50%, 
                  rgba(10, 10, 10, ${opacity === "light" ? "0.9" : opacity === "enhanced" ? "0.75" : "0.8"}) 100%)`
              : variant === "secondary"
              ? `linear-gradient(135deg, 
                  rgba(10, 10, 10, ${opacity === "light" ? "0.95" : opacity === "enhanced" ? "0.8" : "0.85"}) 0%, 
                  rgba(147, 51, 234, 0.08) 50%, 
                  rgba(10, 10, 10, ${opacity === "light" ? "0.9" : opacity === "enhanced" ? "0.75" : "0.8"}) 100%)`
              : `linear-gradient(135deg, 
                  rgba(10, 10, 10, ${opacity === "light" ? "0.95" : opacity === "enhanced" ? "0.8" : "0.85"}) 0%, 
                  rgba(6, 182, 212, 0.08) 50%, 
                  rgba(10, 10, 10, ${opacity === "light" ? "0.9" : opacity === "enhanced" ? "0.75" : "0.8"}) 100%)`
          })
        }}
        {...props}
      >
        {/* Enhanced text readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-black/10 dark:to-transparent pointer-events-none" />
        
        {/* Content with enhanced contrast */}
        <div className="relative z-10 text-foreground [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] dark:[text-shadow:0_1px_2px_rgba(255,255,255,0.1)]">
          {children}
        </div>

        {/* Glow effect */}
        {glow && isHovered && (
          <div 
            className={cn(
              "absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none",
              isHovered && "opacity-100",
              variant === "primary" && "bg-gradient-to-r from-blue-400/20 via-blue-500/30 to-blue-600/20",
              variant === "secondary" && "bg-gradient-to-r from-purple-400/20 via-purple-500/30 to-purple-600/20",
              variant === "accent" && "bg-gradient-to-r from-cyan-400/20 via-emerald-500/30 to-green-500/20"
            )}
            style={{
              filter: "blur(20px)",
              transform: "scale(1.1)"
            }}
          />
        )}
      </div>
    )
  }
)

GlassmorphismCard.displayName = "GlassmorphismCard"

export { GlassmorphismCard, glassmorphismCardVariants, type GlassmorphismCardProps }