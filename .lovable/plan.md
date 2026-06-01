## 1. Remove "OpenSource" from the codebase

A search for `open source` / `opensource` / `open-source` returns **no copy** anywhere on the site — the only remaining reference is the filename `src/components/landing/OpenSourceEthosBand.tsx` (the component itself is already exported as `MissionEthosBand`).

Changes:
- Rename `src/components/landing/OpenSourceEthosBand.tsx` → `src/components/landing/MissionEthosBand.tsx`.
- Update the import + usage in `src/pages/Index.tsx` (lines 26 and 215).

No user-facing copy changes — the section already reads "Built for everyone, always" / "Everything we make is free to read".

## 2. New "How we're funded" section

Create `src/components/landing/HowWeAreFundedSection.tsx` explaining the funding model in plain English:

- **Lead line:** "We don't rely on donations alone."
- **Body:** The charity is sustained through **subcontracting partnerships** with **insurance companies, hospitals, and healthcare providers** who serve **MSK (musculoskeletal) patients**. These partners commission us to deliver education, self-management resources, triage support, and physiotherapist-led guidance for their patient populations — which funds the free public service everyone else enjoys.
- **Three pillar cards** (using existing `lucide-react` icons + on-brand red accents, matching `AboutSection` styling):
  1. **Insurance partners** — health & income-protection insurers commission MSK content and self-help pathways for their members.
  2. **Hospitals & trusts** — we subcontract patient-facing arthritis and MSK education that supplements clinical care.
  3. **Healthcare providers** — private clinics, physiotherapy groups, and primary-care networks license our HCPC-reviewed resources.
- **Closing line:** "Every partnership is reviewed for clinical independence. Our guidance is never influenced by who funds us." (preserves the neutrality memory).
- **CTAs:** "Partner with us" → `/corporate-giving`, "See our finances" → `/finances`.

### Where it appears
- Homepage (`src/pages/Index.tsx`): inserted directly after `<MissionEthosBand />` (after line 215).
- `src/pages/Finances.tsx`: embedded near the top so the funding model is explicit on the dedicated finances page too.

### Styling
- Reuse existing semantic tokens (white bg, black text, red accents), `font-display`, `py-24 lg:py-32`, container widths, and the `RevealOnScroll` motion primitive already in the project. No new colors, no new dependencies.

## Notes / things to flag
- This adds the **first explicit mention of partner categories** on the site. Existing memory says "No external partners/sponsorship lists" — we are honouring the spirit by describing **categories of commissioning partners**, not naming specific organisations or logos. If you want named logos later, that would be a separate decision.
- No backend, schema, or auth changes.
