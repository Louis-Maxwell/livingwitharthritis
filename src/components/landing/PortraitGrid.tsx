import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { unsplashSrcSet, defaultSizes } from "@/data/images";
import { useFaceStories, useFacesTrustFacts } from "@/hooks/useFacesOfArthritis";

/**
 * PortraitGrid — "The Faces of Arthritis"
 *
 * Editorial gallery section. Renders one feature story alongside supporting
 * cards plus a trust-fact strip. All content is loaded from the backend
 * (face_stories + faces_trust_facts) so it can be edited without a deploy.
 */
const PortraitGrid = memo(() => {
  const { data: stories } = useFaceStories();
  const { data: facts } = useFacesTrustFacts();

  if (!stories || stories.length === 0) return null;

  const feature = stories.find((s) => s.is_feature) ?? stories[0];
  const rest = stories.filter((s) => s.id !== feature.id).slice(0, 3);

  return (
    <section
      id="faces-of-arthritis"
      aria-labelledby="portrait-grid-heading"
      className="py-20 sm:py-24 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12 lg:mb-16 items-end">
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              The faces of arthritis
            </span>
            <h2
              id="portrait-grid-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight mt-3"
            >
              Behind every UK statistic, a person — and a story worth telling.
            </h2>
          </div>
          <p className="lg:col-span-5 text-base text-muted-foreground leading-relaxed">
            These are anonymised, composite story themes drawn from helpline calls,
            community posts and patient feedback across England, Scotland and Wales.
            Real lives. Real progress. No paywalls.
          </p>
        </div>

        {/* Trust facts strip */}
        {facts && facts.length > 0 && (
          <dl
            aria-label="UK arthritis facts"
            className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-12 lg:mb-16 bg-border/40 rounded-xl overflow-hidden border border-border/40"
          >
            {facts.map((f) => (
              <div key={f.id} className="bg-background p-5 sm:p-6 flex flex-col gap-1">
                <dt className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="font-display text-3xl sm:text-4xl font-bold text-foreground tabular-nums leading-none">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {/* Editorial gallery: 1 feature + supporting cards */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Feature story */}
          <article
            id={feature.id}
            className="lg:col-span-7 group relative overflow-hidden rounded-2xl bg-secondary aspect-[4/5] sm:aspect-[16/11] lg:aspect-[5/6]"
          >
            <img
              src={feature.image_url}
              srcSet={unsplashSrcSet(feature.image_url, [600, 900, 1200, 1600])}
              sizes="(min-width: 1024px) 58vw, 100vw"
              alt={feature.alt_text}
              width={1200}
              height={1440}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/55 to-foreground/10"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10 text-background">
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-background/80">
                {feature.eyebrow}
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight max-w-2xl">
                “{feature.title}”
              </h3>
              <blockquote className="mt-4 max-w-xl text-sm sm:text-base text-background/85 leading-relaxed border-l-2 border-primary/70 pl-4 italic">
                {feature.quote}
              </blockquote>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-background/80">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {feature.region}
                </span>
                <span>Age {feature.age_band}</span>
                <span>{feature.condition}</span>
                <span className="text-background/60">· {feature.attribution}</span>
              </div>
              <Link
                to={feature.cta_href}
                aria-label={`${feature.cta_label} — ${feature.eyebrow}`}
                className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {feature.cta_label}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* Supporting stories */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-6">
            {rest.map((story) => (
              <article
                key={story.id}
                id={story.id}
                className="group relative overflow-hidden rounded-2xl bg-secondary aspect-[4/5] lg:aspect-[16/11]"
              >
                <img
                  src={story.image_url}
                  srcSet={unsplashSrcSet(story.image_url, [400, 640, 900, 1200])}
                  sizes={defaultSizes}
                  alt={story.alt_text}
                  width={900}
                  height={720}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/55 to-transparent"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6 text-background">
                  <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-background/80">
                    {story.eyebrow}
                  </span>
                  <h3 className="mt-2 font-display text-lg sm:text-xl font-bold leading-snug">
                    “{story.title}”
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-background/75">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" aria-hidden="true" /> {story.region}
                    </span>
                    <span>Age {story.age_band}</span>
                  </div>
                  <Link
                    to={story.cta_href}
                    aria-label={`${story.cta_label} — ${story.eyebrow}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-background group-hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                  >
                    {story.cta_label}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* View all stories — terminal-block prevention */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border/30 pt-8">
          <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
            Stories are anonymised composites built from helpline themes, community
            posts and patient feedback. No identifying details are used. Imagery is
            editorial and does not depict the individuals described.
          </p>
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 self-start sm:self-auto shrink-0"
          >
            View all UK stories
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
});

PortraitGrid.displayName = "PortraitGrid";
export default PortraitGrid;
