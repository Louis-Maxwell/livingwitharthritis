import { Link } from "react-router-dom";
import { recommendedNextSteps } from "@/lib/recommendedNextSteps.mjs";

interface RecommendedNextStepProps {
  /** Current route, used to pick onward links (never links to itself). */
  path: string;
  /** Optional title/keywords to choose sensible defaults. */
  context?: string;
  /** "mid" sits between article sections; "end" closes the guide. */
  placement?: "mid" | "end";
  className?: string;
}

/**
 * Accessible, high-contrast "Recommended next step" module. Plain links,
 * no scroll listeners or lazy loading, so it renders in prerendered HTML
 * and costs nothing for LCP.
 */
export default function RecommendedNextStep({
  path,
  context = "",
  placement = "mid",
  className = "",
}: RecommendedNextStepProps) {
  const links = recommendedNextSteps(path, context);
  if (!links.length) return null;
  const headingId = `recommended-next-step-${placement}`;
  return (
    <nav
      aria-labelledby={headingId}
      data-recommended-next-step={placement}
      className={`not-prose my-10 rounded-xl border-2 border-foreground bg-background p-5 md:p-6 text-foreground print:hidden ${className}`}
    >
      <h2 id={headingId} className="font-display text-lg md:text-xl font-bold text-foreground m-0 mb-3">
        Recommended next step
      </h2>
      <ul className="m-0 p-0 list-none space-y-3">
        {links.map((link) => (
          <li key={link.href} className="m-0">
            <Link
              to={link.href}
              className="text-base md:text-lg font-semibold text-primary underline underline-offset-4 decoration-2 hover:decoration-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              {link.label}
            </Link>
            <p className="m-0 mt-1 text-sm md:text-base text-foreground">{link.description}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}
