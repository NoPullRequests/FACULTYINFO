"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before animation starts after element enters viewport */
  delay?: number;
  /** Direction the element slides in from */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** How far (px) the element translates from */
  distance?: number;
  /** Duration of the animation in ms */
  duration?: number;
  /** Intersection threshold (0–1) */
  threshold?: number;
  /** Run once and stay visible, or re-animate on re-enter */
  once?: boolean;
};

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * Wraps children with a scroll-triggered fade + slide-in animation.
 * Uses IntersectionObserver + CSS transitions — no external deps.
 * Respects prefers-reduced-motion.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 500,
  threshold = 0.12,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(reduced);

  useEffect(() => {
    if (reduced) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, threshold, once]);

  const translateMap = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: "none",
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : translateMap[direction],
        transitionProperty: "opacity, transform",
        transitionDuration: visible ? `${duration}ms` : "0ms",
        transitionTimingFunction: "ease",
        transitionDelay: visible ? `${delay}ms` : "0ms",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Renders children as a staggered list — each child fades in with an
 * incremental delay. Wrap individual items with this.
 */
export function FadeInStagger({
  children,
  className,
  staggerMs = 80,
  direction = "up",
  duration = 450,
  threshold = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
  direction?: FadeInProps["direction"];
  duration?: number;
  threshold?: number;
}) {
  return (
    <>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <FadeIn
              key={i}
              className={className}
              delay={i * staggerMs}
              direction={direction}
              duration={duration}
              threshold={threshold}
            >
              {child}
            </FadeIn>
          ))
        : children}
    </>
  );
}
