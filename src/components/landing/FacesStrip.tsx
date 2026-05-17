import { memo } from "react";
import { unsplashSrcSet, defaultSizes } from "@/data/images";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

interface Face {
  image: string;
  alt: string;
  name: string;
  caption: string;
}

const FACES: Face[] = [
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    alt: "Older woman smiling outdoors in a garden",
    name: "Margaret, 68",
    caption: "Walks her dog every morning — gentle daily movement keeps the knees moving.",
  },
  {
    image: "https://images.unsplash.com/photo-1559963110-71b394e7494d?w=800&q=80",
    alt: "Senior man preparing fresh Mediterranean food in a sunlit kitchen",
    name: "Ronald, 72",
    caption: "Switched to a Mediterranean plate — olive oil, oily fish, plenty of greens.",
  },
  {
    image: "https://images.unsplash.com/photo-1581579438747-104c53e7c711?w=800&q=80",
    alt: "Elderly couple stretching together in a bright living room",
    name: "Joan & Peter, 70",
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
          <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-primary mb-4">
            Real People · Real Routines
          </p>
          <h2
            id="faces-strip-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-foreground"
          >
            The plan is for people like{" "}
            <span className="italic text-primary">Margaret, Ronald and Joan</span>.
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
                  srcSet={unsplashSrcSet(f.image, [400, 640, 800])}
                  sizes={defaultSizes}
                  alt={f.alt}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
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
                <p className="mt-2 text-sm text-primary-foreground/85 leading-relaxed">
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
