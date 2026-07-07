"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Users, GraduationCap } from "lucide-react";
import type { Student } from "@/lib/content";

const levelLabels: Record<string, string> = {
  PHD:           "Ph.D.",
  EXECUTIVE_PHD: "Executive Ph.D.",
  MTECH:         "M.Tech",
  BTECH:         "B.Tech",
};

function StudentCard({ student }: { student: Student }) {
  return (
    <Link
      href={`/students/${student.id}`}
      className="group block rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {levelLabels[student.level] ?? student.level}
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {student.role}
          </span>
        </div>
      </div>
      <p className="mt-3 font-semibold transition-colors duration-200 group-hover:text-primary">
        {student.name}
      </p>
      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {student.topic}
      </p>
      {student.enrolled && (
        <p className="mt-2 text-xs text-muted-foreground/70">Enrolled {student.enrolled}</p>
      )}
      {student.graduationYear && (
        <p className="mt-2 text-xs text-muted-foreground/70">Graduated {student.graduationYear}</p>
      )}
      <p className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        View profile <ArrowRight className="size-3" />
      </p>
    </Link>
  );
}

type StudentListProps = {
  current: Student[];
  alumni:  Student[];
};

export function StudentsList({ current, alumni }: StudentListProps) {
  const [search, setSearch] = useState("");
  const [level,  setLevel]  = useState("ALL");

  const allLevels = useMemo(() => {
    const s = new Set([...current, ...alumni].map(s => s.level));
    return Array.from(s);
  }, [current, alumni]);

  function filter(students: Student[]) {
    const q = search.toLowerCase();
    return students.filter(s => {
      const matchesSearch = !q ||
        s.name.toLowerCase().includes(q) ||
        s.topic.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q);
      const matchesLevel = level === "ALL" || s.level === level;
      return matchesSearch && matchesLevel;
    });
  }

  const filteredCurrent = filter(current);
  const filteredAlumni  = filter(alumni);
  const totalFiltered   = filteredCurrent.length + filteredAlumni.length;
  const hasFilters      = search !== "" || level !== "ALL";

  return (
    <div className="space-y-8">
      {/* Search + filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search by name, topic, or role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none ring-ring focus-visible:ring-2"
            aria-label="Search students"
          />
        </div>
        <select
          value={level}
          onChange={e => setLevel(e.target.value)}
          className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
          aria-label="Filter by level"
        >
          <option value="ALL">All levels</option>
          {allLevels.map(l => (
            <option key={l} value={l}>{levelLabels[l] ?? l}</option>
          ))}
        </select>
      </div>

      {/* Result count when filtering */}
      {hasFilters && (
        <p className="text-sm text-muted-foreground">
          {totalFiltered === 0
            ? "No students match your search."
            : `${totalFiltered} student${totalFiltered !== 1 ? "s" : ""} found`}
        </p>
      )}

      {/* Current scholars */}
      {filteredCurrent.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
            <Users className="size-5 text-primary" aria-hidden />
            Current Scholars
            <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-sm font-normal text-muted-foreground">
              {filteredCurrent.length}
            </span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCurrent.map(s => <StudentCard key={s.id} student={s} />)}
          </div>
        </section>
      )}

      {/* Alumni */}
      {filteredAlumni.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
            <GraduationCap className="size-5 text-primary" aria-hidden />
            Alumni
            <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-sm font-normal text-muted-foreground">
              {filteredAlumni.length}
            </span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAlumni.map(s => <StudentCard key={s.id} student={s} />)}
          </div>
        </section>
      )}

      {totalFiltered === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          No students match your filters.
        </div>
      )}
    </div>
  );
}
