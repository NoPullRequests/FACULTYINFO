import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { requireAdminApi } from "@/lib/admin/api";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const body = await request.json();
  const updated = await auth.prisma.download.update({
    where: { id },
    data: {
      title:       String(body.title),
      description: body.description ? String(body.description) : null,
      fileUrl:     String(body.fileUrl),
      fileType:    String(body.fileType ?? "PDF"),
      fileSize:    body.fileSize ? String(body.fileSize) : null,
      category:    String(body.category ?? "General"),
      course:      body.course ? String(body.course) : null,
      published:   body.published !== false,
      sortOrder:   Number(body.sortOrder ?? 0),
    },
  });
  revalidateTag("downloads", "max");
  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  await auth.prisma.download.delete({ where: { id } });
  revalidateTag("downloads", "max");
  return NextResponse.json({ success: true });
}
