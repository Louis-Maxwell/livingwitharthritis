# How to work on Living With Arthritis

The live site is already https://livingwitharthritis.org.uk. Do not start a new app. Improve this one in Cursor.

## Credits

- Do **not** use Lovable Agent, the Lovable AI gateway, or `/tmp/lovable_ai.py`. Those burn Lovable credits.
- Do all writing, coding, reviews and blog expansions in Cursor.

## Which model to use (spend fewer tokens)

Pick the cheapest model that can still do the job. Do not default to the largest model.

| Kind of prompt | Use |
| --- | --- |
| Typos, config, lockfiles, wiring a known pattern, tests that copy an existing test | Fast / small model |
| “Does this page match the live site?” / routing / SEO config | Fast / small model |
| Medical or benefits copy, security, Row Level Security, payments | Stronger model, slower, fewer calls |
| Rewriting many blog posts | One article at a time on a small-capable model; never a 25-way fan-out |

If you are not sure a fact, statistic, quote, paper or API exists, say so. Do not invent citations.

## Product facts that are already true

- Visitors can read the charity pages, blogs and donate from the live site.
- Sign-in lives at `/auth`. Show Google as a sign-in option in the app. Turning Google on in the Supabase dashboard is still a human click (Authentication → Providers → Google). This environment cannot do that click.
- Each person’s chats, pain journal and own donations are already protected with Row Level Security.
- A public Netlify URL only exists after the GitHub repo is connected in the Netlify dashboard. Do not invent a link.
