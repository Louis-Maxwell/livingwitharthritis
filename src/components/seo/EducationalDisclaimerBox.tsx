import { AlertCircle, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import {
  MEDICAL_DISCLAIMER_PATH,
  MEDICAL_DISCLAIMER_SHORT,
  educationalDisclaimerCopyMode,
} from "@/lib/medicalDisclaimer";
import { useDisclaimerStripShown } from "@/components/disclaimerContext";
import { PENDING_REVIEW_TEXT, type BlogReviewStatus } from "@/lib/blog/review";
import { formatReviewDate, nextReviewDate } from "@/lib/reviewDates";

interface EducationalDisclaimerBoxProps {
  /** Explicit clinical-review date; never inferred from content updates. */
  lastReviewed?: string;
  reviewer?: string;
  /** "pending" replaces the "Clinically reviewed" line with the pending byline. */
  reviewStatus?: BlogReviewStatus;
  /** Line shown when pending (defaults to the blog byline). */
  pendingText?: string;
  className?: string;
}

/**
 * Short clinical-review + educational-not-diagnostic box for YMYL champions.
 * When a layout MedicalDisclaimerStrip is already on the page, only the
 * review line is shown — the short copy is not repeated.
 */
export default function EducationalDisclaimerBox({
  lastReviewed,
  reviewer = "Louis Maxwell, HCPC PH128483",
  reviewStatus = "reviewed",
  pendingText = PENDING_REVIEW_TEXT,
  className = "",
}: EducationalDisclaimerBoxProps) {
  const hasDate = Boolean(lastReviewed && /^\d{4}-\d{2}-\d{2}/.test(lastReviewed));
  const reviewedLabel = hasDate ? formatReviewDate(lastReviewed!) : null;
  const nextIso = hasDate ? nextReviewDate(lastReviewed!) : null;
  const copyMode = educationalDisclaimerCopyMode(useDisclaimerStripShown());

  return (
    <aside
      className={`my-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm leading-relaxed text-foreground/90 ${className}`}
      aria-label="Educational disclaimer and clinical review"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div className="space-y-2">
          {reviewStatus === "pending" ? (
            <p className="font-semibold text-foreground" data-testid="review-status-pending">
              {pendingText}
            </p>
          ) : (
            <p className="font-semibold text-foreground" data-testid="review-dates">
              {`Clinically reviewed by ${reviewer}`}
              {reviewedLabel && nextIso ? (
                <>
                  {" · Last reviewed "}
                  <time dateTime={lastReviewed!.slice(0, 10)}>{reviewedLabel}</time>
                  {" · Next review "}
                  <time dateTime={nextIso}>{formatReviewDate(nextIso)}</time>
                </>
              ) : null}{" "}
              <Link to="/clinical-governance" className="font-normal text-primary underline underline-offset-2">
                How we review
              </Link>
            </p>
          )}
          {copyMode === "full" ? (
            <p className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
              <span>
                {MEDICAL_DISCLAIMER_SHORT} See our{" "}
                <Link to={MEDICAL_DISCLAIMER_PATH} className="text-primary underline underline-offset-2">
                  medical disclaimer
                </Link>
                ,{" "}
                <Link to="/editorial-standards" className="text-primary underline underline-offset-2">
                  editorial standards
                </Link>{" "}
                and{" "}
                <Link to="/about/editorial-claims-policy" className="text-primary underline underline-offset-2">
                  claims policy
                </Link>
                .
              </span>
            </p>
          ) : (
            <p>
              See our{" "}
              <Link to={MEDICAL_DISCLAIMER_PATH} className="text-primary underline underline-offset-2">
                medical disclaimer
              </Link>
              ,{" "}
              <Link to="/editorial-standards" className="text-primary underline underline-offset-2">
                editorial standards
              </Link>{" "}
              and{" "}
              <Link to="/about/editorial-claims-policy" className="text-primary underline underline-offset-2">
                claims policy
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
