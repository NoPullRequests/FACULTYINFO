import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authSecret =
  process.env.AUTH_SECRET ??
  (process.env.NODE_ENV === "development"
    ? "academic-portfolio-dev-secret-do-not-use-in-production"
    : undefined);

// #region agent log
fetch("http://127.0.0.1:7635/ingest/fe280080-e33e-430c-bc31-ba262f5580c9", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Debug-Session-Id": "8cccf9",
  },
  body: JSON.stringify({
    sessionId: "8cccf9",
    location: "auth.ts:init",
    message: "Auth secret resolved",
    data: {
      hasSecret: Boolean(authSecret),
      fromEnv: Boolean(process.env.AUTH_SECRET),
      nodeEnv: process.env.NODE_ENV,
    },
    timestamp: Date.now(),
    hypothesisId: "B",
    runId: "post-fix",
  }),
}).catch(() => {});
// #endregion

/**
 * Admin authentication — single credentials user via environment variables.
 * Set ADMIN_EMAIL, ADMIN_PASSWORD, and AUTH_SECRET in .env.local
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: authSecret,
  trustHost: true,
  providers: [
    Credentials({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
          return null;
        }

        if (email === adminEmail && password === adminPassword) {
          return {
            id: "admin",
            name: "Administrator",
            email: adminEmail,
            role: "ADMIN",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = "ADMIN";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
