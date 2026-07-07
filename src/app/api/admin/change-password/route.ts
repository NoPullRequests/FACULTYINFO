import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAdminApi } from "@/lib/admin/api";

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ("error" in auth) return auth.error;

  const body = await request.json() as { currentPassword?: string; newPassword?: string };
  const { currentPassword, newPassword } = body;

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Current password and new password are required" }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
  }

  const email = auth.session.user?.email ?? "";
  const user = await auth.prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });

  const hashed = await bcrypt.hash(newPassword, 10);
  await auth.prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

  return NextResponse.json({ message: "Password changed successfully" });
}
