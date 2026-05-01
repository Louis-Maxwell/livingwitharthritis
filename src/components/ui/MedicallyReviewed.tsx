import { ShieldCheck } from "lucide-react";

interface MedicallyReviewedProps {
  reviewer?: string;
  credential?: string;
  updated?: string;
  className?: string;
  variant?: "default" | "compact";
}

/**
 * E-E-A-T trust line — surfaces clinical reviewer and last-updated date.
 * Reinforces medical credibility and helps Google understand authorship.
 * Schema-friendly (uses semantic <time>).
 */
export default function MedicallyReviewed({
  reviewer = "Living With Arthritis Clinical Team",
  credential = "HCPC-registered physiotherapists & UK rheumatology nurses",
  updated = "April 2026",
  className = "",
  variant = "default",
}: MedicallyReviewedProps) {
  if (variant === "compact") {
    return (
      <p className={`flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/70 ${className}`}>
        <ShieldCheck className="h-3 w-3 text-primary/70" aria-hidden="true" />
        Reviewed by {reviewer} · Updated <time dateTime={updated}>{updated}</time>
      </p>
    );
  }

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-border/40 bg-card/50 px-4 py-2 text-[11px] text-muted-foreground ${className}`}
      role="note"
      aria-label="Medical review information"
    >
      <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
      <span>
        Medically reviewed by <span className="font-semibold text-foreground">{reviewer}</span>
      </span>
      <span className="hidden sm:inline text-border">·</span>
      <span className="hidden sm:inline">{credential}</span>
      <span className="text-border">·</span>
      <span>
        Updated <time dateTime={updated} className="font-medium text-foreground">{updated}</time>
      </span>
    </div>
  );
}
