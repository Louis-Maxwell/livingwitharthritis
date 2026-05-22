## Goal
Increase donation conversion on `/` without redesigning the page. Tight, high-impact edits only.

## Findings from the current Index.tsx
Current section order:
1. OAHero → 2. OAProblemBand → 3. FacesStrip → 4. OAPlanPillarsSection → 5. MissionStatementBand → 6. QuoteSection → 7. DonationImpactSection → 8. OpenSourceEthosBand → 9. BlogPreview → 10. FAQSection → 11. NewsletterSection

Issues spotted:
- **`InspiredHeroBand` (full inline donation widget with preset amounts, monthly toggle, Gift Aid uplift) exists in the codebase but is NOT mounted on the landing page.** The current donation section is `DonationImpactSection` (impact copy only, no inline form). Biggest miss.
- The first donation ask appears in section 7 — most visitors never scroll that far. No sticky CTA, no above-the-fold donate button visible on the hero (need to verify).
- No urgency/scarcity device (e.g. "X supporters this month", matched funding window, monthly goal bar).
- Newsletter is the last section — competes with donation as the page's terminal action.

## Plan

### 1. Mount the inline donation widget high on the page
Insert `<InspiredHeroBand />` immediately after `OAPlanPillarsSection` (position 5), so a donation form appears within the first viewport-and-a-half on desktop. Keeps the editorial intro intact but stops burying the ask.

### 2. Add a persistent donate CTA
Verify the Header already has a "Donate" button anchored to `#donate-inline`. If not, add one. Add a lightweight mobile sticky-bottom "Donate £X" bar that scrolls to `#donate-inline` (hidden once the widget is in view via IntersectionObserver).

### 3. Strengthen the hero CTA
Confirm `OAHero` has a primary "Donate" CTA above the fold linking to `#donate-inline`, alongside the existing content CTA. If the primary CTA is currently content-led, demote it to secondary and promote donate to primary.

### 4. Tighten DonationImpactSection
Convert the impact copy into concrete "£X = Y outcome" tiles (e.g. £25 = 1 month of guided exercise plan for one person). Each tile becomes a click target that pre-selects that amount on the inline widget and scrolls to it.

### 5. Re-order for conversion flow
Move `NewsletterSection` above `FAQSection` is wrong — instead, demote Newsletter to a slim inline strip inside the footer area, so the page's final scroll position lands on the donation widget revisited (small "Still thinking? Give £5" repeat band before footer).

### 6. Trust signals next to the form
Inside `InspiredHeroBand`, add a compact trust row under the button: Gift Aid logo text, "Secure Stripe checkout", "UK Charity Commission" badge text. Keep neutrality rules — no external partner logos.

### 7. Micro-copy
- Hero subhead: tighten to one sentence with a number ("Helping 10m+ people in the UK living with arthritis").
- Button label: "Donate £55 now" → "Give £55 today" (slight lift in tests).
- Add Gift Aid uplift inline on the button when toggle ON.

## Out of scope
- Visual redesign / new colour palette
- New routes
- Backend / Stripe changes (widget already wired)
- SEO meta (already handled in earlier passes)

## Files likely touched
- `src/pages/Index.tsx` (mount widget, reorder)
- `src/components/landing/OAHero.tsx` (CTA promotion)
- `src/components/landing/DonationImpactSection.tsx` (impact tiles → amount selectors)
- `src/components/landing/InspiredHeroBand.tsx` (trust row, button copy)
- `src/components/Header.tsx` (verify/add donate CTA)
- New: `src/components/landing/StickyDonateBar.tsx` (mobile)

## Verification
Browser preview at 1046px and 390px; confirm: donate widget visible within ~1.5 scrolls, sticky bar appears/hides correctly on mobile, impact tile click pre-fills amount, no layout regressions.
