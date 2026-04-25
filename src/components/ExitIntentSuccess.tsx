import { CheckCircle2, Download, Mail, BookOpen, Stethoscope, ArrowRight, FileText, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import type { ExitIntentVariant, ExitIntentVariantId } from "@/lib/exitIntentVariants";

const PDF_URL = "/downloads/arthritis-starter-guide-preview.pdf";

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
  };

  const handleNextStep = (step: string, href: string) => {
    trackEvent("exit_intent_next_step_click", { step, href, variant: variantId });
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

      {/* PDF preview download — primary next action */}
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
              Free preview · 4 pages · PDF
            </p>
            <p className="font-semibold text-foreground text-sm leading-tight">
              Arthritis Starter Guide — preview
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Read it now while the full guide arrives in your inbox.
            </p>
          </div>
          <Download className="w-5 h-5 text-primary shrink-0 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </a>

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
