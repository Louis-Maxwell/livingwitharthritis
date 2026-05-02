import { memo } from "react";
import forestBalance from "@/assets/forest-balance-pose.jpg";

/**
 * MovementMomentSection
 * Displays the gentle-movement photograph at its original intrinsic size,
 * centered on a soft neutral backdrop. No cropping, no scaling.
 */
const MovementMomentSection = memo(() => (
  <section
    aria-label="A moment of gentle movement"
    className="bg-secondary/30 py-16 lg:py-24 border-y border-border/15"
  >
    <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
          Movement, on your own terms
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Gentle balance and mobility work — outdoors, indoors, at any pace that suits your joints today.
        </p>
      </div>

      <figure className="flex flex-col items-center">
        {/* Original size — no width/height attributes overriding intrinsic dimensions */}
        <img
          src={forestBalance}
          alt="A person practising a gentle standing balance pose on a wooden bench in an autumn woodland"
          className="max-w-full h-auto rounded-lg shadow-lg"
          loading="lazy"
          decoding="async"
        />
        <figcaption className="mt-4 text-sm text-muted-foreground text-center">
          &ldquo;Yoga&rdquo; by Elena Penkova is licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc/2.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            CC BY-NC 2.0
          </a>
          .
        </figcaption>
      </figure>
    </div>
  </section>
));

MovementMomentSection.displayName = "MovementMomentSection";
export default MovementMomentSection;
