import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Heart, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StripeDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: string;
  fundType: string;
}

const StripeDonationModal = ({ isOpen, onClose, amount, currency, fundType }: StripeDonationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case "GBP": return "£";
      case "USD": return "$";
      case "EUR": return "€";
      default: return "£";
    }
  };

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
      const { data, error: fnError } = await supabase.functions.invoke("create-donation-checkout", {
        body: { amount, currency, fundType },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);
      if (!data?.url) throw new Error("No checkout URL returned");

      window.open(data.url, "_blank");
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to create checkout";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, [amount, currency, fundType, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 gap-0 rounded-2xl border-border/50 overflow-hidden">
        {/* Red-tinted header */}
        <div className="bg-gradient-to-br from-primary/12 via-primary/6 to-accent px-6 pt-8 pb-6 border-b border-border/30">
          <DialogHeader>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-3">
              <Heart className="w-3.5 h-3.5" />
              Thank You
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              Complete Your Donation
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Thank you for supporting {getFundLabel()}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 py-6 bg-primary/[0.02] space-y-5">
          <div className="bg-primary/[0.06] rounded-2xl p-6 text-center border border-primary/10">
            <p className="text-sm text-muted-foreground mb-1">Donation Amount</p>
            <p className="text-4xl font-bold text-primary">
              {getCurrencySymbol()}{amount.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">{getFundLabel()}</p>
          </div>

          {error && (
            <div className="text-center">
              <p className="text-destructive font-medium text-sm">{error}</p>
              <p className="text-xs text-muted-foreground mt-1">Please try again</p>
            </div>
          )}

          <Button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full h-12 rounded-full btn-primary-cta text-base font-semibold"
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing…</>
            ) : (
              <><CreditCard className="w-4 h-4 mr-2" /> Pay with Stripe</>
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-primary/50" />
            <span>Secured by Stripe · 256-bit encryption</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StripeDonationModal;