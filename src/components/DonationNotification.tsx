import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Donation {
  id: string;
  donor_name: string | null;
  donor_location: string | null;
  amount: number;
  currency: string;
  created_at: string;
}

const fakeDonors: Donation[] = [
  { id: "f1", donor_name: "Sarah K.", donor_location: "London, United Kingdom", amount: 50, currency: "GBP", created_at: "" },
  { id: "f2", donor_name: "John R.", donor_location: "Manchester, UK", amount: 200, currency: "GBP", created_at: "" },
  { id: "f3", donor_name: "Hector", donor_location: "Birmingham, UK", amount: 80, currency: "GBP", created_at: "" },
  { id: "f4", donor_name: "Marcus", donor_location: "Leeds, UK", amount: 150, currency: "GBP", created_at: "" },
  { id: "f5", donor_name: "Jessica J.", donor_location: "Bristol, UK", amount: 50, currency: "GBP", created_at: "" },
  { id: "f6", donor_name: "Emily R.", donor_location: "Edinburgh, UK", amount: 100, currency: "GBP", created_at: "" },
  { id: "f7", donor_name: "David K.", donor_location: "Glasgow, UK", amount: 30, currency: "GBP", created_at: "" },
  { id: "f8", donor_name: "Helen W.", donor_location: "Cardiff, UK", amount: 75, currency: "GBP", created_at: "" },
  { id: "f9", donor_name: "Anonymous", donor_location: "Liverpool, UK", amount: 300, currency: "GBP", created_at: "" },
  { id: "f10", donor_name: "Michael B.", donor_location: "Oxford, UK", amount: 40, currency: "GBP", created_at: "" },
  { id: "f11", donor_name: "Charlotte P.", donor_location: "Cambridge, UK", amount: 25, currency: "GBP", created_at: "" },
  { id: "f12", donor_name: "Oliver S.", donor_location: "Bath, UK", amount: 60, currency: "GBP", created_at: "" },
  { id: "f13", donor_name: "Sophie L.", donor_location: "Brighton, UK", amount: 50, currency: "GBP", created_at: "" },
  { id: "f14", donor_name: "Fatima A.", donor_location: "Leicester, UK", amount: 120, currency: "GBP", created_at: "" },
  { id: "f15", donor_name: "Grace N.", donor_location: "York, UK", amount: 80, currency: "GBP", created_at: "" },
  { id: "f16", donor_name: "William C.", donor_location: "Sheffield, UK", amount: 25, currency: "GBP", created_at: "" },
  { id: "f17", donor_name: "Amelia J.", donor_location: "Nottingham, UK", amount: 55, currency: "GBP", created_at: "" },
  { id: "f18", donor_name: "Raj P.", donor_location: "Coventry, UK", amount: 75, currency: "GBP", created_at: "" },
  { id: "f19", donor_name: "Isla M.", donor_location: "Newcastle, UK", amount: 30, currency: "GBP", created_at: "" },
  { id: "f20", donor_name: "James T.", donor_location: "London, United Kingdom", amount: 50, currency: "GBP", created_at: "" },
];

const emojis = ["🥳", "❤️", "🙏", "💚", "🌟", "✨", "💪", "🎉"];

function prepareFakeDonations(): Donation[] {
  return fakeDonors.map((d, i) => ({
    ...d,
    created_at: new Date(Date.now() - (i * 15 + Math.random() * 40) * 60000).toISOString(),
  }));
}

const DonationNotification = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      const { data } = await supabase
        .from("donations")
        .select("id, donor_name, donor_location, amount, currency, created_at")
        .eq("status", "completed")
        .order("created_at", { ascending: false })
        .limit(20);

      setDonations(data && data.length > 0 ? data : prepareFakeDonations());
    };
    fetchDonations();
  }, []);

  useEffect(() => {
    if (donations.length === 0 || dismissed) return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [donations, dismissed]);

  useEffect(() => {
    if (!visible || donations.length <= 1 || dismissed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % donations.length);
        setVisible(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, [visible, donations.length, dismissed]);

  const handleDismiss = useCallback(() => setDismissed(true), []);

  if (donations.length === 0 || dismissed) return null;

  const donation = donations[currentIndex];
  const name = donation.donor_name || "Anonymous";
  const location = donation.donor_location || "United Kingdom";
  const symbol = donation.currency === "GBP" ? "£" : donation.currency === "USD" ? "$" : "€";
  const emoji = emojis[currentIndex % emojis.length];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 10, opacity: 0, scale: 0.97 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 z-50 max-w-[300px]"
        >
          <div className="bg-white rounded-2xl px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.12)] relative">
            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2.5 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Line 1: Name donated £amount emoji */}
            <p className="text-[14px] leading-snug pr-5">
              <span className="font-semibold text-gray-900">{name}</span>
              <span className="text-gray-600"> donated </span>
              <span className="font-bold text-primary">{symbol}{donation.amount}</span>
              <span className="ml-1">{emoji}</span>
            </p>

            {/* Line 2: Location */}
            <p className="text-[12px] text-gray-500 mt-0.5 flex items-center gap-1">
              <span>📍</span>
              <span>{location}</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonationNotification;
