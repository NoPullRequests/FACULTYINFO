"use client";

import { useMemo, useState } from "react";
import { FileText, Download, Eye, ExternalLink, Search } from "lucide-react";
import type { DownloadItem } from "@/lib/content";

const fileTypeColors: Record<string, string> = {
  PDF:   "bg-red-500/10 text-red-700 dark:text-red-400",
  PPT:   "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  PPTX:  "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  ZIP:   "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  CSV:   "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  IPYNB: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
};

type ExternalResource = {
  title: string;
  description: string;
  href: string;
};

type DownloadsListProps = {
  downloads:         DownloadItem[];
  externalResources: ExternalResource[];
};

export function DownloadsList({ downloads, externalResources }: DownloadsListProps) {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("ALL");

  const categories = useMemo(() => {
    const s = new Set(downloads.map(d => d.category));
    return Array.from(s).sort();
  }, [downloads]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return downloads.filter(d => {
      const matchesSearch = !q ||
        d.title.toLowerCase().includes(q) ||
        (d.description ?? "").toLowerCase().includes(q) ||
        (d.course ?? "").toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q);
      const matchesCat = category === "ALL" || d.category === category;
      return matchesSearch && matchesCat;
    });
  }, [downloads, search, category]);

  // Group filtered results by category
  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, DownloadItem[]>>((acc, d) => {
      if (!acc[d.category]) acc[d.category] = [];
      acc[d.category].push(d);
      return acc;
    }, {});
  }, [filtered]);

  const hasFilters = search !== "" || category !== "ALL";

  return (
    <div className="space-y-8">
      {/* Search + filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search files, courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none ring-ring focus-visible:ring-2"
            aria-label="Search downloads"
          />
        </div>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
          aria-label="Filter by category"
        >
          <option value="ALL">All categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Result count */}
      {hasFilters && (
        <p className="text-sm text-muted-foreground">
          {filtered.length === 0
            ? "No files match your search."
            : `${filtered.length} file${filtered.length !== 1 ? "s" : ""} found`}
        </p>
      )}

      {/* Grouped results */}
      {Object.keys(grouped).map(cat => (
        <section key={cat}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-primary inline-block" />
            {cat}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {grouped[cat].map(item => (
              <div key={item.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold leading-snug">{item.title}</h3>
                    {item.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className={`rounded-full px-2 py-0.5 font-medium ${fileTypeColors[item.fileType] ?? "bg-muted text-muted-foreground"}`}>
                        {item.fileType}
                      </span>
                      {item.course && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">{item.course}</span>
                      )}
                      {item.fileSize && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">{item.fileSize}</span>
                      )}
                    </div>
                  </div>
                </div>
                {item.id === "cv" ? (
                  <div className="mt-4 flex gap-4">
                    <a href={item.fileUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:underline">
                      <Eye className="size-4" />
                      View
                    </a>
                    <a href={item.fileUrl} download target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:underline">
                      <Download className="size-4" />
                      Download
                    </a>
                  </div>
                ) : (
                  <a href={item.fileUrl} download target="_blank" rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:underline">
                    <Download className="size-4" />
                    Download
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && hasFilters && (
        <div className="py-16 text-center text-muted-foreground">
          No files match your filters.
        </div>
      )}

      {/* External resources — always shown */}
      {externalResources.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-primary inline-block" />
            External Resources
          </h2>
          <div className="space-y-3">
            {externalResources.map(item => (
              <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                <div>
                  <h3 className="font-semibold transition-colors group-hover:text-primary">{item.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ExternalLink className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
