interface RobotIconProps {
  size?: number;
  className?: string;
}

export default function RobotIcon({ size = 48, className = "" }: RobotIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Antenna */}
      <line x1="32" y1="6" x2="32" y2="14" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="5" r="3" fill="hsl(var(--primary))" />

      {/* Head */}
      <rect x="12" y="14" width="40" height="32" rx="10" fill="hsl(var(--primary))" />
      
      {/* Face plate */}
      <rect x="16" y="18" width="32" height="24" rx="7" fill="white" />

      {/* Eyes */}
      <circle cx="24" cy="28" r="4.5" fill="hsl(var(--primary))" />
      <circle cx="40" cy="28" r="4.5" fill="hsl(var(--primary))" />
      {/* Eye glints */}
      <circle cx="25.5" cy="26.5" r="1.5" fill="white" />
      <circle cx="41.5" cy="26.5" r="1.5" fill="white" />

      {/* Smile */}
      <path d="M26 36 C28 39, 36 39, 38 36" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Ears */}
      <rect x="6" y="24" width="6" height="12" rx="3" fill="hsl(var(--primary))" />
      <rect x="52" y="24" width="6" height="12" rx="3" fill="hsl(var(--primary))" />

      {/* Neck */}
      <rect x="28" y="46" width="8" height="6" rx="2" fill="hsl(var(--primary))" />

      {/* Body hint */}
      <rect x="20" y="52" width="24" height="8" rx="4" fill="hsl(var(--primary))" />
    </svg>
  );
}
