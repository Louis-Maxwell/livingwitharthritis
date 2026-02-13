import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

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
    const { error: updateError } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id);

    if (updateError) throw updateError;
    await fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return { appointments, isLoading, error, refetch: fetchAppointments, updateStatus };
}
