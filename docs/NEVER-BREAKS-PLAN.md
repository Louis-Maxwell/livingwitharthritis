# Never-breaks plan

**Site:** livingwitharthritis.org.uk · **Repo:** Louis-Maxwell/livingwitharthritis · **Written:** 25 September 2026

## The goal, honestly

No system can promise code never has a bug. What we *can* promise is this:
**a change that fails a check can't reach `main`, and nothing reaches the live
site until someone has seen it pass every check.** If something bad gets through
anyway, we can undo it in minutes.

We do that with layers. Each layer is cheap, and each one catches what the one
before missed.

---

## How a change reaches the live site

```
edit on a branch ──► pull request ──► required checks (all green) ──► merge to main
      │                                                                   │
  (optional local                                     "Publish readiness" re-checks
   pre-push hook)                                       the exact merge commit
                                                                          │
                                                    Louis clicks Publish in Lovable
                                                                          │
                                                 weekly health check watches the live site
```

## Layer 1: on your computer (optional, cheap)

`lefthook.yml` runs a fast CSS utility check before `git push`. Turn it on once with
`npx lefthook install`. It's only a convenience. CI is the real gate, so if a
hook gets skipped, nothing unsafe gets through.

## Layer 2: required checks on every pull request

`main` is protected. A PR can only merge when **all** of these are green **and**
the branch is up to date with `main` ("strict"):

| Required check | Workflow | What it catches |
| --- | --- | --- |
| `Keep green (integrity)` | keep-green.yml | Missing lockfile, TypeScript errors, removed backends coming back, blog catalog integrity, SEO identity, redirect/soft-404 safety, Facebook URL |
| `build-and-audit` | ci.yml | Typecheck, CSS utility check, **prerendered production build**, prerender meta (no generic titles, no stray noindex), blog HTML gate, JSON-LD schema, redirect map, SEO audit against the built site |
| `ESLint` | lint-and-test.yml | Lint errors |
| `Build Check` | lint-and-test.yml | Plain `npm run build` (the Lovable-style build) works |
| `Blog smoke (Playwright, must pass)` | lint-and-test.yml | A real browser loads the **built** site: `/`, `/blog`, `/blog/archive`, `/faq` and sample blog posts must render an `<h1>`, have a title, and throw no JavaScript errors |
| `Vitest (unit + a11y)` | tests.yml | Full unit, accessibility and content test suite (also installs from `bun.lock` with `--frozen-lockfile`, so a stale `bun.lock` fails here) |
| `Scan for leaked secrets` | gitleaks.yml | API keys or passwords committed by mistake |
| `analyze (javascript-typescript)` | codeql-scan.yml | CodeQL security scan (XSS, injection and similar) |

**Advisory only (won't block a merge):** Lighthouse performance budget (it's
currently red and set to `continue-on-error`, so read its report rather than trusting
the green tick), the non-blocking Playwright E2E job, and `npm audit` in Lint & Test.

**Content/catalog integrity:** `blog-catalog-integrity` in Keep green covers the
current catalogs. A separate workstream is merging the two blog catalogs into one
typed source with its own validation tests. Once it lands, those tests become
part of the required gates.

## Layer 3: `main` is protected

Current settings (checked 25 Sep 2026 with `gh api`):

- Required status checks: the 8 above, strict (branch must be up to date) ✅
- Rules apply to admins too ✅
- Force-push to `main` blocked ✅ · deleting `main` blocked ✅
- **Pull request required before merging: not on yet.** See "Louis-only clicks".

## Layer 4: deploy only from green commits

The live site is published by **Louis clicking Publish in Lovable**. Lovable
syncs from GitHub `main`. No GitHub workflow deploys the site.

The old "Deploy to Lovable" workflow called a Lovable URL that doesn't exist
(HTTP 404, empty token) and still showed green. It has been replaced by
**Publish readiness (Lovable)**, which deploys nothing. For every commit on
`main` it waits for CI, Lint & Test, Tests, Keep green, CodeQL and Gitleaks, then says one of three things:

- **✅ SAFE TO PUBLISH `abc1234`**: every gate passed for that exact commit.
- **Red ❌**: a gate failed. Do not publish.
- **⏳ NOT VERIFIED**: gates were still running when it timed out. Wait for a later run.

**Rule:** only click Publish when the newest commit on `main` shows SAFE TO PUBLISH.

## Layer 5: weekly health check

`weekly-health.yml` runs every Monday at 07:00 UK time (06:00 UTC) and can be run
by hand. If anything fails, GitHub emails Louis:

- `package-lock.json` and `bun.lock` still match `package.json`
- `npm audit` finds no high or critical problems in production dependencies
- Live site: `/`, `/blog`, `/blog/archive`, `/faq`, `/sitemap.xml`, `/robots.txt` return 200,
  the homepage title still says "Living With Arthritis", and the sitemap is valid

It only checks. It never pushes to `main`. The old "Regenerate npm lockfile"
workflow tried to push to `main` directly, and protection would (rightly) block that.
CodeQL also runs on its own every Wednesday.

Weekly human glance (5 minutes):
1. GitHub → **Security → Code scanning**: any open alerts?
2. GitHub → **Actions**: anything red on `main`?
3. Is the newest SAFE TO PUBLISH commit the one that's live in Lovable?

## Node and lockfiles

- Node is pinned in `.nvmrc` (`20`), and every workflow reads it (`node-version-file: .nvmrc`).
  `package.json` `engines` says `>=20`.
- `package-lock.json` is the source of truth for CI (`npm ci`). `bun.lock` is kept for
  Lovable/Bun. When dependencies change, update **both** in the same PR.

## Rolling back

If a bad change goes live:

1. **Fastest (site only):** in Lovable, open the project → **History** (version
   history) → pick the last good version → **Restore** → **Publish** → **Update**.
   Then fix `main` too (step 2), or the next sync brings the bad code back.
2. **Proper fix (code):** revert the bad PR on GitHub (the PR page → **Revert** →
   merge the revert PR once checks are green), or locally
   `git revert <merge-sha>` on a branch and open a PR. After it merges, wait for
   SAFE TO PUBLISH, then Publish in Lovable.
3. Never force-push `main` to "undo" something. Protection blocks it, and it's
   supposed to.

## What Louis must click himself

These need Louis's own login or judgement:

1. **Publish** in Lovable when the newest `main` commit shows SAFE TO PUBLISH.
2. **Require a pull request before merging** (recommended): GitHub → Settings →
   Branches → `main` rule → Edit → tick *Require a pull request before merging*,
   set *Required approvals* to **0** (you're the only collaborator and GitHub won't
   let you approve your own PR), leave *Require review from Code Owners* **off**
   → Save. ⚠️ If you still make edits inside Lovable, Lovable pushes straight to
   `main`, and this setting will block those pushes. Only turn it on if all code
   changes go through GitHub PRs (the current way of working).
3. Optional: **Require conversation resolution before merging** (same page).
4. Optional: GitHub → Settings → Code security → turn on **Secret scanning** and
   **Push protection** (free for public repos; currently off). Gitleaks already
   covers this in CI.
5. Dependabot: `docs/CI-KEEP-GREEN.md` says Dependabot is off, but repo settings
   still show **Dependabot security updates: enabled**. To match the policy:
   Settings → Code security → Dependabot security updates → Disable. (Leaving
   *Dependabot alerts* on is harmless and useful.)
6. CodeRabbit: `.coderabbit.yaml` disables reviews. To remove it fully: Settings →
   GitHub Apps → CodeRabbit → Configure → Uninstall.
