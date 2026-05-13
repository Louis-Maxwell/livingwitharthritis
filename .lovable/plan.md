## Goal

Capture the uncontested UK long-tail keyword **"mediterranean diet for arthritis"** (40/mo, KDI 0) and surrounding terms ("mediterranean diet recipes", "anti inflammatory mediterranean meal plan UK"). Establish a focused entry-point that funnels readers into the existing Diet Hub and Diet Guide pillar — improving topical authority for the cluster.

## New page

`src/pages/diet/MediterraneanDietForArthritis.tsx` at route `/diet/mediterranean-diet-for-arthritis`.

Sections, in order:

1. **Hero** — H1 "Mediterranean Diet for Arthritis: A UK Eating Plan", `MedicallyReviewed` badge, one-line promise, primary CTA → 7-day plan anchor, secondary CTA → Diet Hub.
2. **Why it works** — 3-card grid: inflammation evidence (CRP −20%, pain −15–25% from existing DietGuide stats), heart-health bonus, sustainability.
3. **The plate at a glance** — visual breakdown (vegetables 50%, whole grains 25%, lean protein/fish 25%, EVOO drizzle, herbs/spices). Bullet "eat freely / eat weekly / eat rarely" lists.
4. **UK shopping list** — categorised (produce, store-cupboard, fish counter, herbs) with British supermarket-friendly swaps (rapeseed-blend, tinned sardines, frozen berries).
5. **7-day eating plan** — day cards (breakfast / lunch / dinner / snack). Reuses the meal-plan content already in `DietGuide.tsx` but reformatted as scannable cards.
6. **5 anti-inflammatory recipes** — short cards (baked salmon + veg, chickpea & spinach stew, overnight oats with berries, Mediterranean tray bake, anti-inflammatory smoothie). Each links to the relevant section/anchor in `/guides/diet`.
7. **Common mistakes** — 5 bullets (too much cheese, low-quality oil, skipping fish, ultra-processed "Mediterranean" ready meals, ignoring portions).
8. **Internal links block** — cards to: Diet Hub `/diet`, full Diet Guide `/guides/diet#mediterranean-diet`, Foods to Avoid section, Anti-Inflammatory Smoothie recipe anchor, RA diet `/conditions/rheumatoid-arthritis`, Osteoarthritis diet `/conditions/osteoarthritis`.
9. **FAQ** — 6 Q&As: cost on a UK budget, vegetarian variation, alcohol, dairy, supplements, how long until I feel better.
10. **Closing CTA** — newsletter / Self-Help Tool.

## Wire-up

- **`src/App.tsx`** — add lazy import + `<Route path="/diet/mediterranean-diet-for-arthritis" …>` before catch-all.
- **`public/sitemap.xml`** — entry, priority `0.8`, weekly.
- **`src/pages/DietHub.tsx`** — promote the new page in the "Mediterranean Diet" section card (line ~72) and add it to the Resources list (line ~510) ahead of the existing pillar link.
- **`src/pages/pillar/DietGuide.tsx`** — add a "See the focused 7-day plan →" link near the `#mediterranean-diet` heading for reciprocal linking.

## SEO / technical details

- `<title>` ≤60 chars: "Mediterranean Diet for Arthritis: 7-Day UK Plan".
- `<meta description>` ≤160 chars covering "mediterranean diet for arthritis", "anti-inflammatory eating plan", "UK".
- Canonical `https://livingwitharthritis.org.uk/diet/mediterranean-diet-for-arthritis`.
- JSON-LD injected via `useEffect` (per project memory): `Article` + `FAQPage` + `HowTo` (the 7-day plan) + `BreadcrumbList`.
- Hero image: reuse a Mediterranean food image already in the centralized Unsplash CDN map; no new uploads.
- en-GB spelling, plain-English voice, `MedicallyReviewed` component, no NHS references.

## Out of scope

- No new recipe detail pages (recipes link to existing `/guides/diet` anchors).
- No backend, no meal-plan generator, no Supabase changes.
- No image generation.

## Files

- **Create:** `src/pages/diet/MediterraneanDietForArthritis.tsx`
- **Edit:** `src/App.tsx`, `public/sitemap.xml`, `src/pages/DietHub.tsx`, `src/pages/pillar/DietGuide.tsx`
