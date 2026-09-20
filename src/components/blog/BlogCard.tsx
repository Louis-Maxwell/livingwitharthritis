import { Link } from "react-router-dom";
import { ArrowRight, Clock, Headphones, User } from "lucide-react";
import { coverImage, onCoverImgError, safeCoverSrc } from "@/lib/articleImages";
import { displayTitle } from "@/lib/blogTitle";

export interface BlogCardPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author?: string | null;
  updated_at?: string | null;
  meta_title?: string | null;
}

interface BlogCardProps {
  post: BlogCardPost;
  /** Priority image for LCP (first featured / lead card). */
  priority?: boolean;
  /** Slightly larger typography for featured strip. */
  featured?: boolean;
  /**
   * Layout variant:
   * - default: vertical card
   * - lead: magazine horizontal (image left, copy right) on md+
   * - compact: denser resume / strip card
   */
  variant?: "default" | "lead" | "compact";
  className?: string;
}

const CATEGORY_BADGE =
  "text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-primary/40 bg-background/90 text-primary dark:border-primary/50 dark:bg-card dark:text-primary";

/** Estimate reading time from excerpt when full body is unavailable on the list. */
export function estimateListReadTime(excerpt: string): string {
  const words = excerpt.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(4, Math.min(14, Math.ceil(words / 40) + 3));
  return `${mins} min read`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

/**
 * Premium healthcare blog card — larger type for 40+, clear hierarchy,
 * hover lift/shadow, focus rings, aspect-ratio covers to avoid CLS.
 */
const BlogCard = ({
  post,
  priority = false,
  featured = false,
  variant = "default",
  className = "",
}: BlogCardProps) => {
  const title = displayTitle(post);
  const cover = coverImage(post.category, post.title, post.slug);
  const readTime = estimateListReadTime(post.excerpt);
  const dateLabel = formatDate(post.date);
  const isLead = variant === "lead";
  const isCompact = variant === "compact";

  return (
    <article
      className={`group relative flex flex-col rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/25 dark:border-border/70 dark:hover:border-primary/40 dark:hover:bg-card/95 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 focus-within:ring-offset-background ${
        featured || isLead ? "card-accent-top" : ""
      } ${isLead ? "md:flex-row md:items-stretch" : ""} ${className}`}
    >
      <Link
        to={`/blog/${post.slug}`}
        className={`block focus-visible:outline-none flex-1 min-w-0 ${
          isLead ? "md:flex md:flex-row md:min-h-[280px]" : "flex flex-col h-full"
        }`}
        aria-label={`Read: ${title}`}
      >
        <div
          className={`overflow-hidden bg-muted/30 dark:bg-muted/20 ${
            isLead
              ? "aspect-[16/9] md:aspect-auto md:w-[48%] md:min-h-[280px] md:shrink-0"
              : isCompact
                ? "aspect-[16/9] max-h-36"
                : "aspect-[16/9]"
          }`}
        >
          <img
            src={safeCoverSrc(cover.src)}
            alt=""
            aria-hidden="true"
            width={640}
            height={360}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            {...(priority ? ({ fetchpriority: "high" } as Record<string, string>) : {})}
            onError={onCoverImgError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div
          className={`flex flex-col flex-1 min-w-0 ${
            isLead
              ? "p-5 md:p-7 md:w-[52%] md:justify-center"
              : isCompact
                ? "p-4 md:p-4"
                : "p-5 md:p-6"
          }`}
        >
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mb-2.5">
            <span className={CATEGORY_BADGE}>{post.category}</span>
            <time dateTime={post.date} className="text-xs sm:text-sm text-muted-foreground">
              {dateLabel}
            </time>
          </div>
          <h3
            className={`font-display font-semibold text-foreground group-hover:text-primary transition-colors leading-snug break-words mb-2.5 ${
              isLead
                ? "text-[1.35rem] md:text-2xl lg:text-[1.65rem]"
                : featured
                  ? "text-[1.25rem] md:text-xl"
                  : "text-[1.2rem] md:text-[1.25rem]"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-muted-foreground leading-relaxed mb-4 flex-1 ${
              isCompact ? "text-sm line-clamp-2" : "text-sm sm:text-base line-clamp-3"
            }`}
          >
            {post.excerpt}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-3 border-t border-border/30 dark:border-border/50 text-sm text-muted-foreground">
            {post.author ? (
              <span className="inline-flex items-center gap-1.5 min-w-0 min-h-9">
                <User className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{post.author}</span>
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5 min-h-9">
              <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {readTime}
            </span>
            <span className="ml-auto text-primary font-medium inline-flex min-h-9 items-center gap-1.5 group-hover:gap-2.5 transition-all">
              {isCompact ? "Continue" : "Read article"}{" "}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
      {!isCompact && (
        <div
          className={`border-t border-border/25 dark:border-border/40 px-5 md:px-6 py-2.5 bg-muted/10 ${
            isLead ? "md:absolute md:bottom-3 md:right-5 md:border-0 md:bg-transparent md:px-0 md:py-0" : ""
          }`}
        >
          <Link
            to={`/blog/${post.slug}#listen`}
            className="text-muted-foreground text-sm font-medium inline-flex min-h-11 items-center gap-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            aria-label={`Listen to ${title}`}
          >
            <Headphones className="w-3.5 h-3.5" aria-hidden="true" /> Listen
          </Link>
        </div>
      )}
    </article>
  );
};

export default BlogCard;
