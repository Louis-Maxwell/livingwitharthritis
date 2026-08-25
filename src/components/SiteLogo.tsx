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
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <g stroke="hsl(var(--primary))" strokeWidth="30" strokeLinecap="round" fill="none">
      {/* raised arms, victory pose */}
      <path d="M256 200 Q176 128 92 64" />
      <path d="M256 200 Q336 128 420 64" />
      {/* torso */}
      <path d="M256 172 L256 308" />
      {/* legs apart, grounded */}
      <path d="M256 308 Q206 388 168 460" />
      <path d="M256 308 Q306 388 344 460" />
    </g>
    {/* head */}
    <circle cx="256" cy="124" r="44" fill="hsl(var(--primary))" />
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
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoFigure className={cn('h-9 w-auto shrink-0', markClassName)} />
      <span
        className={cn(
          'font-sans font-extrabold uppercase tracking-[-0.01em] leading-none text-primary',
          'text-xl sm:text-2xl md:text-[1.75rem]',
          textClassName,
        )}
      >
        Living With Arthritis
      </span>
    </span>
  );
};

export default SiteLogo;
