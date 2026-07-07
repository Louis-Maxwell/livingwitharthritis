## What's broken today

In `src/components/landing/ContactSection.tsx`, the section wrapper uses `bg-accent`, which currently resolves to the brand red. That fights every child:

- The white card backgrounds sit inside a red band and get visually clipped.
- The circular icon badges use `bg-primary/10` (transparent red on red) so they disappear into the background above the card.
- The heading "WE'RE HERE TO HELP" inherits a display-font transform that reads as broken block letters against the red.
- The 4-card grid has no consistent minimum height, so cards jag at different sizes as content wraps.

Project memory rule: **white background everywhere, black text, red is only for buttons / icons / hover accents — never a section background.** The red band is the root cause.

## Redesign direction

Keep the same content and 4 channels (Call, Email, WhatsApp, Contact form), but reset the visual language to match the rest of the site:

1. **Section band**
   - White background, generous vertical padding (`py-24`).
   - Thin top divider hairline for editorial rhythm.
   - Eyebrow label "Get in touch" in small caps, black.
   - H2 in the site's display font, black, sentence case: "We're here to help."
   - Subhead in muted grey.

2. **Channel cards (4-up desktop, 2×2 tablet, stacked mobile)**
   - White card, 1px black hairline border, no shadow at rest.
   - On hover: border thickens to red, card lifts 2px, icon badge fills red.
   - Icon badge: 56px circle, red outline at rest, red fill + white glyph on hover.
   - Fixed card min-height so all four align.
   - Label (Call us / Email us / WhatsApp / Contact form) in uppercase black micro-caps.
   - Primary value line in bold black.
   - Sub line in muted grey.
   - Whole card is the click target with a visible focus ring.

3. **Contact form card below**
   - Stays white, same hairline border treatment as channel cards for consistency.
   - Primary "Send message" button stays red (existing pattern).
   - No other changes to fields, validation, or submit logic.

4. **Motion**
   - Cards fade/slide up on scroll into view (single, subtle reveal — no per-icon micro-interactions).
   - Respect `prefers-reduced-motion`.

## Files touched

- `src/components/landing/ContactSection.tsx` — replace the section wrapper background, restyle the 4 channel cards and heading block, add reveal animation. Form logic, validation, analytics, Supabase calls, and props stay identical.

No other files change. No new dependencies. No backend or data changes.

## Out of scope

- Contact form fields, subjects list, validation rules, submit handler.
- The `/contact` page, WhatsApp URL, phone/email config.
- Any other landing sections.
