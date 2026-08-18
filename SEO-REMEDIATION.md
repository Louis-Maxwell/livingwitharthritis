# Living With Arthritis — SEO Remediation Plan
**Date:** 2026-08-18  
**Status:** Phase 1 (Code Changes) In Progress  
**Phase 2 (Hosting) Required**

---

## Executive Summary

The site has a critical HTTP status code issue: unmatched URLs return HTTP 200 with the SPA shell instead of proper 301 redirects or 404 status codes. This causes Google to index duplicate content pages (up to 1,375 combined impressions across just the knee exercise cluster alone) and prevents SEO signal consolidation.

**Impact:** ~1,375 impressions split across 3 knee-exercise URLs instead of consolidated to one canonical.

---

## Problem Statement

### Current Architecture
- **SPA with Prerendering:** Vite + React Router SPA with Puppeteer prerendering
- **Fallback Behavior:** Any unmatched URL falls through to `index.html` and returns HTTP 200
- **Redirect System:** React Router has client-side redirects configured in `BLOG_SLUG_REDIRECTS`
- **SEO Problem:** Crawlers see HTTP 200 + homepage shell before JavaScript redirects execute

### Example: Knee Exercise Consolidation
Three URLs compete for the same search intent:
| URL | Impressions | Position | Status | HTTP Code |
|-----|-------------|----------|--------|-----------|
| `/blog/knee-arthritis-exercises-uk` | 934 | 42.5 | ❌ Doesn't exist | 200 (SPA shell) |
| `/blog/knee-osteoarthritis-exercises` | 241 | 35.8 | ✅ Hardcoded component | 200 (correct) |
| `/blog/knee-exercises-arthritis` | 200 | 24.0 | ❌ Doesn't exist | 200 (SPA shell) |
| **TOTAL** | **1,375** | - | Split signal | - |

**Desired State:** All three URLs return **HTTP 301** redirects to `/blog/knee-osteoarthritis-exercises`.

---

## Phase 1: Code Changes (Completed/In Progress)

### ✅ Already Done
1. **Knee Exercise Page Optimization** (`src/pages/blog/KneeOsteoarthritisExercises.tsx`)
   - Improved H1: "Knee Arthritis Exercises: Safe, Effective Routines..."
   - Better title & meta description for CTR
   - Enhanced schema (MedicalWebPage, MedicalAudience, medicalReviewProcess)
   - Better breadcrumbs (Home → Conditions → Knee Arthritis → Exercises)
   - Medical reviewer moved higher in page hierarchy
   - Expanded answer box with more specificity

2. **Redirect System Verified** (`src/data/blogRedirects.ts`)
   - React-level redirects already configured:
     - `knee-arthritis-exercises-uk` → `knee-osteoarthritis-exercises`
     - `knee-exercises-arthritis` → `knee-osteoarthritis-exercises`
   - **⚠️ Issue:** These are client-side only; Google sees HTTP 200 before redirect

### 📝 To Do (Code)
1. Verify all 24 Priority URLs from Search Console are properly handled
2. Ensure BlogPost component returns proper 404 semantics
3. Add audit script to detect SPA shell fallbacks

---

## Phase 2: Hosting Configuration (REQUIRED - DevOps Task)

### Critical: Vercel Configuration

Create or update `vercel.json` with proper redirect rules:

```json
{
  "redirects": [
    {
      "source": "/blog/knee-arthritis-exercises-uk",
      "destination": "/blog/knee-osteoarthritis-exercises",
      "permanent": true
    },
    {
      "source": "/blog/knee-exercises-arthritis",
      "destination": "/blog/knee-osteoarthritis-exercises",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/api/healthy",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=60"
        }
      ]
    }
  ]
}
```

### Critical: 404 Status Codes

All unmatched URLs must return HTTP 404, not HTTP 200. Options:

**Option A: Vercel Edge Middleware (Recommended)**
Create `middleware.ts` at project root:
```typescript
import { NextRequest, NextResponse } from 'next/server';

// List of valid routes from prerender-routes.mjs
const VALID_ROUTES = [ /* ... */ ];

export function middleware(req: NextRequest) {
  const path = new URL(req.url).pathname;
  
  // If path is not in VALID_ROUTES and not a static asset, return 404
  if (!isValidRoute(path) && !isStaticAsset(path)) {
    return NextResponse.rewrite(new URL('/404', req.url), { status: 404 });
  }
}
```

**Option B: Supabase Edge Function**
Deploy edge function to intercept 404 responses and set proper status code.

**Option C: Nginx Configuration** (If using self-hosted Nginx)
```nginx
error_page 404 /404.html;
location / {
  try_files $uri $uri/ =404;
}
```

### Implementation Checklist
- [ ] Create `vercel.json` with redirects
- [ ] Add redirect for all URLs in `BLOG_SLUG_REDIRECTS`
- [ ] Test redirects with `curl -I https://livingwitharthritis.org.uk/blog/knee-arthritis-exercises-uk`
- [ ] Verify HTTP 301 status code (not 307 or 308)
- [ ] Deploy to staging and test
- [ ] Submit to Search Console > URL Inspection for re-crawl
- [ ] Monitor Search Console for redirect chains (should be zero)

---

## Other Slug Mismatches Identified

Some Search Console URLs don't match database slugs:

| Search Console URL | Database Slug | Issue |
|--------------------|---------------|-------|
| `/blog/hand-osteoarthritis-keeping-hands-functional` | `hand-exercises-for-arthritis` | Different slug |
| `/blog/ginger-root-natural-anti-inflammatory` | ✓ Match found | OK |
| `/blog/anti-inflammatory-diet` | ✓ Match found | OK |

**Action:** Audit all Search Console URLs against `blog-slugs.generated.json` and add redirects for mismatches.

---

## Canonical URL Strategy

### Current Implementation
- `src/components/SeoHead.tsx` generates self-referencing canonicals correctly
- `react-helmet-async` handles Helmet updates on client-side
- Prerendering injects canonicals into static HTML

### Potential Issue
- If prerendering fails for a URL, the fallback `index.html` has a canonical pointing to `/`
- This can cause Google to index the homepage content under wrong URLs

**Fix:** Ensure fallback HTML has `<link rel="canonical" href="404.html">` or similar to prevent indexing.

---

## Testing & Validation

### Pre-Deployment
```bash
# Test redirects locally
curl -I http://localhost:8080/blog/knee-arthritis-exercises-uk
# Should show 200 (SPA shell) in dev; will be 301 in prod after vercel.json deployed

# Test 404 handling
curl -I http://localhost:8080/blog/nonexistent-article-slug
# Should show 404 with proper semantics
```

### Post-Deployment
1. **Google Search Console URL Inspection**
   - Navigate to `/blog/knee-arthritis-exercises-uk`
   - Verify "Crawled as" shows the redirect target
   - Submit for re-crawl
   
2. **Link Equity Check**
   - Verify 301 redirects preserve PageRank
   - Monitor 90 days for ranking consolidation

3. **Site Audit**
   - Run `npm run seo:audit` to detect title duplicates
   - Check for broken internal links to redirect URLs
   - Verify no redirect chains (A→B→C should be A→C)

---

## Future Consolidations (Template for Phase 2+)

When adding new redirects, follow this pattern:

1. **Identify cannibalizing URLs** in Search Console
2. **Choose canonical** (prefer highest position or best authority)
3. **Add to `BLOG_SLUG_REDIRECTS`** in code
4. **Add to `vercel.json`** for hosting-layer redirect
5. **Test** with curl and Search Console
6. **Document in commit message**

---

## Search Console Monitoring

### Before Consolidation
- 3 URLs showing in Performance report
- Each with separate impressions/clicks
- CTR varies per URL

### After Consolidation
- 1 URL showing in Performance report  
- Combined impressions/clicks from all three
- Unified CTR metric
- Possible ranking boost from signal consolidation

**Expected Timeline:** 2-4 weeks for Google to fully consolidate signals after 301 redirects are deployed.

---

## Related Issues & Future Work

### Database Slug Mismatches
- Some Search Console URLs don't have matching database articles
- Requires `blog_articles` table audit and possible migrations
- See Priority 1-24 in master prompt for full list

### SPA 404 Handling
- NotFound component sets `noindex` but only after JS executes
- Non-JS crawlers see HTTP 200 with homepage content
- Requires hosting-layer 404 status code fix (this document)

### Prerendering Coverage
- Some article URLs not in prerender list
- Causes SPA shell fallback for non-JS crawlers
- Document: `scripts/prerender-routes.mjs`

---

## Rollback Plan

If redirects cause issues:
1. Remove redirects from `vercel.json`
2. Deploy
3. Verify changes live (check curl responses)
4. Monitor Search Console for errors

---

## Contacts & Approvals

- **Technical SEO Owner:** Living With Arthritis Technical Team
- **Hosting/DevOps Owner:** Vercel Account Team
- **Content Owner:** Editorial Team
- **Medical Review Owner:** Clinical Review Board

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-18  
**Next Review:** After Phase 2 hosting deployment
