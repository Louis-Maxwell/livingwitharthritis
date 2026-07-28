## Goal

Replace the existing logo (red text badge + old stick-figure SVG mark) with the uploaded logo: a red stick figure with raised arms beside the bold red wordmark "LIVING WITH ARTHRITIS".

## Approach

The upload is a photograph of a screen (slightly skewed, off-white background, JPEG noise), so embedding it directly would look blurry and wouldn't scale or work on dark mode. Instead I'll recreate it as a crisp vector logo that matches the shape and proportions exactly — same figure (round head, arms raised in a V, legs apart), same bold condensed uppercase wordmark, same brand red (`hsl(var(--primary))`), transparent background.

## Changes

1. **New component `src/components/SiteLogo.tsx`**
   - Inline SVG: stick-figure mark + optional wordmark, both using the primary red token so dark mode and theming keep working.
   - Props: `variant` ("full" | "mark") and `className`.

2. **`src/components/Header.tsx`**
   - Replace the red text badge in the logo bar with `<SiteLogo variant="full" />` inside the existing homepage button.
   - Replace the old inline `LogoMark` in the mobile menu with `<SiteLogo variant="mark" />`, and delete the old `LogoMark` definition.
   - The "Motion is Lotion" tagline is not part of the new logo — I'll keep it as a small line under the logo unless you'd rather drop it.

3. **`src/components/Footer.tsx`**
   - Swap the plain "Living With Arthritis" text wordmark for `<SiteLogo variant="full" />`.

4. **Favicon**
   - Generate a square PNG of the stick-figure mark, write it to `public/favicon.png` (already referenced in `index.html`), and remove the stale `public/favicon.ico`.

## Verification

Run the production build/typecheck and take a preview screenshot of the header, mobile menu and footer to confirm the logo renders sharply at all sizes.
