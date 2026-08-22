# Living With Arthritis — agent rules

Work in this Cursor repo. Do **not** spend Lovable agent or Lovable AI-gateway credits.

## Credits

- Build, edit, test, and review here with Cursor (Claude / the current Cursor model).
- Do not call the Lovable iterate-with-agent flow, Lovable MCP “message the agent”, or `/tmp/lovable_ai.py`.
- Do not trigger `.github/workflows/deploy-to-lovable.yml` from an agent run. Shipping is GitHub + Netlify (see `netlify.toml`). The existing public site remains https://livingwitharthritis.org.uk until Netlify is connected in the dashboard.

## Which model to use (burn fewer tokens)

Pick the cheapest model that can do the job. Do not load a large context or a frontier model for mechanical work.

| Kind of prompt | Use |
| --- | --- |
| Look up a file, rename, lint, tests, redirects, copy tweaks, “where is X?” | Fast / small model. Read only the files you need. |
| UI layout to match a screenshot, routing, Stripe/donate, auth | Mid-size model. Keep diffs small. |
| Medical wording, NICE/NHS claims, security, RLS, payments | Strongest available model. Never invent citations or stats. |
| Blog expansion to a word-count floor | Cursor model in-repo, not Lovable AI. Keep title/slug unchanged. |

Never paste the whole repo into a prompt. Never re-read plans under `.lovable/plan/` unless the task is specifically about one of them.

## Product (non-negotiable)

- UK English, clinically conservative. If a fact is not verified, say so or leave it out.
- Visitor-facing work: home, blogs, donate, sign-in. People should be able to open blogs, donate, and sign in with Google.
- Supabase stays the database. Google login is on `/auth`. Row Level Security must keep a signed-in person on their own rows (chats, pain journal, donations they own).
- Hosting redirects that Google needs (HTTP 301, not client-only) live in `netlify.toml`.
