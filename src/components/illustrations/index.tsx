/**
 * On-brand line illustrations. Black strokes, single red accent path.
 * Animate via the .draw class (stroke-dasharray reveal) when in view.
 */
import { SVGProps } from "react";
import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement> & { animate?: boolean; title?: string };

const base = (animate?: boolean) =>
  cn(
    "block",
    animate && "illustration-draw",
  );

const STROKE = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ACCENT = {
  fill: "none" as const,
  stroke: "hsl(var(--primary))",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const wrap = (
  children: React.ReactNode,
  { animate, className, title, ...rest }: IconProps,
) => (
  <svg
    viewBox="0 0 96 96"
    aria-hidden={title ? undefined : true}
    role={title ? "img" : undefined}
    className={cn(base(animate), "text-foreground", className)}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    {children}
  </svg>
);

export const JointKnee = (p: IconProps) =>
  wrap(
    <>
      <path {...STROKE} d="M30 12 L30 42 Q30 52 40 52 L56 52 Q66 52 66 62 L66 86" />
      <path {...ACCENT} d="M30 48 Q48 56 66 60" className="draw-path accent" />
      <circle cx="48" cy="52" r="3" className="fill-primary" />
    </>,
    p,
  );

export const JointHand = (p: IconProps) =>
  wrap(
    <>
      <path {...STROKE} d="M22 86 L22 50 Q22 42 30 42 L30 22 Q30 16 36 16 Q42 16 42 22 L42 40" />
      <path {...STROKE} d="M42 40 L42 18 Q42 12 48 12 Q54 12 54 18 L54 42" />
      <path {...STROKE} d="M54 42 L54 22 Q54 16 60 16 Q66 16 66 22 L66 44" />
      <path {...STROKE} d="M66 44 L66 28 Q66 22 72 22 Q78 22 78 28 L78 56 Q78 86 50 86 Z" />
      <path {...ACCENT} d="M30 58 Q50 64 74 58" className="draw-path accent" />
    </>,
    p,
  );

export const JointHip = (p: IconProps) =>
  wrap(
    <>
      <path {...STROKE} d="M20 30 Q48 14 76 30 L72 50 Q48 42 24 50 Z" />
      <path {...STROKE} d="M30 50 L24 86" />
      <path {...STROKE} d="M66 50 L72 86" />
      <circle cx="48" cy="38" r="4" {...ACCENT} className="draw-path accent" />
    </>,
    p,
  );

export const JointSpine = (p: IconProps) =>
  wrap(
    <>
      <path {...STROKE} d="M48 10 Q40 30 48 48 Q56 66 48 86" />
      {[20, 32, 44, 56, 68, 80].map((y, i) => (
        <path key={i} {...STROKE} d={`M${i % 2 ? 36 : 60} ${y} L${i % 2 ? 60 : 36} ${y}`} />
      ))}
      <circle cx="48" cy="48" r="3" className="fill-primary" />
    </>,
    p,
  );

export const Movement = (p: IconProps) =>
  wrap(
    <>
      <circle cx="48" cy="20" r="6" {...STROKE} />
      <path {...STROKE} d="M48 28 L48 56 L32 86 M48 56 L66 86 M30 42 L48 36 L70 46" />
      <path {...ACCENT} d="M12 70 Q30 60 48 66 Q66 72 84 62" className="draw-path accent" />
    </>,
    p,
  );

export const Plate = (p: IconProps) =>
  wrap(
    <>
      <circle cx="48" cy="48" r="34" {...STROKE} />
      <circle cx="48" cy="48" r="26" {...STROKE} />
      <path {...ACCENT} d="M36 40 Q48 32 60 40" className="draw-path accent" />
      <circle cx="42" cy="52" r="2.5" className="fill-primary" />
      <circle cx="54" cy="54" r="2" className="fill-foreground" />
    </>,
    p,
  );

export const HeartIll = (p: IconProps) =>
  wrap(
    <>
      <path
        {...STROKE}
        d="M48 80 C 20 62 14 44 22 32 C 30 20 44 22 48 34 C 52 22 66 20 74 32 C 82 44 76 62 48 80 Z"
      />
      <path {...ACCENT} d="M30 44 L42 44 L46 36 L52 56 L56 48 L66 48" className="draw-path accent" />
    </>,
    p,
  );

export const Shield = (p: IconProps) =>
  wrap(
    <>
      <path {...STROKE} d="M48 10 L78 22 L78 50 Q78 74 48 86 Q18 74 18 50 L18 22 Z" />
      <path {...ACCENT} d="M34 48 L44 58 L62 38" className="draw-path accent" />
    </>,
    p,
  );

export const Compass = (p: IconProps) =>
  wrap(
    <>
      <circle cx="48" cy="48" r="36" {...STROKE} />
      <circle cx="48" cy="48" r="28" {...STROKE} />
      <path {...ACCENT} d="M48 24 L56 48 L48 72 L40 48 Z" className="draw-path accent" />
      <circle cx="48" cy="48" r="2.5" className="fill-foreground" />
    </>,
    p,
  );

export const Spark = (p: IconProps) =>
  wrap(
    <>
      <path {...STROKE} d="M48 14 L52 40 L78 44 L52 50 L48 78 L44 50 L18 44 L44 40 Z" />
      <path {...ACCENT} d="M70 18 L74 26 M22 70 L26 74 M76 70 L72 74" className="draw-path accent" />
    </>,
    p,
  );

// eslint-disable-next-line react-refresh/only-export-components
export const ILLUSTRATIONS = {
  JointKnee,
  JointHand,
  JointHip,
  JointSpine,
  Movement,
  Plate,
  Heart: HeartIll,
  Shield,
  Compass,
  Spark,
};

export default ILLUSTRATIONS;
