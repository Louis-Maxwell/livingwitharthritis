/**
 * TaiChiAnimations
 * Humanoid SVG silhouettes demonstrating each tai chi posture.
 * Pure SMIL — no JS frame loop, no video files. Respects
 * `prefers-reduced-motion`. Crisp at any size.
 *
 * Visual language:
 *  - Soft drop shadow under feet for grounded depth
 *  - Motion trails (ghosted limbs) so the path of motion stays visible
 *  - Directional arrows / arcs to telegraph intent
 *  - Breath halos and weight markers to read tempo and load
 */

const FILL = "hsl(var(--primary) / 0.9)";
const SHADE = "hsl(var(--primary))";
const SOFT = "hsl(var(--muted-foreground))";
const SKIN = "hsl(var(--primary) / 0.2)";
const ACCENT = "hsl(var(--accent-foreground, var(--primary)))";

interface AnimationProps {
  className?: string;
}

const Frame = ({
  children,
  label,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) => (
  <div
    role="img"
    aria-label={label}
    className={`relative w-full aspect-[4/3] bg-gradient-to-b from-secondary/50 via-background to-background rounded-lg overflow-hidden border border-border/40 motion-reduce:[&_*]:!animate-none`}
  >
    <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`}>
      <defs>
        {/* Soft body shadow */}
        <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={SHADE} stopOpacity="0.35" />
          <stop offset="100%" stopColor={SHADE} stopOpacity="0" />
        </radialGradient>
        {/* Glow for breath halos */}
        <radialGradient id="breathGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={SHADE} stopOpacity="0.4" />
          <stop offset="100%" stopColor={SHADE} stopOpacity="0" />
        </radialGradient>
        {/* Arrow marker */}
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={SHADE} opacity="0.55" />
        </marker>
      </defs>

      {/* Floor with soft cast shadow */}
      <ellipse cx="200" cy="272" rx="130" ry="10" fill="url(#floorShadow)" />
      <line
        x1="40"
        y1="270"
        x2="360"
        y2="270"
        stroke={SOFT}
        strokeWidth="1"
        strokeDasharray="2 4"
        opacity="0.3"
      />
      {children}
    </svg>
  </div>
);

/* Reusable humanoid head with hair cap */
const Head = ({ cx = 0, cy = -90, r = 16 }: { cx?: number; cy?: number; r?: number }) => (
  <>
    <circle cx={cx} cy={cy} r={r} fill={SKIN} stroke={SHADE} strokeWidth="1.5" />
    <path
      d={`M ${cx - r} ${cy - 2} A ${r} ${r} 0 0 1 ${cx + r} ${cy - 2} L ${cx + r - 2} ${cy - r + 4} L ${cx - r + 2} ${cy - r + 4} Z`}
      fill={SHADE}
      opacity="0.85"
    />
    {/* Eyes hint */}
    <circle cx={cx - 5} cy={cy + 2} r="1.2" fill={SHADE} opacity="0.6" />
    <circle cx={cx + 5} cy={cy + 2} r="1.2" fill={SHADE} opacity="0.6" />
    {/* Neck */}
    <rect x={cx - 4} y={cy + r - 2} width="8" height="8" fill={FILL} />
  </>
);

/* Torso with breathing pulse */
const Torso = ({ breathe = false }: { breathe?: boolean }) => (
  <path
    d="M -22 -68 Q -26 -50 -22 -30 Q -24 -10 -20 10 L 20 10 Q 24 -10 22 -30 Q 26 -50 22 -68 Q 0 -74 -22 -68 Z"
    fill={FILL}
    stroke={SHADE}
    strokeWidth="1"
  >
    {breathe && (
      <animate attributeName="opacity" values="0.85;1;0.85" dur="5s" repeatCount="indefinite" />
    )}
  </path>
);

/* Limb segment with rounded ends */
const Limb = ({
  x1,
  y1,
  x2,
  y2,
  width = 9,
  opacity = 1,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width?: number;
  opacity?: number;
}) => (
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke={FILL}
    strokeWidth={width}
    strokeLinecap="round"
    opacity={opacity}
  />
);

const Joint = ({ cx, cy, r = 5, opacity = 1 }: { cx: number; cy: number; r?: number; opacity?: number }) => (
  <circle cx={cx} cy={cy} r={r} fill={SHADE} opacity={opacity} />
);

/* ==========================================================
   1 — Rooted stance (Wuji): breathing rise + halo + crown thread
   ========================================================== */
export const RootedStance = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: standing rooted Wuji stance with slow breathing" className={className}>
    {/* Crown alignment thread (always visible to communicate posture) */}
    <line x1="200" y1="40" x2="200" y2="270" stroke={SOFT} strokeWidth="1" strokeDasharray="3 5" opacity="0.35" />

    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="200,180;200,175;200,180"
        dur="5s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        keyTimes="0;0.5;1"
      />

      <Head />
      <Torso breathe />

      {/* Upper arms */}
      <Limb x1={-22} y1={-60} x2={-30} y2={-20} />
      <Limb x1={22} y1={-60} x2={30} y2={-20} />

      {/* Forearms with gentle outward breath */}
      <line x1="-30" y1="-20" x2="-32" y2="20" stroke={FILL} strokeWidth="8" strokeLinecap="round">
        <animate attributeName="x2" values="-32;-40;-32" dur="5s" repeatCount="indefinite" />
      </line>
      <line x1="30" y1="-20" x2="32" y2="20" stroke={FILL} strokeWidth="8" strokeLinecap="round">
        <animate attributeName="x2" values="32;40;32" dur="5s" repeatCount="indefinite" />
      </line>

      {/* Hands with subtle pulse */}
      <circle cx="-32" cy="20" r="5" fill={SHADE}>
        <animate attributeName="cx" values="-32;-40;-32" dur="5s" repeatCount="indefinite" />
        <animate attributeName="r" values="5;6;5" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="32" cy="20" r="5" fill={SHADE}>
        <animate attributeName="cx" values="32;40;32" dur="5s" repeatCount="indefinite" />
        <animate attributeName="r" values="5;6;5" dur="5s" repeatCount="indefinite" />
      </circle>

      {/* Legs */}
      <Limb x1={-12} y1={10} x2={-18} y2={50} width={11} />
      <Limb x1={12} y1={10} x2={18} y2={50} width={11} />
      <Limb x1={-18} y1={50} x2={-20} y2={88} width={10} />
      <Limb x1={18} y1={50} x2={20} y2={88} width={10} />
      <ellipse cx="-20" cy="90" rx="13" ry="4.5" fill={SHADE} />
      <ellipse cx="20" cy="90" rx="13" ry="4.5" fill={SHADE} />
    </g>

    {/* Two breath halos — inhale (top) and exhale (bottom) */}
    <circle cx="200" cy="55" r="8" fill="url(#breathGlow)">
      <animate attributeName="r" values="6;28;6" dur="5s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.7;0;0.7" dur="5s" repeatCount="indefinite" />
    </circle>

    {/* Inhale / Exhale label */}
    <text x="340" y="58" fontSize="10" fill={SOFT} textAnchor="end" opacity="0.7">
      <tspan>inhale</tspan>
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="5s" repeatCount="indefinite" />
    </text>
    <text x="340" y="72" fontSize="10" fill={SOFT} textAnchor="end" opacity="0.7">
      <tspan>exhale</tspan>
      <animate attributeName="opacity" values="0.2;0.8;0.2" dur="5s" repeatCount="indefinite" />
    </text>
  </Frame>
);

/* ==========================================================
   2 — Weight shift: hips translate, tilt, weight ball moves
   ========================================================== */
export const WeightShift = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: slow weight shift between right and left leg" className={className}>
    {/* Planted feet with pressure rings */}
    <ellipse cx="160" cy="270" rx="15" ry="4.5" fill={SHADE} />
    <ellipse cx="240" cy="270" rx="15" ry="4.5" fill={SHADE} />

    {/* Pressure ring under the loaded foot */}
    <circle r="20" fill="none" stroke={SHADE} strokeWidth="1.5" opacity="0.5">
      <animate attributeName="cx" values="160;240;160" dur="4s" repeatCount="indefinite" />
      <animate attributeName="cy" values="270;270;270" dur="4s" repeatCount="indefinite" />
      <animate attributeName="r" values="22;14;22" dur="4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle r="20" fill="none" stroke={SHADE} strokeWidth="1.5" opacity="0.5">
      <animate attributeName="cx" values="240;160;240" dur="4s" repeatCount="indefinite" />
      <animate attributeName="cy" values="270;270;270" dur="4s" repeatCount="indefinite" />
      <animate attributeName="r" values="14;22;14" dur="4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
    </circle>

    {/* Directional arc above hips */}
    <path
      d="M 150 110 Q 200 80 250 110"
      fill="none"
      stroke={SHADE}
      strokeWidth="1.5"
      strokeDasharray="3 4"
      opacity="0.45"
      markerEnd="url(#arrow)"
    >
      <animateTransform
        attributeName="transform"
        type="scale"
        values="1 1;-1 1;1 1"
        additive="sum"
        dur="4s"
        repeatCount="indefinite"
      />
      <animate attributeName="transform" values="0 0;400 0;0 0" attributeType="XML" dur="4s" repeatCount="indefinite" />
    </path>

    {/* Upper body: shifts side to side with subtle counter-tilt */}
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="180,180;220,180;180,180"
        dur="4s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        keyTimes="0;0.5;1"
      />
      <Head />
      <Torso />
      {/* Soft arms held forward */}
      <Limb x1={-22} y1={-60} x2={-26} y2={-20} />
      <Limb x1={22} y1={-60} x2={26} y2={-20} />
      <Limb x1={-26} y1={-20} x2={-18} y2={10} />
      <Limb x1={26} y1={-20} x2={18} y2={10} />
      <Joint cx={-18} cy={10} />
      <Joint cx={18} cy={10} />
    </g>

    {/* Animated legs from moving hips down to fixed feet */}
    <line stroke={FILL} strokeWidth="11" strokeLinecap="round">
      <animate attributeName="x1" values="168;208;168" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      <animate attributeName="y1" values="190;190;190" dur="4s" repeatCount="indefinite" />
      <animate attributeName="x2" values="160;160;160" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y2" values="265;265;265" dur="4s" repeatCount="indefinite" />
    </line>
    <line stroke={FILL} strokeWidth="11" strokeLinecap="round">
      <animate attributeName="x1" values="192;232;192" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      <animate attributeName="y1" values="190;190;190" dur="4s" repeatCount="indefinite" />
      <animate attributeName="x2" values="240;240;240" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y2" values="265;265;265" dur="4s" repeatCount="indefinite" />
    </line>

    {/* Weight ball — clear visual signifier */}
    <g>
      <circle r="9" fill={SHADE} opacity="0.85">
        <animate attributeName="cx" values="160;240;160" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="cy" values="288;288;288" dur="4s" repeatCount="indefinite" />
      </circle>
      <text fontSize="9" fill="hsl(var(--primary-foreground))" textAnchor="middle" fontWeight="700">
        <animate attributeName="x" values="160;240;160" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y" values="291;291;291" dur="4s" repeatCount="indefinite" />
        kg
      </text>
    </g>
  </Frame>
);

/* ==========================================================
   3 — Cloud hands: arms sweep with motion trails
   ========================================================== */
export const CloudHands = ({ className }: AnimationProps) => {
  // Ghost trail offsets for the leading hand
  const trails = [0.15, 0.3, 0.45];
  return (
    <Frame label="Animated demonstration: cloud hands arms sweeping across the chest" className={className}>
      <g transform="translate(200,180)">
        <Head />
        <Torso breathe />

        {/* Static legs in shoulder-width stance */}
        <Limb x1={-12} y1={10} x2={-22} y2={50} width={11} />
        <Limb x1={12} y1={10} x2={22} y2={50} width={11} />
        <Limb x1={-22} y1={50} x2={-26} y2={88} width={10} />
        <Limb x1={22} y1={50} x2={26} y2={88} width={10} />
        <ellipse cx="-26" cy="90" rx="13" ry="4.5" fill={SHADE} />
        <ellipse cx="26" cy="90" rx="13" ry="4.5" fill={SHADE} />

        {/* ===== LEFT (upper) ARM ===== */}
        {/* Upper arm */}
        <line x1="-22" y1="-60" stroke={FILL} strokeWidth="9" strokeLinecap="round">
          <animate attributeName="x2" values="-30;15;-30" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="y2" values="-40;-55;-40" dur="4s" repeatCount="indefinite" />
        </line>
        {/* Forearm */}
        <line stroke={FILL} strokeWidth="8" strokeLinecap="round">
          <animate attributeName="x1" values="-30;15;-30" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="y1" values="-40;-55;-40" dur="4s" repeatCount="indefinite" />
          <animate attributeName="x2" values="-55;55;-55" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="y2" values="-35;-35;-35" dur="4s" repeatCount="indefinite" />
        </line>
        {/* Hand + ghost trails behind it */}
        {trails.map((t, i) => (
          <circle key={i} r={5 - i} fill={SHADE} opacity={0.18 - i * 0.04}>
            <animate
              attributeName="cx"
              values={`-55;55;-55`}
              dur="4s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
              keyTimes="0;0.5;1"
              begin={`-${t}s`}
            />
            <animate attributeName="cy" values="-35;-35;-35" dur="4s" repeatCount="indefinite" begin={`-${t}s`} />
          </circle>
        ))}
        <circle r="6" fill={SHADE}>
          <animate attributeName="cx" values="-55;55;-55" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="cy" values="-35;-35;-35" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* ===== RIGHT (lower) ARM — counter-phase ===== */}
        <line x1="22" y1="-60" stroke={FILL} strokeWidth="9" strokeLinecap="round" opacity="0.9">
          <animate attributeName="x2" values="30;-15;30" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="y2" values="-15;-5;-15" dur="4s" repeatCount="indefinite" />
        </line>
        <line stroke={FILL} strokeWidth="8" strokeLinecap="round" opacity="0.9">
          <animate attributeName="x1" values="30;-15;30" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="y1" values="-15;-5;-15" dur="4s" repeatCount="indefinite" />
          <animate attributeName="x2" values="55;-55;55" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="y2" values="15;15;15" dur="4s" repeatCount="indefinite" />
        </line>
        {trails.map((t, i) => (
          <circle key={`r${i}`} r={5 - i} fill={SHADE} opacity={0.15 - i * 0.04}>
            <animate
              attributeName="cx"
              values="55;-55;55"
              dur="4s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
              keyTimes="0;0.5;1"
              begin={`-${t}s`}
            />
            <animate attributeName="cy" values="15;15;15" dur="4s" repeatCount="indefinite" begin={`-${t}s`} />
          </circle>
        ))}
        <circle r="6" fill={SHADE} opacity="0.9">
          <animate attributeName="cx" values="55;-55;55" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="cy" values="15;15;15" dur="4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Horizontal sweep guide arc */}
      <path
        d="M 130 145 Q 200 130 270 145"
        fill="none"
        stroke={SHADE}
        strokeWidth="1.2"
        strokeDasharray="3 5"
        opacity="0.4"
      />
    </Frame>
  );
};

/* ==========================================================
   4 — Brush knee (seated): chair + alternating push with arrow
   ========================================================== */
export const BrushKnee = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: seated brush knee push, alternating arms" className={className}>
    {/* Chair */}
    <g stroke={SOFT} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.55">
      <line x1="150" y1="200" x2="260" y2="200" />
      <line x1="150" y1="200" x2="150" y2="270" />
      <line x1="260" y1="200" x2="260" y2="270" />
      <line x1="150" y1="200" x2="150" y2="115" />
      <line x1="148" y1="115" x2="152" y2="115" strokeWidth="4" />
    </g>

    <g transform="translate(205,180)">
      <Head cy={-60} r={15} />
      <path
        d="M -22 -38 Q -26 -20 -22 -5 Q -24 10 -20 25 L 20 25 Q 24 10 22 -5 Q 26 -20 22 -38 Q 0 -44 -22 -38 Z"
        fill={FILL}
        stroke={SHADE}
        strokeWidth="1"
      >
        <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite" />
      </path>

      {/* Thighs forward (seated) */}
      <Limb x1={-12} y1={20} x2={32} y2={28} width={11} />
      <Limb x1={12} y1={20} x2={36} y2={32} width={11} />
      <Limb x1={32} y1={28} x2={32} y2={88} width={10} />
      <Limb x1={36} y1={32} x2={36} y2={88} width={10} />
      <ellipse cx="34" cy="90" rx="13" ry="4.5" fill={SHADE} />

      {/* Push arrow that travels with the leading hand */}
      <line stroke={SHADE} strokeWidth="2" opacity="0.5" markerEnd="url(#arrow)">
        <animate attributeName="x1" values="40;75;75;5" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y1" values="-20;-20;-20;0" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="60;95;55;-15" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-20;-15;-20;5" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.6;0;0" dur="4s" repeatCount="indefinite" />
      </line>

      {/* Pushing arm */}
      <line x1="-22" y1="-30" stroke={FILL} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x2" values="20;55;55;20" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0 0 1 1;0.4 0 0.6 1" keyTimes="0;0.4;0.6;1" />
        <animate attributeName="y2" values="-20;-25;-25;-20" dur="4s" repeatCount="indefinite" />
      </line>
      <line stroke={FILL} strokeWidth="8" strokeLinecap="round">
        <animate attributeName="x1" values="20;55;55;20" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0 0 1 1;0.4 0 0.6 1" keyTimes="0;0.4;0.6;1" />
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
   5 — Closing posture: hands lower, exhale waves drift down
   ========================================================== */
export const ClosingPosture = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: closing posture lowering hands with long exhale" className={className}>
    {/* Downward direction guide */}
    <line
      x1="200"
      y1="80"
      x2="200"
      y2="230"
      stroke={SHADE}
      strokeWidth="1.2"
      strokeDasharray="2 6"
      opacity="0.35"
      markerEnd="url(#arrow)"
    />

    <g transform="translate(200,180)">
      <Head />
      <Torso breathe />

      <Limb x1={-12} y1={10} x2={-18} y2={50} width={11} />
      <Limb x1={12} y1={10} x2={18} y2={50} width={11} />
      <Limb x1={-18} y1={50} x2={-20} y2={88} width={10} />
      <Limb x1={18} y1={50} x2={20} y2={88} width={10} />
      <ellipse cx="-20" cy="90" rx="13" ry="4.5" fill={SHADE} />
      <ellipse cx="20" cy="90" rx="13" ry="4.5" fill={SHADE} />

      {/* Lowering arms — left */}
      <line x1="-22" y1="-60" stroke={FILL} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x2" values="-32;-30;-28" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y2" values="-50;-30;-10" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </line>
      <line stroke={FILL} strokeWidth="8" strokeLinecap="round">
        <animate attributeName="x1" values="-32;-30;-28" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y1" values="-50;-30;-10" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="x2" values="-40;-36;-32" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-30;0;30" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </line>
      <circle r="6" fill={SHADE}>
        <animate attributeName="cx" values="-40;-36;-32" dur="6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="-30;0;30" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </circle>

      {/* Lowering arms — right */}
      <line x1="22" y1="-60" stroke={FILL} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x2" values="32;30;28" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y2" values="-50;-30;-10" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </line>
      <line stroke={FILL} strokeWidth="8" strokeLinecap="round">
        <animate attributeName="x1" values="32;30;28" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y1" values="-50;-30;-10" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="x2" values="40;36;32" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-30;0;30" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </line>
      <circle r="6" fill={SHADE}>
        <animate attributeName="cx" values="40;36;32" dur="6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="-30;0;30" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </circle>
    </g>

    {/* Exhale waves drifting downward (staggered) */}
    {[0, 1.5, 3, 4.5].map((delay) => (
      <circle key={delay} cx="200" cy="80" r="6" fill="none" stroke={SHADE} strokeWidth="1.5">
        <animate attributeName="cy" values="80;255" dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="r" values="4;14" dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0" dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
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
