"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText, BookOpen, Users, Newspaper, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Static search index ─────────────────────────────────────────────────
   All site pages with keywords so users can jump anywhere quickly.
   No DB needed — pure static, zero latency.
────────────────────────────────────────────────────────────────────────── */
const PAGES = [
  { label: "Home",           href: "/",             keywords: "home profile overview",          icon: "home" },
  { label: "About",          href: "/about",         keywords: "biography education experience awards", icon: "user" },
  { label: "Research",       href: "/research",      keywords: "research projects funded ANRF DRDO",   icon: "research" },
  { label: "Publications",   href: "/publications",  keywords: "papers journal conference bibtex doi",  icon: "pub" },
  { label: "Teaching",       href: "/teaching",      keywords: "courses machine learning deep learning database", icon: "teach" },
  { label: "Students",       href: "/students",      keywords: "students phd mtech scholars alumni supervision", icon: "students" },
  { label: "News",           href: "/news",          keywords: "news updates grants awards",    icon: "news" },
  { label: "Blog",           href: "/blog",          keywords: "blog articles posts",           icon: "blog" },
  { label: "Gallery",        href: "/gallery",       keywords: "gallery photos lab conferences", icon: "gallery" },
  { label: "Downloads",      href: "/downloads",     keywords: "downloads cv lecture notes slides datasets", icon: "downloads" },
  { label: "Open Positions", href: "/careers",       keywords: "phd positions jobs jrf internship apply", icon: "careers" },
  { label: "FAQs",           href: "/faqs",          keywords: "faq questions answers",         icon: "faq" },
  { label: "Contact",        href: "/contact",       keywords: "contact email office hours location", icon: "contact" },
  { label: "Collaborate",    href: "/collaborate",   keywords: "collaborate collaboration industry", icon: "collab" },
];

const PAGE_ICONS: Record<string, React.ElementType> = {
  pub:      BookOpen,
  students: Users,
  news:     Newspaper,
  downloads: FileText,
  careers:  GraduationCap,
};

function getIcon(icon: string) {
  const Icon = PAGE_ICONS[icon] ?? Search;
  return <Icon className="size-4 shrink-0 text-muted-foreground" />;
}

export function SiteSearch() {
  const router = useRouter();
  const [open,    setOpen]    = useState(false);
  const [query,   setQuery]   = useState("");
  const [active,  setActive]  = useState(0);
  const inputRef  = useRef<HTMLInputElement>(null);
  const listRef   = useRef<HTMLUListElement>(null);

  const results = query.trim().length === 0 ? [] : PAGES.filter(p => {
    const q = query.toLowerCase();
    return p.label.toLowerCase().includes(q) || p.keywords.includes(q);
  });

  /* Open on Ctrl+K / Cmd+K */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  /* Reset active index when results change */
  useEffect(() => setActive(0), [query]);

  const navigate = useCallback((href: string) => {
    setOpen(false);
    router.push(href);
  }, [router]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    if (e.key === "Enter")     { e.preventDefault(); navigate(results[active].href); }
  }

  /* Scroll active item into view */
  useEffect(() => {
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Search site (Ctrl+K)"
        className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted hover:text-foreground"
      >
        <Search className="size-3.5" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded bg-background px-1 py-0.5 text-[10px] font-mono shadow-sm sm:inline">⌘K</kbd>
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Dialog */}
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search pages, topics, keywords..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search"
                autoComplete="off"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear">
                  <X className="size-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
              <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">ESC</kbd>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <ul ref={listRef} className="max-h-72 overflow-y-auto p-2" role="listbox">
                {results.map((r, i) => (
                  <li key={r.href} role="option" aria-selected={i === active}>
                    <button
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        i === active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      )}
                      onClick={() => navigate(r.href)}
                      onMouseEnter={() => setActive(i)}
                    >
                      {getIcon(r.icon)}
                      <span className="font-medium">{r.label}</span>
                      <span className={cn("ml-auto text-xs truncate", i === active ? "text-primary-foreground/70" : "text-muted-foreground")}>
                        {r.href}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Empty state */}
            {query.trim().length > 0 && results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No results for <span className="font-medium text-foreground">&ldquo;{query}&rdquo;</span>
              </div>
            )}

            {/* Hint when no query */}
            {query.trim().length === 0 && (
              <div className="px-4 py-6 text-center text-xs text-muted-foreground">
                Type to search pages, topics, and keywords
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center gap-3 border-t border-border px-4 py-2 text-[10px] text-muted-foreground">
              <span><kbd className="rounded bg-muted px-1 py-0.5 font-mono">↑↓</kbd> navigate</span>
              <span><kbd className="rounded bg-muted px-1 py-0.5 font-mono">↵</kbd> go</span>
              <span><kbd className="rounded bg-muted px-1 py-0.5 font-mono">ESC</kbd> close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
