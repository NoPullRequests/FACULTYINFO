import { Camera } from "lucide-react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { getGalleryImages } from "@/lib/content";

export default async function GalleryPage() {
  const images = await getGalleryImages();

  // Group images by category
  const grouped = images.reduce<Record<string, typeof images>>((acc, img) => {
    if (!acc[img.category]) acc[img.category] = [];
    acc[img.category].push(img);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="border-b border-border pb-8">
          <div className="flex items-center gap-3">
            <Camera className="size-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Gallery</h1>
              <p className="mt-1 text-muted-foreground">
                Lab life, conferences, teaching moments, and research milestones.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {images.length === 0 ? (
        <FadeIn delay={80} direction="up">
          <div className="mt-16 rounded-xl border border-border bg-muted/30 p-16 text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-primary/10">
              <Camera className="size-10 text-primary" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">Gallery Coming Soon</h2>
            <p className="mt-2 max-w-lg mx-auto text-sm text-muted-foreground leading-relaxed">
              Photos from lab activities, conferences, workshops, and teaching sessions will be added here.
            </p>
          </div>
        </FadeIn>
      ) : (
        <div className="mt-12 space-y-14">
          {categories.map((category, ci) => (
            <section key={category}>
              <FadeIn delay={ci * 60}>
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="h-5 w-1 rounded-full bg-primary inline-block" />
                  {category}
                  <span className="text-sm font-normal text-muted-foreground">
                    ({grouped[category].length} photo{grouped[category].length !== 1 ? "s" : ""})
                  </span>
                </h2>
              </FadeIn>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {grouped[category].map((img, i) => (
                  <FadeIn key={img.id} delay={ci * 60 + i * 50} direction="up">
                    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5">
                      <div className="relative h-72 bg-muted overflow-hidden">
                        <Image
                          src={img.imageUrl}
                          alt={img.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                        {img.description && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white text-xs leading-relaxed">{img.description}</p>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-sm line-clamp-1">{img.title}</p>
                        {img.album && (
                          <p className="text-xs text-muted-foreground mt-0.5">{img.album}</p>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
