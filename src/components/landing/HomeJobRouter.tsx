import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { trackDonationClick, trackStartHereCard } from "@/lib/ga-events";
import { MORE_TOPICS, VISITOR_JOBS, type VisitorJob } from "./homeJobs";

/**
 * Visitor-job router — the homepage's main navigation for people living
 * with arthritis and their carers. One card per real visitor job; every
 * href points at an existing route or published post (checked against the
 * live sitemap). Donate is last and never styled louder than help.
 * See docs/CUSTOMER-FIRST.md.
 */

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

function track(job: VisitorJob, link: { label: string; href: string }) {
  if (job.id === "donate") {
    trackDonationClick({ source: link.href === job.href ? "home_router_card" : "home_router_link" });
  }
  trackStartHereCard(link.label, link.href);
}

export default function HomeJobRouter() {
  return (
    <section
      id="find-help"
      aria-labelledby="find-help-heading"
      className="scroll-mt-28 bg-background py-10 md:py-14"
    >
      <div className="container mx-auto max-w-6xl px-5 md:px-10">
        <h2
          id="find-help-heading"
          tabIndex={-1}
          className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight focus:outline-none"
        >
          What do you need today?
        </h2>
        <p className="mt-2 text-base text-muted-foreground max-w-2xl">
          Pick the one that fits. Each goes straight to a free guide — no sign-up, no quiz.
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VISITOR_JOBS.map((job) => {
            const Icon = job.icon;
            const isDonate = job.id === "donate";
            return (
              <li
                key={job.id}
                className={`flex min-w-0 flex-col rounded-2xl border p-4 sm:p-5 transition-shadow hover:shadow-md ${
                  isDonate ? "border-border/60 bg-muted/40" : "border-border/60 bg-card"
                }`}
              >
                <Link
                  to={job.href}
                  onClick={() => track(job, { label: job.title, href: job.href })}
                  className={`group grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 sm:flex sm:flex-col sm:gap-2 rounded-lg ${focusRing}`}
                >
                  <span
                    className="row-span-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {job.title}
                    <ArrowRight
                      className="ml-1 inline h-4 w-4 align-[-2px] transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{job.desc}</p>
                </Link>
                <ul
                  className="mt-3 flex flex-wrap gap-x-4 border-t border-border/50 pt-1 sm:flex-col sm:gap-x-0"
                  aria-label={`More on: ${job.title}`}
                >
                  {job.more.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => track(job, link)}
                          className={`inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-semibold text-foreground underline underline-offset-2 hover:text-primary ${focusRing}`}
                        >
                          {link.label}
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          onClick={() => track(job, link)}
                          className={`inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-foreground underline underline-offset-2 hover:text-primary ${focusRing}`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <nav aria-label="More topics" className="mt-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Looking for something else?</span>
          </p>
          <ul className="mt-1 flex flex-wrap gap-x-5">
            {MORE_TOPICS.map((t) => (
              <li key={t.href}>
                <Link
                  to={t.href}
                  onClick={() => trackStartHereCard(t.label, t.href)}
                  className={`inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-foreground underline underline-offset-2 hover:text-primary ${focusRing}`}
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
