import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { GOFUNDME_URL } from "@/components/landing/homeJobs";

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
  // On phones the full bar used to fill a third of the first screen above
  // every page; it now starts as one row and opens on request.
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const handlePreset = (val: number) => {
    setSelectedPreset(val);
    setAmount("");
  };

  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-3 sm:px-4 py-2">
          {!mobileExpanded && (
            <div className="flex items-center justify-center gap-2 sm:hidden">
              <a
                href={GOFUNDME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 inline-flex items-center px-4 rounded-full bg-background text-primary text-sm font-extrabold tracking-[0.1em]"
              >
                DONATE
                <span className="sr-only"> on GoFundMe (opens in a new tab)</span>
              </a>
              <Link
                to="/zakat-appeal"
                className="h-9 inline-flex items-center px-4 rounded-full text-sm font-extrabold tracking-[0.1em] text-primary-foreground hover:bg-background/10 transition-colors"
              >
                ZAKAT APPEAL
              </Link>
            </div>
          )}
          <div
            id="donation-quick-bar-options"
            className={`${mobileExpanded ? "flex" : "hidden sm:flex"} flex-wrap items-center justify-center gap-1.5 sm:gap-2`}
          >
            {/* Frequency pill toggle */}
            <div className="flex items-center bg-background/15 rounded-full p-0.5 h-9">
              {(["one-time", "monthly"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFrequency(f)}
                  aria-pressed={frequency === f}
                  className={`h-8 px-4 rounded-full text-xs font-bold transition-colors ${
                    frequency === f
                      ? "bg-background text-primary"
                      : "text-primary-foreground"
                  }`}
                >
                  {f === "one-time" ? "One-time" : "Monthly"}
                </button>
              ))}
            </div>

            {/* Currency: donations are taken in pounds only, so this is a label,
                not a control (it previously showed a dropdown chevron that did nothing). */}
            <div className="flex items-center bg-background/15 rounded-full h-9 px-3">
              <span className="text-xs font-bold tracking-wide">£ GBP</span>
            </div>

            {/* Amount input */}
            <div className="bg-background/15 rounded-full h-9 px-4 flex items-center w-[84px] sm:w-[110px] shrink-0">
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
                      ? "bg-background text-primary"
                      : "bg-background/15 text-primary-foreground hover:bg-background/25"
                  }`}
                >
                  £{preset}
                </button>
              );
            })}

            {/* Fund select */}
            {/* Native select: accessible by default and avoids shipping the
                Radix Select bundle in the site-wide header. */}
            <select
              value={fund}
              onChange={(e) => setFund(e.target.value)}
              aria-label="Choose appeal"
              className="h-9 bg-background/15 text-primary-foreground border-0 rounded-full text-xs font-semibold w-[120px] sm:w-[160px] px-3 sm:px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-background cursor-pointer [&>option]:text-foreground [&>option]:bg-background"
            >
              {FUND_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* DONATE */}
            <Button
              asChild
              className="h-9 bg-transparent hover:bg-background/10 text-primary-foreground font-extrabold tracking-[0.15em] rounded-full px-5 text-sm shadow-none border-0"
            >
              <a href={GOFUNDME_URL} target="_blank" rel="noopener noreferrer">
                DONATE
                <span className="sr-only"> on GoFundMe (opens in a new tab)</span>
              </a>
            </Button>

            {/* Zakat Appeal */}
            <Link
              to="/zakat-appeal"
              className="h-9 inline-flex items-center px-4 rounded-full text-sm font-extrabold tracking-[0.15em] text-primary-foreground hover:bg-background/10 transition-colors"
            >
              ZAKAT APPEAL
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default DonationQuickBar;
