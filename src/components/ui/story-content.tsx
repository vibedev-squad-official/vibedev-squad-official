"use client"

import { cn } from "@/lib/utils"
import {
    AnimatePresence,
    motion,
    useInView,
    UseInViewOptions,
    Variants,
} from "framer-motion"
import { useRef } from "react"

type MarginType = UseInViewOptions["margin"]

interface BlurFadeProps {
  children: React.ReactNode
  className?: string
  variant?: {
    hidden: { y: number }
    visible: { y: number }
  }
  duration?: number
  delay?: number
  yOffset?: number
  inView?: boolean
  inViewMargin?: MarginType
  blur?: string
}

function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const isInView = !inView || inViewResult
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  }
  const combinedVariants = variant || defaultVariants
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

interface StoryContentContainerProps {
  className?: string
}

export function StoryContentContainer({ className }: StoryContentContainerProps = {}) {
  return (
    <div className={cn(
      "relative w-full max-w-4xl mx-auto px-6 py-12 md:px-8 lg:px-12",
      className
    )}>
      {/* Glassmorphism backdrop */}
      <div className="absolute inset-0 bg-background/20 backdrop-blur-md border border-border/20 rounded-2xl" />
      
      {/* Content */}
      <div className="relative z-10">
        <BlurFade delay={0.2} inView>
          <div className="space-y-6">
            {/* Main story content */}
            <div className="space-y-4">
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground/90 font-medium">
                I was a solo entrepreneur building{" "}
                <span className="text-primary font-semibold">Vibe DevSquad</span>. 
                I needed a full development team but couldn't afford $300K/year.
              </p>
              
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground/80">
                So I created a workflow where AI agents handle planning, frontend, 
                backend, QA, and DevOps - while I orchestrate the symphony.
              </p>
              
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground/80">
                What started as my personal survival strategy became the methodology 
                that powers Vibe DevSquad.
              </p>
              
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground/90 font-medium">
                Now, whether you're solo like I was, leading a 10-person team, 
                or managing enterprise development - you can use the same AI 
                orchestration that built this platform.
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl pointer-events-none" />
    </div>
  )
}

export default StoryContentContainer 