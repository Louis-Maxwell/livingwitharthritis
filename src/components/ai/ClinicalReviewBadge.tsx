import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClinicalReviewBadgeProps {
  reviewer?: string;
  lastReviewed?: string;
  className?: string;
}

/**
 * Compact "reviewed by HCPC clinician" trust mark.
 * Use near AI-generated or clinical content.
 */
export default function ClinicalReviewBadge({
  reviewer = "HCPC-registered physiotherapist",
  lastReviewed = "April 2026",
  className,
}: ClinicalReviewBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400",
        className,
      )}
    >
      <ShieldCheck className="h-3 w-3" aria-hidden="true" />
      <span>
        Reviewed by {reviewer} · {lastReviewed}
      </span>
    </div>
  );
}
