# Agent routing (Claude / Cursor — not Lovable)

Work on this repo in **Cursor / Claude credits**. Do **not** call the Lovable
agent, Lovable Cloud AI gateway, or `ai.gateway.lovable.dev` to generate
content. Shipping still happens via GitHub → the usual host.

## Burn fewer tokens

1. **Cheap pass first.** List files, grep, read the one component you will
   change. Do not load `src/data/blogArticles.json` or huge JSON heads unless
   the task is that inventory.
2. **Small model for mechanical work.** File moves, test runs, robots/sitemap
   copy, schema field adds, lint. Save a stronger model for medical copy and
   anything that could mislead a patient.
3. **One slice per session.** Homepage, then crawler files, then one hub —
   not “the whole site” in one prompt.
4. **Cite existing pages.** Prefer linking guides already on the site. Do not
   invent NICE/NHS numbers, paper titles, or quotes.
5. **UK English** and YMYL caution: if a clinical claim is not already on a
   live page or a named official source, leave it out.

## Model choice (intent)

| Job | Prefer |
|---|---|
| Search, diffs, tests, headers, schema fields | Fast / low-token model |
| Visible copy, FAQ answers, medical accuracy | Stronger model, short context |
| Blog expansions ≥1,400 words | Stronger model, **one article per call** |

## Do not

- Open Lovable to “save time”.
- Duplicate organisation JSON-LD on the homepage (root schema + `index.html`
  already define the charity).
- Invent a Netlify preview URL. Live site: https://livingwitharthritis.org.uk
