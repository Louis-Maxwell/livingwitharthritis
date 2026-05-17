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
      <div className="text-primary-foreground" style={{ backgroundColor: '#E60023' }}>
        <div className="container mx-auto px-3 sm:px-4 py-2">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-[#ff0000]">
            {/* Frequency pill toggle */}
            <div className="flex items-center bg-white/15 rounded-full p-0.5 h-9">
              {(["one-time", "monthly"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFrequency(f)}
                  aria-pressed={frequency === f}
                  className={`h-8 px-4 rounded-full text-xs font-bold transition-colors ${
                    frequency === f
                      ? "bg-white text-primary"
                      : "text-primary-foreground/90 hover:text-primary-foreground"
                  }`}
                >
                  {f === "one-time" ? "One-time" : "Monthly"}
                </button>
              ))}
            </div>

            {/* Currency */}
            <div className="flex items-center bg-white/15 rounded-full h-9 pl-3 pr-1 gap-2">
              <span className="text-xs font-bold tracking-wide">GB</span>
              <div className="flex items-center bg-white/20 rounded-full h-7 px-2.5 gap-1">
                <span className="text-xs font-bold">GBP</span>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            </div>

            {/* Amount input */}
            <div className="bg-white/15 rounded-full h-9 px-4 flex items-center w-[110px]">
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
                className="border-0 h-8 px-0 bg-transparent text-sm font-semibold text-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-primary-foreground/70"
              />
            </div>

            {/* Preset pills */}
            {PRESETS.map((preset) => {
              const isActive = selectedPreset === preset && !amount;
              return (
                <button
                  key={preset}
                  onClick={() => handlePreset(preset)}
                  aria-pressed={isActive}
                  className={`h-9 px-4 rounded-full text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-white text-primary"
                      : "bg-white/15 text-primary-foreground hover:bg-white/25"
                  }`}
                >
                  £{preset}
                </button>
              );
            })}

            {/* Fund select */}
            <Select value={fund} onValueChange={setFund}>
              <SelectTrigger
                aria-label="Choose appeal"
                className="h-9 bg-white/15 text-primary-foreground border-0 rounded-full text-xs font-semibold w-[160px] px-4 focus:ring-0 focus:ring-offset-0 [&>svg]:opacity-80"
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

            {/* DONATE */}
            <Button
              onClick={handleDonate}
              disabled={activeAmount <= 0}
              className="h-9 bg-transparent hover:bg-white/10 text-primary-foreground font-extrabold tracking-[0.15em] rounded-full px-5 text-sm shadow-none border-0"
            >
              DONATE
            </Button>

            {/* Zakat Appeal */}
            <Link
              to="/zakat-appeal"
              className="h-9 inline-flex items-center px-4 rounded-full text-sm font-extrabold tracking-[0.15em] text-primary-foreground hover:bg-white/10 transition-colors"
            >
              ZAKAT APPEAL
            </Link>
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
