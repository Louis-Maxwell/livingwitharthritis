## Goal
Maximise the site's visibility in AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude) and voice assistants by hardening AEO (Answer Engine Optimisation) and GEO (Generative Engine Optimisation) signals across every public route.

The site already has strong foundations (PageSchema, llms.txt, ai.txt, sitemap edge function, daily-seo-refresh). This plan fills the remaining gaps that materially move the needle for LLM citation.

---

## Phase 1 — Site-wide AEO/GEO primitives (highest impact)

1. **Upgrade `public/llms.txt` to a full content index**
   - Current file is light. Rewrite as the canonical "AI map" of the site: site description, E-E-A-T statement, then grouped links (Conditions, Treatments, Diet, Exercises, Self-Help, Guides) with 1-line summaries each.
   - Add a companion `public/llms-full.txt` containing condensed plain-text answers to top patient questions (what is OA, best diet, best exercises, supplements, flare-ups) — this is what Perplexity/ChatGPT prefer to ingest.

2. **Add `Speakable` + `Citation` schema to every key article/condition page**
   - Extend `PageSchema.tsx` to optionally emit `citation` (sources used) and richer `author`/`reviewedBy` (MedicalAuthor from `medical-authors.json`) — Google AI Overviews favours pages with explicit reviewer credentials.
   - Mark the intro paragraph of each condition/guide with `class="speakable-intro"` so the existing speakable selector kicks in.

3. **Add an "AI Answer Box" pattern to top pages**
   - New `<AnswerBox>` component: a 40–60 word plain-English answer placed directly under the H1 on Diet, Exercises, Conditions, Flare-ups, About OA. This is the single biggest AEO win — LLMs lift these verbatim.
   - Each AnswerBox is wrapped in `speakable-intro` and mirrored into FAQPage schema.

4. **Expand FAQPage schema coverage**
   - Audit existing pages; add 5–8 high-intent Q&As to: Diet Hub, Exercise Hub, each condition subpage, Self-Help Tool, Flare-ups, About. Questions sourced from People-Also-Ask patterns ("how to", "best", "is X safe", "how long").

---

## Phase 2 — Crawler & retrieval hygiene

5. **`robots.txt` — explicitly allow AI crawlers**
   - Add allow blocks for: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `Google-Extended`, `Applebot-Extended`, `ClaudeBot`, `anthropic-ai`, `Bytespider`, `Meta-ExternalAgent`, `CCBot`, `cohere-ai`, `Diffbot`, `DuckAssistBot`, `Amazonbot`, `MistralAI-User`.
   - Keep existing `Disallow` paths intact.

6. **`public/.well-known/ai.txt` — enrich**
   - Add per-bot `Allow` lines mirroring robots.txt and add `Training-Data:` policy + `License:` (CC-BY-4.0 or similar — to confirm with you).

7. **Sitemap — add `<news:>` / `<image:>` namespaces where applicable** and ensure every new AnswerBox-bearing page has fresh `lastmod`.

---

## Phase 3 — Entity & authority signals

8. **Sitewide `Organization` + `MedicalOrganization` JSON-LD with `sameAs`**
   - Inject once at root (via `useEffect` in `App.tsx`) listing official social/profile URLs (Pinterest, Facebook, X, LinkedIn, YouTube, Wikidata if available) — strengthens entity disambiguation for LLMs.

9. **Author entity pages**
   - Verify each `medical-authors.json` entry has a public `/authors/<slug>` route emitting `Person` + `medicalSpecialty` schema. Add any missing ones. LLMs cite pages whose authors have crawlable bios.

10. **Internal linking pass for AEO**
    - From each AnswerBox, link to 2–3 deeper cluster pages (uses `suggestInternalLinks` from `keyword-clustering.ts`). Builds the topical graph LLMs reward.

---

## Phase 4 — Validation

11. Run `scripts/validate-jsonld.mjs` on all new schemas.
12. Trigger `seo_chat--trigger_scan` for confirmation.
13. Submit updated sitemap via `indexnow-ping` edge function.

---

## Files to touch

**New**
- `src/components/seo/AnswerBox.tsx`
- `src/components/seo/RootOrganizationSchema.tsx`
- `public/llms-full.txt`

**Edit**
- `public/llms.txt` (rewrite as content index)
- `public/robots.txt` (AI crawler allow list)
- `public/.well-known/ai.txt` (per-bot allows, license)
- `src/components/seo/PageSchema.tsx` (citation, reviewedBy support)
- `src/App.tsx` (mount RootOrganizationSchema)
- Top 10–15 pages (Diet, Exercises, Conditions/*, Flare-ups, About OA, Self-Help, Guides/*): add `<AnswerBox>`, expand FAQ arrays, add `speakable-intro` class
- `supabase/functions/generate-sitemap/index.ts` (no structural change; auto-picks new pages)

No backend schema changes, no styling/visual changes beyond the AnswerBox component (will follow existing white/black/red tokens).

---

## Scope check before I build

A few things I want to confirm so I don't over-build:

- Should the AnswerBox be **visible on the page** (a styled card under each H1) or **invisible** (schema-only, hidden div)? Visible is far more effective for AEO because LLMs trust rendered content; it also helps human readers. I recommend visible, matching arthritis.org's lead-paragraph style.
- For the `Organization.sameAs` list, do you have **confirmed live profiles** beyond Pinterest? (I'll only include URLs you've verified — fabricating social links hurts trust.)
- Content license in `ai.txt` — happy with **CC-BY-4.0 (attribution required)**, or stricter "citation required, no training"?
