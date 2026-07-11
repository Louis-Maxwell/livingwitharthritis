/**
 * Visible "Last reviewed" line for medical content pages.
 *
 * Renders a small, muted paragraph with a semantic <time> element so
 * screen readers and crawlers can pick up the review date. Mirrors the
 * pattern used in BlogPost.tsx for consistency across the site.
 */
interface LastReviewedProps {
  /** ISO-8601 date string, e.g. "2026-07-11". */
  date: string;
  className?: string;
}

export default function LastReviewed({ date, className }: LastReviewedProps) {
  const label = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <p className={`text-xs text-muted-foreground ${className ?? "mb-4"}`}>
      Last reviewed{" "}
      <time dateTime={date} className="font-medium text-foreground/80">
        {label}
      </time>
    </p>
  );
}

/** Shared review date used across medical templates. Update in one place. */
export const LAST_REVIEWED_ISO = "2026-07-11";
