import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Gift, CheckCircle2, BookOpen, Apple, Dumbbell, Loader2 } from "lucide-react";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "lwa-exit-intent-v1";
const DISMISS_DAYS = 30;
const EXCLUDED_PATHS = ["/auth", "/admin", "/donation-result", "/unsubscribe", "/checkout"];

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
  const armedRef = useRef(false);
  const { toast } = useToast();
  const location = useLocation();

  const isExcluded = EXCLUDED_PATHS.some((p) => location.pathname.startsWith(p));

  const trigger = useCallback(() => {
    if (!armedRef.current) return;
    armedRef.current = false;
    markShown();
    setOpen(true);
  }, []);

  useEffect(() => {
    if (isExcluded) return;
    if (wasRecentlyShown()) return;

    // Arm after 8s on page so we don't catch instant-bouncers (likely bots)
    const armTimer = window.setTimeout(() => {
      armedRef.current = true;
    }, 8000);

    // Desktop: mouse leaves through the top of the viewport
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && (!e.relatedTarget)) trigger();
    };

    // Mobile: detect rapid scroll-up after meaningful scroll-down (back-button intent proxy)
    let lastY = window.scrollY;
    let maxY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > maxY) maxY = y;
      // Trigger when user has scrolled >600px and then quickly scrolls up >250px
      if (maxY > 600 && lastY - y > 250) trigger();
      lastY = y;
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
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .upsert({ email: parsed.data, source: "exit_intent", is_active: true }, { onConflict: "email" });

      if (error) throw error;

      setSuccess(true);
      toast({
        title: "Check your inbox",
        description: "Your free Arthritis Starter Guide is on its way.",
      });
    } catch (err) {
      console.error("[ExitIntent] subscribe error", err);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-2 border-primary/20">
        {/* Top accent band */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-primary/90 px-6 pt-7 pb-6 text-primary-foreground">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-2xl" aria-hidden />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/5 blur-2xl" aria-hidden />
          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-90">
              Wait — before you go
            </p>
          </div>
          <h2 className="relative font-display text-2xl md:text-[26px] font-bold leading-tight">
            Get your free Arthritis Starter Guide
          </h2>
          <p className="relative text-sm opacity-95 mt-2 leading-relaxed">
            A 14-page UK guide with NHS-aligned advice, anti-inflammatory meal ideas, and gentle exercise plans.
          </p>
        </div>

        <div className="p-6 bg-background">
          {!success ? (
            <>
              <ul className="space-y-2.5 mb-5">
                {[
                  { icon: BookOpen, text: "Plain-English NHS pathway explained" },
                  { icon: Apple, text: "Mediterranean meal ideas for joint pain" },
                  { icon: Dumbbell, text: "5-minute daily mobility routines" },
                ].map(({ icon: Icon, text }) => (
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
                    "Send my free guide"
                  )}
                </Button>
              </form>

              <p className="text-[11px] text-muted-foreground mt-3 text-center leading-relaxed">
                No spam. Unsubscribe anytime. We never share your email.
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">You're on the list</h3>
              <p className="text-sm text-muted-foreground mb-5">
                Your free Arthritis Starter Guide is on its way. Check your inbox in the next few minutes.
              </p>
              <Button variant="outline" onClick={() => setOpen(false)} className="w-full">
                Continue browsing
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
