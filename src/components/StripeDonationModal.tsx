import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { trackDonationClick } from "@/lib/ga-events";
import { Heart, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExclusiveOverlay } from "@/hooks/useExclusiveOverlay";
import { GOFUNDME_URL } from "@/components/landing/homeJobs";

interface StripeDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: string;
  fundType: string;
  recurring?: boolean;
}

const StripeDonationModal = ({ isOpen, onClose, amount, currency, fundType, recurring = false }: StripeDonationModalProps) => {
  useExclusiveOverlay("donation", isOpen, onClose);

  const getCurrencySymbol = () => {
    switch (currency) {
      case "GBP": return "£";
      case "USD": return "$";
      case "EUR": return "€";
      default: return "£";
    }
  };

  const sym = getCurrencySymbol();

  const getFundLabel = () => {
    switch (fundType) {
      case "research": return "Arthritis Research Fund";
      case "support": return "Patient Support Fund";
      case "helpline": return "Helpline Support";
      case "zakat": return "Zakat Appeal";
      default: return "General Donation";
    }
  };

  const fundLabel = getFundLabel();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[calc(100%-1.5rem)] max-w-[calc(100vw-1.5rem)] sm:max-w-md p-0 gap-0 rounded-2xl border-border/50 overflow-x-hidden overflow-y-auto max-h-[min(90vh,40rem)]">
        <div className="bg-gradient-to-br from-primary/12 via-primary/6 to-accent px-6 pt-8 pb-6 border-b border-border/30">
          <DialogHeader>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-foreground text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-3">
              {recurring ? <RefreshCw className="w-3.5 h-3.5" /> : <Heart className="w-3.5 h-3.5" />}
              {recurring ? "Monthly Giving" : "Thank You"}
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              Donate on GoFundMe
            </DialogTitle>
            <DialogDescription className="text-sm text-foreground">
              {`Thank you for supporting ${fundLabel}. The gift is taken on our GoFundMe campaign, where you choose the amount.`}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-6 bg-primary/[0.02] space-y-5">
          <div className="rounded-2xl p-6 text-center border bg-primary/[0.06] border-primary/10">
            <p className="text-sm text-foreground mb-1">{recurring ? "Monthly amount on this control" : "Amount on this control"}</p>
            <p className="text-4xl font-bold text-foreground">
              {sym}{amount.toFixed(2)}
              {recurring && <span className="text-lg font-medium text-foreground">/month</span>}
            </p>
            <p className="text-sm text-foreground mt-2">{fundLabel}</p>
          </div>

          <Button asChild className="w-full min-h-12 h-14 rounded-full text-base font-semibold btn-primary-cta">
            <a
              href={GOFUNDME_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackDonationClick({ source: "donation_modal" });
                onClose();
              }}
            >
              <Heart className="w-4 h-4 mr-2" />
              Donate on GoFundMe
              <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StripeDonationModal;
