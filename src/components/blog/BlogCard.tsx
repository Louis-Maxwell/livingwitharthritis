import { Link } from "react-router-dom";
import { Clock, Headphones } from "lucide-react";
import { coverImage, onCoverImgError, safeCoverSrc } from "@/lib/articleImages";
import { displayTitle } from "@/lib/blogTitle";
import { formatBlogDate, readTimeLabel } from "@/lib/blog/topics";

export interface BlogCardPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author?: string | null;
  updated_at?: string | null;
  meta_title?: string | null;
  /** Real reading time from the catalog (word count / 200 wpm). */
  reading_minutes?: number | null;
}

interface BlogCardProps {
  post: BlogCardPost;
  /** Priority image for LCP (first featured / lead card). */
  priority?: boolean;
  /** Slightly larger title for the featured strip. */
  featured?: boolean;
  /**
   * Layout variant:
   * - default: vertical card
   * - lead: horizontal (image left, copy right) on md+
   * - compact: small horizontal row for "continue reading" / saved strips
   */
  variant?: "default" | "lead" | "compact";
  /** Heading level for the card title (keeps the page outline valid). */
  headingLevel?: "h2" | "h3";
  className?: string;
}

const TOPIC_CHIP =
  "inline-flex items-center rounded-full bg-primary/[0.07] px-2.5 py-0.5 text-xs font-semibold text-primary dark:bg-primary/15";

/**
 * Blog card — one consistent shape everywhere: cover, topic, title, excerpt,
 * then date · reading time. Calm hover (shadow only), visible focus ring,
 * fixed-ratio cover to avoid layout shift.
 */
const BlogCard = ({
  post,
  priority = false,
  featured = false,
  variant = "default",
  headingLevel = "h3",
  className = "",
}: BlogCardProps) => {
  const title = displayTitle(post);
  const cover = coverImage(post.category, post.title, post.slug);
  const readTime = readTimeLabel(post);
  const dateLabel = formatBlogDate(post.date);
  const isLead = variant === "lead";
  const isCompact = variant === "compact";
  const Heading = headingLevel;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background dark:border-border/70 ${
        isLead ? "md:flex-row" : ""
      } ${isCompact ? "flex-row" : ""} ${className}`}
    >
      <Link
        to={`/blog/${post.slug}`}
        className={`flex min-w-0 flex-1 focus-visible:outline-none ${
          isLead ? "flex-col md:flex-row" : isCompact ? "flex-row items-stretch" : "flex-col"
        }`}
        aria-label={`Read: ${title}`}
      >
        <div
          className={`shrink-0 overflow-hidden bg-muted/40 ${
            isLead
              ? "aspect-[16/9] md:aspect-auto md:w-1/2"
              : isCompact
                ? "w-28 sm:w-40"
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
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className={`flex min-w-0 flex-1 flex-col ${
            isLead ? "p-5 md:p-8 md:justify-center" : isCompact ? "p-4" : "p-5"
          }`}
        >
          <span className={`${TOPIC_CHIP} mb-3 self-start`}>{post.category}</span>
          <Heading
            className={`font-display font-semibold leading-snug text-foreground transition-colors group-hover:text-primary break-words ${
              isLead
                ? "text-xl md:text-2xl"
                : isCompact
                  ? "text-base line-clamp-2"
                  : featured
                    ? "text-lg md:text-xl"
                    : "text-lg"
            }`}
          >
            {title}
          </Heading>
          {!isCompact && (
            <p
              className={`mt-2 text-[0.95rem] leading-relaxed text-muted-foreground ${
                isLead ? "line-clamp-4" : "line-clamp-3"
              }`}
            >
              {post.excerpt}
            </p>
          )}
          <p className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 text-sm text-muted-foreground">
            <time dateTime={post.date}>{dateLabel}</time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {readTime}
            </span>
          </p>
        </div>
      </Link>
      {!isCompact && (
        <Link
          to={`/blog/${post.slug}#listen`}
          className={`inline-flex min-h-11 items-center gap-1.5 border-t border-border/40 px-5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
            isLead ? "md:absolute md:bottom-2 md:right-4 md:border-0 md:px-2" : ""
          }`}
          aria-label={`Listen to ${title}`}
        >
          <Headphones className="h-3.5 w-3.5" aria-hidden="true" /> Listen
        </Link>
      )}
    </article>
  );
};

export default BlogCard;
