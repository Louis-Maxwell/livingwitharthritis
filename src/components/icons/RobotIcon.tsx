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
        <linearGradient id="helmetRed" x1="16" y1="6" x2="48" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="hsl(1, 90%, 62%)" />
          <stop offset="50%" stopColor="hsl(1, 85%, 52%)" />
          <stop offset="100%" stopColor="hsl(1, 80%, 38%)" />
        </linearGradient>
        <radialGradient id="faceShine" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="hsl(0, 0%, 95%)" />
        </radialGradient>
        <radialGradient id="eyeInner" cx="45%" cy="38%" r="50%">
          <stop offset="0%" stopColor="hsl(1, 100%, 72%)" />
          <stop offset="100%" stopColor="hsl(1, 85%, 48%)" />
        </radialGradient>
        <filter id="outerGlow">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="hsl(1, 70%, 35%)" floodOpacity="0.18" />
        </filter>
        <filter id="eyeGlowFilter">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Antenna — thin elegant line with glowing tip */}
      <line x1="32" y1="8" x2="32" y2="14" stroke="hsl(0,0%,78%)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="6.5" r="2.2" fill="url(#helmetRed)" />
      <circle cx="32" cy="6.5" r="1" fill="hsl(1, 100%, 75%)" opacity="0.6" />

      {/* Head — smooth pill shape */}
      <rect x="12" y="14" width="40" height="34" rx="14" fill="url(#faceShine)" stroke="hsl(0,0%,88%)" strokeWidth="0.75" filter="url(#outerGlow)" />

      {/* Helmet — top curved cap */}
      <path d="M14 28 C14 16, 22 10, 32 10 C42 10, 50 16, 50 28 L50 22 C50 12, 42 6, 32 6 C22 6, 14 12, 14 22 Z" fill="url(#helmetRed)" />
      {/* Helmet front brim */}
      <path d="M16 26 Q16 15, 32 11 Q48 15, 48 26" fill="url(#helmetRed)" />

      {/* Visor — dark face area */}
      <rect x="18" y="24" width="28" height="16" rx="8" fill="hsl(0, 15%, 14%)" opacity="0.88" />

      {/* Left eye */}
      <g filter="url(#eyeGlowFilter)">
        <circle cx="26" cy="31.5" r="4.2" fill="url(#eyeInner)" opacity="0.9" />
      </g>
      <circle cx="26" cy="31.5" r="2.2" fill="hsl(1, 100%, 70%)" />
      <circle cx="26" cy="31.5" r="1.2" fill="white" opacity="0.35" />
      <ellipse cx="27.2" cy="30" rx="1" ry="0.7" fill="white" opacity="0.8" />

      {/* Right eye */}
      <g filter="url(#eyeGlowFilter)">
        <circle cx="38" cy="31.5" r="4.2" fill="url(#eyeInner)" opacity="0.9" />
      </g>
      <circle cx="38" cy="31.5" r="2.2" fill="hsl(1, 100%, 70%)" />
      <circle cx="38" cy="31.5" r="1.2" fill="white" opacity="0.35" />
      <ellipse cx="39.2" cy="30" rx="1" ry="0.7" fill="white" opacity="0.8" />

      {/* Mouth — subtle friendly curve */}
      <path d="M28 43 Q32 46, 36 43" stroke="hsl(0, 0%, 75%)" strokeWidth="1.3" strokeLinecap="round" fill="none" />

      {/* Cheek accents — small rounded rectangles */}
      <rect x="9" y="28" width="3.5" height="7" rx="1.75" fill="url(#helmetRed)" opacity="0.85" />
      <rect x="51.5" y="28" width="3.5" height="7" rx="1.75" fill="url(#helmetRed)" opacity="0.85" />

      {/* Chin detail — subtle metallic strip */}
      <rect x="27" y="48" width="10" height="2.5" rx="1.25" fill="hsl(0, 0%, 88%)" />

      {/* Neck connector */}
      <rect x="29" y="51" width="6" height="4" rx="1.5" fill="hsl(0, 0%, 82%)" />

      {/* Body hint — rounded shoulders */}
      <path d="M22 57 Q22 54, 26 54 L38 54 Q42 54, 42 57 L44 60 Q44 62, 42 62 L22 62 Q20 62, 20 60 Z" fill="url(#helmetRed)" opacity="0.8" />

      {/* Chest emblem */}
      <circle cx="32" cy="58.5" r="2" fill="white" opacity="0.25" />
      <path d="M31 58.5 L32 57.2 L33 58.5 L32 59.8 Z" fill="white" opacity="0.5" />
    </svg>
  );
}
