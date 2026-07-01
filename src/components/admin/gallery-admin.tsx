"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, X, Save, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type GalleryRow = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  category: string;
  album: string | null;
};

const CATEGORIES = ["Lab & Research", "Conferences", "Teaching", "Events", "Awards", "General"];

const empty = (): Omit<GalleryRow, "id"> => ({
  title: "", description: "", imageUrl: "", category: "General", album: "",
});

export function GalleryAdmin({ initial, dbConnected }: { initial: GalleryRow[]; dbConnected: boolean }) {
  const router = useRouter();
  const [rows, setRows]       = useState<GalleryRow[]>(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm]       = useState(empty());
  const [adding, setAdding]   = useState(false);
  const [busy, setBusy]       = useState(false);
  const [msg, setMsg]         = useState("");

  function startAdd()  { setAdding(true); setEditing(null); setForm(empty()); }
  function startEdit(row: GalleryRow) {
    setEditing(row.id); setAdding(false);
    setForm({ title: row.title, description: row.description ?? "", imageUrl: row.imageUrl,
      category: row.category, album: row.album ?? "" });
  }
  function cancel() { setAdding(false); setEditing(null); }

  async function save() {
    setBusy(true); setMsg("");
    const url    = editing ? `/api/admin/gallery/${editing}` : "/api/admin/gallery";
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
    if (!confirm("Delete this image?")) return;
    setBusy(true);
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    setBusy(false);
    setRows(rows.filter(r => r.id !== id));
    router.refresh();
  }

  const FormPanel = () => (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h3 className="font-semibold">{adding ? "Add Image" : "Edit Image"}</h3>
      <div className="space-y-2">
        <Label>Image URL * <span className="text-xs text-muted-foreground">(use /images/gallery/filename.jpg or external URL)</span></Label>
        <Input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="/images/gallery/conference-2024.jpg" />
      </div>
      {form.imageUrl && (
        <div className="relative h-32 w-full overflow-hidden rounded-lg border border-border">
          <Image src={form.imageUrl} alt="Preview" fill className="object-cover" unoptimized />
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Title *</Label>
          <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Lab setup 2024" />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Album (optional)</Label>
        <Input value={form.album ?? ""} onChange={e => setForm({ ...form, album: e.target.value })} placeholder="IEEE CVPR 2024" />
      </div>
      <div className="space-y-2">
        <Label>Description (optional)</Label>
        <Textarea value={form.description ?? ""} rows={2} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief caption for this image..." />
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
          <Plus className="size-4 mr-1" /> Add Image
        </Button>
      )}
      {(adding || editing) && <FormPanel />}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 py-12 text-center">
            <ImageIcon className="mx-auto size-12 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">No images yet. Add photos from the button above.</p>
          </div>
        )}
        {rows.map(row => (
          <div key={row.id} className="group relative overflow-hidden rounded-xl border border-border bg-card">
            <div className="relative h-40 bg-muted">
              <Image src={row.imageUrl} alt={row.title} fill className="object-cover" unoptimized />
            </div>
            <div className="p-3">
              <p className="font-medium text-sm line-clamp-1">{row.title}</p>
              <p className="text-xs text-muted-foreground">{row.category}{row.album ? ` · ${row.album}` : ""}</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="secondary" className="size-7" onClick={() => startEdit(row)}>
                <Pencil className="size-3" />
              </Button>
              <Button size="icon" variant="destructive" className="size-7" onClick={() => remove(row.id)} disabled={busy}>
                <Trash2 className="size-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
