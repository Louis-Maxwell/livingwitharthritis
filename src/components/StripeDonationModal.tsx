import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { trackDonationInitiate } from "@/lib/analytics";
import { openMailto } from "@/lib/mailtoSubmit";
import { CONTACT_EMAILS } from "@/config/contact";

import { Loader2, Heart, CreditCard, ShieldCheck, Gift, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

interface StripeDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: string;
  fundType: string;
  recurring?: boolean;
}

const StripeDonationModal = ({ isOpen, onClose, amount, currency, fundType, recurring = false }: StripeDonationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [giftAid, setGiftAid] = useState(false);

  const getCurrencySymbol = () => {
    switch (currency) {
      case "GBP": return "£";
      case "USD": return "$";
      case "EUR": return "€";
      default: return "£";
    }
  };

  const sym = getCurrencySymbol();
  const giftAidBonus = amount * 0.25;
  const totalWithGiftAid = amount + giftAidBonus;

  const getFundLabel = () => {
    switch (fundType) {
      case "research": return "Arthritis Research Fund";
      case "support": return "Patient Support Fund";
      case "helpline": return "Helpline Support";
      case "zakat": return "Zakat Appeal";
      default: return "General Donation";
    }
  };

  const handleCheckout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const donateUrl = import.meta.env.VITE_STRIPE_DONATE_URL as string | undefined;
      trackDonationInitiate(amount);
      if (donateUrl) {
        onClose();
        const url = new URL(donateUrl);
        window.location.href = url.toString();
        return;
      }
      openMailto({
        subject: `Donation of ${sym}${amount.toFixed(2)} (${getFundLabel()})`,
        body: [
          `I would like to donate ${sym}${amount.toFixed(2)} to ${getFundLabel()}.`,
          recurring ? "This would be a monthly gift." : "This would be a one-off gift.",
          giftAid ? "I would like Gift Aid applied." : "",
          "",
          `Please send a Stripe or PayPal payment link to this address.`,
        ].filter(Boolean).join("\n"),
        email: CONTACT_EMAILS.info,
      });
      onClose();
      toast.success(`Please send the email that opened, or donate via the PayPal option if shown. Card checkout needs a hosted Stripe link (VITE_STRIPE_DONATE_URL).`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to create checkout";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, [amount, currency, fundType, giftAid, recurring, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[calc(100%-1.5rem)] max-w-[calc(100vw-1.5rem)] sm:max-w-md p-0 gap-0 rounded-2xl border-border/50 overflow-x-hidden overflow-y-auto max-h-[min(90vh,40rem)]">
        {/* Header */}
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
              {recurring
                ? `Support ${getFundLabel()} every month`
                : `Thank you for supporting ${getFundLabel()}`}
            </DialogDescription>

          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 py-6 bg-primary/[0.02] space-y-5">
          {/* Amount display */}
          <div className={`rounded-2xl p-6 text-center border ${
            recurring
              ? "bg-primary/[0.06] border-primary/10"
              : "bg-primary/[0.06] border-primary/10"
          }`}>
            <p className="text-sm text-foreground mb-1">
              {recurring ? "Monthly Amount" : "Donation Amount"}
            </p>
            <p className={`text-4xl font-bold ${recurring ? "text-foreground" : "text-foreground"}`}>
              {sym}{amount.toFixed(2)}
              {recurring && <span className="text-lg font-medium text-foreground">/month</span>}
            </p>
            <p className="text-sm text-foreground mt-2">{getFundLabel()}</p>
            {recurring && (
              <p className="text-xs text-foreground mt-1">
                That's {sym}{(amount * 12).toFixed(2)} per year — cancel anytime
              </p>
            )}

          </div>

          {/* Gift Aid Calculator */}
          {currency === "GBP" && (
            <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3 bg-primary/[0.06] border-b border-primary/10">
                <Gift className="w-4 h-4 text-primary shrink-0" />
                <p className="text-sm font-semibold text-foreground">Boost your donation with Gift Aid</p>
              </div>

              <div className="px-5 py-4 space-y-4">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <div className="text-center px-3 py-2 rounded-xl bg-card border border-border/40">
                    <p className="text-[10px] text-foreground uppercase tracking-wider font-medium">You give</p>
                    <p className="text-lg font-bold text-foreground">{sym}{amount.toFixed(2)}{recurring ? "/mo" : ""}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                  <div className="text-center px-3 py-2 rounded-xl bg-card border border-border/40">
                    <p className="text-[10px] text-foreground uppercase tracking-wider font-medium">HMRC adds</p>
                    <p className="text-lg font-bold text-foreground">+{sym}{giftAidBonus.toFixed(2)}</p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={giftAid ? "on" : "off"}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`text-center px-3 py-2 rounded-xl border ${
                        giftAid
                          ? "bg-primary/10 border-primary/30"
                          : "bg-card border-border/40"
                      }`}
                    >
                      <p className="text-[10px] text-foreground uppercase tracking-wider font-medium">We receive</p>
                      <p className="text-lg font-bold text-foreground">
                        {sym}{giftAid ? totalWithGiftAid.toFixed(2) : amount.toFixed(2)}
                      </p>

                    </motion.div>
                  </AnimatePresence>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <Checkbox
                    checked={giftAid}
                    onCheckedChange={(v) => setGiftAid(v === true)}
                    className="mt-0.5 border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="text-xs text-foreground leading-relaxed">
                    I want to Gift Aid this donation and any donations I make in the future or have made in the past 4 years to <strong>Living With Arthritis</strong> (Registered Charity in England &amp; Wales No. 1218461). I am a UK taxpayer and understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my donations in that tax year, it is my responsibility to pay any difference.
                  </span>

                </label>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center">
              <p className="text-destructive font-medium text-sm">{error}</p>
              <p className="text-xs text-foreground mt-1">Please try again</p>
            </div>
          )}

          <Button
            onClick={handleCheckout}
            disabled={isLoading}
            className={`w-full h-12 rounded-full text-base font-semibold ${
              recurring
                ? "bg-primary hover:bg-primary text-primary-foreground"
                : "btn-primary-cta"
            }`}
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing…</>
            ) : recurring ? (
              <><RefreshCw className="w-4 h-4 mr-2" /> Start Monthly Donation</>
            ) : (
              <><CreditCard className="w-4 h-4 mr-2" /> Pay with Stripe</>
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-primary/50" />
            <span>Secured by Stripe · 256-bit encryption{recurring ? " · Cancel anytime" : ""}</span>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StripeDonationModal;
