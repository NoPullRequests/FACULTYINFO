import { FlaskConical, Lightbulb, BookMarked } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { getProjects, getSiteContent } from "@/lib/content";

export default async function ResearchPage() {
  const { researchGroup, researchInterests, longBio } = await getSiteContent();
  const projects = await getProjects();

  const running = projects.filter((p) => p.status === "Running");
  const completed = projects.filter((p) => p.status !== "Running");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Header */}
      <FadeIn>
        <div className="border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Research</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {researchGroup}
          </p>
        </div>
      </FadeIn>

      {/* Overview */}
      <section className="mt-10 max-w-3xl">
        <FadeIn delay={80}>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <BookMarked className="size-5 text-primary" aria-hidden />
            Overview
          </h2>
          <p className="mt-4 leading-relaxed text-foreground/85">{longBio}</p>
        </FadeIn>
      </section>

      {/* Areas of Interest */}
      <section className="mt-14">
        <FadeIn>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Lightbulb className="size-5 text-primary" aria-hidden />
            Areas of Interest
          </h2>
        </FadeIn>
        <div className="mt-5 flex flex-wrap gap-2">
          {researchInterests.map((area, i) => (
            <FadeIn key={area} delay={i * 55} direction="up" threshold={0.05}>
              <span className="rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/8 hover:text-primary">
                {area}
              </span>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Sponsored Projects */}
      <section className="mt-14">
        <FadeIn>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <FlaskConical className="size-5 text-primary" aria-hidden />
            Sponsored Projects
          </h2>
        </FadeIn>

        {running.length > 0 && (
          <div className="mt-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Ongoing
            </p>
            {running.map((project, i) => (
              <FadeIn key={project.id} delay={i * 80} direction="up">
                <article className="rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-semibold text-emerald-700 dark:text-emerald-400">
                      {project.status}
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground">
                      {project.agency}
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground">
                      {project.role}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug">{project.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Duration: {project.durationMonths} months · {project.type}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        )}

        {completed.length > 0 && (
          <div className="mt-8 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Completed
            </p>
            {completed.map((project, i) => (
              <FadeIn key={project.id} delay={i * 80} direction="up">
                <article className="rounded-xl border border-border bg-card p-5 opacity-80 transition-all duration-200 hover:opacity-100 hover:shadow-sm">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 font-semibold text-muted-foreground">
                      {project.status}
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground">
                      {project.agency}
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground">
                      {project.role}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug">{project.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Duration: {project.durationMonths} months · {project.type}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
