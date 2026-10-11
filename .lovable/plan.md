# Put the new red banner headline back

The earlier headline change was undone, most likely by an update pushed straight to GitHub. The banner shows the old wording again.

Change the big white headline in the red banner on the homepage to:
"Providing practical advice, support and evidence-based guidance for people living with arthritis and frailty."

Nothing else in the banner changes.

## Technical details
- `src/components/landing/OAHero.tsx` ~line 50-51: replace the headline text.
- `index.html` line 284: same text in the pre-load shell.
- Afterwards, the change needs to be kept on GitHub's main version too. Otherwise the next GitHub push will undo it again.
