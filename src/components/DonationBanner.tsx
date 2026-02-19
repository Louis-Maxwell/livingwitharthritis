import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useStripeDonation } from "@/hooks/useStripeDonation";
import { motion, AnimatePresence } from "framer-motion";

const DonationBanner = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("GBP");
  const [fundType, setFundType] = useState("research");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(100);
  const [giftAid, setGiftAid] = useState(false);
  const [showGiftAid, setShowGiftAid] = useState(false);
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
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

  const handleGiftAidToggle = (checked: boolean) => {
    setGiftAid(checked);
    if (checked && currency !== "GBP") {
      setCurrency("GBP");
    }
  };

  const handleDonate = async () => {
    const donationAmount = parseFloat(amount) || selectedQuickAmount || 0;
    if (donationAmount <= 0) return;

    await processDonation({
      amount: donationAmount,
      currency,
      fundType,
      giftAid,
      addressLine1: giftAid ? addressLine1 : undefined,
      addressLine2: giftAid ? addressLine2 : undefined,
      city: giftAid ? city : undefined,
      postcode: giftAid ? postcode : undefined,
    });
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
        {/* Main donation controls */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
            <span className="text-sm mr-1.5" aria-hidden="true">
              {currency === "GBP" ? "🇬🇧" : currency === "USD" ? "🇺🇸" : "🇪🇺"}
            </span>
            <label htmlFor="currency-select" className="sr-only">Select currency</label>
            <Select value={currency} onValueChange={(v) => { setCurrency(v); if (v !== "GBP") setGiftAid(false); }}>
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

          {/* Gift Aid toggle — GBP only */}
          {currency === "GBP" && (
            <button
              type="button"
              onClick={() => setShowGiftAid((v) => !v)}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs h-8 px-3 rounded-full transition-all duration-200"
              aria-expanded={showGiftAid}
              aria-label="Toggle Gift Aid options"
            >
              <span className="text-[hsl(var(--primary))] font-semibold">Gift Aid</span>
              {showGiftAid ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}

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

        {/* Gift Aid expandable panel */}
        <AnimatePresence>
          {showGiftAid && currency === "GBP" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="max-w-2xl mx-auto">
                  {/* Gift Aid checkbox */}
                  <div className="flex items-start gap-3 mb-3">
                    <Checkbox
                      id="gift-aid-checkbox"
                      checked={giftAid}
                      onCheckedChange={(checked) => handleGiftAidToggle(Boolean(checked))}
                      className="mt-0.5 border-white/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label htmlFor="gift-aid-checkbox" className="text-xs text-white/80 leading-relaxed cursor-pointer">
                      <span className="font-semibold text-[hsl(var(--primary))]">Claim Gift Aid</span> — I am a UK taxpayer and I understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my donations, it is my responsibility to pay any difference. This adds <span className="font-semibold text-[hsl(var(--primary))]">25p per £1</span> you donate at no extra cost.
                    </label>
                  </div>

                  {/* Address fields — required for HMRC */}
                  <AnimatePresence>
                    {giftAid && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[10px] text-white/50 mb-2">Your home address is required by HMRC for Gift Aid claims.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Input
                            placeholder="Address line 1 *"
                            value={addressLine1}
                            onChange={(e) => setAddressLine1(e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-xs h-8 rounded-lg"
                            aria-label="Address line 1"
                            required
                          />
                          <Input
                            placeholder="Address line 2"
                            value={addressLine2}
                            onChange={(e) => setAddressLine2(e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-xs h-8 rounded-lg"
                            aria-label="Address line 2"
                          />
                          <Input
                            placeholder="Town / City *"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-xs h-8 rounded-lg"
                            aria-label="Town or city"
                            required
                          />
                          <Input
                            placeholder="Postcode * (e.g. SW1A 1AA)"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-xs h-8 rounded-lg"
                            aria-label="UK Postcode"
                            required
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DonationBanner;
