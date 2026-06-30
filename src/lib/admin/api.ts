import type { NextRequest } from "next/server";

import {
  databaseRequiredJson,
  requireAdminSession,
  unauthorizedJson,
} from "@/lib/admin/auth";
import { getAdminDatabase } from "@/lib/admin/db";

type RouteContext = { params: Promise<{ id: string }> };

export async function requireAdminApi() {
  const session = await requireAdminSession();
  if (!session) {
    return { error: unauthorizedJson() } as const;
  }

  const prisma = await getAdminDatabase();
  if (!prisma) {
    return { error: databaseRequiredJson() } as const;
  }

  return { session, prisma } as const;
}

export function parsePublicationBody(body: Record<string, unknown>) {
  return {
    id: String(body.id ?? ""),
    title: String(body.title ?? ""),
    authors: String(body.authors ?? ""),
    venue: String(body.venue ?? ""),
    year: Number(body.year),
    type: String(body.type ?? "JOURNAL"),
    doi: body.doi ? String(body.doi) : null,
    pdfUrl: body.pdfUrl ? String(body.pdfUrl) : null,
    featured: Boolean(body.featured),
  };
}

export type { RouteContext, NextRequest };
