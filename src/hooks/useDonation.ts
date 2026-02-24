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

export function useDonation() {
  const [isLoading, setIsLoading] = useState(false);

  const processDonation = async (data: DonationData) => {
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("create-donation-checkout", {
        body: data,
      });

      if (error) throw new Error(error.message || "Failed to create checkout");
      if (result?.error) throw new Error(result.error);

      if (result?.url) {
        window.open(result.url, "_blank");
        return { success: true };
      }

      throw new Error("No checkout URL returned");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to process donation";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return { processDonation, isLoading };
}