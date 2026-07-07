import { auth } from "@/auth";
import { ChangePasswordForm } from "@/components/admin/change-password-form";

export default async function AdminAccountPage() {
  const session = await auth();
  const email   = session?.user?.email ?? "—";
  const name    = session?.user?.name  ?? "Admin";

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Account</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your admin account settings.
      </p>

      <section className="mt-8 rounded-xl border border-border bg-card p-6 space-y-2">
        <h2 className="text-base font-semibold">Profile</h2>
        <p className="text-sm">
          <span className="text-muted-foreground">Name: </span>
          {name}
        </p>
        <p className="text-sm">
          <span className="text-muted-foreground">Email: </span>
          {email}
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold">Change Password</h2>
        <ChangePasswordForm />
      </section>
    </div>
  );
}
