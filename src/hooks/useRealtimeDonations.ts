import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Donation {
  id: string;
  donor_name: string | null;
  amount: number;
  donor_location: string | null;
  donor_country: string | null;
  created_at: string;
}

export function useRealtimeDonations() {
  const [latestDonation, setLatestDonation] = useState<Donation | null>(null);

  useEffect(() => {
    // Subscribe to realtime donations
    const channel = supabase
      .channel("donations-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "donations",
          filter: "status=eq.completed",
        },
        (payload) => {
          const newDonation = payload.new as Donation;
          setLatestDonation(newDonation);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { latestDonation };
}
