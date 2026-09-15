# Week 1 ship notes (Phase 1 — homepage / trust / a11y / hubs)

**Shipped in repo:** Vite/React homepage hierarchy, trust strip, quick pathways, tools band, HCP + Resource Centre aggregators, light mailto/donate analytics, partial a11y Sprint A.

**Not claiming:** WCAG 2.2 AA complete. Full accessibility audit still open (see remaining below).

---

## What landed

| Item | Status |
|---|---|
| P1-02 Homepage CTA / IA hierarchy | Done — hero ≤2 CTAs; hubs max 5; tools band; Zakat collapsed |
| P1-07 Trust strip | Done — under hero; charity / HCPC / educational / independence |
| P1-08 HCP + Resource Centre aggregators | Done — thin pages linking existing routes only |
| P1-05 A11y Sprint A (partial) | Partial — skip link, focus styles, landmarks, accessible names on new UI |
| P1-03 Contact off mailto | **Not** done — mailto UX clarified + GA events only (no Resend/Supabase) |

## Route gaps checked

- Newly diagnosed, OA, RA, PsA, JIA (`/conditions/juvenile-arthritis`), AS (`/conditions/ankylosing-spondylitis`) all exist — quick pathways link to real pages.
- No invented clinical content on hub aggregators.

## Remaining a11y / product work (honest)

- Full keyboard audit of mega-nav + mobile drawer focus trap edge cases.
- Colour-contrast pass on crimson hero / condition pill band against AA.
- Skip-link smoke test on every major template (not only homepage).
- Automated axe in CI for homepage + hubs (budgeted under P1-05).
- Contact still mailto-only — real form backend is later (P1-03); do **not** restore Supabase/Resend in this stack.
- Shop remains in global nav (deprioritised on homepage only).
- Research meter still shows £5,000 / £50,000 — confirm with Louis before changing.

## Still needs Louis

1. **GA4 export** — Year-0 baseline from property `G-ZLLSD3PXZ9` (P1-01); confirm `donation_click` / `mailto_click` appear after publish.
2. **Clinical spot-check** — homepage trust wording, HCP hub list, medication card trio.
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
