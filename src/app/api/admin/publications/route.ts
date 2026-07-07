import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import {
  parsePublicationBody,
  requireAdminApi,
} from "@/lib/admin/api";

export async function GET() {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;

  const rows = await auth.prisma.publication.findMany({
    orderBy: [{ year: "desc" }, { title: "asc" }],
  });

  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;

  const body = parsePublicationBody(await request.json());
  if (!body.title || !body.authors || !body.venue || !body.year) {
    return NextResponse.json(
      { error: "title, authors, venue, and year are required" },
      { status: 400 },
    );
  }

  const id = body.id || `pub-${Date.now()}`;

  const created = await auth.prisma.publication.upsert({
    where: { id },
    create: { ...body, id },
    update: body,
  });

  revalidateTag("publications", "max");
  return NextResponse.json({ data: created }, { status: 201 });
}
