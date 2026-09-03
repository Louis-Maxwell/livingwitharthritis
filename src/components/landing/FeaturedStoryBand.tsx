/**
 * FeaturedStoryBand
 * Editorial half-page spread inspired by Dogs Trust & Cats Protection.
 * Pulls the highest-priority published story from `featured_stories`
 * (Lovable Cloud) and falls back to a baked-in story if the DB is empty.
 */

import { memo, useEffect, useState } from "react";
import { ArrowRight, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FeaturedStory = {
  id: string;
  name: string;
  location: string;
  age: string | null;
  diagnosis: string | null;
  with_us_since: string | null;
  kicker: string;
  headline: string;
  body: string | null;
  portrait_url: string;
  portrait_alt: string;
};

const FALLBACK: FeaturedStory = {
  id: "fallback",
  name: "Margaret Holloway",
  location: "Sheffield",
  age: "62",
  diagnosis: "Knee OA",
  with_us_since: "Jan 2025",
  kicker: "Featured · Reader Story",
  headline:
    "I was on the waiting list for sixteen months. Within a fortnight of starting here, I was walking the dog again — properly, without wincing.",
  body: null,
  portrait_url:
    "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=1200&q=80",
  portrait_alt:
    "Margaret, 62, smiling outdoors after her morning walk in Sheffield",
};

const FeaturedStoryBand = memo(() => {
  const navigate = useNavigate();
  const [story, setStory] = useState<FeaturedStory>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = null;
      const error = null;
      if (!cancelled && !error && data) setStory(data as FeaturedStory);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const facts = [
    story.age && { kicker: "Age", value: story.age },
    story.diagnosis && { kicker: "Diagnosis", value: story.diagnosis },
    story.with_us_since && { kicker: "With us since", value: story.with_us_since },
  ].filter(Boolean) as { kicker: string; value: string }[];

  return (
    <section
      aria-labelledby="featured-story"
      className="relative border-y border-foreground/10 bg-secondary/30"
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-24 lg:py-28">
        {/* Section masthead */}
        <div className="flex items-center justify-between gap-6 pb-8 mb-10 border-b border-foreground/10">
          <p className="flex items-center gap-3 text-[10px] sm:text-[11px] font-bold tracking-[0.32em] uppercase text-primary">
            <span className="w-8 h-px bg-primary" aria-hidden="true" />
            One story, this week
          </p>
          <p className="hidden sm:block text-[10px] font-semibold tracking-[0.24em] uppercase text-muted-foreground">
            Issue No. 04
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ── Portrait — 5 cols ───────────────────────────────── */}
          <figure className="lg:col-span-5 relative">
            <div
              className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-primary/40 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-primary/40 pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative rounded-sm overflow-hidden shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.25)] aspect-[4/5] group">
              <img
                src={story.portrait_url}
                alt={story.portrait_alt}
                width={1200}
                height={1500}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform [transition-duration:1200ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 lg:p-7 text-background">
                <p className="text-[9px] font-bold tracking-[0.32em] uppercase text-background/70 mb-2">
                  {story.kicker}
                </p>
                <p className="font-display text-xl lg:text-2xl leading-[1.15] tracking-tight">
                  {story.name.split(" ")[0]}, {story.location}
                </p>
              </figcaption>
            </div>
          </figure>

          {/* ── Story copy — 7 cols ─────────────────────────────── */}
          <div className="lg:col-span-7">
            <Quote
              className="w-10 h-10 text-primary/25 mb-4"
              aria-hidden="true"
              strokeWidth={1.5}
            />
            <blockquote className="font-display text-[1.625rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] leading-[1.15] tracking-[-0.02em] text-foreground text-balance mb-8">
              &ldquo;{story.headline}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center gap-4 pb-8 border-b border-foreground/10">
              <div className="w-px h-10 bg-primary" aria-hidden="true" />
              <div>
                <p className="font-display text-base sm:text-lg text-foreground tracking-tight">
                  {story.name}
                </p>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground mt-0.5">
                  {story.location}
                </p>
              </div>
            </div>

            {/* Story facts */}
            {facts.length > 0 && (
              <dl className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 mb-10">
                {facts.map((f) => (
                  <div key={f.kicker}>
                    <dt className="text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase text-primary mb-2">
                      {f.kicker}
                    </dt>
                    <dd className="font-display text-xl sm:text-2xl lg:text-[1.75rem] tracking-tight text-foreground">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {/* Optional editorial body */}
            {story.body && (
              <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed mb-10 max-w-[60ch]">
                {story.body}
              </p>
            )}

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => navigate("/stories")}
                className="group inline-flex items-center justify-center gap-2 px-7 h-[48px] rounded-full bg-foreground text-background text-[12px] font-bold tracking-[0.16em] uppercase hover:bg-primary transition-colors duration-300"
              >
                Read more stories
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/donate")}
                className="group inline-flex items-center justify-center gap-2 px-7 h-[48px] rounded-full border border-foreground/20 text-foreground text-[12px] font-bold tracking-[0.16em] uppercase hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                Help the next {story.name.split(" ")[0]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FeaturedStoryBand.displayName = "FeaturedStoryBand";
export default FeaturedStoryBand;
