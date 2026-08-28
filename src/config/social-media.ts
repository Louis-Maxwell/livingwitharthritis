/**
 * Centralized Social Media Configuration
 * Single source of truth for all social platform links and metadata
 */

export type SocialPlatform =
  | 'twitter'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'youtube'
  | 'tiktok'
  | 'pinterest'
  | 'reddit'
  | 'email';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
  displayName: string;
  icon: string; // lucide-react icon name
  color: string; // Tailwind color class
  description: string;
  enabled: boolean;
}

/**
 * All social media profiles for Living With Arthritis
 * These should match actual, verified accounts
 */
export const SOCIAL_LINKS: Record<SocialPlatform, SocialLink> = {
  twitter: {
    platform: 'twitter',
    url: 'https://x.com/ArthritisOrg',
    enabled: false, // not our account — removed pending ownership verification
    label: 'X / Twitter',
    displayName: 'X (Twitter)',
    icon: 'Twitter',
    color: 'hover:text-blue-400',
    description: 'Follow us on X for daily arthritis tips and updates',
    enabled: true,
  },
  facebook: {
    platform: 'facebook',
    url: 'https://www.facebook.com/livingwitharthritisuk',
    label: 'Facebook',
    displayName: 'Facebook',
    icon: 'Facebook',
    color: 'hover:text-blue-600',
    description: 'Connect with us on Facebook',
    enabled: true,
  },
  instagram: {
    platform: 'instagram',
    url: 'https://www.instagram.com/livingwitharthritisuk',
    label: 'Instagram',
    displayName: 'Instagram',
    icon: 'Instagram',
    color: 'hover:text-pink-500',
    description: 'Follow us on Instagram for exercise videos and wellness tips',
    enabled: true,
  },
  linkedin: {
    platform: 'linkedin',
    url: 'https://www.linkedin.com/company/112596569/',
    label: 'LinkedIn',
    displayName: 'LinkedIn',
    icon: 'Linkedin',
    color: 'hover:text-blue-700',
    description: 'Follow us on LinkedIn for professional updates',
    enabled: true,
  },
  youtube: {
    platform: 'youtube',
    url: 'https://www.youtube.com/@livingwitharthritisuk',
    label: 'YouTube',
    displayName: 'YouTube',
    icon: 'Youtube',
    color: 'hover:text-red-600',
    description: 'Subscribe to our YouTube channel for exercise videos and tutorials',
    enabled: true,
  },
  tiktok: {
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@livingwitharthritisuk',
    label: 'TikTok',
    displayName: 'TikTok',
    icon: 'Music',
    color: 'hover:text-black dark:hover:text-white',
    description: 'Follow us on TikTok for quick arthritis tips',
    enabled: true,
  },
  pinterest: {
    platform: 'pinterest',
    url: 'https://www.pinterest.co.uk/livingwitharthritis',
    label: 'Pinterest',
    displayName: 'Pinterest',
    icon: 'Github', // Using as Pinterest icon placeholder
    color: 'hover:text-red-600',
    description: 'Save our arthritis tips and recipes on Pinterest',
    enabled: true,
  },
  reddit: {
    platform: 'reddit',
    url: 'https://www.reddit.com/r/arthritis',
    label: 'Reddit',
    displayName: 'Reddit',
    icon: 'MessageCircle',
    color: 'hover:text-orange-600',
    description: 'Join our Reddit community discussions',
    enabled: false, // Set to true when we have official subreddit
  },
  email: {
    platform: 'email',
    url: 'mailto:info@livingwitharthritis.org.uk',
    label: 'Email',
    displayName: 'Email',
    icon: 'Mail',
    color: 'hover:text-primary',
    description: 'Contact us via email',
    enabled: true,
  },
};

/**
 * Get all enabled social links
 */
export const getEnabledSocialLinks = (): SocialLink[] => {
  return Object.values(SOCIAL_LINKS).filter(link => link.enabled);
};

/**
 * Get social links for a specific context
 */
export const getSocialLinksForContext = (context: 'footer' | 'header' | 'social-buttons' | 'schema'): SocialLink[] => {
  const enabled = getEnabledSocialLinks();

  switch (context) {
    case 'footer':
      // Footer shows all social links
      return enabled;
    case 'header':
      // Header shows only main platforms
      return enabled.filter(link => ['twitter', 'facebook', 'instagram'].includes(link.platform));
    case 'social-buttons':
      // Social buttons show all except email
      return enabled.filter(link => link.platform !== 'email');
    case 'schema':
      // Schema.org sameAs includes social profiles
      return enabled.filter(link => link.platform !== 'email');
    default:
      return enabled;
  }
};

/**
 * Generate Schema.org sameAs URLs
 */
export const getSchemaOrgSameAs = (): string[] => {
  return getSocialLinksForContext('schema')
    .map(link => link.url)
    .filter(Boolean);
};

/**
 * Track social media clicks (analytics)
 */
export const trackSocialMediaClick = (platform: SocialPlatform, source: string = 'unknown'): void => {
  if (typeof window === 'undefined') return;

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'social_media_click', {
        platform,
        source,
        event_category: 'engagement',
        event_label: `social_${platform}`,
      });
    }
  } catch (e) {
    // Silently fail if analytics not available
  }
};

/**
 * Validate social media URLs
 */
export const validateSocialUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const validDomains = [
      'twitter.com',
      'x.com',
      'facebook.com',
      'instagram.com',
      'linkedin.com',
      'youtube.com',
      'tiktok.com',
      'pinterest.com',
      'pinterest.co.uk',
      'reddit.com',
    ];
    return validDomains.some(domain => urlObj.hostname.includes(domain)) || url.startsWith('mailto:');
  } catch {
    return false;
  }
};

/**
 * Get social link by platform
 */
export const getSocialLink = (platform: SocialPlatform): SocialLink | null => {
  return SOCIAL_LINKS[platform] || null;
};

/**
 * Check if platform is enabled
 */
export const isSocialPlatformEnabled = (platform: SocialPlatform): boolean => {
  return SOCIAL_LINKS[platform]?.enabled ?? false;
};
