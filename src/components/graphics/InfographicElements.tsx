import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Progress } from "@/components/ui/progress";

/* ─── Animated Stat Counter ─── */
export const StatCounter = ({
  value,
  suffix = "",
  prefix = "",
  label,
  icon,
  color = "primary",
}: {
  value: string;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: ReactNode;
  color?: "primary" | "emerald" | "sky" | "amber" | "violet" | "rose";
}) => {
  const colorMap: Record<string, string> = {
    primary: "from-primary/10 to-primary/5 border-primary/20 text-primary",
    emerald: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-600",
    sky: "from-sky-500/10 to-sky-500/5 border-sky-500/20 text-sky-600",
    amber: "from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-600",
    violet: "from-violet-500/10 to-violet-500/5 border-violet-500/20 text-violet-600",
    rose: "from-rose-500/10 to-rose-500/5 border-rose-500/20 text-rose-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl bg-gradient-to-br ${colorMap[color]} border p-5 text-center`}
    >
      {icon && <div className="flex justify-center mb-2">{icon}</div>}
      <p className="stat-number text-3xl md:text-4xl">
        {prefix}{value}{suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-1 font-medium">{label}</p>
    </motion.div>
  );
};

/* ─── Progress Ring (SVG) ─── */
export const ProgressRing = ({
  percent,
  label,
  sublabel,
  size = 100,
  strokeWidth = 8,
  color = "hsl(var(--primary))",
}: {
  percent: number;
  label: string;
  sublabel?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center stat-number text-xl">
          {percent}%
        </span>
      </div>
      <p className="text-sm font-semibold text-foreground text-center">{label}</p>
      {sublabel && <p className="text-xs text-muted-foreground text-center -mt-1">{sublabel}</p>}
    </motion.div>
  );
};

/* ─── Horizontal Bar Chart ─── */
export const HorizontalBar = ({
  items,
}: {
  items: { label: string; value: number; maxValue?: number; color?: string }[];
}) => {
  const max = Math.max(...items.map((i) => i.maxValue ?? i.value));
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
        >
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-foreground">{item.label}</span>
            <span className="text-muted-foreground">{item.value}%</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: item.color ?? "hsl(var(--primary))" }}
              initial={{ width: 0 }}
              whileInView={{ width: `${(item.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Wave Section Divider ─── */
export const WaveDivider = ({
  flip = false,
  color = "hsl(var(--muted))",
}: {
  flip?: boolean;
  color?: string;
}) => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className="w-full h-8 md:h-12"
    >
      <path
        d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z"
        fill={color}
      />
    </svg>
  </div>
);

/* ─── Comparison Card (VS) ─── */
export const ComparisonCard = ({
  leftTitle,
  rightTitle,
  rows,
}: {
  leftTitle: string;
  rightTitle: string;
  rows: { label: string; left: string; right: string }[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="rounded-2xl border border-border/40 overflow-hidden"
  >
    <div className="grid grid-cols-[1fr_auto_1fr]">
      <div className="bg-emerald-500/10 px-4 py-3 text-center">
        <span className="text-sm font-bold text-emerald-700">✅ {leftTitle}</span>
      </div>
      <div className="bg-muted/50 px-3 py-3 flex items-center">
        <span className="text-xs font-bold text-muted-foreground">VS</span>
      </div>
      <div className="bg-rose-500/10 px-4 py-3 text-center">
        <span className="text-sm font-bold text-rose-700">❌ {rightTitle}</span>
      </div>
    </div>
    {rows.map((row, i) => (
      <div key={i} className="grid grid-cols-[1fr_auto_1fr] border-t border-border/30">
        <div className="px-4 py-3">
          <p className="text-xs text-foreground">{row.left}</p>
        </div>
        <div className="px-3 py-3 bg-muted/20 flex items-center">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase">{row.label}</span>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs text-foreground">{row.right}</p>
        </div>
      </div>
    ))}
  </motion.div>
);

/* ─── Icon Stat Row (inline) ─── */
export const IconStatRow = ({
  stats,
}: {
  stats: { icon: ReactNode; value: string; label: string }[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="grid grid-cols-2 sm:grid-cols-4 gap-4"
  >
    {stats.map((s, i) => (
      <div
        key={i}
        className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-muted/30 border border-border/30"
      >
        <div className="text-primary">{s.icon}</div>
        <span className="stat-number text-xl">{s.value}</span>
        <span className="text-xs text-muted-foreground text-center">{s.label}</span>
      </div>
    ))}
  </motion.div>
);

/* ─── Tinted Section Wrapper ─── */
export const TintedSection = ({
  tint = "blue",
  children,
  className = "",
}: {
  tint?: "blue" | "green" | "amber" | "rose" | "violet" | "cyan" | "peach" | "mint";
  children: ReactNode;
  className?: string;
}) => (
  <section className={`py-12 lg:py-16 bg-tint-${tint} ${className}`}>
    {children}
  </section>
);

/* ─── Emoji Highlight Card ─── */
export const EmojiCard = ({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="rounded-xl border border-border/30 bg-card p-5 text-center hover:shadow-medium transition-shadow"
  >
    <span className="text-3xl block mb-2" aria-hidden="true">{emoji}</span>
    <h4 className="font-bold text-foreground text-sm mb-1">{title}</h4>
    <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

/* ─── Vertical Timeline ─── */
export const Timeline = ({
  items,
}: {
  items: { title: string; description: string; icon?: ReactNode }[];
}) => (
  <div className="relative pl-8 space-y-8">
    <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
    {items.map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        className="relative"
      >
        <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center">
          {item.icon ?? <span className="w-2 h-2 rounded-full bg-primary" />}
        </div>
        <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.description}</p>
      </motion.div>
    ))}
  </div>
);

/* ─── Mini Donut Chart ─── */
export const DonutChart = ({
  segments,
  size = 120,
  strokeWidth = 16,
  label,
}: {
  segments: { percent: number; color: string; label: string }[];
  size?: number;
  strokeWidth?: number;
  label?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulated = 0;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
        {segments.map((seg, i) => {
          const dashLen = (seg.percent / 100) * circumference;
          const dashOffset = circumference - dashLen;
          const rotation = (accumulated / 100) * 360;
          accumulated += seg.percent;
          return (
            <circle
              key={i}
              cx={size / 2} cy={size / 2} r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLen} ${circumference - dashLen}`}
              strokeDashoffset={0}
              transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
              strokeLinecap="butt"
            />
          );
        })}
      </svg>
      {label && <p className="text-sm font-semibold text-foreground">{label}</p>}
      <div className="flex flex-wrap gap-3 justify-center">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: seg.color }} />
            <span className="text-xs text-muted-foreground">{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
