import coursesData from "@/content/courses.json";
import projectsData from "@/content/projects.json";
import publicationsData from "@/content/publications.json";
import siteData from "@/content/site.json";
import studentsData from "@/content/students.json";

export type PublicationType = "JOURNAL" | "CONFERENCE" | "CHAPTER" | "BOOK" | "PREPRINT";

export type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: PublicationType;
  doi?: string;
  pdfUrl?: string;
  citations?: number;
  abstract?: string;
  featured?: boolean;
};

export type Student = {
  id: string;
  name: string;
  topic: string;
  level: "PHD" | "EXECUTIVE_PHD" | "MTECH" | "BTECH" | "JRF";
  status: string;
  enrolled?: string;
  graduationYear?: number;
  role: string;
};

export type Project = {
  id: string;
  title: string;
  agency: string;
  role: string;
  durationMonths: number;
  status: string;
  type: string;
};

export type SiteContent = typeof siteData;

export function getSiteContentStatic(): SiteContent {
  return siteData;
}

export function getPublicationsStatic(): Publication[] {
  return publicationsData.publications as Publication[];
}

export function getPublicationTotalCountStatic(): number {
  return publicationsData.totalCount;
}

export function getFeaturedPublicationsStatic(): Publication[] {
  return getPublicationsStatic().filter((p) => p.featured);
}

export function getStudentsStatic(): Student[] {
  return studentsData.students as Student[];
}

export function getCurrentStudentsStatic(): Student[] {
  return getStudentsStatic().filter((s) => s.status === "Continuing");
}

export function getAlumniStatic(): Student[] {
  return getStudentsStatic().filter((s) => s.status === "Graduated");
}

export function getProjectsStatic(): Project[] {
  return projectsData.projects as Project[];
}

export function getCoursesStatic() {
  return coursesData.courses;
}

export function getDoiUrl(doi?: string): string | undefined {
  if (!doi) return undefined;
  return `https://doi.org/${doi}`;
}
