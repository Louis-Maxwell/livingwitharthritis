# Month-1 build plan (Claude credits only)
### Honest scope and week-by-week deliverables

## The candid framing
Arthritis Action UK: **Authority Score 55, 9,300 referring domains, 164K
organic traffic** — a **40-year-old charity**. Your target site: registered
2024. No amount of code closes 40 years in 30 days. What the four weeks
below deliver is the **fastest legitimate 12-month trajectory** a solo-founded
charity can run — starting from a strong month 1.

## Realistic month-1 outcomes
- ~230 new indexable, schema-rich pages shipped as static HTML
- 20-60 new referring domains (if outreach executed weekly per playbook)
- Authority Score 2-5 (from 0-1); the Semrush Authority Score curve is
  almost entirely referring-domain driven for new sites
- 300-1,500 organic monthly visits (Google indexes new domains slowly)
- Foundation set for the month-2-through-12 compounding curve

## Week 1 — DONE in this bundle
- [x] **30 comparison guides** (`/guides/{topic}-vs-{topic}`) — the
      queries answer engines disproportionately cite. Each has an answer-
      first summary, "when would you pick A vs B", caveats, and NHS/NICE
      sources. Wired into `scripts/ai-head-data.json`.
- [x] **110-term glossary** — 110 individual `/glossary/{term}` pages
      plus a `/glossary` index. Highest per-effort AI-citation asset;
      each entry has plain-English short definition + longer explanation.
- [x] **Route lists** — `src/data/comparison-routes.generated.ts` and
      `src/data/glossary-routes.generated.ts` for prerender + sitemap.
- [x] Everything is static HTML on publish (via inject-canonicals.mjs).

## Week 2 — Trust and outreach assets (bring me back next week)
- [ ] Press-kit page (`/press`) with charity 1218461, clinical reviewer
      credentials, downloadable logo pack, 20 sourced UK arthritis stats
- [ ] 5 HARO/journalist response templates ready to fire within 60 min
- [ ] 15 UK health directory application drafts (NHS partners,
      Patient.info, HealthUnlocked, Charities Aid Foundation, etc.)
- [ ] Email template for university physio/OT/rheumatology course leads

## Week 3 — Content velocity
- [ ] 40 condition-in-city cross pages (osteoarthritis London etc.) —
      the 30k keyword file already maps them; will write unique local
      hooks per page, NOT programmatic filler
- [ ] 20 "newly diagnosed with X — first 30 days" hub pages (highest
      dwell time and conversion in the health space)

## Week 4 — Retention & conversion loops
- [ ] 7-day arthritis email course (drip via Resend + Supabase)
- [ ] Weekly newsletter template + first four issues drafted
- [ ] Live Q&A landing page for the clinical reviewer

## What YOU do this week
1. Drag this bundle into GitHub (~5 min)
2. Publish in Lovable once
3. Verify the new routes render (spot-check `/guides/paracetamol-vs-ibuprofen-for-arthritis` and `/glossary/dmard`)
4. Start 1 outreach action from `GROWTH-PLAYBOOK.md` — the compounding
   curve only starts once you do

## When to come back
Any time next week for the Week 2 batch. No timer required — the
compounding of these assets happens on your commit + publish cadence.
