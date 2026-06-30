import { NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/admin/api";

export async function GET() {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;

  const rows = await auth.prisma.student.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;

  const body = await request.json();
  const id = String(body.id ?? `stu-${Date.now()}`);

  const created = await auth.prisma.student.upsert({
    where: { id },
    create: {
      id,
      name: String(body.name ?? ""),
      topic: String(body.topic ?? ""),
      level: String(body.level ?? "PHD"),
      status: String(body.status ?? "Continuing"),
      enrolled: body.enrolled ? String(body.enrolled) : null,
      graduationYear: body.graduationYear ? Number(body.graduationYear) : null,
      role: String(body.role ?? "Supervisor"),
      sortOrder: Number(body.sortOrder ?? 0),
    },
    update: {
      name: String(body.name ?? ""),
      topic: String(body.topic ?? ""),
      level: String(body.level ?? "PHD"),
      status: String(body.status ?? "Continuing"),
      enrolled: body.enrolled ? String(body.enrolled) : null,
      graduationYear: body.graduationYear ? Number(body.graduationYear) : null,
      role: String(body.role ?? "Supervisor"),
      sortOrder: Number(body.sortOrder ?? 0),
    },
  });

  return NextResponse.json({ data: created }, { status: 201 });
}
