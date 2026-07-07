"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type State = "idle" | "sending" | "success" | "error";

export function ContactForm({ email }: { email: string }) {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name:    (fd.get("name") as string).trim(),
      email:   (fd.get("email") as string).trim(),
      subject: (fd.get("subject") as string).trim(),
      message: (fd.get("message") as string).trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json() as { success?: boolean; error?: string };

      if (!res.ok || !json.success) {
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setState("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setErrorMsg("Network error. Please email directly at " + email);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
        <CheckCircle className="size-10 text-emerald-600" />
        <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">Message sent!</h3>
        <p className="text-sm text-muted-foreground">
          Thank you for reaching out. You will receive a reply at the email you provided.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cf-name" className="block text-sm font-medium">
          Your Name
        </label>
        <input
          type="text"
          id="cf-name"
          name="name"
          required
          disabled={state === "sending"}
          className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none ring-ring transition-colors focus-visible:border-primary focus-visible:ring-2 disabled:opacity-60"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="cf-email" className="block text-sm font-medium">
          Your Email
        </label>
        <input
          type="email"
          id="cf-email"
          name="email"
          required
          disabled={state === "sending"}
          className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none ring-ring transition-colors focus-visible:border-primary focus-visible:ring-2 disabled:opacity-60"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="cf-subject" className="block text-sm font-medium">
          Subject
        </label>
        <input
          type="text"
          id="cf-subject"
          name="subject"
          disabled={state === "sending"}
          className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none ring-ring transition-colors focus-visible:border-primary focus-visible:ring-2 disabled:opacity-60"
          placeholder="Research collaboration inquiry"
        />
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          disabled={state === "sending"}
          className="mt-1.5 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring transition-colors focus-visible:border-primary focus-visible:ring-2 disabled:opacity-60"
          placeholder="Tell me about your research interests or collaboration ideas..."
        />
      </div>

      {state === "error" && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="group inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-transparent bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70"
      >
        {state === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
