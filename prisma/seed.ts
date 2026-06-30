import { PrismaClient } from "@prisma/client";

import coursesData from "../src/content/courses.json";
import projectsData from "../src/content/projects.json";
import publicationsData from "../src/content/publications.json";
import siteData from "../src/content/site.json";
import studentsData from "../src/content/students.json";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database from src/content/*.json ...");

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      shortBio: siteData.shortBio,
      longBio: siteData.longBio,
      researchGroup: siteData.researchGroup,
      researchInterests: siteData.researchInterests,
      stats: siteData.stats,
      education: siteData.education,
      experience: siteData.experience,
      awards: siteData.awards,
      publicationTotalCount: publicationsData.totalCount,
    },
    update: {
      shortBio: siteData.shortBio,
      longBio: siteData.longBio,
      researchGroup: siteData.researchGroup,
      researchInterests: siteData.researchInterests,
      stats: siteData.stats,
      education: siteData.education,
      experience: siteData.experience,
      awards: siteData.awards,
      publicationTotalCount: publicationsData.totalCount,
    },
  });

  for (const publication of publicationsData.publications) {
    const pdfUrl =
      "pdfUrl" in publication && publication.pdfUrl
        ? publication.pdfUrl
        : null;
    const doi =
      "doi" in publication && publication.doi ? publication.doi : null;

    await prisma.publication.upsert({
      where: { id: publication.id },
      create: {
        id: publication.id,
        title: publication.title,
        authors: publication.authors,
        venue: publication.venue,
        year: publication.year,
        type: publication.type,
        doi,
        pdfUrl,
        featured: publication.featured ?? false,
      },
      update: {
        title: publication.title,
        authors: publication.authors,
        venue: publication.venue,
        year: publication.year,
        type: publication.type,
        doi,
        pdfUrl,
        featured: publication.featured ?? false,
      },
    });
  }

  for (const [index, student] of studentsData.students.entries()) {
    await prisma.student.upsert({
      where: { id: student.id },
      create: {
        id: student.id,
        name: student.name,
        topic: student.topic,
        level: student.level,
        status: student.status,
        enrolled: student.enrolled ?? null,
        graduationYear: student.graduationYear ?? null,
        role: student.role,
        sortOrder: index,
      },
      update: {
        name: student.name,
        topic: student.topic,
        level: student.level,
        status: student.status,
        enrolled: student.enrolled ?? null,
        graduationYear: student.graduationYear ?? null,
        role: student.role,
        sortOrder: index,
      },
    });
  }

  for (const [index, project] of projectsData.projects.entries()) {
    await prisma.project.upsert({
      where: { id: project.id },
      create: {
        id: project.id,
        title: project.title,
        agency: project.agency,
        role: project.role,
        durationMonths: project.durationMonths,
        status: project.status,
        type: project.type,
        sortOrder: index,
      },
      update: {
        title: project.title,
        agency: project.agency,
        role: project.role,
        durationMonths: project.durationMonths,
        status: project.status,
        type: project.type,
        sortOrder: index,
      },
    });
  }

  await prisma.course.deleteMany();
  for (const [index, course] of coursesData.courses.entries()) {
    await prisma.course.create({
      data: {
        name: course.name,
        type: course.type,
        sortOrder: index,
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
