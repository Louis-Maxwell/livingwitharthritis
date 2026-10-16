import type { ArticleImage } from '@/lib/articleImagePicks';
import { safeCoverSrc } from '@/lib/coverFallback';

/** One in-article picture with descriptive alt text and its licence credit. */
export default function ArticleFigure({ image }: { image: ArticleImage }) {
  return (
    <figure className="not-prose my-8">
      <img
        src={safeCoverSrc(image.src)}
        alt={image.alt}
        width={1200}
        height={800}
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded-xl shadow-sm object-cover aspect-[3/2]"
      />
      {image.credit && (
        <figcaption className="text-xs text-muted-foreground mt-2">
          {image.credit}
        </figcaption>
      )}
    </figure>
  );
}
