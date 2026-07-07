"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy]                       = useState(false);
  const [msg, setMsg]                         = useState("");
  const [isError, setIsError]                 = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setIsError(false);

    if (newPassword !== confirmPassword) {
      setMsg("New passwords do not match.");
      setIsError(true);
      return;
    }
    if (newPassword.length < 8) {
      setMsg("New password must be at least 8 characters.");
      setIsError(true);
      return;
    }

    setBusy(true);
    try {
      const res  = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMsg(json.error ?? "Failed to change password.");
        setIsError(true);
      } else {
        setMsg("✓ Password changed successfully.");
        setIsError(false);
        setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      }
    } catch {
      setMsg("An unexpected error occurred.");
      setIsError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="current-password">Current Password</Label>
        <Input
          id="current-password"
          type="password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <Input
          id="new-password"
          type="password"
          autoComplete="new-password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" disabled={busy}>
          <Save className="size-4 mr-1" />{busy ? "Saving…" : "Change Password"}
        </Button>
        {msg && (
          <span className={`text-sm ${isError ? "text-red-600" : "text-green-600"}`}>
            {msg}
          </span>
        )}
      </div>
    </form>
  );
}
