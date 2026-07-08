## Goal
Route all charity-field access in the updated `.NEW` pages through a single typed helper, so field names, canonical URLs, and reg-number phrasing stay consistent and cannot drift.

## Scope
Only the three refactored pages (as-yet-unshipped `.NEW` variants):
- `src/pages/HomePage.NEW.tsx`
- `src/pages/PrivacyPolicy.NEW.tsx`
- `src/pages/TrustCredibility.NEW.tsx`

Other files that already import `CHARITY` (Footer, Donate, jsonLd, legacy pages) are **out of scope** — leave them untouched to avoid churn beyond the user's request.

## Changes

### 1. Extend `src/config/charity.ts` with a typed facade
Add (do not remove existing exports — they're used elsewhere):

```ts
export type CharityInfo = typeof CHARITY;

/** Single accessor. Returns the frozen charity record. */
export const getCharity = (): CharityInfo => CHARITY;

/** Build an absolute site URL from a root-relative path. */
export const canonicalUrl = (path: string = '/'): string =>
  `${CHARITY.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

/** "registered charity 1218461" — inline phrasing used in meta/body copy. */
export const registeredCharityPhrase = (): string =>
  `registered charity ${CHARITY.number}`;

/** "Living With Arthritis UK — Registered Charity 1218461" */
export const charityFooterLine = (): string =>
  `${CHARITY.shortName} — Registered Charity ${CHARITY.number}`;

/** "Privacy Policy | Living With Arthritis UK" — page title helper. */
export const pageTitle = (label: string): string =>
  `${label} | ${CHARITY.shortName}`;
```

### 2. Refactor the three `.NEW` pages
Replace scattered `CHARITY.foo` reads with a single destructure at the top of the component, and swap ad-hoc strings for the new helpers.

**Pattern applied in each file:**

```ts
import {
  getCharity,
  canonicalUrl,
  pageTitle,
  registeredCharityPhrase,
  charityFooterLine,
  hasCharityAddress,
} from '@/config/charity';

const {
  number, legalName, shortName, type,
  jurisdiction, regulator, registerUrl,
  fundraisingCodeUrl, websiteDomain, address,
} = getCharity();
```

Specific swaps:

| Before | After |
|---|---|
| `${CHARITY.siteUrl}/privacy` | `canonicalUrl('/privacy')` |
| `` `Privacy Policy \| ${CHARITY.shortName}` `` | `pageTitle('Privacy Policy')` |
| `` `... registered charity ${CHARITY.number}) ...` `` | `` `... ${registeredCharityPhrase()}) ...` `` |
| `Living With Arthritis UK — Registered Charity {CHARITY.number}` | `{charityFooterLine()}` |
| `const BASE = CHARITY.siteUrl;` (TrustCredibility) | remove, use `canonicalUrl(path)` at call sites |
| Repeated `CHARITY.number`, `CHARITY.legalName`, etc. in JSX | use destructured locals |

No wording, meta content, or JSX structure changes — this is a pure indirection refactor.

## Out of scope
- Refactoring Footer, Donate, Governance, jsonLd, or non-`.NEW` pages.
- Changing any copy, meta descriptions, or JSON-LD payloads.
- Renaming existing exports (`charityRegLine`, `charityRegisterLinkText`) — kept for back-compat.

## Verification
1. `bun tsgo --noEmit` (or the harness typecheck) passes.
2. `rg "CHARITY\." src/pages/HomePage.NEW.tsx src/pages/PrivacyPolicy.NEW.tsx src/pages/TrustCredibility.NEW.tsx` returns zero matches — proves all access is now via the helper.
3. Visual diff of rendered strings is nil (helpers return the same literals).