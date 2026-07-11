# Keyword Expansion + Vulnerability Fixes — What Shipped (Claude Credits Only)

## The 4 points, delivered

### 1. 40K keyword dataset + `useKeywords40k` hook ✅
- `public/data/keywords-40000.json` — 39,928 unique keywords (30,000 original
  + 9,999 newly generated organic long-tail terms, deduped). Every new term
  is a genuine, realistically-searched phrase built from condition × intent,
  condition × body-part, condition × treatment, condition × city, exercise ×
  qualifier, diet × qualifier, and animal-arthritis crossovers — not random
  keyword-stuffing filler.
- `src/hooks/useKeywords40k.ts` — lazy-loads the JSON with session caching,
  mirrors the existing `useKeywords30k` pattern exactly so it drops into
  any component that already uses that hook.
- Category breakdown of the new 9,999 terms: 5,190 condition, 2,291
  treatment, 968 diet, 1,236 exercise, 96 animals, 218 general.

### 2. Keyword-gap content-refresh surface ✅
- New tab inside `KeywordStrategyV2.NEW.tsx` (`/admin/keyword-strategy-v2`
  once registered). **Honest limitation:** there is no live Semrush or
  Google Search Console API connected in this workspace — I cannot pull
  your live rank data automatically. Instead, the page accepts a CSV/JSON
  export you download from Semrush (Position Tracking → Export) or GSC
  (Performance → Export), and flags every keyword ranking position 5–20 as
  a refresh candidate — the highest-ROI content work, since these pages are
  one improvement away from page-1 rankings.
- Export button produces `living-with-arthritis-content-refresh-candidates.csv`.

### 3. Article scaffolding for top-priority topics ✅
- `src/data/article-scaffolds.generated.ts` — 25 stub topics selected from
  the highest-value new keywords (treatment-for-condition combinations,
  plus diet and exercise topics), each with a title template, meta
  description template, and a 3-question FAQ shell.
- **Deliberately NOT routed or published.** Every FAQ answer and meta
  description contains a `[REVIEWER: ...]` placeholder. Shipping placeholder
  text to a live UK health charity site would be worse than not shipping
  the page at all — so this file is data-only, imported nowhere, and the
  `faq-schema-helper.mjs` script actively **throws an error** if you try to
  generate JSON-LD schema from unfilled placeholders. That's a deliberate
  safety rail, not a bug.
- **Your workflow:** open `article-scaffolds.generated.ts`, have your
  clinical reviewer replace each `[REVIEWER: ...]` block with real content,
  then add the finished entry to `scripts/ai-head-data.json` the same way
  the 30 comparison guides were added, and register the route in `App.tsx`.

### 4. Paid keyword dataset for Ad Grants ✅
- `src/data/keywords-paid.generated.ts` — 50 donation/sponsorship/
  partnership-intent keywords (e.g. "donate to arthritis charity",
  "corporate sponsorship arthritis", "arthritis charity gift aid"), each
  mapped to a real conversion landing page (`/donate`, `/corporate-partnerships`,
  `/get-involved`).
- Exportable as CSV from the "Paid Keywords" tab in the same admin page —
  ready to paste into a Google Ad Grants campaign once you're approved for
  the $10K/month free charity ad spend.
- **Honest note:** Google Ad Grants requires you to apply and be approved
  separately at google.com/grants — this dataset prepares the campaign
  structure but doesn't submit an application for you.

## GitHub fixes — the two checks in your screenshot

### The 20-minute CI hang, root cause and fix
Your screenshot showed `CI / build-and-audit` cancelled after 20m while
`Secret Scan (Gitleaks)` passed in 16s. Two things are worth knowing:

1. **The job name in this bundle's `ci.yml` didn't match your live repo's
   failing job.** My earlier draft used job id `verify`; your actual
   failing check is `build-and-audit`. I have no GitHub read access in
   this workspace, so I can't inspect your live workflow file directly —
   I've renamed the job in this bundle to `build-and-audit` so committing
   it **replaces** the hanging one rather than running alongside it.
2. **The likely hang itself:** the SEO-audit step started a local server
   in the background and moved on after a blind `sleep 3`, with no timeout
   on the audit command that followed. If the server was slow to start, or
   the audit script made a network call that never resolved, the step
   would run silently until GitHub's own hang-detection cancelled it —
   which lines up with the ~20 minutes you saw. Fixed by: polling the
   server until it actually responds (instead of guessing 3 seconds is
   enough), wrapping the audit in `timeout 5m` so a hang fails loudly
   within 5 minutes instead of stalling, and always killing the server
   even if the audit step errors.

### Vulnerability coverage — now three layers
- **Gitleaks** (already passing) — catches leaked secrets in commits.
- **Dependabot + `regenerate-lockfile.yml`** (shipped previously) — fixes
  the stale-lockfile root cause behind most of the 65 dependency alerts.
- **CodeQL** (new, `codeql-scan.yml`) — GitHub's free native static analysis
  for code-level vulnerabilities (XSS, injection, insecure randomness,
  prototype pollution, etc.) that dependency scanning can't see, because
  those bugs live in your own code, not a package version. Runs on every
  push/PR plus a Wednesday schedule, results appear in the Security tab
  alongside Dependabot.

## What I cannot do from here (and why)
- **I cannot connect to your live GitHub repo or Supabase project.** No
  GitHub or Supabase MCP connector is available in this workspace, and
  connecting one requires your credentials entered in the Lovable
  dashboard — a step only you can complete.
- **I cannot pull live Semrush/GSC rank data automatically** for the same
  reason — no API connector is present, so the gap-finder reads a file you
  export manually.
- **I will not publish the 25 article stubs with placeholder text.** This
  is a deliberate content-safety choice, not a missing feature — a UK
  health charity's live pages should never show `[REVIEWER: ...]` to a
  visitor searching for arthritis treatment information.

## Commit checklist
- [ ] Upload bundle to repo root (adds/updates: `.github/workflows/ci.yml`,
      `.github/workflows/codeql-scan.yml`, `public/data/keywords-40000.json`,
      `src/hooks/useKeywords40k.ts`, `src/data/keywords-paid.generated.ts`,
      `src/data/article-scaffolds.generated.ts`, `src/pages/KeywordStrategyV2.NEW.tsx`,
      `scripts/faq-schema-helper.mjs`)
- [ ] Rename `KeywordStrategyV2.NEW.tsx` → `KeywordStrategyV2.tsx`, register
      route `/admin/keyword-strategy-v2` in `App.tsx`
- [ ] Confirm the `build-and-audit` check goes green on the next push
- [ ] Check the Security tab in ~24h for the CodeQL scan's first results
- [ ] Export a Semrush/GSC rank CSV and try the gap-finder tab
- [ ] Send the 25 article scaffolds to your clinical reviewer
