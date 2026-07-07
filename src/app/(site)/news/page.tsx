import { Calendar, Tag, Newspaper } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { getNews } from "@/lib/content";
import newsStaticData from "@/content/news.json";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured: boolean;
};

const categoryColors: Record<string, string> = {
  Publication: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  Grant:       "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Award:       "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Opportunity: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  Event:       "bg-pink-500/10 text-pink-700 dark:text-pink-400",
  General:     "bg-muted text-muted-foreground",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function NewsPage() {
  // Try DB first, fall back to static JSON
  const dbNews = await getNews();
  const items: NewsItem[] = dbNews.length > 0
    ? dbNews
    : (newsStaticData.news as NewsItem[]);

  const featured = items.filter(n => n.featured);
  const regular  = items.filter(n => !n.featured);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="border-b border-border pb-8">
          <div className="flex items-center gap-3">
            <Newspaper className="size-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">News & Updates</h1>
              <p className="mt-1 text-muted-foreground">
                Latest publications, grants, awards, and opportunities.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {featured.length > 0 && (
        <section className="mt-12">
          <FadeIn delay={80}><h2 className="text-xl font-semibold">Featured</h2></FadeIn>
          <div className="mt-6 space-y-4">
            {featured.map((item, i) => (
              <FadeIn key={item.id} delay={120 + i * 80} direction="up">
                <article className="group rounded-xl border-2 border-primary/20 bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-lg">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryColors[item.category] ?? categoryColors.General}`}>
                      <Tag className="mr-1 inline size-3" />{item.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="size-3" />{formatDate(item.date)}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold transition-colors group-hover:text-primary">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.excerpt}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {regular.length > 0 && (
        <section className="mt-12">
          <FadeIn delay={200}><h2 className="text-xl font-semibold">Recent Updates</h2></FadeIn>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {regular.map((item, i) => (
              <FadeIn key={item.id} delay={240 + i * 70} direction="up">
                <article className="group rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${categoryColors[item.category] ?? categoryColors.General}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(item.date)}</span>
                  </div>
                  <h3 className="mt-3 font-semibold transition-colors group-hover:text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {items.length === 0 && (
        <div className="mt-16 text-center text-muted-foreground">No news yet. Check back soon.</div>
      )}
    </div>
  );
}
