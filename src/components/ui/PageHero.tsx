import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
  badge?: ReactNode;
  title: ReactNode;
  subtitle?: string;
  /** @deprecated Kept for backward compat — no longer used */
  gradient?: string;
  /** @deprecated Kept for backward compat — no longer used */
  pattern?: string;
  children?: ReactNode;
}

export default function PageHero({
  badge,
  title,
  subtitle,
  children,
}: PageHeroProps) {
  return (
    <section className="relative bg-background pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-border/20">
      {/* Minimal editorial gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-[1200px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {badge && <div className="mb-6">{badge}</div>}

          <h1 className="font-display text-4xl sm:text-5xl md:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.06] mb-5">
            {title}
          </h1>

          {/* Accent line */}
          <div className="w-16 h-[2px] rounded-full bg-primary mb-6" />

          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{subtitle}</p>
          )}
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
