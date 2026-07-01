import { AdminDatabaseBanner } from "@/components/admin/admin-database-banner";
import { PositionsAdmin } from "@/components/admin/positions-admin";
import { isDatabaseConfigured } from "@/lib/admin/db";
import { requireAdminApi } from "@/lib/admin/api";

async function getPositions() {
  const auth = await requireAdminApi();
  if ("error" in auth) return [];
  const rows = await auth.prisma.position.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map(r => ({
    id:           r.id,
    title:        r.title,
    type:         r.type,
    status:       r.status,
    description:  r.description,
    requirements: r.requirements,
    funding:      r.funding,
    deadline:     r.deadline,
  }));
}

export default async function AdminPositionsPage() {
  const rows = await getPositions();
  const dbConnected = isDatabaseConfigured();

  return (
    <div className="p-6 lg:p-8">
      <AdminDatabaseBanner />
      <h1 className="text-2xl font-bold tracking-tight">Open Positions</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage Ph.D., JRF, and internship positions shown on the careers page.
      </p>
      <div className="mt-8">
        <PositionsAdmin initial={rows} dbConnected={dbConnected} />
      </div>
    </div>
  );
}
