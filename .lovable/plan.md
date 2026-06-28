## Goal
Propagate the MAP-inspired design system (cream background, MAP red #EE2737, Anton display headlines, sharp uppercase styling, octagon clip, scroll reveal) consistently across every page — not just the OA hero.

## Current State
- `src/index.css` already defines the MAP palette tokens, Anton font registration, `.clip-octagon`, `.btn-map`, and `.reveal`.
- `src/components/landing/OAHero.tsx` uses them.
- The rest of the site (Header, Footer, all section components, guide/blog/condition page templates, CTA buttons, cards) still renders with the previous palette and font scale — producing a visual mismatch between the hero and everything below it.

## Scope of Application

### 1. Global typography baseline
- In `src/index.css`, enforce Anton as the default heading font (`h1, h2, h3, .display`) with the MAP scale (h1 clamp 3.5–6rem, h2 2.5–4rem, h3 1.75–2.5rem), uppercase tracking, tight leading.
- Body stays in the existing sans (Inter) but bump base size to 17px / 1.65 line-height to match MAP's editorial rhythm.
- Add a `.eyebrow` utility (Anton, small, uppercase, red) for section kickers.

### 2. Global color application
- Audit `src/index.css` tokens: confirm `--background` = cream `#F8F2EA`, `--foreground` near-black, `--primary` = MAP red `#EE2737`, `--accent` = red, `--border` = warm taupe.
- Remove/override any lingering blue/indigo accent tokens so shadcn components inherit MAP red.
- Ensure dark-mode tokens still resolve sensibly (keep cream/red identity even in dark).

### 3. Shared chrome
- `src/components/Header.tsx`: cream background, Anton wordmark scale, red underline hover, uppercase nav.
- `src/components/Footer.tsx`: cream/charcoal band, Anton column headings, red social hovers.
- `src/components/StickyDonateBar.tsx`: MAP red, sharp corners, uppercase label, `.btn-map` styling.

### 4. Section + card components
Apply Anton headings, eyebrow kickers, sharp (rounded-none/sm) corners, and red CTAs to:
- Landing sections: `NewsletterSection`, `NewsletterHeroBanner`, `BlogPreview`, `ContactSection`, `RelatedArticles`, `InlineRelatedStrip`, `KeyTakeaways`, `FeedbackPoll`, `VisitorStats` (band variant kept off homepage), `MedicalReviewBadge`.
- Layouts: `GuideLayout`, `RelatedGuidesBlock`, `GuideOnwardJourney`, `NextReadStrip`.
- Pillar/condition/blog templates: `BlogPost.tsx`, condition pages, `/guides/*`, `/diet/*`, `/exercises/*`, `/about/*` (AITransparency, Sources, AICitations, AIGuidelines, AccessibilityForAi), `AiHub`.

### 5. Buttons & links
- Promote `.btn-map` as the default primary button style; map shadcn `Button` `variant="default"` to it (sharp, uppercase, Anton, red bg, white text, hover = darker red).
- Secondary = outlined charcoal on cream.
- Replace ad-hoc `rounded-full` / pill CTAs with sharp MAP edges.

### 6. Imagery treatment
- Apply `.clip-octagon` to lead images in: condition page headers, guide hero blocks, blog hero, AiHub feature image. Provide a `.clip-octagon-soft` variant (smaller corner cut) for inline cards so it doesn't feel repetitive.
- Keep all image URLs at ≥1080px (already enforced in `src/data/images.ts`).

### 7. Motion
- Wire `useReveal` into the section wrappers above so headings and cards fade/translate in on scroll consistently (staggered children, 60–80ms).
- Respect `prefers-reduced-motion` (already handled in the hook — verify).

## Out of Scope
- No content rewrites, no new pages, no routing/SEO changes.
- No backend, analytics, or data-layer changes.
- Index page hero stays as already-shipped MAP hero.

## Verification
- `tsgo --noEmit` + `bun run build` clean.
- Playwright pass: screenshot `/`, `/guides/frailty-management-hub`, `/blog/knee-osteoarthritis-exercises`, `/diet/foods-to-avoid-with-arthritis`, `/about/ai-transparency` at 1280×1800 to confirm consistent MAP look (cream bg, Anton headlines, red CTAs, octagon imagery, reveal animation).

## Technical Notes
- All changes are CSS-token + component-class edits; no new dependencies.
- Heading override done via global CSS so individual components don't each need `font-display` className changes — but components using hardcoded `font-sans` on headings will be cleaned up.
- shadcn `Button` variant change is the single highest-leverage edit for site-wide CTA consistency.
