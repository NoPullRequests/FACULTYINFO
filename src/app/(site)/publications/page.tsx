import { FadeIn } from "@/components/ui/fade-in";
import { PublicationsList } from "@/components/sections/publications-list";
import {
  getPublicationTotalCount,
  getPublications,
} from "@/lib/content";

export default async function PublicationsPage() {
  const [publications, totalCount] = await Promise.all([
    getPublications(),
    getPublicationTotalCount(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Publications</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Peer-reviewed journal articles, conference papers, and book chapters.
            Search or filter by year and type.
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={100} direction="up">
        <div className="mt-10">
          <PublicationsList
            publications={publications}
            totalCount={totalCount}
          />
        </div>
      </FadeIn>
    </div>
  );
}
