import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import coursesData from "../src/content/courses.json";
import projectsData from "../src/content/projects.json";
import publicationsData from "../src/content/publications.json";
import siteData from "../src/content/site.json";
import studentsData from "../src/content/students.json";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database from src/content/*.json ...");

  // Create single admin account for the professor
  console.log("Creating admin account...");
  
  const adminPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "deyp@nitrkl.ac.in" },
    create: {
      email: "deyp@nitrkl.ac.in",
      name: "Dr. Prasenjit Dey",
      password: adminPassword,
      isActive: true,
    },
    update: {
      password: adminPassword,
      isActive: true,
    },
  });

  // Remove old placeholder account if it exists
  await prisma.user.deleteMany({ where: { email: "admin@example.com" } });

  console.log("✓ Admin account created");
  console.log("  - Login: deyp@nitrkl.ac.in");
  console.log("  - Password: admin123");
  console.log("  - IMPORTANT: Change this password after first login via /admin/users");

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
        ? String(publication.pdfUrl)
        : null;
    const doi =
      "doi" in publication && publication.doi ? String(publication.doi) : null;
    const abstract =
      "abstract" in publication && publication.abstract
        ? String(publication.abstract)
        : null;
    const citations =
      "citations" in publication && publication.citations != null
        ? Number(publication.citations)
        : null;

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
        abstract,
        citations,
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
        abstract,
        citations,
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

  // ── News items ──────────────────────────────────────────────────────────
  const newsItems = [
    {
      id: "news-cmpdi-2025",
      title: "Certificate of Achievement at CMPDI Hackathon on R&D 2025",
      excerpt: "Dr. Prasenjit Dey received the Certificate of Achievement from CMPDI, Ministry of Coal, Government of India, for his conceptual solution on PS-2. The award was presented by Union Minister Shri G. Kishan Reddy at the Star Rating Awards Ceremony in Mumbai.",
      category: "Award",
      date: new Date("2025-09-04"),
      featured: true,
      published: true,
    },
    {
      id: "news-workshop-2026",
      title: "Five-Day Digital Literacy Workshop for School Teachers at NIT Rourkela",
      excerpt: "A workshop on Enhancing Digital Literacy of School Teachers towards Women Empowerment was inaugurated on 25 May 2026, jointly organized by CSE Dept., NIT Rourkela and Rotary Club of Rourkela Steel City. Prof. Prasenjit Dey served as Guest of Honour and Co-Convenor.",
      category: "Event",
      date: new Date("2026-05-25"),
      featured: true,
      published: true,
    },
    {
      id: "news-drdo-2024",
      title: "DRDO-Funded Project on ML-Based Naval Microgrid Management",
      excerpt: "A 36-month DRDO-sponsored project on ML-based solar and wind forecasting for on-board naval microgrids has been initiated. Dr. Prasenjit Dey is serving as Co-Investigator on this defence research project.",
      category: "Grant",
      date: new Date("2024-02-10"),
      featured: true,
      published: true,
    },
    {
      id: "news-pattern-recognition-2024",
      title: "Paper Accepted in Pattern Recognition Journal",
      excerpt: "Research paper 'Discriminative Regularized Input Manifold for Multilayer Perceptron' accepted in Pattern Recognition (Elsevier), one of the leading journals in computer vision and pattern analysis.",
      category: "Publication",
      date: new Date("2024-03-15"),
      featured: false,
      published: true,
    },
    {
      id: "news-phd-positions-2024",
      title: "PhD Positions Available in Machine Learning and Deep Learning",
      excerpt: "The lab is accepting applications from motivated candidates for Ph.D. research in Machine Learning, Deep Learning, and Computer Vision. GATE/NET qualified candidates encouraged to apply.",
      category: "Opportunity",
      date: new Date("2024-01-20"),
      featured: false,
      published: true,
    },
  ];

  for (const item of newsItems) {
    await prisma.news.upsert({
      where: { id: item.id },
      create: item,
      update: {
        title: item.title,
        excerpt: item.excerpt,
        category: item.category,
        date: item.date,
        featured: item.featured,
        published: item.published,
      },
    });
  }
  console.log("✓ News items seeded");

  // ── Gallery images ───────────────────────────────────────────────────────
  const galleryItems = [
    {
      id: "gallery-cmpdi-award-2025",
      title: "CMPDI Certificate of Achievement — Star Rating Awards Ceremony",
      description: "Dr. Prasenjit Dey receiving the Certificate of Achievement from Union Minister Shri G. Kishan Reddy at the Star Rating Awards Ceremony for Coal & Lignite Mines, Mumbai, September 2025. Second Runner-Up position at the CMPDI Hackathon on R&D 2025.",
      imageUrl: "/images/gallery/cmpdi-award-2025.jpg",
      category: "Awards",
      album: "CMPDI Hackathon R&D 2025",
      sortOrder: 0,
    },
    {
      id: "gallery-digital-literacy-workshop-2026",
      title: "Digital Literacy Workshop for School Teachers — NIT Rourkela",
      description: "Five-day workshop on Enhancing Digital Literacy of School Teachers towards Women Empowerment, inaugurated on 25 May 2026 at CSE Dept., NIT Rourkela, jointly with Rotary Club of Rourkela Steel City.",
      imageUrl: "/images/gallery/digital-literacy-workshop-2026.jpg",
      category: "Teaching",
      album: "Workshops 2026",
      sortOrder: 1,
    },
  ];

  for (const item of galleryItems) {
    await prisma.galleryImage.upsert({
      where: { id: item.id },
      create: item,
      update: {
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        category: item.category,
        album: item.album,
        sortOrder: item.sortOrder,
      },
    });
  }
  console.log("✓ Gallery items seeded");

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
