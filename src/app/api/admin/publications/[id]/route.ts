import { NextResponse } from "next/server";

import {
  parsePublicationBody,
  requireAdminApi,
  type RouteContext,
} from "@/lib/admin/api";

export async function PUT(request: Request, context: RouteContext) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;

  const { id } = await context.params;
  const body = parsePublicationBody({ ...(await request.json()), id });

  const updated = await auth.prisma.publication.update({
    where: { id },
    data: body,
  });

  return NextResponse.json({ data: updated });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;

  const { id } = await context.params;
  await auth.prisma.publication.delete({ where: { id } });

  return NextResponse.json({ status: "deleted" });
}
