import { AdminDatabaseBanner } from "@/components/admin/admin-database-banner";
import { NewsAdmin } from "@/components/admin/news-admin";
import { isDatabaseConfigured } from "@/lib/admin/db";
import { requireAdminApi } from "@/lib/admin/api";

async function getNews() {
  const auth = await requireAdminApi();
  if ("error" in auth) return [];
  const rows = await auth.prisma.news.findMany({ orderBy: { date: "desc" } });
  return rows.map(r => ({
    id:        r.id,
    title:     r.title,
    excerpt:   r.excerpt,
    category:  r.category,
    date:      r.date.toISOString(),
    featured:  r.featured,
    published: r.published,
  }));
}

export default async function AdminNewsPage() {
  const rows = await getNews();
  const dbConnected = isDatabaseConfigured();

  return (
    <div className="p-6 lg:p-8">
      <AdminDatabaseBanner />
      <h1 className="text-2xl font-bold tracking-tight">News & Updates</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage news items shown on the homepage and news feed.
      </p>
      <div className="mt-8">
        <NewsAdmin initial={rows} dbConnected={dbConnected} />
      </div>
    </div>
  );
}
