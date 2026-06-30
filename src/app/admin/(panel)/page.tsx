import Link from "next/link";

import { AdminDatabaseBanner } from "@/components/admin/admin-database-banner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import {
  getCourses,
  getProjects,
  getPublicationTotalCount,
  getPublications,
  getStudents,
} from "@/lib/content";

export default async function AdminDashboardPage() {
  const [publications, students, projects, courses, totalCount] =
    await Promise.all([
      getPublications(),
      getStudents(),
      getProjects(),
      getCourses(),
      getPublicationTotalCount(),
    ]);

  const stats = [
    { label: "Publications (indexed)", value: publications.length },
    { label: "Publications (total)", value: totalCount },
    { label: "Students", value: students.length },
    { label: "Projects", value: projects.length },
    { label: "Courses", value: courses.length },
  ];

  return (
    <div className="p-6 lg:p-8">
      <AdminDatabaseBanner />
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {siteConfig.name} — content overview
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Quick links</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link href="/admin/publications" className="underline-offset-4 hover:underline">
              Manage publications
            </Link>
          </li>
          <li>
            <Link href="/admin/settings" className="underline-offset-4 hover:underline">
              Edit site settings
            </Link>
          </li>
          <li>
            <Link href="/" className="underline-offset-4 hover:underline">
              View public site
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
