import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface DonationData {
  amount: number;
  currency: string;
  fundType: string;
  donorName?: string;
  donorEmail?: string;
  giftAid?: boolean;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postcode?: string;
}

export function useStripeDonation() {
  const [isLoading, setIsLoading] = useState(false);

  const processDonation = async (data: DonationData) => {
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke<{ url?: string; error?: string }>(
        "create-donation-checkout",
        { body: data }
      );

      if (error) throw new Error(error.message || "Failed to create checkout session");
      if (result?.error) throw new Error(result.error);
      if (!result?.url) throw new Error("No checkout URL returned");

      // Redirect to Stripe Checkout
      window.location.href = result.url;
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to process donation";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return { processDonation, isLoading };
}
