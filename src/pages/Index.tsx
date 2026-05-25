import { useState } from "react";
import { X } from "lucide-react";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (amount: number, frequency: "one-time" | "monthly") => void;
}

type DonationAmount = 10 | 25 | 50 | 100;

export default function DonationModal({ isOpen, onClose, onSubmit }: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<DonationAmount | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts: DonationAmount[] = [10, 25, 50, 100];

  const handlePresetClick = (amount: DonationAmount) => {
    setSelectedAmount(amount);
    setCustomAmount(""); // Clear custom amount when preset is selected
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null); // Clear preset selection when custom amount is entered
  };

  const getFinalAmount = (): number => {
    if (customAmount) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? 0 : parsed;
    }
    return selectedAmount || 0;
  };

  const handleContinue = async () => {
    const amount = getFinalAmount();

    if (amount < 1) {
      alert("Please select or enter a donation amount of at least £1");
      return;
    }

    setIsProcessing(true);

    try {
      // In production, integrate with Stripe here
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call

      if (onSubmit) {
        onSubmit(amount, frequency);
      }

      onClose();
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("There was an error processing your donation. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Close donation modal"
          disabled={isProcessing}
        >
          <X className="h-5 w-5 text-slate-900 dark:text-slate-100" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 id="donation-modal-title" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Support Our Mission
            </h2>
            <p className="mt-2 text-base text-slate-700 dark:text-slate-300">
              Help us provide free, evidence-based OA care to everyone across the UK.
            </p>
          </div>

          {/* Preset amounts */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-slate-900 dark:text-slate-100">Select amount</label>
            <div className="grid grid-cols-2 gap-3">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handlePresetClick(amount)}
                  disabled={isProcessing}
                  className={`
                    h-16 rounded-lg border-2 text-lg font-semibold transition-all
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${
                      selectedAmount === amount
                        ? "border-primary bg-primary text-white"
                        : "border-slate-300 bg-white text-slate-900 hover:border-primary hover:bg-primary hover:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-primary dark:hover:bg-primary"
                    }
                  `}
                  aria-pressed={selectedAmount === amount}
                >
                  £{amount}
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          <div className="mb-6">
            <label
              htmlFor="custom-amount"
              className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100"
            >
              Or enter custom amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900 dark:text-slate-100 font-medium">
                £
              </span>
              <input
                id="custom-amount"
                type="number"
                min="1"
                step="0.01"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="50"
                disabled={isProcessing}
                className="w-full h-12 pl-8 pr-4 rounded-lg border-2 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Frequency */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-slate-900 dark:text-slate-100">
              Donation frequency
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["one-time", "monthly"] as const).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFrequency(freq)}
                  disabled={isProcessing}
                  className={`
                    h-12 rounded-lg border-2 text-base font-medium transition-all
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${
                      frequency === freq
                        ? "border-primary bg-primary text-white"
                        : "border-slate-300 bg-white text-slate-900 hover:border-primary hover:bg-primary hover:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-primary dark:hover:bg-primary"
                    }
                  `}
                  aria-pressed={frequency === freq}
                >
                  {freq === "one-time" ? "One-time" : "Monthly"}
                </button>
              ))}
            </div>
          </div>

          {/* Impact message */}
          {getFinalAmount() > 0 && (
            <div className="mb-6 rounded-lg border-2 border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                💙 Your {frequency === "monthly" ? "monthly " : ""}donation of £{getFinalAmount().toFixed(2)} helps us
                reach {Math.round(getFinalAmount() * 20)} more people with free OA resources
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 h-12 rounded-lg border-2 border-slate-300 bg-white text-base font-medium text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleContinue}
              disabled={isProcessing || getFinalAmount() < 1}
              className="flex-1 h-12 rounded-lg bg-primary text-base font-bold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "Continue to Payment"}
            </button>
          </div>

          {/* Trust signals */}
          <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1">🔒 Secure payment via Stripe</span>
              <span className="flex items-center gap-1">🧡 UK Registered Charity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
