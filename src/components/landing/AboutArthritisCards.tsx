/**
 * AboutArthritisCards — 3 photo cards inspired by the AF "About Arthritis"
 * row. Warm documentary imagery, Playfair titles, crimson "Learn more" link.
 */
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { defaultSizes, unsplashSrcSet } from "@/data/images";

const CARDS = [
  {
    eyebrow: "Connection",
    title: "Community & support",
    body: "Talk with people who get it. A kind, judgement-free space to share experience and small wins.",
    href: "/community",
    image:
      "/openverse/community-02-wolf-creek-nfh-2022-13th-annual-catch-a-smile-seni.webp",
    alt: "Group of older adults talking and laughing together in warm afternoon light.",
  },
  {
    eyebrow: "Guidance",
    title: "Plain-English answers",
    body: "Clinically-reviewed advice on flare-ups, diet and movement — written like a friend, not a textbook.",
    href: "/blog-hub",
    image:
      "/openverse/nutrition-02-healthy-meal-planning-with-fresh-fruits-and-vegeta.webp",
    alt: "Person reading an arthritis self-help guide on a tablet at a sunlit kitchen table.",
  },
  {
    eyebrow: "Evidence",
    title: "Rooted in research",
    body: "Every page references the science behind it — NICE, peer-reviewed studies and HCPC clinicians.",
    href: "/about",
    image:
      "/openverse/community-09-us-navy-100306-n-5319a-020-occupational-therapist-.webp",
    alt: "Clinician in a consultation room reviewing notes with a patient.",
  },
];

const AboutArthritisCards = () => {
  return (
    <section
      aria-labelledby="about-arthritis-heading"
      className="bg-background py-24 lg:py-32"
    >
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-16">
        <div className="max-w-2xl mb-14 lg:mb-20">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
            About arthritis
          </p>
          <h2
            id="about-arthritis-heading"
            className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance"
          >
            Together, we are champions of yes.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            We exist so no-one in the UK has to face arthritis alone. Three ways
            we're here for you, every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CARDS.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className="group block rounded-2xl bg-card border border-border/60 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={card.image}
                  srcSet={unsplashSrcSet(card.image) || undefined}
                  sizes={defaultSizes}
                  alt={card.alt}
                  width={1080}
                  height={810}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-3">
                  {card.eyebrow}
                </p>
                <h3 className="font-display text-2xl font-bold tracking-tight text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-5">
                  {card.body}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Read {card.title}
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutArthritisCards;
