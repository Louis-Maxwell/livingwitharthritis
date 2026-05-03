/**
 * ExerciseAnimations — cinematic 3D-feel humanoid loops for joint-specific
 * arthritis exercises. Built on the shared CinematicHumanoid primitives.
 * Pure SVG + SMIL — crisp, lightweight, prefers-reduced-motion friendly.
 *
 * Keyed by joint id (matches the JointExerciseSection database) and by
 * Exercise Hub category id where they overlap.
 */
import { Frame, Head, Torso, Limb, Joint, Foot, StandingLegs, C } from "./CinematicHumanoid";

interface AnimationProps { className?: string }

/* ── KNEE: seated leg extension ────────────────────────────────── */
export const KneeExtension = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: seated knee extension" className={className}>
    {/* Chair */}
    <g stroke={C.guide} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5">
      <line x1="150" y1="200" x2="260" y2="200" />
      <line x1="150" y1="200" x2="150" y2="270" />
      <line x1="260" y1="200" x2="260" y2="270" />
      <line x1="150" y1="200" x2="150" y2="115" />
    </g>

    <g transform="translate(205,180)">
      <Head cy={-62} r={16} />
      <path d="M -22 -38 Q -26 -20 -22 -5 Q -24 10 -20 25 L 20 25 Q 24 10 22 -5 Q 26 -20 22 -38 Q 0 -44 -22 -38 Z" fill={C.bodyMain} stroke={C.bodyEdge} strokeWidth="1" />

      {/* Resting arms */}
      <Limb x1={-22} y1={-30} x2={-26} y2={20} width={9} />
      <Limb x1={22} y1={-30} x2={26} y2={20} width={9} />

      {/* Static (left) leg seated */}
      <Limb x1={-12} y1={20} x2={-22} y2={50} width={12} />
      <Limb x1={-22} y1={50} x2={-22} y2={88} width={11} />
      <Foot cx={-22} cy={90} />

      {/* Animated (right) leg — extends out */}
      <line stroke={C.bodyMain} strokeWidth="12" strokeLinecap="round">
        <animate attributeName="x1" values="12;12;12" dur="3s" repeatCount="indefinite" />
        <animate attributeName="y1" values="20;20;20" dur="3s" repeatCount="indefinite" />
        <animate attributeName="x2" values="22;48;22" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y2" values="52;42;52" dur="3s" repeatCount="indefinite" />
      </line>
      <line stroke={C.bodyMain} strokeWidth="11" strokeLinecap="round">
        <animate attributeName="x1" values="22;48;22" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y1" values="52;42;52" dur="3s" repeatCount="indefinite" />
        <animate attributeName="x2" values="22;88;22" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y2" values="88;42;88" dur="3s" repeatCount="indefinite" />
      </line>
      <ellipse rx="14" ry="5" fill={C.bodyEdge}>
        <animate attributeName="cx" values="22;88;22" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="cy" values="90;42;90" dur="3s" repeatCount="indefinite" />
      </ellipse>

      {/* Quad activation glow */}
      <circle cx="0" cy="20" r="6" fill="url(#chBreath)">
        <animate attributeName="r" values="4;12;4" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
    </g>
  </Frame>
);

/* ── HIP: standing hip abduction ───────────────────────────────── */
export const HipAbduction = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: standing hip abduction" className={className}>
    {/* Chair-back support hint */}
    <g stroke={C.guide} strokeWidth="2" fill="none" opacity="0.4">
      <line x1="100" y1="120" x2="100" y2="270" />
      <line x1="80" y1="125" x2="120" y2="125" />
    </g>

    <g transform="translate(220,180)">
      <Head />
      <Torso breathe />

      {/* Hand on chair */}
      <Limb x1={-22} y1={-60} x2={-50} y2={-40} />
      <Limb x1={-50} y1={-40} x2={-110} y2={-55} />
      <Joint cx={-110} cy={-55} />

      <Limb x1={22} y1={-60} x2={28} y2={-10} />
      <Limb x1={28} y1={-10} x2={32} y2={20} />
      <Joint cx={32} cy={20} />

      {/* Standing leg */}
      <Limb x1={-12} y1={10} x2={-18} y2={50} width={12} />
      <Limb x1={-18} y1={50} x2={-20} y2={88} width={11} />
      <Foot cx={-22} cy={90} />

      {/* Lifting leg */}
      <line stroke={C.bodyMain} strokeWidth="12" strokeLinecap="round">
        <animate attributeName="x1" values="12;12;12" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="y1" values="10;10;10" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="x2" values="22;55;22" dur="3.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y2" values="50;38;50" dur="3.2s" repeatCount="indefinite" />
      </line>
      <line stroke={C.bodyMain} strokeWidth="11" strokeLinecap="round">
        <animate attributeName="x1" values="22;55;22" dur="3.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y1" values="50;38;50" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="x2" values="24;90;24" dur="3.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y2" values="88;48;88" dur="3.2s" repeatCount="indefinite" />
      </line>
      <ellipse rx="13" ry="5" fill={C.bodyEdge}>
        <animate attributeName="cx" values="24;90;24" dur="3.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="cy" values="90;50;90" dur="3.2s" repeatCount="indefinite" />
      </ellipse>
    </g>

    {/* Arc guide */}
    <path d="M 245 270 Q 290 220 310 230" fill="none" stroke={C.bodyEdge} strokeWidth="1.4" strokeDasharray="3 4" opacity="0.4" markerEnd="url(#chArrow)" />
  </Frame>
);

/* ── SHOULDER: pendulum + cross-body sweep ─────────────────────── */
export const ShoulderPendulum = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: shoulder pendulum swing" className={className}>
    <g transform="translate(200,180)">
      <Head />
      <Torso breathe />
      <StandingLegs />

      {/* Resting (left) arm */}
      <Limb x1={-22} y1={-60} x2={-30} y2={-15} />
      <Limb x1={-30} y1={-15} x2={-32} y2={20} />
      <Joint cx={-32} cy={20} />

      {/* Pendulum (right) arm — circular swing from shoulder */}
      <line x1="22" y1="-60" stroke={C.bodyMain} strokeWidth="10" strokeLinecap="round">
        <animate attributeName="x2" values="35;55;75;55;35;15;-5;15;35" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-10;0;15;30;40;30;15;0;-10" dur="4s" repeatCount="indefinite" />
      </line>
      <line stroke={C.bodyMain} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x1" values="35;55;75;55;35;15;-5;15;35" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y1" values="-10;0;15;30;40;30;15;0;-10" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="50;75;100;75;50;5;-25;5;50" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="20;40;55;70;80;70;55;40;20" dur="4s" repeatCount="indefinite" />
      </line>
      <circle r="6" fill={C.bodyEdge}>
        <animate attributeName="cx" values="50;75;100;75;50;5;-25;5;50" dur="4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="20;40;55;70;80;70;55;40;20" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Circular trail */}
      <circle cx="35" cy="40" r="48" fill="none" stroke={C.bodyEdge} strokeWidth="1" strokeDasharray="2 4" opacity="0.35" />
    </g>
  </Frame>
);

/* ── HAND / WRIST: finger spread + fist ────────────────────────── */
export const HandFingerSpread = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: hand finger spread and fist exercise" className={className}>
    <g transform="translate(200,170)">
      {/* Forearm */}
      <line x1="-90" y1="60" x2="0" y2="0" stroke={C.bodyMain} strokeWidth="22" strokeLinecap="round" />
      <line x1="-90" y1="60" x2="0" y2="0" stroke={C.rim} strokeWidth="3" strokeLinecap="round" opacity="0.6" />

      {/* Palm */}
      <ellipse cx="20" cy="-10" rx="22" ry="26" fill={C.bodyMain} stroke={C.bodyEdge} strokeWidth="1.2" transform="rotate(-25 20 -10)" />

      {/* Fingers — spread/close anim */}
      {[
        { angle: -55, len: 38 },
        { angle: -35, len: 44 },
        { angle: -15, len: 46 },
        { angle: 5, len: 40 },
      ].map((f, i) => (
        <g key={i} transform={`translate(20,-10) rotate(${f.angle})`}>
          <line stroke={C.bodyMain} strokeWidth="9" strokeLinecap="round">
            <animate attributeName="x1" values="0;0;0" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="y1" values="-22;-22;-22" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="x2" values="0;0;0" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="y2" values={`-${22 + f.len};-${22 + f.len * 0.55};-${22 + f.len}`} dur="3.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          </line>
        </g>
      ))}
      {/* Thumb */}
      <line x1="0" y1="-5" x2="-25" y2="-15" stroke={C.bodyMain} strokeWidth="10" strokeLinecap="round">
        <animate attributeName="x2" values="-25;-12;-25" dur="3.5s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-15;-2;-15" dur="3.5s" repeatCount="indefinite" />
      </line>

      {/* Activation halo */}
      <circle cx="20" cy="-10" r="35" fill="url(#chBreath)" opacity="0.4">
        <animate attributeName="r" values="30;42;30" dur="3.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3.5s" repeatCount="indefinite" />
      </circle>
    </g>

    <text x="200" y="270" textAnchor="middle" fontSize="11" fill={C.guide} opacity="0.7">
      <tspan>spread</tspan>
      <animate attributeName="opacity" values="0.85;0.2;0.85" dur="3.5s" repeatCount="indefinite" />
    </text>
  </Frame>
);

/* ── WRIST circles ─────────────────────────────────────────────── */
export const WristCircles = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: slow wrist circle rotation" className={className}>
    <g transform="translate(200,170)">
      <line x1="-100" y1="60" x2="-10" y2="0" stroke={C.bodyMain} strokeWidth="22" strokeLinecap="round" />
      <line x1="-100" y1="60" x2="-10" y2="0" stroke={C.rim} strokeWidth="3" strokeLinecap="round" opacity="0.6" />

      {/* Hand rotates around wrist */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 -10 0" to="360 -10 0" dur="4s" repeatCount="indefinite" />
        <ellipse cx="15" cy="-5" rx="22" ry="14" fill={C.bodyMain} stroke={C.bodyEdge} strokeWidth="1.2" />
        {[-40, -20, 0, 20].map((a) => (
          <line key={a} transform={`translate(15,-5) rotate(${a})`} x1="0" y1="0" x2="38" y2="0" stroke={C.bodyMain} strokeWidth="7" strokeLinecap="round" />
        ))}
      </g>

      {/* Trail */}
      <circle cx="-10" cy="0" r="42" fill="none" stroke={C.bodyEdge} strokeWidth="1.2" strokeDasharray="2 4" opacity="0.45" />
    </g>
  </Frame>
);

/* ── ELBOW: flexion / extension ────────────────────────────────── */
export const ElbowFlexion = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: elbow flexion and extension" className={className}>
    <g transform="translate(200,180)">
      <Head />
      <Torso breathe />
      <StandingLegs />

      {/* Resting left arm */}
      <Limb x1={-22} y1={-60} x2={-30} y2={-15} />
      <Limb x1={-30} y1={-15} x2={-32} y2={20} />
      <Joint cx={-32} cy={20} />

      {/* Right upper arm static */}
      <Limb x1={22} y1={-60} x2={28} y2={-15} />
      <Joint cx={28} cy={-15} r={6} />

      {/* Right forearm pivots at elbow */}
      <line stroke={C.bodyMain} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x1" values="28;28;28" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="y1" values="-15;-15;-15" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="x2" values="34;48;34" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y2" values="22;-55;22" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </line>
      <circle r="6" fill={C.bodyEdge}>
        <animate attributeName="cx" values="34;48;34" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="cy" values="22;-55;22" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </circle>

      {/* Pivot arc */}
      <path d="M 60 175 Q 75 145 80 110" fill="none" stroke={C.bodyEdge} strokeWidth="1.2" strokeDasharray="3 4" opacity="0.4" />
    </g>
  </Frame>
);

/* ── ANKLE: ankle circles + heel raises ────────────────────────── */
export const AnkleCircles = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: heel raises and ankle activation" className={className}>
    <g transform="translate(200,180)">
      <Head />
      <Torso breathe />
      <Limb x1={-22} y1={-60} x2={-30} y2={-15} />
      <Limb x1={-30} y1={-15} x2={-32} y2={20} />
      <Joint cx={-32} cy={20} />
      <Limb x1={22} y1={-60} x2={30} y2={-15} />
      <Limb x1={30} y1={-15} x2={32} y2={20} />
      <Joint cx={32} cy={20} />

      {/* Body lifts on toes */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-12;0,0" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <Limb x1={-12} y1={10} x2={-20} y2={50} width={12} />
        <Limb x1={12} y1={10} x2={20} y2={50} width={12} />
        <Limb x1={-20} y1={50} x2={-22} y2={84} width={11} />
        <Limb x1={20} y1={50} x2={22} y2={84} width={11} />
      </g>

      {/* Feet pivot up at heel */}
      <g transform="translate(-22,90)">
        <ellipse rx="14" ry="5" fill={C.bodyEdge}>
          <animateTransform attributeName="transform" type="rotate" values="0;-22;0" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        </ellipse>
      </g>
      <g transform="translate(22,90)">
        <ellipse rx="14" ry="5" fill={C.bodyEdge}>
          <animateTransform attributeName="transform" type="rotate" values="0;-22;0" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        </ellipse>
      </g>
    </g>

    {/* Up arrow */}
    <line x1="200" y1="120" x2="200" y2="80" stroke={C.bodyEdge} strokeWidth="1.5" strokeDasharray="2 4" opacity="0.45" markerEnd="url(#chArrow)" />
  </Frame>
);

/* ── SPINE: cat-cow stretch ────────────────────────────────────── */
export const SpineCatCow = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: cat-cow spine stretch on all fours" className={className}>
    <g transform="translate(200,200)">
      {/* Hands */}
      <Foot cx={-70} cy={50} w={12} />
      {/* Knees */}
      <Foot cx={70} cy={50} w={14} />

      {/* Front leg (knee on floor) */}
      <Limb x1={50} y1={20} x2={70} y2={45} width={12} />
      <Limb x1={70} y1={45} x2={75} y2={50} width={11} />

      {/* Back arm to hand */}
      <Limb x1={-30} y1={-10} x2={-60} y2={20} width={11} />
      <Limb x1={-60} y1={20} x2={-70} y2={48} width={11} />

      {/* Spine path morphs cat ↔ cow */}
      <path stroke={C.bodyMain} strokeWidth="22" fill="none" strokeLinecap="round">
        <animate attributeName="d" values="M -30 -10 Q 20 -40 60 0;M -30 -10 Q 20 30 60 0;M -30 -10 Q 20 -40 60 0" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </path>
      {/* Rim along spine */}
      <path stroke={C.rim} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6">
        <animate attributeName="d" values="M -30 -10 Q 20 -40 60 0;M -30 -10 Q 20 30 60 0;M -30 -10 Q 20 -40 60 0" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </path>

      {/* Head — moves with the spine arc */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="-50,-25;-50,-5;-50,-25" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <Head cx={0} cy={0} r={14} />
      </g>
    </g>

    <text x="200" y="58" fontSize="11" fill={C.guide} textAnchor="middle" opacity="0.75">
      <tspan>arch ↔ round</tspan>
    </text>
  </Frame>
);

/* ── NECK: gentle side bends ───────────────────────────────────── */
export const NeckBends = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: gentle neck side bends" className={className}>
    <g transform="translate(200,180)">
      <Torso />
      <StandingLegs />
      {/* Arms relaxed */}
      <Limb x1={-22} y1={-60} x2={-30} y2={-15} />
      <Limb x1={-30} y1={-15} x2={-32} y2={20} />
      <Joint cx={-32} cy={20} />
      <Limb x1={22} y1={-60} x2={30} y2={-15} />
      <Limb x1={30} y1={-15} x2={32} y2={20} />
      <Joint cx={32} cy={20} />

      {/* Head tilts side-to-side around base of neck */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-18 0 -68;18 0 -68;-18 0 -68" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <Head />
      </g>
    </g>

    {/* Arc guide */}
    <path d="M 165 90 Q 200 70 235 90" fill="none" stroke={C.bodyEdge} strokeWidth="1.2" strokeDasharray="3 4" opacity="0.4" />
  </Frame>
);

/* ── HAND (alt for "hand" category) — same as finger spread ───── */
export const HandExercise = HandFingerSpread;

/* ── CHAIR: seated march ───────────────────────────────────────── */
export const ChairMarch = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: seated marching exercise" className={className}>
    {/* Chair */}
    <g stroke={C.guide} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5">
      <line x1="150" y1="200" x2="260" y2="200" />
      <line x1="150" y1="200" x2="150" y2="270" />
      <line x1="260" y1="200" x2="260" y2="270" />
      <line x1="150" y1="200" x2="150" y2="115" />
    </g>

    <g transform="translate(205,180)">
      <Head cy={-62} r={16} />
      <path d="M -22 -38 Q -26 -20 -22 -5 Q -24 10 -20 25 L 20 25 Q 24 10 22 -5 Q 26 -20 22 -38 Q 0 -44 -22 -38 Z" fill={C.bodyMain} stroke={C.bodyEdge} strokeWidth="1" />

      {/* Arms swing in march rhythm */}
      <line x1="-22" y1="-30" stroke={C.bodyMain} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x2" values="-30;-26;-30" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="20;-10;20" dur="1.6s" repeatCount="indefinite" />
      </line>
      <line x1="22" y1="-30" stroke={C.bodyMain} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x2" values="30;26;30" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-10;20;-10" dur="1.6s" repeatCount="indefinite" />
      </line>

      {/* LEFT leg — knee lifts */}
      <line stroke={C.bodyMain} strokeWidth="12" strokeLinecap="round">
        <animate attributeName="x1" values="-12;-12;-12" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="y1" values="20;20;20" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="x2" values="-22;-2;-22" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y2" values="50;15;50" dur="1.6s" repeatCount="indefinite" />
      </line>
      <line stroke={C.bodyMain} strokeWidth="11" strokeLinecap="round">
        <animate attributeName="x1" values="-22;-2;-22" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y1" values="50;15;50" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="x2" values="-22;-2;-22" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="88;55;88" dur="1.6s" repeatCount="indefinite" />
      </line>
      <ellipse rx="13" ry="5" fill={C.bodyEdge}>
        <animate attributeName="cx" values="-22;-2;-22" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="90;57;90" dur="1.6s" repeatCount="indefinite" />
      </ellipse>

      {/* RIGHT leg — counter-phase */}
      <line stroke={C.bodyMain} strokeWidth="12" strokeLinecap="round">
        <animate attributeName="x1" values="12;12;12" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="y1" values="20;20;20" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="x2" values="2;22;2" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y2" values="15;50;15" dur="1.6s" repeatCount="indefinite" />
      </line>
      <line stroke={C.bodyMain} strokeWidth="11" strokeLinecap="round">
        <animate attributeName="x1" values="2;22;2" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y1" values="15;50;15" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="x2" values="2;22;2" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="55;88;55" dur="1.6s" repeatCount="indefinite" />
      </line>
      <ellipse rx="13" ry="5" fill={C.bodyEdge}>
        <animate attributeName="cx" values="2;22;2" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="57;90;57" dur="1.6s" repeatCount="indefinite" />
      </ellipse>
    </g>
  </Frame>
);

/* ── Index keyed by both joint id (Self Help) AND hub category id ── */
export const EXERCISE_ANIMATIONS = {
  // Joint Exercise Section ids
  neck: NeckBends,
  shoulder: ShoulderPendulum,
  elbow: ElbowFlexion,
  wrist: WristCircles,
  hip: HipAbduction,
  knee: KneeExtension,
  ankle: AnkleCircles,
  spine: SpineCatCow,
  // Exercise Hub category ids
  hand: HandExercise,
  chair: ChairMarch,
} as const;

export type ExerciseAnimationKey = keyof typeof EXERCISE_ANIMATIONS;
