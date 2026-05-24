/**
 * ResourcesForYouSection — alternating photo/text rows inspired by the
 * Arthritis Foundation "Resources for You" band. Each row maps to an
 * existing route, with warm documentary photography on the opposite side.
 */
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { defaultSizes, unsplashSrcSet } from "@/data/images";

const ROWS = [
  {
    eyebrow: "Talk to someone",
    title: "Reach out to our helpline",
    body:
      "Our team are here Monday to Friday — for a chat, a question or just a calm voice on the line.",
    href: "/contact",
    cta: "Contact us",
    image:
      "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?w=1080&q=80&auto=format",
    alt: "Older man in a yellow jumper on the phone at home, smiling.",
  },
  {
    eyebrow: "Practical relief",
    title: "Pain relief that really works",
    body:
      "From hot/cold therapy to gentle movement and prescription-free options — what the evidence supports.",
    href: "/arthritis-flare-ups",
    cta: "See pain-relief guide",
    image:
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1080&q=80&auto=format",
    alt: "Therapist supporting a patient's shoulder in a warm clinic.",
  },
  {
    eyebrow: "Understand it",
    title: "Osteoarthritis explained",
    body:
      "The UK's most common form of arthritis — what it is, what changes, and how to take back control.",
    href: "/conditions/osteoarthritis",
    cta: "Read the guide",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1080&q=80&auto=format",
    alt: "Middle-aged woman relaxing on a sofa with a warm throw blanket.",
  },
  {
    eyebrow: "Quick answers",
    title: "Answers to your arthritis questions",
    body:
      "Search hundreds of plain-English answers reviewed by UK-based clinicians and physiotherapists.",
    href: "/faq",
    cta: "Browse FAQ",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1080&q=80&auto=format",
    alt: "Small group of adults consulting a tablet together.",
  },
];

const Row = ({
  row,
  reverse,
}: {
  row: (typeof ROWS)[number];
  reverse: boolean;
}) => (
  <div
    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
      reverse ? "lg:[&>div:first-child]:order-2" : ""
    }`}
  >
    <div className="overflow-hidden rounded-2xl bg-muted aspect-[4/3]">
      <img
        src={row.image}
        srcSet={unsplashSrcSet(row.image)}
        sizes={defaultSizes}
        alt={row.alt}
        width={1080}
        height={810}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="max-w-lg">
      <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
        {row.eyebrow}
      </p>
      <h3 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-5 text-balance">
        {row.title}
      </h3>
      <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-7">
        {row.body}
      </p>
      <Link
        to={row.href}
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
      >
        {row.cta}
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </div>
  </div>
);

const ResourcesForYouSection = () => {
  return (
    <section
      aria-labelledby="resources-heading"
      className="bg-secondary/30 py-24 lg:py-32"
    >
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
            Help where you need it
          </p>
          <h2
            id="resources-heading"
            className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance"
          >
            Resources for you
          </h2>
        </div>

        <div className="space-y-20 lg:space-y-28">
          {ROWS.map((row, i) => (
            <Row key={row.title} row={row} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesForYouSection;
