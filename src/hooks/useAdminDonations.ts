import { useState, useEffect } from "react";

// Supabase client removed - restore
const supabase = { from: () => ({ select: () => ({ eq: () => ({ order: async () => ({ data: [] }) }) }) }) };

interface Donation {
  id: string;
  amount: number;
  currency: string;
  fund_type: string;
  status: string;
  donor_name: string | null;
  donor_email: string | null;
  donor_location: string | null;
  donor_country: string | null;
  created_at: string;
}

interface DonationStats {
  totalAmount: number;
  totalCount: number;
  averageAmount: number;
  byFundType: Record<string, { amount: number; count: number }>;
}

export function useAdminDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<DonationStats>({
    totalAmount: 0,
    totalCount: 0,
    averageAmount: 0,
    byFundType: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data, error } = await supabase
          .from("donations")
          .select("*")
          .eq("status", "completed")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const donationsList = data as Donation[];
        setDonations(donationsList);

        // Calculate stats
        const totalAmount = donationsList.reduce((sum, d) => sum + Number(d.amount), 0);
        const totalCount = donationsList.length;
        const averageAmount = totalCount > 0 ? totalAmount / totalCount : 0;

        const byFundType: Record<string, { amount: number; count: number }> = {};
        donationsList.forEach((d) => {
          if (!byFundType[d.fund_type]) {
            byFundType[d.fund_type] = { amount: 0, count: 0 };
          }
          byFundType[d.fund_type].amount += Number(d.amount);
          byFundType[d.fund_type].count += 1;
        });

        setStats({ totalAmount, totalCount, averageAmount, byFundType });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch donations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return { donations, stats, isLoading, error };
}
