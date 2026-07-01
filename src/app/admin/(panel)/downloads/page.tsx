import { AdminDatabaseBanner } from "@/components/admin/admin-database-banner";
import { DownloadsAdmin } from "@/components/admin/downloads-admin";
import { isDatabaseConfigured } from "@/lib/admin/db";
import { requireAdminApi } from "@/lib/admin/api";

async function getDownloads() {
  const auth = await requireAdminApi();
  if ("error" in auth) return [];
  const rows = await auth.prisma.download.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  return rows.map(r => ({
    id:          r.id,
    title:       r.title,
    description: r.description,
    fileUrl:     r.fileUrl,
    fileType:    r.fileType,
    fileSize:    r.fileSize,
    category:    r.category,
    course:      r.course,
    published:   r.published,
  }));
}

export default async function AdminDownloadsPage() {
  const rows = await getDownloads();
  const dbConnected = isDatabaseConfigured();

  return (
    <div className="p-6 lg:p-8">
      <AdminDatabaseBanner />
      <h1 className="text-2xl font-bold tracking-tight">Downloads</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage lecture notes, slides, datasets, and other downloadable files.
      </p>
      <div className="mt-8">
        <DownloadsAdmin initial={rows} dbConnected={dbConnected} />
      </div>
    </div>
  );
}
