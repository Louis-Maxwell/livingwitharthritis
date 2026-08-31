# Fix "Give monthly" one-off charge + sitemap & internal-link check

## 1. Fix: "Give monthly" (Sadaqah Jariyah) takes a one-off payment

Confirmed real. On `/zakat-appeal`, the "Give monthly" button flows through
`handleGive(amount)` which opens `StripeDonationModal` without the `recurring`
prop, so the donor is charged once. The backend (`create-donation-checkout`)
already supports `recurring: true` (creates a Stripe subscription), so only
frontend wiring is needed.

- **`src/pages/ZakatAppeal.tsx`**
  - Add a `isRecurring` state; extend `handleGive(amount, source?)` to set it
    when `source === "sadaqah-jariyah"`.
  - Pass `recurring={isRecurring}` to `StripeDonationModal`; reset it when the
    modal closes or a non-monthly card/tier is chosen.
- **`src/components/appeal/IslamicGivingCards.tsx`**
  - Already calls `onGive(amount, type.id)` — update the call site in
    ZakatAppeal to forward the id (currently dropped: `onGive={(amount) => handleGive(amount)}`).

No backend changes. Monthly donors will now get a Stripe subscription checkout
with the "Monthly Giving" modal UI that already exists.

## 2. Sitemap update

Verified: `scripts/generate-sitemap.ts` auto-discovers routes from `src/App.tsx`,
so `/about` (where the founder story now lives) is already included and no
founder-specific sitemap entries exist. Action: run the generator so
`public/sitemap.xml` is regenerated from current routes (no manual edits
needed; no `<lastmod>` changes — the script does not emit them).

## 3. Internal link re-check (founder story)

Verified clean:
- `FounderStoryBand` is only referenced from `AboutUs.tsx` (intended new home).
- Its "Meet the team" button (`#team`) matches `id="team"` on the About page.
- No links anywhere point to the removed landing-page founder section.

Bonus fix found during the audit (pre-existing, unrelated to the founder move):
several pages link to `/#conditions`, `/#donate`, and `/#involved`, but those
anchor ids do not exist on the landing page, so the links land at the top of
the homepage. Fix by adding the missing ids to the matching landing sections
(`conditions` → conditions band, `donate` → donate band, `involved` →
get-involved section) rather than editing the ~10 linking pages.

## Technical details

- Files touched: `src/pages/ZakatAppeal.tsx`,
  `src/components/appeal/IslamicGivingCards.tsx` (call-site only),
  landing section components for the three anchor ids, regenerated
  `public/sitemap.xml`.
- Verification: production build + typecheck; resolve monitoring finding
  `ee654c07-cd40-58d7-9668-89e498b9e978` as fixed.
