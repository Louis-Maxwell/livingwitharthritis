import { memo } from "react";
import forestBalance from "@/assets/forest-balance-pose.jpg";
import yogaMonumentGroup from "@/assets/yoga-monument-group.jpg";

/**
 * MovementMomentSection
 * Displays the gentle-movement photograph at its original intrinsic size,
 * centered on a soft neutral backdrop. No cropping, no scaling.
 */
const MovementMomentSection = memo(() => (
  <section
    aria-label="A moment of gentle movement"
    className="bg-secondary/30 py-12 sm:py-16 lg:py-24 border-y border-border/15"
  >
    <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-[1200px]">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
          Movement, on your own terms
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Gentle balance and mobility work — outdoors, indoors, at any pace that suits your joints today.
        </p>
      </div>

      <figure className="flex flex-col items-center mx-auto">
        {/* Original size on desktop, responsive scale on mobile */}
        <img
          src={forestBalance}
          alt="A person practising a gentle standing balance pose on a wooden bench in an autumn woodland"
          className="max-w-full h-auto rounded-md sm:rounded-lg shadow-md sm:shadow-lg"
          loading="lazy"
          decoding="async"
        />
        <figcaption className="mt-3 sm:mt-4 px-2 text-xs sm:text-sm text-muted-foreground text-center">
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

      <figure className="flex flex-col items-center mx-auto mt-10 sm:mt-12">
        {/* Original size on desktop, responsive scale on mobile */}
        <img
          src={yogaMonumentGroup}
          alt="A large outdoor group practising tree pose on yoga mats in front of the Washington Monument"
          className="max-w-full h-auto rounded-md sm:rounded-lg shadow-md sm:shadow-lg"
          loading="lazy"
          decoding="async"
        />
        <figcaption className="mt-3 sm:mt-4 px-2 text-xs sm:text-sm text-muted-foreground text-center">
          &ldquo;2nd Annual Yoga with lululemon Athletica&rdquo; by daveynin is licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by/2.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            CC BY 2.0
          </a>
          .
        </figcaption>
      </figure>
    </div>
  </section>
));

MovementMomentSection.displayName = "MovementMomentSection";
export default MovementMomentSection;
