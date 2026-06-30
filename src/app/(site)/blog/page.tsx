import { PenLine, Calendar, ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";

// Placeholder posts — replace with actual blog when ready
const posts = [
  {
    id: "coming-soon-1",
    title: "Research Notes and Insights",
    excerpt: "Upcoming posts will cover research methodologies, paper walkthroughs, and lessons from ongoing projects.",
    date: "Coming Soon",
    category: "Research",
  },
  {
    id: "coming-soon-2",
    title: "Conference and Workshop Reports",
    excerpt: "Summaries and takeaways from academic conferences, including CVPR, NeurIPS, ICML, and regional events.",
    date: "Coming Soon",
    category: "Travel",
  },
  {
    id: "coming-soon-3",
    title: "Teaching Reflections",
    excerpt: "Thoughts on pedagogy, course design, and student mentorship in AI/ML education.",
    date: "Coming Soon",
    category: "Teaching",
  },
];

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
                Research notes, conference reports, and insights from the lab.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Post grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <FadeIn key={post.id} delay={80 + i * 80} direction="up">
            <article className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-md">
              {/* Category badge */}
              <div className="absolute right-4 top-4 z-10">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              {/* Placeholder image */}
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
                <PenLine className="size-12 text-primary/30" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="size-3.5" />
                  {post.date}
                </div>
                <h2 className="mt-3 text-lg font-semibold transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <p className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Read more <ArrowRight className="size-3.5" />
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>

      {/* Coming soon notice */}
      <FadeIn delay={300} direction="up">
        <div className="mt-12 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <h2 className="text-lg font-semibold">Blog Posts Coming Soon</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This section will be updated with research notes, conference reports, and teaching insights.
            Check back for new content or follow me on social media for updates.
          </p>
        </div>
      </FadeIn>

    </div>
  );
}
