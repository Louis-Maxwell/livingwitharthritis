# SEO and AI Visibility Implementation Plan

## Objective

Increase qualified UK organic traffic, healthcare trust, answer-engine citations and resource conversions for Living With Arthritis.

## Priority 0 — release blockers

- Remove obsolete required checks from the `main` branch protection rule.
- Keep current CI, security, Lighthouse and SEO guardrails required.
- Merge PR #285 only after all checks pass.
- Verify the deployed ankle exercise page, PDF URL, canonical and sitemap entry.

Acceptance criteria:
- `main` protection requires checks that actually report on pull requests.
- The live ankle page returns HTTP 200.
- The page contains the target title, H1, canonical and PDF link.
- The PDF URL downloads successfully.

## Priority 1 — technical SEO

- Prerender every published blog and guide route.
- Require one canonical, one indexability directive and one H1 per indexable page.
- Generate the sitemap from published canonical routes only.
- Test robots.txt, sitemap.xml, redirects, soft 404s and broken internal links in CI.
- Consolidate metadata and JSON-LD generation in shared utilities.
- Add responsive images, intrinsic dimensions, modern formats and lazy loading below the fold.
- Track Core Web Vitals at the 75th percentile for mobile and desktop.

Acceptance criteria:
- All published routes have initial HTML content.
- No published route is accidentally noindex.
- No sitemap URL returns a non-200 response.
- Lighthouse and accessibility budgets pass.

## Priority 1 — healthcare trust

Every medical page must include:

- named author and credentials;
- named clinical reviewer and credentials;
- published and last-reviewed dates;
- next review date;
- visible evidence references;
- editorial independence statement;
- correction/contact route;
- urgent-care escalation;
- general-information disclaimer.

Align patient advice with current NHS and NICE guidance. Medicine wording must avoid personalised prescribing or unsupported dosing.

## Priority 1 — arthritis flare-up authority cluster

Create and internally link:

- /arthritis-flare-ups/
- /arthritis-flare-ups/osteoarthritis/
- /arthritis-flare-ups/rheumatoid-arthritis/
- /arthritis-flare-ups/gout/
- /arthritis-flare-ups/when-to-call-111/
- /arthritis-flare-ups/flare-action-plan/
- /arthritis-flare-ups/exercise-during-a-flare/
- /arthritis-flare-ups/medicines-and-safety/

Each page needs a direct answer, action steps, red flags, references, reviewer data and links back to the pillar page.

## Priority 2 — AEO/GEO

- Use answer-first headings and short quotable paragraphs.
- Add valid MedicalWebPage, Article, Organization, Person and BreadcrumbList JSON-LD.
- Add FAQPage only where the FAQs are visible.
- Add HowTo only for genuine step-by-step patient resources.
- Publish stable reference URLs and a grouped evidence library.
- Maintain a monthly AI visibility test set across ChatGPT, Copilot, Gemini, Claude and Perplexity.

## Priority 2 — analytics

GA4 events:

- article_view
- resource_download
- nhs_111_click
- contact_click
- donation_click
- article_feedback

Do not send free-text symptoms, names, email addresses or other health information to analytics.

Search Console review every week:

- high-impression, low-CTR pages;
- positions 4–20;
- indexing exclusions;
- soft 404s;
- crawl errors;
- sitemap status;
- mobile page experience;
- query cannibalisation.

## Priority 3 — authority and growth

- Publish evidence-supported content around osteoarthritis, rheumatoid arthritis, chronic pain, healthy ageing, frailty, exercise and self-management.
- Improve links from relevant UK healthcare, charity and community organisations.
- Refresh declining pages using Search Console query data.
- Consolidate overlapping articles.
- Create downloadable patient tools that earn legitimate references and links.

## Definition of done

A release is complete only when:

1. Source changes are reviewed.
2. Lint, typecheck, tests, security, Lighthouse and SEO checks pass.
3. Sitemap and canonical audits pass.
4. The PR merges successfully.
5. The live URL is checked after deployment.
6. Search Console sitemap/indexing checks are completed.
7. GA4 events are verified without collecting health data.
