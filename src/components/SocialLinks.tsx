/**
 * Reusable Social Media Links Component
 * Displays social media icons with proper accessibility and analytics
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

/**
 * Icon map for social platforms
 */
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

/**
 * Size map for icons
 */
const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

/**
 * SocialLinks Component
 */
const SocialLinks: React.FC<SocialLinksProps> = ({
  context = 'footer',
  size = 'md',
  showLabels = false,
  className = '',
  linkClassName = 'text-foreground/70 transition-colors duration-200',
  orientation = 'horizontal',
}) => {
  const socialLinks = getSocialLinksForContext(context);

  if (socialLinks.length === 0) {
    return null;
  }

  const handleSocialClick = (platform: SocialPlatform, url: string) => {
    trackSocialMediaClick(platform, context);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const containerClass =
    orientation === 'horizontal' ? 'flex items-center gap-4' : 'flex flex-col gap-3';

  return (
    <div className={`${containerClass} ${className}`} role="list" aria-label="Social media links">
      {socialLinks.map(link => {
        const Icon = iconMap[link.platform];
        if (!Icon) return null;

        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClassName} ${link.color} group`}
            aria-label={`Visit ${link.displayName}`}
            title={link.description}
            onClick={e => {
              e.preventDefault();
              handleSocialClick(link.platform, link.url);
            }}
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
