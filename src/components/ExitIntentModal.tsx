import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Gift, Loader2 } from "lucide-react";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";
import { EXIT_INTENT_VARIANTS, getOrAssignVariant, type ExitIntentVariantId } from "@/lib/exitIntentVariants";
import ExitIntentSuccess from "./ExitIntentSuccess";

const STORAGE_KEY = "lwa-exit-intent-v1";
const DISMISS_DAYS = 30;
const EXCLUDED_PATHS = ["/auth", "/admin", "/donation-result", "/unsubscribe", "/checkout", "/arthritis-starter-guide"];

const emailSchema = z.string().trim().email({ message: "Please enter a valid email" }).max(255);

const wasRecentlyShown = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    if (Number.isNaN(ts)) return false;
    return Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
};

const markShown = () => {
  try {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  } catch { /* ignore */ }
};

const ExitIntentModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [variantId] = useState<ExitIntentVariantId>(() => getOrAssignVariant());
  const variant = EXIT_INTENT_VARIANTS[variantId];
  const armedRef = useRef(false);
  const exposureTrackedRef = useRef(false);
  const { toast } = useToast();
  const location = useLocation();

  const isExcluded = EXCLUDED_PATHS.some((p) => location.pathname.startsWith(p));

  // Track variant exposure once per session so we can compute conversion-rate denominators per arm.
  useEffect(() => {
    if (isExcluded || exposureTrackedRef.current) return;
    exposureTrackedRef.current = true;
    trackEvent("exit_intent_variant_exposed", { variant: variantId });
  }, [isExcluded, variantId]);

  const trigger = useCallback(() => {
    if (!armedRef.current) return;
    armedRef.current = false;
    markShown();
    setOpen(true);
    trackEvent("exit_intent_open", {
      path: location.pathname,
      viewport: typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop",
      variant: variantId,
    });
  }, [location.pathname, variantId]);

  useEffect(() => {
    if (isExcluded) return;
    if (wasRecentlyShown()) return;

    // Arm after 12s on page so we skip instant-bouncers and accidental swipes.
    // (Analytics: pages-per-visit ~1.17 and ~90% bounce → most "exits" are not real intent.)
    const armTimer = window.setTimeout(() => {
      armedRef.current = true;
    }, 12000);

    // Desktop: mouse leaves through the top of the viewport with clear upward velocity.
    // Filters out users who park the cursor near the top to read or use browser chrome.
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY > 0) return;
      if (e.relatedTarget) return;
      if (e.movementY > -8) return; // require a real upward flick, not a slow drift
      trigger();
    };

    // Mobile: detect a *fast* scroll-up after meaningful scroll-down.
    // Tightened to filter out address-bar reveal, pull-to-refresh, and elastic bounces.
    let lastY = window.scrollY;
    let lastT = performance.now();
    let maxY = window.scrollY;
    let cooldownUntil = 0;
    const handleScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      if (y > maxY) maxY = y;

      if (now < cooldownUntil) {
        lastY = y;
        lastT = now;
        return;
      }

      const dy = lastY - y; // positive = scrolled up
      const dt = now - lastT;

      // Require: scrolled past 900px, then a sharp upward burst (>400px in <400ms).
      if (maxY > 900 && dy > 400 && dt < 400) {
        cooldownUntil = now + 1500; // ignore further bursts for 1.5s
        trigger();
      }

      lastY = y;
      lastT = now;
    };

    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isExcluded, trigger, location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast({
        title: "Invalid email",
        description: parsed.error.issues[0]?.message ?? "Please check your email address.",
        variant: "destructive",
      });
      trackEvent("exit_intent_submit_failure", {
        reason: "invalid_email",
        path: location.pathname,
        variant: variantId,
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .upsert({ email: parsed.data, source: variant.source, is_active: true }, { onConflict: "email" });

      if (error) throw error;

      setSuccess(true);
      toast({
        title: "Check your inbox",
        description: variant.successBody,
      });
      trackEvent("exit_intent_submit_success", {
        source: variant.source,
        path: location.pathname,
        variant: variantId,
      });
      trackEvent("generate_lead", { method: "exit_intent", variant: variantId });
    } catch (err) {
      console.error("[ExitIntent] subscribe error", err);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
      trackEvent("exit_intent_submit_failure", {
        reason: "supabase_error",
        message: err instanceof Error ? err.message : "unknown",
        path: location.pathname,
        variant: variantId,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-2 border-primary/20" data-variant={variantId}>
        <div className="relative bg-gradient-to-br from-primary via-primary to-primary/90 px-6 pt-7 pb-6 text-primary-foreground">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary-foreground/10 blur-2xl" aria-hidden />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-primary-foreground/5 blur-2xl" aria-hidden />
          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-primary-foreground/15 backdrop-blur flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-90">
              {variant.eyebrow}
            </p>
          </div>
          <h2 className="relative font-display text-2xl md:text-[26px] font-bold leading-tight">
            {variant.headline}
          </h2>
          <p className="relative text-sm opacity-95 mt-2 leading-relaxed">
            {variant.subheadline}
          </p>
        </div>

        <div className="p-6 bg-background">
          {!success ? (
            <>
              <ul className="space-y-2.5 mb-5">
                {variant.bullets.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-0.5 inline-flex w-6 h-6 rounded-lg bg-primary/10 text-primary items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="leading-snug">{text}</span>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                  className="h-12 text-base"
                  aria-label="Email address"
                />
                <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    variant.ctaLabel
                  )}
                </Button>
              </form>

              <p className="text-[11px] text-muted-foreground mt-3 text-center leading-relaxed">
                No spam. Unsubscribe anytime. We never share your email.
              </p>
            </>
          ) : (
            <ExitIntentSuccess
              variant={variant}
              variantId={variantId}
              onClose={() => setOpen(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
