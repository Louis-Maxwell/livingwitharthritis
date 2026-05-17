import { memo } from "react";
import { unsplashSrcSet, fullWidthSizes } from "@/data/images";

interface PhotoBreakProps {
  image: string;
  alt: string;
  quote: string;
  attr: string;
}

const PhotoBreak = memo(({ image, alt, quote, attr }: PhotoBreakProps) => (
  <section aria-label="Inspirational photo" className="relative h-[400px] overflow-hidden bg-secondary">
    <img
      src={image}
      srcSet={unsplashSrcSet(image, [640, 1080, 1400, 1920])}
      sizes={fullWidthSizes}
      alt={alt}
      className="h-full w-full object-cover ken-burns"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" aria-hidden="true" />
    <figure className="absolute bottom-0 p-10 lg:p-16 max-w-3xl">
      <blockquote>
        <p className="text-2xl lg:text-3xl font-semibold text-primary-foreground" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}>
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>
      <figcaption className="mt-3 text-primary/60 font-medium">{attr}</figcaption>
    </figure>
  </section>
));

PhotoBreak.displayName = "PhotoBreak";
export default PhotoBreak;
