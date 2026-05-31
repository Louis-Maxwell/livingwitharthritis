import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
}

/**
 * Image with red-tint duotone hover, monochrome at rest.
 * Pure CSS — uses mix-blend overlays and grayscale filters.
 */
export function DuotoneImage({ src, alt, className, imgClassName, width, height }: Props) {
  return (
    <figure className={cn("duotone group relative overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={cn("duotone-img w-full h-full object-cover", imgClassName)}
      />
      <span aria-hidden="true" className="duotone-overlay" />
    </figure>
  );
}

export default DuotoneImage;
