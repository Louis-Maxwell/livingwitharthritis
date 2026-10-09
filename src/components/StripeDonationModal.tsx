import { useCallback, useState } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { trackDonationInitiate } from "@/lib/analytics";
import { Heart, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExclusiveOverlay } from "@/hooks/useExclusiveOverlay";
import { GOFUNDME_URL, ZAKAT_GIVE_URL } from "@/components/landing/homeJobs";
import { getStripe, getStripeEnvironment, isStripeConfigured } from "@/lib/stripe";
import { supabase } from "@/integrations/supabase/client";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";

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
  zakat: "Palestine & Gaza appeal (Zakat)",
};

const StripeDonationModal = ({ isOpen, onClose, amount, fundType, recurring = false }: StripeDonationModalProps) => {
  useExclusiveOverlay("donation", isOpen, onClose);
  const [giftAid, setGiftAid] = useState(false);
  const [isCheckoutStarted, setIsCheckoutStarted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fundLabel = FUND_LABELS[fundType] ?? "General Donation";
  const isZakat = fundType === "zakat";
  const fallbackHref = isZakat ? ZAKAT_GIVE_URL : GOFUNDME_URL;
  const canPayByCard = isStripeConfigured() && amount >= 1;

  const fetchClientSecret = useCallback(async (): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke("create-donation-checkout", {
        body: {
          amount,
          recurring,
          fundType,
          giftAid,
          environment: getStripeEnvironment(),
          returnUrl: `${window.location.origin}/donation-result/success?session_id={CHECKOUT_SESSION_ID}&amount=${amount}&interval=${recurring ? "monthly" : "once"}`,
        },
      });
      if (error || !data?.clientSecret) throw new Error(error?.message || "No checkout");
      return data.clientSecret as string;
    } catch (e) {
      setHasError(true);
      throw e;
    }
  }, [amount, recurring, fundType, giftAid]);

  const handleClose = () => {
    setIsCheckoutStarted(false);
    setHasError(false);
    onClose();
  };

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
              £{amount.toFixed(2)}{recurring ? " a month" : ""} to {fundLabel}
            </DialogTitle>
            <DialogDescription className="text-sm text-foreground">
              {isZakat
                ? "Zakat given here goes only to the Palestine & Gaza rehabilitation appeal."
                : "Pay securely by card, Apple Pay or Google Pay."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-6 space-y-5">
          <PaymentTestModeBanner />
          {canPayByCard && !hasError && !isCheckoutStarted && (
            <>
              <label className="flex items-start gap-3 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={giftAid}
                  onChange={(e) => setGiftAid(e.target.checked)}
                  className="mt-1 h-5 w-5"
                />
                <span>
                  Yes, I am a UK taxpayer and want to Gift Aid this donation. I understand that if I
                  pay less Income Tax or Capital Gains Tax than the Gift Aid claimed, it is my
                  responsibility to pay the difference. We record your choice now and can only claim once our HMRC registration is complete.
                </span>
              </label>
              <Button
                className="w-full min-h-12 rounded-full text-base font-semibold"
                onClick={() => {
                  trackDonationInitiate(amount);
                  setIsCheckoutStarted(true);
                }}
              >
                <Heart className="w-4 h-4 mr-2" /> Continue to secure payment
              </Button>
            </>
          )}

          {canPayByCard && !hasError && isCheckoutStarted && (
            <div id="checkout">
              <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          )}

          {(!canPayByCard || hasError) && (
            <>
              <p className="text-sm text-foreground">
                Card payments are temporarily unavailable.{" "}
                {isZakat ? "Email us and we'll send a secure way to give your Zakat." : "You can still give on GoFundMe."}
              </p>
              <Button asChild className="w-full min-h-12 rounded-full text-base font-semibold">
                <a
                  href={fallbackHref}
                  {...(isZakat ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  onClick={handleClose}
                >
                  {isZakat ? "Email us to give your Zakat" : "Donate on GoFundMe"}
                  <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                  <span className="sr-only">{isZakat ? " (opens your email app)" : " (opens in a new tab)"}</span>
                </a>
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StripeDonationModal;
