import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { CHARITY } from "@/config/charity";

/**
 * Homepage trust strip (P1-07) — immediately under the hero.
 * Honest E-E-A-T signals only; no invented stats or testimonials.
 */
export default function HomeTrustStrip() {
  return (
    <aside
      aria-labelledby="home-trust-heading"
      className="border-b border-border/50 bg-muted/40"
    >
      <div className="container mx-auto max-w-6xl px-5 md:px-10 py-4 md:py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
          <span
            className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
            aria-hidden="true"
          >
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id="home-trust-heading"
              className="text-sm font-bold tracking-tight text-foreground"
            >
              Why you can trust this site
            </h2>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-xs sm:text-sm text-foreground/85 leading-relaxed">
              <li>
                <a
                  href={CHARITY.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                >
                  Charity {CHARITY.number}
                </a>
              </li>
              <li aria-hidden="true" className="text-muted-foreground">
                ·
              </li>
              <li>
                Reviewed by{" "}
                <Link
                  to="/authors/maxwell"
                  className="underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                >
                  Louis Maxwell HCPC PH128483
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted-foreground">
                ·
              </li>
              <li>Educational information — not a diagnosis</li>
              <li aria-hidden="true" className="text-muted-foreground">
                ·
              </li>
              <li>Independent of Arthritis UK</li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              <Link
                to="/editorial-standards"
                className="font-semibold text-foreground underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              >
                Editorial standards
              </Link>
              {" · "}
              <Link
                to="/about"
                className="font-semibold text-foreground underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              >
                About us
              </Link>
              {" · "}
              <Link
                to="/trust"
                className="font-semibold text-foreground underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              >
                Trust &amp; credibility
              </Link>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
