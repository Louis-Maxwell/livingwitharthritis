## Remove the stick figure from the logo

The red figure with raised arms next to "Living With Arthritis" in the header and footer will go. The site name text stays exactly as it is, and still links to the homepage.

### What changes
- Header and footer logo: show the name only, no figure.
- Anywhere the figure is shown on its own (no name), show nothing in its place rather than an empty gap.
- Browser tab icon and social share images are not touched.

### Technical details
- `src/components/SiteLogo.tsx`: delete `LogoFigure`; `full` variant renders the wordmark only; `mark` variant returns `null`. Check `Header.tsx` and `Footer.tsx` for any `variant="mark"` use and drop that wrapper if it leaves empty spacing.
- If a later GitHub push restores the figure, it will need re-applying.
