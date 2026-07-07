import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

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

  revalidateTag("publications", "max");
  return NextResponse.json({ data: updated });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;

  const { id } = await context.params;
  await auth.prisma.publication.delete({ where: { id } });

  revalidateTag("publications", "max");
  return NextResponse.json({ status: "deleted" });
}
