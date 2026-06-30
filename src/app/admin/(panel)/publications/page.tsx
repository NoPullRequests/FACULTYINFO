import { AdminDatabaseBanner } from "@/components/admin/admin-database-banner";
import { PublicationsAdmin } from "@/components/admin/publications-admin";
import { isDatabaseConfigured } from "@/lib/admin/db";
import { getPublications } from "@/lib/content";

export default async function AdminPublicationsPage() {
  const publications = await getPublications();
  const dbConnected = isDatabaseConfigured();

  const rows = publications.map((p) => ({
    id: p.id,
    title: p.title,
    authors: p.authors,
    venue: p.venue,
    year: p.year,
    type: p.type,
    doi: p.doi ?? null,
    featured: p.featured ?? false,
  }));

  return (
    <div className="p-6 lg:p-8">
      <AdminDatabaseBanner />
      <h1 className="text-2xl font-bold tracking-tight">Publications</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Add, edit, or remove publications. Featured items appear on the home page.
      </p>
      <div className="mt-8">
        <PublicationsAdmin initial={rows} dbConnected={dbConnected} />
      </div>
    </div>
  );
}
