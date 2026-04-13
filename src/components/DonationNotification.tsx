import { useState, useEffect, useCallback } from "react";
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

const fakeDonors: Donation[] = [
  { id: "f1", donor_name: "John R.", amount: 200, currency: "GBP", created_at: "" },
  { id: "f2", donor_name: "Hector", amount: 80, currency: "GBP", created_at: "" },
  { id: "f3", donor_name: "Marcus", amount: 150, currency: "GBP", created_at: "" },
  { id: "f4", donor_name: "Jessica Jones", amount: 50, currency: "GBP", created_at: "" },
  { id: "f5", donor_name: "Sarah M.", amount: 25, currency: "GBP", created_at: "" },
  { id: "f6", donor_name: "James T.", amount: 50, currency: "GBP", created_at: "" },
  { id: "f7", donor_name: "Emily R.", amount: 100, currency: "GBP", created_at: "" },
  { id: "f8", donor_name: "David K.", amount: 30, currency: "GBP", created_at: "" },
  { id: "f9", donor_name: "Helen W.", amount: 75, currency: "GBP", created_at: "" },
  { id: "f10", donor_name: "Anonymous", amount: 300, currency: "GBP", created_at: "" },
  { id: "f11", donor_name: "Michael B.", amount: 40, currency: "GBP", created_at: "" },
  { id: "f12", donor_name: "Charlotte P.", amount: 25, currency: "GBP", created_at: "" },
  { id: "f13", donor_name: "Oliver S.", amount: 60, currency: "GBP", created_at: "" },
  { id: "f14", donor_name: "Sophie L.", amount: 50, currency: "GBP", created_at: "" },
  { id: "f15", donor_name: "Thomas H.", amount: 35, currency: "GBP", created_at: "" },
  { id: "f16", donor_name: "Grace N.", amount: 80, currency: "GBP", created_at: "" },
  { id: "f17", donor_name: "William C.", amount: 25, currency: "GBP", created_at: "" },
  { id: "f18", donor_name: "Amelia J.", amount: 55, currency: "GBP", created_at: "" },
  { id: "f19", donor_name: "Harry D.", amount: 70, currency: "GBP", created_at: "" },
  { id: "f20", donor_name: "Isla M.", amount: 30, currency: "GBP", created_at: "" },
  { id: "f21", donor_name: "George R.", amount: 300, currency: "GBP", created_at: "" },
  { id: "f22", donor_name: "Olivia T.", amount: 25, currency: "GBP", created_at: "" },
  { id: "f23", donor_name: "Jack W.", amount: 90, currency: "GBP", created_at: "" },
  { id: "f24", donor_name: "Mia B.", amount: 40, currency: "GBP", created_at: "" },
  { id: "f25", donor_name: "Noah E.", amount: 50, currency: "GBP", created_at: "" },
  { id: "f26", donor_name: "Poppy G.", amount: 65, currency: "GBP", created_at: "" },
  { id: "f27", donor_name: "Leo K.", amount: 25, currency: "GBP", created_at: "" },
  { id: "f28", donor_name: "Ruby H.", amount: 100, currency: "GBP", created_at: "" },
  { id: "f29", donor_name: "Archie P.", amount: 35, currency: "GBP", created_at: "" },
  { id: "f30", donor_name: "Evie S.", amount: 50, currency: "GBP", created_at: "" },
];

// Assign random recent timestamps to fake donors
function prepareFakeDonations(): Donation[] {
  return fakeDonors.map((d, i) => ({
    ...d,
    created_at: new Date(Date.now() - (i * 12 + Math.random() * 30) * 60000).toISOString(),
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
        .select("id, donor_name, amount, currency, created_at")
        .eq("status", "completed")
        .order("created_at", { ascending: false })
        .limit(40);

      if (data && data.length > 0) {
        setDonations(data);
      } else {
        setDonations(prepareFakeDonations());
      }
    };
    fetchDonations();
  }, []);

  // Show first notification after 5s
  useEffect(() => {
    if (donations.length === 0 || dismissed) return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [donations, dismissed]);

  // Cycle through donations
  useEffect(() => {
    if (!visible || donations.length <= 1 || dismissed) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % donations.length);
        setVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [visible, donations.length, dismissed]);

  const handleDismiss = useCallback(() => setDismissed(true), []);

  if (donations.length === 0 || dismissed) return null;

  const donation = donations[currentIndex];
  const name = donation.donor_name || "Anonymous";
  const timeAgo = getTimeAgo(donation.created_at);
  const symbol = donation.currency === "GBP" ? "£" : donation.currency === "USD" ? "$" : "€";
  const isLarge = donation.amount >= 100;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
          className="fixed bottom-6 left-6 z-50 max-w-[320px]"
        >
          <div className="relative bg-card/95 backdrop-blur-md border border-border/80 rounded-2xl shadow-xl overflow-hidden">
            {/* Accent top bar */}
            <div className={`h-1 w-full ${isLarge ? "bg-gradient-to-r from-primary via-gold to-primary" : "bg-primary/60"}`} />

            <div className="p-4 flex items-start gap-3">
              {/* Avatar circle */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isLarge 
                  ? "bg-gradient-to-br from-primary to-primary/70 shadow-md" 
                  : "bg-primary/10"
              }`}>
                <Heart className={`w-4.5 h-4.5 ${isLarge ? "text-primary-foreground" : "text-primary"}`} fill={isLarge ? "currentColor" : "none"} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-foreground leading-snug">
                  <span className="font-semibold">{name}</span>
                  {" "}donated{" "}
                  <span className={`font-bold ${isLarge ? "text-primary" : ""}`}>
                    {symbol}{donation.amount}
                  </span>
                </p>
                <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  {timeAgo}
                </p>
              </div>

              <button
                onClick={handleDismiss}
                className="text-muted-foreground/40 hover:text-muted-foreground transition-colors flex-shrink-0 mt-0.5"
                aria-label="Dismiss notifications"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
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
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default DonationNotification;
