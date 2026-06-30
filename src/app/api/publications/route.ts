import { NextRequest, NextResponse } from "next/server";

import { getPublicationTotalCount, getPublications } from "@/lib/content";

/**
 * GET /api/publications
 * Query: search, year, type
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const year = searchParams.get("year");
  const type = searchParams.get("type");

  const [publications, totalCount] = await Promise.all([
    getPublications(),
    getPublicationTotalCount(),
  ]);

  const filtered = publications.filter((pub) => {
    const matchesSearch =
      !search ||
      pub.title.toLowerCase().includes(search) ||
      pub.authors.toLowerCase().includes(search) ||
      pub.venue.toLowerCase().includes(search);
    const matchesYear = !year || pub.year === Number(year);
    const matchesType = !type || pub.type === type;
    return matchesSearch && matchesYear && matchesType;
  });

  return NextResponse.json({
    status: "success",
    meta: {
      totalOnRecord: totalCount,
      returned: filtered.length,
    },
    data: filtered,
  });
}
