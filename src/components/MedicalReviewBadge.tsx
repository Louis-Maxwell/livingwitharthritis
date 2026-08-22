import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import authors from "@/data/medical-authors.json";

interface MedicalReviewBadgeProps {
  reviewer: string;
  date?: string;
  title: string;
  credential: string;
  /** Slug in medical-authors.json — controls whether the badge links to
   * /authors/:slug or /reviewers/:slug. Defaults to the author "maxwell". */
  authorSlug?: string;
  /** Compact variant — single line, smaller padding */
  compact?: boolean;
}

type AuthorRecord = { kind: "author" | "reviewer"; slug: string };

function bioHref(slug: string): string {
  const record = (authors as Record<string, AuthorRecord>)[slug];
  if (!record) return "/editorial-standards";
  const prefix = record.kind === "reviewer" ? "reviewers" : "authors";
  return `/${prefix}/${record.slug}`;
}

/**
 * Medical review trust badge — surfaces reviewer credentials (HCPC,
 * CSP) on every health article and condition page for E-E-A-T signals.
 * Uses project tokens (no blue/grey hard-coded) per visual identity rule.
 */
export default function MedicalReviewBadge({
  reviewer,
  date,
  title,
  credential,
  authorSlug = "maxwell",
  compact = false,
}: MedicalReviewBadgeProps) {
  const href = bioHref(authorSlug);
  if (compact) {
    return (
      <div className="flex items-start gap-2 text-xs text-muted-foreground my-4">
        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <span>
          Medically reviewed by{" "}
          <Link to={href} className="font-semibold text-foreground underline hover:text-primary">
            {reviewer}
          </Link>{" "}
          — {title} • {credential}
          {date ? ` • Last updated ${date}. ` : ". "}
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
            Medically reviewed by{" "}
            <Link to={href} className="underline hover:text-primary">
              {reviewer}
            </Link>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {title} • {credential}
            {date ? ` • Last updated ${date}` : ""}
          </p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Reviewer details and the site's clinical review process are
            documented in our{" "}
            <Link
              to="/editorial-standards"
              className="text-primary font-medium underline hover:no-underline"
            >
              editorial standards
            </Link>
            .
          </p>
        </div>
      </div>
    </aside>
  );
}
