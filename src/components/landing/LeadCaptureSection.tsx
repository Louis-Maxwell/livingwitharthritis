import { memo, useState } from "react";
import { toast } from "sonner";
import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const includes = [
  "Daily arthritis management checklist (printable PDF)",
  "7-day anti-inflammatory meal plan",
  "Morning joint mobility routine",
  "Flare-up action plan template",
];

const LeadCaptureSection = memo(() => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const { error: dbError } = await supabase
        .from("newsletter_subscriptions")
        .insert({ email: trimmed, source: "lead_capture_checklist" });

      if (dbError) {
        if (dbError.code === "23505") {
          setSubmitted(true);
          toast.success("You're already on the list! Check your previous email.");
        } else {
          throw dbError;
        }
      } else {
        setSubmitted(true);
        toast.success("Your free pack is on its way! Check your inbox.");
      }
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
      toast.error("Could not subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-labelledby="lead-capture-heading" className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 Q25 60 50 80 T100 50 L100 100Z" fill="white" />
        </svg>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/80 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
          <Mail className="w-4 h-4" aria-hidden="true" /> Free Resource Pack
        </div>
        <h2 id="lead-capture-heading" className="text-3xl sm:text-4xl font-extrabold text-primary-foreground mb-4">
          Get your free arthritis management pack
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of people who've downloaded our free starter pack. Clinician-reviewed, practical, and ready to
          use today.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8" role="list" aria-label="Pack contents">
          {includes.map((item) => (
            <span
              key={item}
              role="listitem"
              className="flex items-center gap-1.5 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground rounded-full px-3 py-1.5 text-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> {item}
            </span>
          ))}
        </div>

        {submitted ? (
          <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-2xl p-8 max-w-md mx-auto" role="alert">
            <CheckCircle2 className="w-10 h-10 text-primary-foreground/80 mx-auto mb-3" aria-hidden="true" />
            <p className="text-primary-foreground font-semibold text-lg">You're all set!</p>
            <p className="text-primary-foreground/70 text-sm mt-2">Check your inbox for your free arthritis management pack.</p>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="lead-email" className="sr-only">Email address</label>
              <input
                id="lead-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Your email address"
                autoComplete="email"
                aria-describedby={error ? "lead-email-error" : undefined}
                aria-invalid={!!error}
                className="flex-1 px-5 py-3.5 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground text-sm font-medium"
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3.5 bg-primary-foreground text-primary rounded-xl font-semibold text-sm hover:bg-primary-foreground/90 transition-colors disabled:opacity-60 whitespace-nowrap shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-foreground flex items-center gap-2 justify-center"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending…</>
                ) : (
                  "Get free pack →"
                )}
              </button>
            </div>
            {error && (
              <p id="lead-email-error" role="alert" className="mt-2 text-destructive-foreground/80 text-sm flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" /> {error}
              </p>
            )}
          </div>
        )}
        <p className="mt-4 text-primary-foreground/60 text-xs">No spam, ever. Unsubscribe anytime. We never share your data.</p>
      </div>
    </section>
  );
});

LeadCaptureSection.displayName = "LeadCaptureSection";
export default LeadCaptureSection;
