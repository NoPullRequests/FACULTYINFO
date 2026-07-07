import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { requireAdminApi } from "@/lib/admin/api";

export async function GET() {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const rows = await auth.prisma.news.findMany({ orderBy: { date: "desc" } });
  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const body = await request.json();
  if (!body.title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 });
  const created = await auth.prisma.news.create({
    data: {
      title:    String(body.title),
      excerpt:  String(body.excerpt ?? ""),
      content:  body.content ? String(body.content) : null,
      category: String(body.category ?? "General"),
      featured: Boolean(body.featured),
      published: body.published !== false,
      date:     body.date ? new Date(body.date) : new Date(),
    },
  });
  revalidateTag("news", "max");
  return NextResponse.json({ data: created }, { status: 201 });
}
