import { ShieldCheck, ExternalLink, MapPin } from 'lucide-react';
import { CHARITY } from '@/config/charity';
import { cn } from '@/lib/utils';

interface CharityRegBadgeProps {
  variant?: 'inline' | 'card';
  className?: string;
}

/**
 * Verified UK charity registration badge. Two variants:
 *  - inline: small pill suitable for footers, sidebars, headers
 *  - card  : boxed details (legal name + reg no. + regulator + address)
 */
const CharityRegBadge = ({ variant = 'inline', className }: CharityRegBadgeProps) => {
  if (variant === 'card') {
    return (
      <aside
        className={cn(
          'rounded-2xl border border-border/40 bg-card p-6 md:p-7',
          className,
        )}
        aria-label="UK charity registration details"
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-1">
              Verified UK Charity
            </p>
            <p className="text-base font-bold text-foreground">
              {CHARITY.legalName}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Registered Charity No.{' '}
              <a
                href={CHARITY.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline-offset-2 hover:underline hover:text-primary transition-colors"
              >
                {CHARITY.number}
              </a>{' '}
              · {CHARITY.type}
            </p>
            <p className="text-xs text-muted-foreground mt-1.5">
              Regulated by the {CHARITY.regulator}
            </p>
            <address className="not-italic text-xs text-muted-foreground mt-3 flex items-start gap-1.5 leading-relaxed">
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>
                {CHARITY.address.name}, {CHARITY.address.street}, {CHARITY.address.locality}{' '}
                {CHARITY.address.postalCode}, {CHARITY.address.region}
              </span>
            </address>
            <a
              href={CHARITY.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-primary hover:underline"
            >
              View entry on Charity Commission register
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <a
      href={CHARITY.registerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/5 text-[12px] font-semibold text-foreground hover:bg-primary/10 hover:border-primary/40 transition-colors',
        className,
      )}
      aria-label={`Registered Charity in England and Wales number ${CHARITY.number} — view on Charity Commission register`}
    >
      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
      <span>Registered Charity No. {CHARITY.number}</span>
      <ExternalLink className="w-3 h-3 text-muted-foreground" />
    </a>
  );
};

export default CharityRegBadge;
