import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface DonationData {
  amount: number;
  currency: string;
  fundType: string;
  donorName?: string;
  donorEmail?: string;
}

interface PayPalResponse {
  clientId?: string;
  orderId?: string;
  approvalUrl?: string;
  error?: string;
}

export function useDonation() {
  const [isLoading, setIsLoading] = useState(false);
  const [paypalConfig, setPaypalConfig] = useState<{ clientId: string; amount: number; currency: string; fundType: string } | null>(null);

  const processDonation = async (data: DonationData) => {
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke<PayPalResponse>("paypal-checkout", {
        body: data,
      });

      if (error) {
        throw new Error(error.message || "Failed to create PayPal checkout");
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      // If we got an approval URL (server-side flow), redirect to PayPal
      if (result?.approvalUrl) {
        window.open(result.approvalUrl, "_blank");
        return { success: true };
      }

      // Otherwise, set up for client-side PayPal buttons
      if (result?.clientId) {
        setPaypalConfig({
          clientId: result.clientId,
          amount: data.amount,
          currency: data.currency,
          fundType: data.fundType,
        });
        return { success: true, showPayPalButtons: true, clientId: result.clientId };
      }

      throw new Error("PayPal configuration error");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to process donation";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const clearPaypalConfig = () => setPaypalConfig(null);

  return { processDonation, isLoading, paypalConfig, clearPaypalConfig };
}
