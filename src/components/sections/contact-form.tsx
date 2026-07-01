"use client";

import { Send } from "lucide-react";

export function ContactForm({ email }: { email: string }) {
  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd      = new FormData(e.currentTarget);
        const name    = (fd.get("name") as string).trim();
        const from    = (fd.get("email") as string).trim();
        const subject = (fd.get("subject") as string).trim();
        const message = (fd.get("message") as string).trim();
        const body    = `From: ${name} <${from}>\n\n${message}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }}
    >
      <div>
        <label htmlFor="cf-name" className="block text-sm font-medium">
          Your Name
        </label>
        <input
          type="text"
          id="cf-name"
          name="name"
          required
          className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none ring-ring transition-colors focus-visible:border-primary focus-visible:ring-2"
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
          className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none ring-ring transition-colors focus-visible:border-primary focus-visible:ring-2"
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
          required
          className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none ring-ring transition-colors focus-visible:border-primary focus-visible:ring-2"
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
          className="mt-1.5 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring transition-colors focus-visible:border-primary focus-visible:ring-2"
          placeholder="Tell me about your research interests or collaboration ideas..."
        />
      </div>

      <button
        type="submit"
        className="group inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-transparent bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
        Send Message
      </button>

      <p className="text-xs text-muted-foreground">
        Clicking Send opens your email client with the message pre-filled.
      </p>
    </form>
  );
}
