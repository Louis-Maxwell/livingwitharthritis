import { cn } from '@/lib/utils';

interface SiteLogoProps {
  /** "full" = figure + wordmark, "mark" = figure only */
  variant?: 'full' | 'mark';
  className?: string;
  /** Tailwind size classes applied to the figure mark */
  markClassName?: string;
  /** Tailwind classes applied to the wordmark text */
  textClassName?: string;
}

/**
 * Brand logo: red stick figure with raised arms beside the
 * "LIVING WITH ARTHRITIS" wordmark. Uses the primary token so it
 * themes correctly in light and dark mode.
 */
const LogoFigure = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 64 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <g stroke="hsl(var(--primary))" strokeWidth="7" strokeLinecap="round" fill="none">
      {/* raised arms, curved through the shoulder */}
      <path d="M32 29 Q19 20 8 5" />
      <path d="M32 29 Q45 20 56 5" />
      {/* torso */}
      <path d="M32 27 L32 45" />
      {/* legs apart, curved through the hip */}
      <path d="M32 45 Q23 54 17 69" />
      <path d="M32 45 Q41 54 47 69" />
    </g>
    {/* head */}
    <circle cx="32" cy="12" r="9" fill="hsl(var(--primary))" />
  </svg>
);

const SiteLogo = ({
  variant = 'full',
  className,
  markClassName,
  textClassName,
}: SiteLogoProps) => {
  if (variant === 'mark') {
    return <LogoFigure className={cn('h-8 w-auto', markClassName, className)} />;
  }

  return (
    <span className={cn('inline-flex items-center gap-2 sm:gap-3 min-w-0', className)}>
      <LogoFigure className={cn('h-9 w-auto shrink-0', markClassName)} />
      <span
        className={cn(
          'font-sans font-extrabold uppercase tracking-[-0.01em] leading-tight text-primary',
          'text-xl sm:text-2xl md:text-[1.75rem]',
          'max-w-[8.75rem] sm:max-w-none text-balance',
          textClassName,
        )}
      >
        Living With Arthritis
      </span>
    </span>
  );
};

export default SiteLogo;
