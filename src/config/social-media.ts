import { trackEvent } from "@/lib/analytics";

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
  | 'threads'
  | 'tiktok'
  | 'bluesky'
  | 'mastodon'
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

/** Charity Facebook Page (numeric id - vanity URL is not owned).
 * Verified 15 Nov 2026 on the charity's own Meta Business Suite:
 * asset_id 862105853655104 = "Living With Arthritis" page (6K followers, linked Instagram). */
export const FACEBOOK_PAGE_ID = '862105853655104';
export const FACEBOOK_PAGE_URL = `https://www.facebook.com/profile.php?id=${FACEBOOK_PAGE_ID}`;

/**
 * All social media profiles for Living With Arthritis
 * These should match actual, verified accounts
 */
export const SOCIAL_LINKS: Record<SocialPlatform, SocialLink> = {
  // Only profiles confirmed as owned by the charity are enabled.
  // HTTP 200 responses from social platforms are login-wall responses and
  // do not prove ownership — enable others only after verifying the account.
  twitter: {
    platform: 'twitter',
    url: 'https://x.com/ArthritisOrgHQ',
    label: 'X',
    displayName: 'X',
    icon: 'Twitter',
    color: 'hover:text-blue-400',
    description: 'Follow us on X for daily arthritis tips and updates',
    enabled: true, // charity-owned X account (@ArthritisOrgHQ) - the authorised posting target
  },
  facebook: {
    platform: 'facebook',
    url: FACEBOOK_PAGE_URL,
    label: 'Facebook',
    displayName: 'Facebook',
    icon: 'Facebook',
    color: 'hover:text-blue-600',
    description: 'Connect with us on Facebook',
    enabled: true,
  },
  instagram: {
    platform: 'instagram',
    url: 'https://www.instagram.com/livingwitharthritisorg/',
    label: 'Instagram',
    displayName: 'Instagram',
    icon: 'Instagram',
    color: 'hover:text-pink-500',
    description: 'Follow us on Instagram for exercise videos and wellness tips',
    enabled: true, // confirmed charity-owned profile
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
    url: 'https://www.youtube.com/@livingwitharthritisorg',
    label: 'YouTube',
    displayName: 'YouTube',
    icon: 'Youtube',
    color: 'hover:text-red-600',
    description: 'Subscribe to our YouTube channel for exercise videos and tutorials',
    enabled: true, // confirmed charity-owned profile
  },
  threads: {
    platform: 'threads',
    url: 'https://www.threads.com/@livingwitharthritisuk',
    label: 'Threads',
    displayName: 'Threads',
    icon: 'AtSign',
    color: 'hover:text-black dark:hover:text-white',
    description: 'Follow Living With Arthritis on Threads',
    enabled: true, // Public charity profile and website backlink checked 18 November 2026
  },
  tiktok: {
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@arthritis.org.uk',
    label: 'TikTok',
    displayName: 'TikTok',
    icon: 'Music2',
    color: 'hover:text-primary',
    description: 'Follow Living With Arthritis on TikTok',
    enabled: true,
  },
  bluesky: {
    platform: 'bluesky',
    url: 'https://bsky.app/profile/lwarthritis.bsky.social',
    label: 'Bluesky',
    displayName: 'Bluesky',
    icon: 'Cloud',
    color: 'hover:text-primary',
    description: 'Follow Living With Arthritis on Bluesky',
    enabled: true,
  },
  mastodon: {
    platform: 'mastodon',
    url: 'https://mastodon.social/@livingwitharthritis',
    label: 'Mastodon',
    displayName: 'Mastodon',
    icon: 'AtSign',
    color: 'hover:text-primary',
    description: 'Follow Living With Arthritis on Mastodon',
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
    enabled: false, // ownership not verified
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
      return enabled.filter(link => ['facebook', 'instagram', 'linkedin'].includes(link.platform));
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
  const link = SOCIAL_LINKS[platform];
  trackEvent("social_media_click", {
    platform: platform === "twitter" ? "x" : platform,
    link_location: source === "footer" ? "footer_connect" : source === "header" ? "site_header" : "other",
    target_url: platform === "email" ? undefined : link?.url,
    interaction_type: "intent",
  });
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
      'threads.com',
      'threads.net',
      'tiktok.com',
      'bsky.app',
      'mastodon.social',
      'pinterest.com',
      'pinterest.co.uk',
      'reddit.com',
    ];
    return (urlObj.protocol === 'https:' && validDomains.some(domain =>
      urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    )) || urlObj.protocol === 'mailto:';
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
