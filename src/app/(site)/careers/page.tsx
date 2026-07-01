import { Briefcase, GraduationCap, Send, CheckCircle2 } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { siteConfig } from "@/config/site";

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      <FadeIn>
        <div className="border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Open Positions</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Join our research group working on machine learning, deep learning, and intelligent systems.
          </p>
        </div>
      </FadeIn>

      {/* Ph.D. positions */}
      <section className="mt-12">
        <FadeIn delay={80}>
          <div className="flex items-center gap-3">
            <GraduationCap className="size-6 text-primary" />
            <h2 className="text-2xl font-semibold">Ph.D. Positions</h2>
          </div>
        </FadeIn>

        <FadeIn delay={140} direction="up">
          <div className="mt-6 rounded-xl border border-border bg-card p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Ph.D. Scholar in Machine Learning</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Department of Computer Science & Engineering, NIT Rourkela
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Open
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold">Research Areas</h4>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    Deep Learning for Computer Vision
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    Neural Network Robustness and Generalization
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    Machine Learning for IoT and Healthcare Applications
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold">Requirements</h4>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-primary">•</span>
                    M.Tech or equivalent in Computer Science, AI/ML, or related fields
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-primary">•</span>
                    Strong background in mathematics, programming (Python/C++), and deep learning frameworks
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-primary">•</span>
                    Prior research experience (publications/projects) preferred
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-primary">•</span>
                    Qualified in GATE/NET or equivalent national-level exam
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold">Funding</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Institute fellowship and project-based assistantships available for eligible candidates.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Ph.D. Application — Vision Intelligence Lab")}&body=${encodeURIComponent("Dear Dr. Dey,\n\nI am writing to apply for the Ph.D. position in Machine Learning at NIT Rourkela.\n\nName:\nQualification:\nGATE/NET Score:\nResearch Interests:\nBrief Statement:\n\nAttachments: CV, Transcripts, Research Statement\n\nThank you.")}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                <Send className="size-4" />
                Apply Now
              </a>
              <a
                href="/research"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
              >
                View Research Areas
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* M.Tech / Project positions */}
      <section className="mt-12">
        <FadeIn delay={200}>
          <div className="flex items-center gap-3">
            <Briefcase className="size-6 text-primary" />
            <h2 className="text-2xl font-semibold">Project Positions</h2>
          </div>
        </FadeIn>

        <FadeIn delay={260} direction="up">
          <div className="mt-6 rounded-xl border border-border bg-card p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Project Assistant / Junior Research Fellow</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Funded research projects (ANRF, DRDO, Industry collaborations)
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                As available
              </span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Short-term project-based positions may open depending on active research grants. Typical duration: 6–24 months. Candidates with B.Tech/M.Tech in CSE/AI/ML and hands-on experience in Python, TensorFlow/PyTorch, and data analysis are encouraged to check back or email for updates.
            </p>

            <div className="mt-6">
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Project Position Inquiry — Vision Intelligence Lab")}&body=${encodeURIComponent("Dear Dr. Dey,\n\nI am interested in a project/JRF position in your research group.\n\nName:\nQualification:\nArea of Interest:\nAvailability:\n\nThank you.")}`}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Send className="size-4" />
                Express Interest
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* How to apply */}
      <FadeIn delay={320} direction="up">
        <section className="mt-12 rounded-xl border border-border bg-muted/30 p-8">
          <h2 className="text-xl font-semibold">How to Apply</h2>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                1
              </span>
              <span>
                Send your CV, academic transcripts, and a statement of research interests to{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {siteConfig.email}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                2
              </span>
              <span>
                Include 2–3 references (academic advisors or project supervisors) and any publications or project reports.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                3
              </span>
              <span>
                Shortlisted candidates will be contacted for an interview. Response time: typically 1–2 weeks.
              </span>
            </li>
          </ol>
        </section>
      </FadeIn>

    </div>
  );
}
