import { Link } from "react-router-dom";

/**
 * Calm end-of-article call to action. Points readers to existing site pages
 * only: local support, contact, and donating to the charity.
 */
export default function PostSupportCTA() {
  return (
    <section
      aria-labelledby="post-support-cta-heading"
      className="my-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6 no-print"
      data-testid="post-support-cta"
    >
      <h2 id="post-support-cta-heading" className="font-display text-lg font-bold text-foreground">
        You don't have to manage arthritis alone
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Find support groups and services near you, ask us a question, or help us keep these free guides going.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          to="/arthritis-support"
          className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Find support near you
        </Link>
        <Link
          to="/contact"
          className="inline-flex min-h-11 items-center rounded-full border border-primary/40 px-5 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Contact us
        </Link>
        <Link
          to="/donate"
          className="inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Donate
        </Link>
      </div>
    </section>
  );
}
