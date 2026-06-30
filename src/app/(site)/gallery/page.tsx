import { Camera, Image as ImageIcon } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";

// Placeholder gallery structure — replace with real images later
const galleryCategories = [
  {
    id: "lab",
    title: "Lab & Research",
    description: "Research setup, equipment, and team workspace",
    imageCount: 0,
  },
  {
    id: "conferences",
    title: "Conferences & Workshops",
    description: "Academic events, presentations, and networking",
    imageCount: 0,
  },
  {
    id: "teaching",
    title: "Teaching & Mentorship",
    description: "Classroom sessions, student projects, and lab demonstrations",
    imageCount: 0,
  },
  {
    id: "events",
    title: "Events & Outreach",
    description: "Guest lectures, seminars, and community engagement",
    imageCount: 0,
  },
];

export default function GalleryPage() {
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

      {/* Gallery categories */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {galleryCategories.map((category, i) => (
          <FadeIn key={category.id} delay={80 + i * 70} direction="up">
            <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-md">
              {/* Placeholder image area */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-muted via-muted/50 to-background">
                <ImageIcon className="size-16 text-muted-foreground/20" />
              </div>

              <div className="p-5">
                <h2 className="font-semibold transition-colors group-hover:text-primary">
                  {category.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {category.description}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {category.imageCount > 0
                    ? `${category.imageCount} photos`
                    : "Coming soon"}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Placeholder notice */}
      <FadeIn delay={360} direction="up">
        <div className="mt-12 rounded-xl border border-border bg-muted/30 p-12 text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-primary/10">
            <Camera className="size-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">Gallery Coming Soon</h2>
          <p className="mt-2 max-w-lg mx-auto text-sm text-muted-foreground leading-relaxed">
            Photos from lab activities, conferences, workshops, and teaching sessions will be added here.
            This section will showcase research milestones, team collaborations, and academic events.
          </p>
        </div>
      </FadeIn>

    </div>
  );
}
