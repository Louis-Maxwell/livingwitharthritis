import { Link } from "react-router-dom";
import { Activity, BookOpen, Wallet, Heart } from "lucide-react";
import { trackDonationClick, trackStartHereCard } from "@/lib/ga-events";

/**
 * Customer-first job pathways — visible within one screen under the hero.
 * Help jobs outrank donate. Labels match real visitor jobs, not SEO vanity.
 */
type HelpJob = {
  id: string;
  label: string;
  sub: string;
  href: string;
  icon: typeof Activity;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const HELP_JOBS: HelpJob[] = [
  {
    id: "pain",
    label: "I'm in pain / need relief now",
    sub: "Gentle exercises and pain-relief guidance",
    href: "/guides/arthritis-pain-relief",
    secondaryHref: "/exercises",
    secondaryLabel: "Exercise hub",
    icon: Activity,
  },
  {
    id: "newly",
    label: "Newly diagnosed / understand my condition",
    sub: "Calm orientation and condition guides",
    href: "/guides/newly-diagnosed",
    secondaryHref: "/conditions/arthritis",
    secondaryLabel: "Conditions",
    icon: BookOpen,
  },
  {
    id: "money",
    label: "Money & benefits (PIP)",
    sub: "Eligibility, evidence, claiming and appeals",
    href: "/benefits-pip",
    icon: Wallet,
  },
];

export default function HomeQuickPathways() {
  return (
    <nav
      aria-labelledby="quick-pathways-heading"
      className="border-b border-border/40 bg-background"
    >
      <div className="container mx-auto max-w-6xl px-5 md:px-10 py-6 md:py-8">
        <h2
          id="quick-pathways-heading"
          className="text-sm font-bold uppercase tracking-[0.14em] text-primary mb-2"
        >
          What do you need today?
        </h2>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
          Three help pathways first — then a quiet way to support the charity if you can.
          Educational information only, not a diagnosis.
        </p>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HELP_JOBS.map((job) => {
            const Icon = job.icon;
            return (
              <li key={job.id} className="min-w-0">
                <div className="flex h-full min-h-[5.5rem] flex-col gap-1 rounded-xl border border-border/60 bg-card p-4 sm:p-5 hover:border-primary/50 hover:shadow-md transition-all">
                  <Link
                    to={job.href}
                    onClick={() => trackStartHereCard(job.label, job.href)}
                    className="group flex flex-col gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
                  >
                    <span className="inline-flex items-center gap-2 text-primary">
                      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <span className="text-xs font-bold uppercase tracking-wide">Help</span>
                    </span>
                    <span className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {job.label}
                    </span>
                    <span className="text-sm text-muted-foreground leading-snug">{job.sub}</span>
                  </Link>
                  {job.secondaryHref && job.secondaryLabel ? (
                    <p className="mt-1 text-xs font-semibold text-foreground/80">
                      Also:{" "}
                      <Link
                        to={job.secondaryHref}
                        className="underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm min-h-11 inline-flex items-center"
                        onClick={() =>
                          trackStartHereCard(job.secondaryLabel!, job.secondaryHref!)
                        }
                      >
                        {job.secondaryLabel}
                      </Link>
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Soft secondary — never louder than help pathways */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          <Heart className="h-4 w-4 text-muted-foreground/80" aria-hidden="true" />
          <span>If you can spare a moment:</span>
          <Link
            to="/donate"
            onClick={() => trackDonationClick({ source: "home_pathways_soft" })}
            className="font-medium text-foreground/80 underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm min-h-11 inline-flex items-center"
          >
            Donate / research fund
          </Link>
          <span aria-hidden="true" className="opacity-40">
            ·
          </span>
          <Link
            to="/conditions/osteoarthritis"
            className="font-medium text-foreground/80 underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm min-h-11 inline-flex items-center"
          >
            OA
          </Link>
          <Link
            to="/conditions/rheumatoid-arthritis"
            className="font-medium text-foreground/80 underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm min-h-11 inline-flex items-center"
          >
            RA
          </Link>
          <Link
            to="/conditions/psoriatic-arthritis"
            className="font-medium text-foreground/80 underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm min-h-11 inline-flex items-center"
          >
            PsA
          </Link>
        </div>
      </div>
    </nav>
  );
}
