import { Link } from "react-router-dom";

/**
 * Quick-access pathways for common starting points.
 * Only links to routes that exist in App.tsx.
 */
const PATHWAYS = [
  { label: "Newly diagnosed", href: "/guides/newly-diagnosed" },
  { label: "OA", href: "/conditions/osteoarthritis", full: "Osteoarthritis" },
  { label: "RA", href: "/conditions/rheumatoid-arthritis", full: "Rheumatoid arthritis" },
  { label: "PsA", href: "/conditions/psoriatic-arthritis", full: "Psoriatic arthritis" },
  { label: "JIA", href: "/conditions/juvenile-arthritis", full: "Juvenile idiopathic arthritis" },
  { label: "AS", href: "/conditions/ankylosing-spondylitis", full: "Ankylosing spondylitis" },
  { label: "PIP", href: "/guides/benefits-pip", full: "Benefits and PIP" },
  { label: "Blog", href: "/blog" },
  { label: "Donate", href: "/donate" },
] as const;

export default function HomeQuickPathways() {
  return (
    <nav
      aria-labelledby="quick-pathways-heading"
      className="border-b border-border/40 bg-background"
    >
      <div className="container mx-auto max-w-6xl px-5 md:px-10 py-6 md:py-8">
        <h2
          id="quick-pathways-heading"
          className="text-sm font-bold uppercase tracking-[0.14em] text-primary mb-3"
        >
          Quick access
        </h2>
        <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
          Jump straight to a condition guide or the newly diagnosed checklist —
          educational information only, not a diagnosis.
        </p>
        <ul className="flex flex-wrap gap-2">
          {PATHWAYS.map((p) => (
            <li key={p.href}>
              <Link
                to={p.href}
                title={"full" in p ? p.full : p.label}
                aria-label={"full" in p ? p.full : p.label}
                className="inline-flex min-h-11 items-center rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
