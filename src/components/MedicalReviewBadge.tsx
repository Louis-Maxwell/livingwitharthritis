import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import authors from "@/data/medical-authors.json";

interface MedicalReviewBadgeProps {
  reviewer?: string;
  date?: string;
  title?: string;
  credential?: string;
  /** Compact variant — single line, smaller padding */
  compact?: boolean;
}

const DEFAULT_AUTHOR = authors.maxwell;

/**
 * Medical review trust badge — surfaces reviewer credentials (HCPC,
 * CSP) on every health article and condition page for E-E-A-T signals.
 * Uses project tokens (no blue/grey hard-coded) per visual identity rule.
 */
export default function MedicalReviewBadge({
  reviewer = DEFAULT_AUTHOR.name,
  date = "June 2026",
  title = DEFAULT_AUTHOR.title,
  credential = DEFAULT_AUTHOR.credential,
  compact = false,
}: MedicalReviewBadgeProps) {
  if (compact) {
    return (
      <div className="flex items-start gap-2 text-xs text-muted-foreground my-4">
        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <span>
          Medically reviewed by{" "}
          <span className="font-semibold text-foreground">{reviewer}</span> —{" "}
          {title} • {credential} • CSP Member • Last updated {date}.{" "}
          <Link to="/editorial-standards" className="underline hover:text-primary">
            Editorial standards
          </Link>
        </span>
      </div>
    );
  }

  return (
    <aside
      aria-label="Medical review information"
      className="border-l-4 border-primary bg-accent/40 p-4 md:p-5 my-6 rounded-r-lg"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-sm text-foreground">
            Medically reviewed by {reviewer}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {title} • {credential} • CSP Member • Last updated {date}
          </p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            This content is reviewed by a qualified healthcare professional and
            based on evidence from NICE guidelines, NHS resources, and
            peer-reviewed research.{" "}
            <Link
              to="/editorial-standards"
              className="text-primary font-medium underline hover:no-underline"
            >
              Read our editorial standards
            </Link>
            .
          </p>
        </div>
      </div>
    </aside>
  );
}
