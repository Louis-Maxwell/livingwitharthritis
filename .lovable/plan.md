

## Plan: Add Pillar Guide Links to Quick Access & Footer

**Goal**: Cross-link the 5 pillar guide pages (`/guides/uk-arthritis`, `/guides/nhs-services`, `/guides/diet`, `/guides/exercise`, `/guides/benefits-pip`) from the homepage and footer to improve internal link equity and discoverability.

### Changes

1. **`src/components/landing/QuickAccessSection.tsx`**
   - Add a "Guides" subsection below the existing hub grid — a compact row of 5 text links styled as pill/tag links (e.g., `📖 UK Arthritis Guide`, `🏥 NHS Services`, `🥗 Diet Guide`, `💪 Exercise Guide`, `📋 Benefits & PIP`)
   - Uses `<Link>` for proper internal routing and SEO crawlability
   - Subtle styling: small text, muted color, border pills — doesn't compete with the main cards

2. **`src/components/Footer.tsx`**
   - Add a new "Guides" column to the footer links object with all 5 pillar pages
   - Positioned between "About Arthritis" and "About Us" columns

### No database or routing changes needed — all 5 routes already exist in App.tsx.

