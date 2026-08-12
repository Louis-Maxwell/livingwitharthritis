# Read This Before Uploading Anything

## ⚠️ One important check before you upload — please don't skip this

This update removes a hidden safety net: right now, if your Supabase login key
isn't set correctly on your live site, the site quietly uses a backup key
that's built into the code (which is the actual security problem we're
fixing). Once you upload these files, that backup goes away on purpose.

**This means: if your live site's Supabase key isn't already set up correctly
in Lovable, your site could go blank or show errors after this update.**

### How to check first (2 minutes, no coding)

1. Go to your Lovable project
2. Look for **Project Settings → Environment Variables** (or similar wording)
3. Confirm these three exist and have real values (not blank):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`

If all three are already there with real values — you're safe to proceed.
If any are missing, add them there first, **then** upload these files.

(You do NOT need to add anything for analytics — see below, GA4 has been
removed entirely, so there's nothing to configure for it.)

---

## What's changed in this update

**Note:** Supabase itself is being **kept** — it still runs your donations,
logins, and admin dashboard. Only the exposed key is being fixed. Google
Analytics (GA4) is being **removed entirely**, per your instruction — you will
stop receiving any visitor/traffic statistics after this goes live. This
update also includes a round of code-quality and accessibility fixes found
during a manual audit of your actual codebase.

| File | Repo location | What it does |
|---|---|---|
| `index.html` | root of repo | Removes all GA4 tracking scripts; tightens the security policy now that GA4 domains aren't needed |
| `src/App.tsx` | `src/` folder | Removes the GA4 page-view tracking code; adds the new accessibility button |
| `src/main.tsx` | `src/` folder | Loads the new accessibility styling |
| `src/integrations/supabase/config.ts` | `src/integrations/supabase/` | Removes the hidden backup login key (the real security fix — Supabase itself stays) |
| `src/components/HelplineWidget.tsx` | `src/components/` | Removes a direct GA4 tracking call (helpline button clicks) |
| `src/pages/guides/NewlyDiagnosed.tsx` | `src/pages/guides/` | Removes a direct GA4 tracking call (print button) |
| `src/components/a11y/AccessibilityToolbar.tsx` | new folder `src/components/a11y/` | The accessibility settings button your readers will see |
| `src/hooks/a11y/useAccessibilityPreferences.ts` | new folder `src/hooks/a11y/` | Makes the accessibility button remember each reader's settings |
| `src/styles/accessibility.css` | new folder `src/styles/` | The styling for large text, dyslexia font, high contrast |
| `src/components/Header.tsx` | `src/components/` | Fixes a real bug: keyboard/screen-reader users heard "Skip to main content" twice on every page — now it's said once |
| `src/components/BlogHelpfulness.tsx` | `src/components/` | Removes unnecessary workaround code on the "was this helpful" blog widget; restores proper type-checking |
| `src/hooks/useBlogViews.ts` | `src/hooks/` | Same type-checking fix, for blog view counts |
| `src/pages/WaysToHelp.tsx` | `src/pages/` | Same type-checking fix, for the volunteer sign-up form |
| `src/pages/AdminDashboard.tsx` | `src/pages/` | Same type-checking fix, applied to the admin comment moderation feed |
| `src/pages/AdminEmails.tsx` | `src/pages/` | Minor type-checking fix (icon display) |
| `src/pages/AdminAppointments.tsx` | `src/pages/` | Minor type-checking fix (icon display) |
| `public/robots.txt` | root of repo | **Already correctly fixed in your code** (allows DuckDuckBot and the Internet Archive bot) — but your live site still shows this as broken, meaning it was never actually deployed. Re-including it here so it finally ships. |
| `public/_headers` | root of repo | Same situation — correct caching rules already written, never deployed. Re-including so browsers finally cache your images/scripts properly (should meaningfully improve repeat-visit speed). |
| `package-lock.json` | root of repo | Updates 7 dependencies to patched versions, fixing 6 real security vulnerabilities flagged by GitHub (including one rated High severity in `react-router`, `undici`, `nanoid`, `fast-uri`, `brace-expansion`, `dompurify`). All are small, safe patch-version bumps — nothing that changes behavior. |
| `.github/workflows/lighthouse.yml` | `.github/workflows/` | Replaces a broken performance-testing workflow (it was failing every time with "command not found") with a working one, using a well-established, actively maintained tool instead of guessing at the original broken script |
| `src/components/ui/dialog.tsx` | `src/components/ui/` | Fixes a real bug: the ✕ close button on every popup/modal across your whole site (donation popup, exit-intent popup, etc.) was only 16×16 pixels — too small to reliably tap on a phone. Now a proper 44×44 tap area, same visual size. |
| `src/components/ui/sheet.tsx` | `src/components/ui/` | Same fix, for the mobile slide-out menu panel |
| `src/components/ui/toast.tsx` | `src/components/ui/` | Same fix, for the small notification pop-ups (e.g. "Thank you for volunteering") |

**One more fix inside `src/components/Header.tsx` this round:** the mobile hamburger menu button and search icon button were both 36×36 pixels — under the recommended minimum. Now 44×44, matching Google's own mobile usability guidance. This is the button that opens your entire navigation menu on a phone, so it's a meaningful one to get right.

### A pattern worth knowing about

Four separate things in this round (`robots.txt`, `_headers`, and two earlier fixes) turned out to **already be correctly written in your code** — but were never actually live on your website. If your team member or a previous AI session made changes, it's worth double-checking they're pushing all the way through to a real deploy, not just saving locally. This ZIP re-ships all of them properly.

### This round: LCP, CLS, and CI infrastructure

**The real root cause of your Lighthouse CI failures:** your `package.json` referenced a script file (`scripts/perf-lighthouse.mjs`) that **doesn't actually exist** in your repo. Every Lighthouse-related CI check was built on top of a missing file — that's why `/donate` (and honestly, every route) was never reliably tested. This wasn't a `/donate`-specific bug; there was no working system at all.

**What I built instead:**

| File | What it does |
|---|---|
| `lighthouserc.json` | New — the actual performance budget/gate. Tests 4 routes (home, `/conditions/osteoarthritis`, `/blog`, `/donate`) on mobile, 3 runs each (median result used, so a single unlucky slow run doesn't fail the whole check) |
| `scripts/lighthouse-pr-comment.mjs` | New — reads the real test results and builds a results table |
| `.github/workflows/lighthouse.yml` | Replaced again — now actually runs your project's real testing tool (`@lhci/cli`, which was already a dependency, just never wired up) and posts/updates one PR comment with a Performance/LCP/TBT/CLS table per route |
| `src/pages/BlogIndex.tsx` | Real bug fixed — see below |

**The real CLS bug on `/blog` (found and fixed):** the "Editor's Picks" section — 3 large cards with images — was coded to render **nothing at all** while its data loaded, then pop in suddenly once ready, shoving everything below it down the page. This is exactly the kind of thing Lighthouse flags as a layout-shift outlier, and exactly the kind of bug that looks "flaky" (sometimes the data arrives fast enough that you don't notice, sometimes it doesn't). Fixed by showing a same-sized placeholder while loading, so nothing has to jump once the real content arrives.

**On `/conditions/osteoarthritis` mobile LCP:** I checked thoroughly and the fundamentals here are already properly built — the page is pre-built as static HTML (not waiting on JavaScript to show text), the heading font is already correctly preloaded, and heavier interactive features (chat widget, donation pop-up) are already set up to load separately so they don't slow down the initial page. I did not find a further code-level bug to fix here. Getting mobile LCP further down from here realistically needs either a live, iterative testing loop (try something, measure the real result, adjust — which needs Lovable credits or you running tests locally) or a larger initiative around your images and overall JavaScript bundle size, not a single fix. I've set the budget to *warn* (not hard-fail) on LCP for now, at a realistic 4.0 seconds, rather than an instantly-failing target — this can be tightened once you're consistently passing it.

**Honest note on the budget numbers I chose:** Accessibility/Best Practices/SEO are set to hard-fail if they drop below 90 (matching your current scores, so this protects what's already good). Performance and LCP/TBT are set to warn-only for now rather than hard-fail, since your current mobile Performance score (60, per your last test) is well below what a strict gate would demand — I didn't want to set an impossible bar that blocks every future deploy. CLS is set to hard-fail at the recognized "good" threshold (0.1), since the actual bug causing it is now fixed.

**What "type-checking fix" means in plain terms:** several places in the code
had a workaround that told the code-checking tool "trust me, don't check
this" — usually added defensively at some point and never removed. Those
database tables now have real, verified definitions, so I removed the
workaround and let the checker actually verify the code is correct. This
doesn't change how anything looks or behaves — it just means future changes
to these files are more likely to get caught before they break something.

**Not touched, but worth knowing:** your codebase has a shared helper file
(`src/lib/analytics.ts`) that ~20 other files call into for tracking events.
I did not delete it or its imports, since that would mean editing 20 files
and risking breaking the build. Instead, because GA4 no longer loads at all,
that helper now safely does nothing when those 20 files call it — no errors,
no data sent anywhere, just inert code. If you'd like those 20 files properly
cleaned up too (not just harmless), let me know and I'll do that as a
separate, careful pass.

---

## How to upload to GitHub (no terminal needed)

1. Go to your repo: `https://github.com/Louis-Maxwell/livingwitharthritis`
2. Click **Add file → Upload files** (top right of the file list)
3. **Drag the whole extracted folder** into the upload box — GitHub will
   place each file in the matching folder automatically, as long as you
   drag folders and not just loose files
4. Scroll down, write a commit message like: `"Remove GA4, fix hardcoded Supabase key, add accessibility toolbar"`
5. Click **Commit changes**

If GitHub asks whether to replace existing files (like `App.tsx`), say yes —
that's expected, it's an update.

---

## After uploading

1. Go back to Lovable and click **Deploy** (or wait for auto-deploy if that's on)
2. Open your live site
3. Check it looks normal and loads properly
4. Open a blog post — you should see a small gear/settings icon in the
   bottom-right corner. That's the new accessibility toolbar.
5. Open your browser's console (F12 → Console tab) — you should see **no**
   more requests to `google-analytics.com` or `googletagmanager.com` at all

If the site breaks after deploying, it's almost certainly the environment
variable check above — go back and confirm those 3 Supabase values are set
in Lovable.


### Still needs real testing (not something I can fix blind)

PageSpeed Insights flagged "Improve image delivery" as a large potential saving (1,100+ KiB), but I don't have the specific list of which image files it means — that detail was collapsed in your screenshot. If you expand that section in the PageSpeed report and send a screenshot, I can act on the exact list rather than guessing.

### After uploading this round

1. Once live, open a small test Pull Request (or push directly to a branch) to see the new Lighthouse workflow actually run
2. Check the **Actions** tab — the Lighthouse check should now run 4 real tests and either pass or fail with real reasons, instead of failing instantly with "command not found"
3. If it's a Pull Request, you should see an automatic comment appear with a results table

---

## This round: fixing the "632 pages not indexed" problem

**What I found, in plain terms:** your sitemap tells Google about 1,095 pages,
but roughly **254 of them are near-duplicates generated from a template**:

- 150 pages like `/arthritis-support/london/osteoarthritis` — I checked the code,
  and the actual medical content (symptoms, treatments, description) is
  **identical on every one**. Only the city name and local hospital trust name
  change.
- 104 pages like `/uk/london/physiotherapy` — same situation. "Physiotherapy for
  Arthritis in London" and the Birmingham version are the same page with two
  words swapped.

Google was almost certainly not *failing* to index these — it was *declining* to.
Mass-produced pages that differ only by a place name are something Google
actively filters out, and it's treated more strictly in health content.

**Why this matters beyond those pages:** a large volume of thin near-duplicates
can lower how Google judges your site *as a whole*, including your genuinely
good pages. Trying to force these to index would risk making things worse, not
better.

### What I changed

| File | Change |
|---|---|
| `src/pages/CityConditionPage.tsx` | Marked "don't index" — pages stay live and usable, just no longer put forward to Google |
| `src/pages/CityServicePage.tsx` | Same |
| `scripts/generate-sitemap.ts` | Removed those 254 URLs from the sitemap, so Google's attention goes to pages that deserve it |

**Kept deliberately:** the ~68 `/arthritis-support/{city}` hub pages. I checked
these and they *do* carry real local information — named hospitals, actual local
health trusts, named local support groups. Those are legitimately useful and
should be competing in search.

**Everything here is easily reversible.** Each change has a comment explaining
exactly how to undo it if you disagree with the call.

### Honest expectations

- Your sitemap will drop from ~1,095 to ~840 pages. **This is intended.** A
  smaller sitemap of good pages beats a large one full of thin ones.
- Your "not indexed" count in Search Console should fall substantially — but
  because those pages are now correctly excluded, not because they got indexed.
- This will not increase clicks by itself. Clicks are near-zero right now
  because your real pages sit around position 20-45 in Google (page 2-5).
  Moving those up is a content and authority problem, not a technical one.
- Timeline: Google takes days to weeks to re-crawl and update these counts.

### Still worth investigating (I couldn't diagnose this from code)

You rank at **position 11 for your own brand name** ("livingwitharthritis.org.uk").
A site normally ranks #1 for a search of its own name. That's unusual and worth
looking into — but I can't tell why from the codebase alone; it needs
live investigation.

### What would help most next

In Search Console, click **"8 reasons"** under *Not indexed* and screenshot the
list. That tells us exactly why Google rejected each group, and would let me
diagnose the rest precisely instead of inferring it.
