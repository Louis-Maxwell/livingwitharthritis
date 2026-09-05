import { useState, useEffect, useRef, memo } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  /** Optional WebP source for <picture> element */
  webpSrc?: string;
  /** Responsive image srcset */
  srcSet?: string;
  /** Responsive image sizes */
  sizes?: string;
}

/** Derive a .webp path from a .jpg/.png path in /public */
function deriveWebpSrc(src: string): string | undefined {
  if (src.startsWith("/images/") && /\.(jpe?g|png)$/i.test(src)) {
    return src.replace(/\.(jpe?g|png)$/i, ".webp");
  }
  return undefined;
}

const OptimizedImage = memo(({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  webpSrc,
  srcSet,
  sizes,
}: OptimizedImageProps) => {
  // Above-fold / LCP: never start at opacity-0 — that leaves the LCP element invisible.
  const [isLoaded, setIsLoaded] = useState(priority);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  const resolvedWebp = webpSrc || deriveWebpSrc(src);

  useEffect(() => {
    if (priority) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={imgRef}
      className={cn(
        "overflow-hidden bg-muted/20",
        className
      )}
      style={{ width, height }}
    >
      {isInView && (
        <picture>
          {resolvedWebp && <source srcSet={resolvedWebp} type="image/webp" />}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            srcSet={srcSet}
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            {...(priority
              ? ({ fetchpriority: "high" } as Record<string, string>)
              : {})}
            onLoad={() => setIsLoaded(true)}
            className={cn(
              "w-full h-full object-cover",
              // Soft fade only for below-fold; priority/LCP stays visible from first paint.
              !priority && "transition-opacity duration-500",
              priority || isLoaded ? "opacity-100" : "opacity-0"
            )}
          />
        </picture>
      )}
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export { OptimizedImage };

export default OptimizedImage;
