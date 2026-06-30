"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type PublicationRow = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: string;
  doi: string | null;
  featured: boolean;
};

const emptyForm = {
  id: "",
  title: "",
  authors: "",
  venue: "",
  year: new Date().getFullYear(),
  type: "JOURNAL",
  doi: "",
  featured: false,
};

export function PublicationsAdmin({
  initial,
  dbConnected,
}: {
  initial: PublicationRow[];
  dbConnected: boolean;
}) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function refresh() {
    router.refresh();
    const res = await fetch("/api/admin/publications");
    if (res.ok) {
      const json = await res.json();
      setRows(json.data);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!dbConnected) return;

    const payload = {
      ...form,
      id: editingId ?? form.id,
      doi: form.doi || null,
    };

    const res = await fetch(
      editingId
        ? `/api/admin/publications/${editingId}`
        : "/api/admin/publications",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      const json = await res.json();
      setMessage(json.error ?? "Save failed");
      return;
    }

    setMessage(editingId ? "Publication updated." : "Publication added.");
    setForm(emptyForm);
    setEditingId(null);
    await refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this publication?")) return;
    const res = await fetch(`/api/admin/publications/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setMessage("Publication deleted.");
      await refresh();
    }
  }

  function startEdit(row: PublicationRow) {
    setEditingId(row.id);
    setForm({
      id: row.id,
      title: row.title,
      authors: row.authors,
      venue: row.venue,
      year: row.year,
      type: row.type,
      doi: row.doi ?? "",
      featured: row.featured,
    });
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border border-border p-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            disabled={!dbConnected}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="authors">Authors</Label>
          <Textarea
            id="authors"
            value={form.authors}
            onChange={(e) => setForm({ ...form, authors: e.target.value })}
            required
            disabled={!dbConnected}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="venue">Venue</Label>
          <Input
            id="venue"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            required
            disabled={!dbConnected}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            value={form.year}
            onChange={(e) =>
              setForm({ ...form, year: Number(e.target.value) })
            }
            required
            disabled={!dbConnected}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            disabled={!dbConnected}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="doi">DOI</Label>
          <Input
            id="doi"
            value={form.doi}
            onChange={(e) => setForm({ ...form, doi: e.target.value })}
            disabled={!dbConnected}
          />
        </div>
        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) =>
              setForm({ ...form, featured: e.target.checked })
            }
            disabled={!dbConnected}
          />
          Featured on home page
        </label>
        <div className="flex gap-2 md:col-span-2">
          <Button type="submit" disabled={!dbConnected}>
            {editingId ? "Update" : "Add"} publication
          </Button>
          {editingId ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
            >
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.year}</TableCell>
              <TableCell className="max-w-md truncate">{row.title}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell className="space-x-2 text-right">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(row)}
                  disabled={!dbConnected}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(row.id)}
                  disabled={!dbConnected}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
