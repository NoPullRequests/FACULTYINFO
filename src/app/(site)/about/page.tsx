import { GraduationCap, Award, Briefcase } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { siteConfig } from "@/config/site";
import { getSiteContent } from "@/lib/content";

export default async function AboutPage() {
  const { longBio, education, experience, awards } = await getSiteContent();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Page header */}
      <FadeIn>
        <div className="border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About</h1>
          <p className="mt-2 text-muted-foreground">
            {siteConfig.title} · {siteConfig.department}, {siteConfig.institution}
          </p>
        </div>
      </FadeIn>

      {/* Biography */}
      <section className="mt-10 max-w-3xl">
        <FadeIn delay={80}>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            Biography
          </h2>
          <p className="mt-4 leading-relaxed text-foreground/85">{longBio}</p>
        </FadeIn>
      </section>

      {/* Education */}
      <section className="mt-14">
        <FadeIn>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <GraduationCap className="size-5 text-primary" aria-hidden />
            Education
          </h2>
        </FadeIn>
        <ol className="mt-6 space-y-0">
          {education.map((item, i) => (
            <FadeIn key={`${item.degree}-${item.year}`} delay={i * 80} direction="up">
              <li className="relative flex gap-6 pb-8 last:pb-0">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <span className="flex size-3 shrink-0 rounded-full border-2 border-primary bg-background mt-1" />
                  <span className="mt-1 w-px flex-1 bg-border last:hidden" />
                </div>
                <div className="pb-2">
                  <p className="font-semibold">
                    {item.degree} · {item.year}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.field}</p>
                  <p className="text-sm text-muted-foreground">{item.institution}</p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </section>

      {/* Experience */}
      <section className="mt-14">
        <FadeIn>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Briefcase className="size-5 text-primary" aria-hidden />
            Experience
          </h2>
        </FadeIn>
        <div className="mt-6 space-y-4">
          {experience.map((item, i) => (
            <FadeIn key={`${item.title}-${item.organization}`} delay={i * 80} direction="up">
              <article className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.organization}
                      {item.department ? ` · ${item.department}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                    {item.start} — {item.end ?? "Present"}
                  </span>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="mt-14 mb-4">
        <FadeIn>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Award className="size-5 text-primary" aria-hidden />
            Awards & Honours
          </h2>
        </FadeIn>
        <ul className="mt-6 space-y-3">
          {awards.map((award, i) => (
            <FadeIn key={award.title} delay={i * 80} direction="up">
              <li className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4 transition-shadow hover:shadow-sm">
                <span className="mt-0.5 flex size-2 shrink-0 rounded-full bg-primary/60" />
                <div>
                  <span className="font-medium">{award.title}</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    · {award.organization}, {award.year}
                  </span>
                </div>
              </li>
            </FadeIn>
          ))}
        </ul>
      </section>

    </div>
  );
}
