import { FadeIn } from "@/components/ui/fade-in";
import { StudentsList } from "@/components/sections/students-list";
import { getAlumni, getCurrentStudents } from "@/lib/content";

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

      <div className="mt-10">
        <StudentsList current={current} alumni={alumni} />
      </div>
    </div>
  );
}
