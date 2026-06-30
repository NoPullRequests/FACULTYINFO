"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
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
  );
}
