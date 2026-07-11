# AEO / GEO / SEO Improvement Pass — What Was Actually Done
### Claude credits only · scope: the 238 routes in ai-head-data.json

## Scope reminder (same limit as every session this thread)
This only touches the 238 routes I have real read/write access to. The
`/blog`, `/exercises`, `/es`/`/de`/`/fr` pages flagged in the Frase report
remain completely outside my visibility — nothing here reaches them.

## Fixed — real bugs, verified before and after
| Issue | Found | Fixed | Method |
|---|---|---|---|
| Empty breadcrumb field | 30 routes | 30 | Derived from existing title text — no invented labels |
| Thin structure (only 1 Q&A, no scannable bullets) | 238 routes had no `keyTakeaways` field | 238 | Extracted 3-4 real sentences from the existing `answer` field per route |
| Redundant "{Term}: {Term} is..." prefix in takeaways | 92 | 92 | Stripped the duplicate label, kept the real sentence |
| Missing NHS/NICE source | 1 (`/glossary` hub) | N/A | Correctly has none — it's an index page linking to 110 cited pages, not a bug |

## Built — reusable AEO/GEO/SEO infrastructure
1. **`SchemaBlocks.NEW.tsx`** — generates `BreadcrumbList` + `MedicalWebPage`/`Article`
   JSON-LD directly from the now-reliable `breadcrumb`/`sources`/`updatedAt`
   fields. Implements AI-visibility-plan item #6 (schema markup) as a
   data-driven component instead of hand-written per-page schema.
   **`reviewedBy` is deliberately optional with no default** — the
   component will not fabricate a clinical reviewer's name; only pass it
   if you have a real one.
2. **`FAQSection.NEW.tsx`** (built last session) — visible question
   headings + matching FAQPage JSON-LD from one data source.
3. **`SEOHead.NEW.tsx`** (built last session) — Open Graph + Twitter Card
   defaults.

## How this maps to the GEO Health categories from the Frase report
- **Structure (was 34%)**: every route now has a `keyTakeaways` array —
  the exact "structured key takeaways" pattern the AI visibility plan
  called for, extracted from real content, not invented.
- **Definitions (was 52%)**: glossary and condition pages already open
  with a direct question/answer pair; this wasn't touched further this
  pass since the existing pattern was already sound — the score gap is
  more likely coming from the `/blog`/`/exercises` pages outside my reach.
- **Takeaways (was 40%)**: directly addressed — see `keyTakeaways` above.
- **Quotability (was already 86%, "Pass")**: not touched; wasn't broken.

## What AEO/GEO/SEO work still needs you or the live repo
- **Content on `/blog`, `/exercises`, `/es`/`/de`/`/fr`** — I have never
  seen these pages. Applying the same `keyTakeaways`/schema pattern to
  them needs either their real content pasted in, or live repo access.
- **Wiring these new components into actual page templates** — I've built
  `SchemaBlocks`, `FAQSection`, and `SEOHead` as drop-in components; they
  still need to be imported into your actual page components (e.g.
  `ConditionPage.tsx`, `GlossaryTerm.tsx`) via GitHub, which needs your
  commit action.
- **Backlinks, AI prompt tracking, original research** — from the earlier
  visibility plan, these remain genuinely outside anything code can fix;
  they need outreach and data collection work only your team can do.
- **The 3 titles and 36 breadcrumbs left long on purpose** — flagged for
  editorial judgment, not auto-shortened, to avoid losing real
  click-through hooks mechanically.

## Follow-up pass — the 3 titles, and correcting my own breadcrumb call
**3 remaining long titles: fixed with real editorial reasoning**, not
mechanical truncation. Each preserved its actual hook (verified the exact
pre-existing text with an assertion before editing, so nothing was
overwritten blind):
- `/guides/dog-arthritis-supplements-vs-prescription`: 62→56 chars, now
  matches the site's own "X vs Y for [Condition]" pattern
- `/pets/arthritis-in-horses`: 88→56 chars, dropped redundant site-name
  suffix, kept "Longer Ridden Life" (the real value proposition)
- `/pets/home-adaptations-for-arthritic-pets`: 90→53 chars, dropped the
  weakest word ("That Work"), kept the specific "15 Cheap Changes" hook

**The "36 long breadcrumbs" — corrected, not fixed.** On review, this was
me applying an arbitrary 35-character threshold that isn't a real SEO
constraint. Breadcrumb trail UI text doesn't get truncated in Google
search results the way `<title>` tags do — that's a `<title>`-specific
mechanism. Mechanically shortening 36 clear, accurate breadcrumbs would
have reduced clarity for no actual ranking benefit, so I left them as-is
and corrected the framing instead of forcing an unnecessary fix.

Final state: 0 long titles, 0 empty breadcrumbs, 238/238 routes with
keyTakeaways, verified.
