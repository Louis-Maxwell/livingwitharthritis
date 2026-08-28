# Social Media Integration Guide

## Overview

Living With Arthritis now has a centralized, scalable social media system that ensures all social media links are properly tracked, validated, and integrated across the website.

## Architecture

### 1. **Centralized Configuration** (`config/social-media.ts`)

Single source of truth for all social media profiles with:
- URL validation
- Analytics tracking
- Schema.org integration
- Accessibility features
- Display metadata

```typescript
import { SOCIAL_LINKS, getEnabledSocialLinks, trackSocialMediaClick } from '@/config/social-media';

// Get all enabled social links
const links = getEnabledSocialLinks();

// Track clicks for analytics
trackSocialMediaClick('twitter', 'footer');
```

### 2. **Reusable Components**

#### SocialLinks Component (Universal)
```typescript
import SocialLinks from '@/components/SocialLinks';

// Footer with labels
<SocialLinks 
  context="footer" 
  showLabels={true} 
  orientation="vertical" 
/>

// Header compact
<SocialLinks 
  context="header" 
  size="sm" 
  orientation="horizontal" 
/>

// Social buttons
<SocialLinks 
  context="social-buttons" 
  size="lg" 
/>
```

**Props:**
- `context`: 'footer' | 'header' | 'social-buttons' | 'schema' (default: 'footer')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `showLabels`: boolean (default: false)
- `className`: string for container
- `linkClassName`: string for links
- `orientation`: 'horizontal' | 'vertical' (default: 'horizontal')

#### HeaderSocial Component
```typescript
import HeaderSocial from '@/components/HeaderSocial';

// Use in navigation/header
<HeaderSocial />
```

## Configured Social Platforms

| Platform | URL | Status | Tracking |
|----------|-----|--------|----------|
| X/Twitter | — | ❌ Disabled (wrong organisation) | — |
| Facebook | https://www.facebook.com/livingwitharthritisuk | ✅ Enabled | ✅ Yes |
| Instagram | https://www.instagram.com/livingwitharthritisuk | ✅ Enabled | ✅ Yes |
| LinkedIn | https://www.linkedin.com/company/112596569/ | ✅ Enabled | ✅ Yes |
| YouTube | https://www.youtube.com/@livingwitharthritisuk | ✅ Enabled | ✅ Yes |
| TikTok | https://www.tiktok.com/@livingwitharthritisuk | ✅ Enabled | ✅ Yes |
| Pinterest | https://www.pinterest.co.uk/livingwitharthritis | ✅ Enabled | ✅ Yes |
| Reddit | https://www.reddit.com/r/arthritis | ❌ Disabled | ✅ Yes |
| Email | mailto:info@livingwitharthritis.org.uk | ✅ Enabled | ✅ Yes |

## Features

### ✅ Analytics Tracking

All social media clicks are tracked in GA4:

```javascript
// Automatically tracked event
window.gtag('event', 'social_media_click', {
  platform: 'twitter',
  source: 'footer',
  event_category: 'engagement'
})
```

**In GA4:**
- Go to Reports → Events
- Search for `social_media_click`
- Filter by `platform` parameter for individual social networks

### ✅ Accessibility Features

- Proper ARIA labels: `aria-label="Visit X (Twitter)"`
- Screen reader text: `<span class="sr-only">X (Twitter)</span>`
- Keyboard navigation: Tab through all links
- Title attributes: Hover tooltips with platform description
- Semantic HTML: `role="list"` and `role="listitem"`

### ✅ Schema.org Integration

Social links automatically added to Organization schema:

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "sameAs": [
    "https://x.com/ArthritisOrg",
    "https://www.facebook.com/livingwitharthritisuk",
    // ... all enabled social profiles
  ]
}
```

**Benefits:**
- Strengthens entity recognition for search engines
- Helps LLMs identify official accounts
- Improves Knowledge Graph integration
- Supports social sharing validation

### ✅ Link Validation

All URLs are validated:

```typescript
import { validateSocialUrl } from '@/config/social-media';

const isValid = validateSocialUrl('https://x.com/ArthritisOrg'); // true
```

## Adding New Social Platforms

### Step 1: Update Configuration

Edit `config/social-media.ts`:

```typescript
export const SOCIAL_LINKS: Record<SocialPlatform, SocialLink> = {
  // ... existing platforms
  
  new_platform: {
    platform: 'new_platform',
    url: 'https://new-platform.com/livingwitharthritis',
    label: 'New Platform',
    displayName: 'New Platform',
    icon: 'IconName', // From lucide-react
    color: 'hover:text-color-code',
    description: 'Follow us on New Platform',
    enabled: true,
  },
};
```

### Step 2: Add Icon

Import icon from `lucide-react` and add to `iconMap`:

```typescript
import { NewIcon } from 'lucide-react';

const iconMap: Record<SocialPlatform, React.ComponentType<LucideProps>> = {
  // ... existing
  new_platform: NewIcon,
};
```

### Step 3: Update Type

Add platform to `SocialPlatform` type:

```typescript
export type SocialPlatform = 
  | 'twitter' 
  | 'facebook' 
  | 'instagram' 
  | 'linkedin' 
  | 'youtube' 
  | 'tiktok' 
  | 'pinterest' 
  | 'reddit' 
  | 'email'
  | 'new_platform'; // Add here
```

## Monitoring & Analytics

### GA4 Event: `social_media_click`

**Event Parameters:**
- `platform` (string): Social platform name
- `source` (string): Where click came from (footer, header, etc.)
- `event_category`: Always 'engagement'
- `event_label`: Format `social_{platform}`

**Sample GA4 Query:**
```
Event = social_media_click
Platform = (X, Facebook, Instagram, LinkedIn, etc.)
Source = (footer, header, social-buttons)
```

### Dashboard Analysis

1. **Social Traffic Source**
   - GA4 → Acquisition → Traffic source
   - Filter for visits from social platforms

2. **Social Engagement**
   - GA4 → Engagement → Events
   - Search: `social_media_click`
   - Group by platform/source

3. **Social Link Performance**
   - Compare click rates across platforms
   - Identify most popular social networks
   - Track seasonal trends

## SEO Benefits

### Entity Recognition

Schema.org `sameAs` properties help:
- **Search Engines**: Identify official social accounts
- **Knowledge Graphs**: Link to organization profile
- **Social Networks**: Verify ownership (mutual linking)
- **LLMs**: Recognize official sources

### Social Proof

- Displays active, verified social presence
- Signals legitimacy and engagement
- Improves brand perception
- Supports social sharing signals

## Implementation Checklist

When deploying new social platforms:

- [ ] Add configuration to `config/social-media.ts`
- [ ] Import icon from `lucide-react`
- [ ] Add to `iconMap`
- [ ] Update `SocialPlatform` type
- [ ] Validate URLs with `validateSocialUrl()`
- [ ] Test in Footer component
- [ ] Test in HeaderSocial component
- [ ] Verify GA4 tracking
- [ ] Check Schema.org integration
- [ ] Test accessibility (keyboard, screen reader)
- [ ] Verify links open in new tab
- [ ] Test on mobile

## Troubleshooting

### Social links not appearing
1. Check if platform is enabled in config
2. Verify `context` prop matches usage
3. Check browser console for errors

### Analytics not tracking
1. Verify GA4 is loaded (consent status)
2. Check `gtag` is available in window
3. Confirm `trackSocialMediaClick` is being called
4. Check GA4 dashboard for events

### Icons not showing
1. Verify icon imported from `lucide-react`
2. Check `iconMap` includes the platform
3. Confirm `size` prop is valid

### Links not opening
1. Verify URL is properly formatted
2. Check `validateSocialUrl()` returns true
3. Ensure `target="_blank"` and `rel="noopener noreferrer"`
4. Test with different browsers

## Performance Considerations

- **Lazy Loading**: SocialLinks components are lightweight (~2KB)
- **No External Dependencies**: Uses only lucide-react icons (already in bundle)
- **Analytics**: Debounced to prevent tracking overload
- **Accessibility**: No performance penalty for a11y features

## Files Modified/Created

- ✅ `config/social-media.ts` - Centralized configuration
- ✅ `components/SocialLinks.tsx` - Universal social links component
- ✅ `components/HeaderSocial.tsx` - Header-specific component
- ✅ `components/Footer.tsx` - Updated to use new system
- ✅ `components/seo/RootOrganizationSchema.tsx` - Updated with centralized config

## Related Documentation

- [Analytics Setup](../lib/ANALYTICS_SETUP.md)
- [Footer Component](../components/Footer.tsx)
- [lucide-react Icons](https://lucide.dev/)
- [Schema.org Organization](https://schema.org/Organization)

## Support

For questions or issues:
- Check GA4 dashboard for event tracking
- Verify links in Search Console
- Test accessibility with screen readers
- Review console for validation errors
