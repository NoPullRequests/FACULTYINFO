import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { requireAdminApi } from "@/lib/admin/api";

export async function GET() {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const rows = await auth.prisma.course.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const body = await request.json();
  if (!body.name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  const created = await auth.prisma.course.create({
    data: {
      name:      String(body.name),
      type:      String(body.type ?? "Theory"),
      isActive:  body.isActive !== false,
      sortOrder: Number(body.sortOrder ?? 0),
    },
  });
  revalidateTag("courses", "max");
  return NextResponse.json({ data: created }, { status: 201 });
}
