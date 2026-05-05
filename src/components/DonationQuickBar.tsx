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

const PRESETS = [50, 150, 200, 500];

const FUND_OPTIONS = [
  { value: "general", label: "Most Needed Now" },
  { value: "research", label: "Arthritis Research" },
  { value: "support", label: "Patient Support" },
  { value: "helpline", label: "Helpline" },
  { value: "zakat", label: "Zakat Appeal" },
];

interface DonationQuickBarProps {
  headline?: string;
  ctaHref?: string;
}

const DonationQuickBar = ({
  headline = "Help fund free arthritis support today —",
  ctaHref,
}: DonationQuickBarProps) => {
  const [amount, setAmount] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(200);
  const [fund, setFund] = useState("general");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeAmount = amount ? parseFloat(amount) : selectedPreset ?? 0;

  const handlePreset = (val: number) => {
    setSelectedPreset(val);
    setAmount("");
  };

  const handleQuickDonate = () => {
    if (activeAmount > 0) setIsModalOpen(true);
  };

  return (
    <>
      {/* Pink announcement strip */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
          <p className="text-sm sm:text-base font-bold italic">
            {headline}
          </p>
          {ctaHref && (
            <a
              href={ctaHref}
              className="text-sm sm:text-base font-bold italic underline underline-offset-4 hover:opacity-90"
            >
              Learn More
            </a>
          )}
        </div>
      </div>

      {/* Donation bar */}
      <div className="bg-[hsl(195_85%_55%)]">
        <div className="container mx-auto px-3 sm:px-6 py-3">
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 sm:gap-3 justify-center">
            {/* Currency display */}
            <div className="flex items-center gap-2 bg-white rounded-md px-3 h-11 shrink-0">
              <span className="text-base" aria-hidden>🇬🇧</span>
              <span className="text-sm font-bold text-foreground">GBP</span>
            </div>

            {/* Custom amount input */}
            <div className="bg-white rounded-md h-11 px-3 flex items-center min-w-[140px] sm:min-w-[180px] flex-1 sm:flex-initial">
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
                className="border-0 h-9 px-0 text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-muted-foreground/60"
              />
            </div>

            {/* Preset amounts */}
            <div className="flex gap-2 flex-wrap justify-center">
              {PRESETS.map((preset) => {
                const isActive = selectedPreset === preset && !amount;
                return (
                  <button
                    key={preset}
                    onClick={() => handlePreset(preset)}
                    aria-pressed={isActive}
                    className={`h-11 px-3 sm:px-4 rounded-md text-sm font-bold transition-colors min-w-[72px] ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-white text-foreground hover:bg-white/90"
                    }`}
                  >
                    £{preset}{" "}
                    <span className="text-[10px] font-semibold opacity-70 align-middle">
                      GBP
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Fund select */}
            <Select value={fund} onValueChange={setFund}>
              <SelectTrigger
                aria-label="Choose appeal"
                className="h-11 bg-white text-foreground border-0 rounded-md text-sm font-medium min-w-[170px] focus:ring-0 focus:ring-offset-0"
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

            {/* Payment logos */}
            <div
              className="hidden md:flex items-center gap-1.5 bg-white/95 rounded-md px-3 h-11 text-[10px] font-bold text-foreground/70 tracking-wider"
              aria-label="Accepted payment methods"
            >
              <span>VISA</span>
              <span>·</span>
              <span>MC</span>
              <span>·</span>
              <span>AMEX</span>
              <span>·</span>
              <span>APPLE PAY</span>
            </div>

            {/* Quick donate */}
            <Button
              onClick={handleQuickDonate}
              disabled={activeAmount <= 0}
              className="h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold tracking-wider rounded-md px-5 sm:px-7 text-sm shadow-md"
            >
              QUICK DONATE
            </Button>
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
