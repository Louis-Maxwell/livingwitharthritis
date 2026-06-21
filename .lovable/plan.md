# Plan: Remove address + ship AI-ranking schema

## Part 1 — Remove charity address (everywhere)

Strip the postal address from every surface. The legal name, charity number, and regulator stay (still required for charity compliance and trust). A `CHARITY.address` placeholder will remain in `src/config/charity.ts` typed as optional/empty so nothing crashes — you can drop the new address in tomorrow by editing one file.

Files touched:

- `src/config/charity.ts` — set `address` to empty/optional; export `hasAddress` helper.
- `supabase/functions/_shared/contact.ts` — remove `CONTACT_ADDRESS` constant.
- `src/config/contact.ts` — remove address fields.
- `src/components/Footer.tsx` — drop address from copyright line, keep charity reg link.
- `src/components/CharityRegBadge.tsx` — hide the `<address>` block when address is empty.
- `src/components/seo/RootOrganizationSchema.tsx` — remove `address` property from JSON-LD.
- `src/lib/jsonLd.ts` — remove `address` from `buildCharitySchema`.
- `src/pages/Contact.tsx`, `src/pages/Complaints.tsx`, `src/pages/Governance.tsx` — remove address blocks, keep email/phone/charity number.
- `index.html` — remove address from any meta/JSON-LD.
- `public/llms.txt` — strip the address line.

No design changes — just clean removal so layouts stay intact.

## Part 2 — Schema markup for AI ranking (priority)

Add three schema types so ChatGPT, Perplexity, Google AI Overviews, and Gemini can lift answers cleanly. All injected via `useEffect` per project memory (never Helmet).

### 2a. `MedicalWebPage` schema
New helper `buildMedicalWebPage()` in `src/lib/jsonLd.ts`. Apply to:
- All condition pages (`/conditions/*` — Osteoarthritis, RA, PsA, Knee, Hand, etc.)
- All diet/supplement pages (`/diet/*`, `/supplements/*`)
- Pillar guides (`/guides/*`)
- BlogPost (when `category` is medical)

Each emits: `medicalAudience: Patient`, `lastReviewed`, `reviewedBy` (HCPC physio), `specialty: Rheumatology|Physiotherapy`, `about: MedicalCondition`.

### 2b. `FAQPage` schema
New helper `buildFAQPage()` already exists. Wire it into pages that have visible FAQ sections but don't emit schema yet (audit pass — likely ~15-20 pages including ArthritisFlareUps, SelfHelpTool, condition pages, supplement pages).

### 2c. `HowTo` schema
New helper `buildHowTo()`. Apply to:
- Exercise pages (`/exercises/*`, `ExerciseConditionPage`, `ExerciseJointPage`) — each exercise becomes a `HowToStep`.
- Tai Chi pages
- Pedometer, WaitingTimeCalculator (tool how-tos)

### 2d. New reusable component
`src/components/seo/MedicalPageSchema.tsx` — drop-in wrapper that takes `{ type: 'condition' | 'exercise' | 'diet' | 'faq', data }` and emits the right combo (Article + MedicalWebPage + FAQ + HowTo as appropriate). Reduces per-page boilerplate.

## Part 3 — Keyword research (Semrush)

Run on `livingwitharthritis.org.uk` (UK database) to propose 3 target keywords with the best balance of volume / difficulty / fit to your existing content. I'll:

1. `domain_analysis` — current ranking snapshot.
2. `competitive_analysis` — gaps vs Versus Arthritis / NHS.
3. `keyword_compare` on the top candidates to pick the final 3.

Output: a short ranked list (volume, KDI, suggested page to target/build) — no code changes from this step; it becomes the brief for the next session.

## Technical notes

- All schema helpers go in `src/lib/jsonLd.ts` and use the existing `injectJsonLd(id, payload)` pattern — id-namespaced so multiple schemas can coexist per page without collision.
- No new dependencies. No Helmet. No routing changes.
- `CHARITY.address` stays in the config typed as `Partial` with empty strings — when you paste the new address tomorrow, every surface re-populates automatically.
- Skips `/auth` and `/admin/*` (already excluded from sitemap).

## Out of scope (can do next)

- Question-based H2s / answer boxes on existing pages
- Internal linking pass between knee-OA cluster
- Content gap pages (work, mental health, daily living)
- Backlink outreach
