import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function getAdminSession() {
  return auth();
}

export async function requireAdminSession() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return session;
}

export function unauthorizedJson() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function databaseRequiredJson() {
  return NextResponse.json(
    {
      error:
        "DATABASE_URL is not configured. Connect Supabase and run npm run db:push && npm run db:seed.",
    },
    { status: 503 },
  );
}
