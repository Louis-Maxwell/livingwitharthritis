# Week 1 ship notes (Phase 1 — homepage / trust / a11y / hubs / citations / chatbot)

**Shipped in repo:** Vite/React homepage hierarchy, trust strip, quick pathways, tools band, HCP + Resource Centre aggregators, light mailto/donate analytics, a11y Sprint A (homepage + extended templates), clinical citation blocks on key Champions/medicines pages, expanded local chatbot KB.

**Not claiming:** WCAG 2.2 AA complete. Full accessibility audit still open (see remaining below).

---

## What landed

| Item | Status |
|---|---|
| P1-02 Homepage CTA / IA hierarchy | Done — hero ≤2 CTAs; hubs max 5; tools band; Zakat collapsed (`1651b4c`) |
| P1-07 Trust strip | Done — under hero; charity / HCPC / educational / independence (`1651b4c`) |
| P1-08 HCP + Resource Centre aggregators | Done — thin pages linking existing routes only (`1651b4c`) |
| P1-05 A11y Sprint A (partial) | Extended beyond homepage — see a11y section below |
| P1-06 / clinical citations (Champions + medicines) | Done for priority set — real NHS/NICE/Versus Arthritis/GOV.UK links via `ArticleCitations` + `EducationalDisclaimerBox` |
| Local chatbot KB expand | Done — PIP basics, exercise safety, OA vs RA, when-to-seek-care |
| P1-03 Contact off mailto | **Not** done — mailto UX clarified + GA events only (no Resend/Supabase) |

## A11y — what was done this pass

- Skip link: stable `#skip-to-content` + `#main-content` target; focus-visible ring retained.
- Global focus-visible already in `src/index.css` (primary outline).
- Landmarks: `main#main-content` + `role="main"` + `tabIndex={-1}` on BlogIndex (hero inside main), BlogPost, Donate, ExerciseHub (hero inside main), Contact, HCP, Resource Centre, OA/RA condition hubs.
- Footer: each link column wrapped in labelled `<nav>`; Connect block labelled; footer link contrast raised (`foreground/85`) + focus rings.
- Contact form: associated `<label htmlFor>` already present; added visible SR “(required)” beside asterisks.
- Resource Centre: heading `id`s sanitised (no spaces in `aria-labelledby` targets); focus-visible on hub links.
- Cheap contrast: BlogPost cover credit no longer `muted-foreground/70`; footer links darkened.
- Automated: extended light axe check — `ContactSection.a11y.test.tsx` (existing) + new `ResourceCentre.a11y.test.tsx`.

## A11y — still not WCAG AA (honest)

- Full keyboard audit of mega-nav + mobile drawer focus-trap edge cases.
- Colour-contrast pass on crimson hero / condition pill band against AA (brand colours not redesigned wholesale).
- Skip-link / landmark smoke on **every** template (conditions subpages, shop, tools, supplements).
- Automated axe in CI for homepage + all hubs (only Contact + Resource Centre slices so far).
- BlogPost article chrome: h1 still lives in a page `<header>` above `<main>` on the loaded article layout — acceptable for skip-to-body but not perfect single-region heading hierarchy.
- Contact still mailto-only — real form backend is later (P1-03); do **not** restore Supabase/Resend.

## Clinical / citations — what was done

Reviewer named on pages via existing pattern: **Louis Maxwell, HCPC PH128483** (no invented medical board).

Shared sets in `src/data/clinical/ukCitations.ts` (NICE NG226 / NG100 / NG219, NHS condition & medicines pages, Versus Arthritis, CMO physical activity). Wired `ArticleCitations` + `EducationalDisclaimerBox` / `lastReviewed=2026-09-15` on:

- `/guides/painkillers-and-nsaids`
- `/guides/steroids-for-arthritis`
- `/guides/azathioprine-for-arthritis`
- `/guides/febuxostat-for-gout`
- `/conditions/rheumatoid-arthritis`
- `/conditions/hip-arthritis`
- `/guides/shoulder-pain-relief`
- `/guides/can-exercise-make-osteoarthritis-worse`
- `/guides/hip-exercises-for-osteoarthritis`

Also fixed UTF-8 mojibake arrows (`â†’` → `→`) on several guide CTAs.

**Digital gold-pass only** — Louis still owns clinical spot-check per `docs/CLINICAL-REVIEW-CHECKLIST.md` (especially medicines copy that already mentions doses in situ; do not invent new dosing advice).

## Chatbot KB — what was done

- Expanded `pip-benefits` (points/descriptors, diary, GOV.UK/Citizens Advice; link to `/resources/pip-evidence-diary`).
- New `oa-vs-ra` educational comparison (not diagnostic).
- New `exercise-safety` (pace rules, flare modify, red-flag → NHS 111/999).
- Expanded `see-doctor` keywords / chips.
- Unit tests in `arthritisChatFallback.test.ts` for the new matches.

## Remaining product notes

- Shop remains in global nav (deprioritised on homepage only).
- Research meter still shows £5,000 / £50,000 — confirm with Louis before changing.

## Still needs Louis

1. **GA4 export** — Year-0 baseline from property `G-ZLLSD3PXZ9` (P1-01); confirm `donation_click` / `mailto_click` appear after publish.
2. **Clinical spot-check** — Champions + medicines pages listed above; homepage trust wording; HCP hub list.
3. **Lovable publish** — push is to `origin/main`; live site publish/sync is Louis/Lovable workflow (CI gate already expects green SHA).
4. **Research fund figures** — reconfirm £5k raised / £50k goal before any meter change.
5. **Consented stories** — homepage testimonials deliberately omitted until real consented quotes exist.

## Explicitly NOT in “week fully built”

- Forums / community MVP
- Next.js rebuild or Vercel/Cloudflare restore
- Supabase restore
- 200 cornerstone articles
- Full WCAG AA certificate claim
- Invented metrics, testimonials, or Oswestry address
- Restoring Resend or other mail backends
