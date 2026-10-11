# Replace the red banner headline

Change the big white headline in the red banner on the homepage from
"Free, physio-reviewed help for people living with arthritis — and those who care for them"
to:
"Providing practical advice, support and evidence-based guidance for people living with arthritis and frailty."

Nothing else in the banner changes (small top line, paragraph, buttons, photo stay as they are).

## Technical details
- `src/components/landing/OAHero.tsx` line ~49-52: replace the headline span text.
- `index.html` line 284: same text in the pre-load shell so the page doesn't flicker on load.
- The boot-hero test only checks the paragraph, so it keeps passing.
