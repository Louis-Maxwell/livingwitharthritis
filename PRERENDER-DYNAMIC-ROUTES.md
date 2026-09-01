# Prerender Dynamic Routes: /library/:slug & /arthritis-support/:city

## Goal

Return HTTP 200 with unique title, description, and schema for dynamic routes instead of 404 fallback pages.

## Current State

✅ **Works:**
- Blog posts prerender from blog-slugs.generated.json
- Static routes prerender from curated list

❌ **Missing:**
- /library/:slug pages (returns 200 with wrong title)
- /arthritis-support/:city pages (returns 200 with homepage title)

## Solution

### 1. Add Routes to Prerender List

**File:** `scripts/prerender-routes.mjs` (section 1: CURATED array)

Add after line 128:

```javascript
// Library Topic Routes
"/library",
"/library/osteoarthritis",
"/library/rheumatoid-arthritis",
"/library/exercise",
// ... all library topics

// Arthritis Support Routes
"/arthritis-support",
"/arthritis-support/london",
"/arthritis-support/manchester",
"/arthritis-support/birmingham",
// ... all major UK cities
```

**Better approach:** Auto-generate from data in `scripts/generate-sitemap.ts`

### 2. Verify Unique SEO Tags

**LibraryTopic.tsx:** ✅ Already has unique title, description, schema
**CityArthritisPage.tsx:** Verify unique title with city name + schema

### 3. Add Social Profiles to Connect Page

**File:** `src/pages/Connect.tsx`

Add social profile links:
- Facebook: your-url
- Twitter/X: your-url
- Threads: your-url

Add new component `src/components/SocialIcon.tsx` for icons.

### 4. Set Server Rewrites

**Vercel (vercel.json):**
```json
{
  "rewrites": [
    {"source": "/library/:slug", "destination": "/index.html"},
    {"source": "/arthritis-support/:city", "destination": "/index.html"}
  ]
}
```

**Netlify (netlify.toml):**
```toml
[[redirects]]
from = "/library/*"
to = "/index.html"
status = 200

[[redirects]]
from = "/arthritis-support/*"
to = "/index.html"
status = 200
```

## Testing

1. Run prebuild script
2. Check dist/library/ and dist/arthritis-support/ exist
3. Test HTTP status with curl
4. Verify in Schema Validator tool
5. Check Google Search Console for proper titles

## Expected Impact

- +50-100 new ranking keywords (city variants)
- +20-30 featured snippets
- +10-15% local search visibility
- Proper 404 appearance for truly invalid routes

## Timeline

~2-3 hours total for full implementation
