import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PayPalDonationModal from "./PayPalDonationModal";

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
    setSelectedQuickAmount(quickAmounts.includes(numValue) ? numValue : null);
  };

  const handleDonate = () => {
    const donationAmount = parseFloat(amount) || selectedQuickAmount || 0;
    if (donationAmount <= 0) return;
    setIsPayPalModalOpen(true);
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
    <div className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center bg-white/90 rounded-lg px-2.5 py-1 shadow-soft">
            <span className="text-base mr-1">
              {currency === "GBP" ? "🇬🇧" : currency === "USD" ? "🇺🇸" : "🇪🇺"}
            </span>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-14 border-0 p-0 h-auto bg-transparent text-foreground font-semibold text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            placeholder="Amount"
            type="number"
            min="1"
            max="100000"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="w-24 bg-white/90 border-0 shadow-soft text-foreground font-medium text-xs h-8"
          />

          <div className="flex gap-1">
            {quickAmounts.map((value) => (
              <Button
                key={value}
                variant={selectedQuickAmount === value ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickAmount(value)}
                className={`${
                  selectedQuickAmount === value
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-white/90 text-foreground border-0 hover:bg-white"
                } font-semibold shadow-soft text-xs h-8 px-3`}
              >
                {getCurrencySymbol()}{value}
              </Button>
            ))}
          </div>

          <Select value={fundType} onValueChange={setFundType}>
            <SelectTrigger className="w-40 bg-white/90 border-0 shadow-soft text-foreground text-xs h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="research">Arthritis Research Fund</SelectItem>
              <SelectItem value="support">Patient Support Fund</SelectItem>
              <SelectItem value="helpline">Helpline Support</SelectItem>
              <SelectItem value="general">General Donation</SelectItem>
            </SelectContent>
          </Select>

          <Button
            size="sm"
            onClick={handleDonate}
            disabled={!amount && !selectedQuickAmount}
            className="btn-primary-cta px-4 h-8 text-[11px] font-bold"
          >
            QUICK DONATE
          </Button>
        </div>
      </div>

      <PayPalDonationModal
        isOpen={isPayPalModalOpen}
        onClose={() => setIsPayPalModalOpen(false)}
        amount={getDonationAmount()}
        currency={currency}
        fundType={fundType}
      />
    </div>
  );
};

export default DonationBanner;
