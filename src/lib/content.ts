import {
  getCoursesStatic,
  getFeaturedPublicationsStatic,
  getProjectsStatic,
  getPublicationTotalCountStatic,
  getPublicationsStatic,
  getSiteContentStatic,
  getStudentsStatic,
  type Project,
  type Publication,
  type SiteContent,
  type Student,
} from "@/lib/content-static";
import { getPrisma, isDatabaseConfigured } from "@/lib/prisma";

export type {
  Project,
  Publication,
  PublicationType,
  SiteContent,
  Student,
} from "@/lib/content-static";
export { getDoiUrl } from "@/lib/content-static";

async function withDatabaseFallback<T>(
  query: (prisma: NonNullable<Awaited<ReturnType<typeof getPrisma>>>) => Promise<T>,
  fallback: () => T,
): Promise<T> {
  if (!isDatabaseConfigured()) {
    return fallback();
  }

  try {
    const prisma = await getPrisma();
    if (!prisma) return fallback();
    return await query(prisma);
  } catch (error) {
    console.warn("[content] Database unavailable, using JSON fallback.", error);
    return fallback();
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  return withDatabaseFallback(async (prisma) => {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });
    if (!settings) return getSiteContentStatic();

    return {
      shortBio: settings.shortBio,
      longBio: settings.longBio,
      researchGroup: settings.researchGroup,
      researchInterests: settings.researchInterests as string[],
      stats: settings.stats as SiteContent["stats"],
      education: settings.education as SiteContent["education"],
      experience: settings.experience as SiteContent["experience"],
      awards: settings.awards as SiteContent["awards"],
    };
  }, getSiteContentStatic);
}

export async function getPublications(): Promise<Publication[]> {
  return withDatabaseFallback(async (prisma) => {
    const rows = await prisma.publication.findMany({
      orderBy: [{ year: "desc" }, { title: "asc" }],
    });
    if (rows.length === 0) return getPublicationsStatic();

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      authors: row.authors,
      venue: row.venue,
      year: row.year,
      type: row.type as Publication["type"],
      doi: row.doi ?? undefined,
      pdfUrl: row.pdfUrl ?? undefined,
      featured: row.featured,
    }));
  }, getPublicationsStatic);
}

export async function getPublicationTotalCount(): Promise<number> {
  return withDatabaseFallback(async (prisma) => {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
      select: { publicationTotalCount: true },
    });
    if (settings) return settings.publicationTotalCount;
    const count = await prisma.publication.count();
    return count > 0 ? count : getPublicationTotalCountStatic();
  }, getPublicationTotalCountStatic);
}

export async function getFeaturedPublications(): Promise<Publication[]> {
  return withDatabaseFallback(async (prisma) => {
    const rows = await prisma.publication.findMany({
      where: { featured: true },
      orderBy: [{ year: "desc" }],
    });
    if (rows.length === 0) return getFeaturedPublicationsStatic();

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      authors: row.authors,
      venue: row.venue,
      year: row.year,
      type: row.type as Publication["type"],
      doi: row.doi ?? undefined,
      pdfUrl: row.pdfUrl ?? undefined,
      featured: row.featured,
    }));
  }, getFeaturedPublicationsStatic);
}

export async function getStudents(): Promise<Student[]> {
  return withDatabaseFallback(async (prisma) => {
    const rows = await prisma.student.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
    if (rows.length === 0) return getStudentsStatic();

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      topic: row.topic,
      level: row.level as Student["level"],
      status: row.status,
      enrolled: row.enrolled ?? undefined,
      graduationYear: row.graduationYear ?? undefined,
      role: row.role,
    }));
  }, getStudentsStatic);
}

export async function getCurrentStudents(): Promise<Student[]> {
  const students = await getStudents();
  return students.filter((s) => s.status === "Continuing");
}

export async function getAlumni(): Promise<Student[]> {
  const students = await getStudents();
  return students.filter((s) => s.status === "Graduated");
}

export async function getProjects(): Promise<Project[]> {
  return withDatabaseFallback(async (prisma) => {
    const rows = await prisma.project.findMany({
      orderBy: [{ sortOrder: "asc" }],
    });
    if (rows.length === 0) return getProjectsStatic();

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      agency: row.agency,
      role: row.role,
      durationMonths: row.durationMonths,
      status: row.status,
      type: row.type,
    }));
  }, getProjectsStatic);
}

export async function getCourses() {
  return withDatabaseFallback(async (prisma) => {
    const rows = await prisma.course.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
    if (rows.length === 0) return getCoursesStatic();

    return rows.map((row) => ({
      name: row.name,
      type: row.type,
    }));
  }, getCoursesStatic);
}
