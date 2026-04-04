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
        <linearGradient id="helmetGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(1, 85%, 60%)" />
          <stop offset="100%" stopColor="hsl(1, 85%, 42%)" />
        </linearGradient>
        <radialGradient id="eyeGlow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="hsl(1, 90%, 85%)" />
          <stop offset="60%" stopColor="hsl(1, 85%, 60%)" />
          <stop offset="100%" stopColor="hsl(1, 85%, 45%)" />
        </radialGradient>
        <linearGradient id="faceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="hsl(0, 0%, 93%)" />
        </linearGradient>
        <filter id="rShadow" x="-12%" y="-8%" width="124%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="hsl(1, 60%, 30%)" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Antenna */}
      <line x1="32" y1="5" x2="32" y2="12" stroke="hsl(0, 0%, 75%)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="4" r="2.5" fill="url(#helmetGrad)" />

      {/* Head */}
      <ellipse cx="32" cy="32" rx="22" ry="23" fill="url(#faceGrad)" stroke="hsl(0, 0%, 85%)" strokeWidth="1" filter="url(#rShadow)" />

      {/* Red helmet */}
      <path d="M14 30 Q14 14, 32 10 Q50 14, 50 30" fill="url(#helmetGrad)" />

      {/* Face visor */}
      <path
        d="M18 28 Q18 22, 32 22 Q46 22, 46 28 L46 34 Q46 38, 32 38 Q18 38, 18 34 Z"
        fill="hsl(1, 30%, 18%)"
        opacity="0.85"
      />

      {/* Left eye — red glow */}
      <ellipse cx="25" cy="30" rx="4.5" ry="5" fill="url(#eyeGlow)" />
      <ellipse cx="25" cy="30" rx="2.5" ry="3" fill="hsl(1, 85%, 65%)" />
      <ellipse cx="26" cy="28.5" rx="1.2" ry="1" fill="white" opacity="0.9" />

      {/* Right eye — red glow */}
      <ellipse cx="39" cy="30" rx="4.5" ry="5" fill="url(#eyeGlow)" />
      <ellipse cx="39" cy="30" rx="2.5" ry="3" fill="hsl(1, 85%, 65%)" />
      <ellipse cx="40" cy="28.5" rx="1.2" ry="1" fill="white" opacity="0.9" />

      {/* Smile */}
      <path d="M27 42 Q32 45, 37 42" stroke="hsl(0, 0%, 70%)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Ear accents */}
      <rect x="9" y="27" width="4" height="8" rx="2" fill="url(#helmetGrad)" />
      <rect x="51" y="27" width="4" height="8" rx="2" fill="url(#helmetGrad)" />

      {/* Chest emblem */}
      <circle cx="32" cy="50" r="3" fill="url(#helmetGrad)" opacity="0.7" />
      <path d="M30.5 50 L32 48.5 L33.5 50 L32 51.5 Z" fill="white" opacity="0.8" />

      {/* Neck */}
      <rect x="28" y="54" width="8" height="4" rx="2" fill="hsl(0, 0%, 85%)" />
    </svg>
  );
}
