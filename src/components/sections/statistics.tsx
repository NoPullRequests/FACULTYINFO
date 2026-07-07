import { siteConfig } from "@/config/site";
import { getSiteContent } from "@/lib/content";

import { StatisticsGrid } from "./statistics-grid";

/**
 * Quick stats row for home page — values from site content (JSON or DB).
 * Each card is clickable and routes to the relevant section.
 */
export async function Statistics() {
  const { stats } = await getSiteContent();

  const items = [
    {
      label: "Publications",
      value: stats.publications,
      href: "/publications",
    },
    {
      label: "Citations",
      value: (stats as { citations?: number }).citations ?? 0,
      href: siteConfig.scholarUrl,
      external: true,
    },
    {
      label: "h-index",
      value: stats.scholarHIndex,
      href: siteConfig.scholarUrl,
      external: true,
    },
    {
      label: "Doctoral Students",
      value: stats.doctoralStudents,
      href: "/students",
    },
  ];

  return <StatisticsGrid items={items} />;
}
