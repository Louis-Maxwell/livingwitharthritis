# Agent notes — Living With Arthritis UK

Read this before spending AI credits on this repo.

## Credits policy

- Build and edit **in this GitHub repo** with Cursor / Claude (or other Cursor models).
- **Do not** use Lovable credits: no Lovable agent, Lovable MCP, Lovable AI gateway (`/tmp/lovable_ai.py`), or “send this to Lovable to execute”.
- The `enforce-blog-min-wordcount` skill currently calls the Lovable AI gateway. **Do not run that skill** until it is rewritten to a Cursor model.
- Hosting may still ship through the existing GitHub → live pipeline. Do not add new Lovable-only workflows.

## Model routing (burn fewer tokens)

Start **one tier below** what the task feels like. Escalate only if the cheaper pass fails.

| Job | Start with | Avoid by default |
|---|---|---|
| Docs, comments, copy polish, FAQ text, JSON/SEO fields | Fast / low / mini-class | Max, xhigh, Opus-class |
| Single-file UI fix, one page, one redirect | Medium / default | Max, xhigh |
| Multi-file feature, routing, tests | High only after a cheaper pass missed something | Opening at max |
| Wide repo rewrite, architecture | Split into pieces; do not open at max | Whole-site “improvise everything” in one run |

Token-thrift rules:

1. Change the smallest surface that visitors will see or that Google will crawl.
2. Do not re-add removed platforms (Supabase, Vercel, Cloudflare API) unless the CEO explicitly reverses `SUPABASE_REMOVAL_NOTES.md`.
3. Do not regenerate sitemaps, OG images, or full head JSON unless the content you edited needs them.
4. Do not expand every blog post in a PR that is about condition pages.
5. Prefer unique FAQs and extra sections over new frameworks.

## Product facts (do not guess)

- Public site: https://livingwitharthritis.org.uk
- Charity pages, blogs, and donate already exist. Improve them in place.
- `/conditions/:slug/{symptoms,treatment,exercises,diet}` must be real pages with written copy, not the homepage shell (soft-404).
- `/conditions/hip-arthritis/exercises` **301s** to `/guides/hip-exercises-for-osteoarthritis`. Other hip subpages and all elbow subpages are real pages.
- After changing `src/data/conditionSubpages.ts` or FAQs, regenerate `scripts/condition-head-data.json` so crawlers still see real HTML.

## CEO automation brief

The recurring CEO prompt asks for an interview, a screenshot match, Netlify, and Supabase + Google login + RLS. In Cursor automations there is no live CEO, no screenshot, and no hosting dashboard. Do not invent a Netlify URL. Record open decisions in `docs/CEO-AI-COST-CONTROL-PLAN.md` §6.
