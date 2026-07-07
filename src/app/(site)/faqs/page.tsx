import { HelpCircle } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/config/site";

const faqs = [
  {
    id: "phd-admission",
    question: "How can I apply for a Ph.D. position in your research group?",
    answer:
      `Send your CV, academic transcripts, statement of research interests, and 2–3 references to ${siteConfig.email}. Ensure you meet NIT Rourkela's Ph.D. admission requirements (GATE/NET qualification). Shortlisted candidates will be contacted for an interview within 1–2 weeks.`,
  },
  {
    id: "research-areas",
    question: "What research areas do you currently supervise?",
    answer:
      "My research spans Machine Learning, Deep Learning, Neural Network Robustness, Pattern Recognition, IoT applications, and Healthcare AI. Check the Research page for ongoing projects and Publications for recent work. Prospective students should align their interests with these areas.",
  },
  {
    id: "funding",
    question: "Is funding available for Ph.D. students?",
    answer:
      "Yes. Institute fellowships and project-based assistantships are available for eligible candidates. Funding typically covers a monthly stipend and contingency grant. External fellowship holders (CSIR-NET JRF, UGC, etc.) are also welcome to apply.",
  },
  {
    id: "collaboration",
    question: "Do you accept visiting researchers or collaboration proposals?",
    answer:
      "Yes, I'm open to academic collaborations with researchers and institutions. For visiting positions, internships, or joint research proposals, email me with your background, proposed timeline, and research goals. Industry collaborations are also considered on a case-by-case basis.",
  },
  {
    id: "mtech-projects",
    question: "Can M.Tech students work on projects with you?",
    answer:
      "M.Tech students from NIT Rourkela can approach me for project guidance or thesis supervision subject to availability. External M.Tech students may inquire about short-term project-based positions if funding is available through active grants.",
  },
  {
    id: "publications",
    question: "Where can I find your recent publications?",
    answer:
      "All publications are listed on the Publications page with DOI links. You can also find my work on Google Scholar, ORCID, Scopus, and ResearchGate. For full-text PDFs, check the publisher's page or contact me directly if open-access versions aren't available.",
  },
  {
    id: "response-time",
    question: "How long does it take to get a response to application emails?",
    answer:
      "I aim to respond within 1–2 weeks. During peak admission periods (May–July), response times may be longer. If you haven't heard back after 2 weeks, feel free to send a polite follow-up email.",
  },
  {
    id: "prerequisites",
    question: "What technical skills should I have before joining as a Ph.D. student?",
    answer:
      "Strong programming skills (Python, C++), familiarity with ML/DL frameworks (TensorFlow, PyTorch), solid math foundation (linear algebra, calculus, probability), and prior research experience (publications, projects, or thesis work) are highly recommended. Coursework in Machine Learning and Data Science is a plus.",
  },
];

export default function FaqsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

      <FadeIn>
        <div className="border-b border-border pb-8 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <HelpCircle className="size-8 text-primary" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-muted-foreground">
            Common questions from prospective students and collaborators.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={100} direction="up">
        <div className="mt-12">
          <Accordion items={faqs} />
        </div>
      </FadeIn>

      <FadeIn delay={180} direction="up">
        <div className="mt-12 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <ButtonLink href="/contact" className="mt-4">
            Contact Me
          </ButtonLink>
        </div>
      </FadeIn>

    </div>
  );
}
