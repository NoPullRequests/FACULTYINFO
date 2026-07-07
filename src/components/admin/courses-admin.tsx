"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CourseRow = {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  sortOrder: number;
};

const TYPES = ["Theory", "Lab", "Elective"];

const empty = (): Omit<CourseRow, "id"> => ({
  name: "", type: "Theory", isActive: true, sortOrder: 0,
});

export function CoursesAdmin({
  initial,
  dbConnected,
}: {
  initial: CourseRow[];
  dbConnected: boolean;
}) {
  const router = useRouter();
  const [rows, setRows]       = useState<CourseRow[]>(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm]       = useState(empty());
  const [adding, setAdding]   = useState(false);
  const [busy, setBusy]       = useState(false);
  const [msg, setMsg]         = useState("");

  function startAdd() {
    setAdding(true); setEditing(null); setForm(empty());
  }
  function startEdit(row: CourseRow) {
    setEditing(row.id); setAdding(false);
    setForm({ name: row.name, type: row.type, isActive: row.isActive, sortOrder: row.sortOrder });
  }
  function cancel() { setAdding(false); setEditing(null); }

  async function save() {
    setBusy(true); setMsg("");
    const url    = editing ? `/api/admin/courses/${editing}` : "/api/admin/courses";
    const method = editing ? "PUT" : "POST";
    const res  = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) { setMsg(json.error ?? "Failed"); return; }
    setMsg("✓ Saved!");
    setAdding(false); setEditing(null);
    router.refresh();
    if (editing) {
      setRows(rows.map(r => r.id === editing ? { id: r.id, ...form } : r));
    } else {
      setRows([...rows, { id: json.data.id, ...form }]);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this course?")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) { setMsg("Delete failed."); setBusy(false); return; }
    setRows(rows.filter(r => r.id !== id));
    router.refresh();
  }

  const FormPanel = () => (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h3 className="font-semibold">{adding ? "Add Course" : "Edit Course"}</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2 sm:col-span-2">
          <Label>Course Name *</Label>
          <Input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Introduction to Machine Learning"
          />
        </div>
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
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={e => setForm({ ...form, isActive: e.target.checked })}
          />
          Currently teaching
        </label>
        <div className="flex items-center gap-2">
          <Label className="text-sm">Sort Order</Label>
          <Input
            type="number"
            className="w-24"
            value={form.sortOrder}
            onChange={e => setForm({ ...form, sortOrder: Number(e.target.value) })}
          />
        </div>
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
          <Plus className="size-4 mr-1" /> Add Course
        </Button>
      )}
      {(adding || editing) && <FormPanel />}

      <div className="space-y-3">
        {rows.length === 0 && (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No courses yet. Add one above.
          </p>
        )}
        {rows.map(row => (
          <div key={row.id} className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
            <div className="min-w-0 flex-1 flex items-center gap-3 flex-wrap">
              <span className="font-medium text-sm">{row.name}</span>
              <span className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground shrink-0">
                {row.type}
              </span>
              {row.isActive ? (
                <span className="text-xs rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 font-medium shrink-0">
                  Active
                </span>
              ) : (
                <span className="text-xs rounded-full bg-muted text-muted-foreground px-2 py-0.5 shrink-0">
                  Inactive
                </span>
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
