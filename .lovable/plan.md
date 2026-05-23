## Goal

Clear the five Semrush audit findings from the uploaded screenshots without changing UI behaviour or page structure.

---

## 1. Broken external links → `https://www.gov.uk/health` (404)

Semrush flagged 4+ pages linking to `https://www.gov.uk/health`, which returns 404. That URL doesn't exist on gov.uk. Replace every occurrence with the real, stable equivalent:

- **Replacement:** `https://www.gov.uk/browse/health-and-social-care` (valid, permanent gov.uk hub)

Files to update (17 occurrences total):
- `src/data/ukCities.ts` — every `trustUrl: "https://www.gov.uk/health"` (~15 cities)
- `src/pages/pillar/UKArthritisGuide.tsx`
- `src/pages/pillar/HealthServicesGuide.tsx` (2 places)
- `src/pages/pillar/ExerciseGuide.tsx`
- `src/pages/TrustCredibility.tsx`
- `src/pages/ResourceDirectory.tsx`
- `src/components/ResourceLibraryDrawer.tsx` (2 places)

Anchor text shown to users (`gov.uk/health`) stays the same — only the `href` changes.

---

## 2. AI search bots blocked in robots.txt

Semrush's "AI search visibility" check flags the `Disallow: /` rules for GPTBot, ChatGPT-User, PerplexityBot, anthropic-ai, Claude-Web, Google-Extended, CCBot. Blocking these stops the charity from appearing in ChatGPT/Perplexity/Google AI Overviews answers — bad for a discoverable health charity.

**Change in `public/robots.txt`:** flip `Disallow: /` → `Allow: /` for:
- GPTBot, ChatGPT-User, CCBot, anthropic-ai, Claude-Web, Google-Extended, PerplexityBot, FacebookBot

Keep blocking abusive scrapers that don't drive AI answers: Bytespider, ImagesiftBot, Omgilibot/Omgili, Diffbot, MJ12bot, DotBot, BLEXBot, PetalBot, DataForSeoBot, plus the Chinese/SEA crawlers already listed.

---

## 3. Low readability — `/guides/uk-arthritis` (UKArthritisGuide.tsx)

Semrush flags long sentences and complex vocabulary. Pass through `src/pages/pillar/UKArthritisGuide.tsx` and:

- Split sentences > 25 words into two.
- Replace heavy words: *utilise → use, commence → start, approximately → about, individuals → people, demonstrate → show, additional → more, prior to → before, in order to → to*.
- Add 2–3 extra `<h3>` sub-headings to break up the longest sections.
- Convert any prose run of "A, B and C" enumerations into `<ul>` bullets where natural.

Goal: short, plain-English sentences and more white space — no content removed, just rewritten and chunked.

---

## 4. Duplicate meta descriptions

Audit script `scripts/check-social-meta.mjs` already enforces presence, but not uniqueness. Quick survey didn't find obvious single-line duplicates, so Semrush is likely flagging a small pair. Approach:

- Add a small one-shot script run during the fix to list any descriptions appearing on >1 page (across `SeoHead description=...` plus `ConditionPageTemplate` props).
- For each duplicate pair found, rewrite the secondary page's description so it's unique and 140–160 chars, matching its actual content.

If the survey finds zero duplicates, mark the finding fixed with that explanation (Semrush's snapshot may have been stale before the recent SEO work).

---

## 5. Low text-to-HTML ratio

The previously-added static `#root` fallback (~900 words in `index.html`) already helps the homepage. Semrush evaluates this per URL, so thin React pages can still trip it. Targeted boost:

- Identify the 3–5 thinnest pages from `src/pages/*` (likely short hubs like `Credits.tsx`, `Gallery.tsx`, `Unsubscribe.tsx` are noindex'd and don't count — focus on indexable ones).
- Where a real indexable page is thin, add 1–2 paragraphs of genuinely useful intro/FAQ copy at the bottom (not keyword stuffing).
- No JS/CSS bloat removed — purely content additions.

---

## Verification

- `grep -rn "gov.uk/health\"" src public` → returns nothing.
- `curl -A "GPTBot" https://livingwitharthritis.org.uk/robots.txt` → shows `Allow: /` under `GPTBot`.
- Visual read-through of `/guides/uk-arthritis` confirms shorter sentences and more sub-headings.
- Duplicate-description script returns empty.
- Mark all five Semrush findings fixed via `seo_chat--update_findings` after edits land; Semrush re-crawl will reconfirm.

No DB, no auth, no UI behaviour change. Frontend-only content + `robots.txt` edits.
