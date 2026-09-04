# Event Poster Fix — Date Correction + Polish

Fix the date mistake on the Living With Arthritis event poster: 11 September 2026 is a **Friday**, not Thursday. Regenerate the corrected, more polished poster as downloadable PNG + PDF.

## Changes
- Correct the date line to **Friday 11th September** (keep 1:30 pm, Oswestry Library).
- "Improvise" improvements while regenerating:
  - Stronger visual hierarchy: bigger date/time/venue block with crimson highlight band.
  - Add a warm, welcoming photo element (older adults at a gentle exercise / community session, consistent with the landing-page imagery style).
  - Add a short "What to expect" list (gentle exercise tips, healthy eating advice, benefits & daily-living guidance, friendly chat over tea) so visitors know why to come.
  - Keep brand rules: white background, black text, crimson accents, stick-figure logo, "Free to attend — just come along", footer with livingwitharthritis.org.uk and Registered charity 1218461.
- Output high-resolution portrait PNG (~1240×1754, A4-friendly) to `/mnt/documents/arthritis-event-poster-oswestry-v2.png`.
- Produce a print-ready PDF: `/mnt/documents/arthritis-event-poster-oswestry-v2.pdf`.
- Visually QA every page (no clipped text, no overlaps, all details legible) before delivering.

## Technical details
- Build the poster with a script (HTML/canvas or PIL) for crisp typography rather than AI image text, guaranteeing legible print text.
- Deliver versioned files (v2), leaving the originals untouched.

No changes to the website itself.
