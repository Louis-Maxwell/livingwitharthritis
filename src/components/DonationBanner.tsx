import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useStripeDonation } from "@/hooks/useStripeDonation";

const DonationBanner = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("GBP");
  const [fundType, setFundType] = useState("research");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(100);
  const { processDonation, isLoading } = useStripeDonation();

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

  const handleDonate = async () => {
    const donationAmount = parseFloat(amount) || selectedQuickAmount || 0;
    if (donationAmount <= 0) return;
    await processDonation({ amount: donationAmount, currency, fundType });
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
    <div className="bg-navy text-navy-foreground" role="region" aria-label="Donation banner">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
            <span className="text-sm mr-1.5" aria-hidden="true">
              {currency === "GBP" ? "🇬🇧" : currency === "USD" ? "🇺🇸" : "🇪🇺"}
            </span>
            <label htmlFor="currency-select" className="sr-only">Select currency</label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency-select" className="w-14 border-0 p-0 h-auto bg-transparent text-white/90 font-medium text-xs" aria-label="Currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <label htmlFor="donation-amount" className="sr-only">Donation amount</label>
          <Input
            id="donation-amount"
            placeholder="Amount"
            type="number"
            min="1"
            max="100000"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="w-24 bg-white/10 border-0 text-white placeholder:text-white/40 font-medium text-xs h-8 rounded-full"
            aria-label={`Donation amount in ${currency}`}
          />

          <div className="flex gap-1.5" role="group" aria-label="Quick donation amounts">
            {quickAmounts.map((value) => (
              <Button
                key={value}
                variant={selectedQuickAmount === value ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickAmount(value)}
                aria-label={`Donate ${getCurrencySymbol()}${value}`}
                aria-pressed={selectedQuickAmount === value}
                className={`${
                  selectedQuickAmount === value
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-white/10 text-white/80 border-white/10 hover:bg-white/20 hover:text-white"
                } font-semibold text-xs h-8 px-3 rounded-full transition-all duration-300`}
              >
                {getCurrencySymbol()}{value}
              </Button>
            ))}
          </div>

          <label htmlFor="fund-type" className="sr-only">Select fund</label>
          <Select value={fundType} onValueChange={setFundType}>
            <SelectTrigger id="fund-type" className="w-40 bg-white/10 border-0 text-white/80 text-xs h-8 rounded-full" aria-label="Donation fund type">
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
            disabled={(!amount && !selectedQuickAmount) || isLoading}
            className="btn-primary-cta px-5 h-8 text-[11px] font-bold tracking-widest rounded-full"
            aria-label={`Donate ${getCurrencySymbol()}${getDonationAmount()} to ${fundType} fund`}
          >
            {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "DONATE"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationBanner;
