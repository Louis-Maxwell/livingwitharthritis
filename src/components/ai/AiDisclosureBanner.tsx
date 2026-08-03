import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AiDisclosureBannerProps {
  className?: string;
}

/**
 * Discloses that AI tools assist with drafting/formatting this page, and
 * that a named HCPC-registered clinician reviews every claim before
 * publication — matching the process already documented on
 * /about/ai-transparency, not a new claim invented for this component.
 *
 * Uses the same text-foreground on bg-muted pairing already used sitewide
 * for body copy (e.g. Privacy Policy, PageHero badges) rather than a novel
 * color combination, so it inherits that pairing's existing contrast.
 */
export default function AiDisclosureBanner({ className }: AiDisclosureBannerProps) {
  return (
    <aside
      role="note"
      aria-label="AI usage disclosure"
      className={cn(
        "flex items-start gap-3 rounded-xl border border-border bg-muted/60 px-4 py-3 text-sm text-foreground",
        className,
      )}
    >
      <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
      <p className="leading-relaxed m-0">
        AI tools assist with drafting and formatting this page. Every claim is checked and
        approved by a named, HCPC-registered clinician before publication. See our{" "}
        <Link
          to="/about/ai-transparency"
          className="text-primary underline underline-offset-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          AI transparency &amp; clinical review process
        </Link>
        .
      </p>
    </aside>
  );
}
