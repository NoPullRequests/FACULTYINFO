import { NextResponse } from "next/server";

import { requireAdminApi, type RouteContext } from "@/lib/admin/api";

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;

  const { id } = await context.params;
  await auth.prisma.student.delete({ where: { id } });

  return NextResponse.json({ status: "deleted" });
}
