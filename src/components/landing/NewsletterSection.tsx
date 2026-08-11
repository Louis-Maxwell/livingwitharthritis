import { memo, useState } from "react";
import { Mail, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackNewsletterSignup } from "@/lib/analytics";


const NewsletterSection = memo(() => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { data: response, error } = await supabase.functions.invoke("submit-newsletter", {
        body: { email, source: "landing_page" },
      });

      if (error || !response?.ok) {
        throw error ?? new Error("submit-newsletter failed");
      }

      if (response.data?.alreadySubscribed) {
        toast.info("You're already subscribed!");
      } else {
        toast.success("Check your inbox to confirm your subscription.");
        setIsSubscribed(true);
        trackNewsletterSignup({ location: "landing_section" });
      }
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-3xl">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/[0.04] flex items-center justify-center mx-auto mb-10">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[3.5rem] font-display font-bold text-foreground mb-6 tracking-tight leading-[1.06]">
            A kind letter, <span className="text-primary italic">once a week</span>
          </h2>
          <p className="text-muted-foreground mb-14 max-w-md mx-auto leading-relaxed text-base sm:text-lg">
            Gentle tips for living with arthritis, real stories from our community, and small things that help — sent straight to your inbox, never more than once a week.
          </p>

          {isSubscribed ? (
            <div className="flex items-center justify-center gap-3 p-10 rounded-2xl bg-card border border-primary/8 animate-in fade-in zoom-in-95 duration-300">
              <CheckCircle className="w-6 h-6 text-primary" />
              <span className="text-foreground font-semibold text-lg">Almost there — check your inbox to confirm.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full h-[58px] px-8 bg-card text-foreground border-border/20 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                required
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full h-[58px] px-10 btn-primary-cta text-sm font-bold tracking-wider"
              >
                {isSubmitting ? "Subscribing…" : (
                  <>Subscribe <ArrowRight className="w-4 h-4 ms-1.5" /></>
                )}
              </Button>
            </form>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 mt-12 text-[10px] text-muted-foreground tracking-[0.15em] uppercase">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Join 2,000+ subscribers
            </span>
            <span>·</span>
            No spam, ever
            <span>·</span>
            Unsubscribe anytime
          </div>
        </div>
      </div>
    </section>
  );
});

NewsletterSection.displayName = "NewsletterSection";
export default NewsletterSection;
