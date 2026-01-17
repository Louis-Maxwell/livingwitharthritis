import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function useContact() {
  const [isLoading, setIsLoading] = useState(false);

  const submitContact = async (data: ContactData) => {
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("submit-contact", {
        body: data,
      });

      if (error) {
        throw new Error(error.message || "Failed to submit contact form");
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success(result?.message || "Thank you for contacting us!");
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit contact form";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return { submitContact, isLoading };
}
