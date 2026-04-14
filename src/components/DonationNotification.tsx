import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { X, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  { id: "f4", donor_name: "Jessica J.", amount: 50, currency: "GBP", created_at: "" },
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
  { id: "f15", donor_name: "Fatima A.", amount: 120, currency: "GBP", created_at: "" },
  { id: "f16", donor_name: "Grace N.", amount: 80, currency: "GBP", created_at: "" },
  { id: "f17", donor_name: "William C.", amount: 25, currency: "GBP", created_at: "" },
  { id: "f18", donor_name: "Amelia J.", amount: 55, currency: "GBP", created_at: "" },
  { id: "f19", donor_name: "Raj P.", amount: 75, currency: "GBP", created_at: "" },
  { id: "f20", donor_name: "Isla M.", amount: 30, currency: "GBP", created_at: "" },
];

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
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      const { data } = await supabase
        .from("donations")
        .select("id, donor_name, amount, currency, created_at")
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
    if (!visible || dismissed) return;
    setProgress(0);
    const duration = 7000;
    const step = 40;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += step;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      if (elapsed >= duration) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [visible, currentIndex, dismissed]);

  useEffect(() => {
    if (!visible || donations.length <= 1 || dismissed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % donations.length);
        setVisible(true);
      }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, [visible, donations.length, dismissed]);

  const handleDismiss = useCallback(() => setDismissed(true), []);

  if (donations.length === 0 || dismissed) return null;

  const donation = donations[currentIndex];
  const name = donation.donor_name || "Anonymous";
  const timeAgo = getTimeAgo(donation.created_at);
  const symbol = donation.currency === "GBP" ? "£" : donation.currency === "USD" ? "$" : "€";
  const isLarge = donation.amount >= 100;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 28, stiffness: 340 }}
          className="fixed bottom-5 left-5 z-50 w-[290px]"
        >
          <div className="relative bg-card/95 backdrop-blur-xl rounded-2xl overflow-hidden border border-border/30 shadow-lg">
            {/* Thin progress line */}
            <div className="h-[2px] bg-muted/30 w-full">
              <div
                className="h-full bg-primary/60 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-muted-foreground/40 hover:text-muted-foreground transition-colors p-1 rounded-full z-10"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="p-3.5">
              <div className="flex items-center gap-2.5">
                {/* Minimal avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-semibold ${
                    isLarge
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {initials}
                </div>

                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-[12px] leading-tight text-foreground">
                    <span className="font-semibold">{name}</span>
                    <span className="text-muted-foreground"> donated </span>
                    <span className="font-bold text-primary">
                      {symbol}{donation.amount}
                    </span>
                  </p>
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                    {timeAgo}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate("/donate")}
                className="mt-2.5 w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary/[0.06] hover:bg-primary/[0.12] text-primary text-[11px] font-semibold transition-colors"
              >
                <Heart className="w-3 h-3" />
                Join {donations.length}+ supporters
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
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

export default DonationNotification;
