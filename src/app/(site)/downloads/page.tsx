import { FileText, Download, ExternalLink } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/config/site";

const downloads = [
  {
    id: "cv",
    title: "Curriculum Vitae (CV)",
    description: "Full academic CV with publications, projects, teaching, and awards",
    category: "Academic",
    fileType: "PDF",
    size: "TBD",
    href: "#",  // Update when CV file is ready
    available: false,
  },
  {
    id: "bio",
    title: "Short Biography",
    description: "One-page bio for conference/workshop introductions",
    category: "Academic",
    fileType: "PDF",
    size: "TBD",
    href: "#",
    available: false,
  },
];

const externalResources = [
  {
    title: "Google Scholar Profile",
    description: "Full publication list and citation metrics",
    href: siteConfig.scholarUrl,
  },
  {
    title: "ORCID Profile",
    description: "Verified research profile and works",
    href: siteConfig.orcidUrl ?? "#",
  },
  {
    title: "NIT Rourkela Faculty Page",
    description: "Official institutional profile",
    href: siteConfig.facultyPageUrl,
  },
];

export default function DownloadsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      <FadeIn>
        <div className="border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Downloads</h1>
          <p className="mt-2 text-muted-foreground">
            CV, teaching materials, datasets, and software resources.
          </p>
        </div>
      </FadeIn>

      {/* Documents */}
      <section className="mt-12">
        <FadeIn delay={80}>
          <h2 className="text-xl font-semibold">Documents</h2>
        </FadeIn>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {downloads.map((item, i) => (
            <FadeIn key={item.id} delay={120 + i * 60} direction="up">
              <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="rounded bg-muted px-2 py-0.5">{item.category}</span>
                      <span className="rounded bg-muted px-2 py-0.5">{item.fileType}</span>
                      {item.available && <span className="rounded bg-muted px-2 py-0.5">{item.size}</span>}
                    </div>
                  </div>
                </div>
                {item.available ? (
                  <a
                    href={item.href}
                    download
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:underline"
                  >
                    <Download className="size-4" />
                    Download
                  </a>
                ) : (
                  <p className="mt-4 text-xs text-muted-foreground">
                    File will be available soon
                  </p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* External resources */}
      <section className="mt-12">
        <FadeIn delay={240}>
          <h2 className="text-xl font-semibold">External Resources</h2>
        </FadeIn>
        <div className="mt-6 space-y-3">
          {externalResources.map((item, i) => (
            <FadeIn key={item.title} delay={280 + i * 60} direction="up">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-md"
              >
                <div>
                  <h3 className="font-semibold transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ExternalLink className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Teaching materials placeholder */}
      <FadeIn delay={400} direction="up">
        <section className="mt-12 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <FileText className="mx-auto size-12 text-muted-foreground/40" />
          <h2 className="mt-4 text-lg font-semibold">Teaching Materials</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Lecture notes, slides, datasets, and code for courses I teach will be added here.
          </p>
          <ButtonLink href="/teaching" variant="outline" className="mt-6">
            View Courses
          </ButtonLink>
        </section>
      </FadeIn>

    </div>
  );
}
