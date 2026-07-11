# Full Bundle Bug Sweep — Every File Checked This Pass
### Claude credits only · scope: everything in this bundle (57 files)

## Method
Rather than re-check only what changed recently, this pass validated
**every file in the bundle**: JSON parse validity, TS/TSX brace balance,
every local `@/` import resolved against what actually exists in the
bundle vs. what's a legitimate external dependency, every keyword
dataset's route references re-verified against the current
`ai-head-data.json`, a full placeholder-leak sweep, and a full
debug-statement sweep.

## Real bugs found and fixed
### 1. Missing `src/config/contact.ts` — broken import
`PrivacyPolicy.NEW.tsx` and `TermsOfService.NEW.tsx` both imported
`CONTACT_EMAILS` from `@/config/contact`, but no such file existed
anywhere in this bundle. This would have failed the build the moment
either page was routed. **Fixed**: created the file using the exact email
addresses already used consistently elsewhere in the bundle
(`info@livingwitharthritis.org.uk`, `partnerships@livingwitharthritis.org.uk`)
— nothing newly invented, just centralized what was already in use.

### 2. Leftover debug statement + no real success state on the homepage
`HomePage.NEW.tsx`'s email signup handler had `console.log("Signup:",
email)` — logging a user's email to the browser console — with a `// TODO:
wire to email service` comment confirming it was never finished, and a `//
Show success message` comment describing a success state that didn't
exist. A user submitting that form would see nothing happen. **Fixed**:
removed the console.log, added a real conditional success-state UI. **One
thing I want to flag about my own fix**: the success copy says "check
your inbox" — which is only true once the backend call is actually wired
in (still a TODO, needs live Supabase access I don't have). I added an
explicit comment warning not to route this page live with that copy
until the real backend call replaces the TODO — otherwise it promises an
email that never arrives.

## Re-verified (already correct, confirmed not assumed)
- All JSON in the bundle: valid
- All TS/TSX: brace/paren-balanced
- Keyword-to-route consistency across `keywords-40000.json`,
  `article-scaffolds.generated.ts`, `keywords-paid.generated.ts`: 0 broken
  references (re-checked after all the recent `ai-head-data.json` edits,
  since route data changed several times this session)
- No `[REVIEWER: ...]` leaks outside the deliberately-unrouted scaffold
  file (the one hit in `FAQSection.NEW.tsx` is the component's own
  detection regex, not a real leak — verified by reading the match)
- Sitemap regenerated to reflect the latest titles/breadcrumbs: 245 valid
  URL entries

## Still outside what I can fix (same limits as every session this thread)
- The actual backend call for the email signup form — needs live
  Supabase access
- `/blog`, `/exercises`, `/es`/`/de`/`/fr` — still entirely outside my
  visibility
- Wiring any `.NEW.tsx` file into `App.tsx` — needs your GitHub commit
