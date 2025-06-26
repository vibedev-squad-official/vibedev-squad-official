"use client";

import { Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";

interface Testimonial {
  initials: string;
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    initials: "SC",
    quote: "Vibe DevSquad transformed our development process. What used to take our team of 8 developers 3 months now takes 2 weeks with AI orchestration. The cost savings alone paid for itself in the first month.",
    name: "Sarah Chen",
    role: "CTO, TechFlow Solutions"
  },
  {
    initials: "MR",
    quote: "As a solo entrepreneur, I couldn't afford a full development team. Vibe DevSquad gave me the power of an entire engineering department for less than what I was paying for basic hosting.",
    name: "Marcus Rodriguez", 
    role: "Founder, InnovateLab"
  },
  {
    initials: "EW",
    quote: "The AI agents don't just write code - they understand our business logic and make intelligent decisions. It's like having senior developers who never sleep and never make mistakes.",
    name: "Dr. Emily Watson",
    role: "VP Engineering, DataCore Systems"
  }
];

export default function TestimonialCards() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);
  const [autorotate, setAutorotate] = useState<boolean>(true);
  const autorotateTiming: number = 7000;

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive(
        active + 1 === testimonials.length ? 0 : (active) => active + 1,
      );
    }, autorotateTiming);
    return () => clearInterval(interval);
  }, [active, autorotate]);

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement)
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl text-center">
      {/* Avatar Section with Neon Glow */}
      <div className="relative h-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-blue-500/25 before:via-purple-500/15 before:via-25% before:to-cyan-500/5 before:to-75%">
          <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
            {testimonials.map((testimonial, index) => (
              <Transition
                as="div"
                key={index}
                show={active === index}
                className="absolute inset-0 -z-10 h-full"
                enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                enterFrom="opacity-0 -rotate-[60deg]"
                enterTo="opacity-100 rotate-0"
                leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                leaveFrom="opacity-100 rotate-0"
                leaveTo="opacity-0 rotate-[60deg]"
                beforeEnter={() => heightFix()}
              >
                <div className="relative left-1/2 top-11 -translate-x-1/2 rounded-full ring-2 ring-blue-400/50 shadow-lg shadow-blue-500/25">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.initials}
                  </div>
                </div>
              </Transition>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="mb-9 transition-all delay-300 duration-150 ease-in-out">
        <div className="relative flex flex-col" ref={testimonialsRef}>
          {testimonials.map((testimonial, index) => (
            <Transition
              key={index}
              show={active === index}
              enter="transition ease-in-out duration-500 delay-200 order-first"
              enterFrom="opacity-0 -translate-x-4"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-out duration-300 delay-300 absolute"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-4"
              beforeEnter={() => heightFix()}
            >
              <div className="text-xl md:text-2xl font-medium text-white/90 before:content-['\201C'] after:content-['\201D'] leading-relaxed px-4">
                {testimonial.quote}
              </div>
            </Transition>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="-m-1.5 flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            className={`m-1.5 inline-flex justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/75 ${
              active === index
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/50"
                : "bg-white/10 backdrop-blur-md text-white/80 hover:bg-white/20 hover:text-white border border-white/20"
            }`}
            onClick={() => {
              setActive(index);
              setAutorotate(false);
            }}
          >
            <span className="font-semibold">{testimonial.name}</span>
            <span className={`mx-2 ${active === index ? "text-blue-200" : "text-white/40"}`}>
              -
            </span>
            <span className={`${active === index ? "text-blue-100" : "text-white/60"}`}>
              {testimonial.role}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
} 