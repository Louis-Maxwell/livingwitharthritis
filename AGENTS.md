# Living With Arthritis — Cursor agent routing

This repo is the live charity site (https://livingwitharthritis.org.uk). Work here in Cursor. Do **not** use the Lovable agent, Lovable AI gateway, or `iterate-with-agent` — those burn Lovable credits.

## Which model to use (burn fewer tokens)

Pick the smallest model that can do the job. Do not spawn extra agents for grep, tests, or one-file edits.

| Job | Model choice |
| --- | --- |
| Find a file, fix a sitemap, tweak copy, run tests, JSON-LD, redirects | Fast / small model (Composer or equivalent) |
| Layout or interaction that visitors see | The current session model; verify in the browser |
| Medical wording, NICE/NHS claims, statistics | Stronger model only. Never invent citations, paper titles, or numbers. If unsure, omit the claim. |
| Expanding published blog bodies in the database | Out of scope for Lovable. Use Cursor only, and only when explicitly asked. |

Default: stay in this session. One pass. No duplicate reviews.

## Product rules

- Talk to the CEO about what people can see, click, or decide. Decide the technical parts yourself.
- Public site, blogs, donate, Google sign-in on `/auth`, and Row Level Security already exist. Do not rebuild them.
- Hosting: Netlify/Vercel from this GitHub repo. Do not invent a live URL.
- Google provider still has to be switched on in the Supabase dashboard; this environment cannot do that.
