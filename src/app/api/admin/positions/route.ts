import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { requireAdminApi } from "@/lib/admin/api";

export async function GET() {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const rows = await auth.prisma.position.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const body = await request.json();
  if (!body.title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 });
  const created = await auth.prisma.position.create({
    data: {
      title:        String(body.title),
      type:         String(body.type ?? "PHD"),
      status:       String(body.status ?? "open"),
      description:  String(body.description ?? ""),
      requirements: String(body.requirements ?? ""),
      funding:      body.funding  ? String(body.funding)  : null,
      deadline:     body.deadline ? String(body.deadline) : null,
      sortOrder:    Number(body.sortOrder ?? 0),
    },
  });
  revalidateTag("positions", "max");
  return NextResponse.json({ data: created }, { status: 201 });
}
