## Goal
Add a clear monthly-vs-one-time donation choice on `/donate` (and tidy up Zakat copy), wired to the existing Stripe checkout path that already supports subscriptions.

## What already exists (reuse, don't rebuild)
- `supabase/functions/create-donation-checkout` already accepts a `recurring: boolean` flag and creates either a one-off Stripe Checkout `payment` session or a `subscription` session with `price_data.recurring = { interval: "month" }`. No fixed Stripe Price IDs needed — pricing is built per session from the chosen amount + currency.
- `StripeDonationModal` already renders both one-time and monthly UI (amount, "/month" suffix, "Cancel anytime" copy) based on a `recurring` prop and forwards it to the edge function.
- `DonationQuickBar` already has a one-time / monthly toggle wired to that modal.

The gap: the dedicated `/donate` page has no amount picker or frequency toggle — it just deep-links to `/zakat-appeal`, which is one-time only.

## Changes

### 1. `src/pages/Donate.tsx` — add a real donate widget
Replace the static "Your Impact" card grid with an interactive donation panel:
- **Frequency toggle** (segmented control): `One-time` / `Monthly`. Default: `One-time`.
- **Amount picker**: presets `£50 / £150 / £200 / £500` (matches existing presets) + a "Custom" input (min £1, max £100,000, matches edge function validation).
- **Impact line** under the amount that updates with the selection (reuse existing impact copy for one-time; show a "× 12 months = £X/year" helper when monthly is selected).
- **CTA**: "Donate £X" or "Give £X / month" — opens `StripeDonationModal` with `fundType="general"`, `currency="GBP"`, `recurring={frequency === "monthly"}`, and the chosen `amount`.
- Keep the hero, "Ways to Give", and "Tax-Efficient Giving" sections unchanged. Remove the hero's `Donate Now` button's `/zakat-appeal` redirect — instead scroll to the new donate widget (`#give`).

### 2. `src/pages/ZakatAppeal.tsx` — fix outdated FAQ
- Update the FAQ entry "Can I set up a recurring Zakat payment?" to reflect that monthly giving is now available on `/donate` (Zakat itself remains one-off per Islamic guidance, so keep Zakat page one-time but point readers to monthly general giving).

### 3. No backend changes
Edge function, Stripe wiring, RLS, and secrets are already in place. No migration, no new secrets.

## Out of scope
- No changes to `DonationQuickBar` (already supports monthly).
- No fixed Stripe Product/Price IDs — sessions are built dynamically, which is the existing pattern.
- No change to recurring Zakat behaviour.
- No changes to the donation success/result pages (they already handle both modes).

## Technical notes
- Frequency state lives in `Donate.tsx` (`useState<"one-time" | "monthly">`).
- Amount stored as `number` (pounds), passed to modal as-is.
- Custom amount validated client-side against the same bounds as `DonationSchema` (`MIN_AMOUNT=1`, `MAX_AMOUNT=100000`).
- Accessibility: toggle uses `role="radiogroup"` with `aria-checked`; amount buttons get `aria-pressed`.
