# Visual regression tests

Playwright-driven screenshot checks for landing-page sections. These are
kept out of the default Vitest suite because they need a real browser and a
running dev server.

## One-time setup

```bash
bun add -D @playwright/test
bunx playwright install chromium
```

## Running

Start the dev server in one terminal:

```bash
bun run dev
```

Then in another terminal:

```bash
bunx playwright test tests/visual/
```

Point at a different environment with:

```bash
PLAYWRIGHT_BASE_URL=https://livingwitharthritis.org.uk bunx playwright test tests/visual/
```

## Baselines

The first run writes baseline screenshots to
`tests/visual/__screenshots__/`. Commit these alongside intentional design
changes. To refresh baselines after an approved redesign:

```bash
bunx playwright test tests/visual/ --update-snapshots
```

## What's covered

- `contact-section.spec.ts` — Contact section on mobile (375×812), tablet
  (834×1194), and desktop (1440×900). Asserts no horizontal overflow, all
  four channel cards have positive dimensions, and the rendered pixels
  match the baseline within a 2% diff threshold.
