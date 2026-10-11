# Put the new red banner headline back (third time)

The banner has gone back to the old wording again. This is the second time the change has been undone in about 30 minutes. Each time, an update pushed straight to the connected GitHub project replaced the work done here. Changing the text here again will fix it for now, but the next GitHub push will probably undo it again.

## What changes
The big white headline in the red banner becomes:
"Providing practical advice, support and evidence-based guidance for people living with arthritis and frailty."

Nothing else in the banner changes.

## To make it stick
Whoever is pushing to GitHub (Louis-Maxwell/livingwitharthritis) needs to include this change in their version. They can do that by updating their copy from GitHub before they push again. Otherwise every push from them puts the old headline back.

## Technical details
- `src/components/landing/OAHero.tsx` ~line 50-51: replace the headline text.
- `index.html` line 284: same text in the pre-load shell.
- Reinstall `@supabase/supabase-js` if it has gone from package.json again, so the preview keeps loading.
