import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  MEDICAL_DISCLAIMER_CHAT,
  MEDICAL_DISCLAIMER_PATH,
  MEDICAL_DISCLAIMER_SHORT,
  MEDICAL_DISCLAIMER_TOOL,
  shouldRenderDisclaimerStrip,
} from "@/lib/medicalDisclaimer";
import { useDisclaimerStripShown } from "@/components/disclaimerChrome";

export type MedicalDisclaimerVariant = "short" | "tool" | "chat";

interface MedicalDisclaimerStripProps {
  variant?: MedicalDisclaimerVariant;
  className?: string;
  /** Hide the “full disclaimer” link (e.g. already on /disclaimer). */
  hideFullLink?: boolean;
}

const COPY: Record<MedicalDisclaimerVariant, string> = {
  short: MEDICAL_DISCLAIMER_SHORT,
  tool: MEDICAL_DISCLAIMER_TOOL,
  chat: MEDICAL_DISCLAIMER_CHAT,
};

/**
 * Compact YMYL strip for clinical pages, tools and chat.
 * Prefer EducationalDisclaimerBox (with review date) on champion articles;
 * use this strip for chrome / tools / chat.
 * Nested instances under DisclaimerStripShown return null so the strip
 * cannot duplicate 2–3 times on one page.
 */
export default function MedicalDisclaimerStrip({
  variant = "short",
  className = "",
  hideFullLink = false,
}: MedicalDisclaimerStripProps) {
  const alreadyShown = useDisclaimerStripShown();
  if (!shouldRenderDisclaimerStrip(alreadyShown)) return null;

  return (
    <aside
      className={`rounded-lg border border-amber-500/25 bg-amber-500/5 px-3 py-2.5 text-xs sm:text-sm leading-relaxed text-foreground/90 ${className}`}
      role="note"
      aria-label="Medical educational disclaimer"
    >
      <p className="flex items-start gap-2">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
        <span>
          {COPY[variant]}{" "}
          {!hideFullLink && (
            <>
              <Link
                to={MEDICAL_DISCLAIMER_PATH}
                className="text-primary underline underline-offset-2 font-medium"
              >
                Full medical disclaimer
              </Link>
              {" · "}
              <Link
                to="/editorial-standards"
                className="text-primary underline underline-offset-2"
              >
                Editorial standards
              </Link>
            </>
          )}
        </span>
      </p>
    </aside>
  );
}
