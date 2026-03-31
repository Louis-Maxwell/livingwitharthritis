import { memo, useState } from "react";
import { Mail, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const NewsletterSection = memo(() => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .insert({ email, source: "landing_page" });

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Welcome! You'll receive our next update soon.");
        setIsSubscribed(true);
      }
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-spacer relative">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-5">
            Stay <span className="text-primary italic">informed</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
            Get weekly tips on managing arthritis, new research updates, and community stories — straight to your inbox.
          </p>

          {isSubscribed ? (
            <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-card border border-primary/10 animate-in fade-in zoom-in-95 duration-300">
              <CheckCircle className="w-6 h-6 text-primary" />
              <span className="text-foreground font-semibold">You're subscribed! Check your inbox soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full h-13 px-6 bg-card text-foreground border-border/40 text-sm focus:ring-2 focus:ring-primary/30 transition-colors placeholder:text-muted-foreground"
                required
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full h-13 px-7 btn-primary-cta text-sm font-bold tracking-wider"
              >
                {isSubmitting ? "Subscribing…" : (
                  <>Subscribe <ArrowRight className="w-4 h-4 ml-1.5" /></>
                )}
              </Button>
            </form>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-[11px] text-muted-foreground/60">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Join 2,000+ subscribers
            </span>
            <span>•</span>
            <span>No spam, ever</span>
            <span>•</span>
            <span>Unsubscribe anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
});

NewsletterSection.displayName = "NewsletterSection";
export default NewsletterSection;
