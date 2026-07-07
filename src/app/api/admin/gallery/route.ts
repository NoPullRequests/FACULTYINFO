import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { requireAdminApi } from "@/lib/admin/api";

export async function GET() {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const rows = await auth.prisma.galleryImage.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;
  const body = await request.json();
  if (!body.title?.trim() || !body.imageUrl?.trim())
    return NextResponse.json({ error: "Title and image URL are required" }, { status: 400 });
  const created = await auth.prisma.galleryImage.create({
    data: {
      title:       String(body.title),
      description: body.description ? String(body.description) : null,
      imageUrl:    String(body.imageUrl),
      category:    String(body.category ?? "General"),
      album:       body.album ? String(body.album) : null,
      sortOrder:   Number(body.sortOrder ?? 0),
    },
  });
  revalidateTag("gallery", "max");
  return NextResponse.json({ data: created }, { status: 201 });
}
