"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

// ─── Reduced motion ───────────────────────────────────────────────────────────

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

// ─── Animated counter ─────────────────────────────────────────────────────────

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

type AnimatedCounterProps = {
  value: number;
  duration?: number;
  className?: string;
};

function AnimatedCounterInner({ value, duration = 1400, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          setDisplay(Math.round(easeOutCubic(progress) * value));
          if (progress < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)} aria-label={String(value)}>
      {display}
    </span>
  );
}

export function AnimatedCounter(props: AnimatedCounterProps) {
  const reducedMotion = usePrefersReducedMotion();
  if (reducedMotion) {
    return (
      <span className={cn("tabular-nums", props.className)} aria-label={String(props.value)}>
        {props.value}
      </span>
    );
  }
  return <AnimatedCounterInner {...props} />;
}

// ─── Staggered fade-in for stat cards ────────────────────────────────────────

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── StatItem ─────────────────────────────────────────────────────────────────

export type StatItem = {
  label: string;
  value: number;
  suffix?: string;
};

function StatCard({ item, index }: { item: StatItem; index: number }) {
  const { ref, inView } = useInView(0.15);
  const reduced = usePrefersReducedMotion();
  const visible = inView || reduced;

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-md md:text-left"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: visible
          ? `opacity 500ms ease ${index * 90}ms, transform 500ms ease ${index * 90}ms`
          : "none",
      }}
    >
      {/* Accent top bar */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        <AnimatedCounter value={item.value} duration={1200} />
        {item.suffix && (
          <span className="ml-0.5 text-xl text-primary">{item.suffix}</span>
        )}
      </p>
      <p className="mt-1.5 text-sm font-medium text-muted-foreground">{item.label}</p>
    </div>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

export function StatisticsGrid({ items }: { items: StatItem[] }) {
  return (
    <section className="border-b border-border bg-muted/20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {items.map((item, i) => (
          <StatCard key={item.label} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
