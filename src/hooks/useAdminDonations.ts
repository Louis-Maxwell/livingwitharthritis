import { useState } from "react";

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
  const [donations] = useState<Donation[]>([]);
  const [stats] = useState<DonationStats>({
    totalAmount: 0,
    totalCount: 0,
    averageAmount: 0,
    byFundType: {},
  });
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  return { donations, stats, isLoading, error };
}
