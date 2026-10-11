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
 * Brand logo: "LIVING WITH ARTHRITIS" wordmark only (figure removed).
 */
const SiteLogo = ({
  variant = 'full',
  className,
  textClassName,
}: SiteLogoProps) => {
  if (variant === 'mark') {
    return null;
  }

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>

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
