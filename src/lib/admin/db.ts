import { getPrisma, isDatabaseConfigured } from "@/lib/prisma";

export { isDatabaseConfigured };

/** Returns Prisma client or null — admin mutations require a live database. */
export async function getAdminDatabase() {
  if (!isDatabaseConfigured()) {
    return null;
  }
  return getPrisma();
}
