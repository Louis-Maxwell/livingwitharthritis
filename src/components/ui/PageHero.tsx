import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
  badge?: ReactNode;
  title: ReactNode;
  subtitle?: string;
  gradient?: string;
  pattern?: "dots" | "grid" | "diagonal" | "none";
  children?: ReactNode;
}

/* Shared decorative SVG shapes */
const DecorativeShapes = ({ variant = "default" }: { variant?: string }) => (
  <>
    {/* Gradient orbs */}
    <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-primary/6 blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-secondary/6 blur-3xl pointer-events-none" />
    <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-emerald-500/4 blur-2xl pointer-events-none" />

    {/* Scattered dots */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10%" cy="20%" r="3" fill="hsl(var(--primary))" />
      <circle cx="85%" cy="15%" r="2" fill="hsl(var(--secondary))" />
      <circle cx="70%" cy="80%" r="2.5" fill="hsl(var(--primary))" />
      <circle cx="25%" cy="75%" r="3.5" fill="hsl(var(--secondary))" />
      <circle cx="50%" cy="10%" r="2" fill="hsl(var(--primary))" />
      <circle cx="90%" cy="60%" r="3" fill="hsl(var(--primary))" />
    </svg>

    {/* Geometric shapes */}
    <svg className="absolute top-8 left-8 w-16 h-16 opacity-[0.07] pointer-events-none" viewBox="0 0 64 64" fill="none">
      <rect x="8" y="8" width="48" height="48" rx="12" stroke="hsl(var(--primary))" strokeWidth="2" />
    </svg>
    <svg className="absolute bottom-12 right-16 w-20 h-20 opacity-[0.05] pointer-events-none" viewBox="0 0 80 80" fill="none">
      <polygon points="40,5 75,65 5,65" stroke="hsl(var(--secondary))" strokeWidth="2" />
    </svg>
    <svg className="absolute top-1/3 right-1/4 w-10 h-10 opacity-[0.06] pointer-events-none" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="16" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  </>
);

const patternClasses: Record<string, string> = {
  dots: "pattern-dots",
  grid: "pattern-grid",
  diagonal: "pattern-diagonal",
  none: "",
};

export default function PageHero({
  badge,
  title,
  subtitle,
  gradient = "from-primary/8 via-background to-secondary/5",
  pattern = "dots",
  children,
}: PageHeroProps) {
  return (
    <section className={`relative bg-gradient-to-br ${gradient} pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden`}>
      <div className={`absolute inset-0 ${patternClasses[pattern]} opacity-30 pointer-events-none`} />
      <DecorativeShapes />

      <div className="container mx-auto px-6 md:px-10 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {badge && <div className="mb-5">{badge}</div>}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-[1.08] mb-5">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{subtitle}</p>
          )}
        </motion.div>
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Bottom gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
