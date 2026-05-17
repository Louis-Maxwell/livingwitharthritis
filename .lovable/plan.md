# Fix the third FacesStrip image

The third card on the landing-page "Real People · Real Routines" strip (Joan & Peter) currently pulls from an Unsplash URL that doesn't render reliably. Swap it for a bespoke, on-brand image.

## Steps

1. Generate a premium photo to `src/assets/faces-joan-peter.jpg`
   - Prompt: "Cinematic editorial photograph of an elderly British couple in their early seventies stretching gently together in a bright, sunlit living room. Warm natural light, soft shadows, calm dignified mood, neutral interior with crimson accent cushion, shallow depth of field, shot on 50mm, documentary realism, magazine-quality."
   - Aspect: 4:5 portrait (800×1000), `model: standard`, `transparent_background: false`.

2. Update `src/components/landing/FacesStrip.tsx`
   - Import the new asset: `import joanPeterImg from "@/assets/faces-joan-peter.jpg";`
   - In the third `FACES` entry, set `image: joanPeterImg`.
   - Drop the `srcSet` / `sizes` / `referrerPolicy` props for this card only (local bundled asset doesn't need the Unsplash CDN helper). Keep `loading="lazy"`, `decoding="async"`, width/height.

3. Visual QA in the preview at `/` — confirm the third card renders sharp, the gradient and caption stay legible, and the hover zoom still works.

## Technical notes

- Local imports go through Vite's asset pipeline, so we lose the Unsplash 400/640/800 srcset for that card — acceptable given the source image is already sized at 800×1000 and the card slot is ~400px wide on desktop.
- Other two cards (Margaret, Ronald) stay on Unsplash unchanged.
- No copy, layout, animation, or component-structure changes.
