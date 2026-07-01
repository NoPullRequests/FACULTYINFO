"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, X, Save, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type NewsRow = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  featured: boolean;
  published: boolean;
};

const CATEGORIES = ["Publication", "Grant", "Award", "Opportunity", "Event", "General"];

const empty = (): Omit<NewsRow, "id"> => ({
  title: "", excerpt: "", category: "General",
  date: new Date().toISOString().split("T")[0],
  featured: false, published: true,
});

export function NewsAdmin({ initial, dbConnected }: { initial: NewsRow[]; dbConnected: boolean }) {
  const router = useRouter();
  const [rows, setRows]       = useState<NewsRow[]>(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm]       = useState(empty());
  const [adding, setAdding]   = useState(false);
  const [busy, setBusy]       = useState(false);
  const [msg, setMsg]         = useState("");

  function startAdd()  { setAdding(true); setEditing(null); setForm(empty()); }
  function startEdit(row: NewsRow) {
    setEditing(row.id); setAdding(false);
    setForm({ title: row.title, excerpt: row.excerpt, category: row.category,
      date: row.date.split("T")[0], featured: row.featured, published: row.published });
  }
  function cancel() { setAdding(false); setEditing(null); }

  async function save() {
    setBusy(true); setMsg("");
    const url    = editing ? `/api/admin/news/${editing}` : "/api/admin/news";
    const method = editing ? "PUT" : "POST";
    const res    = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const json   = await res.json();
    setBusy(false);
    if (!res.ok) { setMsg(json.error ?? "Failed"); return; }
    setMsg("✓ Saved!");
    setAdding(false); setEditing(null);
    router.refresh();
    if (editing) setRows(rows.map(r => r.id === editing ? { ...r, ...form } : r));
    else setRows([{ id: json.data.id, ...form }, ...rows]);
  }

  async function remove(id: string) {
    if (!confirm("Delete this news item?")) return;
    setBusy(true);
    await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    setBusy(false);
    setRows(rows.filter(r => r.id !== id));
    router.refresh();
  }

  const FormPanel = () => (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h3 className="font-semibold">{adding ? "Add News Item" : "Edit News Item"}</h3>
      <div className="space-y-2">
        <Label>Title *</Label>
        <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Paper accepted at IEEE TNNLS" />
      </div>
      <div className="space-y-2">
        <Label>Excerpt (short summary)</Label>
        <Textarea value={form.excerpt} rows={2} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Brief description shown on homepage and news feed..." />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Date</Label>
          <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
          Featured (shown prominently)
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
          Published (visible on site)
        </label>
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
          <Plus className="size-4 mr-1" /> Add News Item
        </Button>
      )}
      {(adding || editing) && <FormPanel />}

      <div className="space-y-3">
        {rows.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">No news items yet. Add one above.</p>}
        {rows.map(row => (
          <div key={row.id} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{row.title}</span>
                {row.featured && <Star className="size-3 text-amber-500 fill-amber-500" />}
                {!row.published && <span className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">Draft</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{row.category} · {new Date(row.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{row.excerpt}</p>
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
