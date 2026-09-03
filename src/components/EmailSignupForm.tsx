import { memo, useState } from "react";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { trackEvent, trackNewsletterSignup } from "@/lib/analytics";

interface EmailSignupFormProps {
  placeholder?: string;
  label?: string;
  buttonText?: string;
  sequence?: string;
  onSuccess?: () => void;
  compact?: boolean;
  className?: string;
}

const EmailSignupForm = memo(({
  placeholder = "your@email.com",
  label = "Get free guides and updates",
  buttonText = "Get free guides",
  sequence = "welcome-sequence",
  onSuccess,
  compact = false,
  className = "",
}: EmailSignupFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setError(null);

    try {
      const addr = email.trim().toLowerCase();
      window.location.href =
        "mailto:info@livingwitharthritis.org.uk" +
        "?subject=" + encodeURIComponent("Newsletter signup") +
        "&body=" + encodeURIComponent("Please add this email to the newsletter list: " + addr);
      trackNewsletterSignup();
      trackEvent("email_signup", { sequence });
      setSuccess(true);
      setEmail("");
      toast.success("Please send the email that opened. We do not store signups on this site yet.");
      onSuccess?.();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to subscribe";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          disabled={loading || success}
          className="flex-1 px-4 py-2 rounded-full bg-background border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={loading || success}
          className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          aria-label="Subscribe"
        >
          {success ? "✓" : loading ? "..." : "Join"}
        </button>
      </form>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {label && (
          <div>
            <label htmlFor="email-signup" className="block text-sm font-semibold text-foreground mb-2">
              {label}
            </label>
            <p className="text-xs text-foreground/60 mb-3">
              Weekly guides, real impact stories, and campaign updates. Unsubscribe anytime.
            </p>
          </div>
        )}

        {success ? (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-200 p-4 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold text-emerald-900 text-sm">Welcome!</p>
              <p className="text-xs text-emerald-800 mt-1">Check your email for the first guide and exclusive resources.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                id="email-signup"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                placeholder={placeholder}
                required
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-lg shadow-primary/20"
              >
                {loading ? "Subscribing..." : buttonText}
              </button>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-200 p-3 flex gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <p className="text-[11px] text-muted-foreground">
              By subscribing, you agree to receive emails from Living with Arthritis UK and our{" "}
              <a href="/privacy" className="underline hover:text-primary">
                privacy policy
              </a>
              .
            </p>
          </>
        )}
      </form>
    </div>
  );
});

EmailSignupForm.displayName = "EmailSignupForm";
export default EmailSignupForm;
