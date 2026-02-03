import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Heart } from "lucide-react";

interface PayPalDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: string;
  fundType: string;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

const PayPalDonationModal = ({ isOpen, onClose, amount, currency, fundType }: PayPalDonationModalProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clientId, setClientId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const buttonsRendered = useRef(false);

  // Fetch PayPal client ID
  useEffect(() => {
    if (!isOpen) return;
    
    const fetchClientId = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("paypal-checkout", {
          body: { amount, currency, fundType },
        });

        if (error) throw new Error(error.message);
        if (data?.error) throw new Error(data.error);
        if (!data?.clientId) throw new Error("No PayPal client ID received");

        setClientId(data.clientId);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load PayPal";
        setError(message);
        setIsLoading(false);
      }
    };

    fetchClientId();
  }, [isOpen, amount, currency, fundType]);

  // Load PayPal SDK and render buttons
  useEffect(() => {
    if (!clientId || !isOpen || !paypalRef.current) return;
    
    // Reset state when modal opens
    buttonsRendered.current = false;
    setIsLoading(true);

    // Check if script already exists
    const existingScript = document.querySelector(`script[src*="paypal.com/sdk/js"]`);
    
    const renderButtons = () => {
      if (!window.paypal || !paypalRef.current || buttonsRendered.current) return;
      
      // Clear any existing buttons
      paypalRef.current.innerHTML = "";
      
      window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "donate",
        },
        createOrder: (_data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toFixed(2),
                currency_code: currency.toUpperCase(),
              },
              description: `Donation - ${fundType}`,
            }],
            application_context: {
              brand_name: "Living With Arthritis",
              shipping_preference: "NO_SHIPPING",
            },
          });
        },
        onApprove: async (_data: any, actions: any) => {
          try {
            const order = await actions.order.capture();
            
            // Verify and record donation server-side (prevents client manipulation)
            const { data: verifyResult, error: verifyError } = await supabase.functions.invoke("verify-paypal-order", {
              body: {
                orderId: order.id,
                amount,
                currency,
                fundType,
              },
            });

            if (verifyError) {
              console.error("Server verification error:", verifyError);
              throw new Error(verifyError.message || "Failed to verify donation");
            }

            if (verifyResult?.error) {
              console.error("Verification failed:", verifyResult.error);
              throw new Error(verifyResult.error);
            }

            toast.success("Thank you for your generous donation!");
            onClose();
          } catch (err) {
            console.error("Capture error:", err);
            toast.error("Payment was approved but verification failed. Please contact support if charged.");
          }
        },
        onError: (err: any) => {
          console.error("PayPal error:", err);
          toast.error("Payment failed. Please try again.");
        },
        onCancel: () => {
          toast.info("Donation cancelled");
        },
      }).render(paypalRef.current);

      buttonsRendered.current = true;
      setIsLoading(false);
    };

    if (existingScript && window.paypal) {
      renderButtons();
    } else if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&intent=capture&disable-funding=credit,card`;
      script.async = true;
      script.onload = renderButtons;
      script.onerror = () => {
        setError("Failed to load PayPal SDK");
        setIsLoading(false);
      };
      document.body.appendChild(script);
    }

    return () => {
      buttonsRendered.current = false;
    };
  }, [clientId, isOpen, amount, currency, fundType, onClose]);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      buttonsRendered.current = false;
      setIsLoading(true);
      setError(null);
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
    }
  }, [isOpen]);

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
      default: return "General Donation";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-5 w-5 text-destructive" />
            Complete Your Donation
          </DialogTitle>
          <DialogDescription>
            Thank you for supporting {getFundLabel()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Donation Summary */}
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Donation Amount</p>
            <p className="text-3xl font-bold text-primary">
              {getCurrencySymbol()}{amount.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{getFundLabel()}</p>
          </div>

          {/* PayPal Buttons Container */}
          <div className="min-h-[150px] flex items-center justify-center">
            {isLoading && !error && (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading PayPal...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center">
                <p className="text-destructive font-medium">{error}</p>
                <p className="text-sm text-muted-foreground mt-1">Please try again later</p>
              </div>
            )}
            
            <div ref={paypalRef} className={isLoading || error ? "hidden" : "w-full"} />
          </div>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>🔒</span>
            <span>Secured by PayPal</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayPalDonationModal;
