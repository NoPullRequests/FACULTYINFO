"use client";

import { useState } from "react";
import { ChevronDown, FileText, Play, BookOpen, PenLine, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type Material = {
  label: string;
  url: string;
  type: "notes" | "slides" | "video" | "exercises";
};

type CourseCardProps = {
  name: string;
  materials: Material[];
  variant: "theory" | "lab";
};

const materialIcons = {
  notes:     { icon: BookOpen,  color: "text-blue-600 dark:text-blue-400",    bg: "bg-blue-500/10"    },
  slides:    { icon: FileText,  color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10" },
  video:     { icon: Play,      color: "text-red-600 dark:text-red-400",       bg: "bg-red-500/10"    },
  exercises: { icon: PenLine,   color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
};

export function CourseCard({ name, materials, variant }: CourseCardProps) {
  const [open, setOpen] = useState(false);

  const hasMaterials = materials.length > 0;

  const baseStyle = variant === "theory"
    ? "hover:border-primary/40 hover:bg-primary/5"
    : "hover:border-emerald-500/40 hover:bg-emerald-500/5";

  const activeStyle = variant === "theory"
    ? "border-primary/40 bg-primary/5"
    : "border-emerald-500/40 bg-emerald-500/5";

  return (
    <li className={cn(
      "rounded-xl border border-border bg-card transition-all duration-200",
      hasMaterials && (open ? activeStyle : baseStyle),
    )}>
      <button
        onClick={() => hasMaterials && setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium",
          !hasMaterials && "cursor-default",
        )}
        aria-expanded={open}
        disabled={!hasMaterials}
      >
        <span>{name}</span>
        {hasMaterials && (
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        )}
      </button>

      {open && hasMaterials && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Course Materials
          </p>
          <ul className="space-y-2">
            {materials.map((m) => {
              const config = materialIcons[m.type];
              const Icon = config.icon;
              return (
                <li key={m.url}>
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-muted/60"
                  >
                    <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-md", config.bg)}>
                      <Icon className={cn("size-3.5", config.color)} />
                    </span>
                    <span className="flex-1 leading-snug text-foreground/80 group-hover:text-foreground">
                      {m.label}
                    </span>
                    <ExternalLink className="size-3.5 shrink-0 text-muted-foreground/50 group-hover:text-muted-foreground" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
}
