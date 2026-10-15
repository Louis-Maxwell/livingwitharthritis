import { cn } from '@/lib/utils';
interface SiteLogoProps { variant?: 'full' | 'mark'; className?: string; markClassName?: string; textClassName?: string; }
export default function SiteLogo({variant = 'full', className, textClassName}: SiteLogoProps) {
  return <span className={cn('inline-flex items-center font-sans font-extrabold uppercase leading-none text-primary', variant === 'mark' ? 'text-sm' : 'text-xl sm:text-2xl md:text-[1.75rem]', textClassName, className)}>{variant === 'mark' ? 'LWA' : 'Living With Arthritis'}</span>;
}
