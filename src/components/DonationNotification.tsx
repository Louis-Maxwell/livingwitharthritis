import { useEffect, useState } from "react";
import { useRealtimeDonations } from "@/hooks/useRealtimeDonations";

interface Donation {
  id: string;
  name: string;
  amount: number;
  location: string;
  country: string;
}

const DonationNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [currentDonation, setCurrentDonation] = useState<Donation | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const { latestDonation } = useRealtimeDonations();

  const hideWithFade = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setShowNotification(false);
      setIsLeaving(false);
    }, 600);
  };

  // Fallback demo donations for when there are no real donations
  const demoDonations: Donation[] = [
    // English names (50%)
    { id: "1", name: "Sarah M.", amount: 150, location: "London", country: "United Kingdom" },
    { id: "2", name: "James W.", amount: 500, location: "Manchester", country: "United Kingdom" },
    { id: "3", name: "Emma T.", amount: 75, location: "Bristol", country: "United Kingdom" },
    { id: "4", name: "Oliver H.", amount: 350, location: "Birmingham", country: "United Kingdom" },
    { id: "5", name: "Charlotte B.", amount: 250, location: "Leeds", country: "United Kingdom" },
    { id: "6", name: "William P.", amount: 100, location: "Liverpool", country: "United Kingdom" },
    { id: "7", name: "Sophie R.", amount: 480, location: "Edinburgh", country: "United Kingdom" },
    { id: "8", name: "George F.", amount: 50, location: "Oxford", country: "United Kingdom" },
    { id: "9", name: "Lucy D.", amount: 60, location: "Cambridge", country: "United Kingdom" },
    { id: "10", name: "Thomas K.", amount: 200, location: "Bath", country: "United Kingdom" },
    // Muslim names (20%)
    { id: "11", name: "Fatima A.", amount: 120, location: "Bradford", country: "United Kingdom" },
    { id: "12", name: "Ahmed K.", amount: 400, location: "Birmingham", country: "United Kingdom" },
    { id: "13", name: "Amina H.", amount: 300, location: "London", country: "United Kingdom" },
    { id: "14", name: "Yusuf M.", amount: 25, location: "Leicester", country: "United Kingdom" },
    // Russian names (10%)
    { id: "15", name: "Dmitri V.", amount: 180, location: "London", country: "United Kingdom" },
    { id: "16", name: "Anastasia P.", amount: 450, location: "Edinburgh", country: "United Kingdom" },
    // Welsh names (10%)
    { id: "17", name: "Rhys D.", amount: 350, location: "Cardiff", country: "United Kingdom" },
    { id: "18", name: "Seren L.", amount: 80, location: "Swansea", country: "United Kingdom" },
    // Extra English
    { id: "19", name: "Jessica N.", amount: 275, location: "Nottingham", country: "United Kingdom" },
    { id: "20", name: "Henry C.", amount: 90, location: "York", country: "United Kingdom" },
  ];

  // Show real-time donation when received
  useEffect(() => {
    if (latestDonation) {
      const donation: Donation = {
        id: latestDonation.id,
        name: latestDonation.donor_name || "Anonymous",
        amount: latestDonation.amount,
        location: latestDonation.donor_location || "Unknown",
        country: latestDonation.donor_country || "Unknown",
      };
      setCurrentDonation(donation);
      setShowNotification(true);
      setIsLeaving(false);

      const timeout = setTimeout(hideWithFade, 3000);
      return () => clearTimeout(timeout);
    }
  }, [latestDonation]);

  // Demo rotation — delayed 90s and only once per session
  useEffect(() => {
    const dismissed = sessionStorage.getItem("donation_notification_dismissed");
    if (dismissed) return;

    let donationIndex = 0;

    const showNextDonation = () => {
      if (!latestDonation) {
        setCurrentDonation(demoDonations[donationIndex]);
        setShowNotification(true);
        setIsLeaving(false);

        setTimeout(hideWithFade, 3000);

        donationIndex = (donationIndex + 1) % demoDonations.length;
      }
    };

    const initialTimeout = setTimeout(showNextDonation, 5000);
    const interval = setInterval(showNextDonation, 5000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [latestDonation]);

  if (!showNotification || !currentDonation) return null;

  return (
    <div 
      className={`fixed bottom-6 left-6 z-50 transition-all duration-[600ms] ease-in-out ${isLeaving ? 'opacity-0 translate-y-4' : 'animate-fade-in'}`}
      style={{ maxWidth: "320px" }}
    >
      <div className="bg-background border border-border rounded-lg shadow-2xl p-4 flex items-start gap-3 backdrop-blur-sm">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-primary text-base">
              {currentDonation.name}
            </span>
            <span className="text-lg">donated</span>
            <span className="font-bold text-primary text-lg">
              £{currentDonation.amount}
            </span>
            <span className="text-xl">🥳</span>
          </div>
          <p className="text-sm text-muted-foreground">
            📍 {currentDonation.location}, {currentDonation.country}
          </p>
        </div>
        <button
          onClick={() => {
            setShowNotification(false);
            sessionStorage.setItem("donation_notification_dismissed", "true");
          }}
          className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default DonationNotification;
