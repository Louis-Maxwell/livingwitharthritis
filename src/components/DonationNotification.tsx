import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Heart, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Donation {
  id: string;
  donor_name: string | null;
  amount: number;
  currency: string;
  created_at: string;
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
        .select("id, donor_name, amount, currency, created_at")
        .eq("status", "completed")
        .order("created_at", { ascending: false })
        .limit(20);

      if (data && data.length > 0) {
        setDonations(data);
      }
    };
    fetchDonations();
  }, []);

  // Show first notification after 8s, then cycle every 12s
  useEffect(() => {
    if (donations.length === 0 || dismissed) return;

    const showTimer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(showTimer);
  }, [donations, dismissed]);

  useEffect(() => {
    if (!visible || donations.length <= 1 || dismissed) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % donations.length);
        setVisible(true);
      }, 600);
    }, 12000);

    return () => clearInterval(interval);
  }, [visible, donations, dismissed]);

  if (donations.length === 0 || dismissed) return null;

  const donation = donations[currentIndex];
  const name = donation.donor_name || "Anonymous";
  const firstName = name.split(" ")[0];
  const timeAgo = getTimeAgo(donation.created_at);
  const symbol = donation.currency === "GBP" ? "£" : donation.currency === "USD" ? "$" : "€";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="fixed bottom-6 left-6 z-50 max-w-xs"
        >
          <div className="bg-card border border-border rounded-2xl shadow-lg p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-snug">
                {firstName} donated {symbol}{donation.amount}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{timeAgo}</p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-muted-foreground/50 hover:text-muted-foreground transition-colors flex-shrink-0"
              aria-label="Dismiss notifications"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default DonationNotification;
