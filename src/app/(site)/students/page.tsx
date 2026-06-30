import { GraduationCap, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/ui/fade-in";
import { getAlumni, getCurrentStudents } from "@/lib/content";
import type { Student } from "@/lib/content";

const levelLabels: Record<string, string> = {
  PHD: "Ph.D.",
  EXECUTIVE_PHD: "Executive Ph.D.",
  MTECH: "M.Tech",
  BTECH: "B.Tech",
};

function StudentCard({ student, index }: { student: Student; index: number }) {
  return (
    <FadeIn delay={index * 70} direction="up" threshold={0.05}>
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
    </FadeIn>
  );
}

function StudentSection({
  title,
  icon: Icon,
  students,
}: {
  title: string;
  icon: React.ElementType;
  students: Student[];
}) {
  if (students.length === 0) return null;
  return (
    <section className="mt-14">
      <FadeIn>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Icon className="size-5 text-primary" aria-hidden />
          {title}
          <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-sm font-normal text-muted-foreground">
            {students.length}
          </span>
        </h2>
      </FadeIn>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {students.map((student, i) => (
          <StudentCard key={student.id} student={student} index={i} />
        ))}
      </div>
    </section>
  );
}

export default async function StudentsPage() {
  const [current, alumni] = await Promise.all([
    getCurrentStudents(),
    getAlumni(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      <FadeIn>
        <div className="border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Students</h1>
          <p className="mt-2 text-muted-foreground">
            Research scholars supervised at NIT Rourkela.
          </p>
        </div>
      </FadeIn>

      <StudentSection title="Current Scholars" icon={Users} students={current} />
      <StudentSection title="Alumni" icon={GraduationCap} students={alumni} />

    </div>
  );
}
