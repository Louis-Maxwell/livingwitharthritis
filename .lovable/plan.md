## Audit

All key pages already emit `og:title` and `og:description`. The gap is `og:image` (and the matching `twitter:image`). 28 pages with their own `<Helmet>` block ship without an image, plus the shared `ConditionPageTemplate` (8 condition pages) is missing it.

Default sitewide image: `https://livingwitharthritis.org.uk/images/hero-community.jpg` (already used by `SeoHead.tsx` and present in `public/images/`). Recommended dimensions are 1200×630.

## Changes

### 1. ConditionPageTemplate — fix 8 pages in one edit
`src/components/conditions/ConditionPageTemplate.tsx`, after line 170 (`og:site_name`), add:

```tsx
<meta property="og:image" content={data.ogImage ?? `${SITE_URL}/images/condition-${data.slug}.jpg`} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content={data.metaTitle} />
<meta name="twitter:image" content={data.ogImage ?? `${SITE_URL}/images/condition-${data.slug}.jpg`} />
```

Add an optional `ogImage?: string` to `ConditionPageData`. For conditions without a dedicated image (`lupus`, `juvenile-arthritis`), fall back to `hero-community.jpg` via a small `getConditionImage()` helper that checks against the known list.

### 2. Page-level Helmet blocks — add og:image + twitter:image to each
Insert two lines into each `<Helmet>` (use `hero-community.jpg` as the default unless a more specific image fits the topic):

```tsx
<meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
<meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
```

Files (28):
- `Index`-tier: `ExerciseHub`, `DietHub`, `AboutUs`, `BlogHub`, `BlogIndex`, `CommunityHub`, `HealthTools`, `Governance`, `CorporateGiving`, `ArthritisSupportIndex`, `ArthritisStarterGuide`, `ArthritisFlareUps`, `WaitingListHelp`, `SelfHelpTool`, `SelfAssessment`, `Pedometer`, `Buddy`, `BuddyMatch`, `Chat`, `ZakatAppeal`, `tools/WaitingTimeCalculator`
- Utility/legal: `Accessibility`, `AISafety`, `CookiesPolicy`, `PrivacyPolicy`, `TermsConditions`, `NewsletterConfirm`, `DonationSuccess`

Topic-specific overrides where the asset already exists:
- `DietHub` → `/images/nutrition-berries.jpg`
- `ExerciseHub` → keep `hero-community.jpg` (no joint-agnostic exercise image)
- Condition pages handled via the template above.

### 3. Twitter card upgrade
For pages still using `twitter:card = summary`, switch to `summary_large_image` — required for the image preview to render at full width. Affected: `ExerciseHub`, `DietHub`, `AboutUs`, `BlogIndex`, plus the template (already correct).

## Out of scope

- Per-route canonical/og:url cleanup (already correct on these pages).
- Refactoring all hand-rolled Helmet blocks into `SeoHead` — bigger refactor for another pass.
- Generating new branded OG images — using existing assets only.

## Verify after

- Spot-check 3 pages with Facebook Sharing Debugger / Twitter Card Validator.
- `rg "<Helmet"` then `rg -L "og:image"` should return zero pages with Helmet but no image.
