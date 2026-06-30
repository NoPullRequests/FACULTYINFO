import { getSiteContent } from "@/lib/content";

import { StatisticsGrid } from "./statistics-grid";

/**
 * Quick stats row for home page — values from site content (JSON or DB).
 */
export async function Statistics() {
  const { stats } = await getSiteContent();

  const items = [
    { label: "Publications", value: stats.publications },
    { label: "Citations", value: (stats as { citations?: number }).citations ?? 380 },
    { label: "h-index", value: stats.scholarHIndex },
    { label: "Doctoral Students", value: stats.doctoralStudents },
  ];

  return <StatisticsGrid items={items} />;
}
