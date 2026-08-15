# Phase 1 Status — What's Actually Done vs What Needs You

## Item 1 — Run the lockfile-regeneration workflow
**Status: cannot execute from here.** This requires triggering a GitHub
Actions workflow run, which needs a GitHub UI action (Actions tab → Run
workflow) or a `git push`. I have no GitHub write access in this session.
The workflow file (`.github/workflows/regenerate-lockfile.yml`) is built
and sitting in this bundle — once you commit it, you run it from the
Actions tab yourself. I cannot do this step for you.

## Item 2 — Commit the CI fix
**Status: cannot execute from here**, same reason — committing requires
either GitHub UI drag-and-drop or `git push`, both outside what I can do
without GitHub write access. The fixed `.github/workflows/ci.yml` is in
this bundle, ready to upload.

## Item 3 — Register the 238 routes + keyword map into the sitemap generator
**Status: done, with an honest caveat.** I wrote `scripts/generate-sitemap.mjs`
and actually ran it (not just wrote it) — verified output: 245 confirmed
routes, valid XML, 1473 lines. But: I do not have your existing sitemap
generator's actual code in this sandbox (prior session notes mention a
946-entry `sitemap.xml` exists live, but I never read that file or its
generator). So this new script produces `public/sitemap-generated.xml` —
deliberately NOT overwriting `sitemap.xml` — because if your live sitemap
really has ~700 more entries than what I can verify, blindly replacing it
would be a real regression, not a fix. **You need to diff the two and
merge manually**, or tell me what's in the other ~700 entries so I can
fold them in properly.

## Item 4 — Fix the duplicate title/meta issue (54 pages)
**Status: cannot fix — I don't have the data.** The Semrush screenshot
showed a count ("54 pages") but not the actual list of URLs or what their
duplicate titles currently say. Per your accuracy rules, I won't guess
which 54 pages or invent what their titles should be — that would be
exactly the kind of unverified assumption you've asked me not to make.
**What I need from you:** export the "Duplicate title tags" issue list
from Semrush (Site Audit → Issues → Duplicate title tags → Export CSV) or
GSC, and I'll fix the real pages with real corrected titles.

## Item 5 — Get real GA4 numbers
**Status: cannot execute — needs you.** I have no connection to your
Google Analytics account. This is a step only you can do: GA4 → Reports →
Acquisition → Traffic acquisition, screenshot or export the last 28 days.
Once you share that, I can set an honest baseline for the growth plan
instead of the unverified Semrush panel figure I flagged last time.

## Summary
Of the 5 items: **1 genuinely completed and verified** (item 3, with a
merge caveat), **2 are ready-to-commit but need your GitHub action**
(items 1–2), **2 need data only you can provide** (items 4–5). I'm not
marking anything "done" that I couldn't actually verify.
