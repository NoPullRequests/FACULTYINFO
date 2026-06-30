import { isDatabaseConfigured } from "@/lib/admin/db";

/**
 * Shown in admin when DATABASE_URL is missing — CRUD requires Supabase.
 */
export function AdminDatabaseBanner() {
  if (isDatabaseConfigured()) {
    return null;
  }

  return (
    <div className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-100">
      <p className="font-medium">Database not connected</p>
      <p className="mt-1 text-amber-800/90 dark:text-amber-100/80">
        Add <code className="text-xs">DATABASE_URL</code> to{" "}
        <code className="text-xs">.env.local</code>, then run{" "}
        <code className="text-xs">npm run db:push</code> and{" "}
        <code className="text-xs">npm run db:seed</code>. The public site still
        uses JSON files until then.
      </p>
    </div>
  );
}
