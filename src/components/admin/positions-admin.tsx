"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type PositionRow = {
  id: string;
  title: string;
  type: string;
  status: string;
  description: string;
  requirements: string;
  funding: string | null;
  deadline: string | null;
};

const TYPES    = ["PHD", "JRF", "MTECH", "INTERNSHIP", "POSTDOC"];
const STATUSES = ["open", "closed"];

const empty = (): Omit<PositionRow, "id"> => ({
  title: "", type: "PHD", status: "open",
  description: "", requirements: "", funding: "", deadline: "",
});

export function PositionsAdmin({ initial, dbConnected }: { initial: PositionRow[]; dbConnected: boolean }) {
  const router = useRouter();
  const [rows, setRows]       = useState<PositionRow[]>(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm]       = useState(empty());
  const [adding, setAdding]   = useState(false);
  const [busy, setBusy]       = useState(false);
  const [msg, setMsg]         = useState("");

  function startAdd()  { setAdding(true); setEditing(null); setForm(empty()); }
  function startEdit(row: PositionRow) {
    setEditing(row.id); setAdding(false);
    setForm({ title: row.title, type: row.type, status: row.status,
      description: row.description, requirements: row.requirements,
      funding: row.funding ?? "", deadline: row.deadline ?? "" });
  }
  function cancel() { setAdding(false); setEditing(null); }

  async function save() {
    setBusy(true); setMsg("");
    const url    = editing ? `/api/admin/positions/${editing}` : "/api/admin/positions";
    const method = editing ? "PUT" : "POST";
    const res    = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const json   = await res.json();
    setBusy(false);
    if (!res.ok) { setMsg(json.error ?? "Failed"); return; }
    setMsg("✓ Saved!");
    setAdding(false); setEditing(null);
    router.refresh();
    if (editing) setRows(rows.map(r => r.id === editing ? { id: r.id, ...form } : r));
    else setRows([{ id: json.data.id, ...form }, ...rows]);
  }

  async function remove(id: string) {
    if (!confirm("Delete this position?")) return;
    setBusy(true);
    await fetch(`/api/admin/positions/${id}`, { method: "DELETE" });
    setBusy(false);
    setRows(rows.filter(r => r.id !== id));
    router.refresh();
  }

  const statusColor = (s: string) => s === "open"
    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
    : "bg-muted text-muted-foreground";

  const FormPanel = () => (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h3 className="font-semibold">{adding ? "Add Position" : "Edit Position"}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2 sm:col-span-2">
          <Label>Position Title *</Label>
          <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ph.D. Scholar in Deep Learning" />
        </div>
        <div className="space-y-2">
          <Label>Type</Label>
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm">
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Status</Label>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm">
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Deadline (optional)</Label>
          <Input value={form.deadline ?? ""} onChange={e => setForm({ ...form, deadline: e.target.value })} placeholder="Rolling / Dec 2025" />
        </div>
        <div className="space-y-2">
          <Label>Funding (optional)</Label>
          <Input value={form.funding ?? ""} onChange={e => setForm({ ...form, funding: e.target.value })} placeholder="Institute fellowship" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description *</Label>
        <Textarea value={form.description} rows={3} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description of the position and research areas..." />
      </div>
      <div className="space-y-2">
        <Label>Requirements *</Label>
        <Textarea value={form.requirements} rows={3} onChange={e => setForm({ ...form, requirements: e.target.value })} placeholder="M.Tech or equivalent, GATE/NET qualified, Python..." />
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={save} disabled={busy || !dbConnected}>
          <Save className="size-4 mr-1" />{busy ? "Saving…" : "Save"}
        </Button>
        <Button variant="ghost" onClick={cancel}><X className="size-4 mr-1" />Cancel</Button>
        {msg && <span className={`text-sm self-center ${msg.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>{msg}</span>}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {!adding && !editing && (
        <Button onClick={startAdd} disabled={!dbConnected}>
          <Plus className="size-4 mr-1" /> Add Position
        </Button>
      )}
      {(adding || editing) && <FormPanel />}

      <div className="space-y-3">
        {rows.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">No positions yet. Add one above.</p>}
        {rows.map(row => (
          <div key={row.id} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{row.title}</span>
                <span className={`text-xs rounded-full px-2 py-0.5 font-medium ${statusColor(row.status)}`}>{row.status}</span>
                <span className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">{row.type}</span>
              </div>
              {row.deadline && <p className="text-xs text-muted-foreground mt-1">Deadline: {row.deadline}</p>}
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{row.description}</p>
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
