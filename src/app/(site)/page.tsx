import Link from "next/link";
import { Calendar } from "lucide-react";

import { PublicationCard } from "@/components/cards/publication-card";
import { SectionHeader } from "@/components/layout/section-header";
import { Hero } from "@/components/sections/hero";
import { Statistics } from "@/components/sections/statistics";
import { FadeIn } from "@/components/ui/fade-in";
import { getFeaturedPublications, getNews, getSiteContent } from "@/lib/content";

export default async function HomePage() {
  const { researchInterests } = await getSiteContent();
  const [featured, news] = await Promise.all([
    getFeaturedPublications(),
    getNews(),
  ]);
  const latestNews = news.slice(0, 3);

  return (
    <>
      <Hero />
      <Statistics />

      {/* Latest News */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            title="Latest News"
            description="Recent updates and announcements."
            href="/news"
            linkLabel="View all news"
          />
        </FadeIn>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {latestNews.map((item, i) => (
            <FadeIn key={item.id} delay={60 + i * 60} direction="up">
              <Link
                href="/news"
                className="group block rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="size-3" />
                  {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </div>
                <h3 className="mt-3 font-semibold leading-snug transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <span className="mt-2 inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {item.category}
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Research Interests */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            title="Research Interests"
            description="Core areas of ongoing investigation."
            href="/research"
            linkLabel="View research"
          />
        </FadeIn>
        <div className="mt-6 flex flex-wrap gap-2">
          {researchInterests.map((interest, i) => (
            <FadeIn key={interest} delay={i * 60} direction="up" threshold={0.05}>
              <Link
                href="/research"
                className="rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/8 hover:text-primary"
              >
                {interest}
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Featured Publications */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            title="Featured Publications"
            description="Selected journal articles and conference papers."
            href="/publications"
            linkLabel="View all publications"
          />
        </FadeIn>
        <div className="mt-6 space-y-4">
          {featured.map((pub) => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
        </div>
      </section>
    </>
  );
}
