"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const [isClient, setIsClient] = useState(false);
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, [color, isClient]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const rgb = hexToRgb(color);

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    circles.current.forEach((circle: Circle, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease;

      drawCircle(circle, true);

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      }
    });
    window.requestAnimationFrame(animate);
  };

  if (!isClient) {
    return (
      <div
        className={cn("pointer-events-none", className)}
        ref={canvasContainerRef}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="size-full" />
      </div>
    );
  }

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
}

function useDimensions(ref: React.RefObject<HTMLElement | SVGElement | null>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    const debouncedUpdateDimensions = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 250);
    };

    updateDimensions();
    window.addEventListener('resize', debouncedUpdateDimensions);

    return () => {
      window.removeEventListener('resize', debouncedUpdateDimensions);
      clearTimeout(timeoutId);
    };
  }, [ref]);

  return dimensions;
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);
  const [isClient, setIsClient] = useState(false);
  const [circleData, setCircleData] = useState<Array<{
    top: number;
    left: number;
    width: number;
    height: number;
    transforms: {
      tx1: number;
      ty1: number;
      tx2: number;
      ty2: number;
      tx3: number;
      ty3: number;
      tx4: number;
      ty4: number;
    };
  }>>([]);

  const circleSize = useMemo(
    () => Math.max(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height]
  );

  // Generate random values only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setCircleData(colors.map(() => ({
      top: Math.random() * 50,
      left: Math.random() * 50,
      width: circleSize * randomInt(0.5, 1.5),
      height: circleSize * randomInt(0.5, 1.5),
      transforms: {
        tx1: Math.random() - 0.5,
        ty1: Math.random() - 0.5,
        tx2: Math.random() - 0.5,
        ty2: Math.random() - 0.5,
        tx3: Math.random() - 0.5,
        ty3: Math.random() - 0.5,
        tx4: Math.random() - 0.5,
        ty4: Math.random() - 0.5,
      }
    })));
  }, [colors.length, circleSize]);

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
      ? "blur-3xl"
      : "blur-[100px]";

  if (!isClient) {
    return (
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <div className={cn(`absolute inset-0`, blurClass)} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div className={cn(`absolute inset-0`, blurClass)}>
        {colors.map((color, index) => {
          const data = circleData[index];
          if (!data) return null;
          
          return (
            <svg
              key={index}
              className="absolute animate-background-gradient"
              style={
                {
                  top: `${data.top}%`,
                  left: `${data.left}%`,
                  "--background-gradient-speed": `${1 / speed}s`,
                  "--tx-1": data.transforms.tx1,
                  "--ty-1": data.transforms.ty1,
                  "--tx-2": data.transforms.tx2,
                  "--ty-2": data.transforms.ty2,
                  "--tx-3": data.transforms.tx3,
                  "--ty-3": data.transforms.ty3,
                  "--tx-4": data.transforms.tx4,
                  "--ty-4": data.transforms.ty4,
                } as React.CSSProperties
              }
              width={data.width}
              height={data.height}
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="50"
                fill={color}
                className="opacity-30 dark:opacity-[0.15]"
              />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

interface GradientOption {
  id: string;
  name: string;
  colors: string[];
  description: string;
  baseGradient: string;
}

const purpleGradientOptions: GradientOption[] = [
  {
    id: 'deep-purple-classic',
    name: 'Deep Purple Classic',
    colors: ['#581c87', '#3b0764', '#1e1b4b', '#312e81', '#4c1d95'],
    description: 'Classic deep purple gradient',
    baseGradient: 'from-purple-800 via-purple-900 to-slate-900'
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    colors: ['#581c87', '#7c3aed', '#3b0764', '#6366f1', '#312e81'],
    description: 'Rich royal purple tones',
    baseGradient: 'from-purple-800 via-violet-800 to-purple-900'
  },
  {
    id: 'mystic-purple',
    name: 'Mystic Purple',
    colors: ['#581c87', '#6366f1', '#3b0764', '#4338ca', '#312e81'],
    description: 'Mystical purple with indigo',
    baseGradient: 'from-purple-800 via-indigo-800 to-purple-900'
  },
  {
    id: 'cosmic-purple',
    name: 'Cosmic Purple',
    colors: ['#581c87', '#8b5cf6', '#7c3aed', '#3b0764', '#1e1b4b'],
    description: 'Cosmic purple nebula effect',
    baseGradient: 'from-purple-800 via-violet-700 to-purple-900'
  },
  {
    id: 'deep-space',
    name: 'Deep Space Purple',
    colors: ['#581c87', '#4c1d95', '#3730a3', '#1e1b4b', '#0f172a'],
    description: 'Deep space purple gradient',
    baseGradient: 'from-purple-800 via-purple-900 to-slate-950'
  },
  {
    id: 'vibrant-purple',
    name: 'Vibrant Purple',
    colors: ['#581c87', '#a855f7', '#7c3aed', '#4c1d95', '#3b0764'],
    description: 'Vibrant and energetic purple',
    baseGradient: 'from-purple-800 via-purple-600 to-purple-900'
  }
];

interface AIBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  gradientOption?: string;
  showGradientSelector?: boolean;
}

const AIBackground: React.FC<AIBackgroundProps> = ({
  children,
  className = "",
  gradientOption = 'deep-purple-classic',
  showGradientSelector = false,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [selectedGradient, setSelectedGradient] = useState(gradientOption);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    controls.start({
      opacity: 1,
      transition: { duration: 2, ease: "easeOut" },
    });

    return () => observer.disconnect();
  }, [controls]);

  const currentGradientOption = purpleGradientOptions.find(
    option => option.id === selectedGradient
  ) || purpleGradientOptions[0];

  const gradientColors = currentGradientOption.colors;
  const particleColor = "#a855f7"; // Purple particle color

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={controls}
      className={cn(
        `fixed inset-0 w-full min-h-screen overflow-hidden bg-gradient-to-br ${currentGradientOption.baseGradient} z-0`,
        className
      )}
    >
      <AnimatedGradient
        colors={gradientColors}
        speed={0.8}
        blur="heavy"
      />
      
      <Particles
        className="absolute inset-0"
        quantity={80}
        ease={70}
        color={particleColor}
        size={1.2}
        staticity={40}
      />

      {/* Gradient Selector (if enabled) */}
      {showGradientSelector && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <span className="text-white text-sm font-medium">Background</span>
              <button
                onClick={() => setSelectorOpen(!selectorOpen)}
                className="ml-auto text-white/60 hover:text-white transition-colors"
              >
                {selectorOpen ? '−' : '+'}
              </button>
            </div>
            
            {selectorOpen && (
              <div className="space-y-2 min-w-[200px] max-h-80 overflow-y-auto">
                {purpleGradientOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedGradient(option.id)}
                    className={`w-full text-left p-2 rounded text-sm transition-all ${
                      selectedGradient === option.id
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border border-white/20"
                        style={{
                          background: `linear-gradient(45deg, ${option.colors.slice(0, 2).join(', ')})`
                        }}
                      />
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-xs text-white/40">{option.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/10" />
      
      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </motion.div>
  );
};

export { AIBackground, AnimatedGradient, Particles };
export default AIBackground; 