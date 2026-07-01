import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/api";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const body = await request.json();
  const updated = await auth.prisma.position.update({
    where: { id },
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
  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  await auth.prisma.position.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
