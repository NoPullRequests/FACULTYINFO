import {
  BookOpen,
  ExternalLink,
  Mail,
} from "lucide-react";
import Image from "next/image";

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
            <div className="size-36 overflow-hidden rounded-2xl border border-border shadow-sm sm:size-44">
              <Image
                src="/images/professor.jpg"
                alt="Dr. Prasenjit Dey"
                width={176}
                height={176}
                className="h-full w-full object-cover"
                priority
              />
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
              {/* Download CV - Red Outline */}
              <a
                href="/cv/Prasenjit_Dey_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-red-600 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-600/10"
              >
                CV
              </a>
              
              {/* Google Scholar - Google Blue */}
              <a
                href={siteConfig.scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-[#4285f4] px-4 py-2 text-sm font-medium text-[#4285f4] transition-colors hover:bg-[#4285f4]/10"
              >
                <BookOpen className="size-4" />
                Google Scholar
              </a>
              
              {/* Publications - Emerald Green */}
              <a
                href="/publications"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-600/10"
              >
                Publications
              </a>
              
              {/* Research - Purple */}
              <a
                href="/research"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-purple-600 px-4 py-2 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-600/10"
              >
                Research
              </a>
              
              {/* Email - Orange */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-orange-600 px-4 py-2 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-600/10"
              >
                <Mail className="size-4" />
                Email
              </a>
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
              {siteConfig.youtubeUrl && (
                <a
                  href={siteConfig.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube channel"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="size-3.5" />
                  YouTube
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
                  <ExternalLink className="size-3.5" />
                  Twitter
                </a>
              )}
              {siteConfig.githubUrl && (
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="size-3.5" />
                  GitHub
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
