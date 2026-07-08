## Scope

Three `.NEW.tsx` files remain (TrustCredibility.NEW was cleaned in the prior turn):

| File | Placeholders? | Recommended action |
|---|---|---|
| `src/pages/PrivacyPolicy.NEW.tsx` | Yes — `TODO: ZAxxxxxxx` ICO number, fabricated Oswestry postal address, hardcoded `1218461`, hardcoded email/phone | **Clean up + wire to config** |
| `src/pages/HomePage.NEW.tsx` | Yes — 1 `TODO` (email signup wiring); plus non-placeholder issues (hardcoded `red-600`/`bg-white`, Unsplash testimonial images, non-existent `/hero/*.jpg` and `/og/*.png` paths, hardcoded `1218461`, no `Header`/`Footer`) | **Minimal placeholder pass only** (see below). A full redesign is out of scope. |
| `src/pages/KeywordStrategyV2.NEW.tsx` | No TODOs, no placeholder strings — reads real data via `useKeywords40k` + `keywords-paid.generated` | **No change** |

None of these files are routed (`rg` for imports of `*.NEW` returns nothing), so edits are safe drop-in candidates.

## 1. `PrivacyPolicy.NEW.tsx`

Bring the copy in line with `src/config/charity.ts`, `src/config/contact.ts`, and the project memory rule *"no placeholder registration numbers"*:

- Import `CHARITY` and `hasCharityAddress` from `@/config/charity`, plus `CONTACT_EMAILS`, `CONTACT_PHONE` from `@/config/contact`.
- **Section 1 — Data controller.** Replace the hardcoded charity number and the Oswestry address with `CHARITY.legalName`, `CHARITY.number`, `CHARITY.jurisdiction`, `CHARITY.siteUrl`. Wrap the postal-address sentence in `hasCharityAddress() && …` so the address block is hidden until a verified one is added (matches the same pattern used in `CharityRegBadge`).
- **ICO paragraph.** Delete the whole "We are registered with the Information Commissioner's Office … `TODO: ZAxxxxxxx`" sentence rather than publish a placeholder registration number. Keep the surrounding UK GDPR / DPA 2018 sentence.
- **Meta + title.** Use `CHARITY.shortName`, `CHARITY.number`, `CHARITY.siteUrl` in `<title>`, description, og:*, and `<link rel="canonical">`.
- **Section 12 — Contact.** Same treatment: `CHARITY.legalName` + `CHARITY.number`, hide the postal line via `hasCharityAddress()`, use `CONTACT_EMAILS.info` and `CONTACT_PHONE`.
- Update the header comment to note that the ICO reference will be added once the data protection fee is registered — no placeholder retained.

## 2. `HomePage.NEW.tsx`

This file is a design draft, not a drop-in replacement (no `Header`/`Footer`, hardcoded `red-600`/`bg-white`/`bg-gray-50` violating the token/dark-mode rule, non-existent asset paths, Unsplash testimonial images, exposes charity number `1218461` as a stat block). Turning it into the live homepage is a redesign, not a placeholder pass. I'll limit this turn to the two placeholder-class fixes and leave the rest as-is:

- Import `CHARITY` from `@/config/charity`. Replace the hardcoded `1218461` in the `<meta name="description">` and in the "Impact So Far" stat card with `CHARITY.number`.
- Replace the `// TODO: wire to email service` block with a call to the existing newsletter subscription pattern used by `NewsletterSignup` (which posts to the `confirm-newsletter` edge function). Simplest: swap the inline form for `<NewsletterSignup variant="inline" source="homepage-hero" />` so it inherits the real flow, error handling and CHARITY-consistent styling.

Not doing in this file (would need a separate design pass): color-token remediation, adding `Header`/`Footer`, replacing Unsplash testimonial faces with `src/data/facesOfArthritis.ts` entries, fixing the missing `/hero/*.jpg` / `/og/*.png` image paths, and adding `<Helmet>` fields for canonical / og:*.

## 3. `KeywordStrategyV2.NEW.tsx`

No placeholder content — it reads live data via `useKeywords40k` and `PAID_KEYWORDS`. No changes.

## Verification

- `rg -n "TODO|1218461|ZAxxxxxxx|Oswestry" src/pages/*.NEW.tsx` → only the header-comment mention should remain.
- Type-check passes (`bunx tsgo --noEmit`).
- Files remain unrouted; live `/privacy` and `/` are untouched.

## Out of scope

- Redesigning `HomePage.NEW.tsx` to match the project design system.
- Legal review of the privacy copy (memory rule already flags this).
- Any generated data files (keywords JSON, article scaffolds) — unrelated to placeholders in `.NEW` pages.
