import { BookOpen, FlaskConical } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { getCourses } from "@/lib/content";

export default async function TeachingPage() {
  const courses = await getCourses();
  const theory = courses.filter((c) => c.type === "Theory");
  const practical = courses.filter((c) => c.type === "Practical");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      <FadeIn>
        <div className="border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Teaching</h1>
          <p className="mt-2 text-muted-foreground">
            Courses taught at NIT Rourkela and previous institutions.
          </p>
        </div>
      </FadeIn>

      {/* Theory */}
      <section className="mt-12">
        <FadeIn>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <BookOpen className="size-5 text-primary" aria-hidden />
            Theory Courses
            <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-sm font-normal text-muted-foreground">
              {theory.length}
            </span>
          </h2>
        </FadeIn>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {theory.map((course, i) => (
            <FadeIn key={course.name} delay={i * 50} direction="up" threshold={0.04}>
              <li className="rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-medium transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary">
                {course.name}
              </li>
            </FadeIn>
          ))}
        </ul>
      </section>

      {/* Laboratory */}
      <section className="mt-12">
        <FadeIn>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <FlaskConical className="size-5 text-primary" aria-hidden />
            Laboratory Courses
            <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-sm font-normal text-muted-foreground">
              {practical.length}
            </span>
          </h2>
        </FadeIn>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {practical.map((course, i) => (
            <FadeIn key={course.name} delay={i * 50} direction="up" threshold={0.04}>
              <li className="rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-medium transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-700 dark:hover:text-emerald-400">
                {course.name}
              </li>
            </FadeIn>
          ))}
        </ul>
      </section>

      <FadeIn delay={200}>
        <p className="mt-12 text-sm text-muted-foreground">
          Syllabi and lecture notes will be linked here after content review.
        </p>
      </FadeIn>

    </div>
  );
}
