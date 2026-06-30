import Link from "next/link";

import { PublicationCard } from "@/components/cards/publication-card";
import { SectionHeader } from "@/components/layout/section-header";
import { Hero } from "@/components/sections/hero";
import { Statistics } from "@/components/sections/statistics";
import { FadeIn } from "@/components/ui/fade-in";
import { getFeaturedPublications, getSiteContent } from "@/lib/content";

export default async function HomePage() {
  const { researchInterests } = await getSiteContent();
  const featured = await getFeaturedPublications();

  return (
    <>
      <Hero />
      <Statistics />

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
          {featured.map((pub, i) => (
            <FadeIn key={pub.id} delay={i * 80} direction="up" threshold={0.05}>
              <PublicationCard publication={pub} />
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
