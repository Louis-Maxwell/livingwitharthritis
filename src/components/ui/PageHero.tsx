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
    <section className="relative bg-background pt-10 pb-10 lg:pt-14 lg:pb-14 overflow-x-hidden border-b border-border/15">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.015] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-[1200px] relative z-10">
        {/* Above-fold: always visible (no opacity-0 / reveal hide — protects LCP text). */}
        <div>
          {badge && <div className="mb-5">{badge}</div>}

          <h1 className="font-display text-[2rem] sm:text-4xl md:text-[3.5rem] lg:text-[3.75rem] font-bold text-foreground tracking-[-0.025em] leading-[1.15] mb-4">
            {title}
          </h1>

          <div className="w-14 h-[2px] rounded-full bg-primary mb-5" />

          {subtitle && (
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">{subtitle}</p>
          )}
        </div>

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
