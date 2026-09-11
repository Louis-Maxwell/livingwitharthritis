import { AlertCircle, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface EducationalDisclaimerBoxProps {
  /** ISO date shown as last clinical review, default Sep 2026 Month 1 pass. */
  lastReviewed?: string;
  reviewer?: string;
  className?: string;
}

/**
 * Short clinical-review + educational-not-diagnostic box for YMYL champions.
 */
export default function EducationalDisclaimerBox({
  lastReviewed = "2026-09-11",
  reviewer = "Louis Maxwell, HCPC PH128483",
  className = "",
}: EducationalDisclaimerBoxProps) {
  const reviewedLabel = new Date(lastReviewed).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <aside
      className={`my-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm leading-relaxed text-foreground/90 ${className}`}
      aria-label="Educational disclaimer and clinical review"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div className="space-y-2">
          <p className="font-semibold text-foreground">
            Clinically reviewed · {reviewer} · {reviewedLabel}
          </p>
          <p className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
            <span>
              Educational information for people in the UK living with arthritis —{" "}
              <strong>not a diagnosis or personal medical advice</strong>. Always check
              medicines and exercises with your GP, pharmacist or rheumatology team.
              See our{" "}
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
        </div>
      </div>
    </aside>
  );
}
