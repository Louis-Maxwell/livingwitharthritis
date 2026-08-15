import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, Sparkles, Apple, Activity } from "lucide-react";

/**
 * ColourMosaic
 *
 * A dense, magazine-style bento mosaic inspired by Dogs Trust + KFC's confident
 * colour blocking. Mixes 8 photographs with 4 colour-tile callouts in a single
 * editorial composition. Photo-heavy, joyful, scrollable.
 *
 * All photos are Creative Commons (Wikimedia / Openverse) — already in /public.
 * Colours use semantic tokens (primary crimson, gold, sky, coral, emerald).
 */

type Tile =
  | {
      kind: "photo";
      src: string;
      alt: string;
      caption?: string;
      span: string; // tailwind grid-span classes
    }
  | {
      kind: "colour";
      bg: string; // background utility (semantic token)
      fg: string; // text utility
      icon: React.ComponentType<{ className?: string }>;
      eyebrow: string;
      title: string;
      to: string;
      span: string;
    };

const TILES: Tile[] = [
  {
    kind: "photo",
    src: "/openverse/wellness-02-tai-chi-young-and-old.webp",
    alt: "Older and younger person practising tai chi together outdoors",
    caption: "Movement that meets you where you are",
    span: "col-span-2 row-span-2",
  },
  {
    kind: "colour",
    bg: "bg-primary",
    fg: "text-primary-foreground",
    icon: Heart,
    eyebrow: "Free for everyone",
    title: "Virtual physio, no waiting list",
    to: "/services",
    span: "col-span-2 row-span-1",
  },
  {
    kind: "photo",
    src: "/openverse/nutrition-03-colorful-assortment-of-fresh-fruits-arranged-in-a-.webp",
    alt: "Colourful arrangement of fresh fruit",
    span: "col-span-1 row-span-1",
  },
  {
    kind: "photo",
    src: "/openverse/community-08-physical-therapy-teaching-lab-at-cu-anschutz-octob.webp",
    alt: "Physiotherapist guiding a patient through gentle exercises",
    span: "col-span-1 row-span-1",
  },
  {
    kind: "colour",
    bg: "bg-[hsl(var(--gold))]",
    fg: "text-[hsl(var(--gold-foreground))]",
    icon: Apple,
    eyebrow: "Eat well",
    title: "Anti-inflammatory recipes",
    to: "/diet",
    span: "col-span-1 row-span-1",
  },
  {
    kind: "photo",
    src: "/openverse/wellness-04-a-woman-supporting-herself-with-a-walking-frame.webp",
    alt: "A woman walking confidently with the support of a frame",
    span: "col-span-1 row-span-2",
  },
  {
    kind: "photo",
    src: "/openverse/nutrition-11-bowl-of-fresh-fruit-unsplash.webp",
    alt: "A bright bowl of fresh seasonal fruit",
    span: "col-span-1 row-span-1",
  },
  {
    kind: "colour",
    bg: "bg-[hsl(var(--sky))]",
    fg: "text-primary-foreground",
    icon: Activity,
    eyebrow: "In a flare?",
    title: "Self-help in 2 minutes",
    to: "/self-help",
    span: "col-span-1 row-span-1",
  },
  {
    kind: "photo",
    src: "/openverse/community-12-physical-therapy-session-aboard-the-uss-george-was.webp",
    alt: "Group physiotherapy session in a community setting",
    caption: "Real people, real progress",
    span: "col-span-2 row-span-1",
  },
  {
    kind: "colour",
    bg: "bg-[hsl(var(--coral))]",
    fg: "text-primary-foreground",
    icon: Sparkles,
    eyebrow: "Ask anything",
    title: "help chat, clinician-checked",
    to: "/chat",
    span: "col-span-1 row-span-1",
  },
  {
    kind: "photo",
    src: "/openverse/wellness-01-upward-facing-dog-pose.webp",
    alt: "Person in a gentle upward-facing yoga pose",
    span: "col-span-1 row-span-1",
  },
];

const ColourMosaic = memo(() => {
  return (
    <section
      aria-labelledby="mosaic-heading"
      className="relative overflow-hidden bg-[hsl(var(--warm))] py-20 lg:py-28"
    >
      {/* Soft mesh backdrop for warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "var(--gradient-mesh)" }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
        {/* Header — KFC confident, Dogs Trust friendly */}
        <div className="mb-10 lg:mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              A day with us
            </span>
            <h2
              id="mosaic-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.05]"
            >
              Bright food. Gentle movement.{" "}
              <span className="text-primary">Real support.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              A snapshot of what living well with arthritis looks like — colourful
              meals, joint-safe movement, and a warm community. All free, all UK.
            </p>
          </div>
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 self-start lg:self-auto rounded-full bg-foreground text-background px-5 py-3 text-sm font-semibold hover:bg-primary transition-colors"
          >
            See the full gallery
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Bento mosaic — 4 cols × auto-rows on desktop, 2 cols on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[140px] sm:auto-rows-[170px] lg:auto-rows-[200px] gap-3 sm:gap-4">
          {TILES.map((tile, i) =>
            tile.kind === "photo" ? (
              <figure
                key={i}
                className={`${tile.span} relative overflow-hidden rounded-2xl bg-muted shadow-medium group`}
              >
                <img
                  src={tile.src}
                  alt={tile.alt}
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                {tile.caption && (
                  <>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-primary/65 via-primary/10 to-transparent"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 text-primary-foreground font-display text-base lg:text-lg font-semibold leading-snug">
                      {tile.caption}
                    </figcaption>
                  </>
                )}
              </figure>
            ) : (
              <Link
                key={i}
                to={tile.to}
                className={`${tile.span} ${tile.bg} ${tile.fg} relative overflow-hidden rounded-2xl p-5 lg:p-6 flex flex-col justify-between shadow-medium hover:shadow-large hover:-translate-y-0.5 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm">
                    <tile.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 opacity-70 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-85 mb-1.5">
                    {tile.eyebrow}
                  </p>
                  <p className="font-display text-lg lg:text-xl font-bold leading-tight">
                    {tile.title}
                  </p>
                </div>
              </Link>
            )
          )}
        </div>

        {/* Footnote — credibility */}
        <p className="mt-8 text-xs text-muted-foreground text-center lg:text-left">
          Photography licensed under Creative Commons via Wikimedia Commons.{" "}
          <Link to="/credits" className="underline underline-offset-2 hover:text-foreground">
            See full credits
          </Link>
          .
        </p>
      </div>
    </section>
  );
});

ColourMosaic.displayName = "ColourMosaic";
export default ColourMosaic;
