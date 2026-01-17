import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AppointmentData {
  name: string;
  email: string;
  phone?: string;
  appointmentType: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export function useAppointment() {
  const [isLoading, setIsLoading] = useState(false);

  const bookAppointment = async (data: AppointmentData) => {
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("book-appointment", {
        body: data,
      });

      if (error) {
        throw new Error(error.message || "Failed to book appointment");
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success(result?.message || "Appointment booked successfully!");
      return { success: true, appointmentId: result?.appointmentId };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to book appointment";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return { bookAppointment, isLoading };
}
