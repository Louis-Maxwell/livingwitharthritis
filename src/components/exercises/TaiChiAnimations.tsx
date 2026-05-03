/**
 * TaiChiAnimations — cinematic 3D-feel humanoid loops for the
 * 5-movement tai chi routine. Built on CinematicHumanoid primitives
 * (gradient fills, depth shadows, rim light, ground reflection).
 * Pure SVG + SMIL — zero runtime cost.
 */
import {
  Frame, Head, Torso, Limb, Joint, Foot, StandingLegs, C,
} from "./CinematicHumanoid";

interface AnimationProps { className?: string }

/* ==========================================================
   1 — Rooted stance (Wuji): breathing rise + halo + crown thread
   ========================================================== */
export const RootedStance = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: standing rooted Wuji stance with slow breathing" className={className}>
    {/* Crown alignment thread */}
    <line x1="200" y1="40" x2="200" y2="270" stroke={C.guide} strokeWidth="1" strokeDasharray="3 5" opacity="0.35" />

    {/* Inhale halo */}
    <circle cx="200" cy="55" r="8" fill="url(#chBreath)">
      <animate attributeName="r" values="6;30;6" dur="5s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.7;0;0.7" dur="5s" repeatCount="indefinite" />
    </circle>

    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="200,180;200,176;200,180"
        dur="5s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        keyTimes="0;0.5;1"
      />

      <Head />
      <Torso breathe />

      {/* Upper arms */}
      <Limb x1={-22} y1={-60} x2={-32} y2={-20} />
      <Limb x1={22} y1={-60} x2={32} y2={-20} />

      {/* Forearms drift outward with breath */}
      <g>
        <line x1="-32" y1="-20" x2="-34" y2="22" stroke={C.bodyMain} strokeWidth="9" strokeLinecap="round">
          <animate attributeName="x2" values="-34;-44;-34" dur="5s" repeatCount="indefinite" />
        </line>
        <line x1="32" y1="-20" x2="34" y2="22" stroke={C.bodyMain} strokeWidth="9" strokeLinecap="round">
          <animate attributeName="x2" values="34;44;34" dur="5s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Hands */}
      <circle cx="-34" cy="22" r="5.5" fill={C.bodyEdge}>
        <animate attributeName="cx" values="-34;-44;-34" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="34" cy="22" r="5.5" fill={C.bodyEdge}>
        <animate attributeName="cx" values="34;44;34" dur="5s" repeatCount="indefinite" />
      </circle>

      <StandingLegs />
    </g>

    <text x="350" y="58" fontSize="10" fill={C.guide} textAnchor="end">
      <tspan>inhale</tspan>
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="5s" repeatCount="indefinite" />
    </text>
    <text x="350" y="72" fontSize="10" fill={C.guide} textAnchor="end">
      <tspan>exhale</tspan>
      <animate attributeName="opacity" values="0.2;0.8;0.2" dur="5s" repeatCount="indefinite" />
    </text>
  </Frame>
);

/* ==========================================================
   2 — Weight shift (with cinematic load ring + weight ball)
   ========================================================== */
export const WeightShift = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: slow weight shift between right and left leg" className={className}>
    {/* Planted feet */}
    <Foot cx={160} cy={272} w={16} />
    <Foot cx={240} cy={272} w={16} />

    {/* Pressure rings under loaded foot */}
    <circle r="20" fill="none" stroke={C.bodyEdge} strokeWidth="1.5" opacity="0.5">
      <animate attributeName="cx" values="160;240;160" dur="4s" repeatCount="indefinite" />
      <animate attributeName="cy" values="272;272;272" dur="4s" repeatCount="indefinite" />
      <animate attributeName="r" values="22;14;22" dur="4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="4s" repeatCount="indefinite" />
    </circle>

    {/* Direction guide */}
    <path d="M 150 110 Q 200 80 250 110" fill="none" stroke={C.bodyEdge} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.45" markerEnd="url(#chArrow)" />

    {/* Upper body */}
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
      <Limb x1={-22} y1={-60} x2={-28} y2={-18} />
      <Limb x1={22} y1={-60} x2={28} y2={-18} />
      <Limb x1={-28} y1={-18} x2={-18} y2={12} />
      <Limb x1={28} y1={-18} x2={18} y2={12} />
      <Joint cx={-18} cy={12} />
      <Joint cx={18} cy={12} />
    </g>

    {/* Animated legs from moving hips down to fixed feet */}
    <line stroke={C.bodyMain} strokeWidth="12" strokeLinecap="round">
      <animate attributeName="x1" values="168;208;168" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      <animate attributeName="y1" values="190;190;190" dur="4s" repeatCount="indefinite" />
      <animate attributeName="x2" values="160;160;160" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y2" values="265;265;265" dur="4s" repeatCount="indefinite" />
    </line>
    <line stroke={C.bodyMain} strokeWidth="12" strokeLinecap="round">
      <animate attributeName="x1" values="192;232;192" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      <animate attributeName="y1" values="190;190;190" dur="4s" repeatCount="indefinite" />
      <animate attributeName="x2" values="240;240;240" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y2" values="265;265;265" dur="4s" repeatCount="indefinite" />
    </line>

    {/* Weight ball */}
    <g>
      <circle r="10" fill={C.bodyEdge} opacity="0.9">
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
   3 — Cloud hands (sweeping arms with motion trails)
   ========================================================== */
export const CloudHands = ({ className }: AnimationProps) => {
  const trails = [0.15, 0.3, 0.45];
  return (
    <Frame label="Animated demonstration: cloud hands arms sweeping across the chest" className={className}>
      <g transform="translate(200,180)">
        <Head />
        <Torso breathe />
        <StandingLegs />

        {/* LEFT (upper) ARM */}
        <line x1="-22" y1="-60" stroke={C.bodyMain} strokeWidth="10" strokeLinecap="round">
          <animate attributeName="x2" values="-30;15;-30" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="y2" values="-40;-55;-40" dur="4s" repeatCount="indefinite" />
        </line>
        <line stroke={C.bodyMain} strokeWidth="9" strokeLinecap="round">
          <animate attributeName="x1" values="-30;15;-30" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="y1" values="-40;-55;-40" dur="4s" repeatCount="indefinite" />
          <animate attributeName="x2" values="-58;58;-58" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="y2" values="-35;-35;-35" dur="4s" repeatCount="indefinite" />
        </line>
        {trails.map((t, i) => (
          <circle key={i} r={5 - i} fill={C.bodyEdge} opacity={0.18 - i * 0.04}>
            <animate attributeName="cx" values="-58;58;-58" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" begin={`-${t}s`} />
            <animate attributeName="cy" values="-35;-35;-35" dur="4s" repeatCount="indefinite" begin={`-${t}s`} />
          </circle>
        ))}
        <circle r="6" fill={C.bodyEdge}>
          <animate attributeName="cx" values="-58;58;-58" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="cy" values="-35;-35;-35" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* RIGHT (lower) ARM — counter-phase */}
        <line x1="22" y1="-60" stroke={C.bodyMain} strokeWidth="10" strokeLinecap="round" opacity="0.9">
          <animate attributeName="x2" values="30;-15;30" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="y2" values="-15;-5;-15" dur="4s" repeatCount="indefinite" />
        </line>
        <line stroke={C.bodyMain} strokeWidth="9" strokeLinecap="round" opacity="0.9">
          <animate attributeName="x1" values="30;-15;30" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="y1" values="-15;-5;-15" dur="4s" repeatCount="indefinite" />
          <animate attributeName="x2" values="58;-58;58" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="y2" values="15;15;15" dur="4s" repeatCount="indefinite" />
        </line>
        {trails.map((t, i) => (
          <circle key={`r${i}`} r={5 - i} fill={C.bodyEdge} opacity={0.15 - i * 0.04}>
            <animate attributeName="cx" values="58;-58;58" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" begin={`-${t}s`} />
            <animate attributeName="cy" values="15;15;15" dur="4s" repeatCount="indefinite" begin={`-${t}s`} />
          </circle>
        ))}
        <circle r="6" fill={C.bodyEdge} opacity="0.9">
          <animate attributeName="cx" values="58;-58;58" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
          <animate attributeName="cy" values="15;15;15" dur="4s" repeatCount="indefinite" />
        </circle>
      </g>

      <path d="M 130 145 Q 200 130 270 145" fill="none" stroke={C.bodyEdge} strokeWidth="1.2" strokeDasharray="3 5" opacity="0.4" />
    </Frame>
  );
};

/* ==========================================================
   4 — Brush knee (seated): chair + alternating push
   ========================================================== */
export const BrushKnee = ({ className }: AnimationProps) => (
  <Frame label="Animated demonstration: seated brush knee push, alternating arms" className={className}>
    {/* Chair */}
    <g stroke={C.guide} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.55">
      <line x1="150" y1="200" x2="260" y2="200" />
      <line x1="150" y1="200" x2="150" y2="270" />
      <line x1="260" y1="200" x2="260" y2="270" />
      <line x1="150" y1="200" x2="150" y2="115" />
    </g>

    <g transform="translate(205,180)">
      <Head cy={-62} r={16} />
      {/* Seated torso (shorter) */}
      <path
        d="M -22 -38 Q -26 -20 -22 -5 Q -24 10 -20 25 L 20 25 Q 24 10 22 -5 Q 26 -20 22 -38 Q 0 -44 -22 -38 Z"
        fill={C.bodyMain}
        stroke={C.bodyEdge}
        strokeWidth="1"
      />

      {/* Thighs forward (seated) */}
      <Limb x1={-12} y1={20} x2={32} y2={28} width={12} />
      <Limb x1={12} y1={20} x2={36} y2={32} width={12} />
      <Limb x1={32} y1={28} x2={32} y2={88} width={11} />
      <Limb x1={36} y1={32} x2={36} y2={88} width={11} />
      <Foot cx={34} cy={90} />

      {/* Push arrow */}
      <line stroke={C.bodyEdge} strokeWidth="2" opacity="0.55" markerEnd="url(#chArrow)">
        <animate attributeName="x1" values="40;75;75;5" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y1" values="-20;-20;-20;0" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="60;95;55;-15" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-20;-15;-20;5" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.65;0;0" dur="4s" repeatCount="indefinite" />
      </line>

      {/* Pushing arm */}
      <line x1="-22" y1="-30" stroke={C.bodyMain} strokeWidth="10" strokeLinecap="round">
        <animate attributeName="x2" values="20;55;55;20" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0 0 1 1;0.4 0 0.6 1" keyTimes="0;0.4;0.6;1" />
        <animate attributeName="y2" values="-20;-25;-25;-20" dur="4s" repeatCount="indefinite" />
      </line>
      <line stroke={C.bodyMain} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x1" values="20;55;55;20" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0 0 1 1;0.4 0 0.6 1" keyTimes="0;0.4;0.6;1" />
        <animate attributeName="y1" values="-20;-25;-25;-20" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="55;90;55;-15" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-20;-15;-20;5" dur="4s" repeatCount="indefinite" />
      </line>
      <circle r="6" fill={C.bodyEdge}>
        <animate attributeName="cx" values="55;90;55;-15" dur="4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="-20;-15;-20;5" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Brushing arm */}
      <line x1="22" y1="-30" stroke={C.bodyMain} strokeWidth="10" strokeLinecap="round" opacity="0.85">
        <animate attributeName="x2" values="20;-10;-10;20" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="0;-10;-10;0" dur="4s" repeatCount="indefinite" />
      </line>
      <line stroke={C.bodyMain} strokeWidth="9" strokeLinecap="round" opacity="0.85">
        <animate attributeName="x1" values="20;-10;-10;20" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y1" values="0;-10;-10;0" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="-15;55;90;55" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="5;-20;-15;-20" dur="4s" repeatCount="indefinite" />
      </line>
      <circle r="6" fill={C.bodyEdge} opacity="0.85">
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
    <line x1="200" y1="80" x2="200" y2="230" stroke={C.bodyEdge} strokeWidth="1.2" strokeDasharray="2 6" opacity="0.35" markerEnd="url(#chArrow)" />

    <g transform="translate(200,180)">
      <Head />
      <Torso breathe />
      <StandingLegs />

      {/* Lowering arms — left */}
      <line x1="-22" y1="-60" stroke={C.bodyMain} strokeWidth="10" strokeLinecap="round">
        <animate attributeName="x2" values="-32;-30;-28" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y2" values="-50;-30;-10" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </line>
      <line stroke={C.bodyMain} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x1" values="-32;-30;-28" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y1" values="-50;-30;-10" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="x2" values="-40;-36;-32" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-30;0;30" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </line>
      <circle r="6" fill={C.bodyEdge}>
        <animate attributeName="cx" values="-40;-36;-32" dur="6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="-30;0;30" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </circle>

      {/* Lowering arms — right */}
      <line x1="22" y1="-60" stroke={C.bodyMain} strokeWidth="10" strokeLinecap="round">
        <animate attributeName="x2" values="32;30;28" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y2" values="-50;-30;-10" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </line>
      <line stroke={C.bodyMain} strokeWidth="9" strokeLinecap="round">
        <animate attributeName="x1" values="32;30;28" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="y1" values="-50;-30;-10" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animate attributeName="x2" values="40;36;32" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-30;0;30" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </line>
      <circle r="6" fill={C.bodyEdge}>
        <animate attributeName="cx" values="40;36;32" dur="6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="-30;0;30" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </circle>
    </g>

    {[0, 1.5, 3, 4.5].map((delay) => (
      <circle key={delay} cx="200" cy="80" r="6" fill="none" stroke={C.bodyEdge} strokeWidth="1.5">
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
