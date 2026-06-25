import { memo } from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { VISITOR_STATS } from "@/config/visitorStats";

interface VisitorStatsProps {
  /** Render as a compact inline badge (default) or a full-width band. */
  variant?: "badge" | "band";
  /** Link the badge to the AI transparency page. Default true. */
  linkToTransparency?: boolean;
  className?: string;
}

const VisitorStats = memo(({
  variant = "badge",
  linkToTransparency = true,
  className = "",
}: VisitorStatsProps) => {
  const label = `${VISITOR_STATS.count} site visitors ${VISITOR_STATS.period}`;

  const inner = (
    <span
      className={
        variant === "band"
          ? "inline-flex items-center gap-3 rounded-full bg-primary/10 px-6 py-3 text-sm sm:text-base font-semibold text-primary border border-primary/20 hover:bg-primary/15 transition-colors"
          : "inline-flex items-center gap-2 rounded-full bg-primary/8 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary border border-primary/15 hover:bg-primary/15 transition-colors"
      }
    >
      <Users className="w-4 h-4" aria-hidden="true" />
      <span>
        Site visitors: <span className="font-bold">{VISITOR_STATS.count}</span>{" "}
        <span className="font-medium opacity-80">{VISITOR_STATS.period}</span>
      </span>
    </span>
  );

  const wrapperClass =
    variant === "band"
      ? `w-full flex justify-center py-8 ${className}`
      : `inline-block ${className}`;

  return (
    <div className={wrapperClass} aria-label={label}>
      {linkToTransparency ? (
        <Link to="/about/ai-transparency" className="no-underline">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
});

VisitorStats.displayName = "VisitorStats";
export default VisitorStats;
