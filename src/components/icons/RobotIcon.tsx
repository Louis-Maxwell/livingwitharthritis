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
      <defs>
        {/* Premium red gradient */}
        <linearGradient id="robotGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(1, 85%, 58%)" />
          <stop offset="100%" stopColor="hsl(1, 85%, 44%)" />
        </linearGradient>
        {/* Eye glow */}
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(1, 85%, 96%)" stopOpacity="0.8" />
        </radialGradient>
        {/* Drop shadow */}
        <filter id="robotShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="hsl(1, 85%, 40%)" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Antenna */}
      <line x1="32" y1="10" x2="32" y2="16" stroke="url(#robotGrad)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="8.5" r="2.5" fill="url(#robotGrad)" />

      {/* Head — clean rounded rectangle */}
      <rect x="14" y="16" width="36" height="30" rx="12" fill="url(#robotGrad)" filter="url(#robotShadow)" />

      {/* Face plate — subtle inset */}
      <rect x="18" y="20" width="28" height="22" rx="9" fill="white" opacity="0.95" />

      {/* Left eye */}
      <circle cx="26" cy="29" r="4" fill="url(#eyeGlow)" stroke="url(#robotGrad)" strokeWidth="1.5" />
      <circle cx="26" cy="29" r="2" fill="url(#robotGrad)" />
      <circle cx="27" cy="27.5" r="0.8" fill="white" />

      {/* Right eye */}
      <circle cx="38" cy="29" r="4" fill="url(#eyeGlow)" stroke="url(#robotGrad)" strokeWidth="1.5" />
      <circle cx="38" cy="29" r="2" fill="url(#robotGrad)" />
      <circle cx="39" cy="27.5" r="0.8" fill="white" />

      {/* Smile — refined arc */}
      <path d="M27 36 C29 38.5, 35 38.5, 37 36" stroke="url(#robotGrad)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
