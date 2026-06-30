import { notFound } from "next/navigation";
import { ArrowLeft, GraduationCap, BookOpen, User } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { ButtonLink } from "@/components/ui/button-link";
import { getStudents } from "@/lib/content";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ id: string }> };

const levelLabels: Record<string, string> = {
  PHD: "Ph.D.",
  EXECUTIVE_PHD: "Executive Ph.D.",
  MTECH: "M.Tech",
  BTECH: "B.Tech",
};

/** Generate static params for all students at build time */
export async function generateStaticParams() {
  const students = await getStudents();
  return students.map((s) => ({ id: s.id }));
}

export default async function StudentDetailPage({ params }: Props) {
  const { id } = await params;
  const students = await getStudents();
  const student = students.find((s) => s.id === id);

  if (!student) notFound();

  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isCurrentStudent = student.status === "Continuing";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Back link */}
      <FadeIn direction="right">
        <ButtonLink href="/students" variant="ghost" size="sm" className="-ml-2 mb-8 gap-1.5 text-muted-foreground">
          <ArrowLeft className="size-4" />
          All Students
        </ButtonLink>
      </FadeIn>

      {/* Header card */}
      <FadeIn direction="up" delay={60}>
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-muted text-2xl font-bold text-primary">
              {initials}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {student.name}
                </h1>
                <span
                  className={
                    isCurrentStudent
                      ? "rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
                      : "rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
                  }
                >
                  {isCurrentStudent ? "Current Scholar" : "Alumni"}
                </span>
              </div>

              <p className="mt-1 text-muted-foreground">
                {levelLabels[student.level] ?? student.level} Scholar
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="size-3.5 text-primary" />
                  {student.role}
                </span>
                {student.enrolled && (
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="size-3.5 text-primary" />
                    Enrolled {student.enrolled}
                  </span>
                )}
                {student.graduationYear && (
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="size-3.5 text-primary" />
                    Graduated {student.graduationYear}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Research topic */}
      <FadeIn direction="up" delay={140}>
        <section className="mt-8 rounded-xl border border-border bg-card p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <BookOpen className="size-4 text-primary" aria-hidden />
            Research Topic
          </h2>
          <p className="mt-3 leading-relaxed text-foreground/85">{student.topic}</p>
        </section>
      </FadeIn>

      {/* Supervisor info */}
      <FadeIn direction="up" delay={200}>
        <section className="mt-6 rounded-xl border border-border bg-card p-6">
          <h2 className="text-base font-semibold">Supervised by</h2>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              PD
            </div>
            <div>
              <p className="font-medium">{siteConfig.name}</p>
              <p className="text-sm text-muted-foreground">
                {siteConfig.title} · {siteConfig.department}
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Placeholder for future content */}
      <FadeIn direction="up" delay={260}>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Additional details — publications, profile links, and thesis info — will be added soon.
        </p>
      </FadeIn>

    </div>
  );
}
