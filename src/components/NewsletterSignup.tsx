import { useState } from "react";
import { z } from "zod";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackEvent, trackNewsletterSignup } from "@/lib/analytics";

/**
 * Newsletter signup with interest segmentation and GDPR consent.
 * Writes to `newsletter_subscriptions` (anon INSERT policy enforces
 * `confirmation_token IS NULL` so we set categories + source only;
 * verification is handled server-side later).
 *
 * Variants:
 *  - `band`    : full-width hero strip (homepage)
 *  - `card`    : sidebar / inline card
 *  - `compact` : footer/inline minimal (email + interests collapsed)
 */
export type NewsletterVariant = "band" | "card" | "compact";

interface NewsletterSignupProps {
  variant?: NewsletterVariant;
  source?: string;
  /** Optional heading override. */
  heading?: string;
  /** Optional sub-heading override. */
  subheading?: string;
}

const INTERESTS = [
  { id: "osteoarthritis", label: "Osteoarthritis" },
  { id: "rheumatoid", label: "Rheumatoid Arthritis" },
  { id: "pain-relief", label: "Pain Relief & Recovery" },
  { id: "nutrition", label: "Nutrition & Diet" },
  { id: "exercise", label: "Exercise & Movement" },
  { id: "mental-health", label: "Emotional Wellbeing" },
  { id: "work", label: "Work & Career" },
] as const;

const FormSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
  categories: z.array(z.string()).max(20),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please tick the consent box to subscribe" }),
  }),
});

export default function NewsletterSignup({
  variant = "card",
  source = "site",
  heading,
  subheading,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = FormSchema.safeParse({ email, categories, consent });
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? "Please check the form");
      return;
    }

    setStatus("loading");
    const { error: insertError } = await supabase
      .from("newsletter_subscriptions")
      .insert({
        email: parsed.data.email.toLowerCase(),
        categories: parsed.data.categories.length
          ? parsed.data.categories
          : ["general"],
        source,
        is_active: true,
        frequency: "weekly",
      });

    if (insertError) {
      // Unique-violation = already subscribed (still a success from the user's POV).
      if (insertError.code === "23505") {
        setStatus("success");
        return;
      }
      setStatus("error");
      setError("Something went wrong. Please try again in a moment.");
      return;
    }

    setStatus("success");
    // Legacy custom event (kept for existing dashboards) + canonical GA4 conversion.
    trackEvent("newsletter_signup", {
      source,
      interests: categories.join(",") || "general",
    });
    trackNewsletterSignup({ location: source, interests: categories.length });
  };

  if (status === "success") {
    return (
      <div
        className={[
          "flex items-start gap-3 rounded-xl border border-primary/30 bg-accent/30 p-5 text-foreground",
          variant === "band" ? "max-w-2xl mx-auto" : "",
        ].join(" ")}
        role="status"
      >
        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" aria-hidden />
        <div>
          <p className="font-bold text-foreground">Thanks for subscribing.</p>
          <p className="text-sm text-muted-foreground mt-1">
            You’ll get a confirmation email shortly. If it doesn’t arrive,
            check your spam folder or email us at info@livingwitharthritis.org.uk.
          </p>
        </div>
      </div>
    );
  }

  const headingText = heading ?? "Get our weekly arthritis updates";
  const subText =
    subheading ??
    "Evidence-based tips, new guides, and patient stories — straight to your inbox. Pick the topics that matter to you. Unsubscribe any time.";

  const wrapperClass =
    variant === "band"
      ? "w-full bg-accent/30 border-y border-border py-12 md:py-16"
      : variant === "compact"
      ? "rounded-lg border border-border bg-card p-5"
      : "rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm";

  return (
    <section className={wrapperClass} aria-labelledby="newsletter-heading">
      <div
        className={
          variant === "band" ? "container mx-auto px-4 max-w-3xl text-center" : ""
        }
      >
        <div
          className={`flex items-center gap-3 ${
            variant === "band" ? "justify-center" : ""
          } mb-3`}
        >
          <Mail className="w-5 h-5 text-primary" aria-hidden />
          <h2
            id="newsletter-heading"
            className="font-display text-xl md:text-2xl font-black text-foreground"
          >
            {headingText}
          </h2>
        </div>
        <p
          className={`text-sm md:text-base text-muted-foreground mb-6 ${
            variant === "band" ? "max-w-xl mx-auto" : ""
          }`}
        >
          {subText}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div
            className={
              variant === "band"
                ? "flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
                : "flex flex-col sm:flex-row gap-3"
            }
          >
            <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
              Email address
            </label>
            <Input
              id={`newsletter-email-${variant}`}
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-11"
              aria-invalid={Boolean(error)}
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden />
                  Subscribing…
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>

          {variant !== "compact" && (
            <fieldset className="text-start">
              <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                I’m interested in (optional)
              </legend>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => {
                  const checked = categories.includes(i.id);
                  return (
                    <label
                      key={i.id}
                      className={`cursor-pointer select-none rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        checked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary/60"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggleCategory(i.id)}
                      />
                      {i.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-primary"
              required
            />
            <span>
              I agree to receive arthritis updates by email and have read the{" "}
              <a href="/privacy" className="underline hover:text-foreground">
                privacy notice
              </a>
              . Unsubscribe any time.
            </span>
          </label>

          {error && (
            <p role="alert" className="text-xs text-primary font-semibold">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
