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
  /** Priority image for LCP (first featured card). */
  priority?: boolean;
  /** Slightly larger typography for featured strip. */
  featured?: boolean;
  className?: string;
}

const CATEGORY_BADGE =
  "text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-primary/30 bg-background text-primary";

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
const BlogCard = ({ post, priority = false, featured = false, className = "" }: BlogCardProps) => {
  const title = displayTitle(post);
  const cover = coverImage(post.category, post.title, post.slug);
  const readTime = estimateListReadTime(post.excerpt);
  const dateLabel = formatDate(post.date);

  return (
    <article
      className={`group flex flex-col rounded-2xl border border-border/40 bg-card overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 ${
        featured ? "card-accent-top" : ""
      } ${className}`}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block focus-visible:outline-none flex-1 min-w-0"
        aria-label={`Read: ${title}`}
      >
        <div className="aspect-[16/9] overflow-hidden bg-muted/30">
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
        <div className={`flex flex-col flex-1 ${featured ? "p-5 md:p-6" : "p-5 md:p-6"}`}>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={CATEGORY_BADGE}>{post.category}</span>
            <time dateTime={post.date} className="text-xs sm:text-sm text-muted-foreground">
              {dateLabel}
            </time>
          </div>
          <h3
            className={`font-display font-semibold text-foreground group-hover:text-primary transition-colors leading-snug break-words mb-2 ${
              featured ? "text-lg md:text-xl" : "text-lg md:text-[1.15rem]"
            }`}
          >
            {title}
          </h3>
          <p className="text-sm md:text-[0.95rem] text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 border-t border-border/20 text-xs sm:text-sm text-muted-foreground">
            {post.author ? (
              <span className="inline-flex items-center gap-1.5 min-w-0">
                <User className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{post.author}</span>
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {readTime}
            </span>
            <span className="ml-auto text-primary font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Read article <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
      <div className="px-5 md:px-6 pb-5 -mt-1">
        <Link
          to={`/blog/${post.slug}#listen`}
          className="text-muted-foreground text-sm font-medium inline-flex min-h-11 items-center gap-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          aria-label={`Listen to ${title}`}
        >
          <Headphones className="w-3.5 h-3.5" aria-hidden="true" /> Listen
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
