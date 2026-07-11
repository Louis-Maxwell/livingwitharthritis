# Content, UX/UI, Speed & Engagement — What's Real vs What's Not
### Claude credits only · same 238-route scope as every session this thread

## The 30-minute target — I want to be direct about this
Average session duration of 30 minutes is not achievable for a health
information site, and I don't want to quietly build toward it as if it
were realistic. For context: **2-4 minutes** average engagement time is
genuinely good for a content site like this one. 30 minutes is roughly
what video-streaming platforms or active web apps see — not
article-based health content, no matter how good it is. If any tool or
person tells you they can hit 30 minutes through content/SEO/UX work
alone, that claim itself is worth being skeptical of.

**What's real and achievable:** pushing engagement time toward that 3-5
minute ceiling by increasing pages-per-session — giving someone who
finishes one page an easy, relevant next thing to read. That's a genuine,
measurable, honest improvement. It's just not 30 minutes.

## Built this session

### `RelatedReading.NEW.tsx` — the real engagement lever
Surfaces the `relatedRoutes` field (built last session from real keyword
overlap) as an actual "Keep Reading" component at the end of any page.
This is the honest mechanism: not a dark pattern, just reducing the
friction between "finished this page" and "found the next relevant one."
Includes an approximate read-time estimate, clearly labeled as
approximate since I don't have full article body word counts in this
dataset — only the structured summary fields.

### Corrected a stale item in `PERFORMANCE-CHECKLIST.md`
It listed route-level code splitting as still-needed. An earlier session
in this thread confirmed that was already done sitewide. Left uncorrected,
that's the kind of stale checklist item that wastes someone's time
re-verifying finished work — fixed rather than passed along.

## What "boost the whole website" actually needs, honestly broken down

**Content & blogs**: I have zero visibility into `/blog/*` — confirmed
repeatedly this thread, still true. Nothing here reaches blog content.
The 238 routes I do control already have real keyTakeaways, FAQs, schema,
and now internal linking from the last two sessions — that's the
content-quality work already done in-scope.

**UX/UI & design**: I don't have your actual `Header.tsx`, `Footer.tsx`,
or other live component files — only what's been read aloud in this
conversation's history (e.g. the ContactSection work from a few sessions
back, done via Lovable). Redesigning UI without seeing the real components
risks producing something that doesn't match your actual design system.
If you want real UI work from here, paste the actual component file
content and I can work with it directly.

**Speed**: real performance numbers (Lighthouse score, actual load time)
need a live site to measure — I can't run Lighthouse against a URL from
this sandbox. What I can do (and have done, across sessions) is code-level
guidance: caching headers, lazy loading, deferred analytics — all already
in `PERFORMANCE-CHECKLIST.md`, now corrected.

**Session duration**: addressed above — realistic target, real mechanism
built (`RelatedReading`), not a fabricated path to 30 minutes.

## Honest priority order for what's left
1. Wire `RelatedReading.NEW.tsx` + the other `.NEW.tsx` components into
   real page templates — needs your GitHub commit, same as always
2. Get real GA4 numbers (flagged as a blocker several sessions ago,
   still the right first step) so "engagement" has a measured baseline
   instead of guessed-at numbers
3. If you want real UI/design changes, share the actual component files
   so I'm editing what exists, not guessing at it
