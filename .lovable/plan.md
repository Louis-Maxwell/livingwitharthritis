# Restore card donations

Right now the Donate button does not take supporters to a card checkout. Unless a
hosted payment link has been configured, it opens a pre-filled email asking us to
send a payment link, and shows a message that mentions an internal setting name.
That means someone wanting to give £20 cannot complete a donation on the site.

The checkout that used to run on our own server was removed in an earlier cleanup,
so this needs to be put back before donations work again.

## Two ways to fix it

**Option A — full card checkout on the site (recommended)**
Rebuild the donation checkout on Lovable Cloud so the Donate button sends people
straight to a secure Stripe payment page with the amount, currency, fund and
one-off/monthly choice already set, then returns them to the thank-you page.
Requires your Stripe secret key to be added as a private setting.

**Option B — quick stopgap**
Use a hosted Stripe payment link you create in your Stripe dashboard. Faster, but
the donor re-enters the amount and we lose the fund/Gift Aid context.

## What gets built (Option A)

- A donation checkout function on Lovable Cloud that creates a Stripe Checkout
  session (one-off or monthly), carrying amount, currency, fund and Gift Aid choice.
- The donation window calls it and redirects to the returned Stripe page; the
  existing thank-you page stays the destination on success.
- Email fallback only if the checkout genuinely fails, with donor-friendly wording —
  no internal setting names shown to supporters.

## Technical notes

- New edge function `create-donation-checkout` using the Stripe SDK and the
  `STRIPE_SECRET_KEY` secret; returns `{ url }`.
- `src/components/StripeDonationModal.tsx`: restore `supabase.functions.invoke`
  and `window.location.href = url`; keep `VITE_STRIPE_DONATE_URL` only as an
  optional override; replace the config-mentioning toast with plain wording.
- Success/cancel URLs point at the existing `/donation-success` route.

## Needed from you

Your Stripe secret key (for Option A), or a hosted Stripe payment link (Option B).
