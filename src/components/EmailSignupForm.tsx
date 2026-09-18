import { memo, useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trackEvent, trackNewsletterSignup } from "@/lib/analytics";
import { subscribeNewsletter } from "@/lib/backendSubmit";
import { CONTACT_EMAILS } from "@/config/contact";

interface EmailSignupFormProps {
  placeholder?: string;
  label?: string;
  buttonText?: string;
  sequence?: string;
  onSuccess?: () => void;
  compact?: boolean;
  className?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailSignupForm = memo(({
  placeholder = "your@email.com",
  label = "Free educational emails (PECR consent)",
  buttonText = "Request emails",
  sequence = "welcome-sequence",
  onSuccess,
  compact = false,
  className = "",
}: EmailSignupFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successCopy, setSuccessCopy] = useState(
    "Almost there — please send the email draft so we can add you.",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || success) return;

    const addr = email.trim().toLowerCase();
    if (!EMAIL_RE.test(addr)) {
      const msg = "Please enter a valid email address.";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await subscribeNewsletter({ email: addr, source: sequence });
      if (result.via === "mailto") {
        trackNewsletterSignup();
        trackEvent("email_signup", { sequence, via: "mailto" });
        setSuccessCopy(
          "Almost there — please send the email that opened so we can add you.",
        );
        setSuccess(true);
        setEmail("");
        toast.message(result.message);
        onSuccess?.();
        setTimeout(() => setSuccess(false), 8000);
      } else {
        const msg =
          result.message ||
          `Sorry — that did not work. Please email ${CONTACT_EMAILS.info} or call 07760 512 084.`;
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : `Sorry — that did not work. Please try again or email ${CONTACT_EMAILS.info}.`;
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 items-stretch ${className}`} noValidate>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder={placeholder}
          required
          disabled={loading || success}
          autoComplete="email"
          aria-invalid={!!error}
          aria-describedby={error ? "email-signup-compact-err" : undefined}
          className="flex-1 min-h-11 px-4 py-2 rounded-full bg-background border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={loading || success || !email.trim()}
          className="min-h-11 min-w-11 px-5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={loading ? "Opening email draft" : success ? "Draft ready" : "Join newsletter"}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {success ? "Draft ready" : loading ? "Opening…" : "Join"}
        </button>
        {error ? (
          <span id="email-signup-compact-err" className="sr-only" role="alert">
            {error}
          </span>
        ) : null}
      </form>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {label && (
          <div>
            <label htmlFor="email-signup" className="block text-sm font-semibold text-foreground mb-2">
              {label}
            </label>
            <p className="text-xs text-foreground/60 mb-3">
              Practical guides and campaign updates when we have something useful to share. Unsubscribe anytime.
            </p>
          </div>
        )}

        {success ? (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-200 p-4 flex gap-3" role="status" aria-live="polite">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold text-emerald-900 text-sm">{successCopy}</p>
              <p className="text-xs text-emerald-800 mt-1">Nothing is stored on this website until you press Send in your email app.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-2">
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
                autoComplete="email"
                aria-invalid={!!error}
                aria-describedby={error ? "email-signup-err" : undefined}
                className="flex-1 min-h-11 px-4 py-3 rounded-lg bg-background border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="min-h-11 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-lg shadow-primary/20 inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Opening…
                  </>
                ) : (
                  buttonText
                )}
              </button>
            </div>

            {error && (
              <div id="email-signup-err" className="rounded-lg bg-red-500/10 border border-red-200 p-3 flex gap-2" role="alert">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Educational emails from Living With Arthritis UK (charity 1218461).
              Unsubscribe anytime. See our{" "}
              <a href="/privacy" className="underline hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                privacy policy
              </a>
              . Your email app opens a draft to {CONTACT_EMAILS.info} — please press Send so we can add you.
            </p>
          </>
        )}
      </form>
    </div>
  );
});

EmailSignupForm.displayName = "EmailSignupForm";
export default EmailSignupForm;
