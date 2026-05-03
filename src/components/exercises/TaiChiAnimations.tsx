/**
 * TaiChiAnimations
 * Humanoid SVG silhouettes demonstrating each tai chi posture.
 * Pure SMIL — no JS frame loop, no video files. Respects
 * `prefers-reduced-motion`. Crisp at any size.
 *
 * Anatomy: rounded head, neck, tapered torso, hips, jointed
 * limbs with elbow/knee bends. Filled silhouette in primary tone
 * for a more recognisable human form than stick figures.
 */

const FILL = "hsl(var(--primary) / 0.85)";
const SHADE = "hsl(var(--primary))";
const SOFT = "hsl(var(--muted-foreground))";
const SKIN = "hsl(var(--primary) / 0.18)";

interface AnimationProps {
  className?: string;
}

const Frame = ({ children, label, className = "" }: { children: React.ReactNode; label: string; className?: string }) => (
  <div
    role="img"
    aria-label={label}
    className={`relative w-full aspect-[4/3] bg-gradient-to-b from-secondary/40 to-background rounded-lg overflow-hidden border border-border/40 motion-reduce:[&_*]:!animate-none`}
  >
    <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`}>
      {/* Floor */}
      <ellipse cx="200" cy="268" rx="120" ry="6" fill={SHADE} opacity="0.08" />
      <line x1="40" y1="268" x2="360" y2="268" stroke={SOFT} strokeWidth="1" strokeDasharray="2 4" opacity="0.3" />
      {children}
    </svg>
  </div>
);

/* Reusable humanoid head with hair cap */
const Head = ({ cx = 0, cy = -90, r = 16 }: { cx?: number; cy?: number; r?: number }) => (
  <>
    <circle cx={cx} cy={cy} r={r} fill={SKIN} stroke={SHADE} strokeWidth="1.5" />
    {/* Hair cap */}
    <path d={`M ${cx - r} ${cy - 2} A ${r} ${r} 0 0 1 ${cx + r} ${cy - 2} L ${cx + r - 2} ${cy - r + 4} L ${cx - r + 2} ${cy - r + 4} Z`} fill={SHADE} opacity="0.85" />
    {/* Neck */}
    <rect x={cx - 4} y={cy + r - 2} width="8" height="8" fill={FILL} />
  </>
);

/* Torso silhouette: shoulders → tapered waist → hips */
const Torso = () => (
  <path
    d="M -22 -68 Q -26 -50 -22 -30 Q -24 -10 -20 10 L 20 10 Q 24 -10 22 -30 Q 26 -50 22 -68 Q 0 -74 -22 -68 Z"
    fill={FILL}
    stroke={SHADE}
    strokeWidth="1"
  />
);

/* Limb segment with rounded ends */
const Limb = ({
  x1, y1, x2, y2, width = 9, opacity = 1, children,
}: {
  x1: number; y1: number; x2: number; y2: number; width?: number; opacity?: number; children?: React.ReactNode;
}) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={FILL} strokeWidth={width} strokeLinecap="round" opacity={opacity}>
    {children}
  </line>
);

/* Hand / foot blob */
const Joint = ({ cx, cy, r = 5, children }: { cx: number; cy: number; r?: number; children?: React.ReactNode }) => (
  <circle cx={cx} cy={cy} r={r} fill={SHADE}>
    {children}
  </circle>
);

/* ==========================================================
   1 — Rooted stance (Wuji): subtle breathing rise/fall
   ========================================================== */
export const RootedStance = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: standing rooted Wuji stance with slow breathing" className={className}>
    <g transform="translate(200,180)">
      <animateTransform attributeName="transform" type="translate" values="200,180;200,176;200,180" dur="5s" repeatCount="indefinite" />

      <Head />
      <Torso />

      {/* Upper arms */}
      <Limb x1={-22} y1={-60} x2={-30} y2={-20} />
      <Limb x1={22} y1={-60} x2={30} y2={-20} />
      {/* Forearms (slight breathing sway) */}
      <line x1="-30" y1="-20" x2="-32" y2="20" stroke={FILL} strokeWidth="8" strokeLinecap="round">
        <animate attributeName="x2" values="-32;-36;-32" dur="5s" repeatCount="indefinite" />
      </line>
      <line x1="30" y1="-20" x2="32" y2="20" stroke={FILL} strokeWidth="8" strokeLinecap="round">
        <animate attributeName="x2" values="32;36;32" dur="5s" repeatCount="indefinite" />
      </line>
      <Joint cx={-32} cy={20} />
      <Joint cx={32} cy={20} />

      {/* Thighs */}
      <Limb x1={-12} y1={10} x2={-18} y2={50} width={11} />
      <Limb x1={12} y1={10} x2={18} y2={50} width={11} />
      {/* Shins */}
      <Limb x1={-18} y1={50} x2={-20} y2={88} width={10} />
      <Limb x1={18} y1={50} x2={20} y2={88} width={10} />
      {/* Feet */}
      <ellipse cx="-20" cy="90" rx="12" ry="4" fill={SHADE} />
      <ellipse cx="20" cy="90" rx="12" ry="4" fill={SHADE} />

      {/* Crown thread */}
      <line x1="0" y1="-110" x2="0" y2="-130" stroke={SOFT} strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
    </g>
    {/* Breath halo */}
    <circle cx="200" cy="60" r="10" fill="none" stroke={SHADE} strokeWidth="1" opacity="0.3">
      <animate attributeName="r" values="8;26;8" dur="5s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.4;0;0.4" dur="5s" repeatCount="indefinite" />
    </circle>
  </Frame>
);

/* ==========================================================
   2 — Weight shift: hips translate, feet stay planted
   ========================================================== */
export const WeightShift = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: slow weight shift between right and left leg" className={className}>
    {/* Planted feet (always visible) */}
    <ellipse cx="160" cy="270" rx="14" ry="4" fill={SHADE} opacity="0.85" />
    <ellipse cx="240" cy="270" rx="14" ry="4" fill={SHADE} opacity="0.85" />

    <g>
      <animateTransform attributeName="transform" type="translate" values="180,180;220,180;180,180" dur="4s" repeatCount="indefinite" />
      <Head />
      <Torso />
      {/* Arms held softly forward */}
      <Limb x1={-22} y1={-60} x2={-26} y2={-20} />
      <Limb x1={22} y1={-60} x2={26} y2={-20} />
      <Limb x1={-26} y1={-20} x2={-18} y2={10} />
      <Limb x1={26} y1={-20} x2={18} y2={10} />
      <Joint cx={-18} cy={10} />
      <Joint cx={18} cy={10} />
    </g>

    {/* Animated thighs/shins from moving hips down to fixed feet */}
    <line stroke={FILL} strokeWidth="11" strokeLinecap="round">
      <animate attributeName="x1" values="168;208;168" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y1" values="190;190;190" dur="4s" repeatCount="indefinite" />
      <animate attributeName="x2" values="160;160;160" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y2" values="265;265;265" dur="4s" repeatCount="indefinite" />
    </line>
    <line stroke={FILL} strokeWidth="11" strokeLinecap="round">
      <animate attributeName="x1" values="192;232;192" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y1" values="190;190;190" dur="4s" repeatCount="indefinite" />
      <animate attributeName="x2" values="240;240;240" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y2" values="265;265;265" dur="4s" repeatCount="indefinite" />
    </line>

    {/* Weight indicator */}
    <circle r="6" fill={SHADE} opacity="0.5">
      <animate attributeName="cx" values="160;240;160" dur="4s" repeatCount="indefinite" />
      <animate attributeName="cy" values="285;285;285" dur="4s" repeatCount="indefinite" />
    </circle>
  </Frame>
);

/* ==========================================================
   3 — Cloud hands: arms sweep horizontally across body
   ========================================================== */
export const CloudHands = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: cloud hands arms sweeping across the chest" className={className}>
    <g transform="translate(200,180)">
      <Head />
      <Torso />

      {/* Static legs */}
      <Limb x1={-12} y1={10} x2={-22} y2={50} width={11} />
      <Limb x1={12} y1={10} x2={22} y2={50} width={11} />
      <Limb x1={-22} y1={50} x2={-26} y2={88} width={10} />
      <Limb x1={22} y1={50} x2={26} y2={88} width={10} />
      <ellipse cx="-26" cy="90" rx="12" ry="4" fill={SHADE} />
      <ellipse cx="26" cy="90" rx="12" ry="4" fill={SHADE} />

      {/* Upper arm — left, fixed shoulder */}
      <line x1="-22" y1="-60" stroke={FILL} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x2" values="-30;10;-30" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-40;-50;-40" dur="4s" repeatCount="indefinite" />
      </line>
      {/* Forearm — left */}
      <line stroke={FILL} strokeWidth="8" strokeLinecap="round">
        <animate attributeName="x1" values="-30;10;-30" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y1" values="-40;-50;-40" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="-50;50;-50" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-30;-30;-30" dur="4s" repeatCount="indefinite" />
      </line>
      {/* Hand — left */}
      <circle r="6" fill={SHADE}>
        <animate attributeName="cx" values="-50;50;-50" dur="4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="-30;-30;-30" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Upper arm — right (counter-phase, lower) */}
      <line x1="22" y1="-60" stroke={FILL} strokeWidth="9" strokeLinecap="round" opacity="0.85">
        <animate attributeName="x2" values="30;-10;30" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-20;-10;-20" dur="4s" repeatCount="indefinite" />
      </line>
      <line stroke={FILL} strokeWidth="8" strokeLinecap="round" opacity="0.85">
        <animate attributeName="x1" values="30;-10;30" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y1" values="-20;-10;-20" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="50;-50;50" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="10;10;10" dur="4s" repeatCount="indefinite" />
      </line>
      <circle r="6" fill={SHADE} opacity="0.85">
        <animate attributeName="cx" values="50;-50;50" dur="4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="10;10;10" dur="4s" repeatCount="indefinite" />
      </circle>
    </g>
  </Frame>
);

/* ==========================================================
   4 — Brush knee (seated): chair + alternating push
   ========================================================== */
export const BrushKnee = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: seated brush knee push, alternating arms" className={className}>
    {/* Chair */}
    <g stroke={SOFT} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6">
      <line x1="150" y1="200" x2="260" y2="200" />
      <line x1="150" y1="200" x2="150" y2="270" />
      <line x1="260" y1="200" x2="260" y2="270" />
      <line x1="150" y1="200" x2="150" y2="120" />
    </g>

    <g transform="translate(205,180)">
      <Head cy={-60} r={15} />
      {/* Seated torso (slightly compressed) */}
      <path
        d="M -22 -38 Q -26 -20 -22 -5 Q -24 10 -20 25 L 20 25 Q 24 10 22 -5 Q 26 -20 22 -38 Q 0 -44 -22 -38 Z"
        fill={FILL}
        stroke={SHADE}
        strokeWidth="1"
      />
      {/* Thighs forward (seated) */}
      <Limb x1={-12} y1={20} x2={32} y2={28} width={11} />
      <Limb x1={12} y1={20} x2={36} y2={32} width={11} />
      {/* Shins down */}
      <Limb x1={32} y1={28} x2={32} y2={88} width={10} />
      <Limb x1={36} y1={32} x2={36} y2={88} width={10} />
      <ellipse cx="34" cy="90" rx="12" ry="4" fill={SHADE} />

      {/* Pushing arm (extends forward, then retracts) */}
      <line x1="-22" y1="-30" stroke={FILL} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x2" values="20;55;55;20" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-20;-25;-25;-20" dur="4s" repeatCount="indefinite" />
      </line>
      <line stroke={FILL} strokeWidth="8" strokeLinecap="round">
        <animate attributeName="x1" values="20;55;55;20" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y1" values="-20;-25;-25;-20" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="55;90;55;-15" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-20;-15;-20;5" dur="4s" repeatCount="indefinite" />
      </line>
      <circle r="6" fill={SHADE}>
        <animate attributeName="cx" values="55;90;55;-15" dur="4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="-20;-15;-20;5" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Brushing arm (sweeps over thigh) */}
      <line x1="22" y1="-30" stroke={FILL} strokeWidth="9" strokeLinecap="round" opacity="0.85">
        <animate attributeName="x2" values="20;-10;-10;20" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="0;-10;-10;0" dur="4s" repeatCount="indefinite" />
      </line>
      <line stroke={FILL} strokeWidth="8" strokeLinecap="round" opacity="0.85">
        <animate attributeName="x1" values="20;-10;-10;20" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y1" values="0;-10;-10;0" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="-15;55;90;55" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="5;-20;-15;-20" dur="4s" repeatCount="indefinite" />
      </line>
      <circle r="6" fill={SHADE} opacity="0.85">
        <animate attributeName="cx" values="-15;55;90;55" dur="4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="5;-20;-15;-20" dur="4s" repeatCount="indefinite" />
      </circle>
    </g>
  </Frame>
);

/* ==========================================================
   5 — Closing posture: hands lower from chest, palms press down
   ========================================================== */
export const ClosingPosture = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: closing posture lowering hands with long exhale" className={className}>
    <g transform="translate(200,180)">
      <Head />
      <Torso />

      {/* Static legs */}
      <Limb x1={-12} y1={10} x2={-18} y2={50} width={11} />
      <Limb x1={12} y1={10} x2={18} y2={50} width={11} />
      <Limb x1={-18} y1={50} x2={-20} y2={88} width={10} />
      <Limb x1={18} y1={50} x2={20} y2={88} width={10} />
      <ellipse cx="-20" cy="90" rx="12" ry="4" fill={SHADE} />
      <ellipse cx="20" cy="90" rx="12" ry="4" fill={SHADE} />

      {/* Lowering arms — left */}
      <line x1="-22" y1="-60" stroke={FILL} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x2" values="-32;-30;-28" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-50;-30;-10" dur="6s" repeatCount="indefinite" />
      </line>
      <line stroke={FILL} strokeWidth="8" strokeLinecap="round">
        <animate attributeName="x1" values="-32;-30;-28" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y1" values="-50;-30;-10" dur="6s" repeatCount="indefinite" />
        <animate attributeName="x2" values="-40;-36;-32" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-30;0;30" dur="6s" repeatCount="indefinite" />
      </line>
      <circle r="6" fill={SHADE}>
        <animate attributeName="cx" values="-40;-36;-32" dur="6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="-30;0;30" dur="6s" repeatCount="indefinite" />
      </circle>

      {/* Lowering arms — right */}
      <line x1="22" y1="-60" stroke={FILL} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x2" values="32;30;28" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-50;-30;-10" dur="6s" repeatCount="indefinite" />
      </line>
      <line stroke={FILL} strokeWidth="8" strokeLinecap="round">
        <animate attributeName="x1" values="32;30;28" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y1" values="-50;-30;-10" dur="6s" repeatCount="indefinite" />
        <animate attributeName="x2" values="40;36;32" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-30;0;30" dur="6s" repeatCount="indefinite" />
      </line>
      <circle r="6" fill={SHADE}>
        <animate attributeName="cx" values="40;36;32" dur="6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="-30;0;30" dur="6s" repeatCount="indefinite" />
      </circle>
    </g>

    {/* Exhale waves drifting downward */}
    {[0, 2, 4].map((delay) => (
      <circle key={delay} cx="200" cy="80" r="6" fill="none" stroke={SHADE} opacity="0.3">
        <animate attributeName="cy" values="80;250" dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
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
