"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, X, Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type DownloadRow = {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  fileType: string;
  fileSize: string | null;
  category: string;
  course: string | null;
  published: boolean;
};

const CATEGORIES = ["Lecture Notes", "Slides", "Dataset", "Code", "Academic", "Lab Manual", "General"];
const FILE_TYPES = ["PDF", "PPT", "PPTX", "ZIP", "CSV", "IPYNB", "OTHER"];

const empty = (): Omit<DownloadRow, "id"> => ({
  title: "", description: "", fileUrl: "", fileType: "PDF",
  fileSize: "", category: "Lecture Notes", course: "", published: true,
});

export function DownloadsAdmin({ initial, dbConnected }: { initial: DownloadRow[]; dbConnected: boolean }) {
  const router = useRouter();
  const [rows, setRows]       = useState<DownloadRow[]>(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm]       = useState(empty());
  const [adding, setAdding]   = useState(false);
  const [busy, setBusy]       = useState(false);
  const [msg, setMsg]         = useState("");

  function startAdd()  { setAdding(true); setEditing(null); setForm(empty()); }
  function startEdit(row: DownloadRow) {
    setEditing(row.id); setAdding(false);
    setForm({ title: row.title, description: row.description ?? "", fileUrl: row.fileUrl,
      fileType: row.fileType, fileSize: row.fileSize ?? "", category: row.category,
      course: row.course ?? "", published: row.published });
  }
  function cancel() { setAdding(false); setEditing(null); }

  async function save() {
    setBusy(true); setMsg("");
    const url    = editing ? `/api/admin/downloads/${editing}` : "/api/admin/downloads";
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
    if (!confirm("Delete this download?")) return;
    setBusy(true);
    await fetch(`/api/admin/downloads/${id}`, { method: "DELETE" });
    setBusy(false);
    setRows(rows.filter(r => r.id !== id));
    router.refresh();
  }

  const FormPanel = () => (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h3 className="font-semibold">{adding ? "Add Download" : "Edit Download"}</h3>
      <div className="space-y-2">
        <Label>Title *</Label>
        <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Machine Learning Lecture Notes - Unit 1" />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea value={form.description ?? ""} rows={2} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description of this file..." />
      </div>
      <div className="space-y-2">
        <Label>File URL * <span className="text-xs text-muted-foreground">(path like /downloads/ml-unit1.pdf or external URL)</span></Label>
        <Input value={form.fileUrl} onChange={e => setForm({ ...form, fileUrl: e.target.value })} placeholder="/downloads/ml-unit1.pdf" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="space-y-2">
          <Label>File Type</Label>
          <select value={form.fileType} onChange={e => setForm({ ...form, fileType: e.target.value })}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm">
            {FILE_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>File Size</Label>
          <Input value={form.fileSize ?? ""} onChange={e => setForm({ ...form, fileSize: e.target.value })} placeholder="2.4 MB" />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Course (optional)</Label>
          <Input value={form.course ?? ""} onChange={e => setForm({ ...form, course: e.target.value })} placeholder="Machine Learning" />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
        Published (visible to visitors)
      </label>
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
          <Plus className="size-4 mr-1" /> Add Download
        </Button>
      )}
      {(adding || editing) && <FormPanel />}

      <div className="space-y-3">
        {rows.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">No downloads yet. Add lecture notes, slides, datasets above.</p>}
        {rows.map(row => (
          <div key={row.id} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <FileText className="size-4 mt-0.5 shrink-0 text-primary" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{row.title}</span>
                  {!row.published && <span className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">Draft</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{row.category}{row.course ? ` · ${row.course}` : ""} · {row.fileType}{row.fileSize ? ` · ${row.fileSize}` : ""}</p>
              </div>
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
