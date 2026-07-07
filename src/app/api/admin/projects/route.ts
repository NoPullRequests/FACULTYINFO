import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { requireAdminApi } from "@/lib/admin/api";

export async function GET() {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const rows = await auth.prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const body = await request.json();
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const created = await auth.prisma.project.create({
    data: {
      id:             `proj-${Date.now()}`,
      title:          String(body.title),
      agency:         String(body.agency ?? ""),
      role:           String(body.role ?? ""),
      type:           String(body.type ?? "SPONSORED"),
      status:         String(body.status ?? "ongoing"),
      durationMonths: Number(body.durationMonths ?? 0),
      description:    body.description ? String(body.description) : null,
      sortOrder:      Number(body.sortOrder ?? 0),
    },
  });
  revalidateTag("projects", "max");
  return NextResponse.json({ data: created }, { status: 201 });
}
