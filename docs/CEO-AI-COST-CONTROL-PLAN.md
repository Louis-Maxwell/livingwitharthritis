# Living With Arthritis UK — CEO Paper
# AI Cost Control: Claude credits only, and picking the cheapest capable model

| Field | Detail |
|---|---|
| **Document type** | CEO decision paper |
| **Organisation** | Living With Arthritis UK (registered charity no. **1218461**) |
| **Website** | [livingwitharthritis.org.uk](https://livingwitharthritis.org.uk) |
| **Date** | 15 September 2026 (Europe/London) |
| **Audience** | Louis Maxwell (CEO / clinical lead) |
| **Enforced by** | [`AGENTS.md`](../AGENTS.md) at the root of the repository |
| **Aligns with** | `CEO-10-MONTH-GROWTH-EXECUTION-PLAN.md`, `BOARD-3-YEAR-TRANSFORMATION-STRATEGY.md` |

---

## 1. The short version

You asked for two things: stop spending Lovable credits, and stop burning more AI capacity
than a job actually needs. Both are now written down as rules in a single file at the top of
the project, called `AGENTS.md`. Every AI assistant that opens this project reads that file
before it does anything, so the rules apply automatically from now on — you do not have to
repeat them in each request.

Nothing about the public website changed in this piece of work. It is rules only.

## 2. The money rule

All AI work happens on your Cursor/Claude subscription. The rules explicitly forbid the
assistant from:

- Sending work to the Lovable assistant, or using any Lovable tool that charges per message
- Sending questions to Lovable's AI service from inside the website
- Adding anything new to the site that would call Lovable's AI to answer a visitor

Two things are still Lovable-related and are deliberately left alone, because they are not
AI and do not bill per message:

- Two small build tools from Lovable that help assemble the site's files
- The automatic publish step that pushes an approved build to Lovable's hosting

**One honest caveat.** I have not verified how Lovable prices that automatic publish step. I
believe Lovable credits are consumed by AI conversations rather than by publishing, but I do
not have a verified source for that, and you should check it on your Lovable billing page
before treating publishing as free. If it does cost, the fix is the Netlify decision in
section 6.

## 3. How the assistant now picks which brain to use

Think of it as four sizes of brain, cheapest first. The rule is: always start one size
smaller than you think you need, and only move up if the smaller one actually gets stuck.
Opening with the biggest brain is banned.

| The job | Brain size |
|---|---|
| Writing or editing words — blog posts, page copy, documents | Smallest |
| One clear change to a part of the site we can already point at; fixing a broken check | Small |
| A feature that touches lots of pages; search-engine or page-structure work across the site | Medium |
| Nobody knows why something broke; a decision about hosting, security or people's data | Large |
| Anything heavier than that | Needs your say-so first |

Searching around the project to find things is also pushed onto a small, fast helper rather
than the expensive brain, because looking for a file is not hard thinking.

## 4. How we stop wasting capacity

Most waste is not the size of the brain — it is reading things nobody asked about. This
project has grown to roughly sixty documents at the top level, another forty in the docs
folder, and over a hundred page files. An assistant that skims all of that before starting
has already spent a large part of the budget on nothing.

The new rules say: search first and open only the pages the job names; never sweep through
all the documents; hand wide searches to a cheap helper; run the one test that covers the
change instead of the whole test suite; never dump entire error logs into the conversation;
do the thing asked and then stop, rather than adding extras nobody requested.

One more rule worth naming, because it has been costing you money every run: the assistant
must stop creating a fresh "summary of what I did" document at the end of each job. There
are already dozens of those. From now on it updates the document that owns the topic.

**Honest caveat.** I cannot tell you a percentage saving, because I have no measurement of
what past runs cost. The real number will show up in your Cursor usage over the next few
weeks. Treat any specific saving figure as unverified.

## 5. What is already on the site today

Worth stating plainly, because your brief reads as if the site is being built from scratch.
It is not — it is live and large. The non-profit pages, the blog, and the donation page all
already exist and are reachable at `/about`, `/blog` and `/donate`.

What does **not** exist today is the logged-in half of your brief. Member sign-in, Google
login, and the "each person only sees their own data" protection were taken out of this
project in an earlier decision, and the site now runs as a static site with no database.
Visiting the sign-in page shows a notice saying admin is paused. So the site works for
reading and donating, and does nothing at all for accounts.

## 6. Decisions I need from you

These four are yours, not mine. Each one is blocked on something only you can do, or on a
choice about money and scope.

1. **Do we bring member accounts back?** Google login, personal data kept private per person,
   and an admin area. This is the biggest piece of work on this list and it reintroduces a
   database, so it also reintroduces data-protection duties. Say yes and I will plan it
   properly before touching anything.
2. **Do we move publishing to Netlify?** The project already stores its redirects and
   security settings in Netlify's own format, so it is most of the way there. The parts I
   cannot do are clicking through Netlify to connect the project and pointing the domain at
   it; those need you in the Netlify and domain accounts. I will not invent a live Netlify
   link before that connection exists.
3. **Check the Lovable billing page** and tell me whether publishing consumes credits. That
   single answer decides how urgent the Netlify move is.
4. **Send the design screenshot again.** Your brief refers to a screenshot to match, but no
   image reached this run, so I have deliberately changed nothing about how the site looks
   rather than guess at your intent.

## 7. What I could not do in this run

Said plainly, so there are no surprises:

- **I could not interview you.** This run was started automatically by a pull request, with
  no live conversation attached, so the click-to-answer questions you asked for were not
  available. Sections 5 and 6 are my attempt to ask them in writing instead.
- **I could not see the screenshot**, as above.
- **I could not touch Netlify, Supabase, your domain, or Lovable billing.** All four need
  someone signed in to those accounts.
- **I did not rebuild the front end, back end or search-engine setup.** Your brief asked me
  to improvise across all of it, and I am telling you honestly that doing that in the same
  run as a cost-control rule change would be the opposite of cost control. Answer question 1
  and 2 above and that work becomes a properly scoped next piece rather than a guess.
