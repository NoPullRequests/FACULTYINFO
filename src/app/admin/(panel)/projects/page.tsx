import { AdminDatabaseBanner } from "@/components/admin/admin-database-banner";
import { getProjects } from "@/lib/content";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-6 lg:p-8">
      <AdminDatabaseBanner />
      <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Sponsored research projects — edit via database seed or future form.
      </p>
      <ul className="mt-8 space-y-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className="rounded-lg border border-border p-4 text-sm"
          >
            <p className="font-medium">{project.title}</p>
            <p className="mt-1 text-muted-foreground">
              {project.agency} · {project.role} · {project.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
