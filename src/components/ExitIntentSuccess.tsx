import { CheckCircle2, Download, Mail, BookOpen, Stethoscope, ArrowRight, FileText, Lock, Inbox } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { trackFileDownload } from "@/lib/ga-events";
import type { ExitIntentVariant, ExitIntentVariantId } from "@/lib/exitIntentVariants";
import { CONTACT_EMAILS } from "@/config/contact";

const PDF_URL = "/downloads/arthritis-starter-guide-preview.pdf";
const SENDER_EMAIL = CONTACT_EMAILS.hello;
const CONFIRM_SUBJECT = "Confirm my Arthritis Starter Guide signup";

/** Map well-known email providers to a deep-link that opens the inbox/search. */
const getInboxLink = (email: string): { url: string; provider: string } => {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  const search = encodeURIComponent(`from:${SENDER_EMAIL}`);
  if (/^(gmail\.com|googlemail\.com)$/.test(domain))
    return { url: `https://mail.google.com/mail/u/0/#search/${search}`, provider: "gmail" };
  if (/^(outlook\.|hotmail\.|live\.|msn\.)/.test(domain) || domain === "outlook.com")
    return { url: "https://outlook.live.com/mail/0/inbox", provider: "outlook" };
  if (/^(yahoo\.|ymail\.|rocketmail\.)/.test(domain))
    return { url: "https://mail.yahoo.com/d/folders/1", provider: "yahoo" };
  if (/^(icloud\.com|me\.com|mac\.com)$/.test(domain))
    return { url: "https://www.icloud.com/mail", provider: "icloud" };
  if (/^(proton\.me|protonmail\.com|pm\.me)$/.test(domain))
    return { url: "https://mail.proton.me/u/0/inbox", provider: "proton" };
  // Fallback: open the OS default mail client
  return {
    url: `mailto:${SENDER_EMAIL}?subject=${encodeURIComponent(CONFIRM_SUBJECT)}`,
    provider: "mailto",
  };
};

interface Props {
  variant: ExitIntentVariant;
  variantId: ExitIntentVariantId;
  /** Email captured at submit time. Required to unlock the PDF preview. */
  confirmedEmail?: string;
  onClose: () => void;
}

const ExitIntentSuccess = ({ variant, variantId, confirmedEmail, onClose }: Props) => {
  const isConfirmed = Boolean(confirmedEmail && confirmedEmail.includes("@"));

  const handleDownload = (e: React.MouseEvent) => {
    if (!isConfirmed) {
      e.preventDefault();
      trackEvent("exit_intent_pdf_preview_blocked", { variant: variantId, reason: "no_email" });
      return;
    }
    trackEvent("exit_intent_pdf_preview_download", { variant: variantId });
    trackFileDownload({
      file_name: "arthritis-starter-guide-preview.pdf",
      file_extension: "pdf",
      file_url: PDF_URL,
      source: `exit_intent:${variantId}`,
    });
  };

  const handleNextStep = (step: string, href: string) => {
    trackEvent("exit_intent_next_step_click", { step, href, variant: variantId });
  };

  const inbox = isConfirmed ? getInboxLink(confirmedEmail!) : null;
  const handleOpenInbox = () => {
    if (!inbox) return;
    trackEvent("exit_intent_open_inbox_click", {
      variant: variantId,
      provider: inbox.provider,
      email_domain: confirmedEmail?.split("@")[1]?.toLowerCase() ?? "unknown",
    });
  };

  return (
    <div className="py-2">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground leading-tight">
            {variant.successTitle}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {variant.successBody}
          </p>
        </div>
      </div>

      {/* PDF preview download — gated behind email confirmation */}
      {isConfirmed ? (
        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDownload}
          className="group block rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-4 mb-4 hover:border-primary/60 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-0.5">
                Unlocked · 4 pages · PDF
              </p>
              <p className="font-semibold text-foreground text-sm leading-tight">
                Arthritis Starter Guide — preview
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                Sent to <span className="font-medium text-foreground">{confirmedEmail}</span>. Read it now too.
              </p>
            </div>
            <Download className="w-5 h-5 text-primary shrink-0 group-hover:translate-y-0.5 transition-transform" />
          </div>
        </a>
      ) : (
        <div
          role="status"
          aria-live="polite"
          className="rounded-xl border-2 border-dashed border-border bg-muted/40 p-4 mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-muted text-muted-foreground flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-0.5">
                Locked · enter your email to unlock
              </p>
              <p className="font-semibold text-foreground text-sm leading-tight">
                Arthritis Starter Guide — preview
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Submit your email above and the 4-page PDF preview will unlock instantly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Open inbox CTA — primary action to confirm signup */}
      {inbox && (
        <Button asChild size="lg" className="w-full h-12 text-base font-semibold mb-4">
          <a
            href={inbox.url}
            target={inbox.provider === "mailto" ? "_self" : "_blank"}
            rel="noopener noreferrer"
            onClick={handleOpenInbox}
          >
            <Inbox className="w-4 h-4" />
            Open my inbox to confirm
          </a>
        </Button>
      )}

      {/* Next steps */}
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
        While you wait — three good next steps
      </p>
      <ul className="space-y-2 mb-5">
        {[
          {
            icon: Mail,
            title: "Check your inbox",
            text: "Confirm your email so we can send the full 14-page guide.",
            href: null,
            step: "check_inbox",
          },
          {
            icon: BookOpen,
            title: "Read the diet hub",
            text: "Anti-inflammatory food swaps you can start today.",
            href: "/diet",
            step: "diet_hub",
          },
          {
            icon: Stethoscope,
            title: "Take the symptom quiz",
            text: "Get a personalised next-step suggestion in 90 seconds.",
            href: "/health-tools",
            step: "symptom_quiz",
          },
        ].map(({ icon: Icon, title, text, href, step }) => {
          const inner = (
            <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-card px-3 py-2.5 hover:border-primary/40 hover:bg-accent/40 transition-colors">
              <span className="mt-0.5 inline-flex w-7 h-7 rounded-lg bg-primary/10 text-primary items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-tight">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{text}</p>
              </div>
              {href && <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 self-center" />}
            </div>
          );
          return (
            <li key={step}>
              {href ? (
                <Link to={href} onClick={() => { handleNextStep(step, href); onClose(); }}>
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>

      <Button variant="outline" onClick={onClose} className="w-full">
        Continue browsing
      </Button>
    </div>
  );
};

export default ExitIntentSuccess;
