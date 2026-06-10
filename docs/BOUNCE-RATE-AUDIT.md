# Bounce Rate Reduction Audit — 88% → 40%

_Audit date: 2026-06-10. Scope: full codebase walk-through of `src/`, `public/`, `index.html`, `vite.config.ts`._

---

## PHASE 1 — Root Cause Analysis

### 1. Page Speed (LCP / CLS / INP)
| Check | Finding | Verdict |
|---|---|---|
| Hero `<img>` has explicit `width`/`height`, `fetchpriority="high"`, AVIF + preload | `src/components/landing/OAHero.tsx` + `index.html` | ✅ PASS |
| Font `display:swap` on Google Fonts | `index.html` `&display=swap` | ✅ PASS |
| Route-based code-splitting | `lazy(...)` in `App.tsx` + `Index.tsx` | ✅ PASS |
| Manual vendor chunking (react, supabase, framer-motion, recharts isolated) | `vite.config.ts` | ✅ PASS |
| `OptimizedImage` lazy + IntersectionObserver | `src/components/ui/OptimizedImage.tsx` | ✅ PASS |
| Sub-hero sections wrapped in `<Suspense>` + `DeferredMount` | `Index.tsx` | ✅ PASS |
| Heavy below-fold sections (DonationImpact, MissionEthos, HowWeAreFunded, SEOTeaser) **eager-imported** despite DeferredMount | `Index.tsx` top imports | ⚠ MEDIUM — they live in main bundle |
| `HeroStatsStrip`, `FacesStrip`, `OAProblemBand`, `OAPlanPillarsSection`, `MissionStatementBand` all eager | `Index.tsx` | ⚠ MEDIUM — only OAHero needs to be eager for LCP |

**Likely root cause #1**: First-paint JS larger than necessary because 8 landing sections are eager-imported. Only `OAHero` is required for LCP.

### 2. Content Engagement
| Check | Finding |
|---|---|
| Single H1 per page | ✅ enforced in pillar/blog templates |
| Intro paragraph above the fold | ✅ on home, blog, pillar |
| Word count audit script exists | `scripts/audit-word-count.ts` (not in CI) |
| Internal links per page | ✅ NextReadStrip, ConditionPillBand, BlogPreview |
| Multimedia | ✅ images on most pages; **videos only on exercise pages** |
| Thin pages risk | City pages (`CityArthritisPage`, `CityServicePage`, `CityConditionPage`) and `ConditionSubpagePage` programmatically generated — possible <300 words |

**Likely root cause #2**: Programmatic city / condition-subpage routes risk thin content (high bounce + Google "low-quality" signal).

### 3. UX / Navigation
| Check | Finding |
|---|---|
| Homepage purpose clear above fold | ✅ OAHero |
| Sticky header + StickyDonateBar | ✅ |
| Breadcrumbs | ✅ via `PageSchema`, but **visual breadcrumbs missing on many pages** |
| Related articles | ✅ NextReadStrip mounted on `/` only — **not on blog posts / pillar pages by default** |
| CTA visibility | ✅ Donate, Newsletter, Sticky bar |

**Likely root cause #3**: Visual breadcrumbs + "Next read" strip not consistent across all routes → users hit dead-ends → bounce.

### 4. Mobile
| Check | Finding |
|---|---|
| `useIsMobile` 768px breakpoint | ✅ |
| Touch targets | shadcn `size="icon"` is 36px — needs `min-h-11` on primary actions |
| CLS | ✅ Hero img has w/h; below-fold uses `aspect-*` |

**Likely root cause #4**: Icon-only buttons under 44px hurt mobile engagement (back-button bounce).

### 5. Trust Signals
| Check | Finding |
|---|---|
| Author/reviewer bylines (`MedicallyReviewed` component) | ✅ on blog/pillar |
| Publication / updated dates | ✅ in `articles.ts` |
| Citations | ✅ — verify on programmatic pages |
| HCPC/CSP/NICE badges | ✅ FAQ + footer |
| Testimonials | ✅ `FacesStrip` |

✅ Strong — not a bounce driver.

### 6. Engagement Elements
| Check | Finding |
|---|---|
| Table of contents | ✅ on pillar pages (`addHeadingIds`) — **missing on blog posts** |
| Newsletter CTA | ✅ |
| Related articles widget | ⚠ inconsistent (see #3) |
| FAQ accordion | ✅ on home + pillar |
| Comments/reviews | ❌ none — acceptable for medical content |

**Likely root cause #5**: Blog posts lack TOC → high scroll-and-bounce on long reads.

### 7. Technical
| Check | Finding |
|---|---|
| Broken internal links | needs `scripts/check-canonicals.mjs` in CI |
| 404 page | ✅ `NotFound.tsx` — verify it offers next-actions |
| Form functionality | ✅ contact/newsletter wired to edge functions |
| Analytics | ✅ GA4 + `EngagementTracker` with bounce-busting events (engaged_session @ 10s, scroll_depth, first_click) |
| Bot-aware first pageview | ✅ via `index.html` |

✅ Solid.

---

## PHASE 2 — Fix Priority Matrix

| # | Fix | Impact | Cost | Effort | Quick Win? |
|---|---|---|---|---|---|
| Q1 | Lazy-load 8 eager landing sections (keep only OAHero eager) | **HIGH** | 0.5 | quick | ✅ |
| Q2 | Add visual breadcrumbs to BlogPost + Pillar + Condition pages | HIGH | 0.5 | quick | ✅ |
| Q3 | Mount `NextReadStrip` on BlogPost, Pillar, Condition pages | HIGH | 0.5 | quick | ✅ |
| Q4 | Add TOC component to BlogPost (reuse `addHeadingIds`) | HIGH | 1 | medium | ✅ |
| Q5 | Upgrade icon-only buttons to `min-h-11 min-w-11` site-wide | MEDIUM | 0.5 | quick | ✅ |
| Q6 | Beef up `NotFound.tsx` with top-3 articles + search | MEDIUM | 0.5 | quick | ✅ |
| M1 | Word-count gate in CI; flag thin city/condition pages | HIGH | 1 | medium | — |
| M2 | Expand thin programmatic pages to 600+ words via template enrichment | HIGH | 2 | medium | — |
| M3 | Add inline video poster + click-to-play on exercise pages (autoplay hurts INP) | MEDIUM | 1 | medium | — |
| M4 | Add "Was this helpful?" micro-feedback widget (fires GA `helpful_yes/no`) | MEDIUM | 1 | medium | — |
| L1 | Per-condition personalised "next steps" module (uses keyword-content-map) | HIGH | 2 | complex | — |
| L2 | Server-side prerender for top 50 routes via `PRERENDER=1` in build | HIGH | 2 | complex | — |
| L3 | Reading-progress + scroll-restore on long pages | MEDIUM | 2 | complex | — |
| L4 | Personalised home (return visitors see "Continue reading") via localStorage | MEDIUM | 3 | complex | — |

---

## PHASE 3 — 12-Week Roadmap (88% → 40%)

### Weeks 1–2 — Quick wins (target 88% → 70%, ~2.5 credits)
- **W1** Q1 lazy-load landing sections, Q5 touch-target sweep
- **W2** Q2 breadcrumbs, Q3 NextReadStrip on all article routes, Q6 richer 404

### Weeks 3–6 — Medium fixes (target 70% → 50%, ~5 credits)
- **W3** Q4 TOC on BlogPost
- **W4** M1 CI thin-content gate
- **W5** M2 enrich city/condition templates (data-driven sections, local NHS service blocks, FAQ injection)
- **W6** M3 video click-to-play + M4 "Was this helpful?" widget

### Weeks 7–12 — Long-term (target 50% → 40%, ~7 credits)
- **W7–8** L2 prerender top 50 routes (faster paint = lower bounce on first hit)
- **W9–10** L1 keyword-graph driven "next steps" module
- **W11** L3 reading-progress + scroll-restore
- **W12** L4 personalised home + measurement review

### Measurement plan
GA4 already emits `engaged_session` (10s), `engagement_30s`, `scroll_depth` (25/50/75/100), `first_click`. Build a Looker Studio scorecard:
`bounce_rate = sessions_without_engagement / sessions`
Track weekly per landing page from `landing_page_view`.

---

## Recommended next action (this session, ~0.5 credits)
Execute Q1 + Q3 (lazy-load + NextReadStrip everywhere). Biggest single drop expected.
