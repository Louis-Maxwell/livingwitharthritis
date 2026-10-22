import { Link } from "react-router-dom";
import { BookOpen, Heart } from "lucide-react";

interface BlogSoftCTAsProps {
  /** Compact layout for mid-index insertion */
  variant?: "banner" | "inline";
  className?: string;
}

/**
 * "Where next" links + soft donate ask for the blog section.
 * No email signup or newsletter prompt (site policy, Oct 2026): readers who
 * finish a list should get a useful next page, not a form.
 */
const START_HERE = [
  { to: "/guides", label: "Evidence-based health guides" },
  { to: "/conditions/osteoarthritis", label: "Osteoarthritis explained" },
  { to: "/conditions/rheumatoid-arthritis", label: "Rheumatoid arthritis explained" },
  { to: "/chat", label: "Help & support" },
];

const DonateLink = ({ primary = false }: { primary?: boolean }) => (
  <a
    href="https://www.gofundme.com/f/help-fund-critical-arthritis-research"
    target="_blank"
    rel="noopener noreferrer"
    className={
      primary
        ? "inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        : "inline-flex min-h-11 items-center justify-center rounded-full border border-primary/30 px-4 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    }
  >
    {primary && <Heart className="w-4 h-4" aria-hidden="true" />}
    {primary ? "Donate on GoFundMe" : "Donate"}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

const StartHereList = () => (
  <ul className="grid gap-2 sm:grid-cols-2">
    {START_HERE.map((l) => (
      <li key={l.to}>
        <Link
          to={l.to}
          className="flex min-h-11 items-center rounded-lg border border-border/50 bg-background px-3 text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {l.label}
        </Link>
      </li>
    ))}
  </ul>
);

const BlogSoftCTAs = ({ variant = "banner", className = "" }: BlogSoftCTAsProps) => {
  if (variant === "inline") {
    return (
      <aside aria-label="Where to go next" className={`rounded-2xl border border-border/40 bg-card p-5 md:p-6 ${className}`}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-1.5 inline-flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" aria-hidden="true" /> Start here
            </p>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">Not sure which guide to read?</h2>
            <StartHereList />
          </div>
          <div className="lg:w-56 shrink-0 rounded-xl border border-primary/15 bg-primary/[0.03] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-1.5 inline-flex items-center gap-1.5">
              <Heart className="w-3 h-3" aria-hidden="true" /> Support
            </p>
            <p className="text-sm text-foreground/85 leading-relaxed mb-3">
              If our guides help, a gift keeps them free for readers.
            </p>
            <DonateLink />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside aria-label="Where to go next and donate" className={`mt-14 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 md:p-8 ${className}`}>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2 inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" /> Start here
          </p>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">Popular places to start</h2>
          <StartHereList />
        </div>
        <div className="flex flex-col justify-center rounded-xl border border-border/40 bg-card/80 p-5 md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2 inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5" aria-hidden="true" /> Soft ask
          </p>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">Keep this advice free</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Honest guides stay free when readers who can, chip in.
          </p>
          <DonateLink primary />
        </div>
      </div>
    </aside>
  );
};

export default BlogSoftCTAs;
