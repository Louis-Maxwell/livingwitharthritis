import { memo, useState } from "react";
import { motion } from "framer-motion";
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
    <section className="py-14 lg:py-20 bg-tint-lavender section-divider relative overflow-hidden">
      {/* Subtle decorative shapes */}
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-secondary/[0.03] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-7">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-5">
            Stay <span className="text-primary italic">informed</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
            Get weekly tips on managing arthritis, new research updates, and community stories — straight to your inbox.
          </p>

          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-card border border-primary/10"
            >
              <CheckCircle className="w-6 h-6 text-primary" />
              <span className="text-foreground font-semibold">You're subscribed! Check your inbox soon.</span>
            </motion.div>
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

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-[11px] text-muted-foreground/60">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Join 2,000+ subscribers
            </span>
            <span>•</span>
            <span>No spam, ever</span>
            <span>•</span>
            <span>Unsubscribe anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

NewsletterSection.displayName = "NewsletterSection";
export default NewsletterSection;