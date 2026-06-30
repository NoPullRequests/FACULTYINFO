"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

// ─── Staggered fade-in ────────────────────────────────────────────────────────

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type StatItem = {
  label: string;
  value: number;
  suffix?: string;
  /** Internal path or external URL to navigate to on click */
  href?: string;
  /** If true, opens in a new tab */
  external?: boolean;
};

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ item, index }: { item: StatItem; index: number }) {
  const { ref, inView } = useInView(0.15);
  const reduced = usePrefersReducedMotion();
  const visible = inView || reduced;

  const inner = (
    <>
      {/* Accent top bar */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-gradient-to-r from-primary/60 via-primary to-primary/60 transition-opacity duration-300",
          item.href ? "opacity-0 group-hover:opacity-100" : "opacity-0",
        )}
      />

      {/* External link indicator */}
      {item.href && item.external && (
        <ArrowUpRight
          className="absolute right-3 top-3 size-3.5 text-muted-foreground/40 transition-all duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}

      <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        <AnimatedCounter value={item.value} duration={1200} />
        {item.suffix && (
          <span className="ml-0.5 text-xl text-primary">{item.suffix}</span>
        )}
      </p>
      <p className="mt-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
        {item.label}
      </p>
    </>
  );

  const sharedClass = cn(
    "group relative overflow-hidden rounded-xl border border-border bg-card p-6 text-center transition-all duration-200 md:text-left",
    item.href && "cursor-pointer hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md",
  );

  const sharedStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(20px)",
    transition: visible
      ? `opacity 500ms ease ${index * 90}ms, transform 500ms ease ${index * 90}ms`
      : "none",
  };

  if (!item.href) {
    return (
      <div ref={ref} className={sharedClass} style={sharedStyle}>
        {inner}
      </div>
    );
  }

  if (item.external) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.label}: ${item.value}${item.suffix ?? ""} — opens Google Scholar`}
        className={sharedClass}
        style={sharedStyle}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={item.href}
      aria-label={`${item.label}: ${item.value}${item.suffix ?? ""}`}
      className={sharedClass}
      style={sharedStyle}
    >
      {inner}
    </Link>
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
