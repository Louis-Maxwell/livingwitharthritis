/**
 * Charity social profiles. Icons open the real Living With Arthritis pages.
 */

import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Music,
  Mail,
  Github,
  MessageCircle,
  LucideProps,
} from 'lucide-react';
import { getSocialLinksForContext, trackSocialMediaClick } from '@/config/social-media';
import type { SocialPlatform } from '@/config/social-media';

interface SocialLinksProps {
  context?: 'footer' | 'header' | 'social-buttons' | 'schema';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
  linkClassName?: string;
  orientation?: 'horizontal' | 'vertical';
}

const iconMap: Record<SocialPlatform, React.ComponentType<LucideProps>> = {
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Music,
  pinterest: Github,
  reddit: MessageCircle,
  email: Mail,
};

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const SocialLinks: React.FC<SocialLinksProps> = ({
  context = 'footer',
  size = 'md',
  showLabels = false,
  className = '',
  linkClassName,
  orientation = 'horizontal',
}) => {
  const socialLinks = getSocialLinksForContext(context);

  if (socialLinks.length === 0) {
    return null;
  }

  const containerClass =
    orientation === 'horizontal' ? 'flex flex-wrap items-center gap-2.5' : 'flex flex-col gap-3';

  const defaultLink = showLabels
    ? 'text-foreground/70 hover:text-primary transition-colors duration-200'
    : 'inline-flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-full border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all';

  return (
    <div className={`${containerClass} ${className}`} role="list" aria-label="Living With Arthritis social pages">
      {socialLinks.map(link => {
        const Icon = iconMap[link.platform];
        if (!Icon) return null;
        const isMail = link.url.startsWith('mailto:');

        return (
          <a
            key={link.platform}
            href={link.url}
            {...(isMail
              ? {}
              : { target: '_blank', rel: 'noopener noreferrer' })}
            className={`${linkClassName || defaultLink} ${link.color} group`}
            aria-label={`Visit ${link.displayName}`}
            title={link.description}
            onClick={() => trackSocialMediaClick(link.platform, context)}
            role="listitem"
          >
            <span className="sr-only">{link.displayName}</span>
            <Icon className={`${sizeMap[size]} group-hover:scale-110 transition-transform`} />
            {showLabels && (
              <span className="ml-2 text-sm font-medium">{link.displayName}</span>
            )}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
