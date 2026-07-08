## Goal
Make `src/config/charity.ts` the true single source of truth for charity facts (URL, contact, founding, regulator links, fundraising code), and remove hardcoded duplicates from pages/schema that already talk about the charity.

## 1. Extend `src/config/charity.ts`

Add these fields to `CHARITY` (keep existing ones unchanged):

- `siteUrl: 'https://livingwitharthritis.org.uk'` — canonical base URL used across `<link rel="canonical">`, og:url and JSON-LD.
- `websiteDomain: 'livingwitharthritis.org.uk'` — bare host for prose ("Website: livingwitharthritis.org.uk").
- `contactEmail: 'info@livingwitharthritis.org.uk'` — mirrors `CONTACT_EMAILS.info`, imported where only the primary charity email is needed.
- `foundedYear: 2020` — derived from `registrationDate` for prose ("founded in 2020").
- `fundraisingCodeUrl: 'https://www.fundraisingregulator.org.uk/code'` — for the Code of Fundraising Practice link on Trust/Donate.
- `charityCommissionUrl: 'https://www.gov.uk/find-charity-information'` — public lookup link (distinct from `regulatorUrl` which points at the regulator body).

Also export a small helper:
- `charityRegisterLinkText()` → e.g. `Registered Charity in England & Wales No. 1218461` (already exists as `charityRegLine`; alias/keep).

No breaking changes to existing exports.

## 2. Wire fields into pages

Replace hardcoded strings with imports from `@/config/charity`. Scope limited to files that already reference the charity or its URL/email/type.

- **`src/lib/jsonLd.ts`** — replace local `SITE_URL` constant with `CHARITY.siteUrl`.
- **`src/pages/TrustCredibility.NEW.tsx`** — swap the local `BASE` for `CHARITY.siteUrl`; use `CHARITY.fundraisingCodeUrl` for the Code of Fundraising Practice link.
- **`src/pages/TrustCredibility.tsx`** (live page) — use `CHARITY.siteUrl` in JSON-LD/meta where currently hardcoded.
- **`src/pages/Governance.tsx`** — replace hardcoded `"Charitable Incorporated Organisation (CIO)"` / regulator strings and canonical URL with `CHARITY.type`, `CHARITY.regulator`, `CHARITY.siteUrl`.
- **`src/pages/TermsConditions.tsx`** — replace `livingwitharthritis.org.uk` prose and canonical/og URLs with `CHARITY.websiteDomain` / `CHARITY.siteUrl`; use `CHARITY.legalName` in body copy.
- **`src/pages/Donate.tsx`** — canonical/og:url from `CHARITY.siteUrl`; site name from `CHARITY.shortName`.
- **`src/pages/AboutUs.tsx`** — site name/legal name via `CHARITY` in meta; founded year via `CHARITY.foundedYear` if the copy references a year.
- **`src/pages/PrivacyPolicy.tsx`**, **`src/pages/Complaints.tsx`**, **`src/pages/Safeguarding.tsx`** — canonical and og:url from `CHARITY.siteUrl`; regulator name/link on Complaints from `CHARITY.regulator` / `CHARITY.regulatorUrl`.

Not touched: edge functions (`supabase/functions/**`) — they can't import from `src/`. Left as-is per existing comment in `contact.ts`. If mirroring is wanted later, that's a separate change.

## 3. Verification

- `rg -n "https://livingwitharthritis\.org\.uk" src/pages src/lib` after the edits — should be near-empty (only allowed places: `charity.ts`, image asset URLs).
- `rg -n "Charitable Incorporated Organisation" src/pages` — should return no hits outside constitutional text quoted in `Governance.tsx` (that stays verbatim).
- Type-check / build passes.
- Spot-check `/trust`, `/governance`, `/donate`, `/terms` in preview after implementation.

## Out of scope

- No changes to routes, copy meaning, or design.
- No touching auto-generated files or edge functions.
- No new placeholder facts (trustees, HCPC numbers, Gift Aid, Companies House) — memory rule respected.
