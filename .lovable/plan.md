## Plan: Add uploaded images to the site

Skip the children photo (off-brand). Use the other two.

### 1. Upload to Lovable Assets CDN
- `engin_akyurt-man-9158644.jpg` → `src/assets/diver-movement.jpg.asset.json`
- `biancavandijk-movement-8255242.jpg` → `src/assets/strength-illustration.jpg.asset.json`

### 2. Image 1 — Diver (B&W, dramatic movement)
**a) Homepage photo break** — add a `PhotoBreak` between existing sections in `src/pages/Index.tsx` with quote like "Motion is lotion — every movement is medicine."

**b) Exercise hub hero** — locate the exercises landing page (`src/pages/Exercises.tsx` or equivalent) and swap/add hero image to the diver, with proper alt text and responsive sizing.

### 3. Image 2 — Strength illustration
Add to the **Exercise Plan** tab of `src/pages/HealthTools.tsx` (or inside `ExercisePlanGenerator.tsx`) as a decorative header illustration above the form, on a cream background that matches the MAP palette.

### 4. Accessibility & SEO
- Descriptive alt text for both images.
- `loading="lazy"` + `decoding="async"` (eager for hero LCP image on exercises page).
- Explicit width/height to prevent CLS.

No content, copy, or design-system changes beyond placing the images.