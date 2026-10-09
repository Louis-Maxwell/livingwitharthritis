import { memo, useState } from "react";
import StripeDonationModal from "@/components/StripeDonationModal";
import { Heart } from "lucide-react";

interface QuickDonateButtonProps {
  amount: number;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  recurring?: boolean;
  label?: string;
  className?: string;
}

const QuickDonateButton = memo(({
  amount,
  variant = "primary",
  size = "md",
  fullWidth = false,
  recurring = false,
  label,
  className = "",
}: QuickDonateButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sizeClasses = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline: "border border-border bg-background text-foreground hover:bg-muted",
  };

  const buttonLabel = label || `Donate £${amount}${recurring ? "/mo" : ""}`;

  return (
    <>
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      className={`
        inline-flex items-center justify-center gap-2 rounded-full font-semibold
        transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      <Heart className="w-4 h-4 fill-current" aria-hidden="true" />
      {buttonLabel}
    </button>
    <StripeDonationModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      amount={amount}
      currency="GBP"
      fundType="general"
      recurring={recurring}
    />
    </>
  );
});

QuickDonateButton.displayName = "QuickDonateButton";
export default QuickDonateButton;
