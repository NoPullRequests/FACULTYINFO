import {
  BookOpen,
  ExternalLink,
  Mail,
  X as XIcon,
} from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/config/site";
import { getSiteContent } from "@/lib/content";

/**
 * Home hero — identity, bio, CTAs and academic profile links.
 * Avatar is an initials placeholder until a real photo is provided.
 */
export async function Hero() {
  const { shortBio } = await getSiteContent();

  const initials = siteConfig.name
    .split(" ")
    .slice(1)
    .map((n) => n[0])
    .join("");

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Subtle background grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,oklch(0.9_0.01_95/40%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.9_0.01_95/40%)_1px,transparent_1px)] [background-size:32px_32px] dark:[background-image:linear-gradient(to_right,oklch(0.97_0.01_95/6%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0.01_95/6%)_1px,transparent_1px)]"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        {/* Avatar */}
        <FadeIn direction="right" duration={600} threshold={0.1}>
          <div className="relative shrink-0">
            <div className="flex size-36 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-primary/20 via-primary/10 to-muted text-4xl font-bold text-primary shadow-sm sm:size-44">
              {initials}
            </div>
            {/* Online / verified dot */}
            <span
              aria-hidden
              className="absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-background bg-emerald-500"
            />
          </div>
        </FadeIn>

        {/* Content */}
        <div className="flex-1 space-y-5">
          <FadeIn direction="up" delay={80} duration={550}>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {siteConfig.name}
              </h1>
              <p className="mt-2 text-lg font-medium text-primary">
                {siteConfig.title}
              </p>
              <p className="text-muted-foreground">
                {siteConfig.department} · {siteConfig.institution}
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={160} duration={550}>
            <p className="max-w-2xl leading-relaxed text-foreground/85">
              {shortBio}
            </p>
          </FadeIn>

          {/* Primary CTAs */}
          <FadeIn direction="up" delay={240} duration={550}>
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                href={siteConfig.scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen className="size-4" />
                Google Scholar
              </ButtonLink>
              <ButtonLink href="/publications" variant="outline">
                Publications
              </ButtonLink>
              <ButtonLink href="/research" variant="outline">
                Research
              </ButtonLink>
              <ButtonLink href={`mailto:${siteConfig.email}`} variant="outline">
                <Mail className="size-4" />
                Email
              </ButtonLink>
            </div>
          </FadeIn>

          {/* Secondary social/profile links */}
          <FadeIn direction="up" delay={320} duration={550}>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {siteConfig.linkedinUrl && (
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="size-3.5" />
                  LinkedIn
                </a>
              )}
              {siteConfig.twitterUrl && (
                <a
                  href={siteConfig.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X profile"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <XIcon className="size-3.5" />
                  Twitter
                </a>
              )}
              {siteConfig.orcidUrl && (
                <a
                  href={siteConfig.orcidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ORCID profile"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="size-3.5" />
                  ORCID
                </a>
              )}
              {siteConfig.scopusUrl && (
                <a
                  href={siteConfig.scopusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Scopus profile"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="size-3.5" />
                  Scopus
                </a>
              )}
              {siteConfig.facultyPageUrl && (
                <a
                  href={siteConfig.facultyPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="NIT Rourkela faculty page"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="size-3.5" />
                  NIT Profile
                </a>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
