import { memo } from "react";

interface PhotoBreakSectionProps {
  image: string;
  alt: string;
  quote: string;
  attribution?: string;
}

const PhotoBreakSection = memo(({ image, alt, quote, attribution }: PhotoBreakSectionProps) => (
  <section className="relative h-[55vh] min-h-[400px] max-h-[560px] overflow-hidden">
    <img
      src={image}
      alt={alt}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/75 to-primary/80" />
    <div className="relative z-10 flex items-center justify-center h-full px-8">
      <div className="text-center max-w-3xl">
        <div className="w-12 h-px bg-white/20 mx-auto mb-10" />
        <p className="font-display text-xl sm:text-2xl md:text-[2rem] lg:text-[2.25rem] text-white/90 leading-[1.4] italic tracking-tight">
          &ldquo;{quote}&rdquo;
        </p>
        {attribution && (
          <p className="text-white/40 text-xs mt-8 tracking-[0.25em] uppercase font-bold">
            — {attribution}
          </p>
        )}
        <div className="w-12 h-px bg-white/20 mx-auto mt-10" />
      </div>
    </div>
  </section>
));

PhotoBreakSection.displayName = "PhotoBreakSection";
export default PhotoBreakSection;
