import { Briefcase, GraduationCap, Send, CheckCircle2, FlaskConical, BookOpen } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { siteConfig } from "@/config/site";
import { getPositions } from "@/lib/content";
import type { Position } from "@/lib/content";

const typeIcons: Record<string, React.ElementType> = {
  PHD:        GraduationCap,
  JRF:        Briefcase,
  MTECH:      BookOpen,
  INTERNSHIP: FlaskConical,
  POSTDOC:    FlaskConical,
};

const typeLabels: Record<string, string> = {
  PHD:        "Ph.D. Position",
  JRF:        "Junior Research Fellow",
  MTECH:      "M.Tech Project",
  INTERNSHIP: "Internship",
  POSTDOC:    "Post-Doctoral",
};

const emailTemplate = (title: string) =>
  `Dear Dr. Dey,\n\nI am writing to apply for the ${title} position.\n\nName:\nQualification:\nGATE/NET Score (if applicable):\nResearch Interests:\nBrief Statement:\n\nI have attached my CV and transcripts.\n\nThank you.`;

function PositionCard({ pos }: { pos: Position }) {
  const Icon = typeIcons[pos.type] ?? Briefcase;
  const isOpen = pos.status === "open";

  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{pos.title}</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {typeLabels[pos.type] ?? pos.type} · NIT Rourkela
            </p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
          isOpen ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-muted text-muted-foreground"
        }`}>
          {isOpen ? "Open" : "Closed"}
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <h4 className="text-sm font-semibold">Description</h4>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{pos.description}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Requirements</h4>
          <ul className="mt-1.5 space-y-1.5">
            {pos.requirements.split("\n").filter(Boolean).map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                {req}
              </li>
            ))}
          </ul>
        </div>
        {(pos.funding || pos.deadline) && (
          <div className="flex flex-wrap gap-6 text-sm">
            {pos.funding && (
              <div>
                <span className="font-semibold">Funding: </span>
                <span className="text-muted-foreground">{pos.funding}</span>
              </div>
            )}
            {pos.deadline && (
              <div>
                <span className="font-semibold">Deadline: </span>
                <span className="text-muted-foreground">{pos.deadline}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Application: ${pos.title}`)}&body=${encodeURIComponent(emailTemplate(pos.title))}`}
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
      )}
    </div>
  );
}

// Static fallback position when DB is empty
const STATIC_POSITION: Position = {
  id:           "static-phd",
  title:        "Ph.D. Scholar in Machine Learning",
  type:         "PHD",
  status:       "open",
  description:  "Research in deep learning, neural network robustness, computer vision, and ML for IoT/healthcare applications within the Vision Intelligence Lab.",
  requirements: "M.Tech or equivalent in CS/AI/ML or related fields\nStrong background in mathematics and programming (Python/C++)\nPrior research experience preferred\nQualified in GATE/NET or equivalent national-level exam",
  funding:      "Institute fellowship and project-based assistantships available",
  deadline:     "Rolling admissions",
};

export default async function CareersPage() {
  const dbPositions = await getPositions();
  const positions = dbPositions.length > 0 ? dbPositions : [STATIC_POSITION];

  const open   = positions.filter(p => p.status === "open");
  const closed = positions.filter(p => p.status !== "open");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Open Positions</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Join the Vision Intelligence Lab — working on machine learning, deep learning, and intelligent computing.
          </p>
        </div>
      </FadeIn>

      {/* Open positions */}
      {open.length > 0 && (
        <section className="mt-12 space-y-6">
          <FadeIn delay={80}>
            <h2 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">
              Currently Open ({open.length})
            </h2>
          </FadeIn>
          {open.map((pos, i) => (
            <FadeIn key={pos.id} delay={120 + i * 80} direction="up">
              <PositionCard pos={pos} />
            </FadeIn>
          ))}
        </section>
      )}

      {/* Closed positions */}
      {closed.length > 0 && (
        <section className="mt-12 space-y-6">
          <FadeIn delay={200}>
            <h2 className="text-xl font-semibold text-muted-foreground">Past / Closed</h2>
          </FadeIn>
          {closed.map((pos, i) => (
            <FadeIn key={pos.id} delay={240 + i * 80} direction="up">
              <PositionCard pos={pos} />
            </FadeIn>
          ))}
        </section>
      )}

      {/* How to apply */}
      <FadeIn delay={320} direction="up">
        <section className="mt-12 rounded-xl border border-border bg-muted/30 p-8">
          <h2 className="text-xl font-semibold">How to Apply</h2>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            {[
              `Send your CV, academic transcripts, and a brief statement of research interests to ${siteConfig.email}`,
              "Include 2–3 references (academic advisors or project supervisors) and any publications or project reports.",
              "Shortlisted candidates will be contacted for an interview. Response time: typically 1–2 weeks.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span>
                  {i === 0 ? (
                    <>
                      Send your CV, academic transcripts, and a brief statement of research interests to{" "}
                      <a href={`mailto:${siteConfig.email}`} className="font-medium text-primary underline-offset-4 hover:underline">
                        {siteConfig.email}
                      </a>
                    </>
                  ) : step}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </FadeIn>
    </div>
  );
}
