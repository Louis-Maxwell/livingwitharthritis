import { memo } from "react";
import { unsplashSrcSet, defaultSizes } from "@/data/images";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import joanPeterImg from "@/assets/faces-joan-peter.jpg";

interface Face {
  image: string;
  alt: string;
  name: string;
  caption: string;
}

const FACES: Face[] = [
  {
    image: "/openverse/hero-friends-800.webp",
    alt: "Older woman smiling outdoors in a garden",
    name: "Knee osteoarthritis",
    caption: "Walks her dog every morning — gentle daily movement keeps the knees moving.",
  },
  {
    image: "/openverse/cover-0108-old-runner-a3.webp",
    alt: "Senior man preparing fresh Mediterranean food in a sunlit kitchen",
    name: "Mediterranean-style meals",
    caption: "Switched to a Mediterranean plate — olive oil, oily fish, plenty of greens.",
  },
  {
    image: joanPeterImg,
    alt: "Elderly couple stretching together in a bright living room",
    name: "A short stretch together",
    caption: "Ten minutes of stretching together — the only routine they've ever kept.",
  },
];

const FacesStrip = memo(() => {
  const ref = useRevealOnScroll<HTMLDivElement>();

  return (
    <section
      aria-labelledby="faces-strip-heading"
      className="bg-background py-20 lg:py-28 border-b border-border/40"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl">
        <div className="max-w-3xl mb-14">
          <h2
            id="faces-strip-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-foreground"
          >
            The plan is for people living with arthritis.
          </h2>
        </div>

        <div
          ref={ref}
          className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {FACES.map((f) => (
            <figure
              key={f.name}
              className="reveal-item group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover-lift-crimson"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={f.image}
                  srcSet={f.image.startsWith("http") ? unsplashSrcSet(f.image, [400, 640, 800]) : undefined}
                  sizes={f.image.startsWith("http") ? defaultSizes : undefined}
                  alt={f.alt}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform [transition-duration:1400ms] ease-out group-hover:scale-105"
                  referrerPolicy={f.image.startsWith("http") ? "no-referrer" : undefined}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent"
                  aria-hidden="true"
                />
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                <p className="font-display text-xl lg:text-2xl font-bold text-primary-foreground leading-tight">
                  {f.name}
                </p>
                <p className="mt-2 text-sm text-primary-foreground leading-relaxed">
                  {f.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
});

FacesStrip.displayName = "FacesStrip";
export default FacesStrip;
