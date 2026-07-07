import { AdminDatabaseBanner } from "@/components/admin/admin-database-banner";
import { StudentsAdmin } from "@/components/admin/students-admin";
import { isDatabaseConfigured } from "@/lib/admin/db";
import { requireAdminApi } from "@/lib/admin/api";

async function getStudents() {
  const auth = await requireAdminApi();
  if ("error" in auth) return [];
  const rows = await auth.prisma.student.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  return rows.map(r => ({
    id:             r.id,
    name:           r.name,
    topic:          r.topic,
    level:          r.level,
    status:         r.status,
    enrolled:       r.enrolled,
    graduationYear: r.graduationYear,
    role:           r.role,
    sortOrder:      r.sortOrder,
  }));
}

export default async function AdminStudentsPage() {
  const rows        = await getStudents();
  const dbConnected = isDatabaseConfigured();

  return (
    <div className="p-6 lg:p-8">
      <AdminDatabaseBanner />
      <h1 className="text-2xl font-bold tracking-tight">Students</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage research scholars — Ph.D., M.Tech, B.Tech, and JRF students.
      </p>
      <div className="mt-8">
        <StudentsAdmin initial={rows} dbConnected={dbConnected} />
      </div>
    </div>
  );
}
