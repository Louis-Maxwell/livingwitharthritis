/**
 * CinematicHumanoid
 * A reusable, "3D-feel" humanoid SVG built from gradients, rim light, depth
 * shadows and ground reflection. Pure SVG + SMIL — no Three.js, no JS frame
 * loop, no video files. Crisp at any size, respects prefers-reduced-motion.
 *
 * Other animation files compose this primitive (Frame, Body, defs) into
 * specific exercise loops.
 */
import type { ReactNode } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const C = {
  // Body fills – primary gradient + dark shade for depth
  bodyMain: "url(#chBodyGrad)",
  bodyDark: "hsl(var(--primary) / 0.7)",
  bodyEdge: "hsl(var(--primary))",
  rim: "hsl(0 0% 100% / 0.55)",
  skin: "url(#chSkinGrad)",
  ground: "url(#chFloorShadow)",
  guide: "hsl(var(--muted-foreground))",
  accent: "hsl(var(--primary))",
};

/** Shared <defs> for all cinematic figures. Mounted once per <svg>. */
export const CinematicDefs = ({ id = "" }: { id?: string }) => (
  <defs>
    <linearGradient id={`chBodyGrad${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="hsl(var(--primary) / 0.95)" />
      <stop offset="55%" stopColor="hsl(var(--primary) / 0.85)" />
      <stop offset="100%" stopColor="hsl(var(--primary) / 0.55)" />
    </linearGradient>
    <linearGradient id={`chSkinGrad${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="hsl(var(--primary) / 0.45)" />
      <stop offset="100%" stopColor="hsl(var(--primary) / 0.25)" />
    </linearGradient>
    <radialGradient id={`chFloorShadow${id}`} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
    </radialGradient>
    <radialGradient id={`chBreath${id}`} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
    </radialGradient>
    <linearGradient id={`chStudio${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="hsl(var(--secondary) / 0.4)" />
      <stop offset="55%" stopColor="hsl(var(--background))" />
      <stop offset="100%" stopColor="hsl(var(--background))" />
    </linearGradient>
    <filter id={`chSoftShadow${id}`} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
      <feOffset dx="0" dy="3" result="off" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.35" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <marker id={`chArrow${id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--primary))" opacity="0.65" />
    </marker>
  </defs>
);

/** Studio frame: gradient backdrop + ground + dashed horizon. */
export const Frame = ({
  children,
  label,
  className = "",
  aspect = "aspect-[4/3]",
}: {
  children: ReactNode;
  label: string;
  className?: string;
  aspect?: string;
}) => (
  <div
    role="img"
    aria-label={label}
    className={`relative w-full ${aspect} rounded-xl overflow-hidden border border-border/40 shadow-sm motion-reduce:[&_*]:!animate-none ${className}`}
  >
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <CinematicDefs />
      {/* Studio backdrop */}
      <rect width="400" height="300" fill="url(#chStudio)" />
      {/* Soft horizon glow */}
      <ellipse cx="200" cy="270" rx="180" ry="22" fill="url(#chBreath)" opacity="0.5" />
      {/* Floor cast shadow zone */}
      <ellipse cx="200" cy="272" rx="140" ry="11" fill="url(#chFloorShadow)" />
      <line
        x1="40"
        y1="270"
        x2="360"
        y2="270"
        stroke={C.guide}
        strokeWidth="1"
        strokeDasharray="2 5"
        opacity="0.3"
      />
      {children}
    </svg>
  </div>
);

/* ─────────────────────────────────────────────────────────
   Anatomical primitives (designed to compose at translate(cx,cy))
   Coords are local — origin at hip-centre.
   ───────────────────────────────────────────────────────── */

export const Head = ({
  cx = 0,
  cy = -92,
  r = 17,
}: { cx?: number; cy?: number; r?: number }) => (
  <g>
    {/* Neck */}
    <path
      d={`M ${cx - 6} ${cy + r - 4} L ${cx + 6} ${cy + r - 4} L ${cx + 7} ${cy + r + 6} L ${cx - 7} ${cy + r + 6} Z`}
      fill={C.bodyMain}
    />
    {/* Skull base + face */}
    <ellipse cx={cx} cy={cy} rx={r} ry={r + 1} fill={C.skin} stroke={C.bodyEdge} strokeWidth="1.2" />
    {/* Hair cap */}
    <path
      d={`M ${cx - r} ${cy - 1} A ${r} ${r} 0 0 1 ${cx + r} ${cy - 1} L ${cx + r - 1} ${cy - r + 5} L ${cx - r + 1} ${cy - r + 5} Z`}
      fill={C.bodyMain}
    />
    {/* Rim light */}
    <path
      d={`M ${cx - r + 2} ${cy - r + 6} A ${r - 2} ${r - 2} 0 0 1 ${cx - 2} ${cy - r + 2}`}
      stroke={C.rim}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* Eyes */}
    <circle cx={cx - 5} cy={cy + 3} r="1.3" fill={C.bodyEdge} opacity="0.7" />
    <circle cx={cx + 5} cy={cy + 3} r="1.3" fill={C.bodyEdge} opacity="0.7" />
  </g>
);

export const Torso = ({ breathe = false }: { breathe?: boolean }) => (
  <g>
    {/* Back shadow layer for depth */}
    <path
      d="M -24 -68 Q -28 -50 -24 -30 Q -26 -10 -22 12 L 22 12 Q 26 -10 24 -30 Q 28 -50 24 -68 Q 0 -74 -24 -68 Z"
      fill={C.bodyDark}
      opacity="0.55"
      transform="translate(2,2)"
    />
    {/* Main torso */}
    <path
      d="M -24 -68 Q -28 -50 -24 -30 Q -26 -10 -22 12 L 22 12 Q 26 -10 24 -30 Q 28 -50 24 -68 Q 0 -74 -24 -68 Z"
      fill={C.bodyMain}
      stroke={C.bodyEdge}
      strokeWidth="1"
    >
      {breathe && (
        <animate attributeName="opacity" values="0.9;1;0.9" dur="5s" repeatCount="indefinite" />
      )}
    </path>
    {/* Rim light along left edge */}
    <path
      d="M -22 -64 Q -25 -45 -21 -25 Q -23 -8 -19 10"
      stroke={C.rim}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* Chest centre line subtle */}
    <line x1="0" y1="-60" x2="0" y2="6" stroke={C.bodyEdge} strokeWidth="0.6" opacity="0.35" />
  </g>
);

export const Limb = ({
  x1, y1, x2, y2, width = 10, opacity = 1, rim = true,
}: { x1: number; y1: number; x2: number; y2: number; width?: number; opacity?: number; rim?: boolean }) => (
  <>
    {/* Shadow layer */}
    <line x1={x1 + 1.5} y1={y1 + 1.5} x2={x2 + 1.5} y2={y2 + 1.5} stroke={C.bodyDark} strokeWidth={width} strokeLinecap="round" opacity={opacity * 0.55} />
    {/* Main limb */}
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.bodyMain} strokeWidth={width} strokeLinecap="round" opacity={opacity} />
    {/* Rim highlight */}
    {rim && (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.rim} strokeWidth={width * 0.18} strokeLinecap="round" opacity={opacity * 0.85} />
    )}
  </>
);

export const Joint = ({ cx, cy, r = 5, opacity = 1 }: { cx: number; cy: number; r?: number; opacity?: number }) => (
  <>
    <circle cx={cx + 1} cy={cy + 1} r={r} fill={C.bodyDark} opacity={opacity * 0.5} />
    <circle cx={cx} cy={cy} r={r} fill={C.bodyEdge} opacity={opacity} />
  </>
);

export const Foot = ({ cx, cy, w = 14 }: { cx: number; cy: number; w?: number }) => (
  <>
    <ellipse cx={cx + 1} cy={cy + 2} rx={w} ry={5} fill={C.bodyDark} opacity="0.4" />
    <ellipse cx={cx} cy={cy} rx={w} ry={5} fill={C.bodyEdge} />
  </>
);

/** Standard "athletic stance" — legs + feet, used by many loops as the base. */
export const StandingLegs = () => (
  <>
    <Limb x1={-12} y1={10} x2={-20} y2={50} width={12} />
    <Limb x1={12} y1={10} x2={20} y2={50} width={12} />
    <Joint cx={-20} cy={50} r={5} />
    <Joint cx={20} cy={50} r={5} />
    <Limb x1={-20} y1={50} x2={-22} y2={88} width={11} />
    <Limb x1={20} y1={50} x2={22} y2={88} width={11} />
    <Foot cx={-22} cy={90} />
    <Foot cx={22} cy={90} />
  </>
);
