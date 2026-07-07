import { AdminDatabaseBanner } from "@/components/admin/admin-database-banner";
import { ProjectsAdmin } from "@/components/admin/projects-admin";
import { isDatabaseConfigured } from "@/lib/admin/db";
import { requireAdminApi } from "@/lib/admin/api";

async function getProjects() {
  const auth = await requireAdminApi();
  if ("error" in auth) return [];
  const rows = await auth.prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return rows.map(r => ({
    id:             r.id,
    title:          r.title,
    agency:         r.agency,
    role:           r.role,
    type:           r.type,
    status:         r.status,
    durationMonths: r.durationMonths,
    description:    r.description,
    sortOrder:      r.sortOrder,
  }));
}

export default async function AdminProjectsPage() {
  const rows        = await getProjects();
  const dbConnected = isDatabaseConfigured();

  return (
    <div className="p-6 lg:p-8">
      <AdminDatabaseBanner />
      <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage sponsored research and consultancy projects.
      </p>
      <div className="mt-8">
        <ProjectsAdmin initial={rows} dbConnected={dbConnected} />
      </div>
    </div>
  );
}
