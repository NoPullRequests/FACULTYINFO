import { Handshake, Users, Building2, Lightbulb, Send } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/config/site";

const collaborationTypes = [
  {
    icon: Users,
    title: "Academic Collaboration",
    description: "Joint research projects, co-authorship, and knowledge exchange with faculty from other institutions.",
    examples: ["Co-supervised Ph.D. students", "Joint publications", "Workshop organization", "Visiting researcher programs"],
  },
  {
    icon: Building2,
    title: "Industry Partnership",
    description: "Applied research, consulting, and technology transfer with industry partners.",
    examples: ["Sponsored research projects", "Proof-of-concept development", "Technical consulting", "Student internships"],
  },
  {
    icon: Lightbulb,
    title: "Interdisciplinary Research",
    description: "Cross-domain projects combining ML/AI with other fields like healthcare, energy, or agriculture.",
    examples: ["ML for healthcare diagnostics", "IoT and smart systems", "Energy forecasting", "Pattern recognition applications"],
  },
];

export default function CollaboratePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      <FadeIn>
        <div className="border-b border-border pb-8">
          <div className="flex items-center gap-3">
            <Handshake className="size-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Collaboration</h1>
              <p className="mt-1 text-muted-foreground">
                Partner with us on research, industry projects, or academic initiatives.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Collaboration types */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {collaborationTypes.map((type, i) => (
          <FadeIn key={type.title} delay={80 + i * 80} direction="up">
            <div className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <type.icon className="size-6" />
              </div>
              <h2 className="mt-4 text-lg font-semibold">{type.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{type.description}</p>
              <ul className="mt-4 space-y-2">
                {type.examples.map((ex) => (
                  <li key={ex} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Current collaborators */}
      <section className="mt-16">
        <FadeIn delay={300}>
          <h2 className="text-2xl font-semibold">Current Collaborators</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ongoing research partnerships and co-authored work.
          </p>
        </FadeIn>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FadeIn delay={360} direction="up">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-semibold">Prof. Tandra Pal</p>
              <p className="mt-1 text-sm text-muted-foreground">NIT Durgapur</p>
              <p className="mt-2 text-xs text-muted-foreground">Neural Networks, Pattern Recognition</p>
            </div>
          </FadeIn>
          <FadeIn delay={420} direction="up">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-semibold">Prof. Nikhil R. Pal</p>
              <p className="mt-1 text-sm text-muted-foreground">Indian Statistical Institute</p>
              <p className="mt-2 text-xs text-muted-foreground">Machine Learning, Robustness</p>
            </div>
          </FadeIn>
          <FadeIn delay={480} direction="up">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-semibold">Dr. Anupam Basu</p>
              <p className="mt-1 text-sm text-muted-foreground">IIT Kharagpur</p>
              <p className="mt-2 text-xs text-muted-foreground">Healthcare AI, fNIRS</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How to collaborate */}
      <FadeIn delay={540} direction="up">
        <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8">
          <h2 className="text-xl font-semibold">How to Collaborate</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            I welcome collaboration proposals from academic institutions, industry partners, and research organizations. 
            If you have a project idea, grant opportunity, or partnership proposal, please reach out via email with:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
              Brief description of the proposed collaboration
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
              Your background and institutional affiliation
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
              Expected timeline and deliverables
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
              Funding source or grant opportunity (if applicable)
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${siteConfig.email}?subject=Collaboration Proposal`}>
              <Send className="size-4" />
              Send Proposal
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact Information
            </ButtonLink>
          </div>
        </section>
      </FadeIn>

    </div>
  );
}
