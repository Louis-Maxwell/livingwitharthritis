/**
 * TaiChiAnimations
 * Lightweight, accessible SVG animations for each tai chi posture.
 * Pure SMIL/CSS — no JS frame loop, no video files. Runs at 60fps,
 * respects `prefers-reduced-motion`, and scales crisply at any size.
 *
 * Each figure is a stylised stick-figure with weight shift, arm sweep,
 * or breathing motion that mirrors the written instructions.
 */

const STROKE = "hsl(var(--primary))";
const SOFT = "hsl(var(--muted-foreground))";
const SKIN = "hsl(var(--primary) / 0.15)";

interface AnimationProps {
  className?: string;
}

const Frame = ({ children, label, className = "" }: { children: React.ReactNode; label: string; className?: string }) => (
  <div
    role="img"
    aria-label={label}
    className={`relative w-full aspect-[4/3] bg-gradient-to-b from-secondary/40 to-background rounded-lg overflow-hidden border border-border/40 motion-reduce:[&_*]:!animate-none ${className}`}
  >
    {/* Floor line */}
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <line x1="40" y1="260" x2="360" y2="260" stroke={SOFT} strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
      {children}
    </svg>
  </div>
);

/* 1 — Rooted stance: subtle breathing rise/fall */
export const RootedStance = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: standing rooted stance with slow breathing" className={className}>
    <g transform="translate(200,140)">
      <animateTransform attributeName="transform" type="translate" values="200,140;200,136;200,140" dur="5s" repeatCount="indefinite" />
      {/* Head */}
      <circle cx="0" cy="-60" r="14" fill={SKIN} stroke={STROKE} strokeWidth="2" />
      {/* Spine */}
      <line x1="0" y1="-46" x2="0" y2="40" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* Arms — gentle hang, slight breath sway */}
      <line x1="0" y1="-30" x2="-22" y2="30" stroke={STROKE} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="x2" values="-22;-25;-22" dur="5s" repeatCount="indefinite" />
      </line>
      <line x1="0" y1="-30" x2="22" y2="30" stroke={STROKE} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="x2" values="22;25;22" dur="5s" repeatCount="indefinite" />
      </line>
      {/* Legs */}
      <line x1="0" y1="40" x2="-18" y2="120" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="40" x2="18" y2="120" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* Crown thread */}
      <line x1="0" y1="-78" x2="0" y2="-95" stroke={SOFT} strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
    </g>
    {/* Breath halo */}
    <circle cx="200" cy="80" r="10" fill="none" stroke={STROKE} strokeWidth="1" opacity="0.3">
      <animate attributeName="r" values="10;28;10" dur="5s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.4;0;0.4" dur="5s" repeatCount="indefinite" />
    </circle>
  </Frame>
);

/* 2 — Weight shift: figure sways left to right */
export const WeightShift = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: slow weight shift from right leg to left leg" className={className}>
    <g>
      <animateTransform attributeName="transform" type="translate" values="180,140;220,140;180,140" dur="4s" repeatCount="indefinite" />
      <circle cx="0" cy="-60" r="14" fill={SKIN} stroke={STROKE} strokeWidth="2" />
      <line x1="0" y1="-46" x2="0" y2="40" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="-30" x2="-22" y2="20" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="-30" x2="22" y2="20" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
    </g>
    {/* Stationary feet positions */}
    <g>
      <line x1="160" y1="180" x2="160" y2="260" stroke={STROKE} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <line x1="240" y1="180" x2="240" y2="260" stroke={STROKE} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <ellipse cx="160" cy="262" rx="14" ry="3" fill={STROKE} opacity="0.3" />
      <ellipse cx="240" cy="262" rx="14" ry="3" fill={STROKE} opacity="0.3" />
    </g>
    {/* Active legs from torso to feet */}
    <line stroke={STROKE} strokeWidth="3" strokeLinecap="round">
      <animate attributeName="x1" values="180;220;180" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y1" values="180;180;180" dur="4s" repeatCount="indefinite" />
      <animate attributeName="x2" values="160;160;160" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y2" values="260;260;260" dur="4s" repeatCount="indefinite" />
    </line>
    <line stroke={STROKE} strokeWidth="3" strokeLinecap="round">
      <animate attributeName="x1" values="180;220;180" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y1" values="180;180;180" dur="4s" repeatCount="indefinite" />
      <animate attributeName="x2" values="240;240;240" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y2" values="260;260;260" dur="4s" repeatCount="indefinite" />
    </line>
    {/* Weight indicator arrow */}
    <text x="200" y="40" textAnchor="middle" fontSize="11" fill={SOFT} fontFamily="ui-sans-serif">
      <animate attributeName="x" values="160;240;160" dur="4s" repeatCount="indefinite" />
      ●
    </text>
  </Frame>
);

/* 3 — Cloud hands: arms sweep horizontally across body */
export const CloudHands = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: cloud hands sweeping arms across the chest" className={className}>
    <g transform="translate(200,140)">
      <circle cx="0" cy="-60" r="14" fill={SKIN} stroke={STROKE} strokeWidth="2" />
      <line x1="0" y1="-46" x2="0" y2="40" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* Legs static */}
      <line x1="0" y1="40" x2="-22" y2="120" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="40" x2="22" y2="120" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* Sweeping arms */}
      <line y1="-30" stroke={STROKE} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="x1" values="0;0;0" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="-40;40;-40" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-20;-20;-20" dur="4s" repeatCount="indefinite" />
      </line>
      <line y1="-30" stroke={STROKE} strokeWidth="3" strokeLinecap="round" opacity="0.7">
        <animate attributeName="x1" values="0;0;0" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="40;-40;40" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="10;10;10" dur="4s" repeatCount="indefinite" />
      </line>
      {/* Hand orbs */}
      <circle r="5" fill={STROKE}>
        <animate attributeName="cx" values="-40;40;-40" dur="4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="-20;-20;-20" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle r="5" fill={STROKE} opacity="0.7">
        <animate attributeName="cx" values="40;-40;40" dur="4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="10;10;10" dur="4s" repeatCount="indefinite" />
      </circle>
    </g>
  </Frame>
);

/* 4 — Brush knee (seated): chair + alternating push */
export const BrushKnee = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: seated brush knee push, alternating arms" className={className}>
    {/* Chair */}
    <g stroke={SOFT} strokeWidth="2" fill="none" opacity="0.5">
      <line x1="160" y1="180" x2="240" y2="180" />
      <line x1="160" y1="180" x2="160" y2="260" />
      <line x1="240" y1="180" x2="240" y2="260" />
      <line x1="160" y1="180" x2="160" y2="120" />
    </g>
    <g transform="translate(200,140)">
      {/* Head */}
      <circle cx="0" cy="-50" r="13" fill={SKIN} stroke={STROKE} strokeWidth="2" />
      {/* Torso */}
      <line x1="0" y1="-37" x2="0" y2="40" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* Thighs (seated) */}
      <line x1="0" y1="40" x2="40" y2="40" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="40" x2="40" y2="120" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* Pushing arm — extends and retracts */}
      <line y1="-20" stroke={STROKE} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="x1" values="0;0;0;0" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="50;50;-10;-10" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-15;-15;0;0" dur="4s" repeatCount="indefinite" />
      </line>
      {/* Brushing arm — sweeps over thigh */}
      <line y1="-20" stroke={STROKE} strokeWidth="3" strokeLinecap="round" opacity="0.85">
        <animate attributeName="x1" values="0;0;0;0" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="-10;-10;50;50" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="0;0;-15;-15" dur="4s" repeatCount="indefinite" />
      </line>
    </g>
  </Frame>
);

/* 5 — Closing posture: hands lower slowly, palms press down */
export const ClosingPosture = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: closing posture lowering hands with long exhale" className={className}>
    <g transform="translate(200,140)">
      <circle cx="0" cy="-60" r="14" fill={SKIN} stroke={STROKE} strokeWidth="2" />
      <line x1="0" y1="-46" x2="0" y2="40" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="40" x2="-18" y2="120" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="40" x2="18" y2="120" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* Lowering arms */}
      <line x1="0" y1="-30" stroke={STROKE} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="x2" values="-30;-25;-22" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-40;0;30" dur="6s" repeatCount="indefinite" />
      </line>
      <line x1="0" y1="-30" stroke={STROKE} strokeWidth="3" strokeLinecap="round">
        <animate attributeName="x2" values="30;25;22" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-40;0;30" dur="6s" repeatCount="indefinite" />
      </line>
    </g>
    {/* Exhale waves drifting downward */}
    {[0, 2, 4].map((delay) => (
      <circle key={delay} cx="200" cy="100" r="6" fill="none" stroke={STROKE} opacity="0.3">
        <animate attributeName="cy" values="100;240" dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0" dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
    ))}
  </Frame>
);

export const TAI_CHI_ANIMATIONS = {
  "rooted-stance": RootedStance,
  "weight-shift": WeightShift,
  "cloud-hands": CloudHands,
  "brush-knee": BrushKnee,
  "closing-posture": ClosingPosture,
} as const;
