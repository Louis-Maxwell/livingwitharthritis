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

This run reviewed pull request #68, "M1: checker→email CTA + FAQ hub
customer-job CRO". That PR itself was already sound — its own test
(`checker-faq-email-cro.test.ts`) passes — so no correction was needed there.

What was missing on this branch, and what I restored:

- This cost-control page and its companion `AGENTS.md` (the Claude-only,
  no-Lovable-credits rule) — every fresh branch off `main` starts without them
  because they have never been merged into `main` yet. I re-add them each time
  a new pull request opens so the rule travels with the work; a human merging
  one of these pull requests would make it permanent.

I deliberately did **not** touch the homepage, the checker, or the FAQ page
beyond that — pull request #68's own changes to the symptom checker and FAQ
page are unrelated to this housekeeping and were left as the author wrote them.

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

I did not invent a new live URL. The public link stays
**https://livingwitharthritis.org.uk**.
