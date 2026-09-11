import { useCallback, useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { isBookmarked, toggleBookmark } from "@/lib/bookmarkedArticles";
import { toast } from "sonner";

interface ArticleBookmarkButtonProps {
  slug: string;
  title?: string;
  className?: string;
  /** Stronger byline styling so Save is easy to spot. */
  prominent?: boolean;
}

/**
 * Accessible localStorage bookmark toggle — keyed by article slug.
 * No sync, no fake counts.
 */
const ArticleBookmarkButton = ({
  slug,
  title,
  className = "",
  prominent = false,
}: ArticleBookmarkButtonProps) => {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isBookmarked(slug));
  }, [slug]);

  const onToggle = useCallback(() => {
    const next = toggleBookmark(slug);
    setSaved(next);
    toast.success(next ? "Saved for later on this device" : "Removed from saved articles");
  }, [slug]);

  const label = saved
    ? `Remove bookmark${title ? ` for ${title}` : ""}`
    : `Bookmark${title ? ` ${title}` : " this article"}`;

  const base =
    "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
  const tone = saved
    ? "border-primary/50 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
    : prominent
      ? "border-primary/40 bg-primary/10 text-primary hover:bg-primary/15 dark:border-primary/50 dark:bg-primary/15"
      : "border-border/50 bg-card text-muted-foreground hover:border-primary/30 hover:text-primary dark:border-border/60";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={saved}
      aria-label={label}
      className={`${base} ${tone} ${className}`}
    >
      <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} aria-hidden="true" />
      <span>{saved ? "Saved" : prominent ? "Save for later" : "Save"}</span>
    </button>
  );
};

export default ArticleBookmarkButton;
