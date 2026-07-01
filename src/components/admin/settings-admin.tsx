"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type EducationItem  = { degree: string; institution: string; year: string; field?: string; thesis?: string };
type ExperienceItem = { title: string; organization: string; department?: string; start: string; end?: string };
type AwardItem      = { title: string; organization: string; year: string };

type SettingsData = {
  shortBio: string;
  longBio: string;
  researchGroup: string;
  publicationTotalCount: number;
  researchInterests: string[];
  stats: {
    publications: number;
    citations: number;
    scholarHIndex: number;
    doctoralStudents: number;
  };
  education: EducationItem[];
  experience: ExperienceItem[];
  awards: AwardItem[];
};

/* ─── Main component ─────────────────────────────────────────────────────── */
export function SettingsAdmin({
  initial,
  dbConnected,
}: {
  initial: SettingsData;
  dbConnected: boolean;
}) {
  const router = useRouter();
  const [form, setForm]     = useState<SettingsData>(initial);
  const [message, setMessage]   = useState("");
  const [saving, setSaving]     = useState(false);

  const [passwordForm, setPasswordForm]       = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  /* ── Save settings ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dbConnected) return;
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shortBio: form.shortBio,
        longBio:  form.longBio,
        researchGroup: form.researchGroup,
        publicationTotalCount: form.publicationTotalCount,
        researchInterests: form.researchInterests,
        stats: form.stats,
        education: form.education,
        experience: form.experience,
        awards: form.awards,
      }),
    });

    setSaving(false);
    if (!res.ok) {
      const json = await res.json();
      setMessage(json.error ?? "Save failed");
      return;
    }
    setMessage("✓ Settings saved successfully!");
    router.refresh();
  }

  /* ── Change password ── */
  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMessage("");
    setPasswordLoading(true);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New passwords don't match");
      setPasswordLoading(false);
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordMessage("Password must be at least 8 characters");
      setPasswordLoading(false);
      return;
    }

    try {
      const res  = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) setPasswordMessage(data.error || "Failed to change password");
      else {
        setPasswordMessage("✓ Password changed successfully!");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch { setPasswordMessage("Failed to change password"); }
    finally  { setPasswordLoading(false); }
  }

  /* ── Array helpers ── */
  function updateInterest(i: number, val: string) {
    const next = [...form.researchInterests];
    next[i] = val;
    setForm({ ...form, researchInterests: next });
  }
  function addInterest()    { setForm({ ...form, researchInterests: [...form.researchInterests, ""] }); }
  function removeInterest(i: number) {
    setForm({ ...form, researchInterests: form.researchInterests.filter((_, idx) => idx !== i) });
  }

  function updateEducation(i: number, field: keyof EducationItem, val: string) {
    const next = [...form.education];
    next[i] = { ...next[i], [field]: val };
    setForm({ ...form, education: next });
  }
  function addEducation()    { setForm({ ...form, education: [...form.education, { degree: "", institution: "", year: "", field: "" }] }); }
  function removeEducation(i: number) { setForm({ ...form, education: form.education.filter((_, idx) => idx !== i) }); }

  function updateExperience(i: number, field: keyof ExperienceItem, val: string) {
    const next = [...form.experience];
    next[i] = { ...next[i], [field]: val };
    setForm({ ...form, experience: next });
  }
  function addExperience()    { setForm({ ...form, experience: [...form.experience, { title: "", organization: "", start: "", end: "" }] }); }
  function removeExperience(i: number) { setForm({ ...form, experience: form.experience.filter((_, idx) => idx !== i) }); }

  function updateAward(i: number, field: keyof AwardItem, val: string) {
    const next = [...form.awards];
    next[i] = { ...next[i], [field]: val };
    setForm({ ...form, awards: next });
  }
  function addAward()    { setForm({ ...form, awards: [...form.awards, { title: "", organization: "", year: "" }] }); }
  function removeAward(i: number) { setForm({ ...form, awards: form.awards.filter((_, idx) => idx !== i) }); }

  /* ── Section wrapper ── */
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold border-b border-border pb-2">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-3xl space-y-10">
      <form onSubmit={handleSubmit} className="space-y-10">

        {/* ── Bio ── */}
        <Section title="Biography">
          <div className="space-y-2">
            <Label htmlFor="shortBio">Short bio (shown on homepage)</Label>
            <Textarea id="shortBio" value={form.shortBio} rows={3} disabled={!dbConnected}
              onChange={(e) => setForm({ ...form, shortBio: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longBio">Full bio (shown on About page)</Label>
            <Textarea id="longBio" value={form.longBio} rows={8} disabled={!dbConnected}
              onChange={(e) => setForm({ ...form, longBio: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="researchGroup">Research group name</Label>
            <Input id="researchGroup" value={form.researchGroup} disabled={!dbConnected}
              onChange={(e) => setForm({ ...form, researchGroup: e.target.value })} />
          </div>
        </Section>

        {/* ── Stats ── */}
        <Section title="Homepage Statistics">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Publications",     key: "publications"     as const },
              { label: "Citations",        key: "citations"        as const },
              { label: "h-index",          key: "scholarHIndex"    as const },
              { label: "Doctoral Students",key: "doctoralStudents" as const },
            ].map(({ label, key }) => (
              <div key={key} className="space-y-2">
                <Label>{label}</Label>
                <Input type="number" value={form.stats[key]} disabled={!dbConnected}
                  onChange={(e) => setForm({ ...form, stats: { ...form.stats, [key]: Number(e.target.value) } })} />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pubCount">Total publications (display count)</Label>
            <Input id="pubCount" type="number" value={form.publicationTotalCount} disabled={!dbConnected}
              onChange={(e) => setForm({ ...form, publicationTotalCount: Number(e.target.value) })} />
          </div>
        </Section>

        {/* ── Research Interests ── */}
        <Section title="Research Interests">
          <div className="space-y-2">
            {form.researchInterests.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input value={item} disabled={!dbConnected}
                  onChange={(e) => updateInterest(i, e.target.value)}
                  placeholder="e.g. Machine Learning" />
                <Button type="button" variant="ghost" size="icon" disabled={!dbConnected}
                  onClick={() => removeInterest(i)}>
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" disabled={!dbConnected} onClick={addInterest}>
              <Plus className="size-4 mr-1" /> Add Interest
            </Button>
          </div>
        </Section>

        {/* ── Education ── */}
        <Section title="Education">
          <div className="space-y-4">
            {form.education.map((item, i) => (
              <div key={i} className="rounded-lg border border-border p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Entry {i + 1}</span>
                  <Button type="button" variant="ghost" size="icon" disabled={!dbConnected}
                    onClick={() => removeEducation(i)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label>Degree</Label>
                    <Input value={item.degree} disabled={!dbConnected}
                      onChange={(e) => updateEducation(i, "degree", e.target.value)}
                      placeholder="Ph.D. in Computer Science" />
                  </div>
                  <div className="space-y-1">
                    <Label>Institution</Label>
                    <Input value={item.institution} disabled={!dbConnected}
                      onChange={(e) => updateEducation(i, "institution", e.target.value)}
                      placeholder="NIT Durgapur" />
                  </div>
                  <div className="space-y-1">
                    <Label>Year</Label>
                    <Input value={item.year} disabled={!dbConnected}
                      onChange={(e) => updateEducation(i, "year", e.target.value)}
                      placeholder="2018" />
                  </div>
                  <div className="space-y-1">
                    <Label>Field (optional)</Label>
                    <Input value={item.field ?? ""} disabled={!dbConnected}
                      onChange={(e) => updateEducation(i, "field", e.target.value)}
                      placeholder="Computer Science & Engineering" />
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" disabled={!dbConnected} onClick={addEducation}>
              <Plus className="size-4 mr-1" /> Add Education
            </Button>
          </div>
        </Section>

        {/* ── Experience ── */}
        <Section title="Work Experience">
          <div className="space-y-4">
            {form.experience.map((item, i) => (
              <div key={i} className="rounded-lg border border-border p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Entry {i + 1}</span>
                  <Button type="button" variant="ghost" size="icon" disabled={!dbConnected}
                    onClick={() => removeExperience(i)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label>Title / Position</Label>
                    <Input value={item.title} disabled={!dbConnected}
                      onChange={(e) => updateExperience(i, "title", e.target.value)}
                      placeholder="Assistant Professor" />
                  </div>
                  <div className="space-y-1">
                    <Label>Organization</Label>
                    <Input value={item.organization} disabled={!dbConnected}
                      onChange={(e) => updateExperience(i, "organization", e.target.value)}
                      placeholder="NIT Rourkela" />
                  </div>
                  <div className="space-y-1">
                    <Label>Start Year</Label>
                    <Input value={item.start} disabled={!dbConnected}
                      onChange={(e) => updateExperience(i, "start", e.target.value)}
                      placeholder="2023" />
                  </div>
                  <div className="space-y-1">
                    <Label>End Year (leave blank if current)</Label>
                    <Input value={item.end ?? ""} disabled={!dbConnected}
                      onChange={(e) => updateExperience(i, "end", e.target.value)}
                      placeholder="Present" />
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" disabled={!dbConnected} onClick={addExperience}>
              <Plus className="size-4 mr-1" /> Add Experience
            </Button>
          </div>
        </Section>

        {/* ── Awards ── */}
        <Section title="Awards & Honours">
          <div className="space-y-4">
            {form.awards.map((item, i) => (
              <div key={i} className="rounded-lg border border-border p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Entry {i + 1}</span>
                  <Button type="button" variant="ghost" size="icon" disabled={!dbConnected}
                    onClick={() => removeAward(i)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="space-y-1 sm:col-span-2">
                    <Label>Award Title</Label>
                    <Input value={item.title} disabled={!dbConnected}
                      onChange={(e) => updateAward(i, "title", e.target.value)}
                      placeholder="Best Paper Award" />
                  </div>
                  <div className="space-y-1">
                    <Label>Year</Label>
                    <Input value={item.year} disabled={!dbConnected}
                      onChange={(e) => updateAward(i, "year", e.target.value)}
                      placeholder="2025" />
                  </div>
                  <div className="space-y-1 sm:col-span-3">
                    <Label>Organization / Venue</Label>
                    <Input value={item.organization} disabled={!dbConnected}
                      onChange={(e) => updateAward(i, "organization", e.target.value)}
                      placeholder="IEEE International Conference" />
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" disabled={!dbConnected} onClick={addAward}>
              <Plus className="size-4 mr-1" /> Add Award
            </Button>
          </div>
        </Section>

        {/* ── Save button ── */}
        <div className="flex items-center gap-4 pt-2">
          <Button type="submit" disabled={!dbConnected || saving}>
            <Save className="size-4 mr-2" />
            {saving ? "Saving…" : "Save All Settings"}
          </Button>
          {message && (
            <p className={`text-sm ${message.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>
      </form>

      <Separator />

      {/* ── Password change ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <KeyRound className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Change Password</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Minimum 8 characters. Use a mix of letters, numbers, and symbols.
        </p>
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" required disabled={passwordLoading}
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" required minLength={8} disabled={passwordLoading}
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" required minLength={8} disabled={passwordLoading}
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} />
          </div>
          <Button type="submit" disabled={passwordLoading}>
            {passwordLoading ? "Changing…" : "Change Password"}
          </Button>
          {passwordMessage && (
            <p className={`text-sm ${passwordMessage.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>
              {passwordMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
