import { AdminDatabaseBanner } from "@/components/admin/admin-database-banner";
import { GalleryAdmin } from "@/components/admin/gallery-admin";
import { isDatabaseConfigured } from "@/lib/admin/db";
import { requireAdminApi } from "@/lib/admin/api";

async function getGallery() {
  const auth = await requireAdminApi();
  if ("error" in auth) return [];
  const rows = await auth.prisma.galleryImage.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  return rows.map(r => ({
    id:          r.id,
    title:       r.title,
    description: r.description,
    imageUrl:    r.imageUrl,
    category:    r.category,
    album:       r.album,
  }));
}

export default async function AdminGalleryPage() {
  const rows = await getGallery();
  const dbConnected = isDatabaseConfigured();

  return (
    <div className="p-6 lg:p-8">
      <AdminDatabaseBanner />
      <h1 className="text-2xl font-bold tracking-tight">Gallery</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage photos from lab, conferences, teaching, and events.
      </p>
      <div className="mt-8">
        <GalleryAdmin initial={rows} dbConnected={dbConnected} />
      </div>
    </div>
  );
}
