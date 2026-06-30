import { NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/admin/api";

export async function GET() {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;

  const settings = await auth.prisma.siteSettings.findUnique({
    where: { id: "default" },
  });

  return NextResponse.json({ data: settings });
}

export async function PUT(request: Request) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;

  const body = await request.json();

  const updated = await auth.prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      shortBio: String(body.shortBio ?? ""),
      longBio: String(body.longBio ?? ""),
      researchGroup: String(body.researchGroup ?? ""),
      researchInterests: body.researchInterests ?? [],
      stats: body.stats ?? {},
      education: body.education ?? [],
      experience: body.experience ?? [],
      awards: body.awards ?? [],
      publicationTotalCount: Number(body.publicationTotalCount ?? 0),
    },
    update: {
      shortBio: String(body.shortBio ?? ""),
      longBio: String(body.longBio ?? ""),
      researchGroup: String(body.researchGroup ?? ""),
      researchInterests: body.researchInterests ?? undefined,
      stats: body.stats ?? undefined,
      publicationTotalCount:
        body.publicationTotalCount !== undefined
          ? Number(body.publicationTotalCount)
          : undefined,
    },
  });

  return NextResponse.json({ data: updated });
}
