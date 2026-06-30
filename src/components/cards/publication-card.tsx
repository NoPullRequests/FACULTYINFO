"use client";

import { ExternalLink, FileText, Copy, Check } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import type { Publication } from "@/lib/content";
import { getDoiUrl } from "@/lib/content";
import { cn } from "@/lib/utils";

type PublicationCardProps = {
  publication: Publication;
  className?: string;
};

const typeConfig: Record<
  string,
  { label: string; className: string }
> = {
  JOURNAL: {
    label: "Journal",
    className: "bg-primary/10 text-primary border border-primary/20",
  },
  CONFERENCE: {
    label: "Conference",
    className: "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 dark:text-emerald-400",
  },
  CHAPTER: {
    label: "Book Chapter",
    className: "bg-violet-500/10 text-violet-700 border border-violet-500/20 dark:text-violet-400",
  },
  PREPRINT: {
    label: "Preprint",
    className: "bg-amber-500/10 text-amber-700 border border-amber-500/20 dark:text-amber-400",
  },
};

function generateBibTeX(pub: Publication): string {
  const id = pub.id;
  const type = pub.type === "JOURNAL" ? "article" : pub.type === "CONFERENCE" ? "inproceedings" : "incollection";
  
  return `@${type}{${id},
  title={${pub.title}},
  author={${pub.authors}},
  ${pub.type === "JOURNAL" ? "journal" : "booktitle"}={${pub.venue}},
  year={${pub.year}}${pub.doi ? `,\n  doi={${pub.doi}}` : ""}
}`;
}

/**
 * Single publication card with type badge, venue, DOI link, and BibTeX.
 * Hover: subtle lift + border highlight.
 */
export function PublicationCard({ publication, className }: PublicationCardProps) {
  const [showBibTeX, setShowBibTeX] = useState(false);
  const [copied, setCopied] = useState(false);
  const doiUrl = getDoiUrl(publication.doi);
  const type = typeConfig[publication.type] ?? typeConfig.JOURNAL;
  const bibtex = generateBibTeX(publication);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      className={cn(
        "group relative rounded-xl border border-border bg-card p-4 transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md",
        "sm:p-5",
        className,
      )}
    >
      {/* Left accent bar on hover */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-0.5 rounded-l-xl bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            type.className,
          )}
        >
          {type.label}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <FileText className="size-3" aria-hidden />
          {publication.year}
        </span>
      </div>

      <h3 className="mt-2.5 text-sm font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 sm:text-base">
        {doiUrl ? (
          <a
            href={doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-none focus-visible:underline"
          >
            {publication.title}
          </a>
        ) : (
          publication.title
        )}
      </h3>

      <p className="mt-1.5 text-sm text-muted-foreground">{publication.authors}</p>
      <p className="mt-1 text-sm italic text-muted-foreground/80">{publication.venue}</p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {doiUrl && (
          <ButtonLink
            href={doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="link"
            size="sm"
            className="h-auto p-0 text-xs"
          >
            <ExternalLink className="size-3.5" />
            View DOI
          </ButtonLink>
        )}
        <button
          onClick={() => setShowBibTeX(!showBibTeX)}
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <FileText className="size-3.5" />
          {showBibTeX ? "Hide" : "Show"} BibTeX
        </button>
      </div>

      {showBibTeX && (
        <div className="mt-4 rounded-lg border border-border bg-muted/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground">BibTeX</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto text-xs text-foreground/80">
            <code>{bibtex}</code>
          </pre>
        </div>
      )}
    </article>
  );
}
