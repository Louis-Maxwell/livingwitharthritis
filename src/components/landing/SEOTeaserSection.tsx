/**
 * SEOTeaserSection
 *
 * Three condensed teaser cards on the homepage that link out to the
 * full ~500-word SEO content sections embedded on inner pages
 * (Exercise Hub, Arthritis Flare-Ups, Self-Help Tool).
 *
 * Editorial voice. UK English. No images.
 */

import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface TeaserCard {
  tag: string;
  title: string;
  teaser: string;
  href: string;
}

const CARDS: TeaserCard[] = [
  {
    tag: "Movement",
    title: "Chair-based movement for older adults",
    teaser:
      "Short, accessible chair routines meet people where they are — removing the intimidation of long gym sessions while reducing falls and supporting heart health.",
    href: "/exercises",
  },
  {
    tag: "UK benefits",
    title: "PIP, Blue Badge and waiting-list help",
    teaser:
      "Plain-English UK guides on PIP, Adult Disability Payment in Scotland, Blue Badge, and what to do while you wait for rheumatology or physiotherapy.",
    href: "/guides/benefits-pip",
  },
  {
    tag: "NHS waits",
    title: "Help while you wait for an appointment",
    teaser:
      "Pacing, gentle strengthening, physiotherapy self-referral where it is available, and when to go back to your GP if symptoms worsen.",
    href: "/arthritis-waiting-list-help",
  },
];

const SEOTeaserSection = memo(() => {
  return (
    <section
      aria-labelledby="seo-teaser-heading"
      className="py-20 sm:py-24 bg-background border-t border-border"
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="flex items-center gap-3 text-[10px] sm:text-[11px] font-bold tracking-[0.32em] uppercase text-primary mb-6">
            <span className="w-8 h-px bg-primary" aria-hidden="true" />
            Read further
          </p>
          <h2
            id="seo-teaser-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-foreground text-balance"
          >
            Go deeper on the topics that matter
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl">
            Plain-English guides on movement, UK benefits and NHS waiting lists.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-7 md:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.href}
              className="group flex flex-col rounded-2xl bg-card ring-1 ring-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-6 sm:p-7"
            >
              <span className="text-xs font-semibold text-primary bg-primary/5 px-3 py-1 rounded-full w-fit">
                {card.tag}
              </span>
              <h3 className="font-display text-xl sm:text-2xl leading-snug tracking-tight text-foreground mt-4">
                <Link
                  to={card.href}
                  className="hover:text-primary transition-colors focus:outline-none focus:underline"
                >
                  {card.title}
                </Link>
              </h3>
              <p className="text-muted-foreground mt-3 text-sm sm:text-base flex-1">
                {card.teaser}
              </p>
              <Link
                to={card.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all focus:outline-none focus:underline"
              >
                Read the full guide
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

SEOTeaserSection.displayName = "SEOTeaserSection";
export default SEOTeaserSection;
