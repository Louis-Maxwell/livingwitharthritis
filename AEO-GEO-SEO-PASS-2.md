# AEO / GEO / SEO Boost — Pass 2
### Claude credits only · scope: still the 238 routes in ai-head-data.json

## What I checked first (didn't repeat already-done work)
Verified `keyTakeaways`, breadcrumbs, and title/meta fixes from the prior
pass were all still intact (238/238, 0/238, 0 respectively) before adding
anything new — no point re-fixing what's already fixed.

## New work this pass

### 1. Completed the FAQ data structure — real gap
`FAQSection.NEW.tsx` (built two sessions ago) expects a `faqs` array, but
only 103/238 routes actually had one — the rest had a single
question/answer pair in a different shape the component couldn't read.
**Fixed**: wrapped the existing verified Q&A into `faqs: [{q, a}]` for all
135 missing routes. Important distinction: **103 of the 238 have genuine,
pre-existing multi-question depth** (real content, not something I wrote);
the other 135 now have a technically-valid single-question array. That's
a real limit — turning those 135 into rich multi-question FAQs needs a
content writer to draft additional real questions, not an auto-generated
one, since inventing what a page "should" have been asked risks
misrepresenting the content.

### 2. Internal linking — implements the AI visibility plan's item #14
Added a `relatedRoutes` field to 237/238 routes, computed by real keyword
overlap between page titles (e.g. osteoarthritis ↔ rheumatoid arthritis ↔
gout, via shared "arthritis" + condition-adjacency). **Honest limitation
on my own work**: keyword overlap is a blunt heuristic — it tends to
surface *sibling* content (other conditions) rather than the
*complementary* content the AI plan actually recommended ("link to
pillar page + exercise guide + nutrition article"). It's a real
improvement over zero internal linking, but a content editor curating
these by hand would likely do better than my keyword-matching pass.
1 route (`/guides/nhs-vs-private-rheumatology`) got no matches — genuine
edge case, its title just doesn't share vocabulary with other pages.

### 3. Definitional-opener audit — corrected my own flawed first pass
My first check flagged 35/128 non-glossary pages as having a "weak
opening definition." On review, that check was wrong: it applied a
dictionary-definition standard to guide/comparison pages, which are
*supposed* to open with a direct answer instead (the correct AEO
pattern for that content type, and most of them already do this well —
e.g. "First-line pain relief includes..." is a good direct-answer
opener, not a weak one). Re-scoped to only check condition pages, where
a definitional opener is actually appropriate: **1 genuine case** out of
15 (`/conditions/hand-arthritis` opens with "affects" rather than "is").
Minor, borderline, flagged for optional editorial polish — not fixed
automatically, since it's still a clear, accurate sentence either way.

## Final verified state
- 238/238 routes: `keyTakeaways`, `faqs` array, valid title/meta (from prior pass)
- 237/238 routes: `relatedRoutes`
- 0 broken keyword-to-route references across all three keyword datasets
- Sitemap regenerated: 245 valid entries

## Still outside this session's reach (unchanged)
`/blog`, `/exercises`, `/es`/`/de`/`/fr` pages — still entirely outside my
visibility. Wiring any of this into live page templates — still needs
your GitHub commit. Expanding the 135 single-question FAQs into genuine
multi-question depth — needs a real content writer, not automation.
