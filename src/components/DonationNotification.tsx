import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Heart, X, ArrowRight } from "lucide-react";
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
  { id: "f31", donor_name: "Fatima A.", amount: 120, currency: "GBP", created_at: "" },
  { id: "f32", donor_name: "Benjamin L.", amount: 45, currency: "GBP", created_at: "" },
  { id: "f33", donor_name: "Chloe W.", amount: 20, currency: "GBP", created_at: "" },
  { id: "f34", donor_name: "Daniel F.", amount: 85, currency: "GBP", created_at: "" },
  { id: "f35", donor_name: "Hannah M.", amount: 60, currency: "GBP", created_at: "" },
  { id: "f36", donor_name: "Liam O.", amount: 110, currency: "GBP", created_at: "" },
  { id: "f37", donor_name: "Zara K.", amount: 35, currency: "GBP", created_at: "" },
  { id: "f38", donor_name: "Anonymous", amount: 250, currency: "GBP", created_at: "" },
  { id: "f39", donor_name: "Raj P.", amount: 75, currency: "GBP", created_at: "" },
  { id: "f40", donor_name: "Lucy D.", amount: 30, currency: "GBP", created_at: "" },
  { id: "f41", donor_name: "Sam T.", amount: 45, currency: "GBP", created_at: "" },
  { id: "f42", donor_name: "Aisha B.", amount: 200, currency: "GBP", created_at: "" },
  { id: "f43", donor_name: "Peter G.", amount: 15, currency: "GBP", created_at: "" },
  { id: "f44", donor_name: "Ella C.", amount: 55, currency: "GBP", created_at: "" },
  { id: "f45", donor_name: "Oscar N.", amount: 40, currency: "GBP", created_at: "" },
  { id: "f46", donor_name: "Daisy F.", amount: 70, currency: "GBP", created_at: "" },
  { id: "f47", donor_name: "Edward J.", amount: 95, currency: "GBP", created_at: "" },
  { id: "f48", donor_name: "Florence W.", amount: 50, currency: "GBP", created_at: "" },
  { id: "f49", donor_name: "Arthur V.", amount: 125, currency: "GBP", created_at: "" },
  { id: "f50", donor_name: "Lily A.", amount: 30, currency: "GBP", created_at: "" },
];

function prepareFakeDonations(): Donation[] {
  return fakeDonors.map((d, i) => ({
    ...d,
    created_at: new Date(Date.now() - (i * 12 + Math.random() * 30) * 60000).toISOString(),
  }));
}

const ENCOURAGING_MESSAGES = [
  "Keep progress moving 💪",
  "Together, we're Champions of Yes",
  "Every gift moves us closer to a cure",
  "Your support changes lives",
  "Join the movement today",
];

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
        .limit(50);

      if (data && data.length > 0) {
        setDonations(data);
      } else {
        setDonations(prepareFakeDonations());
      }
    };
    fetchDonations();
  }, []);

  useEffect(() => {
    if (donations.length === 0 || dismissed) return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [donations, dismissed]);

  // Progress bar countdown
  useEffect(() => {
    if (!visible || dismissed) return;
    setProgress(0);
    const duration = 8000;
    const interval = 50;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      if (elapsed >= duration) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [visible, currentIndex, dismissed]);

  // Cycle through donations
  useEffect(() => {
    if (!visible || donations.length <= 1 || dismissed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % donations.length);
        setVisible(true);
      }, 600);
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
  const encouragingMsg = ENCOURAGING_MESSAGES[currentIndex % ENCOURAGING_MESSAGES.length];

  // Generate initials for avatar
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
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          className="fixed bottom-5 left-5 z-50 w-[320px]"
        >
          <div className="relative bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100/60">
            {/* Top progress bar — Arthritis Foundation magenta accent */}
            <div className="h-[3px] bg-gray-100 w-full">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E31B54] to-[#00843D]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>

            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2.5 right-2.5 text-gray-300 hover:text-gray-500 transition-colors p-1 rounded-full hover:bg-gray-50 z-10"
              aria-label="Dismiss notifications"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Main content */}
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-start gap-3">
                {/* Avatar with initials */}
                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-bold tracking-tight ${
                  isLarge
                    ? "bg-gradient-to-br from-[#00843D] to-[#006B32] text-white shadow-lg shadow-[#00843D]/20"
                    : "bg-[#e6f4ec] text-[#00843D]"
                }`}>
                  {initials}
                  {isLarge && (
                    <motion.span
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm"
                    >
                      <span className="text-[7px] text-white">★</span>
                    </motion.span>
                  )}
                </div>

                <div className="flex-1 min-w-0 pr-5">
                  <p className="text-[13px] leading-snug text-gray-800">
                    <span className="font-semibold text-gray-900">{name}</span>
                    <span className="text-gray-500"> donated </span>
                    <span className="font-bold text-[#00843D]">
                      {symbol}{donation.amount}
                    </span>
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00843D] animate-pulse" />
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                      {timeAgo}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer CTA — inspired by Arthritis Foundation's "Donate Now" prominence */}
            <div className="px-4 pb-3.5 pt-1">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#f0faf4] to-[#fef2f5] rounded-xl px-3.5 py-2.5">
                <p className="text-[11px] text-gray-600 font-medium leading-tight max-w-[170px]">
                  {encouragingMsg}
                </p>
                <button
                  onClick={() => navigate("/donate")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#E31B54] hover:bg-[#c9174a] text-white text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm shadow-[#E31B54]/20 group flex-shrink-0"
                >
                  Donate
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Dot indicator */}
            <div className="flex justify-center gap-1 pb-2.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`w-1 h-1 rounded-full transition-colors ${
                    currentIndex % 3 === i ? "bg-[#00843D]" : "bg-gray-200"
                  }`}
                />
              ))}
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
