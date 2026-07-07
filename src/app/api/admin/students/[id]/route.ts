import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { requireAdminApi } from "@/lib/admin/api";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;

  const { id } = await params;
  const body = await request.json();

  const updated = await auth.prisma.student.update({
    where: { id },
    data: {
      name:           String(body.name ?? ""),
      topic:          String(body.topic ?? ""),
      level:          String(body.level ?? "PHD"),
      status:         String(body.status ?? "Continuing"),
      enrolled:       body.enrolled ? String(body.enrolled) : null,
      graduationYear: body.graduationYear ? Number(body.graduationYear) : null,
      role:           String(body.role ?? "Supervisor"),
      sortOrder:      Number(body.sortOrder ?? 0),
    },
  });

  revalidateTag("students", "max");
  return NextResponse.json({ data: updated });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;

  const { id } = await params;
  await auth.prisma.student.delete({ where: { id } });

  revalidateTag("students", "max");
  return NextResponse.json({ status: "deleted" });
}
