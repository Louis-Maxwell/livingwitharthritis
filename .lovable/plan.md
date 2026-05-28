## Plan: Match the reference site's AI visibility, SEO & rankings

### What the screenshot shows (the target to match)

The dashboard is for **`arthritis-uk.org`** (Authority Score 55, ~155K organic traffic/month, 54.7K organic keywords, 8.6K referring domains, AI Visibility 43 with 631 LLM mentions across ChatGPT / Google AI Overviews / AI Mode / Gemini, and 470 cited pages). That is a different domain to our project (`livingwitharthritis.org.uk`). Quick note — I'll treat it as the reference benchmark, not as our own data, and I won't copy any of its copy or brand assets.

Realistic framing before we start: matching an AS-55 domain with 8.6K referring domains is a 6–18 month off-page effort, not a code change. What I **can** ship in code is the on-page, schema, AEO and AI-visibility layer that lets each new backlink and citation actually rank. That's where this plan focuses.

### Step 1 — Spawn one `capable` background subagent (read-only)

Role: senior SEO + AEO engineer. Brief:

1. Pull `semrush--domain_analysis`, `top_pages`, `competitive_analysis`, `backlink_analysis` on `arthritis-uk.org` and `versusarthritis.org` in the `uk` database.
2. Pull the same set for `livingwitharthritis.org.uk` so we have a true gap list.
3. For the top 30 traffic-driving competitor URLs, fetch the live HTML and extract: title pattern, H1 pattern, intro-paragraph length, FAQ block presence, JSON-LD types used (`MedicalCondition`, `MedicalWebPage`, `FAQPage`, `HowTo`, `BreadcrumbList`, `Speakable`), TOC, "key takeaways" boxes, internal-link density.
4. Inspect `arthritis-uk.org/llms.txt`, `/.well-known/ai.txt`, `/sitemap.xml` to see what they expose to LLM crawlers vs us.
5. Return one structured report: keyword-gap table (top 30), schema-gap table per route type, AEO-pattern checklist, AI-visibility checklist, prioritised code-fix list mapped to files in our repo.

### Step 2 — Apply the fixes (one build pass)

**AEO / AI-visibility (this is where the screenshot's "631 mentions / 470 cited pages" gap is won):**
- Expand `public/llms.txt` from minimal to a full structured manifest (purpose, grouped URLs by topic, last-updated dates, citation policy) — LLM crawlers cite sites with rich llms.txt far more often.
- Add a 40–60-word "answer paragraph" directly under the H1 on every condition, diet, exercise, tool and pillar page — the verbatim format AI Overviews / ChatGPT / Perplexity lift.
- Add `FAQPage` JSON-LD to all 11 condition pages, 4 Tai-Chi pages, Mediterranean diet, myths page, and the 5 pillar guides.
- Add `MedicalCondition` schema (`signOrSymptom`, `cause`, `riskFactor`, `possibleTreatment`) to every condition page.
- Add `SpeakableSpecification` to article-style pages so voice/AI assistants quote our summary boxes.
- Add a "Key takeaways" 3–5 bullet box at the top of every long-form article.
- Verify prerendered HTML (via `scripts/prerender-routes.mjs`) covers every new/changed public route so LLM crawlers see the content without executing JS.

**SEO (on-page):**
- Implement the top 20 keyword-gap fixes the subagent surfaces (H1 / title / meta / intro rewrite on the targeted page).
- Add `BreadcrumbList` JSON-LD sitewide where it's currently inconsistent.
- Add hub-and-spoke internal-link blocks ("Related conditions", "Related exercises") on condition pages — matches the link-equity pattern Arthritis Foundation and Versus Arthritis use.
- Tighten any remaining over-length titles.

**GEO (UK local):**
- Audit our `CityArthritisPage`, `CityConditionPage`, `RegionHub` against the UK city/region terms competitors rank for; flag missing cities for content extension.
- Strengthen `MedicalBusiness` + `Place` schema with `areaServed`, `availableService`, `geo` coordinates.

**Performance (AI crawlers reward fast pages):**
- `<link rel="preload">` for the hero LCP image.
- Verify `font-display: swap` on all custom fonts.
- Lazy-import any heavy non-critical route components the subagent flags.

**Verification:**
- Run `seo_chat--update_findings` on every failing SEO finding the fixes resolve.
- Suggest you click Rescan in the SEO tab.

### What I will NOT do

- Copy any text, image, JSON-LD content, or branding from `arthritis-uk.org` / `versusarthritis.org`. Research is for structure, schema and keyword strategy only; copy will be original and grounded in the project knowledge base.
- Buy or fabricate backlinks. The 8.6K-referring-domains gap is a real-world outreach/PR job, not a code change.
- Add `/admin`, `/auth`, `/chat` to sitemap (still blocked by robots.txt — that decision stands).
- Run a literal 24/7 watcher. The existing GitHub Actions already block broken commits; the daily sitemap rebuild cron is the practical equivalent and is already in plan.

### What needs your call before I spawn

The subagent will use ~15–20 Semrush calls. Confirm one:

1. **Go ahead — spawn the subagent now and apply all fixes in one build pass.** (Fastest. You'll see one big PR-equivalent.)
2. **Research only this turn — return the gap report, you review, then approve which fixes ship.** (Safer if you want to scope.)
3. **Skip research, just ship the deterministic AEO + schema + llms.txt + speakable fixes now.** (No Semrush spend; smaller uplift but immediate.)

Approve to proceed.