import { AdminDatabaseBanner } from "@/components/admin/admin-database-banner";
import { getCourses } from "@/lib/content";

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="p-6 lg:p-8">
      <AdminDatabaseBanner />
      <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Courses taught — syllabi upload coming in a later update.
      </p>
      <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <li
            key={course.name}
            className="rounded-lg border border-border px-4 py-3 text-sm"
          >
            {course.name}
            <span className="ml-2 text-muted-foreground">({course.type})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
