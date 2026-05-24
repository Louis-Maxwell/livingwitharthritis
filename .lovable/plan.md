# Make the four homepage CTAs clearly visible

The four buttons you mentioned all live in the same homepage band ("Resources for you"):

1. **Contact us** → `/contact`
2. **See pain-relief guide** → `/arthritis-flare-ups`
3. **Read the guide** → `/conditions/osteoarthritis`
4. **Browse FAQ** → `/faq`

They are rendered today as **outlined** pill buttons (red text + red border on a pale grey band). After the recent palette reset they read as faint and easy to miss.

## What I'll change

Edit `src/components/landing/ResourcesForYouSection.tsx` only — purely presentational, no routing or content changes.

- Switch each CTA from an outlined pill to a **solid red button** with white text (`bg-primary text-primary-foreground`), keeping the arrow icon and the same href/label.
- Add a clear hover state (slightly darker red) and a visible focus ring for keyboard users.
- Bump the button to `py-3.5 px-7`, `text-base`, `font-semibold` so the label reads strongly against both the white and tinted section backgrounds.
- Strengthen the eyebrow label so the section heading hierarchy still reads cleanly above the now-bolder button.

## What I won't change

- No copy edits, no new buttons, no link targets moved.
- No changes to the hero, header, footer, or other sections.
- No design-token edits — only Tailwind classes inside this one component.

## Verification

- Re-open `/` in the preview and confirm all four CTAs are clearly visible on desktop and at the current 1046px viewport.
- Tab through the section to confirm the focus ring is visible.
