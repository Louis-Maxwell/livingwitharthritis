# AEO/GEO implementation strategy

## Purpose

This document turns the Living With Arthritis AEO/GEO audit into a repository-owned delivery plan for Google Search, Bing, Google AI Overviews, ChatGPT, Copilot, Gemini and Perplexity.

The site already has strong foundations: UK charity identity (registered charity 1218461), named clinical review, review dates, UK-specific guidance, answer-oriented content, extensive article coverage and machine-readable guidance at `/llms.txt` and `/llms-full.txt`.

## Delivery priorities

1. **Technical clarity:** eliminate invalid or duplicated JSON-LD, keep one canonical per route, remove duplicate/retired URLs from sitemaps, keep redirect sources out of indexes, and validate prerendered HTML in CI.
2. **Answer-first articles:** put a 40–70 word direct answer immediately after the H1, followed by 3–5 key takeaways, scope, evidence, safe next steps, escalation advice, FAQs and related guides.
3. **Evidence and trust:** use stable author/reviewer `@id` entities, `datePublished`, `dateModified`, `lastReviewed`, visible citations, evidence strength, correction history and transparent editorial boundaries. Never invent credentials or reviewer claims.
4. **Topic architecture:** connect each supporting page to its pillar, a condition/symptom page, a management page, a safety page and a UK support page using descriptive anchors.
5. **Distinctive UK value:** prioritise practical lived-experience implementation, NHS navigation, PIP/work support, frailty, falls, exercise modification and carer guidance rather than copying broad NHS definitions.
6. **Performance:** target LCP <2.5s, INP <200ms and CLS <0.1 by reducing HTML/hydration cost, sizing hero images, deferring third-party scripts and preventing layout shifts.
7. **Quality gates:** generated pages need unique introductions, clinical caveats, evidence, links, reviewer assignment and duplicate/thin-page controls.

## Priority article template

```text
H1: Exact user question or intent
Direct answer: 40–70 words
Key takeaways: 3–5 facts, one safety boundary, one next step
Who this is for
What the evidence says
What you can try
When to contact a GP, pharmacist, rheumatology team or NHS 111
Expert summary and clinical review metadata
Visible FAQs (FAQPage only when present on-page)
Sources and further reading
Related guides
```

## Schema and entity requirements

Use only schema supported by visible content:

- `Article`/`BlogPosting`, `MedicalWebPage` where appropriate, `BreadcrumbList`
- `FAQPage` only for visible FAQs
- `HowTo` only for genuine step-by-step guidance
- stable `@id`, canonical URL, `inLanguage: en-GB`
- `author`, `reviewer`, `publisher`, `datePublished`, `dateModified`, `lastReviewed`, `citation`

Avoid duplicate FAQ blocks, empty `mainEntity`, unsupported medical properties and credentials that cannot be verified.

## Trust and editorial backlog

Author/reviewer pages should show role, regulator and registration where accurate, scope of practice, review date, next review date, conflicts, editorial responsibilities, review methodology and commercial independence. Add evidence grading, update history, correction policy, complaints/contact process, accessibility information, charity governance and annual-report links. Medication and supplement content should be reviewed by a pharmacist or prescriber where feasible.

## Measurement

Track monthly:

- invalid structured-data count and duplicate URL count;
- sitemap/redirect/404/soft-404 deltas;
- Core Web Vitals;
- indexed priority routes;
- impressions and CTR for answer queries;
- AI citation/answer coverage by engine;
- internal-link coverage and one-link pages;
- content refresh and review compliance.

Use Search Console for property/indexing actions; source changes in this repository prepare the site for those human-controlled dashboard actions.

## 30/60/90-day execution

- **Days 1–30:** fix schema duplication, consolidate duplicate URLs, reformat the top 20 pages, add citations/review metadata, strengthen internal links, add escalation boundaries, improve author/reviewer pages, compress priority images and rerun route/schema/sitemap tests.
- **Days 31–60:** publish 20 priority articles, refresh 30 existing pages, create five pillars (osteoarthritis, rheumatoid arthritis, exercise, pain management, benefits/work), add the evidence register, reviewer workflow, 10 patient tools and UK-nation guidance.
- **Days 61–90:** publish 30 more articles, consolidate cannibalising pages, complete cluster links, pursue 5–10 relevant authority relationships, refresh high-impression/low-CTR pages and compare a new Semrush crawl.

## Five pillar hubs

- Osteoarthritis
- Rheumatoid arthritis
- Exercise and physiotherapy
- Pain management
- UK benefits and work

## Linkable assets and authority targets

Prioritise practical, evidence-led assets for NHS/local NHS services, Arthritis UK/Versus Arthritis, CSP, Arthritis Action, Age UK, Patient.info, Carers UK, Citizens Advice, Disability Rights UK, universities and relevant professional groups. Seek references to tools and evidence summaries, not mass links to near-duplicate articles.

## Definition of done

A strategy item is complete only when the source change is implemented, relevant tests pass, the rendered route is inspected where layout changes, and the change is recorded in a reviewable commit/PR.