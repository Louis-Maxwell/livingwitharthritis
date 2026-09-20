# How we spend AI money (plain English)

**For:** Louis Maxwell (CEO)  
**Live site:** https://livingwitharthritis.org.uk  
**Last updated:** 20 September 2026

## The rule

All thinking and writing for this charity site runs on **Cursor / Claude**. We
do **not** use Lovable’s paid AI chat. That is how we stop two bills for the
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
whole error logs, and do not write a new “status” document after every small
change.

## What the public site already does

People can already visit the charity pages, read the blog, and donate on
https://livingwitharthritis.org.uk. Google login and a private database were
**removed on purpose**. They are not on the live site today. Sign-in screens
show a paused message so nobody thinks they can log in.

This run did **not** interview you (automation has no clickable Q&A) and no
design screenshot was attached. Open decisions stay below rather than guessed.

## What this run changed for visitors and Google

The homepage keeps **help first, donate quieter**: pain relief, newly diagnosed,
and PIP before donate. Under the hero, a UK strip names England, Scotland,
Wales and Northern Ireland, with tap-friendly links. “Start here” includes PIP.
Homepage FAQ answers link through instead of dead-ending. The browser tab title
matches the crawler title so Google does not see two different names for the
same page.

After the usual publish from `main`, open the homepage on your phone and check
those strips and buttons.

## Open decisions (you click these)

1. **Member accounts / Google login** — leave off (current), or ask to rebuild
   a private area. Rebuilding would be a new project, not a small tweak.
2. **Netlify** — no public Netlify link exists until you connect the GitHub
   repo in Netlify yourself. Live traffic stays on the current host until you
   switch.
3. **Lovable billing** — confirm whether publish-from-GitHub spends AI credits.
4. **Look-and-feel screenshot** — none was attached to this run. Send one if
   you want a visual match.

I did not invent a new live URL. After merge and the usual deploy, the public
link remains **https://livingwitharthritis.org.uk**.
