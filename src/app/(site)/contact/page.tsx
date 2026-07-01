import { Mail, MapPin, Clock } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/sections/contact-form";

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
                    On-campus — please email to schedule a visit
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
                    Monday – Friday: 9:00 AM – 6:00 PM
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Please email in advance to schedule a meeting
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Contact form — client component, mailto-based */}
        <FadeIn delay={100} direction="left">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="text-xl font-semibold">Send a Message</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the form and click Send — it will open your email client with everything pre-filled.
            </p>
            <ContactForm email={siteConfig.email} />
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
            <a href={siteConfig.scholarUrl} target="_blank" rel="noopener noreferrer"
              className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
              Google Scholar
            </a>
            {siteConfig.orcidUrl && (
              <a href={siteConfig.orcidUrl} target="_blank" rel="noopener noreferrer"
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
                ORCID
              </a>
            )}
            {siteConfig.scopusUrl && (
              <a href={siteConfig.scopusUrl} target="_blank" rel="noopener noreferrer"
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
                Scopus
              </a>
            )}
            {siteConfig.linkedinUrl && (
              <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer"
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </FadeIn>

    </div>
  );
}
