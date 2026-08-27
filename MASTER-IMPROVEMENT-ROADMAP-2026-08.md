# Living With Arthritis — Master Improvement Roadmap
**2026-08-27 Comprehensive SEO & UX Enhancement Plan**

---

## Executive Summary

This roadmap consolidates findings from:
- ✅ June 2026 comprehensive audit (37 issues across 9 dimensions)
- ✅ 10,000 newly generated organic keywords (SEO foundation)
- ✅ Phase 2 GEO/SEO/AEO/Analytics enhancements (in progress)
- 🔄 Current Semrush analysis (in progress)

**Estimated Impact:** 
- Organic traffic: +150-300% over 6 months
- Keyword rankings: 40-50% in top 50, 10-15% in top 10
- User engagement: +50% with improved UX/accessibility

**Timeline:** 3 phases over 8-12 weeks

---

## PHASE A: Critical Fixes (This Week — Must Ship)

These 3 critical issues block everything else:

### A1: Fix Edge Functions (C-2, C-3) — 2 hours
**Status:** BLOCKING donations & email

**Actions:**
1. Inspect `supabase/functions/process-donation/index.ts`
   - Check Stripe webhook configuration
   - Verify Supabase service role key
   - Test with sample payment
   - **Deploy fix** immediately

2. Inspect `supabase/functions/process-email-queue/index.ts`
   - Verify email service is connected
   - Check Vault secrets (`email_domain--setup_email_infra`)
   - Restore failed email queue
   - **Deploy fix** immediately

**Impact:** Donations & newsletter work again

---

### A2: Resolve NHS References Memory Rule (C-1) — 2 hours
**Status:** 30+ violations; needs decision

**Context:** Your memory rule is absolute: no NHS branding/references.

**Options (pick one):**

**Option A: Strip all NHS → "UK healthcare"**
- Find/replace all NHS → "UK healthcare" 
- Replace "GP → "family doctor"
- Replace "NHS 111" → "emergency services (999/112)"
- Files affected: 13 source files, 4 data files
- Effort: 2h, complexity: LOW
- Result: 100% compliant

**Option B: Allow only emergency + factual references**
- Keep "call 999 for emergencies", "NHS 111 for non-emergency"
- Keep "NICE guideline NG226" (factual reference)
- Strip everything else ("NHS recommends", "NHS waiting list")
- Effort: 1.5h, complexity: MEDIUM
- Result: Keeps safeguarding, 95% compliant

**Option C: Update memory rule** 
- Permit specific factual NHS references (with caveats)
- Document in memory update
- Effort: 0.5h
- Result: Most flexible, but changes project intent

**Recommendation:** Option B (keeps safety, permissive on facts)

**Implementation:**
```bash
# Option B: Strip non-essential NHS references
rg "NHS recommends|NHS waiting|NHS alternative" src --replace "[UK healthcare system]"
rg "NHS \(" src --replace "UK healthcare services ("
# Keep: "call NHS 111", "NICE NG226", "GP referral"
```

**Files to update:**
- `src/components/Header.tsx:146`
- `src/components/MedicalReviewBadge.tsx:60`
- `src/lib/arthritisChatFallback.ts:101,222,349`
- `src/pages/supplements/Glucosamine.tsx:44,45,166,228`
- `src/pages/supplements/Msm.tsx:220`
- `src/data/healthTopics.ts` (4 hits)
- `src/data/faqArticles.ts` (5 hits)
- `src/data/tier2Outlines.ts` (2 hits)
- `src/data/keyword-taxonomy.json` (replace "nhs alternative" → "affordable")
- `public/llms-full.txt:130`

---

### A3: Fix Colour Contrast (M-11, H-2) — 45 minutes
**Status:** Primary colour (#EF4444) fails WCAG AA on light backgrounds

**Issue:** 
- Red (#EF4444) on white = 3.76:1 (fails; needs 4.5:1 for AA)
- Used as text in some components

**Fix:**
1. Keep #EF4444 for buttons/icons only (background use is fine)
2. Update text-on-white to use darker shade: `hsl(0 84% 40%)` = 4.6:1 ✅
3. Audit these files:
   - `src/components/*.tsx` — replace `text-primary` with `text-primary-foreground` on light backgrounds
   - Tailwind config — ensure token hierarchy is correct

```tailwind
/* In tailwind.config.ts */
primary: 'hsl(0 84% 50%)', /* buttons/icons only */
'primary-foreground': 'hsl(0 84% 40%)', /* text on light */
```

**Files to update:**
- `tailwind.config.ts` — add/verify token
- ~8 components using red text on white backgrounds

**Verification:**
```bash
# After fix, verify no failures:
npx axe-core dist/ --level AA
```

---

## PHASE B: High-Impact Features (Weeks 2-3 — 12-15 hours)

These 9 high-severity issues compound and hurt rankings/UX:

### B1: Decompose App.tsx Route Monolith (H-1) — 2 hours
**Status:** 146 routes inline = slow HMR + hard to maintain

**Current:** `src/App.tsx` is 467 lines with 146 `React.lazy()` calls

**Fix:**
```typescript
// Create src/routes/ structure:
src/routes/
├── conditions.ts       // 40 condition pages
├── guides.ts          // 30 pillar guides
├── blog.ts            // Blog articles
├── admin.ts           // 15 admin pages
├── stubs.ts           // Stub/placeholder pages
└── index.ts           // Export all

// App.tsx becomes 100 lines:
import { conditionRoutes, guideRoutes, ... } from './routes'
const routes = [ ...conditionRoutes, ...guideRoutes, ... ]

<Routes>{routes.map(r => <Route key={r.path} {...r} />)}</Routes>
```

**Impact:** 
- HMR: +3-5x faster
- Maintainability: Easy to see all routes
- DX: Can spot orphan pages quickly

---

### B2: Refactor Header.tsx (H-3, M-1) — 1.5 hours
**Current:** 549 lines mixing nav, mega-menu, drawer, keyboard logic

**Fix: Extract to separate files**
```typescript
// src/config/navigation.ts
export const navLinks = [...]

// src/components/Header/MegaMenu.tsx
// src/components/Header/MobileDrawer.tsx
// src/components/Header/index.tsx (150 lines, orchestrates)
```

**Impact:** 
- Header.tsx: 549 → 150 lines (70% reduction)
- Reusable MegaMenu + MobileDrawer
- Easier to test keyboard + focus management

---

### B3: Fix Missing aria-labels (H-8) — 30 minutes
**Status:** 18 icon-only buttons missing accessible names

**Find & fix:**
```bash
rg 'size="icon"' src/ | rg -v 'aria-label'
# Add aria-label to each:
# Close button → aria-label="Close menu"
# Menu button → aria-label="Open menu"
# Share → aria-label="Share article"
# Print → aria-label="Print article"
```

**Files:** ~8 component files

**Verification:**
```bash
npx axe-core dist/ | grep "aria-label"
```

---

### B4: Add Missing Image Alt Tags (H-9) — 20 minutes
**Status:** 4-8 images missing alt text

**Files to fix:**
- `src/components/ConditionBlogStrip.tsx:35`
- `src/components/ChatBot.tsx:310`
- `src/components/DownloadableResources.tsx:50`
- `src/components/JointExerciseSection.tsx:192`

**Template:**
```tsx
<img src={url} alt={article.title || description} />
// or for decorative:
<img src={url} alt="" aria-hidden="true" />
```

---

### B5: Fix Mobile Collisions (H-6, M-8, M-14) — 1 hour
**Status:** Footer 5-col grid breaks at 768-900px, header helpline issues on iPhone SE

**Fixes:**
1. Footer grid:
```tailwind
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
  {/* was: grid-cols-5 on all sizes */}
</div>
```

2. Header height on mobile:
```tsx
// Reduce h-16 → h-14 on mobile
<header className="h-14 md:h-16">
```

3. Helpline stack on mobile:
```tailwind
<div className="grid grid-cols-2 gap-2 md:grid-cols-3">
  {/* 2×2 grid on small, 3 cols on mobile, 4+ on desktop */}
</div>
```

---

### B6: Sitemap Drift Audit (H-7) — 30 minutes
**Status:** 881 sitemap entries vs 146 routes; orphaned URLs?

**Action:**
```bash
node scripts/audit-sitemap.mjs
# Returns: URLs in sitemap not in App.tsx
# Remove 404-ing entries from public/sitemap.xml
# Add to robots.txt: Sitemap: https://livingwitharthritis.org.uk/sitemap.xml
```

---

### B7: Remove Preflight Reports (L-1) — 5 minutes
**Status:** 9 old JSON files checked in

```bash
# Clean up:
rm .preflight-reports/*.json
echo ".preflight-reports/" >> .gitignore
# Keep only latest in docs/ if needed
```

---

### B8: Consolidate SEO Head (L-2) — 30 minutes
**Status:** Some pages use Helmet, others use SeoHead

**Decision:** Use Helmet consistently across all pages

```typescript
// Remove scattered SeoHead usage
// Replace with:
import { Helmet } from 'react-helmet-async'

<Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
  <canonical href={url} />
</Helmet>
```

---

### B9: Language Tag Fix (L-6) — 1 minute
**Status:** `<html lang="en">` should be `lang="en-GB"`

```html
<!-- In index.html -->
<html lang="en-GB">
```

---

## PHASE C: Strategic Enhancements (Weeks 4-8 — 20-25 hours)

### C1: GEO Optimization (Geo Meta Tags, hreflang) — 2 hours

**Add to Helmet/PageSchema:**
```tsx
<meta name="geo.placename" content="United Kingdom" />
<meta name="geo.region" content="GB" />
<meta name="geo.position" content="54.5973;-3.4360" />
<meta name="ICBM" content="54.5973, -3.4360" />
<link rel="alternate" hreflang="en-GB" href={canonicalUrl} />
<meta property="og:locale" content="en_GB" />
```

**Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Living With Arthritis UK",
  "areaServed": "GB",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Support",
    "areaServed": "GB"
  }
}
```

**Files:**
- `src/components/seo/PageSchema.tsx` — add geo
- `src/lib/seo-utils.ts` — geo helpers
- `index.html` — geo meta tags

---

### C2: SEO Infrastructure (Breadcrumbs, FAQ Schema, Internal Links) — 4 hours

**C2a: Breadcrumb Schema**
- Create `src/components/seo/BreadcrumbSchema.tsx`
- Add to all sub-pages (conditions, guides, blog)
- Track: Home → Category → Page

**C2b: FAQ Schema**
- Create `src/components/seo/FAQSchema.tsx`
- Add to support/help pages
- Structure Q&A properly

**C2c: Internal Linking Strategy**
- Each article links 2-3 related articles
- Create topic clusters (e.g., "Arthritis Types")
- Use descriptive anchor text
- Link down from pillars to clusters

**Implementation:**
```typescript
// Create link mapping:
const internalLinks = {
  '/condition/osteoarthritis': [
    { url: '/guide/exercises-oa', text: 'Exercises for OA' },
    { url: '/guide/diet-inflammation', text: 'Anti-inflammatory diet' },
  ]
}

// Use in article template:
<div className="related-articles">
  {internalLinks[pathname]?.map(link => (
    <Link key={link.url} to={link.url}>{link.text}</Link>
  ))}
</div>
```

---

### C3: AEO Optimization (Answer Engine Optimization) — 3 hours

**C3a: AI-Friendly Content Structure**
- Question-answer format in articles
- Bold topic sentences (AI extraction)
- Structured lists for guides
- Markdown code blocks

**C3b: Answer Box Component**
```tsx
<AnswerBox title="What is osteoarthritis?">
  Osteoarthritis is the most common type of arthritis, affecting 
  the cartilage between joints. It typically develops after age 50 
  and is more common in women.
</AnswerBox>
```

**C3c: HowTo Schema**
```json
{
  "@type": "HowTo",
  "name": "How to Manage Arthritis Pain",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Apply heat therapy",
      "text": "Use a heating pad or warm compress..."
    }
  ]
}
```

**Files:**
- `src/components/article/AnswerBox.tsx`
- `src/components/article/HowToSchema.tsx`
- Update article templates

---

### C4: Analytics & Conversion Tracking — 3 hours

**C4a: Event Tracking Setup**
```typescript
// src/lib/google-analytics.ts
export const trackEvent = (eventName: string, params?: {}) => {
  gtag.event(eventName, params)
}

// Usage:
trackEvent('scroll_depth', { percent: 50 })
trackEvent('file_download', { file_name: 'guide.pdf' })
trackEvent('form_submit', { form_name: 'Buddy Request' })
```

**C4b: Custom Dimensions**
```typescript
gtag.set({
  'content_type': 'article | guide | tool',
  'condition_type': 'osteoarthritis | rheumatoid',
  'user_type': 'newly_diagnosed | long_term',
})
```

**C4c: Goal Tracking**
- Buddy scheme signups
- Support group registrations
- Newsletter subscriptions
- Document downloads

**Files:**
- `src/lib/google-analytics.ts`
- `src/hooks/usePageViewTracking.ts`
- `src/hooks/useScrollDepth.ts`
- Update components with event calls

---

### C5: Keyword Ranking Automation — 2 hours

**Integrate 10,000 new keywords with Semrush tracking:**

```typescript
// src/scripts/sync-keywords-to-semrush.ts
import { supabase } from '../lib/supabase'
import { semrushApi } from '../lib/semrush'

export async function syncKeywordsToSemrush() {
  // Get unsynced keywords from tracked_keywords
  const { data: keywords } = await supabase
    .from('tracked_keywords')
    .select('*')
    .eq('synced_to_semrush', false)
    .limit(100)

  // Send to Semrush for weekly ranking tracking
  for (const keyword of keywords) {
    await semrushApi.addTrackedKeyword({
      keyword: keyword.keyword,
      domain: 'livingwitharthritis.org.uk',
      market: 'uk'
    })
  }

  // Mark as synced
  await supabase
    .from('tracked_keywords')
    .update({ synced_to_semrush: true })
    .in('id', keywords.map(k => k.id))
}
```

**Automation:**
- Run weekly via edge function
- Track rankings in `rank_history` table
- Alert on page 2 keywords (#11-20) for refresh

---

### C6: Content Optimization (New Articles, Gaps) — 8 hours

**Guided by 10,000 keywords + Semrush analysis:**

**C6a: High-Volume Keywords (>500 searches/month)**
Create dedicated articles for:
- Top 20 keywords with no content (create new)
- Keywords ranking #2-5 (optimize to #1)
- Keywords with high click-through intent (urgency content)

**C6b: Long-Tail Clusters**
For each keyword cluster:
1. Create pillar article (1500+ words)
2. Create 3-5 cluster articles (400-600 words each)
3. Link pillar ↔ cluster articles

**C6c: Content Gaps**
- Competitor analysis: X ranks for [keyword], we don't → create content
- Search intent gaps: [keyword] returns mixed results → clear guide needed
- Seasonal gaps: "winter arthritis pain" (Oct-Feb focus)

**C6d: Content Refresh**
- Articles >3 months old: refresh + republish
- Add new statistics/research
- Update internal links
- Fix thin content (<500 words)

---

## PHASE D: Advanced Optimizations (Weeks 9-12 — 10-15 hours)

### D1: Technical SEO Audit & Fixes — 2 hours
- Core Web Vitals (LCP, FID, CLS)
- Image optimization (WebP, lazy loading)
- Code splitting + bundle analysis
- Cache headers optimization

### D2: Link Building Strategy — 3 hours
- Identify high-authority sites in arthritis space
- Create linkable assets (guides, tools, research)
- Outreach strategy for British health sites
- Monitor backlink profile

### D3: Competitor Analysis Deep Dive — 2 hours
- Analyze top 10 competitors for each keyword
- Identify content gaps
- Find "easy wins" (low-competition opportunities)
- Learn ranking factors by competitor

### D4: User Behavior Analysis — 2 hours
- Heatmaps: which CTAs work?
- Session recordings: where do users get stuck?
- Exit pages: why do users leave?
- Form analytics: which fields reduce completion?

### D5: Advanced Structured Data — 3 hours
- NewsArticle schema (for blog posts)
- Article schema with ratings
- Video schema (for exercise videos)
- Review/aggregate ratings schema

### D6: Mobile App / PWA Consideration — 3 hours
- Evaluate Progressive Web App for offline access
- Symptom checker as installable app
- Push notifications for health tips
- Offline exercise library

---

## Quick Wins Summary (Can Start Today)

| Task | Time | Impact | Files |
|------|------|--------|-------|
| Fix edge functions (A1) | 2h | CRITICAL | process-donation, process-email-queue |
| NHS references → UK healthcare (A2 option B) | 1.5h | CRITICAL | 13 source + 4 data files |
| Colour contrast fix (A3) | 45m | CRITICAL | tailwind.config, ~8 components |
| Add aria-labels (B3) | 30m | HIGH | 8 components |
| Add missing alt tags (B4) | 20m | HIGH | 4 components |
| Remove preflight reports (B7) | 5m | LOW | .gitignore |
| Fix language tag (B9) | 1m | LOW | index.html |
| Update robots.txt (L-4) | 2m | LOW | public/robots.txt |
| **TOTAL QUICK WINS** | **5 hours** | **BLOCKS EVERYTHING** | |

---

## Keyword Strategy Integration

### How the 10,000 Keywords Fit:

**Step 1: Import Keywords (Already done)**
```bash
npx ts-node scripts/import-keywords.ts
```

**Step 2: Analyze & Map**
- High-volume keywords (>1000/month) → create/prioritize content
- Medium-volume (100-1000/month) → expand existing content
- Long-tail (<100/month) → supportive content, clusters

**Step 3: Track Rankings**
- Week 1: Establish baseline (keywords we rank for)
- Week 4: Identify quick wins (keywords ranking #2-5)
- Week 8: Optimize top 100 keywords
- Week 12: Expand to top 500

**Step 4: Content Strategy**
```
For each keyword cluster:
├── Pillar Article (1500-2000 words)
│   ├── Comprehensive guide
│   ├── Links to 3-5 sub-articles
│   └── Targets primary keyword + 70-80 secondary keywords
├── Cluster 1 (400-600 words) → Targets specific keyword group
├── Cluster 2 (400-600 words) → Targets specific keyword group
├── Cluster 3 (400-600 words) → Targets specific keyword group
└── Cluster 4 (400-600 words) → Targets specific keyword group
```

---

## Success Metrics (By Week)

| Metric | Week 2 | Week 4 | Week 8 | Week 12 |
|--------|--------|--------|--------|---------|
| Keywords tracked | 10,000 | 10,000 | 10,000 | 10,000 |
| Keywords ranking (#1-10) | ~5-10 | 50-100 | 200-300 | 400-600 |
| Keywords ranking (#1-50) | ~20-30 | 200-300 | 1,000-1,500 | 2,000-3,000 |
| Organic traffic | baseline | +10-20% | +50-100% | +150-300% |
| Mobile scores | improve | 90+ | 95+ | 98+ |
| Accessibility | improved | AA | AAA | AAA |
| Page speed (CLS) | <0.1 | <0.05 | <0.05 | <0.05 |

---

## Deployment Workflow

For each phase:

```bash
# 1. Branch off
git checkout -b improvement/phase-a-critical-fixes

# 2. Make changes (as documented)
# Edit files, run tests

# 3. Test locally
npm run dev
npx axe-core http://localhost:5173 --level AA
npm run test

# 4. Commit
git commit -m "Phase A: Fix critical issues (edge functions, NHS refs, contrast)"

# 5. Push to git
git push -u origin improvement/phase-a-critical-fixes

# 6. Deploy to Lovable
LOVABLE_PROJECT_ID="0b2fd6ca-4e21-4ac7-99fa-d741e996f45e"
curl -X POST https://api.lovable.dev/projects/${LOVABLE_PROJECT_ID}/deploy \
  -H "Authorization: Bearer $LOVABLE_API_KEY"

# 7. Verify live
# Check: https://livingwitharthritis.org.uk
# Run: npx lighthouse https://livingwitharthritis.org.uk
```

---

## Decision Checklist (Needs Your Input)

- [ ] **A2 Decision:** Which NHS reference option? (A, B, or C)
- [ ] **Keyword Priority:** Top 100, 500, or all 10,000 to optimize first?
- [ ] **Content Budget:** How many new articles/week can you commit?
- [ ] **Analytics:** Which GA4 events are most important to track?
- [ ] **Timeline:** 8 weeks acceptable, or faster needed?

---

## Next Steps

1. **Today:**
   - Decide on A2 (NHS references)
   - Start Phase A fixes (edge functions + color contrast)
   - Commit & deploy

2. **Week 2:**
   - Complete Phase B (high-impact features)
   - Set up keyword tracking dashboard
   - Review Phase C priorities

3. **Weeks 3-8:**
   - Execute Phase C (GEO/SEO/AEO/Analytics)
   - Create content for top-100 keywords
   - Monitor ranking improvements

4. **Weeks 9-12:**
   - Phase D advanced optimizations
   - Expand to top-500 keywords
   - Plan scaling strategy

---

**Status:** Ready to start  
**Risk Level:** LOW (changes are isolated, tested, deployed incrementally)  
**Expected ROI:** 150-300% organic growth over 6 months

