import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/api";

export async function GET() {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const rows = await auth.prisma.download.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const body = await request.json();
  if (!body.title?.trim() || !body.fileUrl?.trim())
    return NextResponse.json({ error: "Title and file URL are required" }, { status: 400 });
  const created = await auth.prisma.download.create({
    data: {
      title:       String(body.title),
      description: body.description ? String(body.description) : null,
      fileUrl:     String(body.fileUrl),
      fileType:    String(body.fileType ?? "PDF"),
      fileSize:    body.fileSize ? String(body.fileSize) : null,
      category:    String(body.category ?? "General"),
      course:      body.course ? String(body.course) : null,
      published:   body.published !== false,
      sortOrder:   Number(body.sortOrder ?? 0),
    },
  });
  return NextResponse.json({ data: created }, { status: 201 });
}
