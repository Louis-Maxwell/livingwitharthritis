## Goal

Make the entire site — public pages and admin — render in only two colours:

- **White** (`#FFFFFF`) — all surfaces (backgrounds, cards, popovers, inputs)
- **Brand red** (`hsl(350 85% 42%)`) — all ink (text, icons, borders, accents, charts)

No black, no grey, no gold/navy/violet/emerald/etc. Body text becomes red-on-white; primary CTAs become white-on-red. This is the user's explicit choice (pure interpretation, accepting reduced contrast on long-form content).

## Approach — token-first

The codebase already routes almost everything through semantic tokens in `src/index.css` + `tailwind.config.ts`. The cleanest senior-engineer move is to **rewrite the tokens once**, then sweep the small number of components that hardcode raw colours. This is ~1 file of real design work plus mechanical cleanup.

## Step 1 — Rewrite `src/index.css` tokens

Collapse every token to one of two HSL values: `0 0% 100%` (white) or `350 85% 42%` (red). Affects `:root` and `.dark` (dark mode also becomes red/white — inverted: red surface, white ink).

- `--background`, `--card`, `--popover`, `--accent`, `--muted`, `--secondary`, `--input`, `--sidebar-*` surfaces → white
- `--foreground`, `--card-foreground`, `--popover-foreground`, `--muted-foreground`, `--accent-foreground`, `--secondary-foreground`, `--border`, `--ring` → red
- `--primary` stays red; `--primary-foreground` stays white
- Legacy aliases (`--gold`, `--navy`, `--emerald`, `--sky`, `--violet`, `--coral`, `--teal`, `--magenta`, `--indigo`, `--lime`, `--amber`, all `--tint-*`, `--warm`) → all red or white as appropriate
- All `--gradient-*` → solid red or red→white linear
- All `--shadow-*` → red-tinted (`hsl(350 85% 42% / α)`) instead of black rgb
- `--destructive` stays red

## Step 2 — Sweep hardcoded colours

Replace raw Tailwind colour utilities that bypass the token system. Targets (from grep):

- `bg-black`, `text-black`, `border-black`, `bg-white`, `text-white` used in non-themed contexts → standardise to `bg-background`/`text-foreground`/`bg-primary`/`text-primary-foreground`
- `bg-navy*`, `text-navy*`, `bg-emerald*`, `bg-sky*`, `bg-violet*`, `bg-coral*`, `bg-teal*`, `bg-magenta*`, `bg-indigo*`, `bg-lime*`, `bg-gold*`, `bg-amber*` (and their `text-`/`border-`/`from-`/`to-`/`via-` variants) → `bg-primary` / `text-primary` / `border-primary`
- Tailwind palette literals (`text-gray-*`, `bg-slate-*`, `text-zinc-*`, `bg-red-500`, etc.) found in admin/tool pages → semantic tokens
- Inline `style={{ color: '#…' }}` / `backgroundColor` → semantic tokens

Files in scope (from initial scan): `src/components/HeroSection.tsx`, `src/components/ReadNextCards.tsx`, all `src/components/landing/*Section.tsx`, `src/components/tools/SymptomQuiz.tsx`, `src/components/tools/InflammationCalculator.tsx`, `src/components/pedometer/PedometerApp.tsx`, `src/components/ZakatCalculator.tsx`, `src/components/exercises/ExerciseVideoModal.tsx`, all `src/pages/conditions/*`, `src/pages/exercises/*`, `src/pages/diet/*`, `src/pages/myths/*`, `src/pages/SelfHelpTool.tsx`, `src/pages/ZakatAppeal.tsx`, `src/pages/ArthritisStarterGuide.tsx`, `src/pages/CityArthritisPage.tsx`, `src/pages/CityConditionPage.tsx`, `src/pages/AdminEmails.tsx`, `src/pages/AdminPsiDashboard.tsx`, plus shadcn primitives that hardcode `bg-black/80` overlays (`dialog.tsx`, `alert-dialog.tsx`, `drawer.tsx`) — change overlays to `bg-primary/40`.

## Step 3 — Visual / image polish

- `src/components/landing/GridBg.tsx` blur orbs use `bg-primary/20` and `bg-violet/10` → both become `bg-primary/20` (violet token already aliased to red in step 1, but make it explicit).
- Hero/landing photos and Openverse images stay as-is (photographic content is exempt from a "2-colour palette" rule — the chrome around them is what carries the brand).
- Chart fills in admin pages (`AdminPsiDashboard`) → single red series on white.

## Step 4 — Memory + verification

- Update `mem://style/visual-identity` to record: strict 2-colour red + white, no black ink, dark-mode is inverted red/white.
- Verify by visiting `/`, `/about`, `/diet`, `/exercises`, `/donate`, `/admin/dashboard`, `/admin/psi-dashboard` in the preview and confirming no non-red, non-white chrome remains.
- Run the build to catch any token references broken by the sweep.

## Technical notes

- All colour values stay in HSL inside `index.css` per project convention.
- No component API changes; this is purely a styling pass.
- Accessibility: red-on-white at `hsl(350 85% 42%)` gives ~5.1:1 contrast vs white — passes WCAG AA for normal text. White-on-red passes the same. The user has accepted the trade-off vs keeping a dark ink colour.
- Dark mode (`prefers-color-scheme: dark`) becomes red surface + white ink — still 2 colours, no third tone introduced.

## Out of scope

- No copy changes, no layout changes, no component refactors beyond the colour sweep.
- Photographic images, logos in `/public`, and embedded video posters are not recoloured.
