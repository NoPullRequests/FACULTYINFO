/**
 * Central site configuration — Academic Portfolio OS
 * Update this file when onboarding a new professor (no component edits needed).
 */

export type NavLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Dr. Prasenjit Dey",
  title: "Assistant Professor Grade-II",
  department: "Computer Science & Engineering",
  departmentShort: "CSE",
  institution: "NIT Rourkela",
  email: "deyp@nitrkl.ac.in",
  office: "Room CS-321, Dept. of CSE, NIT Rourkela, Odisha 769008",
  // Academic profiles
  scholarId: "Z46lTvcAAAAJ",
  scholarUrl: "https://scholar.google.com/citations?user=Z46lTvcAAAAJ&hl=en",
  orcidUrl: "https://orcid.org/0000-0003-2279-9178",
  scopusUrl: "https://www.scopus.com/authid/detail.uri?authorId=57206460190",
  researcherIdUrl: "https://www.webofscience.com/wos/author/record/ABJ-7988-2022",
  facultyPageUrl: "https://www.nitrkl.ac.in/CS/~deyp/",
  // Social profiles
  linkedinUrl: "https://www.linkedin.com/in/prasenjit-dey-phd-02499520/",
  twitterUrl: "https://twitter.com/PrasenjitDey30",
  youtubeUrl: "https://www.youtube.com/@dr.prasenjitdey2636",
  githubUrl: "https://github.com/Prasenjit123",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Research", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "Teaching", href: "/teaching" },
    { label: "Students", href: "/students" },
    { label: "News", href: "/news" },
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
    { label: "Downloads", href: "/downloads" },
    { label: "Open Positions", href: "/careers" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
} as const;

/** Navbar branding: "Dr. Prasenjit Dey · CSE, NIT Rourkela" */
export function getSiteBranding(): string {
  return `${siteConfig.name} · ${siteConfig.departmentShort}, ${siteConfig.institution}`;
}

/** Browser tab / SEO title */
export function getSiteTitle(): string {
  return `${siteConfig.name} | ${siteConfig.department}, ${siteConfig.institution}`;
}

/** Returns true when a nav link should render as active */
export function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
