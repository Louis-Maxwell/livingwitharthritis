import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Stethoscope, Users, Calendar, BookOpen, Microscope, HandHeart, Phone, Gift, Loader2 } from "lucide-react";
import PayPalDonationModal from "./PayPalDonationModal";

const causes = [
  { icon: Heart, label: "Research Fund", color: "bg-primary" },
  { icon: Stethoscope, label: "Patient Care", color: "bg-medical-blue" },
  { icon: Users, label: "Support Groups", color: "bg-accent" },
  { icon: Calendar, label: "Community Events", color: "bg-primary" },
  { icon: BookOpen, label: "Education", color: "bg-accent" },
  { icon: Microscope, label: "Medical Research", color: "bg-primary" },
  { icon: HandHeart, label: "Care Support", color: "bg-medical-blue" },
  { icon: Phone, label: "Helpline Fund", color: "bg-accent" },
  { icon: Gift, label: "Legacy Giving", color: "bg-primary" }
];

const DonationBanner = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("GBP");
  const [fundType, setFundType] = useState("research");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(100);
  const [isPayPalModalOpen, setIsPayPalModalOpen] = useState(false);

  const quickAmounts = [25, 50, 100, 250];

  const handleQuickAmount = (value: number) => {
    setSelectedQuickAmount(value);
    setAmount(value.toString());
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const numValue = parseFloat(value);
    if (quickAmounts.includes(numValue)) {
      setSelectedQuickAmount(numValue);
    } else {
      setSelectedQuickAmount(null);
    }
  };

  const handleDonate = () => {
    const donationAmount = parseFloat(amount) || selectedQuickAmount || 0;
    if (donationAmount <= 0) {
      return;
    }
    setIsPayPalModalOpen(true);
  };

  const handleModalClose = () => {
    setIsPayPalModalOpen(false);
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case "GBP": return "£";
      case "USD": return "$";
      case "EUR": return "€";
      default: return "£";
    }
  };

  const getDonationAmount = () => parseFloat(amount) || selectedQuickAmount || 100;

  return (
    <div className="bg-gradient-medical text-secondary-foreground">
      {/* Causes Section */}
      <div className="bg-accent/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6">
            {causes.map((cause, index) => {
              const IconComponent = cause.icon;
              return (
                <div 
                  key={index}
                  className="flex flex-col items-center cursor-pointer group transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full ${cause.color} flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300`}>
                    <IconComponent className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <span className="text-xs mt-1 text-accent-foreground font-medium text-center max-w-[80px] leading-tight">
                    {cause.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Donation Form Section */}
      <div className="bg-gradient-medical">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
            {/* Currency Selector */}
            <div className="flex items-center bg-white/95 rounded-lg px-3 py-2 shadow-soft">
              <span className="text-2xl mr-2">
                {currency === "GBP" ? "🇬🇧" : currency === "USD" ? "🇺🇸" : "🇪🇺"}
              </span>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-16 border-0 p-0 h-auto bg-transparent text-foreground font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount Input */}
            <Input 
              placeholder="Amount"
              type="number"
              min="1"
              max="100000"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="w-32 bg-white/95 border-0 shadow-soft text-foreground font-medium"
            />

            {/* Quick Amount Buttons */}
            <div className="flex gap-2">
              {quickAmounts.map((value, index) => (
                <Button
                  key={index}
                  variant={selectedQuickAmount === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuickAmount(value)}
                  className={`${
                    selectedQuickAmount === value 
                      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" 
                      : "bg-white/95 text-foreground border-white/20 hover:bg-white hover:text-foreground"
                  } font-semibold shadow-soft`}
                >
                  {getCurrencySymbol()}{value}
                </Button>
              ))}
            </div>

            {/* Fund Selector */}
            <Select value={fundType} onValueChange={setFundType}>
              <SelectTrigger className="w-48 bg-white/95 border-0 shadow-soft text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="research">Arthritis Research Fund</SelectItem>
                <SelectItem value="support">Patient Support Fund</SelectItem>
                <SelectItem value="helpline">Helpline Support</SelectItem>
                <SelectItem value="general">General Donation</SelectItem>
              </SelectContent>
            </Select>

            {/* PayPal Badge */}
            <div className="flex items-center gap-2 bg-[#003087] rounded-lg px-4 py-2 shadow-soft">
              <span className="text-white font-bold text-sm">Pay</span>
              <span className="text-[#009cde] font-bold text-sm">Pal</span>
              <span className="text-white/80 text-xs ml-1">Secure</span>
            </div>

            {/* Quick Donate Button */}
            <Button 
              size="lg"
              onClick={handleDonate}
              disabled={!amount && !selectedQuickAmount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold px-6 py-3 shadow-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              QUICK DONATE
            </Button>

            {/* PayPal Button */}
            <Button 
              size="lg"
              onClick={handleDonate}
              disabled={!amount && !selectedQuickAmount}
              className="bg-[#0070ba] hover:bg-[#003087] text-white font-bold px-6 py-3 shadow-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center gap-2"
            >
              <span className="font-bold">Pay</span>
              <span className="text-[#00b8ff] font-bold">Pal</span>
            </Button>
          </div>
        </div>
      </div>

      {/* PayPal Modal */}
      <PayPalDonationModal
        isOpen={isPayPalModalOpen}
        onClose={handleModalClose}
        amount={getDonationAmount()}
        currency={currency}
        fundType={fundType}
      />
    </div>
  );
};

export default DonationBanner;
