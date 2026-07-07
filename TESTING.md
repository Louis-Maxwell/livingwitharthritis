# Testing

This project has four layers of automated tests. Every layer runs on every
pull request via `.github/workflows/tests.yml` and must pass before merge.

## Layers

| Layer | Runner | Location | Scope |
| --- | --- | --- | --- |
| Unit + integration | Vitest + jsdom | `src/**/*.{test,spec}.{ts,tsx}` | React components, hooks, utility functions |
| Accessibility | Vitest + jsdom + axe-core | `src/**/*.a11y.test.tsx` | WCAG 2.1 AA rules on rendered components |
| Edge function logic | Deno test | `supabase/functions/**/*.test.ts` | Zod schemas, safety helpers, prompt-injection regression |
| Visual + E2E | Playwright (Chromium) | `tests/visual/*.spec.ts` | Screenshot diff, responsive overflow, form submission flow |

## Running locally

### Vitest (unit + accessibility)

```bash
bunx vitest run                                       # full suite
bunx vitest run src/components/landing/ContactSection # scoped to Contact section
bunx vitest                                           # watch mode
```

Accessibility tests live next to the components they cover with an
`.a11y.test.tsx` suffix. They render the component in jsdom, run axe-core
against the DOM with the `wcag2a`, `wcag2aa`, `wcag21a`, and `wcag21aa`
tag sets enabled, and fail if any violation is reported.

Currently covered:

- `src/components/landing/ContactSection.a11y.test.tsx`
- `src/components/ChatBot.a11y.test.tsx`

### Deno tests (edge functions)

The chat prompt-injection regression suite imports the Zod schema and
`buildProfileBlock` directly — no live edge runtime needed:

```bash
deno test --allow-net --allow-env --allow-read \
  supabase/functions/chat/injection.test.ts
```

For tests that call a live function, start a local runtime first:

```bash
supabase functions serve chat --no-verify-jwt &
deno test --allow-net --allow-env supabase/functions/chat/
```

### Playwright (visual regression + E2E)

Playwright is already in `devDependencies`. Install browsers once:

```bash
bunx playwright install chromium
```

Then run in a second terminal while `bun run dev` is up:

```bash
bunx playwright test tests/visual/
```

Point at a different origin with:

```bash
PLAYWRIGHT_BASE_URL=https://livingwitharthritis.org.uk bunx playwright test tests/visual/
```

The first run writes baselines to `tests/visual/__screenshots__/`. Commit
them alongside intentional design changes. Refresh baselines after an
approved redesign with `--update-snapshots`.

Suites in `tests/visual/`:

- `contact-section.spec.ts` — mobile / tablet / desktop screenshots of
  `#contact`, plus horizontal-overflow and card-dimension assertions.
- `contact-section-e2e.spec.ts` — fills the form with valid data,
  intercepts Supabase network calls with `page.route`, asserts the POST
  to `functions/v1/send-contact-email` fires with the expected payload,
  and checks the "Message received!" success screen renders. No real
  rows are written.

## GitHub Actions

Workflow: `.github/workflows/tests.yml`. Three jobs run in parallel on
every pull request against `main`:

1. **Vitest (unit + a11y)** — `bunx vitest run` against the full suite.
2. **Deno (edge function tests)** — `deno test` on the chat injection
   regression suite.
3. **Playwright (visual + E2E)** — builds the app, serves the `dist`
   output on `:4173`, then runs everything under `tests/visual/`.
   The Playwright HTML report is uploaded as a build artifact so failing
   runs can be inspected without re-running locally.

All three jobs are required for merge. Older runs on the same ref are
cancelled automatically via `concurrency`.

## Contact section: contrast audit

The Contact section uses only the following color tokens on a `bg-white`
surface. Contrast ratios measured against the light theme in
`src/index.css`:

| Token | Value | On white | WCAG |
| --- | --- | --- | --- |
| `text-foreground` | `hsl(0 0% 6%)` — near-black | ~19.8:1 | AAA (normal + large) |
| `text-muted-foreground` | `hsl(0 0% 18%)` — dark grey | ~12.6:1 | AAA |
| `text-foreground/70` | 70% black over white ≈ `#4D4D4D` | ~7.7:1 | AAA |
| `text-foreground/60` | 60% black over white ≈ `#666666` | ~5.7:1 | AA (normal), AAA (large) |
| `text-primary` (#EE2737) | Brand red on white | ~4.55:1 | AA (normal), AAA (large) |
| `text-primary-foreground` on `bg-primary` | White on #EE2737 | ~4.55:1 | AA (normal), AAA (large) |
| `text-destructive` (#EE2737) | Error text on white | ~4.55:1 | AA (normal) |
| `placeholder:text-muted-foreground` | `hsl(0 0% 18%)` | ~12.6:1 | AAA |

All text tokens meet WCAG 2.1 AA (4.5:1) for normal-weight body copy.
Brand-red text (`text-primary`, `text-destructive`) is at the AA
threshold; keep those uses restricted to inline error messages and short
accents, and never on top of any lighter background.

Non-text UI (`border-border` ≈ `hsl(30 18% 86%)` on white) sits below
the 3:1 contrast bar of WCAG 2.1 SC 1.4.11 when read as an essential
control boundary. It is acceptable here because the cards remain
distinguishable via layout, hover state (which raises the border to
`border-primary`, ~4.55:1), and focus ring (`ring-primary`) — none of
the cards rely on their border alone to convey state.

To re-verify after theme changes, re-run the axe tests
(`bunx vitest run src/components/landing/ContactSection.a11y.test.tsx`)
and recompute ratios for any new tokens against the current
`--background` / `--foreground` values in `src/index.css`.

## Skipping tests

Never commit `.only` / `.skip` / `xit` — the CI job will fail if the
Vitest reporter records any skipped tests.
