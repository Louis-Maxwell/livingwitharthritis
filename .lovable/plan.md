# Bring back card donations on the site

A recent change removed the on-site card checkout. Every Donate button now opens the arthritis-research GoFundMe page. The amount and monthly choices people pick on the site are ignored, so a "£50 / month" choice arrives on GoFundMe as a blank one-off gift.

## Decision needed first
The removal came through your GitHub repository, so it may have been deliberate. Choose one:
- **A. Restore the card checkout (recommended):** card, Apple Pay and Google Pay inside the donation window. The amount, monthly choice, fund and Gift Aid are carried through.
- **B. Keep GoFundMe only:** remove the amount pickers, monthly toggle and "£X/mo" labels, which do nothing, so the page doesn't promise what GoFundMe won't do.

## What gets built (Option A)
- A secure payment function on Lovable Cloud that creates one-off or monthly gifts at the chosen amount. It records the fund and Gift Aid choice. Zakat gifts are kept separate from the general fund.
- The donation window shows the payment form with the chosen amount, and a test-mode notice while in test.
- The Donate page, the Zakat appeal and the quick-donate buttons open this window again, passing their amount and monthly choice.
- No cool-down that blocks donors who go back and try again.
- GoFundMe stays as a secondary "other ways to give" link.

## Technical notes
- Re-create `supabase/functions/create-donation-checkout` and `_shared/stripe.ts` using the gateway client, embedded checkout and `price_data`. Mode is `subscription` for monthly gifts and `payment` for one-off gifts. Set `verify_jwt = false` and validate input with zod.
- Re-create `src/lib/stripe.ts` and `PaymentTestModeBanner`, and rewrite `StripeDonationModal` with `EmbeddedCheckoutProvider`.
- Re-add `@stripe/stripe-js@9.2.0` and `@stripe/react-stripe-js@6.2.0`, plus the Stripe entries in the CSP.
- Wire `Donate.tsx`, `ZakatAppeal.tsx` and `QuickDonateButton.tsx` back to the modal. Zakat buttons switch from the email pledge to `fundType="zakat"`.
- Afterwards: complete payments go-live in the Payments tab, then republish.
