"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type StudentRow = {
  id: string;
  name: string;
  topic: string;
  level: string;
  status: string;
  enrolled: string | null;
  graduationYear: number | null;
  role: string;
  sortOrder: number;
};

const LEVELS   = ["PHD", "MTECH", "BTECH", "JRF"];
const STATUSES = ["Continuing", "Completed", "Left"];
const ROLES    = ["Supervisor", "Co-Supervisor"];

const empty = (): Omit<StudentRow, "id"> => ({
  name: "", topic: "", level: "PHD", status: "Continuing",
  enrolled: "", graduationYear: null, role: "Supervisor", sortOrder: 0,
});

export function StudentsAdmin({
  initial,
  dbConnected,
}: {
  initial: StudentRow[];
  dbConnected: boolean;
}) {
  const router = useRouter();
  const [rows, setRows]       = useState<StudentRow[]>(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm]       = useState(empty());
  const [adding, setAdding]   = useState(false);
  const [busy, setBusy]       = useState(false);
  const [msg, setMsg]         = useState("");

  function startAdd() {
    setAdding(true); setEditing(null); setForm(empty());
  }
  function startEdit(row: StudentRow) {
    setEditing(row.id); setAdding(false);
    setForm({
      name:           row.name,
      topic:          row.topic,
      level:          row.level,
      status:         row.status,
      enrolled:       row.enrolled ?? "",
      graduationYear: row.graduationYear,
      role:           row.role,
      sortOrder:      row.sortOrder,
    });
  }
  function cancel() { setAdding(false); setEditing(null); }

  async function save() {
    setBusy(true); setMsg("");
    const url    = editing ? `/api/admin/students/${editing}` : "/api/admin/students";
    const method = editing ? "PUT" : "POST";
    const payload = {
      ...form,
      enrolled:       form.enrolled || null,
      graduationYear: form.graduationYear || null,
    };
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
    if (!confirm("Delete this student record?")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/students/${id}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) { setMsg("Delete failed."); setBusy(false); return; }
    setRows(rows.filter(r => r.id !== id));
    router.refresh();
  }

  const statusColor = (s: string) => {
    if (s === "Continuing") return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
    if (s === "Completed")  return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
    return "bg-muted text-muted-foreground";
  };

  const FormPanel = () => (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h3 className="font-semibold">{adding ? "Add Student" : "Edit Student"}</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Name *</Label>
          <Input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Student full name"
          />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            {ROLES.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Research Topic *</Label>
        <Textarea
          value={form.topic}
          rows={2}
          onChange={e => setForm({ ...form, topic: e.target.value })}
          placeholder="Brief description of the research topic..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="space-y-2">
          <Label>Level</Label>
          <select
            value={form.level}
            onChange={e => setForm({ ...form, level: e.target.value })}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            {LEVELS.map(l => <option key={l}>{l}</option>)}
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
          <Label>Enrolled (optional)</Label>
          <Input
            value={form.enrolled ?? ""}
            onChange={e => setForm({ ...form, enrolled: e.target.value })}
            placeholder="2021"
          />
        </div>
        <div className="space-y-2">
          <Label>Graduation Year</Label>
          <Input
            type="number"
            value={form.graduationYear ?? ""}
            onChange={e => setForm({ ...form, graduationYear: e.target.value ? Number(e.target.value) : null })}
            placeholder="2025"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Sort Order</Label>
        <Input
          type="number"
          className="w-28"
          value={form.sortOrder}
          onChange={e => setForm({ ...form, sortOrder: Number(e.target.value) })}
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
          <Plus className="size-4 mr-1" /> Add Student
        </Button>
      )}
      {(adding || editing) && <FormPanel />}

      <div className="space-y-3">
        {rows.length === 0 && (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No students yet. Add one above.
          </p>
        )}
        {rows.map(row => (
          <div key={row.id} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{row.name}</span>
                <span className={`text-xs rounded-full px-2 py-0.5 font-medium ${statusColor(row.status)}`}>
                  {row.status}
                </span>
                <span className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                  {row.level}
                </span>
                <span className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                  {row.role}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{row.topic}</p>
              {row.enrolled && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Enrolled: {row.enrolled}
                  {row.graduationYear ? ` · Graduated: ${row.graduationYear}` : ""}
                </p>
              )}
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
