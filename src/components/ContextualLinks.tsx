import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface ContextualLink {
  /** Anchor text — should be a target keyword phrase */
  label: string;
  /** Internal path */
  to: string;
  /** Short reason to click */
  desc?: string;
}

export interface ContextualLinkGroup {
  title: string;
  links: ContextualLink[];
}

interface ContextualLinksProps {
  /** Section heading shown above the groups */
  heading?: string;
  /** Short intro under the heading */
  intro?: string;
  groups: ContextualLinkGroup[];
  /** Optional id for in-page anchoring */
  id?: string;
  /** Background tint variant */
  variant?: "default" | "muted";
}

/**
 * Contextual internal-link block for SEO + UX.
 * Renders 2–4 keyword-themed groups of internal links.
 */
export default function ContextualLinks({
  heading = "Related guidance",
  intro,
  groups,
  id,
  variant = "default",
}: ContextualLinksProps) {
  const bg =
    variant === "muted"
      ? "bg-muted/30 border-border/40"
      : "bg-primary/[0.03] border-primary/15";

  return (
    <section
      id={id}
      aria-label={heading}
      className={`mt-12 rounded-2xl border ${bg} p-6 md:p-8`}
    >
      <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
        {heading}
      </h2>
      {intro && (
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-3xl">
          {intro}
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-3">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.to + link.label}>
                  <Link
                    to={link.to}
                    className="group flex items-start gap-2 text-sm text-foreground hover:text-primary transition-colors leading-snug"
                  >
                    <ArrowRight className="w-3.5 h-3.5 mt-1 text-primary group-hover:translate-x-0.5 transition-transform shrink-0" />
                    <span>
                      <span className="font-medium underline-offset-4 group-hover:underline">
                        {link.label}
                      </span>
                      {link.desc && (
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {link.desc}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
