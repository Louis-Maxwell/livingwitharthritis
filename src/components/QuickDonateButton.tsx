import { memo } from "react";
import { Heart } from "lucide-react";
import { GOFUNDME_URL } from "@/components/landing/homeJobs";

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
    <a
      href={GOFUNDME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center justify-center gap-2 rounded-full font-semibold
        transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      aria-label={`${buttonLabel} (opens in a new tab)`}
    >
      <Heart className="w-4 h-4 fill-current" aria-hidden="true" />
      {buttonLabel}
    </a>
  );
});

QuickDonateButton.displayName = "QuickDonateButton";
export default QuickDonateButton;
