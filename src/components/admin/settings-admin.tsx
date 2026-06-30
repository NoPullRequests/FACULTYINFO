"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

type SettingsData = {
  shortBio: string;
  longBio: string;
  researchGroup: string;
  publicationTotalCount: number;
};

export function SettingsAdmin({
  initial,
  dbConnected,
}: {
  initial: SettingsData;
  dbConnected: boolean;
}) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");

  // Password change states
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!dbConnected) return;

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const json = await res.json();
      setMessage(json.error ?? "Save failed");
      return;
    }

    setMessage("Settings saved.");
    router.refresh();
  }

  async function handlePasswordChange(event: React.FormEvent) {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordLoading(true);

    // Validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New passwords don't match");
      setPasswordLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordMessage("Password must be at least 8 characters");
      setPasswordLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordMessage(data.error || "Failed to change password");
      } else {
        setPasswordMessage("✓ Password changed successfully!");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error: unknown) {
      setPasswordMessage("Failed to change password");
      console.error("Password change error:", error);
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      {/* Site Settings Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shortBio">Short bio (home page)</Label>
            <Textarea
              id="shortBio"
              value={form.shortBio}
              onChange={(e) => setForm({ ...form, shortBio: e.target.value })}
              disabled={!dbConnected}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longBio">Long bio (about page)</Label>
            <Textarea
              id="longBio"
              value={form.longBio}
              onChange={(e) => setForm({ ...form, longBio: e.target.value })}
              disabled={!dbConnected}
              rows={8}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="researchGroup">Research group</Label>
            <Input
              id="researchGroup"
              value={form.researchGroup}
              onChange={(e) =>
                setForm({ ...form, researchGroup: e.target.value })
              }
              disabled={!dbConnected}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="publicationTotalCount">Total publications (display count)</Label>
            <Input
              id="publicationTotalCount"
              type="number"
              value={form.publicationTotalCount}
              onChange={(e) =>
                setForm({
                  ...form,
                  publicationTotalCount: Number(e.target.value),
                })
              }
              disabled={!dbConnected}
            />
          </div>
          <Button type="submit" disabled={!dbConnected}>
            Save settings
          </Button>
          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
        </form>
      </div>

      <Separator />

      {/* Password Change Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Change Password</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Update your login password. Use a strong password with at least 8 characters.
        </p>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
              }
              required
              disabled={passwordLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, newPassword: e.target.value })
              }
              required
              minLength={8}
              disabled={passwordLoading}
            />
            <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
              }
              required
              minLength={8}
              disabled={passwordLoading}
            />
          </div>
          <Button type="submit" disabled={passwordLoading}>
            {passwordLoading ? "Changing..." : "Change Password"}
          </Button>
          {passwordMessage ? (
            <p className={`text-sm ${passwordMessage.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>
              {passwordMessage}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
