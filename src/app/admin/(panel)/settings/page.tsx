import { AdminDatabaseBanner } from "@/components/admin/admin-database-banner";
import { SettingsAdmin } from "@/components/admin/settings-admin";
import { isDatabaseConfigured } from "@/lib/admin/db";
import { getPublicationTotalCount, getSiteContent } from "@/lib/content";

export default async function AdminSettingsPage() {
  const site = await getSiteContent();
  const totalCount = await getPublicationTotalCount();
  const dbConnected = isDatabaseConfigured();

  return (
    <div className="p-6 lg:p-8">
      <AdminDatabaseBanner />
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Biography and site metadata stored in the database.
      </p>
      <div className="mt-8">
        <SettingsAdmin
          dbConnected={dbConnected}
          initial={{
            shortBio: site.shortBio,
            longBio: site.longBio,
            researchGroup: site.researchGroup,
            publicationTotalCount: totalCount,
          }}
        />
      </div>
    </div>
  );
}
