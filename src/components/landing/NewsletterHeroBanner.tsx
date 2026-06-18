import { memo, useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackEmailSignup } from "@/lib/ga-events";

type PrefKey = "exercise" | "flare" | "recipes" | "research";
const PREFS: { key: PrefKey; label: string }[] = [
  { key: "exercise", label: "Weekly exercise tips" },
  { key: "flare", label: "Flare management" },
  { key: "recipes", label: "New recipes" },
  { key: "research", label: "Research updates" },
];

/**
 * Slim above-the-fold newsletter banner. Sits directly after the hero
 * to capture intent while it's highest. The full NewsletterSection
 * remains lower on the page as a fallback.
 */
const NewsletterHeroBanner = memo(() => {
  const [email, setEmail] = useState("");
  const [prefs, setPrefs] = useState<Set<PrefKey>>(new Set());
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const togglePref = (k: PrefKey) =>
    setPrefs((cur) => {
      const next = new Set(cur);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || busy) return;
    setBusy(true);
    try {
      const selected = Array.from(prefs);
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .insert({
          email,
          source: "hero_banner",
          categories: selected,
        });
      if (error && error.code !== "23505") throw error;
      trackEmailSignup(selected.join(",") || "general", "hero_banner");
      setDone(true);
      setEmail("");
      toast.success("Thanks — check your inbox to confirm.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      aria-label="Free weekly arthritis tips by email"
      className="bg-muted/30 border-b border-border/40 py-8 lg:py-10"
    >
      <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          <div className="flex items-start gap-4 lg:flex-1">
            <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-tight">
                Get weekly arthritis tips — free
              </h2>
              <p className="text-sm text-foreground/60 mt-1">
                Clinically reviewed. Plain English. One short email a week.
              </p>
            </div>
          </div>

          {done ? (
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground lg:flex-1 lg:justify-end">
              <CheckCircle2 className="w-5 h-5 text-primary" aria-hidden="true" />
              You're in — confirm via the email we just sent.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="lg:flex-1 w-full">
              <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="hero-email" className="sr-only">Your email</label>
                <input
                  id="hero-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 min-h-11 h-12 px-5 rounded-full bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  disabled={busy}
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="min-h-11 h-12 px-6 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:bg-primary/95 disabled:opacity-60 inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  {busy ? "Subscribing…" : (<>Subscribe <ArrowRight className="w-4 h-4" /></>)}
                </button>
              </div>
              <fieldset className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                <legend className="sr-only">Optional interests</legend>
                {PREFS.map((p) => (
                  <label
                    key={p.key}
                    className="inline-flex items-center gap-2 text-xs text-foreground/70 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={prefs.has(p.key)}
                      onChange={() => togglePref(p.key)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary/40"
                    />
                    {p.label}
                  </label>
                ))}
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </section>
  );
});

NewsletterHeroBanner.displayName = "NewsletterHeroBanner";
export default NewsletterHeroBanner;
