import { memo } from "react";
import { Heart, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const FounderStoryBand = memo(() => {
  return (
    <section
      aria-labelledby="our-story-heading"
      className="py-16 md:py-24 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6 border border-primary/20">
            <Heart className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-semibold text-primary">Our Story</span>
          </div>

          {/* Heading */}
          <h2
            id="our-story-heading"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6"
          >
            Why we exist: closing the lonely gap
          </h2>

          {/* Body copy */}
          <div className="prose prose-sm md:prose-base max-w-none text-foreground/80 space-y-4 mb-8">
            <p>
              Too many people are diagnosed with arthritis or a long-term joint condition, expect
              clear guidance, and leave with a sheet of home exercises — nothing else.
            </p>

            <p>
              No treatment plan. No follow-up. No support for managing a lifelong condition.
              Living with that kind of pain is exhausting.
            </p>

            <p>
              You are not alone in that gap. Closing it is the mission of
              <strong className="text-foreground"> Living With Arthritis</strong>. We exist to give
              people clinically honest, emotionally kind guidance — and a human reply when you
              need one.
            </p>

            <p>
              We are a young charity (registered 15 June 2026, no.&nbsp;1218461), serving people across the UK
              and independent of Arthritis UK, governed by our trustees. We will not invent a large clinical
              board. Our Operations Director, Louis Maxwell (HCPC PH128483), reviews our clinical content. Motion is lotion — and we are building this with you.
            </p>

            <p>
              Every resource is free, because no one should choose between affordability and care.
            </p>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#team"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/95 transition-colors shadow-lg shadow-primary/20"
            >
              <Stethoscope className="w-5 h-5 mr-2" aria-hidden="true" />
              Meet our team
            </a>
            <Link
              to="/editorial-standards"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border bg-card hover:bg-muted/50 text-foreground font-semibold transition-colors"
            >
              Read our clinical policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

FounderStoryBand.displayName = "FounderStoryBand";
export default FounderStoryBand;
