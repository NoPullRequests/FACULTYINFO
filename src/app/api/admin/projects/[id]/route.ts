import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { requireAdminApi } from "@/lib/admin/api";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const body = await request.json();
  const updated = await auth.prisma.project.update({
    where: { id },
    data: {
      title:          String(body.title ?? ""),
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
  return NextResponse.json({ data: updated });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  await auth.prisma.project.delete({ where: { id } });
  revalidateTag("projects", "max");
  return NextResponse.json({ status: "deleted" });
}
