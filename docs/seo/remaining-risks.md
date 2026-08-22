# Remaining Risks and Required Approvals

## Blocking infrastructure decisions

1. **Real HTTP 404 responses:** Lovable's managed SPA fallback still returns HTTP 200 for unknown paths. `netlify.toml` and `public/404.html` are now in the repo so a Netlify publish of this branch can return HTTP 404 for unknown paths. That does **not** change the live charity domain until DNS/hosting is pointed at Netlify. I am not certain of a Netlify preview URL; none has been created from this environment.
2. **Real HTTP 301 redirects:** the 19 mappings remain as React replacements on Lovable hosting. The same mappings are now also declared as force-on 301s in `netlify.toml`, gated by connecting the GitHub repo in Netlify.
3. Do not place a generic `/* /index.html 200` rule in front of a server-level 404 solution; that recreates the soft-404 problem. The Netlify catch-all points at `/404.html` with status 404 and without `force`, so prerendered files still win.

## Production data approval

Nine published `blog_articles` rows contain the placeholder registration `PH123456`. The frontend now suppresses that placeholder and unverified reviewer schema, but the production rows remain unchanged.

Per the production database safety rule, this write has **not** been run. Proposed SQL for explicit approval:

```sql
begin;

update public.blog_articles
set author_credentials = 'Editorial content'
where is_published = true
  and author_credentials ilike '%PH123456%';

update public.blog_articles
set reviewed_by = null,
    reviewer_credentials = null
where is_published = true
  and reviewer_credentials ilike '%PH123456%';

commit;
```

Expected scope from the read-only audit: 9 published articles. Re-run the count and inspect affected slugs immediately before execution.

## Clinical and editorial approval

- None of the 254 published database articles currently has an article-specific `citations` array. The previous six-source blanket was removed because it falsely implied claim-level sourcing.
- Named review must be confirmed article by article. A generic “Clinical Review Board/Panel” is not treated as a Person or proof of review.
- Verify Maxwell's profile biography, claimed experience, role, HCPC registration and consent before expanding Person schema.
- Clinically review the revised knee exercise, osteoarthritis, gout, falls and glucosamine copy before publication.
- The remaining priority pages in the master brief need source-by-source clinical/editorial work, especially medication, PMR, TENS, surgery, diet, supplements, tai chi and red-flag guidance.
- Workplace/Equality Act/benefits content requires legal-editorial review and must remain general information.

## Search and authority evidence

- The supplied Search Console baseline was used to protect URLs. No backlink platform was available.
- `/blog/arthritis-and-cycling-uk` was restored rather than redirected because it has the supplied page-one signal.
- Do not consolidate additional URLs until Search Console, backlink and internal-link evidence is reviewed.
- The two knee source URLs are ready in the map but must not be represented as completed 301s until the hosting layer supports and verifies them.

## Post-deployment checks

1. Crawl all sitemap URLs again and compare status, title, H1, canonical and robots fields with `docs/seo/content-inventory.csv`.
2. Verify the six P0 article URLs return their dedicated static HTML.
3. Confirm `/` remains self-canonical.
4. Test a random unknown URL without JavaScript.
5. Re-run mobile Lighthouse; prioritise `/blog` LCP and homepage CLS if they remain outside targets.
6. Validate representative Article, MedicalWebPage, FAQPage, Person and BreadcrumbList entities in Google's Rich Results Test/schema validator.
7. Monitor Search Console coverage, canonical selection, crawl errors, CTR and the protected ranking URLs. No ranking improvement is claimed before that evidence exists.

## Tooling limitation

The Chrome DevTools performance MCP integration was unavailable in this environment. Lighthouse CI supplied the performance baseline; detailed LCP/CLS element tracing remains a follow-up if post-deployment metrics are still poor.
