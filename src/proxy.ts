import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login";

  if (isLogin && req.auth) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (!isLogin && !req.auth) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
});

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
