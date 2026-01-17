import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface FundraisingData {
  inquiryType: string;
  organizationName?: string;
  contactName: string;
  email: string;
  phone?: string;
  message?: string;
}

export function useFundraising() {
  const [isLoading, setIsLoading] = useState(false);

  const submitFundraisingInquiry = async (data: FundraisingData) => {
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("submit-fundraising", {
        body: data,
      });

      if (error) {
        throw new Error(error.message || "Failed to submit inquiry");
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success(result?.message || "Thank you for your interest!");
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit inquiry";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return { submitFundraisingInquiry, isLoading };
}
