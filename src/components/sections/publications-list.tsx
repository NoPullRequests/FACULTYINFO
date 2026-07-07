"use client";

import { useMemo, useState } from "react";

import { PublicationCard } from "@/components/cards/publication-card";
import type { Publication, PublicationType } from "@/lib/content";

const ALL_TYPES = "ALL" as const;

type PublicationsListProps = {
  publications: Publication[];
  totalCount: number;
};

/**
 * Client-side filtered publication list (search, year, type).
 */
export function PublicationsList({
  publications,
  totalCount,
}: PublicationsListProps) {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState<string>(ALL_TYPES);
  const [type, setType] = useState<string>(ALL_TYPES);

  const years = useMemo(
    () =>
      [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a),
    [publications],
  );

  const filtered = useMemo(() => {
    return publications.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q);
      const matchesYear = year === ALL_TYPES || p.year === Number(year);
      const matchesType = type === ALL_TYPES || p.type === type;
      return matchesSearch && matchesYear && matchesType;
    });
  }, [publications, search, year, type]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {publications.length} indexed publications
        ({totalCount} total on record).
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <input
          type="search"
          placeholder="Search publications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none ring-ring focus-visible:ring-2 sm:min-w-[200px]"
          aria-label="Search publications"
        />
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
          aria-label="Filter by year"
        >
          <option value={ALL_TYPES}>All years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
          aria-label="Filter by type"
        >
          <option value={ALL_TYPES}>All types</option>
          {(["JOURNAL", "CONFERENCE", "CHAPTER", "BOOK", "PREPRINT"] as PublicationType[]).map(
            (t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            No publications match your filters.
          </p>
        ) : (
          filtered.map((pub) => (
            <PublicationCard key={pub.id} publication={pub} />
          ))
        )}
      </div>
    </div>
  );
}
