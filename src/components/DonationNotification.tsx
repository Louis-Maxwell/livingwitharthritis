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
  const { latestDonation } = useRealtimeDonations();

  // Fallback demo donations for when there are no real donations
  const demoDonations: Donation[] = [
    { id: "1", name: "Linda M.", amount: 100, location: "Novato", country: "United States" },
    { id: "2", name: "Sarah K.", amount: 50, location: "London", country: "United Kingdom" },
    { id: "3", name: "Michael R.", amount: 75, location: "Toronto", country: "Canada" },
    { id: "4", name: "Emma T.", amount: 150, location: "Sydney", country: "Australia" },
    { id: "5", name: "David L.", amount: 25, location: "Berlin", country: "Germany" },
    { id: "6", name: "Jessica P.", amount: 200, location: "New York", country: "United States" },
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

      const timeout = setTimeout(() => {
        setShowNotification(false);
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [latestDonation]);

  // Demo rotation — delayed 90s and only once per session
  useEffect(() => {
    // Check if user already dismissed in this session
    const dismissed = sessionStorage.getItem("donation_notification_dismissed");
    if (dismissed) return;

    let donationIndex = 0;

    const showNextDonation = () => {
      if (!latestDonation) {
        setCurrentDonation(demoDonations[donationIndex]);
        setShowNotification(true);

        setTimeout(() => {
          setShowNotification(false);
        }, 6000);

        donationIndex = (donationIndex + 1) % demoDonations.length;
      }
    };

    // Delay first notification by 90 seconds to let users engage first
    const initialTimeout = setTimeout(showNextDonation, 90000);
    const interval = setInterval(showNextDonation, 45000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [latestDonation]);

  if (!showNotification || !currentDonation) return null;

  return (
    <div 
      className="fixed bottom-6 left-6 z-50 animate-fade-in"
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
