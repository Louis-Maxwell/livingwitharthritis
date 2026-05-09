import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AiDisclosureBadgeProps {
  className?: string;
  variant?: "compact" | "full";
}

/**
 * Visual signal that a piece of content was produced or curated by AI.
 * Always pair AI output with this badge.
 */
export default function AiDisclosureBadge({
  className,
  variant = "compact",
}: AiDisclosureBadgeProps) {
  return (
    <Link
      to="/ai-safety"
      aria-label="AI disclosure — learn how this AI works"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary/80 transition-colors hover:bg-primary/10 hover:text-primary",
        className,
      )}
    >
      <Sparkles className="h-3 w-3" aria-hidden="true" />
      <span>
        AI-generated
        {variant === "full" && <span className="text-muted-foreground"> · Not medical advice</span>}
      </span>
    </Link>
  );
}
