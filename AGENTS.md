# Living With Arthritis UK — agent rules

Read this before changing the site.

## Credits (non-negotiable)

- Work only in **Cursor / Claude**. Do **not** call the Lovable agent, Lovable AI gateway, or Lovable MCP tools.
- Do **not** resurrect Supabase, Google login, or Row Level Security. Auth and admin routes stay on `AdminPaused`.
- Do **not** invent a Netlify preview URL. The live site is **https://livingwitharthritis.org.uk**.

Plain-English cost plan for the CEO: `docs/CEO-AI-COST-CONTROL-PLAN.md`.

## Model routing (burn fewer tokens)

Start **one tier below** what you think you need. Never open a task at max / xhigh.

| Job | Start here |
| --- | --- |
| Copy tweak, meta, FAQ link, title lock | small / low |
| One page + tests | medium |
| Multi-page SEO/AEO/GEO pass | medium, then one higher only if stuck |
| Whole-repo rewrite | do not; split into pieces |

Token-thrift: read the files you will change, not the whole tree; reuse existing components; do not regenerate blogs or images unless asked.

## Homepage locks

- Helmet `<title>` on `/` must equal `HOME_PAGE_TITLE` in `src/lib/homeSeo.ts`, which must equal `index.html` `<title>`.
- Do not add a second thin MedicalOrganization JSON-LD on `/`.
- UK coverage: England, Scotland, Wales, Northern Ireland under the hero. No Oswestry (or any) street address on the homepage.
- Start here includes PIP / benefits. FAQ answers link through to diet, chat, osteoarthritis, PIP, waiting-list and work-rights pages.
- WebSite JSON-LD stays UK-scoped with speakable selectors (`h1`, `.speakable-intro`).
