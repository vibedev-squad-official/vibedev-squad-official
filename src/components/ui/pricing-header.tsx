import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface GradientTextProps extends HTMLAttributes<HTMLDivElement> {
  colors?: string[]
  animationSpeed?: number
  showBorder?: boolean
}

function GradientText({
  children,
  className,
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
  ...props
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  }

  return (
    <div
      className={cn(
        "relative mx-auto flex max-w-fit flex-row items-center justify-center",
        "rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500",
        "overflow-hidden cursor-pointer",
        className
      )}
      {...props}
    >
      {showBorder && (
        <div
          className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
          style={{
            ...gradientStyle,
            backgroundSize: "300% 100%",
          }}
        >
          <div
            className="absolute inset-0 bg-background rounded-[1.25rem] z-[-1]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      <div
        className="inline-block relative z-2 text-transparent bg-cover animate-gradient"
        style={{
          ...gradientStyle,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          backgroundSize: "300% 100%",
        }}
      >
        {children}
      </div>
    </div>
  )
}

interface PricingSectionHeaderProps {
  title?: string
  subtitle?: string
  titleColors?: string[]
  titleAnimationSpeed?: number
  showTitleBorder?: boolean
  className?: string
}

export function PricingSectionHeader({
  title = "Choose Your Scale",
  subtitle = "Growing with your needs - from solo entrepreneur to enterprise scale",
  titleColors = ["#0ea5e9", "#8b5cf6", "#06b6d4", "#0ea5e9"],
  titleAnimationSpeed = 4,
  showTitleBorder = false,
  className,
}: PricingSectionHeaderProps = {}) {
  return (
    <>
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes neonGlow {
            0%, 100% { 
              text-shadow: 
                0 0 5px currentColor,
                0 0 10px currentColor,
                0 0 15px currentColor,
                0 0 20px currentColor;
            }
            50% { 
              text-shadow: 
                0 0 10px currentColor,
                0 0 20px currentColor,
                0 0 30px currentColor,
                0 0 40px currentColor;
            }
          }
          
          @keyframes fadeInUp {
            from { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          .animate-gradient {
            animation: gradient var(--animation-duration, 8s) linear infinite;
          }
          
          .animate-neon-glow {
            animation: neonGlow 3s ease-in-out infinite;
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .gradient-text-enhanced {
            background: linear-gradient(270deg, #0ea5e9, #8b5cf6, #06b6d4, #0ea5e9);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradient 4s ease infinite;
            filter: drop-shadow(0 0 10px rgba(14, 165, 233, 0.3));
          }
        `}
      </style>
      
      <section className={cn(
        "relative py-20",
        "text-center overflow-hidden",
        className
      )}>
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Main Title */}
          <div className="mb-8 animate-fade-in-up">
            <GradientText
              colors={titleColors}
              animationSpeed={titleAnimationSpeed}
              showBorder={showTitleBorder}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
            >
              <span className="gradient-text-enhanced animate-neon-glow">
                {title}
              </span>
            </GradientText>
          </div>

          {/* Subtitle */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed font-medium">
              {subtitle}
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center items-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          {/* Enhanced Typography Accent */}
          <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-primary/80 tracking-wide uppercase">
                Premium Pricing Plans
              </span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Additional Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent pointer-events-none" />
      </section>
    </>
  )
} 