import { AdminDatabaseBanner } from "@/components/admin/admin-database-banner";
import { SettingsAdmin } from "@/components/admin/settings-admin";
import { isDatabaseConfigured } from "@/lib/admin/db";
import { getPublicationTotalCount, getSiteContent } from "@/lib/content";

export default async function AdminSettingsPage() {
  const site       = await getSiteContent();
  const totalCount = await getPublicationTotalCount();
  const dbConnected = isDatabaseConfigured();

  const stats = site.stats as {
    publications?: number;
    citations?: number;
    scholarHIndex?: number;
    hIndex?: number;
    doctoralStudents?: number;
    students?: number;
  };

  return (
    <div className="p-6 lg:p-8">
      <AdminDatabaseBanner />
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage all site content — bio, stats, education, experience, awards, and research interests.
      </p>
      <div className="mt-8">
        <SettingsAdmin
          dbConnected={dbConnected}
          initial={{
            shortBio:             site.shortBio,
            longBio:              site.longBio,
            researchGroup:        site.researchGroup,
            publicationTotalCount: totalCount,
            researchInterests:    site.researchInterests ?? [],
            stats: {
              publications:    stats.publications    ?? totalCount,
              citations:       stats.citations       ?? 0,
              scholarHIndex:   stats.scholarHIndex   ?? stats.hIndex ?? 0,
              doctoralStudents: stats.doctoralStudents ?? stats.students ?? 0,
            },
            education:  (site.education  ?? []) as Array<{ degree: string; institution: string; year: string; field?: string; thesis?: string }>,
            experience: (site.experience ?? []) as Array<{ title: string; organization: string; department?: string; start: string; end?: string }>,
            awards:     (site.awards     ?? []) as Array<{ title: string; organization: string; year: string }>,
          }}
        />
      </div>
    </div>
  );
}
