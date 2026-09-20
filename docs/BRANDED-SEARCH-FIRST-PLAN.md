# Branded search plan — rank first for “Living With Arthritis”

**Goal:** When someone types *living with arthritis* (and close brand variants) in Google/Bing/AI search, **Living With Arthritis UK (charity 1218461)** appears first as *the organisation*, not NHS “living with” condition pages or Arthritis UK.

**Honest limit:** Nobody can force Google to put any site #1. The phrase *living with arthritis* is also a common **informational** query (NHS, Arthritis UK, Arthritis Action). We win by owning **brand intent** hard, then expanding into the generic phrase over months with authority.

**Domain:** https://livingwitharthritis.org.uk  
**Charity:** Living With Arthritis — England & Wales **1218461** (independent of Arthritis UK)

---

## Target queries (priority order)

| Priority | Query type | Examples | Realistic aim |
|----------|------------|----------|---------------|
| P0 | Exact brand | `living with arthritis`, `living with arthritis uk`, `livingwitharthritis` | Homepage #1 organic + sitelinks |
| P0 | Brand + charity | `living with arthritis charity`, `living with arthritis registered charity` | Homepage / About #1 |
| P1 | Brand + place/service | `living with arthritis helpline`, `living with arthritis oswe…` (only if public address policy allows) | Relevant service page |
| P1 | Navigational | `livingwitharthritis.org.uk` | Direct site |
| P2 | Brand misspellings | `living with arthritus`, `liveing with arthritis` | Still our homepage |
| P3 | Generic phrase | same words, info intent | Compete over 3–12 months; do not expect overnight #1 vs NHS |

Measure weekly in Google Search Console: query contains `living with arthritis` → clicks, impressions, average position for `/` and `/about`.

---

## Phase 0 — Baseline (recorded 2026-09-20)

Honest open-web snapshot from this run (no GSC export; **Ahrefs GSC/SERP APIs unavailable — insufficient plan**). Fill the Day-0 scoreboard from Google Search Console after Louis shares a 28-day branded-query export.

| Query | Intent | What already ranks | Implication |
|-------|--------|--------------------|-------------|
| `living with arthritis` | **Informational / medical** (how to live with the condition) | NHS, Arthritis UK / Versus Arthritis, other clinical publishers win open web search | Do **not** expect homepage #1 overnight. Own **brand intent** first; treat the bare phrase as a 3–12 month authority goal. |
| `living with arthritis uk` | Brand / navigational | Our site and charity records compete with the larger brand | Title/OG must lead with the exact charity name so snippets and sitelinks attach to **us**. |
| `living with arthritis charity` / `1218461` | Brand + entity | **Already surfaces the charity** via [Find that Charity (GB-CHC-1218461)](https://findthatcharity.uk/orgid/GB-CHC-1218461), the Charity Commission register, and `/about` | Entity graph is started. Keep `sameAs` and on-site facts identical so Google does not split us from Arthritis UK. |

**On-site entity (live + this repo, 2026-09-20)**

- Homepage and About already ship **Organization JSON-LD** with GB-CHC **1218461** (`#root-organization-jsonld` in `index.html`, refreshed by `src/lib/rootOrganizationSchema.ts` / `<RootOrganizationSchema />`).
- `sameAs` must be **only** `getSchemaOrgSameAs()` from `src/config/social-media.ts` plus Charity Commission, Find that Charity, and NGO Explorer. No invented social URLs.
- Confirmed owned profiles: Facebook `61583723925315`, Instagram `livingwitharthritisuk`, LinkedIn `112596569`, YouTube `@livingwitharthritisuk`.
- Founder in schema: Louis Maxwell, HCPC **PH128483**.
- **Oswestry registered address stays off the public site** (footer, schema, About, `llms.txt` / `ai.txt`). Charity Commission / Find that Charity may still list Oswestry East — that is a portal field for Louis, not copy we restore on the website. A 2026-09-20 web snapshot of live `/about` still mentioned Oswestry; that is a **stale publish**, not a reason to put the street back.

**Still to do in GSC / Bing (Louis)** — see `docs/BRANDED-ENTITY-OFFSITE-CHECKLIST.md`.

1. GSC: last 28 days for query contains `living with arthritis` (clicks, impressions, avg position for `/` and `/about`).
2. Bing Webmaster: same check; verify property + submit sitemap if not already.
3. After the next Lovable publish: URL Inspection for `/` and `/about`.

**Success:** We know current rank and who beats us; Day-0 cells below are filled from GSC, not guessed.

---

## Phase 1 — Own the brand on our site (1–2 weeks)

### Homepage & About (entity clarity)

- Title pattern: `Living With Arthritis UK | Registered Charity 1218461` (or keep customer H1, but title/OG must lead with **exact charity name**).
- First screen: legal name + “Registered charity 1218461” + “Independent of Arthritis UK”.
- About page: one clear “Who we are” block for Google (name, number, what we do, who we serve, contact).
- Organization / NGO JSON-LD: `name`, `legalName`, `url`, `sameAs` (Charity Commission, Facebook, Instagram, YouTube, LinkedIn if real), `foundingDate`, `identifier` charity number.
- Keep `llms.txt` / `ai.txt` preferred citation = our homepage + About (already started).

### Technical

- Canonical homepage = `https://livingwitharthritis.org.uk/`.
- No soft-404 / homepage title bleed on other URLs (already hardening).
- Sitemap + IndexNow after every publish.
- GSC URL Inspection → Request indexing for `/` and `/about`.

### Off-site identity (must match site)

- Charity Commission listing website = livingwitharthritis.org.uk.
- Companies House / CIO records consistent.
- Social profiles: display name **Living With Arthritis** / **Living With Arthritis UK**, bio with charity number + URL.
- Google Business Profile **only if** a public location policy allows (Louis: keep Oswestry off public site unless policy changes) — otherwise skip GBP or use service-area without street if Google allows.

**Success:** Searching the brand shows our homepage with charity number in the snippet; Knowledge Panel starts forming if Google has enough entity signals.

---

## Phase 2 — Citations & “entity graph” (2–6 weeks)

Google ranks brands it can *verify as organisations*. Build the same facts everywhere:

| Source | Action |
|--------|--------|
| Charity Commission | Website, activities, contact correct |
| Find that Charity / open data | Already indexed — keep URL stable |
| Facebook Page | Exact name, about text, website button |
| Other directories | Genuine UK charity directories only (no spam) |
| Press / partners | 2–5 real mentions with exact name + link |
| Wikidata | Create/claim item for the charity (name, inception, official website, Charity Commission ID) when ready — helps Knowledge Graph |
| Wikipedia | Only if notability criteria met; do **not** create promotional stubs |

Earn links from: local NHS trust patient pages, ARMA-style directories, university physio blogs, genuine news — **no** paid link schemes.

**Success:** `sameAs` URLs all resolve; brand query shows rich result / sitelinks.

---

## Phase 3 — Brand defence & demand (ongoing)

### Organic content that reinforces the brand

- Pillar: “About Living With Arthritis UK” (already) + “How we help people living with arthritis in the UK”.
- Internal links: every money hub links to About with anchor “Living With Arthritis UK (charity 1218461)”.
- Blog/footer: consistent brand string, not shortened to “LWA” alone in titles.

### Paid (optional, fast)

- Google Ads **exact match** brand campaigns: `living with arthritis`, `living with arthritis uk`, `living with arthritis charity`.
- Budget: small daily UK-only; goal is #1 when organic is not yet.
- Ad copy: charity number + independent of Arthritis UK.
- Pause if organic brand CTR is strong and CPA not needed.

### Social & PR

- Regular posts that use the full name.
- Local/national stories: founder FCP, Motions is Lotion, free guides — always with site URL.

**Success:** Brand query → our site in organic *and/or* paid position 1; competitors cannot cheaply squat the name.

---

## Phase 4 — Compete for the generic phrase (3–12 months)

Only after brand is stable:

1. Best-in-UK pages for customer jobs (pain now, newly diagnosed, exercises, PIP, diet) — customer-first, not vanity.
2. Earn topical authority (reviews, citations, unique UK guidance).
3. Track generic `living with arthritis` separately from brand+charity queries.
4. Accept NHS may keep informational #1 for some intents; aim for **charity / support** intent pack.

---

## What not to do

- Buy links, PBNs, fake reviews, cloaking, or traffic bots.
- Imply we are Arthritis UK / Versus Arthritis.
- Expect #1 on the bare phrase in days because of AI tools alone.
- File a weak word-only trade mark and assume that forces Google rankings (trade mark ≠ ranking).

---

## Owner checklist (Louis)

| When | You do |
|------|--------|
| Now | Confirm GSC + Bing verified; share 28-day branded query export if asked |
| After each publish | Lovable publish `main`; IndexNow; GSC inspect `/` and `/about` |
| Weeks 1–2 | Align social bios + Charity Commission website field |
| Month 1+ | Approve small brand Ads budget if organic brand not #1 yet |
| Ongoing | Real partnerships / press only |

## Grok Bot owns

- Homepage/About title + schema tweaks for brand entity.
- Soft-404 / crawl hygiene.
- IndexNow + sitemap freshness.
- Tracking doc updates; weekly branded-query read when GSC connected.
- Optional: Wikidata draft text for Louis to publish.

---

## 90-day scoreboard (Day 0 = 2026-09-20)

GSC cells are placeholders until Louis exports Search Console. Ahrefs rank tracking was **not** available this run.

| Metric | Day 0 (2026-09-20) | Day 30 | Day 90 |
|--------|--------------------|--------|--------|
| Avg position GSC: `living with arthritis` | _placeholder — informational SERP; medical sites win_ | Track only (not a brand-win KPI) | Track vs NHS / Arthritis UK |
| Avg position GSC: `living with arthritis uk` | _placeholder_ | ≤5 | 1–3 |
| Avg position GSC: `living with arthritis charity` | _placeholder — Find that Charity / About already visible in open web_ | ≤3 | 1–2 |
| Homepage sitelinks present | _placeholder_ | Yes | Yes |
| Brand Ads needed? | Out of scope this sprint | Review | Off if organic owns |

---

*Phase 0 baseline recorded 2026-09-20 for Living With Arthritis UK. Consolidates PR #62. Legitimate SEO only. Off-site Louis actions: `docs/BRANDED-ENTITY-OFFSITE-CHECKLIST.md`.*
