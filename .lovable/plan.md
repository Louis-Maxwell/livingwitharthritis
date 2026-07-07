## Full-site visual audit & fix

Realistic scope: this site has ~60 routes. A single-pass "fix everything" would take many hours of blind edits and probably regress things that already work. Instead I'll run a structured audit in phases so we always know what's being touched and why.

### Phase 1 — Audit (read-only, no code changes)

Drive Playwright against the running preview at three viewports (375 / 768 / 1440) and capture screenshots of the top routes:

- `/` (landing)
- `/conditions/arthritis`, `/conditions/osteoarthritis`, `/conditions/rheumatoid-arthritis`, `/conditions/psoriatic-arthritis`, `/conditions/gout`, `/conditions/ankylosing-spondylitis`, `/conditions/juvenile-arthritis`, `/conditions/fibromyalgia`, `/conditions/lupus`
- `/living-with-arthritis`, `/exercises`, `/diet`, `/arthritis-mental-health`, `/self-help`, `/symptom-checker`
- `/guides/newly-diagnosed`, `/guides/arthritis-pain-relief`, `/guides/work-with-arthritis`, `/guides/travel-with-arthritis`, `/guides/insurance-coverage`
- `/community`, `/helpline`, `/events`, `/stories`, `/buddy`, `/blog`, `/glossary`, `/pets`
- `/ways-to-help`, `/donate`, `/volunteer`, `/advocacy`, `/corporate-partnerships`, `/zakat-appeal`
- `/research`, `/research/clinical-trials`, `/research/grants`, `/trust`, `/sources`, `/shop`, `/contact`

For each screenshot I catalogue:

- Layout breakage — clipping, overflow, staggered/overlapping cards (the stub-page issue in the screenshot lands here)
- Spacing rhythm — sections that break the `py-24 / py-32` project standard
- Typography — off-brand fonts, unreadable sizes, broken hierarchy (h1→h3 skips)
- Colour tokens — hard-coded colours that skip the black/red/white system
- Mobile-only regressions — tap targets, horizontal scroll, off-screen content
- Empty/broken states (blank sections, missing images, dead links to `#`)

Deliverable: a single "findings" report grouped by page, severity-tagged (P0 broken / P1 ugly / P2 polish), attached as `/mnt/documents/visual-audit.md` with linked screenshots. No code touched in this phase.

### Phase 2 — Fix P0 (broken layouts)

Only things that are visibly broken — clipping, overlap, unreadable, off-screen. Fixed in small commits per page/component. First target is the stub-page `Related guides` grid from the screenshot.

### Phase 3 — Fix P1 (visual inconsistency)

Spacing/typography/token drift. Bring stragglers in line with the project's existing landing-section language (referenced in project memory: white bg, black text, red accents, `py-24/32` rhythm, no purple gradients).

### Phase 4 — Fix P2 (polish)

Micro-details: hover states, focus rings, subtle motion consistency.

### What I need from you before starting

1. Confirm this phased approach — or tell me to just skip to Phase 2 and start fixing without a written audit first.
2. Any route above I should skip (e.g. WIP pages)?
3. Any route missing from the list that you know is broken?

Once you approve I'll start Phase 1. Each phase ends with a checkpoint so you can steer the next one.