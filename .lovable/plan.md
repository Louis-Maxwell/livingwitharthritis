# Plan: Osteoarthritis Open-Source Nonprofit Landing Page

## Goal
Rebuild the homepage (`src/pages/Index.tsx`) into a focused, editorial fundraising landing page for an open-source osteoarthritis management mission. Keep the existing Crimson/White institutional aesthetic, Playfair Display headings, and current routing/components — only the landing composition and copy change.

## New landing page structure (top to bottom)

1. **Hero** — Mission statement: "Open-sourcing the management plan for osteoarthritis." Subhead about helping every person living with OA. Dual CTA: Donate · Read the Plan. Trust micro-row (HCPC / CSP / NICE-aligned).
2. **The Problem band** — 3 stat cards: "1 in 6 UK adults", "8.75M living with OA", "£10bn yearly cost". Sourced framing, no fabricated numbers.
3. **Our Open-Source Plan** — 4 pillars (Diet · Movement · Inflammation · Mind) each linking to existing pages (DietHub, ExerciseHub, conditions/Osteoarthritis, SelfHelpTool).
4. **Editorial quote band** — Mission line in serif, full-bleed crimson.
5. **What £X funds** — Reuse `DonationImpactSection`.
6. **The Evidence Library** — Featured articles grid (pull from `blog_articles`, filter osteoarthritis tag/category, fallback to curated list).
7. **Mediterranean diet + Exercise teaser** — Two-column editorial cards linking to existing hubs.
8. **Faces of the mission** — Reuse `FacesOfArthritis` carousel.
9. **Open-source ethos band** — "Everything we publish is free. Forever." with GitHub-style commit-strip visual (CSS only).
10. **Final CTA** — Donation strip + newsletter signup (reuse existing component).
11. **Footer** — Unchanged.

## Content rewrites
- Hero H1, subhead, mission band, pillar copy, evidence intro, ethos band — all written in the site's plain-English editorial voice (per memory).
- Use "for everyone" not "zero cost" (per memory).
- Strict neutrality: no sponsors, no fabricated stats, no founder narratives.
- UK English throughout.

## Technical notes
- Only edit `src/pages/Index.tsx` and, if needed, add 1–2 small section components under `src/components/landing/` (e.g. `OAPillarsSection.tsx`, `OpenSourceEthosBand.tsx`).
- Reuse existing components: `DonationImpactSection`, `MissionStatementBand`, `FacesOfArthritis`, header/footer, newsletter, donation banner.
- Keep CSS-only page transitions (no Framer Motion routing).
- JSON-LD: update homepage `Organization` + add `NGO` schema via `useEffect` (existing pattern).
- Meta title/description updated for "osteoarthritis management plan" keywords.
- No DB changes, no new routes, no backend changes.

## Out of scope
- Brand rename, color/typography changes, new pages, edge functions, payments wiring (already live).

## Open question
Should I keep the broader "arthritis" framing the site currently uses (rheumatoid, psoriatic, etc. still referenced in nav) and present osteoarthritis as the **flagship open-source plan**, or fully narrow the homepage to osteoarthritis-only? I'll default to **flagship framing** (homepage centred on OA, other conditions still accessible via nav/blog) unless you say otherwise.
