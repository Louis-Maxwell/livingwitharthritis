import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ChevronDown } from "lucide-react";

const StripeDonationModal = lazy(() => import("./StripeDonationModal"));

const DonationBanner = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("GBP");
  const [fundType, setFundType] = useState("research");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(100);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const navigate = useNavigate();

  const oneTimeAmounts = [25, 50, 100, 250];
  const monthlyAmounts = [5, 10, 25, 50];
  const quickAmounts = recurring ? monthlyAmounts : oneTimeAmounts;

  const handleQuickAmount = (value: number) => {
    setSelectedQuickAmount(value);
    setAmount(value.toString());
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const numValue = parseFloat(value);
    setSelectedQuickAmount(quickAmounts.includes(numValue) ? numValue : null);
  };

  const handleRecurringToggle = (isRecurring: boolean) => {
    setRecurring(isRecurring);
    const defaults = isRecurring ? monthlyAmounts : oneTimeAmounts;
    setSelectedQuickAmount(defaults[2]);
    setAmount(defaults[2].toString());
  };

  const handleDonate = () => {
    const donationAmount = parseFloat(amount) || selectedQuickAmount || 0;
    if (donationAmount <= 0) return;
    setIsModalOpen(true);
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
    <div className="bg-primary text-primary-foreground">
      {/* ── Mobile: slim collapsed bar ── */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full flex items-center justify-between px-4 py-2 active:bg-white/5 transition-colors"
          aria-expanded={mobileExpanded}
          aria-label={mobileExpanded ? "Collapse donation form" : "Expand donation form"}
        >
          <div className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-[hsl(0,72%,51%)] fill-[hsl(0,72%,51%)]/30" />
            <span className="text-xs font-bold tracking-wide">
              Support our mission — Donate now
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 text-white/60 transition-transform duration-200 ${mobileExpanded ? "rotate-180" : ""}`} />
        </button>

        {/* Expanded mobile donation form */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            mobileExpanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-3 pt-1 space-y-2.5 border-t border-white/10">
            {/* Recurring toggle */}
            <div className="flex items-center bg-white/10 rounded-full p-0.5 h-8 w-fit">
              <button
                onClick={() => handleRecurringToggle(false)}
                className={`px-3 h-7 rounded-full text-[11px] font-bold tracking-wide transition-all ${
                  !recurring ? "bg-primary text-primary-foreground" : "text-white/60 hover:text-white/80"
                }`}
              >
                One-time
              </button>
              <button
                onClick={() => handleRecurringToggle(true)}
                className={`px-3 h-7 rounded-full text-[11px] font-bold tracking-wide transition-all ${
                  recurring ? "bg-emerald-600 text-white" : "text-white/60 hover:text-white/80"
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Quick amounts */}
            <div className="flex gap-1.5 flex-wrap">
              {quickAmounts.map((value) => (
                <Button
                  key={value}
                  variant={selectedQuickAmount === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuickAmount(value)}
                  className={`${
                    selectedQuickAmount === value
                      ? recurring
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-white/10 text-white/80 border-white/10 hover:bg-white/20 hover:text-white"
                  } font-semibold text-xs h-8 px-3 rounded-full transition-all duration-300`}
                >
                  {getCurrencySymbol()}{value}{recurring ? "/mo" : ""}
                </Button>
              ))}
            </div>

            {/* Custom amount + fund */}
            <div className="flex items-center gap-2 flex-wrap">
              <Input
                placeholder="Amount"
                type="number"
                min="1"
                max="100000"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="w-24 bg-white/10 border-0 text-white placeholder:text-white/40 font-medium text-xs h-8 rounded-full"
              />
              <Select value={fundType} onValueChange={setFundType}>
                <SelectTrigger className="w-36 bg-white/10 border-0 text-white/80 text-xs h-8 rounded-full focus:ring-0 focus:ring-offset-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg shadow-lg border-border/30 min-w-[200px]">
                  <SelectItem value="research">Arthritis Research Fund</SelectItem>
                  <SelectItem value="support">Patient Support Fund</SelectItem>
                  <SelectItem value="helpline">Helpline Support</SelectItem>
                  <SelectItem value="general">General Donation</SelectItem>
                  <SelectItem value="zakat">Zakat Appeal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleDonate}
                disabled={!amount && !selectedQuickAmount}
                className={`flex-1 h-9 text-[11px] font-bold tracking-widest rounded-full ${
                  recurring ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "btn-primary-cta"
                }`}
              >
                {recurring ? "SUBSCRIBE" : "DONATE NOW"}
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/zakat-appeal")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 h-9 text-[11px] font-bold tracking-widest rounded-full"
              >
                ZAKAT
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop: full inline bar (unchanged) ── */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center bg-white/10 rounded-full p-0.5 h-8">
              <button
                onClick={() => handleRecurringToggle(false)}
                className={`px-3 h-7 rounded-full text-[11px] font-bold tracking-wide transition-all ${
                  !recurring ? "bg-primary text-primary-foreground" : "text-white/60 hover:text-white/80"
                }`}
              >
                One-time
              </button>
              <button
                onClick={() => handleRecurringToggle(true)}
                className={`px-3 h-7 rounded-full text-[11px] font-bold tracking-wide transition-all ${
                  recurring ? "bg-emerald-600 text-white" : "text-white/60 hover:text-white/80"
                }`}
              >
                Monthly
              </button>
            </div>

            <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
              <span className="text-sm mr-1.5">
                {currency === "GBP" ? "🇬🇧" : currency === "USD" ? "🇺🇸" : "🇪🇺"}
              </span>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-14 border-0 p-0 h-auto bg-transparent text-white/90 font-medium text-xs focus:ring-0 focus:ring-offset-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg shadow-lg border-border/30 min-w-[90px]">
                  <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
                  <SelectItem value="USD">🇺🇸 USD</SelectItem>
                  <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
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
              className="w-24 bg-white/10 border-0 text-white placeholder:text-white/40 font-medium text-xs h-8 rounded-full"
            />

            <div className="flex gap-1.5">
              {quickAmounts.map((value) => (
                <Button
                  key={value}
                  variant={selectedQuickAmount === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuickAmount(value)}
                  className={`${
                    selectedQuickAmount === value
                      ? recurring
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-white/10 text-white/80 border-white/10 hover:bg-white/20 hover:text-white"
                  } font-semibold text-xs h-8 px-3 rounded-full transition-all duration-300`}
                >
                  {getCurrencySymbol()}{value}{recurring ? "/mo" : ""}
                </Button>
              ))}
            </div>

            <Select value={fundType} onValueChange={setFundType}>
              <SelectTrigger className="w-40 bg-white/10 border-0 text-white/80 text-xs h-8 rounded-full focus:ring-0 focus:ring-offset-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg shadow-lg border-border/30 min-w-[200px]">
                <SelectItem value="research">Arthritis Research Fund</SelectItem>
                <SelectItem value="support">Patient Support Fund</SelectItem>
                <SelectItem value="helpline">Helpline Support</SelectItem>
                <SelectItem value="general">General Donation</SelectItem>
                <SelectItem value="zakat">Zakat Appeal</SelectItem>
              </SelectContent>
            </Select>

            <Button
              size="sm"
              onClick={handleDonate}
              disabled={!amount && !selectedQuickAmount}
              className={`px-5 h-8 text-[11px] font-bold tracking-widest rounded-full ${
                recurring ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "btn-primary-cta"
              }`}
            >
              {recurring ? "SUBSCRIBE" : "DONATE"}
            </Button>

            <Button
              size="sm"
              onClick={() => navigate("/zakat-appeal")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 h-8 text-[11px] font-bold tracking-widest rounded-full"
            >
              ZAKAT APPEAL
            </Button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Suspense fallback={null}>
          <StripeDonationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            amount={getDonationAmount()}
            currency={currency}
            fundType={fundType}
            recurring={recurring}
          />
        </Suspense>
      )}
    </div>
  );
};

export default DonationBanner;
