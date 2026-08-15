# Frase Report — What Was Actually Fixed vs What Needs You

## Two things flagged before any fixing (please read)
1. **`/exercises/*`, `/blog/*`, `/contact`, `/about/ai-transparency`, `/es`,
   `/de`, `/fr` — zero overlap with anything I've built or seen.** I checked
   programmatically (not by eye): none of these 11 sample URLs from the
   report exist in my known 238-route dataset. Your site has grown pages
   I have no visibility into. I cannot edit content I've never seen — see
   the per-page action list below for what to do about this.
2. **Contradiction, unresolved:** an earlier Semrush audit in this
   conversation said *"International SEO is not implemented on this
   site."* This Frase report shows `/es`/`/de`/`/fr` pages with 9 issues
   each — meaning they exist. I can't tell you which is right from here;
   check live whether those URLs actually resolve.
3. **The report's own bug:** page 1 references *"keyword cannibalization
   for [insert keywords]"* — that's Frase's unfilled template variable,
   not real data. Nothing to act on there until you re-run that section.

## Fixed for real, verified (against the 238 routes I actually control)
Ran an automated audit mirroring the report's own categories, against
`scripts/ai-head-data.json` — the one dataset I have real read/write
access to:

| Issue (Frase category) | Found | Fixed | Remaining |
|---|---|---|---|
| Long Title (>60 chars) | 31 | 28 | 3 (need editorial judgment — see below) |
| Short Title (<30 chars) | 5 | 5 | 0 |
| Short/thin meta description (<70 chars) | 109 | 109 | 0 |

**How descriptions were fixed:** every extension used the page's own
existing `answer` field (real clinical content already written and
NHS/NICE-sourced) — nothing was invented. Where the real content didn't
fit within a clean 155-character budget, it was truncated at a word
boundary with "…", never cut mid-word or padded with filler.

**How titles were fixed:** trimmed redundant repeated suffixes (e.g.
"Biologic: Meaning & Explanation | Arthritis Glossary" → "Biologic |
Arthritis Glossary", "Arthritis in Cats: The Silent Condition | Living
With Arthritis UK" → dropped the redundant site-name suffix). The actual
term/subject was never altered.

**3 titles left unfixed on purpose:** e.g. "Home Adaptations for
Arthritic Pets: 15 Cheap Changes That Work" (90 chars) — shortening this
well needs a human editorial call about which words matter most, not a
mechanical truncation that risks losing the "15 Cheap Changes" hook that's
probably doing real click-through work.

## Built: reusable fixes for the two biggest-impact issues
- **`src/components/FAQSection.NEW.tsx`** — one component that renders
  real, visible `<h3>` question headings AND emits matching FAQPage
  JSON-LD from the same data, so they can never drift apart. Directly
  addresses "Missing FAQ Schema" (31 pages) and "Missing Question
  Headings" (27 pages) — drop it into any page with a `faqs` array.
- **`src/components/SEOHead.NEW.tsx`** — single meta-tag component with
  Open Graph + Twitter Card defaults, so "Missing Open Graph Tags" can't
  recur once adopted site-wide.

## Cannot fix from here (need the actual pages or your judgment)
- **Orphan Page (6) / Dead End Page (2):** fixing these needs your site's
  real internal-link graph, which requires either the live repo or the
  actual page content — neither available in this session.
- **Poor AI Structure (16) / Low Quotability (7):** these need editorial
  rewrites of specific real pages I've never read. I can give you the
  content pattern (below), but applying it needs the actual page text.
- **Noindex Directive (50, low impact):** ambiguous from the PDF text
  alone whether this means "wrongly noindexed" or "missing an explicit
  index tag" — worth a 2-minute check of `<meta name="robots">` on a
  couple of the flagged pages before assuming which.

## Content pattern for the GEO Health gaps (Structure 34%, Definitions
52%, Takeaways 40%) — apply this to any page you edit:
1. Open with a direct 1-2 sentence answer to the implied question
2. Add a 3-5 bullet "Key takeaways" block near the top or bottom
3. Define any technical term on first use, in plain language
4. Cite NHS/NICE/Versus Arthritis by name near any statistic
