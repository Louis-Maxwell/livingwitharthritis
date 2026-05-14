## Audit result
The site already has near-complete canonical coverage:
- `src/components/SeoHead.tsx` emits `<link rel="canonical">` + `hreflang` for every static page (~66 files).
- `src/components/conditions/ConditionPageTemplate.tsx` covers the 5 condition pages that don't import `SeoHead` directly (Gout, Lupus, Fibromyalgia, Ankylosing Spondylitis, Juvenile Arthritis).
- All dynamic routes (`BlogPost`, `BlogCategory`, `ProductDetail`, `DailyTipDetail`, `CityArthritisPage`, `CityConditionPage`, `ExerciseJointPage`, `RegionHub`) already render Helmet + canonical with the per-route URL.

So the missing-canonical problem is essentially **already fixed**. There is **one real bug** that's actively *hurting* SEO right now and is the genuine "duplicate-content" risk:

## The bug
`index.html` line 99 ships:
```html
<link rel="canonical" href="https://livingwitharthritis.org.uk/" />
```
This static tag survives on every page after Helmet hydrates (per the head-meta knowledge file: `<link>` tags do NOT dedupe by `rel`). Every route currently emits **two** canonicals — its correct one from Helmet **plus** the homepage one from `index.html`. Google ignores both when there's a conflict, which is worse than no canonical.

## Plan

### 1. Remove the static canonical from `index.html`
Delete the single `<link rel="canonical" href="https://livingwitharthritis.org.uk/" />` line. The homepage's own canonical comes from `src/pages/Index.tsx` via `SeoHead path="/"`.

### 2. Audit script — `scripts/check-canonicals.mjs` (new)
A short Node script that:
- Walks `src/pages/**/*.tsx` (and recurses into route files referenced by `App.tsx`).
- Flags any page component that doesn't import `SeoHead`, `ConditionPageTemplate`, or contain a literal `rel="canonical"`.
- Exits non-zero on failures so it can be run pre-commit later.

Run it once during implementation; expected output: 0 missing.

### 3. Verify in the live preview
Hit `/`, `/conditions/gout`, `/blog/<any-slug>`, `/arthritis-support/london/osteoarthritis` and confirm exactly **one** `<link rel="canonical">` per page, pointing to that page's URL on `livingwitharthritis.org.uk`.

## Out of scope
- No new SeoHead instrumentation — every route already has it.
- No changes to OG/Twitter tags, JSON-LD, or sitemap.
- No SSR / pre-rendering work (social crawlers still see the empty Helmet head — that's a separate, larger workstream).

## Files touched
- **Edit:** `index.html` (remove 1 line).
- **New:** `scripts/check-canonicals.mjs`.
