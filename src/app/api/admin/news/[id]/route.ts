import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/api";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const body = await request.json();
  const updated = await auth.prisma.news.update({
    where: { id },
    data: {
      title:    String(body.title),
      excerpt:  String(body.excerpt ?? ""),
      content:  body.content ? String(body.content) : null,
      category: String(body.category ?? "General"),
      featured: Boolean(body.featured),
      published: body.published !== false,
      date:     body.date ? new Date(body.date) : undefined,
    },
  });
  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  await auth.prisma.news.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
