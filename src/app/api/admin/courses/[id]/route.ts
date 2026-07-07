import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { requireAdminApi } from "@/lib/admin/api";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const body = await request.json();
  const updated = await auth.prisma.course.update({
    where: { id },
    data: {
      name:      String(body.name ?? ""),
      type:      String(body.type ?? "Theory"),
      isActive:  body.isActive !== false,
      sortOrder: Number(body.sortOrder ?? 0),
    },
  });
  revalidateTag("courses", "max");
  return NextResponse.json({ data: updated });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  await auth.prisma.course.delete({ where: { id } });
  revalidateTag("courses", "max");
  return NextResponse.json({ status: "deleted" });
}
