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
import { unstable_cache as nextCache } from "next/cache";

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

// Cache TTL — 5 minutes for most content, 1 minute for news
const CACHE_TTL = 300;
const NEWS_TTL  = 60;

export const getSiteContent = nextCache(
  async (): Promise<SiteContent> => {
    return withDatabaseFallback(async (prisma) => {
      const settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
      if (!settings) return getSiteContentStatic();
      return {
        shortBio:         settings.shortBio,
        longBio:          settings.longBio,
        researchGroup:    settings.researchGroup,
        researchInterests: settings.researchInterests as string[],
        stats:            settings.stats as SiteContent["stats"],
        education:        settings.education as SiteContent["education"],
        experience:       settings.experience as SiteContent["experience"],
        awards:           settings.awards as SiteContent["awards"],
      };
    }, getSiteContentStatic);
  },
  ["site-content"],
  { revalidate: CACHE_TTL, tags: ["site-content"] },
);

export const getPublications = nextCache(
  async (): Promise<Publication[]> => {
    return withDatabaseFallback(async (prisma) => {
      const rows = await prisma.publication.findMany({ orderBy: [{ year: "desc" }, { title: "asc" }] });
      if (rows.length === 0) return getPublicationsStatic();
      return rows.map((row) => ({
        id: row.id, title: row.title, authors: row.authors, venue: row.venue,
        year: row.year, type: row.type as Publication["type"],
        doi: row.doi ?? undefined, pdfUrl: row.pdfUrl ?? undefined,
        abstract: row.abstract ?? undefined,
        citations: row.citations ?? undefined,
        featured: row.featured,
      }));
    }, getPublicationsStatic);
  },
  ["publications"],
  { revalidate: CACHE_TTL, tags: ["publications"] },
);

export const getPublicationTotalCount = nextCache(
  async (): Promise<number> => {
    return withDatabaseFallback(async (prisma) => {
      const settings = await prisma.siteSettings.findUnique({ where: { id: "default" }, select: { publicationTotalCount: true } });
      if (settings) return settings.publicationTotalCount;
      const count = await prisma.publication.count();
      return count > 0 ? count : getPublicationTotalCountStatic();
    }, getPublicationTotalCountStatic);
  },
  ["publication-count"],
  { revalidate: CACHE_TTL, tags: ["publications"] },
);

export const getFeaturedPublications = nextCache(
  async (): Promise<Publication[]> => {
    return withDatabaseFallback(async (prisma) => {
      const rows = await prisma.publication.findMany({ where: { featured: true }, orderBy: [{ year: "desc" }] });
      if (rows.length === 0) return getFeaturedPublicationsStatic();
      return rows.map((row) => ({
        id: row.id, title: row.title, authors: row.authors, venue: row.venue,
        year: row.year, type: row.type as Publication["type"],
        doi: row.doi ?? undefined, pdfUrl: row.pdfUrl ?? undefined,
        abstract: row.abstract ?? undefined,
        citations: row.citations ?? undefined,
        featured: row.featured,
      }));
    }, getFeaturedPublicationsStatic);
  },
  ["featured-publications"],
  { revalidate: CACHE_TTL, tags: ["publications"] },
);

export const getStudents = nextCache(
  async (): Promise<Student[]> => {
    return withDatabaseFallback(async (prisma) => {
      const rows = await prisma.student.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] });
      if (rows.length === 0) return getStudentsStatic();
      return rows.map((row) => ({
        id: row.id, name: row.name, topic: row.topic,
        level: row.level as Student["level"], status: row.status,
        enrolled: row.enrolled ?? undefined, graduationYear: row.graduationYear ?? undefined, role: row.role,
      }));
    }, getStudentsStatic);
  },
  ["students"],
  { revalidate: CACHE_TTL, tags: ["students"] },
);

export const getProjects = nextCache(
  async (): Promise<Project[]> => {
    return withDatabaseFallback(async (prisma) => {
      const rows = await prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }] });
      if (rows.length === 0) return getProjectsStatic();
      return rows.map((row) => ({
        id: row.id, title: row.title, agency: row.agency, role: row.role,
        durationMonths: row.durationMonths, status: row.status, type: row.type,
      }));
    }, getProjectsStatic);
  },
  ["projects"],
  { revalidate: CACHE_TTL, tags: ["projects"] },
);

export const getCourses = nextCache(
  async () => {
    return withDatabaseFallback(async (prisma) => {
      const rows = await prisma.course.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] });
      if (rows.length === 0) return getCoursesStatic();
      return rows.map((row) => ({ name: row.name, type: row.type }));
    }, getCoursesStatic);
  },
  ["courses"],
  { revalidate: CACHE_TTL, tags: ["courses"] },
);

/* ── Derived helpers ────────────────────────────────────────────────────── */
export async function getCurrentStudents(): Promise<Student[]> {
  const students = await getStudents();
  return students.filter((s) => s.status === "Continuing");
}

export async function getAlumni(): Promise<Student[]> {
  const students = await getStudents();
  return students.filter((s) => s.status === "Graduated");
}

/* ── News ────────────────────────────────────────────────────────────────── */
export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  featured: boolean;
  published: boolean;
};

export const getNews = nextCache(
  async (): Promise<NewsItem[]> => {
    return withDatabaseFallback(async (prisma) => {
      const rows = await prisma.news.findMany({ where: { published: true }, orderBy: { date: "desc" } });
      return rows.map((r) => ({
        id: r.id, title: r.title, excerpt: r.excerpt, category: r.category,
        date: r.date.toISOString(), featured: r.featured, published: r.published,
      }));
    }, () => []);
  },
  ["news"],
  { revalidate: NEWS_TTL, tags: ["news"] },
);

/* ── Positions ───────────────────────────────────────────────────────────── */
export type Position = {
  id: string;
  title: string;
  type: string;
  status: string;
  description: string;
  requirements: string;
  funding: string | null;
  deadline: string | null;
};

export const getPositions = nextCache(
  async (): Promise<Position[]> => {
    return withDatabaseFallback(async (prisma) => {
      const rows = await prisma.position.findMany({ orderBy: { sortOrder: "asc" } });
      return rows.map((r) => ({
        id: r.id, title: r.title, type: r.type, status: r.status,
        description: r.description, requirements: r.requirements,
        funding: r.funding, deadline: r.deadline,
      }));
    }, () => []);
  },
  ["positions"],
  { revalidate: CACHE_TTL, tags: ["positions"] },
);

/* ── Downloads ───────────────────────────────────────────────────────────── */
export type DownloadItem = {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  fileType: string;
  fileSize: string | null;
  category: string;
  course: string | null;
};

export const getDownloads = nextCache(
  async (): Promise<DownloadItem[]> => {
    return withDatabaseFallback(async (prisma) => {
      const rows = await prisma.download.findMany({
        where: { published: true },
        orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      });
      return rows.map((r) => ({
        id: r.id, title: r.title, description: r.description, fileUrl: r.fileUrl,
        fileType: r.fileType, fileSize: r.fileSize, category: r.category, course: r.course,
      }));
    }, () => []);
  },
  ["downloads"],
  { revalidate: CACHE_TTL, tags: ["downloads"] },
);

/* ── Gallery ─────────────────────────────────────────────────────────────── */
export type GalleryImage = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  category: string;
  album: string | null;
};

export const getGalleryImages = nextCache(
  async (): Promise<GalleryImage[]> => {
    return withDatabaseFallback(async (prisma) => {
      const rows = await prisma.galleryImage.findMany({
        orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      });
      return rows.map((r) => ({
        id: r.id, title: r.title, description: r.description,
        imageUrl: r.imageUrl, category: r.category, album: r.album,
      }));
    }, () => []);
  },
  ["gallery"],
  { revalidate: CACHE_TTL, tags: ["gallery"] },
);
