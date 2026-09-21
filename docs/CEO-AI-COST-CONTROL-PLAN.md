# How we spend AI money (plain English)

**For:** Louis Maxwell (CEO)
**Live site:** https://livingwitharthritis.org.uk
**Last updated:** 21 September 2026

## The rule

All thinking and writing for this charity site runs on **Cursor / Claude**. We
do **not** use Lovable's paid AI chat. That is how we stop two bills for the
same work.

Lovable may still **host** the live site. That is a hosting bill, not an AI
chat. I am **not certain** whether a GitHub-triggered publish uses Lovable AI
credits. Please check the Lovable billing page and keep or cancel that host
accordingly.

## Smaller brains first

Each job should start on a cheaper model and only step up if that model gets
it wrong. We never start on the most expensive setting. Short copy uses a
small model; a whole-site search job uses a mid model; security or a mystery
bug uses a larger one.

We also stop wasting tokens: search before reading piles of files, do not dump
whole error logs, and do not write a new "status" document after every small
change.

## What the public site already does

People can already visit the charity pages, read the blog, and donate on
https://livingwitharthritis.org.uk. Google login and a private database were
**removed on purpose**. They are not on the live site today.

This run did **not** interview you (automation has no clickable Q&A) and no
design screenshot was attached. Open decisions stay below rather than guessed.

## What this run changed

This run reviewed pull request #73, "Add Understanding Pain guide (animated
hero)". The new page at `/guides/understanding-pain` is real visitor content.
Two gaps were fixed on a follow-up branch so search and AI crawlers do not
see a generic fallback title:

- This cost-control page and `AGENTS.md` (Claude-only, no Lovable AI credits).
  Fresh branches off `main` still start without them until a human merges one
  of these pull requests permanently.
- Search / AI head data for the new guide, UK sources on the page, a last-updated
  date in the sitemap, and a listing in the AI citation file (`llms.txt`).

I did **not** rebuild Google login, a private database, or a Netlify preview
URL. I did **not** rewrite the homepage (this pull request does not change it).

## Open decisions (you click these)

1. **Member accounts / Google login** — leave off (current), or ask to rebuild
   a private area. Rebuilding would be a new project, not a small tweak.
2. **Netlify** — no public Netlify link exists until you connect the GitHub
   repo in Netlify yourself. Live traffic stays on the current host until you
   switch.
3. **Lovable billing** — confirm whether publish-from-GitHub spends AI credits.
4. **Look-and-feel screenshot** — none was attached to this run. Send one if
   you want a visual match.
5. **Merging `AGENTS.md` / this page permanently** — consider merging one
   pull request that includes them so future branches stop starting without
   the cost rule.
6. **Publishing PR #73** — after merge, use the usual GitHub → live-site
   publish so visitors can open the new guide.

I did not invent a new live URL. The public link stays
**https://livingwitharthritis.org.uk**. After the guide is live, anyone can
open **https://livingwitharthritis.org.uk/guides/understanding-pain**.
