import { Mail } from "lucide-react";
import EmailSignupForm from "@/components/EmailSignupForm";
import { CHARITY } from "@/config/charity";

/**
 * Homepage newsletter band (growth brief § newsletter conversion system,
 * homepage placement). Reuses the settled signup mechanism
 * (EmailSignupForm → charity inbox via FormSubmit, mailto fallback).
 * Copy states only what the mechanism does: guides by email, free,
 * unsubscribe anytime. No download promise — the mechanism does not
 * deliver files. Headline differs from the blog and FAQ placements.
 */
export default function HomeNewsletterBand() {
  return (
    <section
      aria-labelledby="home-newsletter-heading"
      className="border-y border-border/40 bg-muted/30"
    >
      <div className="container mx-auto max-w-3xl px-5 md:px-10 py-10 md:py-14 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-2 inline-flex items-center justify-center gap-1.5">
          <Mail className="w-3.5 h-3.5" aria-hidden="true" /> Newsletter
        </p>
        <h2
          id="home-newsletter-heading"
          className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3"
        >
          New arthritis guides, straight to your inbox
        </h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto">
          Practical guidance on exercise, diet and flare-ups from {CHARITY.shortName} —
          registered charity {CHARITY.number}. Free, and you can unsubscribe anytime.
        </p>
        <EmailSignupForm
          sequence="homepage"
          buttonText="Get free guides"
          className="max-w-md mx-auto"
        />
      </div>
    </section>
  );
}
