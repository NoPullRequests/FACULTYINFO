import type { Metadata } from "next";
import { PenLine, Calendar, ArrowRight, Tag } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Blog",
  description: "Research updates, awards, events, and news from Dr. Prasenjit Dey's lab at NIT Rourkela.",
};

const posts = [
  {
    id: "cmpdi-award-2025",
    title: "Certificate of Achievement at CMPDI Hackathon on R&D 2025",
    excerpt:
      "Dr. Prasenjit Dey received the Certificate of Achievement from the Central Mine Planning and Design Institute (CMPDI), Ministry of Coal, Government of India — awarded at the Star Rating Awards Ceremony for Coal & Lignite Mines in Mumbai, presented by Union Minister Shri G. Kishan Reddy.",
    date: "2025-09-04",
    category: "Award",
    body: [
      "At the Hackathon on R&D 2025, held as part of the Star Rating Awards Ceremony for Coal & Lignite Mines in Mumbai on 4 September 2025, Dr. Prasenjit Dey was awarded the Certificate of Achievement by the Central Mine Planning and Design Institute (CMPDI), Ministry of Coal, Government of India.",
      "The award was presented by Union Minister of Coal and Mines, Shri G. Kishan Reddy, in the presence of Minister of State, Shri Satish Chandra Dubey. The recognition was conferred for Dr. Dey's conceptual solution on PS-2, as part of the awards celebrating excellence in safety and environmental sustainability in India's coal and mining sector.",
      "Dr. Dey secured the 2nd Runner-Up position at the hackathon, competing alongside participants from institutions across the country. This recognition highlights the growing relevance of AI and machine learning techniques in solving real-world industrial challenges.",
    ],
  },
  {
    id: "digital-literacy-workshop-2026",
    title: "Five-Day Workshop on Digital Literacy for School Teachers — Women Empowerment Initiative",
    excerpt:
      "A five-day workshop on 'Enhancing Digital Literacy of School Teachers towards Women Empowerment' was inaugurated at NIT Rourkela on 25 May 2026, jointly organized by the Department of CSE and Rotary Club of Rourkela Steel City. Prof. Prasenjit Dey served as Guest of Honour and Co-Convenor.",
    date: "2026-05-25",
    category: "Event",
    body: [
      "A five-day workshop titled 'Enhancing Digital Literacy of School Teachers towards Women Empowerment' was inaugurated on 25 May 2026 at the Department of Computer Science and Engineering, National Institute of Technology Rourkela.",
      "The programme was jointly organized by the Department of CSE, NIT Rourkela, and the Rotary Club of Rourkela Steel City (RID 3261), with the objective of equipping school teachers with essential digital and computer literacy skills required in modern education. The workshop ran until 29 May 2026.",
      "The inaugural ceremony was presided over by the Head of the Department, Prof. Bibhudutta Sahoo. Prof. Prasenjit Dey joined as the Guest of Honour and Co-Convenor, alongside Prof. Rtn Suchismita Chinara as Convenor.",
      "Ten teachers from various educational institutions across Rourkela participated in the workshop, covering classroom teaching tools, project preparation, record maintenance, presentation skills, and modern educational technology. Faculty members, PhD scholars, and M.Tech students from the department served as resource persons.",
    ],
  },
  {
    id: "drdo-project-microgrid-2024",
    title: "New DRDO-Funded Research Project on ML-Based Naval Microgrid Management",
    excerpt:
      "Dr. Prasenjit Dey is Co-Investigator on a 36-month DRDO-funded project on prototyping machine learning-based solar and wind forecasting approaches and intelligent power management for hybrid storage systems in on-board naval microgrids.",
    date: "2024-02-10",
    category: "Grant",
    body: [
      "A new research project funded by the Defence Research and Development Organisation (DRDO) has been initiated, focusing on the application of machine learning in the context of naval energy systems.",
      "The project, titled 'Prototyping of ML-Based Solar & Wind Forecasting Approach and Intelligent Power Management Scheme for Hybrid Storages in On-Board Naval Microgrid', is a 36-month sponsored research effort in which Dr. Prasenjit Dey is serving as Co-Investigator.",
      "The project addresses a practical defence challenge — managing renewable energy sources and hybrid storage systems aboard naval vessels. By applying ML-based forecasting models for solar and wind generation, the research aims to build intelligent power allocation systems that can operate reliably in dynamic, resource-constrained environments.",
      "This project adds to the lab's growing portfolio of work at the intersection of machine learning and real-world engineering applications, complementing existing research in IoT-based systems and deep learning.",
    ],
  },
];

const categoryColors: Record<string, string> = {
  Award:   "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Event:   "bg-pink-500/10 text-pink-700 dark:text-pink-400",
  Grant:   "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  General: "bg-muted text-muted-foreground",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="border-b border-border pb-8">
          <div className="flex items-center gap-3">
            <PenLine className="size-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
              <p className="mt-1 text-muted-foreground">
                Research updates, awards, events, and news from the lab.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="mt-12 space-y-8">
        {posts.map((post, i) => (
          <FadeIn key={post.id} delay={80 + i * 80} direction="up">
            <article className="rounded-xl border border-border bg-card overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-md">
              <div className="p-6 sm:p-8">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryColors[post.category] ?? categoryColors.General}`}>
                    <Tag className="size-3" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    {formatDate(post.date)}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl leading-snug">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Body paragraphs */}
                <div className="mt-6 space-y-4 border-t border-border pt-6">
                  {post.body.map((para, j) => (
                    <p key={j} className="text-sm leading-relaxed text-foreground/80">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
