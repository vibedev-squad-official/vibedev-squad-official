"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileTabNavigationProps {
  tabs: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    content: React.ReactNode;
  }>;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export function MobileTabNavigation({
  tabs,
  activeTab,
  onTabChange,
  className
}: MobileTabNavigationProps) {
  const [currentTab, setCurrentTab] = useState(activeTab || tabs[0]?.id);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const currentTabIndex = tabs.findIndex(tab => tab.id === currentTab);

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    onTabChange?.(tabId);
    setIsSheetOpen(false);
  };

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

    if (isLeftSwipe && currentTabIndex < tabs.length - 1) {
      handleTabChange(tabs[currentTabIndex + 1].id);
    }
    if (isRightSwipe && currentTabIndex > 0) {
      handleTabChange(tabs[currentTabIndex - 1].id);
    }
  };

  const goToPrevious = () => {
    if (currentTabIndex > 0) {
      handleTabChange(tabs[currentTabIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (currentTabIndex < tabs.length - 1) {
      handleTabChange(tabs[currentTabIndex + 1].id);
    }
  };

  // Add haptic feedback for mobile devices
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Mobile Tab Header - Fixed height for 44px touch target */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between p-2">
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              triggerHaptic();
              goToPrevious();
            }}
            disabled={currentTabIndex === 0}
            className={cn(
              "h-11 w-11 touch-target",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            )}
            aria-label="Previous tab"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Current Tab Display */}
          <div className="flex-1 text-center">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-1"
            >
              <div className="flex items-center justify-center gap-2">
                {tabs[currentTabIndex]?.icon}
                <h2 className="text-lg font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                  {tabs[currentTabIndex]?.label}
                </h2>
              </div>
              <div className="text-xs text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                {currentTabIndex + 1} of {tabs.length}
              </div>
            </motion.div>
          </div>

          {/* Next Button or Menu */}
          {currentTabIndex < tabs.length - 1 ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                triggerHaptic();
                goToNext();
              }}
              className={cn(
                "h-11 w-11 touch-target",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              )}
              aria-label="Next tab"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          ) : (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-11 w-11 touch-target",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  )}
                  aria-label="More options"
                  onClick={triggerHaptic}
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="bg-black/95 backdrop-blur-xl border-white/10">
                <SheetHeader>
                  <SheetTitle className="[text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">All Tabs</SheetTitle>
                  <SheetDescription className="[text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                    Select a tab to navigate
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-2">
                  {tabs.map((tab, index) => (
                    <Button
                      key={tab.id}
                      variant={currentTab === tab.id ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start h-14 touch-target",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                      )}
                      onClick={() => {
                        triggerHaptic();
                        handleTabChange(tab.id);
                      }}
                    >
                      <span className="flex items-center gap-3">
                        {tab.icon}
                        <span className="[text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">{tab.label}</span>
                      </span>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="h-1 bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentTabIndex + 1) / tabs.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Swipeable Content Area */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, x: touchStart && touchEnd && touchStart > touchEnd ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: touchStart && touchEnd && touchStart > touchEnd ? -50 : 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-4"
          >
            {tabs[currentTabIndex]?.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Touch Indicator Dots */}
      <div className="flex justify-center gap-2 py-4">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => {
              triggerHaptic();
              handleTabChange(tab.id);
            }}
            className={cn(
              "h-2 rounded-full transition-all duration-300 touch-target-wrapper",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2",
              currentTab === tab.id
                ? "w-8 bg-gradient-to-r from-cyan-500 to-purple-500"
                : "w-2 bg-white/20 hover:bg-white/30"
            )}
            aria-label={`Go to ${tab.label}`}
          >
            <span className="sr-only">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}