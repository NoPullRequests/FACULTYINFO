import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/api";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const body = await request.json();
  const updated = await auth.prisma.galleryImage.update({
    where: { id },
    data: {
      title:       String(body.title),
      description: body.description ? String(body.description) : null,
      imageUrl:    String(body.imageUrl),
      category:    String(body.category ?? "General"),
      album:       body.album ? String(body.album) : null,
      sortOrder:   Number(body.sortOrder ?? 0),
    },
  });
  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  await auth.prisma.galleryImage.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
