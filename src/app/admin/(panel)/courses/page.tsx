import { AdminDatabaseBanner } from "@/components/admin/admin-database-banner";
import { CoursesAdmin } from "@/components/admin/courses-admin";
import { isDatabaseConfigured } from "@/lib/admin/db";
import { requireAdminApi } from "@/lib/admin/api";

async function getCourses() {
  const auth = await requireAdminApi();
  if ("error" in auth) return [];
  const rows = await auth.prisma.course.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  return rows.map(r => ({
    id:        r.id,
    name:      r.name,
    type:      r.type,
    isActive:  r.isActive,
    sortOrder: r.sortOrder,
  }));
}

export default async function AdminCoursesPage() {
  const rows        = await getCourses();
  const dbConnected = isDatabaseConfigured();

  return (
    <div className="p-6 lg:p-8">
      <AdminDatabaseBanner />
      <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage courses currently taught or previously offered.
      </p>
      <div className="mt-8">
        <CoursesAdmin initial={rows} dbConnected={dbConnected} />
      </div>
    </div>
  );
}
