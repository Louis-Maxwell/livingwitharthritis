import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";

type Appointment = Tables<"appointments">;

export function useAdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from("appointments")
        .select("*")
        .order("preferred_date", { ascending: true })
        .order("preferred_time", { ascending: true });

      if (fetchError) throw fetchError;
      setAppointments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch appointments");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    // Call the notify-patient-status edge function which updates status AND sends email
    const { data, error: invokeError } = await supabase.functions.invoke("notify-patient-status", {
      body: { appointmentId: id, newStatus: status },
    });

    if (invokeError) {
      throw new Error(invokeError.message || "Failed to update status");
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    // Show success with notification info
    if (data?.message) {
      toast.success(data.message);
    }

    await fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return { appointments, isLoading, error, refetch: fetchAppointments, updateStatus };
}
