# MAP Design System — Site-Wide Style Audit

**Date:** 2026-06-28  
**Method:** static `rg` sweep + Playwright computed-style sampling across 11 representative templates at 1280×1800.  
**Artifacts:** `/tmp/audit/static-sweep.txt`, `/tmp/browser/map-audit/screenshots/*.png`, `/tmp/browser/map-audit/results.json`.

---

## Executive Summary

| Dimension | Status | Notes |
|---|---|---|
| Anton on `<h1>`/`<h2>`/`<h3>` (global) | **PASS** | 10/11 templates render Anton via global CSS rule. |
| MAP red primary token (`#EE2737`) | **PASS** | `--primary` resolves correctly; no indigo/blue color offenders detected on sampled pages. |
| Cream `#F8F2EA` body background | **FAIL** | Body computes to `rgb(255,255,255)` on every sampled page. `--background` is set to `34 50% 95%` which renders very near-white; not the warm cream MAP uses. |
| Sharp MAP CTA shape (`rounded-none`) | **FAIL** | Primary CTA `border-radius` = **9999px** (pill) on every sampled page. Shadcn `Button` default is `rounded-none`, but **385 inline `rounded-full` usages** across 80+ files override it. |
| MAP type scale on display headings | **PARTIAL** | Global `h1/h2/h3` clamp scale applies, but 11 files explicitly use `font-serif` (Georgia stack) on headings — these fall outside the Anton system. |
| Eyebrow + octagon imagery | **PARTIAL** | Utilities exist (`.eyebrow`, `.clip-octagon`, `.clip-octagon-soft`) but are only used by `OAHero`. Not adopted by any other section/template yet. |

---

## Per-Template Findings

| Page | Anton h1 | Body BG | Primary CTA radius | Blue/indigo offenders | Screenshot |
|---|---|---|---|---|---|
| `/` | Anton ✓ | white ✗ | 9999px ✗ | 0 | `home.png` |
| `/conditions/osteoarthritis` | Anton ✓ | white ✗ | 9999px ✗ | 0 | `condition-oa.png` |
| `/guides/frailty-management-hub` | Anton ✓ | white ✗ | 9999px ✗ | 0 | `guide-frailty.png` |
| `/blog/knee-osteoarthritis-exercises` | Anton ✓ | white ✗ | 9999px ✗ | 0 | `blog-knee.png` |
| `/diet/foods-to-avoid-with-arthritis` | Anton ✓ | white ✗ | 9999px ✗ | 0 | `diet-avoid.png` |
| `/exercises` | Anton ✓ | white ✗ | 9999px ✗ | 0 | `exercises-hub.png` |
| `/about/ai-transparency` | Anton ✓ | white ✗ | 9999px ✗ | 0 | `about-ai-trans.png` |
| **`/ai`** | **Georgia serif ✗** | white ✗ | 12px ✗ | 0 | `ai-hub.png` |
| `/donate` | Anton ✓ | white ✗ | 9999px ✗ | 0 | `donate.png` |
| `/contact` | Anton ✓ | white ✗ | 9999px ✗ | 0 | `contact.png` |
| `/404` | Anton ✓ | white ✗ | 9999px ✗ | 0 | `notfound.png` |

---

## Ranked Issues (highest leverage → lowest)

### 1. Pill-shaped CTAs override MAP sharp-edge identity — **385 occurrences**
`rounded-full` is the single biggest visual breaker. Top offenders:

| File | Count |
|---|---|
| `src/pages/WaysToHelp.tsx` | 15 |
| `src/pages/AboutUs.tsx` | 11 |
| `src/components/VirtualPhysioSection.tsx` | 9 |
| `src/components/DonationQuickBar.tsx` | 9 |
| `src/pages/BlogHub.tsx` | 8 |
| `src/pages/Donate.tsx` | 7 |
| `src/pages/Auth.tsx` | 7 |
| `src/components/JointExerciseSection.tsx` | 7 |
| `src/pages/ImpactStories.tsx`, `DonationSuccess.tsx`, `BlogIndex.tsx`, `StickyDonateBar.tsx` | 6 each |
| Condition pages (Shoulder/OA/Knee/Hip/Hand/Elbow) | 5 each |

**Recommended fix pattern**: strip `rounded-full` from any `<Button>` / `<a>` CTA. Keep `rounded-full` only on truly circular elements (avatars, icon dots, status indicators).

### 2. `font-serif` headings bypass Anton — 11 files
Falls back to Georgia, visually clashes with the MAP system.

- `src/pages/AiHub.tsx` (h1 + 7 h2s)
- `src/pages/exercises/NeckArthritisExercises.tsx` (6 occurrences)
- `src/pages/exercises/AnkleArthritisExercises.tsx`
- `src/pages/LibraryTopic.tsx`, `Library.tsx`, `SelfHelpTool.tsx`, `SelfAssessment.tsx`
- `src/pages/ArthritisFlareUps.tsx`, `Buddy.tsx`, `ExerciseHub.tsx`, `AdminPsiDashboard.tsx`

**Recommended fix**: global find-and-replace `font-serif` → remove (let the global h1/h2/h3 rule supply Anton) or `font-display` on headings outside h1-h3.

### 3. Body background is white, not MAP cream
`--background: 34 50% 95%` produces an almost-white color (HSL L=95% has near-zero perceptible chroma). MAP uses `#F8F2EA` ≈ `hsl(34, 50%, 95%)` in *concept*, but the rendered value lacks warmth.

**Recommended fix**: lower lightness to `~92%` and bump saturation to `~55%` → `--background: 34 55% 92%;` (≈ `#F4ECDE`). Visually warmer, still WCAG-safe for black text.

### 4. Hardcoded text sizes on display headings — 19 files
Pages set `text-4xl md:text-5xl` directly on `<h1>` / `<h2>`, fighting the global `clamp()` scale. The result: inconsistent heading sizes between hero/landing and content templates. Top offenders:

- `Sitemap.tsx`, `AboutUs.tsx`, `LocalizedHome.tsx`, `Press.tsx`, `Partners.tsx`
- `supplements/SupplementsHub.tsx`, `supplements/Msm.tsx`, `supplements/Glucosamine.tsx`
- `LivingWithArthritis.tsx`, `FaqArticle.tsx`, `DietHub.tsx`, `ConditionSubpagePage.tsx`
- `tools/WaitingTimeCalculator.tsx`, `SelfHelpTool.tsx`, `AdminBacklinks.tsx`

**Recommended fix**: delete `text-4xl md:text-5xl font-bold` from `<h1>`/`<h2>` — global CSS already provides Anton + clamp + weight. Keep size overrides only when intentionally smaller (e.g. card titles).

### 5. Inline hex colors hardcoded — 6 files
- `src/components/SeoHead.tsx` — `theme-color #e6002b` / `#0a0a0a` (acceptable — meta tag, not visual)
- `src/components/DonationQuickBar.tsx` — `#E60023`, `bg-[#ff0000]` (replace with `bg-primary`)
- `src/components/landing/ParticleNetworkSection.tsx` — `#E4002B`, gradient `#080808 → #0a0808`
- `src/components/landing/GeometricCubeSection.tsx` — `#E4002B`, gradient `#0a0a0a → #141414`
- `src/components/tools/InflammationCalculator.tsx` — stroke `#000000` (replace with `hsl(var(--foreground))`)

**Recommended fix**: swap to design tokens (`hsl(var(--primary))`, `hsl(var(--foreground))`, `hsl(var(--secondary))`).

### 6. Inline `style={{ color }}` overrides — 10 occurrences
Mostly justified (chart colors in `Finances.tsx`, dynamic icon backgrounds in `JointExerciseSection.tsx`). Leave as-is unless they introduce non-MAP brand colors.

### 7. Colored Tailwind utilities — **2 occurrences** (acceptable)
- `src/pages/AdminBacklinks.tsx` lines 36-37: `bg-yellow-100 text-yellow-900`, `bg-green-100 text-green-900` (admin-only status pills). Optional cleanup, not visitor-facing.

---

## Adopted-Correctly Inventory

- `src/index.css` — MAP tokens, global Anton on h1/h2/h3 (uppercase, clamp), `.eyebrow`, `.clip-octagon`, `.clip-octagon-soft`, `.band-red`, `.btn-map`, `.btn-map-dark`. **Verified intact.**
- `tailwind.config.ts` — `font-display` → `Anton, Montserrat`; `font-anton` token present. **Verified.**
- `src/components/ui/button.tsx` — default variant `rounded-none uppercase tracking-[0.08em]`. **Verified** (but overridden 385× by inline `rounded-full`).
- `src/components/Header.tsx` — logo wordmark uses `font-display` ⇒ Anton. **Pass.**
- `src/components/Footer.tsx` — brand line `font-display text-3xl md:text-4xl uppercase`. **Pass.**
- `src/components/landing/OAHero.tsx` — full MAP treatment (eyebrow, octagon, `.btn-map`, `.band-red`, reveal). **Pass — reference implementation.**

---

## Recommended Next-Plan Scope

A single remediation pass that:
1. **Strip 385 inline `rounded-full`** from CTAs (keep only on circular UI atoms).
2. **Replace `font-serif`** with no override on 11 files (let global Anton win), and the explicit `font-mono` blocks on `/ai` with `font-mono` only on the citation code samples.
3. **Warm the body background** by editing `--background` from `34 50% 95%` → `34 55% 92%` (≈ `#F4ECDE`).
4. **Delete redundant `text-4xl md:text-5xl font-bold`** off h1/h2 elements in the 19 listed files.
5. **Token-swap 5 hex literals** in `DonationQuickBar`, `ParticleNetworkSection`, `GeometricCubeSection`, `InflammationCalculator`.

Estimated diff scope: ≈80 files, mechanical edits, no logic changes. Verifiable by re-running this exact audit script (`/tmp/browser/map-audit/run.py`) and expecting `bodyBg = rgb(244,236,222)`, `primaryCta.radius = 0px`, `h1.font` starting with `Anton` on every template.
