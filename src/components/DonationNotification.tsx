import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Donation {
  id: number;
  name: string;
  amount: number;
  location: string;
  country: string;
}

const DonationNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [currentDonation, setCurrentDonation] = useState<Donation | null>(null);

  // Simulated donation data
  const donations: Donation[] = [
    { id: 1, name: "Linda M.", amount: 100, location: "Novato", country: "United States" },
    { id: 2, name: "Sarah K.", amount: 50, location: "London", country: "United Kingdom" },
    { id: 3, name: "Michael R.", amount: 75, location: "Toronto", country: "Canada" },
    { id: 4, name: "Emma T.", amount: 150, location: "Sydney", country: "Australia" },
    { id: 5, name: "David L.", amount: 25, location: "Berlin", country: "Germany" },
    { id: 6, name: "Jessica P.", amount: 200, location: "New York", country: "United States" },
  ];

  useEffect(() => {
    let donationIndex = 0;

    const showNextDonation = () => {
      setCurrentDonation(donations[donationIndex]);
      setShowNotification(true);

      // Hide after 6 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 6000);

      donationIndex = (donationIndex + 1) % donations.length;
    };

    // Show first donation after 3 seconds
    const initialTimeout = setTimeout(showNextDonation, 3000);

    // Then show a new donation every 15 seconds
    const interval = setInterval(showNextDonation, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

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
              ${currentDonation.amount}
            </span>
            <span className="text-xl">🥳</span>
          </div>
          <p className="text-sm text-muted-foreground">
            📍 {currentDonation.location}, {currentDonation.country}
          </p>
        </div>
        <button
          onClick={() => setShowNotification(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DonationNotification;
