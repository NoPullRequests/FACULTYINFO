import { Mail, MapPin, Clock, Send } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      <FadeIn>
        <div className="border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact</h1>
          <p className="mt-2 text-muted-foreground">
            Get in touch for research collaboration, student supervision, or consulting opportunities.
          </p>
        </div>
      </FadeIn>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">

        {/* Contact info cards */}
        <div className="space-y-4">
          <FadeIn delay={80} direction="right">
            <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Mail className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold">Email</h2>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-1 block break-words text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Primary contact for academic inquiries
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={140} direction="right">
            <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <MapPin className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold">Office</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {siteConfig.office}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    On-campus office hours by appointment
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200} direction="right">
            <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Clock className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold">Office Hours</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Monday – Friday: 10:00 AM – 5:00 PM
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Please email in advance to schedule a meeting
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Contact form */}
        <FadeIn delay={100} direction="left">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="text-xl font-semibold">Send a Message</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Prefer email? Use the address on the left to reach out directly.
            </p>

            <form className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none ring-ring transition-colors focus-visible:border-primary focus-visible:ring-2"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none ring-ring transition-colors focus-visible:border-primary focus-visible:ring-2"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none ring-ring transition-colors focus-visible:border-primary focus-visible:ring-2"
                  placeholder="Research collaboration inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-1.5 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring transition-colors focus-visible:border-primary focus-visible:ring-2"
                  placeholder="Tell me about your research interests or collaboration ideas..."
                />
              </div>

              <button
                type="submit"
                className="group inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-transparent bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                Send Message
              </button>
            </form>

            <p className="mt-6 text-xs text-muted-foreground">
              Note: This form opens your default email client. A server-side submission handler can be added later.
            </p>
          </div>
        </FadeIn>

      </div>

      {/* Academic profiles */}
      <FadeIn delay={280} direction="up">
        <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Find me on academic networks
          </h2>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a
              href={siteConfig.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              Google Scholar
            </a>
            {siteConfig.orcidUrl && (
              <a
                href={siteConfig.orcidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                ORCID
              </a>
            )}
            {siteConfig.scopusUrl && (
              <a
                href={siteConfig.scopusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                Scopus
              </a>
            )}
            {siteConfig.linkedinUrl && (
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </FadeIn>

    </div>
  );
}
