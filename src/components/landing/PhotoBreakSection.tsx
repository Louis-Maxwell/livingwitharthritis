import { memo } from "react";

interface PhotoBreakSectionProps {
  image: string;
  alt: string;
  quote: string;
  attribution?: string;
}

const PhotoBreakSection = memo(({ image, alt, quote, attribution }: PhotoBreakSectionProps) => (
  <section className="relative h-[50vh] min-h-[360px] max-h-[500px] overflow-hidden">
    <img
      src={image}
      alt={alt}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-primary/75" />
    <div className="relative z-10 flex items-center justify-center h-full px-8">
      <div className="text-center max-w-3xl">
        <p className="font-display text-xl sm:text-2xl md:text-3xl text-white/90 leading-[1.5] italic">
          &ldquo;{quote}&rdquo;
        </p>
        {attribution && (
          <p className="text-white/50 text-sm mt-6 tracking-[0.2em] uppercase font-medium">
            — {attribution}
          </p>
        )}
      </div>
    </div>
  </section>
));

PhotoBreakSection.displayName = "PhotoBreakSection";
export default PhotoBreakSection;
