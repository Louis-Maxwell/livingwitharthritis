import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StripeDonationModal from "@/components/StripeDonationModal";
import { Link } from "react-router-dom";

const PRESETS = [50, 150, 200, 500];

const FUND_OPTIONS = [
  { value: "research", label: "Arthritis Research" },
  { value: "general", label: "Most Needed Now" },
  { value: "support", label: "Patient Support" },
  { value: "helpline", label: "Helpline" },
  { value: "zakat", label: "Zakat Appeal" },
];

const DonationQuickBar = () => {
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(50);
  const [fund, setFund] = useState("research");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeAmount = amount ? parseFloat(amount) : selectedPreset ?? 0;

  const handlePreset = (val: number) => {
    setSelectedPreset(val);
    setAmount("");
  };

  const handleDonate = () => {
    if (activeAmount > 0) setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-primary text-primary-foreground overflow-x-hidden">
        <div className="container mx-auto max-w-full px-3 sm:px-4 py-2">
          <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-2">
            {/* Frequency + currency */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="flex items-center bg-background/15 rounded-full p-0.5 min-h-11 lg:h-9 lg:min-h-0">
                {(["one-time", "monthly"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    aria-pressed={frequency === f}
                    className={`min-h-11 min-w-11 px-4 rounded-full text-xs font-bold transition-colors lg:h-8 lg:min-h-0 ${
                      frequency === f
                        ? "bg-background text-primary"
                        : "text-primary-foreground"
                    }`}
                  >
                    {f === "one-time" ? "One-time" : "Monthly"}
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center bg-background/15 rounded-full h-11 lg:h-9 pl-3 pr-1 gap-2">
                <span className="text-xs font-bold tracking-wide">GB</span>
                <div className="flex items-center bg-foreground/25 rounded-full h-7 px-2.5 gap-1">
                  <span className="text-xs font-bold">GBP</span>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                    <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Amount input + preset chips — wrap, never scroll sideways */}
            <div className="flex flex-wrap items-center justify-center gap-2 min-w-0">
              <div className="bg-background/15 rounded-full min-h-11 lg:h-9 lg:min-h-0 px-4 flex items-center w-[min(100%,7.5rem)] sm:w-[84px] lg:w-[110px] shrink-0">
                <Input
                  type="number"
                  min="1"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedPreset(null);
                  }}
                  aria-label="Donation amount in GBP"
                  className="border-0 h-8 px-0 bg-transparent text-sm font-semibold text-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-primary-foreground"
                />
              </div>

              {PRESETS.map((preset) => {
                const isActive = selectedPreset === preset && !amount;
                return (
                  <button
                    key={preset}
                    onClick={() => handlePreset(preset)}
                    aria-pressed={isActive}
                    className={`min-h-11 min-w-11 px-3 sm:px-4 rounded-full text-sm font-bold transition-colors lg:h-9 lg:min-h-0 ${
                      isActive
                        ? "bg-background text-primary"
                        : "bg-background/15 text-primary-foreground hover:bg-background/25"
                    }`}
                  >
                    £{preset}
                  </button>
                );
              })}
            </div>

            {/* Fund + donate actions */}
            <div className="flex flex-wrap items-center justify-center gap-2 min-w-0">
              <Select value={fund} onValueChange={setFund}>
                <SelectTrigger
                  aria-label="Choose appeal"
                  className="min-h-11 h-11 lg:h-9 lg:min-h-0 bg-background/15 text-primary-foreground border-0 rounded-full text-xs font-semibold w-full max-w-[16rem] sm:w-[160px] sm:max-w-none px-3 sm:px-4 focus:ring-0 focus:ring-offset-0 [&>svg]:opacity-80"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FUND_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={handleDonate}
                disabled={activeAmount <= 0}
                className="min-h-11 h-11 lg:h-9 lg:min-h-0 bg-transparent hover:bg-background/10 text-primary-foreground font-extrabold tracking-[0.15em] rounded-full px-5 text-sm shadow-none border-0"
              >
                DONATE
              </Button>

              <Link
                to="/zakat-appeal"
                className="min-h-11 inline-flex items-center justify-center px-4 rounded-full text-sm font-extrabold tracking-[0.15em] text-primary-foreground hover:bg-background/10 transition-colors"
              >
                ZAKAT APPEAL
              </Link>
            </div>
          </div>
        </div>
      </div>

      <StripeDonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={activeAmount}
        currency="GBP"
        fundType={fund}
      />
    </>
  );
};

export default DonationQuickBar;
