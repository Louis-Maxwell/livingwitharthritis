import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Heart, ExternalLink, RefreshCw, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExclusiveOverlay } from "@/hooks/useExclusiveOverlay";
import { trackDonationInitiate } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";
import { getStripe, getStripeEnvironment, isStripeConfigured } from "@/lib/stripe";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { GOFUNDME_URL, ZAKAT_GIVE_URL } from "@/components/landing/homeJobs";

interface StripeDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: string;
  fundType: string;
  recurring?: boolean;
}

const FUND_LABELS: Record<string, string> = {
  research: "Arthritis Research Fund",
  support: "Patient Support Fund",
  helpline: "Helpline Support",
  zakat: "Palestine & Gaza Appeal",
};

const SYMBOLS: Record<string, string> = { GBP: "£", USD: "$", EUR: "€" };

const StripeDonationModal = ({
  isOpen,
  onClose,
  amount,
  currency,
  fundType,
  recurring = false,
}: StripeDonationModalProps) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  const handleClose = useCallback(() => {
    setClientSecret(null);
    setHasFailed(false);
    setIsLoading(false);
    onClose();
  }, [onClose]);

  useExclusiveOverlay("donation", isOpen, handleClose);

  const sym = SYMBOLS[currency] ?? "£";
  const fundLabel = FUND_LABELS[fundType] ?? "General Fund";
  const isZakat = fundType === "zakat";
  const canPayByCard = isStripeConfigured();

  const handleCheckout = async () => {
    setIsLoading(true);
    setHasFailed(false);
    trackDonationInitiate(amount);
    try {
      const { data, error } = await supabase.functions.invoke("create-donation-checkout", {
        body: {
          amount,
          currency,
          fundType,
          recurring,
          returnUrl: `${window.location.origin}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
          environment: getStripeEnvironment(),
        },
      });
      if (error || !data?.clientSecret) throw new Error("checkout_failed");
      setClientSecret(data.clientSecret);
    } catch {
      setHasFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fallbackHref = isZakat ? ZAKAT_GIVE_URL : GOFUNDME_URL;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="w-[calc(100%-1.5rem)] max-w-[calc(100vw-1.5rem)] sm:max-w-lg p-0 gap-0 rounded-2xl border-border/50 overflow-x-hidden overflow-y-auto max-h-[90vh]">
        <div className="bg-gradient-to-br from-primary/12 via-primary/6 to-accent px-6 pt-8 pb-6 border-b border-border/30">
          <DialogHeader>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-foreground text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-3">
              {recurring ? <RefreshCw className="w-3.5 h-3.5" /> : <Heart className="w-3.5 h-3.5" />}
              {recurring ? "Monthly Giving" : "Thank You"}
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              {recurring ? "Set Up Monthly Donation" : "Complete Your Donation"}
            </DialogTitle>
            <DialogDescription className="text-sm text-foreground">
              {`Your gift goes to the ${fundLabel}. Pay securely by card, Apple Pay or Google Pay.`}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-6 space-y-5">
          <PaymentTestModeBanner />

          {clientSecret ? (
            <div id="checkout">
              <EmbeddedCheckoutProvider stripe={getStripe()} options={{ clientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          ) : (
            <>
              <div className="rounded-2xl p-6 text-center border bg-primary/[0.06] border-primary/10">
                <p className="text-sm text-foreground mb-1">{recurring ? "Monthly gift" : "Your gift"}</p>
                <p className="text-4xl font-bold text-foreground">
                  {sym}{amount.toFixed(2)}
                  {recurring && <span className="text-lg font-medium text-foreground">/month</span>}
                </p>
                <p className="text-sm text-foreground mt-2">{fundLabel}</p>
              </div>

              {canPayByCard && (
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full min-h-12 h-14 rounded-full text-base font-semibold btn-primary-cta"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                  ) : (
                    <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
                  )}
                  {isLoading ? "Opening secure payment…" : `Donate ${sym}${amount}${recurring ? " a month" : ""}`}
                </Button>
              )}

              {(hasFailed || !canPayByCard) && (
                <p className="text-sm text-foreground text-center" role="alert">
                  Card payments aren&apos;t available right now. You can still give using the link below.
                </p>
              )}

              <a
                href={fallbackHref}
                {...(isZakat ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground underline underline-offset-2"
              >
                {isZakat ? <Mail className="w-4 h-4" aria-hidden="true" /> : <ExternalLink className="w-4 h-4" aria-hidden="true" />}
                {isZakat ? "Or email us to give to the appeal" : "Or give on GoFundMe"}
                <span className="sr-only">{isZakat ? " (opens your email app)" : " (opens in a new tab)"}</span>
              </a>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StripeDonationModal;
