import { memo } from "react";
import { Link } from "react-router-dom";
import { openverseImages } from "@/data/openverseImages";

// Curated 6 images — one or two from each theme — for landing-page decorative strip
const PICKS = [
  "/openverse/wellness-02-tai-chi-young-and-old.webp",
  "/openverse/nutrition-03-colorful-assortment-of-fresh-fruits-arranged-in-a-.webp",
  "/openverse/community-08-physical-therapy-teaching-lab-at-cu-anschutz-octob.webp",
  "/openverse/wellness-04-a-woman-supporting-herself-with-a-walking-frame.webp",
  "/openverse/nutrition-11-bowl-of-fresh-fruit-unsplash.webp",
  "/openverse/community-12-physical-therapy-session-aboard-the-uss-george-was.webp",
];

const lookup = new Map(openverseImages.map((i) => [i.localPath, i]));

const GalleryStrip = memo(() => {
  const items = PICKS.map((p) => lookup.get(p)).filter((i): i is NonNullable<typeof i> => Boolean(i));
  if (items.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-muted/20 border-y border-border/20" aria-label="Visual library">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-2">Visual library</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Open, evidence-based imagery
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mt-2 leading-relaxed">
              We use only Creative Commons and public-domain photographs — fully credited and free for everyone.
            </p>
          </div>
          <div className="flex gap-3 text-sm">
            <Link
              to="/gallery"
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Browse 50 images
            </Link>
            <Link
              to="/credits"
              className="px-4 py-2 rounded-full border border-border text-foreground/70 hover:text-foreground hover:border-primary/40 transition-colors"
            >
              Credits
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {items.map((img) => (
            <Link
              key={img.localPath}
              to="/gallery"
              className="aspect-square overflow-hidden rounded-lg bg-muted block group"
              title={`${img.title} — ${img.creator} (${img.license})`}
            >
              <img
                src={img.localPath}
                alt={img.title}
                width={400}
                height={400}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

GalleryStrip.displayName = "GalleryStrip";
export default GalleryStrip;
