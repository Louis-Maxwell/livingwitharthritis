import { memo, type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard = memo(({ children, className = "", onClick }: GlassCardProps) => (
  <div
    onClick={onClick}
    className={`relative bg-card/60 backdrop-blur-xl border border-border/20 shadow-xl rounded-2xl overflow-hidden ${className}`}
  >
    <div
      className="absolute inset-0 bg-gradient-to-br from-card/40 to-transparent pointer-events-none"
      aria-hidden="true"
    />
    <div className="relative z-10">{children}</div>
  </div>
));

GlassCard.displayName = "GlassCard";
export default GlassCard;
