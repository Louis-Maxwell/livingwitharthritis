# Bring card donations back on the site

## The conflict to settle first
The merged GitHub main (commit 8375fac) removed card donations deliberately. It also added a safety test (`no-removed-backends`) that fails the build whenever backend payment code or the backend library comes back. Bringing back card, Apple Pay and Google Pay giving means bringing that code back, so the test rule has to change too. Approving this plan means card giving takes priority over that rule.

## What supporters will see
- Donate page, quick-donate buttons and the top donation bar open a secure payment window on the site. It is already filled in with the chosen amount, one-off or monthly, and the chosen fund.
- Card, Apple Pay and Google Pay, with a Gift Aid choice that is saved with each gift.
- After paying, supporters land on the existing thank-you page.
- Zakat stays separate. Zakat gifts are labelled for the Gaza appeal only, and the email route already in place stays as the fallback.
- GoFundMe stays as a secondary "other ways to give" link.
- While the site is in test mode, a notice says so.

## Steps
1. Re-create the secure payment function (one-off or monthly at any amount, fund and Gift Aid recorded, return address limited to the charity's own domain).
2. Re-add the payment window to the donation popup, with the GoFundMe/email fallback if it fails to load.
3. Rewire the Donate page, the quick-donate buttons, the top donation bar and the Zakat appeal so they open it, passing the amount and monthly choice. No cool-down that blocks repeat donors.
4. Update the `no-removed-backends` test and the CI notes so they allow exactly this payment code and nothing else.
5. Check in the preview with test card 4242 4242 4242 4242: a one-off gift, a monthly gift, and a Zakat gift.

## You will still need to
Claim the charity's Stripe account in the Payments tab, set the account name to the charity's name (it currently says "Akatsuki"), add the bank account, turn on live payments, then publish.

## Technical details
- Edge function `create-donation-checkout` using the shared gateway Stripe client.
- `price_data` with GBP, embedded checkout, `verify_jwt = false`.
- Pinned `@stripe/stripe-js@9.2.0`, `@stripe/react-stripe-js@6.2.0` and `@supabase/supabase-js`.
- Content Security Policy updated for Stripe domains in `index.html` and `public/_headers`.
