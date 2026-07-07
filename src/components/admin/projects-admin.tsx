"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ProjectRow = {
  id: string;
  title: string;
  agency: string;
  role: string;
  type: string;
  status: string;
  durationMonths: number;
  description: string | null;
  sortOrder: number;
};

const TYPES    = ["SPONSORED", "CONSULTANCY", "OTHER"];
const STATUSES = ["ongoing", "completed"];

const empty = (): Omit<ProjectRow, "id"> => ({
  title: "", agency: "", role: "", type: "SPONSORED",
  status: "ongoing", durationMonths: 0, description: "", sortOrder: 0,
});

export function ProjectsAdmin({
  initial,
  dbConnected,
}: {
  initial: ProjectRow[];
  dbConnected: boolean;
}) {
  const router = useRouter();
  const [rows, setRows]       = useState<ProjectRow[]>(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm]       = useState(empty());
  const [adding, setAdding]   = useState(false);
  const [busy, setBusy]       = useState(false);
  const [msg, setMsg]         = useState("");

  function startAdd() {
    setAdding(true); setEditing(null); setForm(empty());
  }
  function startEdit(row: ProjectRow) {
    setEditing(row.id); setAdding(false);
    setForm({
      title:          row.title,
      agency:         row.agency,
      role:           row.role,
      type:           row.type,
      status:         row.status,
      durationMonths: row.durationMonths,
      description:    row.description ?? "",
      sortOrder:      row.sortOrder,
    });
  }
  function cancel() { setAdding(false); setEditing(null); }

  async function save() {
    setBusy(true); setMsg("");
    const url    = editing ? `/api/admin/projects/${editing}` : "/api/admin/projects";
    const method = editing ? "PUT" : "POST";
    const payload = { ...form, description: form.description || null };
    const res  = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) { setMsg(json.error ?? "Failed"); return; }
    setMsg("✓ Saved!");
    setAdding(false); setEditing(null);
    router.refresh();
    if (editing) {
      setRows(rows.map(r => r.id === editing ? { id: r.id, ...payload } : r));
    } else {
      setRows([{ id: json.data.id, ...payload }, ...rows]);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) { setMsg("Delete failed."); setBusy(false); return; }
    setRows(rows.filter(r => r.id !== id));
    router.refresh();
  }

  const typeColor = (t: string) => {
    if (t === "SPONSORED")   return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
    if (t === "CONSULTANCY") return "bg-purple-500/10 text-purple-700 dark:text-purple-400";
    return "bg-muted text-muted-foreground";
  };

  const statusColor = (s: string) => s === "ongoing"
    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
    : "bg-muted text-muted-foreground";

  const FormPanel = () => (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h3 className="font-semibold">{adding ? "Add Project" : "Edit Project"}</h3>

      <div className="space-y-2">
        <Label>Title *</Label>
        <Textarea
          value={form.title}
          rows={2}
          onChange={e => setForm({ ...form, title: e.target.value })}
          placeholder="Project title"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Agency *</Label>
          <Input
            value={form.agency}
            onChange={e => setForm({ ...form, agency: e.target.value })}
            placeholder="SERB, DST, DRDO…"
          />
        </div>
        <div className="space-y-2">
          <Label>Role *</Label>
          <Input
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            placeholder="Principal Investigator"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Duration (months)</Label>
          <Input
            type="number"
            value={form.durationMonths}
            onChange={e => setForm({ ...form, durationMonths: Number(e.target.value) })}
            placeholder="36"
          />
        </div>
        <div className="space-y-2">
          <Label>Sort Order</Label>
          <Input
            type="number"
            value={form.sortOrder}
            onChange={e => setForm({ ...form, sortOrder: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description (optional)</Label>
        <Textarea
          value={form.description ?? ""}
          rows={3}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder="Brief description of the project goals and outcomes…"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={save} disabled={busy || !dbConnected}>
          <Save className="size-4 mr-1" />{busy ? "Saving…" : "Save"}
        </Button>
        <Button variant="ghost" onClick={cancel}>
          <X className="size-4 mr-1" />Cancel
        </Button>
        {msg && (
          <span className={`text-sm self-center ${msg.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>
            {msg}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {!adding && !editing && (
        <Button onClick={startAdd} disabled={!dbConnected}>
          <Plus className="size-4 mr-1" /> Add Project
        </Button>
      )}
      {(adding || editing) && <FormPanel />}

      <div className="space-y-3">
        {rows.length === 0 && (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No projects yet. Add one above.
          </p>
        )}
        {rows.map(row => (
          <div key={row.id} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm line-clamp-1">{row.title}</span>
                <span className={`text-xs rounded-full px-2 py-0.5 font-medium shrink-0 ${typeColor(row.type)}`}>
                  {row.type}
                </span>
                <span className={`text-xs rounded-full px-2 py-0.5 font-medium shrink-0 ${statusColor(row.status)}`}>
                  {row.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {row.agency} · {row.role}
                {row.durationMonths > 0 ? ` · ${row.durationMonths} months` : ""}
              </p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon" onClick={() => startEdit(row)}>
                <Pencil className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => remove(row.id)} disabled={busy}>
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
