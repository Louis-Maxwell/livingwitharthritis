import { Link } from "react-router-dom";
import { BadgeCheck, Landmark, Stethoscope, HandCoins, Scale } from "lucide-react";
import { CHARITY } from "@/config/charity";

/**
 * Homepage trust strip (P1-07) — immediately under the hero.
 * Honest E-E-A-T signals only: every item is a verifiable fact already
 * published on the site. No invented stats, counts or testimonials.
 */
const linkCls =
  "underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm";

export default function HomeTrustStrip() {
  return (
    <aside aria-labelledby="home-trust-heading" className="border-b border-border/50 bg-muted/40">
      <div className="container mx-auto max-w-6xl px-5 md:px-10 py-5 md:py-6">
        <h2 id="home-trust-heading" className="text-sm font-bold tracking-tight text-foreground">
          Why you can trust this site
        </h2>
        <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-4 text-sm text-foreground leading-snug">
          <li className="flex items-start gap-2">
            <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <a
                href={CHARITY.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                Living With Arthritis UK (charity {CHARITY.number})
                <span className="sr-only"> (opens the Charity Commission register in a new tab)</span>
              </a>
              {" "}— registered in England and Wales
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>
              Reviewed by{" "}
              <Link to="/authors/maxwell" className={linkCls}>
                Louis Maxwell, HCPC-registered physiotherapist (PH128483)
              </Link>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <HandCoins className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>Free to use — no paywall, no app download</span>
          </li>
          <li className="flex items-start gap-2">
            <Scale className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>Independent of Arthritis UK. Educational information — not a diagnosis</span>
          </li>
        </ul>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
          <Link
            to="/editorial-standards"
            className={`font-semibold text-foreground inline-flex items-center min-h-11 ${linkCls}`}
          >
            How we write and check our guides
          </Link>
          <Link
            to="/about"
            className={`font-semibold text-foreground inline-flex items-center min-h-11 ${linkCls}`}
          >
            About us
          </Link>
        </p>
      </div>
    </aside>
  );
}
